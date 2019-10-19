import React from "react";
import { BackHandler, StyleSheet, Image, Platform, View, Animated, Easing, StatusBar, TouchableOpacity,  Text} from "react-native";
import posed, { Transition } from 'react-native-pose';
import Share from 'react-native-share';
//
import Constant from '../../global/Constant';
import {convertHeight,convertWidth, callToast, loading} from '../../global/Global';
import { Styleapp } from '../../styleapp';

import Headers from '../module_header'
import { onBackDashBoard } from "../../pagemanager/Module_pagemanager";


import SwipeGesture from "../../../swipe-gesture";

import Menubarpage from "./menubar";

import PAGE_ID from "./config/pagemanager";

//pages
import Edetailing_Homepage from "./pages/homepage";

import { setPage } from "./config/assetmanager";
import TimerPageManager, { getTimerPage } from "./config/timermanager";
import PopGreetingViewModel from "../../appcomponent/module_popup/popup_greeting";
import { getPDFLINK } from "../../appcomponent/module_async/AsyncManager";
//import PDFView from 'react-native-view-pdf';
import Pdf from 'react-native-pdf';
import user from "../../global/user";


const resources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: 'https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf',
    base64: 'JVBERi0xLjMKJcfs...',
};
let that = null;
let path ="../../../assets/edetailing/";
let MaxPage = 1;//maxPage
let MinPage = 0;//minPage
let ListPage = [];//listPage
let CurrentLisPage = [];//listPage

class EdetailingViewModel extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data:null,
            datahospital:null,
            enableend:false,
            demo:false,
            homestate:0,
            currentPage:0,
            shopGreeting:false,
            isPdf: false,
            pathPdf: "/data/user/0/com.himalaya/files/files13.pdf",
            pathTitlePdf: "",
            SpecalityPage:null,
            SpecalityName:"",
            currentDokterSpeciality:null,
            isloading:false
        }
        that = this

        //anim
        this.containerLayout = new Animated.ValueXY(0,0);
    }
    componentDidMount() {
        console.log('index edetailing',this.props)
        if (this.props.screenProps.navigation != null) {
            if (this.props.screenProps.navigation.state.params != null) {
                this.setState({
                    data: this.props.screenProps.navigation.state.params.dataDokter,
                    datahospital: this.props.screenProps.navigation.state.params.dataHospital,
                    enableend: true,
                    demo:false,
                    currentDokterSpeciality: this.props.screenProps.navigation.state.params.dataDokter.speciality_name,
                    shopGreeting:true
                })
            }else{
                this.setState({
                    enableend: true, demo:true
                })
            }
        } else {
            this.setState({
                enableend: true, demo:true
            })
        }
        //getTimerPage();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        getPDFLINK();
    }
   
    componentWillUnmount(){
        console.log('remove')
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {
        //callToast("Back Handler")
        this.resetThis();
        return true;
    }
    resetThis() {
        if(this.state.currentPage==0){
            Constant.START_PRESENT = false;
            onBackDashBoard(this.props.screenProps.navigation, "HomeViewTab");
        }
        
        if(this.state.demo == true){
            onBackDashBoard(this.props.screenProps.navigation, "Schedule");
        }
       
    }
    onOpenSignature = () => {
        this.props.screenProps.navigation.navigate(Constant.VM_SIGNATURE);
    }
    setLoading(){
        this.setState({isloading:true})
    }
    onEndPress=(data,_timer)=>{
        console.log("DATA",data)
        console.log("times",_timer);

        setTimeout(() => {
            PAGE_ID.resetAllPage();
            //onBackDashBoard2(this.props.screenProps.navigation, 'Schedule', { callBackRefresh: true })
            //console.log(that.state.data)
            this.props.navigation.navigate("DokterDetailView", { dataDokter: data.datas, dataHospital: this.state.datahospital, timerDuration: _timer })
        }, 2000);
        
    }
    onEndDemoPress = () => {
        console.log(that.props);
        onBackDashBoard(that.props.screenProps.navigation, "Schedule");

    }
    onSwipePerformed = (action) => {
        switch (action) {
            case 'left': {
              //callToast('left swipe performed');
                this._nextPage()
                break;
            }
            case 'right': {
               //callToast("right swipe performed");
                this._prevPage()
                break;
            }
            default: {
                console.log('undetected action')
                break;
            }
        }
    }
    //update currentPage
    setCurrentPage(_name,_data){
        this.setState({
            SpecalityPage:{'name':_name,'detail':_data}
        })
    }
    //min and max index
    setIndexPage(data){
        console.log('list page',data);
        let idPage = [0];
        data.forEach((res)=>{
            res.page.forEach((page)=>{
                idPage.push(page.id);
            })
        })
        MaxPage = idPage[idPage.length-1];
        MinPage = idPage[0];
        ListPage =idPage;
        CurrentLisPage = data;
        console.log('res list page',idPage);
        console.log('max page', MaxPage);
        console.log('min page', MinPage);
    }
    setPage(){
        const { currentPage, data, datahospital, enableend, currentDokterSpeciality} = this.state;

        if (currentPage == PAGE_ID.HOME_ID){
            //Edetailing_Homepage;
           
            return (
              <Edetailing_Homepage
                key="title"
                ref={_ref=>{this.mainmenu = _ref}}
                datas={{
                  datas: data,
                  datahospitals: datahospital,
                  enable: enableend,
                  speciality_name:currentDokterSpeciality
                }}
                navigation={this.props.navigation}
                onEnd={this.onEndPress.bind(this)}
                setListPage={this.setIndexPage.bind(this)}
                stCurrentSpecialisPage={this.setCurrentPage.bind(this)}
                style={{ position: "absolute" }}
                enable={enableend}
                _btnPress={this._goToPage.bind(this)}
                {...this.props}
              />
            );
        }
        else {
            return setPage(this.state,this.props,this.showPdf.bind(this))
        }
    }
    setBgPage(){
        const {currentPage} = this.state;
       // console.log(ListPage[currentPage]);
        if (this.getIndex()> 0){
            return <Image
                style={{
                    width: convertWidth('100%'),
                    height: convertHeight('100%'),
                    position: 'absolute'
                }}
                resizeMode={'contain'}
                source={require(path + 'bg/cystone_bg.png')}
            />
        }
    }
    getIndex(){
        let _current = this.state.currentPage;
        let indexPage = ListPage.findIndex(res => { return res == _current });
        return indexPage;
    }
    _nextPage(){
        const { currentPage } = this.state;
        if (this.getIndex() > 0 && this.getIndex() < ListPage.length-1 && this.state.isPdf == false){
            Animated.spring(this.containerLayout, {
                toValue: { x: convertWidth("100%") * -1, y: 0 },
                duration: Constant.DURATION_LAYOUT_ANIM,
                easing: Easing.linear
            }).start(() => this.changePageNext());
        }
      
    }
    _prevPage(){
        const { currentPage } = this.state;
        if (this.getIndex() > 0 && this.getIndex() < ListPage.length && this.state.isPdf == false) {
          Animated.spring(this.containerLayout, {
            toValue: { x: convertWidth("100%"), y: 0 },
            duration: Constant.DURATION_LAYOUT_ANIM,
            easing: Easing.linear
          }).start(() => this.changePagePrev());
        }
    }
    changePageNext(){
        let _current = this.state.currentPage;
        let indexPage = ListPage.findIndex(res => { return res == _current });
        console.log('select index', indexPage)

        this.setState({ currentPage: ListPage[indexPage+1] }, () => {
            // callToast(this.state.currentPage.toString());
            this.containerLayout.setValue({ x: 0, y: 0 })
        });
        
    }
    changePagePrev(){
        let _current = this.state.currentPage;
        let indexPage = ListPage.findIndex(res => { return res == _current });
        console.log('select index', indexPage)

        this.setState({ currentPage: ListPage[indexPage - 1] }, () => {
            // callToast(this.state.currentPage.toString());
            this.containerLayout.setValue({ x: 0, y: 0 })
        });
     
        
    }
    onStart(){
        this.setState({
          shopGreeting:false
        });
    }
    onCancel(){
        this.resetThis()
    }
    showPdf(title,linkPdf) {
        //callToast('pdf'+linkPdf)
        if (linkPdf) {
            this.setState({
                isPdf: true,
                pathPdf: linkPdf,
                pathTitlePdf:title
            })
        }

    }
    onclosePdf(){
        this.setState({
            isPdf:false
        })
    }
    onSharePdf(){
        const { pathPdf} = this.state;
        Share.open({
            title: "This is my report ",
            message: "Message:",
            url: "file://"+pathPdf,
            subject: "Report",
        })
    }
    renderPdf() {
        const { pathPdf, pathTitlePdf} = this.state;
        return <View style={{
            width: convertWidth("100%"),
            height: convertHeight("100%"),
            opacity:0.9,
            position: 'absolute',
            alignItems: 'center',
            backgroundColor: '#f9f9f2'
        }}>
            <View style={{
                width: convertWidth("95%"),
                height: convertHeight("90%"),
                top: convertHeight("5%"),
                backgroundColor: '#f9f9f2',
                position: 'absolute',
                overflow: 'hidden',
                borderColor: '#dddbd3',
                borderRadius: convertHeight('1%'),
                borderWidth:convertHeight('1%'),
                alignItems: 'center'
            }}>
                <View style={{
                    width: convertWidth("95%"),
                    height: convertHeight("80%"),
                    top: convertHeight("10%"),
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                    
                }}>
                    <Pdf
                        source={{ uri: "file://" + pathPdf}}

                        onLoadComplete={(numberOfPages, filepath) => {
                            console.log(`number of pages ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`current page : ${page}`)
                        }}

                        onError={(error) => {
                            console.log(error);
                        }}
                        fitWidth={true}
                        horizontal={false}
                        scale={1.9}
                        minScale={1}
                        maxScale={2.2}
                        style={{
                            width: convertWidth("95%"),
                            height: convertHeight("70%"),
                            top: convertHeight("5%"),
                            backgroundColor: 'transparent',
                            //overflow:'scroll'
                        }}
                    />
                </View>
               
                <View style={{
                    width: convertWidth("95%"),
                    height: convertHeight("10%"),
                    backgroundColor: Constant.COLOR_GREEN2,
                    position: 'absolute',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: "#eeeeee",
                        fontFamily: Constant.POPPINS_REG,
                        width: convertWidth('95%'),
                        //height: convertHeight("10%"),
                        textAlign: 'center',
                        //borderWidth:1,
                        fontSize: convertWidth('2%'),
                        }}>{pathTitlePdf}</Text>
                </View>
                {
                    /*
                        <View style={{
                    width: convertWidth("1.5%"),
                    height: convertHeight("60%"),
                    top: convertHeight("15%"),
                    left:convertWidth("90%"),
                    backgroundColor: '#dddbd3',
                    position: 'absolute',
                    borderRadius: convertHeight('1%'),
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: convertWidth("1.5%"),
                        height: convertHeight("8%"),

                       // backgroundColor: '#D6D5C1',
                        backgroundColor: '#000',

                        borderRadius: convertHeight('1%'),
                    }}>

                    </View>
                </View>
                    */
                }
                
            </View>
          
            <View style={{
                left: convertWidth("95%"),
                top: convertHeight("3%"),
                borderRadius: convertHeight("5%"),
                backgroundColor: 'red',
                position: "absolute"
            }}>
                <TouchableOpacity
                    onPress={() => this.onclosePdf()}
                >
                    <Image
                        style={{

                            width: convertWidth("3.8%"),
                            height: convertWidth("3.8%"),

                            //backgroundColor:'#000'
                        }}
                        resizeMode={"contain"}
                        source={require("../../../assets/edetailing/bg/closepopbtn.png")}
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                left: convertWidth("84%"),
                top: convertHeight("80%"),
                width: convertWidth("4%"),
                height: convertWidth("4%"),
                borderRadius: convertWidth('2%'),
               
                alignItems: 'center',
                justifyContent:'center',
                position: "absolute"
            }}>
                <TouchableOpacity
                    onPress={() => this.onSharePdf()}
                >
                    <Image
                        style={{

                            width: convertWidth("3.5%"),
                            height: convertWidth("3.5%"),

                            
                        }}
                        resizeMode={"contain"}
                        source={require("../../../assets/edetailing/icons/share.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    }
    render() {
        const { data, datahospital, enableend, shopGreeting, isPdf, SpecalityPage, demo, isloading} = this.state;
        return (
            <View>
                <SwipeGesture
                    gestureStyle={{
                        backgroundColor: '#F9F9F2',
                        width: convertWidth("100%"),
                        height: convertHeight(demo==true?"100%":"100%")
                    }}
                    onSwipePerformed={this.onSwipePerformed}
                >
                    {
                        this.setBgPage()
                    }
                    
                    <Animated.View style={this.containerLayout.getLayout()}>
                        {this.setPage()}
                    </Animated.View>
                </SwipeGesture>
                {
                    //user.getUserContry() == Constant.COUNTRY_INA &&
                    <Menubarpage
                        datas={{
                            datas: data,
                            datahospitals: datahospital,
                            enable: enableend,
                            isdemos: demo
                        }}
                        navigation={this.props.navigation}
                        onEnd={this.onEndPress.bind(this)}
                        onEndDemo={this.onEndDemoPress.bind(this)}
                        onGoPage={this._goToPageIndex.bind(this)}
                        onGoHome={this._goHome.bind(this)}
                        showLoading={this.setLoading.bind(this)}
                        _currentPage={SpecalityPage}
                    />
                }
               
              
                {isPdf &&
                    this.renderPdf()
                }
               
                <StatusBar backgroundColor={Constant.COLOR_GREEN1} hidden={true} />
                
                {shopGreeting && 
                    <PopGreetingViewModel 
                    onPressStart={this.onStart.bind(this)}
                    onPressStartCancel={this.onCancel.bind(this)}
                    name={data.name}
                    />
                }
                {demo == true &&
                    <Text style={[styles.TextTitle, { position: 'absolute', top: convertHeight('2%'), left: convertHeight('2%') }]}>FOR REVIEW ONLY</Text>
                }
                {
                    isloading == true &&
                    loading()
                }
            </View>
           
        );
    }
    //go to
    _goHome(){
       // const { currentPage, data, datahospital, enableend, currentDokterSpeciality } = this.state;
       if(this.state.currentPage == PAGE_ID.HOME_ID){
           this.mainmenu.exitSubMenu();
       }
        this.setState({ currentPage: PAGE_ID.HOME_ID,currentDokterSpeciality:null }, () => {
            // callToast(this.state.currentPage.toString());
            //this.containerLayout.setValue({ x: 0, y: 0 })
        });
    }
    _goToPage(id){
        this.setState({ currentPage:id }, () => {
            // callToast(this.state.currentPage.toString());
            this.containerLayout.setValue({ x: 0, y: 0 })
        });
    }
    _goToPageIndex(id) {

        console.log('select', id)
        console.log('list', ListPage)
        let indexPage = ListPage.findIndex(res => { return res == id });
        console.log('select index', indexPage)

        this.setState({ currentPage: ListPage[indexPage] }, () => {
            // callToast(this.state.currentPage.toString());
            this.containerLayout.setValue({ x: 0, y: 0 })
        });
    }
}
/**
 *   

 */

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    TextTitle:{
        color:"#eeeeee",
        fontFamily: Constant.POPPINS_SEMIBOLD,
        width: convertWidth('20%'),
        textAlign: 'center',
        //borderWidth:1,
        fontSize:convertWidth('1.8%'),

    }
});
/*
   <TouchableOpacity
                style={[Styleapp._buttons, Styleapp._bubble]}
                onPress={() => this.onOpenSignature()}
            >
                <Text>Signature Page</Text>
            </TouchableOpacity>

             <PDFView
                fadeInDuration={250.0}
                style={{
                    width: convertWidth("100%"),
                    height: convertHeight("90%"),
                    top: convertHeight("10%"),
                    position: 'absolute'
                }}
                resource={"/data/user/0/com.himalaya/files/files13.pdf"}
                resourceType={"file"}
                onLoad={() => console.log(`PDF rendered from file`)}
                onError={(error) => console.log('Cannot render PDF', error)}
            />
*/
export default EdetailingViewModel;