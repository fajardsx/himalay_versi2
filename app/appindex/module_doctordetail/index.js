import React from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, BackHandler, RefreshControl,Platform } from "react-native";
import ShadowView from 'react-native-shadow-view';
//
import Panels from "../../utils/panelKategori";
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, _getDoktorDetail, formateFullDateNumberUTCTime, formateFullDateNumberUTC2, formateFullDateNumber, callAlert, _sendSubmitComplete, loading, callToast} from '../../global/Global';
import user from '../../global/user';
import { Styleapp } from '../../styleapp';
import Headers from '../module_header'

import DokterDashboard from "../../appcomponent/module_user/module_dokter_dashboard";
import CheckComponent from "../../appcomponent/module_check";
import SignatureViewModel from "../../appcomponent/module_signature";
import { SYNCLoc, Sync_Photo_Resulth, F_I_F_O_GLOBAL_LOC, LEMARI_GLOBAL_DETAIL, LEMARI_GLOBAL_DETAIL_GET, LEMARI_GLOBAL_LOC, updateStatusDoktor } from "../../appcomponent/module_async/AsyncManager";
import KEYS from "../../appcomponent/module_async/utils/keyAsync";
import PAGE_CONFIG, { onComplete, onBackDashBoard2 ,toTopHome} from "../../pagemanager/Module_pagemanager";

var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Select Profil Picture',
    mediaType: 'photo',
    quality:0.8,
    storageOptions: {
        skipBackup: true,
        path: Platform.OS=='ios'?'Documents/Himalaya/':'Pictures/Himalaya/',
    }
}

const checkyes = require("../../../assets/ASET/check.png");
const checkno = require("../../../assets/ASET/uncheck.png");
const checkEmpty = require("../../../assets/ASET/emptycheck.png");


let DurationTotalDummy={name:"Total Duration",duration:"16:00",
data_page:[{
        'title':"TITLE E-DETAILING NAME 1",
        'duration':"06:00",
        "pages":[{
            name:'Title Page 1',
            duration:"01:00"
        },{
            name:'Title Page 2',
            duration:"04:00"
        },{
            name:'Title Page 3',
            duration:"01:00"
        }]
}, {
        'title': "TITLE E-DETAILING NAME 2",
        'duration': "08:00",
        "pages": [{
            name: 'Title Page 1',
            duration: "02:00"
        }, {
            name: 'Title Page 2',
            duration: "04:00"
        }, {
            name: 'Title Page 3',
            duration: "02:00"
        }]
    }
]}

let that = null;
class DoctorDetailViewModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            isPop: false,
            data: null,
            dataHospital: null,
            detail: null,
            isLoading: true,
            localphoto: null,
            localphotourl: null,
            signphoto: null,
            feedBackphoto: null,
            isDetailMode: false,
            isSignature:false,
            isPopImage:false,
            urlPopImage:null,
            signMode:0,
            acceptCheck:2,
            isCompletes:null,
            dateStart:null,
            dateStart_schedule:null,
            feedback_seller:"",
            timerResulth:null,
            isRefresh:false
        }
        that = this;
        //user.updateStatusRole(Constant.ROLE_INLOGIN);
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentDidMount() {
        console.log(this.props);

        if (this.props.navigation!=null){
            if (this.props.navigation.state.params!=null){
                this.setState({ 
                    isDetailMode: this.props.navigation.state.params.isDetail,
                    data: this.props.navigation.state.params.dataDokter,
                    dataHospital: this.props.navigation.state.params.dataHospital,
                    timerResulth: this.props.navigation.state.params.timerDuration,
                    isCompletes: this.props.navigation.state.params.isCompletes != null ? this.props.navigation.state.params.isCompletes:false
                },()=>{
                    this._onReqDetail()
                })
            }
        }
        if (this.props.screenProps != null) {
            //in edetailing
            if (this.props.screenProps.navigation.state.params != null) {
                console.log("timer total", this.props.navigation.state.params.timerDuration)
                console.log("timer total", this.props)
                if (this.props.screenProps.navigation.state.routeName == "E_Detailing" || this.props.screenProps.navigation.state.routeName =="EdetailingScreen"){
                    this.setState({
                        isDetailMode: false,
                        data: this.props.screenProps.navigation.state.params.dataDokter,
                        dataHospital: this.props.screenProps.navigation.state.params.dataHospital,
                        timerResulth: this.props.navigation.state.params.timerDuration,
                    }, () => {
                        this._onReqDetail();
                         this._onGetStartMeet();
                         this._renderSubTitle();
                    })
                   
                }
               
            }
           
        }
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.resetThis();
        return true;
    }
    resetThis() {
        Constant.START_PRESENT = false;
        //if(this.props.screenProps.navigation.state.routeName =="EdetailingScreen"){
            this.props.navigation.goBack();
        //}
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    //add REFRESH 20190526_17_1749
    _onRefresh(set = true) {
        if (this.props.screenProps.navigation.state.routeName == "E_Detailing" || this.props.screenProps.navigation.state.routeName == "EdetailingScreen")
        {
            return;
        }
        this.setState({ isRefresh: set, isLoading: true },

            this._proccessRefresh

        );
    }
    _proccessRefresh= () =>{
        try {
            _getDoktorDetail(this.state.data.id).then(res => {
                console.log("detail dokter ", res);
                if (res) {
                    LEMARI_GLOBAL_DETAIL([res]);
                    that.setState({
                        detail: res
                    }, () => that.setState({
                        isLoading: false,
                        isRefresh: false
                    }))
                } else {
                    console.log("detail dokter off ", resoff);
                    if (resoff) {
                        that.setState({
                            detail: resoff
                        }, () => that.setState({
                            isLoading: false,
                            isRefresh:false
                        }))
                    } else {
                        that.setState({
                            isLoading: false,
                            isRefresh: false
                        })
                        callAlert(Constant.NAME_APPS, "Failed Get Doctor Detail,please try again ensure internet connection stable")
                    }
                }
            })
        } catch (e) {
            console.log("error", e);
            LEMARI_GLOBAL_DETAIL_GET(this.state.data.id).then(res => {
                console.log("detaildoktor", res);
                if (res) {
                    that.setState({
                        detail: res
                    }, () => that.setState({
                        isLoading: false,
                        isRefresh: false
                    }))
                } else {
                    that.setState({
                        isLoading: false,
                        isRefresh: false
                    })
                    callAlert(Constant.NAME_APPS, "Failed Get Doctor Detail,please try again ensure internet connection stable")
                }
            })
        }
    }
    ///
    _onReqDetail(){
        console.log('id dokter', this.state.data.id)
        console.log('id dataHospital', this.state.dataHospital)
         LEMARI_GLOBAL_DETAIL_GET(that.state.data.id).then(resoff => {
             console.log("detaildoktor", resoff);
            if (resoff) {
                that.setState({
                    detail: resoff
                }, () => that.setState({
                    isLoading: false
                }))
            } else {
               
               try {
                    _getDoktorDetail(this.state.data.id).then(res => {
                        console.log("detail dokter ", res);
                        if (res) {
                            LEMARI_GLOBAL_DETAIL([res]);
                            that.setState({
                                detail: res
                            }, () => that.setState({
                             isLoading: false
                            }))
                        } else {
                            console.log("detail dokter off ", resoff);
                            if (resoff){
                                that.setState({
                                    detail: resoff
                                }, () => that.setState({
                                    isLoading: false
                                }))
                            }else{
                                that.setState({
                                    isLoading: false
                                })
                                callAlert(Constant.NAME_APPS,"Failed Get Doctor Detail,please try again ensure internet connection stable")
                            }
                        }
                    })
                } catch (e) {
                    console.log("error", e);
                    LEMARI_GLOBAL_DETAIL_GET(this.state.data.id).then(res => {
                        console.log("detaildoktor", res);
                        if (res) {
                            that.setState({
                                detail: res
                            }, () => that.setState({
                                isLoading: false
                            }))
                        } else {
                            that.setState({
                                isLoading: false
                            })
                            callAlert(Constant.NAME_APPS,"FAILED GET DETAIL DOCTOR")
                        }
                    })
                }
           }
        })
        const { timerResulth, dateStart_schedule, data, detail, localphoto, feedback_seller, feedBackphoto, signphoto, acceptCheck, dataHospital } = this.state;
        /*this.setState({
            isCompletes:true,
            isDetailMode:true
        })*/
        let nameProduct = "nama product";
        let dataform = new FormData();
        dataform.append("status", 1);
        dataform.append("cms_users_id", user.getUsId());
        dataform.append("schedule_date", dateStart_schedule);
        dataform.append("doctors_id", data.id);
        dataform.append("signature", signphoto ? true : false);
        dataform.append("feedback", feedBackphoto ? true : false);
        dataform.append("feedback_sales", feedback_seller);
        dataform.append("locations_id", dataHospital.id);//id_rumah sakit
        dataform.append("e_detailings_name", data.speciality_name);
        dataform.append("json_result", JSON.stringify(timerResulth));
       
        console.log('data', dataform);
    }
    ////////////////////////signature
    onOpenSignature = (id) => {
        this.setState({
            isSignature:true,
            signMode:id
        })   
    }
    onCloseSignature = () => {
        this.setState({
            isSignature: false
        })
    }
    onSaveSign(url) {
        console.log("sign ", url);
        const base64String = `data:image/png;base64,${url.encoded}`;

        let Links =  {
            'uri': base64String,
            'path': url.pathName,
            'type': "image/png",
            'fileName': url.fileName
        }
       
        console.log("Links ", Links);
        if (this.state.signMode == 0) {
            this.setState({
                isSignature: false,
                signphoto: Links
            })
            console.log("image signphoto ", url);
        } else if (this.state.signMode == 1) {
            this.setState({
                isSignature: false,
                feedBackphoto: Links
            })
            console.log("image feedBackphoto ", url);
        }


    }
    //
    getSrcChecl() {
        switch (this.state.acceptCheck) {
            case 0:
                return checkno;
                break;
            case 1:
                return checkyes;
                break;
            case 2:
                return checkEmpty;
                break;
        }
    }
   
    setSubtitle(texts,styles=null){
        return <View style={[styles,{
            backgroundColor: Constant.COLOR_LINE_doktorInfo,
            marginTop: convertWidth('3%'),
            justifyContent: 'center',

        }]}>
            <Text style={{

                height: convertWidth('4%'),

                fontFamily: Constant.POPPINS_REG,
                fontSize: convertWidth('1.8%'),
                color: "#000",
                marginLeft: convertWidth('3%'),
                textAlignVertical: 'center'

            }}>{texts!=null?texts:""}</Text>
        </View>
    }
    _onPressStart(){
        let datas ={
            startDate: formateFullDateNumber(Date.now(), "YYYY-MM-DD")
        }
        let starts; 
        SYNCLoc(KEYS.KEY_G,KEYS.KEY_STARTMEETDOCTOR).then(res=>{
            console.log('create res ', res);
                SYNCLoc(KEYS.KEY_U,KEYS.KEY_STARTMEETDOCTOR,datas).then(()=>{
                    Constant.START_PRESENT = true;
                    that.props.screenProps.start_press({ isStart: true, dataDokter: that.state.data, dataHospital: that.state.dataHospital });
                }); 
        });
        /*old code
        //console.log('save start ',starts);
                //this.props.navigation.goBack();
                Constant.START_PRESENT = true;
                //this.props.screenProps.rootnavigation.navigation.navigate('EdetailingScreen',{isStart:true,dataDokter:this.state.data,dataHospital:this.state.dataHospital});
                that.props.screenProps.start_press({ isStart: true, dataDokter: this.state.data, dataHospital: this.state.dataHospital });
                // PAGE_CONFIG.tabRoute.navigate('EdetailingScreen',{isStart:true,dataDokter:this.state.data,dataHospital:this.state.dataHospital});
        
        */
       
    }
    _onNotAvailable() {
        //this.props.navigation.goBack();
       /* let datas ={
            startDate: formateFullDateNumber(Date.now(), "YYYY-MM-DD")
        }
        this.setState({
            dateStart_schedule: formateFullDateNumber(datas.startDate, "YYYY-MM-DD")
        }, () => this.onSubmit(false))
        //let starts; 
        SYNCLoc(KEYS.KEY_G,KEYS.KEY_STARTMEETDOCTOR).then(res=>{
            console.log('res ', res);
            //starts = res;
         
            if(res){
                SYNCLoc(KEYS.KEY_U, KEYS.KEY_STARTMEETDOCTOR, datas);
               
            }else if(res == undefined){
                SYNCLoc(KEYS.KEY_A,KEYS.KEY_STARTMEETDOCTOR,datas);
               
           }
        });
        */
        this.resetThis();
        
    }
    _onGetStartMeet(){
        let result = null;
        let result_send = null;
        SYNCLoc(KEYS.KEY_G, KEYS.KEY_STARTMEETDOCTOR).then(res => {
            console.log(KEYS.KEY_STARTMEETDOCTOR,res)
           
            result = formateFullDateNumberUTC2(res.startDate);
            result_send = res.startDate
            console.log(result)
            console.log(result_send)
            that.setState({
                dateStart:result,
                dateStart_schedule:result_send
            })
        })
    }
    _popImage(uris){
        this.setState({
            isPopImage:true,
            urlPopImage:uris
        })
    }
    _closePopImage(uris){
        this.setState({
            isPopImage:false,
            //urlPopImage:uris
        })
    }
    onOpenGallery() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('respone ', response)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {
                    height: response.height,
                    width: response.width,
                    type: response.type,
                    fileName: response.fileName,
                    fileSize: response.fileSize,
                    path: response.path,
                };
                // You can also display the image using data:
                console.log('gallery',source)
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let _photouri = { uri: 'data:image/jpeg;base64,' + response.data }
                that.setState({
                    localphoto: source,
                    localphotourl: _photouri
                })
              
            }
        })
    }
    renderGps(img, title, texts) {
        return <View style={{ width: convertWidth('45%'), height: convertHeight('18%'), marginLeft: 20 }}>
            <View style={{
               // height: convertHeight('18%'),
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                //elevation: 3,
                shadowColor: Constant.COLOR_GRAY2,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            }}>
                <ShadowView style={{
                    width: convertWidth('45%'), height: convertHeight('14%'),
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                }} />
                <View style={
                    {
                        width: convertWidth('10%'),
                        height: convertWidth('10.5%'),
                        backgroundColor: Constant.COLOR_GREEN6,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                }>
                    <Image
                        style={{
                            width: convertWidth('5%'),
                            height: convertWidth('5%')
                        }}
                        resizeMode={'contain'}
                        source={img}
                    />
                </View>
                <View style={{ justifyContent: 'center', marginLeft: '5%' }}>

                    <Text style={{ fontFamily: Constant.POPPINS_MEDIUM,color:Constant.COLOR_GREEN6,fontSize: convertWidth('2%') }}>{title}</Text>
                    <Text style={{ fontFamily: Constant.POPPINS_LIGHT }}>{texts}</Text>
                </View>

            </View>
        </View>
    }
   //render cell duration
    
    _renderSubTitle(){
        let cellTitle=[];
        const {timerResulth} = this.state;
        if (timerResulth){
            timerResulth.data_page.map((data, index) => {
                //console.log(data)
                cellTitle.push(
                    <Panels key={index} titles1={""} titles2={data.title}>
                        {
                            this._renderSubPage(data.pages)
                        }
                        <View style={{ height: convertWidth('2%') }} />
                    </Panels>
                )
            })

            return cellTitle;
        }
     
    }
    _renderSubPage(data) {
        let cellPage = [];
        data.map((subdata, index) => {
           // console.log(subdata)
            cellPage.push(
                <View key={index} style={{ height: convertHeight('5%'), flexDirection: 'row', backgroundColor: Constant.COLOR_WHITE5, alignItems: 'center', paddingHorizontal: convertWidth('1%') }}>
                    <Text style={[styles.paneltext, { width: convertWidth('72%'), borderWidth: 0 }]}>{subdata.name}</Text>
                    <Text style={[styles.paneltext, { width: convertWidth('10%'), textAlign: 'right', borderWidth: 0 }]}>{}</Text>
                </View>
            )
        })
        return cellPage;
    }
    //render result presentation
    _resultPresentation(){
        const {dataHospital,isLoading,dateStart,timerResulth}=this.state;
        /*
             <Text
                style={{

                    height: convertWidth('4%'),

                    fontFamily: Constant.POPPINS_REG,
                    fontSize: convertWidth('1.8%'),
                    color: "#000",
                    marginLeft: convertWidth('6%'),
                    textAlignVertical: 'center'

                }}
            >{"Detail Peresentation"}</Text>
            <View style={{ height: convertWidth('2%') }} />
            {dataHospital && isLoading == false && //_onGetStartMeet
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {this.renderGps(require("../../../assets/ASET/poindokterdetail.png"), "Location", dataHospital.name)}
                 {this.renderGps(require("../../../assets/ASET/calendaricondokter.png"), "Date & Time", dateStart!=null ? dateStart:"")}
                </View>
            }

            <View style={{ height: convertWidth('5%') }} />
            <Text
                style={{

                    height: convertWidth('4%'),

                    fontFamily: Constant.POPPINS_REG,
                    fontSize: convertWidth('1.8%'),
                    color: "#000",
                    marginLeft: convertWidth('6%'),
                    textAlignVertical: 'center'
                }}
            >{"Result"}</Text>
        */
        //console.log(timerResulth)
        return <View style={{ backgroundColor: Constant.COLOR_LINE_doktorInfo, width: convertWidth('100%') }}>
            <View style={{ height: convertWidth('2%') }} />
           
          
            <View style={{ backgroundColor: "#F7F7F7", margin: convertWidth('1%'),marginHorizontal:convertWidth('5%'),padding:convertWidth('0.3%')}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',height: convertWidth('5%'),width:convertWidth('87%'),paddingHorizontal:convertWidth('2%')}}>
                    <Text style={styles.titleTimetext}>{timerResulth.name}</Text>
                    <Text style={styles.titleTimetext}>{}</Text>
                </View>
                {
                    this._renderSubTitle()
                }
                </View>
           
            <View style={{ height: convertWidth('3%')}} />
        </View> 
    }

    updateCheck(){
        let currents = this.state.acceptCheck;
        console.log("checl",currents)
        if(currents == 2){
            currents = 1;
        } else if (currents == 1) {
            currents = 2;
        }
        this.setState({
            acceptCheck:currents
        })
        //this.checks.onUpdateFromParent(currents)
    }
    /////
    sallesText(txt){
        this.setState({
            feedback_seller:txt
        })
    }
/////////////////////////////////////////////////////////////////////SUBMIT
    onSubmit(_avaiable=true){


        const {timerResulth, dateStart_schedule, data, detail, localphoto, feedback_seller, feedBackphoto, signphoto, acceptCheck,dataHospital,isLoading} = this.state;
        if(isLoading == true){
            return;
        }
        /*this.setState({
            isCompletes:true,
            isDetailMode:true
        })*/
        let nameProduct = data.speciality_name;
        let dataform = new FormData();
        dataform.append("status", _avaiable==true?1:0);
        dataform.append("cms_users_id", user.getUsId());
        dataform.append("schedule_date", dateStart_schedule);
        dataform.append("doctors_id", data.id);
        dataform.append("signature", signphoto?true:false);
        dataform.append("feedback", feedBackphoto ? true : false);
        dataform.append("feedback_sales", feedback_seller);
        dataform.append("locations_id", dataHospital.id);//id_rumah sakit
        dataform.append("e_detailings_name", data.speciality_name);
        dataform.append("json_result", _avaiable == true ? JSON.stringify(timerResulth):null);
        
        let photo_data = [
            {
                type: "photo",
                dataPhoto: localphoto,
                status: 0
            },
            {
                type: "signature",
                dataPhoto: signphoto,
                status: 0
            },
            {
                type: "feedback",
                dataPhoto: feedBackphoto,
                status: 0
            }
        ]
        let jdata = {
          status: _avaiable == true ? 1 : 0,
          cms_users_id: user.getUsId(),
          doctors_id: data.id,
          schedule_date: dateStart_schedule,
          signature: signphoto ? true : false,
          feedback: feedBackphoto ? true : false,
          feedback_sales: feedback_seller,
          locations_id: dataHospital.id,
          e_detailings_name: data.speciality_name,
          json_result:_avaiable == true ? JSON.stringify(timerResulth) : null,
          photos: photo_data
        };
        console.log("submit", jdata)
        
       // updateStatusDoktor(jdata);
        if (_avaiable == false) {
            let currentDataDoctor={
                status:0,
                cms_users_id:user.getUsId(),
                schedule_date:dateStart_schedule,
                doctors_id:data.id,
                locations_id: dataHospital.id,
            }
            this.props.screenProps._callPopFeedback(currentDataDoctor,jdata);
            return;
        }
        //
      
        if(_avaiable==true){
            if (feedback_seller.length > 1 && feedback_seller.length < 5) {
                callAlert(Constant.NAME_APPS, "Mohon Feedback diisi Minimal 6 karakter");
                return;
            }
            if (acceptCheck !=1){
                callAlert("Failed","Please Check approved about data has been present")
                return;
            }
            if (signphoto == null) {
                callAlert("Failed", "Please Fill Doctor Signature ")
                return;
            }
            if (feedBackphoto == null) {
                callAlert("Failed", "Please Fill Doctor Feedback Handwriting ")
                return;
            }
            this.setState({
                isLoading: true
            })
            photo_data = [
                {
                    type: "photo",
                    dataPhoto: localphoto,
                    status: 0
                },
                {
                    type: "signature",
                    dataPhoto: signphoto,
                    status: 0
                },
                {
                    type: "feedback",
                    dataPhoto: feedBackphoto,
                    status: 0
                }
            ]
            jdata = {
                    status: _avaiable == true ? 1 : 0,
                    cms_users_id: user.getUsId(),
                    doctors_id: data.id,
                    schedule_date: dateStart_schedule,
                    signature: signphoto ? true : false,
                    feedback: feedBackphoto ? true : false,
                    feedback_sales: feedback_seller,
                    locations_id: dataHospital.id,
                    e_detailings_name: _avaiable == true ? nameProduct : null,
                    json_result: _avaiable == true ? JSON.stringify(timerResulth) : null,
                    photos: photo_data
                };
            console.log("submit jdata", jdata)
            //return
            updateStatusDoktor(jdata).then(res=>{

                LEMARI_GLOBAL_LOC([jdata], KEYS.KEY_MEETDOCTOR_COMPLETE, true);
                    try {
                        _sendSubmitComplete(dataform).then(res => {
                            console.log('complete', res)
                            if (res) {
                                if (res.result == true && res.msg){
                                        if(res.msg.api_message =="success"){
                                             that.onSavePhoto(res.msg.data.results.schedules_id);
                                        }
                                   
                                }else if(res.result == false){
                                     let _data = {
                                            id: 0,
                                            key: KEYS.KEY_MEETDOCTOR_RESULTH,
                                            data: jdata,
                                        }
                                        F_I_F_O_GLOBAL_LOC(_data).then(() => {
                                           
                                            //that.onSavePhoto(res.data.results.schedules_id);
                                             that.doktorResultComplete();
                                        });
                                    }

                            } else {
                                let _data = {
                                    id: 0,
                                    key: KEYS.KEY_MEETDOCTOR_RESULTH,
                                    data: jdata,
                                }
                                F_I_F_O_GLOBAL_LOC(_data).then(() => {
                                    
                                    //that.onSavePhoto(res.data.results.schedules_id);
                                     that.doktorResultComplete();
                                });
                                //that.doktorResultComplete();
                            }
                        });
                        //this.onSavePhoto(res.data.results.schedules_id);
                    } catch (e) {
                        let _data = {
                            id: 0,
                            key: KEYS.KEY_MEETDOCTOR_RESULTH,
                            data: jdata,
                        }
                        F_I_F_O_GLOBAL_LOC(_data).then(()=>{
                            that.setState({
                                isLoading: false
                            })
                            //that.onSavePhoto(res.data.results.schedules_id);
                             that.doktorResultComplete();
                        });
                        
                        //this.doktorResultComplete();
                    }
              
                
            })
           
        }
        
        
        //this.onSavePhoto(0);
        //this.props.screenProps.navigation.navigate('Schedule', { callBackRefresh: true })
      
      // onComplete(this.props.screenProps.navigation, { routeName: "Schedule"})
        //this.props.screenProps.navigation.navigate('E_Detailing', { isStart: true, dataDokter: this.state.data, dataHospital: this.state.dataHospital });
    }
    onSavePhoto(id_schedule){
        const { feedBackphoto, signphoto,localphoto} = this.state
        
            let _data=[
                {
                    type:"photo",
                    dataPhoto:localphoto,
                    status:0
                },
                {
                    type: "signature",
                    dataPhoto: signphoto,
                    status: 0
                },
                {
                    type: "feedback",
                    dataPhoto: feedBackphoto,
                    status: 0
                }
            ]
            let _fotoObject = [];
            let currentIndex = 0;
            _data.forEach((datas,index)=>{
                if (datas.dataPhoto!=null){
                    let dataPhoto = {
                        id: index,
                        id_submit: id_schedule,
                        data: datas,
                        key: KEYS.KEY_MEETDOCTOR_PHOTO,
                        create_at: formateFullDateNumber(Date.now())
                    };
                    _fotoObject.push(dataPhoto);
                }
                if(index == _data.length-1){
                    this._onCompleteSavePhoto(_fotoObject)
                }
            })
        //console.log("save ",dataPhoto)
    }
    _onCompleteSavePhoto(_fotoObject){
        console.log("fotoDir",_fotoObject);
        //Sync_Photo_Resulth(_fotoObject);
        //let _fotodir = _fotoObject.slice(0)
        
        F_I_F_O_GLOBAL_LOC(_fotoObject).then(res=>{
            if(res){
                console.log("save image success")
                that.doktorResultComplete();
            }
        });

       
    }
    //COMPLETE
    doktorResultComplete(){
        let autoBack = setTimeout(() => {
            //onBackDashBoard(this.props.screenProps.navigation, "HomeViewTab");
            //this.resetThis();
            clearTimeout(autoBack);
            Constant.START_PRESENT = false;
            that.setState({
                isLoading: false
            },()=>{
                    onBackDashBoard2(that.props.screenProps.navigation, 'HomeViewTab', { callBackRefresh: true })
            })
           
        }, 2000);
    }
    //SET ADDRESS
    onSetAndress(){
        let address=[];

        this.state.detail.locations.forEach((data,index)=>{
            address.push(<View key={index} style={{ flexDirection: 'row', justifyContent: 'center', marginTop: convertWidth('1%') }}>
                <ShadowView style={styles.cellContainer}>

                    <View style={styles.linegreen} />
                    <View style={styles.circelgreen}>
                        <Image
                            style={{
                                height: convertWidth('2%'),
                                width: convertWidth('2%')
                            }}
                            resizeMode={'contain'}
                            source={require('../../../assets/ASET/rs.png')}
                        />
                    </View>
                    <View style={styles.textcontainer}>
                        <Text style={{ fontFamily: Constant.POPPINS_MEDIUM, height: convertHeight('4%'), fontSize: convertWidth('1.5%') }}
                        >{data.name}
                        </Text>
                        <Text style={{ fontSize: convertWidth('1.2%') , fontFamily: Constant.POPPINS_REG,width:convertWidth("32%"), height: convertHeight('10%'), letterSpacing: convertWidth('0.1%'), lineHeight: convertHeight('2.5%') }}>
                            {data.address}
                        </Text>
                    </View>

                </ShadowView>
                <ShadowView style={styles.cellContainer}>
                    <View style={styles.linegreen} />
                    <View style={styles.circelgreen}>
                        <Image
                            style={{
                                height: convertWidth('2%'),
                                width: convertWidth('2%')
                            }}
                            resizeMode={'contain'}
                            source={require('../../../assets/ASET/contact.png')}
                        />
                    </View>
                    <View style={styles.textcontainer}>
                        <Text style={{ fontFamily: Constant.POPPINS_MEDIUM, height: convertHeight('4%'), fontSize: convertWidth('1.5%') }}
                        >{"Contact"}
                        </Text>
                        <Text style={{ fontFamily: Constant.POPPINS_REG, height: convertHeight('5%'), lineHeight: convertHeight('3%'), fontSize: convertWidth('1.2%')  }}>
                            {"P: " + (data.phone ? data.phone : " ")}
                        </Text>
                        <Text style={{ fontFamily: Constant.POPPINS_REG, height: convertHeight('5%'),lineHeight: convertHeight('3%'), fontSize: convertWidth('1.2%')  }}>
                            {"F: " + (data.fax ? data.fax : " ")}
                        </Text>
                    </View>

                </ShadowView>

            </View>)
        })
        
        return address;
    }
    //RENDER
    render() {
        const { isSignature, data, isLoading, isDetailMode, isPopImage, isCompletes, timerResulth, acceptCheck, detail, isRefresh} = this.state;
        return <View style={{ backgroundColor: '#ffff', flex: 1 }}>
            {isPopImage == false &&
                <Headers
                    navigation={this.props.navigation}
                    burgeronpress={this.props.screenProps._callPopBurger}
                    titleheader={Constant.TAB_SCHEDULE}
                />
            }
           
            {isLoading == false && isSignature == false && isPopImage == false && isCompletes==false && detail  &&
                <DokterDashboard dokter={detail.detail} 
                profilDok={data}
                isDetail={isDetailMode}
                onBtn1={this._onNotAvailable.bind(this)}
                onBtn2={this._onPressStart.bind(this)}
                />
            }
            {isLoading == false && isSignature == false && isPopImage == false && isCompletes == true && detail &&
                <DokterDashboard dokter={detail.detail} 
                profilDok={data}
                isDetail={false}
                onBtn1={this._onNotAvailable.bind(this)}
                onBtn2={this._onPressStart.bind(this)}
                />
            }
            
            <ScrollView 
                style={{ width: '100%', marginTop: convertHeight(isDetailMode == true?"10%":"5.5%") }}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            >
                {isDetailMode == true &&
                   this.setSubtitle("Doctor Information")
                }
                {isDetailMode == true &&
                    <View style={{ height: convertWidth('5%') }} />
                }
                 
               
                {detail && detail.locations && detail.locations.length > 0 && isDetailMode == true &&
                    this.onSetAndress()

                }
                
                 
                {isDetailMode == true &&
                     <View style={{ height: convertWidth('1%') }} />
                }
                {isDetailMode == true && this.setSubtitle("Focused Product")}
                {isLoading == false && isDetailMode == true && detail && detail.products != null &&
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: convertWidth('5%') }}>
               
                    
                    <FlatList
                        //style={{paddingVertical: 10}}
                        data={detail.products}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({item})=>
                       
                            <View key={item.id} style={styles.cellProductContainer}>
                          
                                <ShadowView
                                    style={{
                                        height: convertWidth('11.5%'),
                                        width: convertWidth('25%'),
                                        backgroundColor: '#FFFFFF',
                                        shadowOpacity: 0.2,
                                        shadowRadius: 3,
                                        //elevation: 5,
                                        position: 'absolute',
                                        //borderWidth: 1,
                                        shadowColor: Constant.COLOR_GRAY2,
                                        shadowOffset: { width: 1, height: 1 },
                                    }}
                                />
                                <View style={styles.cellProductForm}>
                                    <Image
                                        style={{
                                            marginTop: convertWidth('1%'),
                                            height: convertWidth('8%'),
                                            width: convertWidth('10%'),
                                            borderWidth: 1
                                            //backgroundColor:'#000'
                                        }}
                                        resizeMode={'contain'}
                                        source={{ uri: item.picture? Constant.BASELINK + item.picture :null}}
                                    />
                                    <View style={{
                                        marginTop: convertWidth('1%'),
                                        marginLeft: convertWidth('0.5%'),
                                        height: convertWidth('8%'),
                                        width: convertWidth('15%'),

                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{ fontFamily: Constant.POPPINS_LIGHT }}>{item.name}</Text>
                                        <Text style={{ fontFamily: Constant.POPPINS_LIGHT }}>{item.typeproduct}</Text>
                                    </View>

                                </View>

                            </View>
                          
                            
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                    
               </View>}

                {this.setSubtitle("Doctor's Feedback")}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: convertWidth('5%') }}>

                    {isLoading == false && detail &&
                        <FlatList
                            //style={{paddingVertical: 10}}
                            data={detail.feedbacks}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                           
                            renderItem={(items) =>
                           
                                <View key={items.index} style={styles.cellFeedbackContainer}>
                                {console.log("data feedback",items)}
                                    {console.log("data feedback", Constant.BASELINK + items.item.feedback)}
                                    <ShadowView
                                        style={{
                                            height: convertWidth('15.5%'),
                                            width: convertWidth('25%'),
                                            backgroundColor: '#FFFFFF',
                                            shadowOpacity: 0.2,
                                            shadowRadius: 3,
                                            //elevation: 5,
                                            position: 'absolute',
                                            //borderWidth: 1,
                                            shadowColor: Constant.COLOR_GRAY2,
                                            shadowOffset: { width: 1, height: 1 },
                                        }}
                                    />
                                    <TouchableOpacity style={styles.cellPFeedbackForm}
                                        onPress={() => that._popImage(items.item ? { uri: Constant.BASELINK + items.item.feedback } : null)}
                                    >
                                        <Image
                                            style={{
                                                borderWidth: 1,
                                                height: convertWidth('15%'),
                                                width: convertWidth('25%'),
                                            }}
                                            resizeMode={'cover'}
                                            source={items.item ? { uri: Constant.BASELINK + items.item.feedback }:null}
                                        />

                                    </TouchableOpacity>
                                    <Text style={{ alignSelf: 'center', marginTop: convertWidth('1%'), fontFamily: Constant.POPPINS_MEDIUM, color: "#00b7a2" }}>
                                        {formateFullDateNumber(items.item.schedule_date, "DD MMMM YYYY")}
                                    </Text>
                                </View>
                            
                            }
                             keyExtractor={(item, index) => index.toString()}
                        />
                    }
                </View>
                {isDetailMode == false && isCompletes == false && timerResulth && this._resultPresentation()}

                {
                    //FEEDBACK IS COMPLETE
                }
                {
                    /*isCompletes == true &&
                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={[styles.panelFeedbackTtitletext, { width: convertWidth('90%'), marginBottom: convertHeight('3%'),}]}>
                    {"Medical Representation's Feedback (Optional)"}</Text>
                    <View style={{
                        width: convertWidth('90%'),
                        height: convertWidth('5%'),
                        //backgroundColor: Constant.COLOR_GREEN6,
                        backgroundColor: "#F7F7F7",
                        
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            width: convertWidth('0.5%'),
                            height: convertWidth('5%'),
                            borderRadius: 10,
                            backgroundColor: "#028B7B",
                         
                        }}/>
                        <Text style={{marginLeft: convertWidth('3%'), color: Constant.COLOR_GREEN5,fontFamily: Constant.POPPINS_MEDIUM,fontSize:convertWidth('1.5%')}}>{"Feedback"}</Text>
                    </View>
                    <View>
                        <Text style={{ width: convertWidth('85%'), marginLeft: convertWidth('3%'), marginVertical: convertHeight('6%'),fontFamily: Constant.POPPINS_LIGHT, fontSize: convertWidth('1.2%') }}>
                            {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                        </Text>
                        
                    </View>
                    <View style={{
                        width: convertWidth('90%'),
                     
                        flexDirection: 'row'
                    }}>
                    <View>
                            <View style={{
                                width: convertWidth('60%'),
                                height: convertWidth('5%'),
                                //backgroundColor: Constant.COLOR_GREEN6,
                                backgroundColor: "#F7F7F7",

                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    width: convertWidth('0.5%'),
                                    height: convertWidth('5%'),
                                    borderRadius: 10,
                                    backgroundColor: "#028B7B",

                                }} />
                                <Text style={{ marginLeft: convertWidth('3%'), color: Constant.COLOR_GREEN5, fontFamily: Constant.POPPINS_MEDIUM, fontSize: convertWidth('1.5%') }}>{"Photo"}</Text>
                            </View>
                            <FlatList
                                style={{ width: convertWidth('60%')}}
                                data={dataFeedBack.data}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                renderItem={({ item }) =>
                                    <View style={[styles.cellFeedbackContainer, { width: convertWidth('15%')}]}>
                                        <ShadowView
                                            style={{
                                                height: convertWidth('15.5%'),
                                                width: convertWidth('25%'),
                                                backgroundColor: '#FFFFFF',
                                                shadowOpacity: 0.2,
                                                shadowRadius: 3,
                                                //elevation: 5,
                                                position: 'absolute',
                                                //borderWidth: 1,
                                                shadowColor: Constant.COLOR_GRAY2,
                                                shadowOffset: { width: 1, height: 1 },
                                            }}
                                        />
                                        <TouchableOpacity style={styles.cellPFeedbackForm}
                                            onPress={() => that._popImage(require('../../../assets/dummy/feedback_dummy.png'))}
                                        >
                                            <Image
                                                style={{
                                                    borderWidth: 1,
                                                    height: convertWidth('15%'),
                                                    width: convertWidth('15%'),
                                                }}
                                                resizeMode={'contain'}
                                                source={item.img.length > 5 ? { uri: item.img } : require('../../../assets/dummy/feedback_dummy.png')}
                                            />

                                        </TouchableOpacity>
                                        
                                    </View>
                                }
                            />
                    </View>
                     <View style={{alignItems: 'center'}}> 
                        <View style={{
                            width: convertWidth('30%'),
                            height: convertWidth('5%'),
                            //backgroundColor: Constant.COLOR_GREEN6,
                            backgroundColor: "#F7F7F7",

                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            
                            <Text style={{ marginLeft: convertWidth('3%'), color: Constant.COLOR_GREEN5, fontFamily: Constant.POPPINS_MEDIUM, fontSize: convertWidth('1.5%') }}>{"Signature"}</Text>
                        </View>
                            <Image
                                style={{
                                    borderWidth: 1,
                                    height: convertWidth('15%'),
                                    width: convertWidth('28%'),
                                }}
                                resizeMode={'contain'}
                                source={ require('../../../assets/dummy/feedback_dummy.png')}
                            />
                    </View>
                    </View>
                </View>*/
                   }
                {
                    //FEEDBACK IS COMPLETE END
                }
                {
                    //isCompletes == true && this._resultPresentation()
                }
                {isDetailMode == false &&  <View style={{ height: convertWidth('5%') }} />}
                {isDetailMode == false &&   <View style={{ flexDirection: 'row',marginLeft: convertWidth('5%') }}>
                    <View>
                        <Text style={styles.panelFeedbackTtitletext}>{"Doctor's Feedback (Required)"}</Text>
                        <TouchableOpacity style={{
                            width: convertWidth('40%'),
                            height: convertWidth('13%'),
                            paddingLeft: 15,
                            // backgroundColor : 'rgba(255,255,255,0.5)',
                            color: '#000',
                            fontSize: convertHeight('2.5%'),
                            borderWidth: 1,
                            borderColor: Constant.COLOR_WHITE3,
                            paddingLeft: convertWidth('2%'),
                            justifyContent: 'center',
                           alignItems: 'center'

                        }}
                            onPress={() => this.onOpenSignature(1)}
                        >
                          
                            {this.state.feedBackphoto != null && 
                            <Image
                                style={{ 

                                    width: convertWidth('40%'),
                                    height: convertHeight('15%') 
                                }}
                                resizeMode='contain'
                                source={{ uri:this.state.feedBackphoto.uri }}
                            />}
                           { this.state.feedBackphoto==null && 
                           <Text style={[styles.panelFeedbackSigntext,{color:"#a8a8a8"}]}>
                                  {"Attach feedback..."}
                            </Text>}
                            
                        </TouchableOpacity>
                        </View>
                    <View style={{ marginLeft: convertWidth('5%') }}>
                    <Text style={styles.panelFeedbackTtitletext}>
                    {"Medical Representation's Feedback (Optional)"}
                    </Text>
                        <TextInput underlineColorAndroid="rgba(0,0,0,0)"
                            defaultValue={''}
                            multiline={true}
                           // keyboardType={keyboardTypes}
                            placeholder={'please write your feedback'}
                            placeholderTextColor="#a8a8a8"
                            style={[styles.input, { fontFamily: Constant.POPPINS_LIGHT,}]}
                            onSubmitEditing={() => {
                                // ondone != null ? ondone() : null
                            }}
                            onChangeText={(txt) => this.sallesText(txt)}
                        />
                    </View>
                </View>}
                {isDetailMode == false &&    <View style={{ height: convertWidth('3%') }} />}
                {isDetailMode == false && <View style={{ flexDirection: 'row', marginLeft: convertWidth('5%') ,width:convertWidth('75%'),justifyContent:'space-between' }}
                >
                    <View style={{  }}><Text style={styles.panelFeedbackTtitletext}>{"Signature"}</Text>
                        <TouchableOpacity style={{
                            width: convertWidth('30%'),
                            height: convertHeight('16%'),
                            borderColor: Constant.COLOR_GRAY2,
                            borderWidth: 1,
                            borderRadius: 1,
                            borderStyle: 'dashed',
                            backgroundColor: Constant.COLOR_WHITE7,
                            justifyContent: 'center',
                            paddingLeft: convertWidth('2%')
                            //alignItems: 'center'

                        }}
                            onPress={() => this.onOpenSignature(0)}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Image
                                    style={{
                                        marginLeft: this.state.signphoto == null ? convertWidth('2%') : 0,
                                        //borderWidth: this.state.signphoto == null ? 0 : 1,
                                        width: convertWidth(this.state.signphoto == null ? '8%' : '29.5%'),
                                        height: convertHeight(this.state.signphoto == null ? '8%' : '15%')
                                    }}
                                    resizeMode='center'
                                    source={this.state.signphoto == null ? require('../../../assets/ASET/signaturedetail.png') : { uri: this.state.signphoto.uri }}
                                />
                                {this.state.signphoto == null && <Text style={styles.panelFeedbacktext}>{"Sign  Here"}</Text>}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.panelFeedbackTtitletext}>{"Upload Photo"}</Text>
                        <TouchableOpacity style={{
                            width: convertWidth('30%'),
                            height: convertHeight('16%'),
                            borderColor: Constant.COLOR_GRAY2,
                            borderWidth: 1,
                            borderRadius: 1,
                            borderStyle: 'dashed',
                            backgroundColor: Constant.COLOR_WHITE7,
                            justifyContent: 'center',
                            //paddingLeft: convertWidth('2%')
                            //alignItems: 'center'

                        }}
                            onPress={() => this.onOpenGallery()}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center'}} >
                            
                                <Image
                                    style={{ 
                                        marginLeft: this.state.localphoto == null ?convertWidth('2%'):0,
                                       // borderWidth: this.state.localphoto == null ? 0 : 1,
                                        width: convertWidth(this.state.localphoto == null ? '8%':'29.5%'), 
                                        height: convertHeight(this.state.localphoto == null ? '8%':'15%') }
                                    }
                                    resizeMode='contain'
                                    source={this.state.localphotourl == null ? require('../../../assets/ASET/pictdetail.png') : this.state.localphotourl}
                                />
                                {this.state.localphoto == null && <Text style={[styles.panelFeedbacktext]}>{"Upload Photo Here"}</Text>}
                        </View>
                        </TouchableOpacity>
                        
                    </View>
                   
                </View>}
                {isDetailMode == false &&   <View style={{ height: convertWidth('4%') }} />}
                {isDetailMode == false &&   <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft: convertWidth('5%')}}>
                <TouchableOpacity
                style={{borderWidth:0}}
                    onPress={()=>this.updateCheck()}
                >
                        <Image 
                            style={{ height: convertHeight('3.5%'), width:  convertWidth('3.5%')}}
                            resizeMode={'contain'}
                            source={this.getSrcChecl()}
                        />
                </TouchableOpacity>
                   
                    <Text style={{ marginLeft: convertWidth('2%'), fontSize: convertWidth('1.8%'), color: '#BEBEBE'}}>{"I approved, that the data has been presented"}</Text>
                </View>}
                {isDetailMode == false &&   <View style={{ height: convertWidth('4%') }} />}
                {isDetailMode == false && isCompletes == false && 
                    <TouchableOpacity
                    onPress={() => this.onSubmit(true)}
                    style={{
                        alignSelf: 'flex-start', marginLeft: convertWidth('5%'), width: convertWidth('17%'), height: convertWidth('5%'), 
                        justifyContent: 'center', alignItems: 'center', borderRadius: convertWidth('4%'),
                        backgroundColor: "#FF5857"
                    }}>
                    <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: convertWidth('1.9%'), color: "#fff" }}>{"Complete"}</Text>
                </TouchableOpacity>}

                {isCompletes == false && 
                <View style={{ height: convertWidth('5%') }} />
                }
            </ScrollView>
            
            {isSignature &&
                <SignatureViewModel
                    onCancel={this.onCloseSignature.bind(this)}
                    onSave={this.onSaveSign.bind(this)}
                />
            }
            {isPopImage &&
                <TouchableOpacity style={{
                    position: 'absolute',
                    height: convertHeight('100%'),
                    width: convertWidth('100%'),
                    backgroundColor: "rgba(0,0,0,0.9)",
                    //justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={()=>this._closePopImage()}
                >
                    <Image
                        style={{
                             height: convertHeight('80%'),
                              width: convertWidth('80%'),
                        }}
                        resizeMode={'contain'}
                        source={this.state.urlPopImage}
                    />
                </TouchableOpacity>
            }
            {isLoading == true &&
                loading()
            }
        </View>
    }
}


export default DoctorDetailViewModel;

/*
  <TouchableOpacity
                    style={[Styleapp._buttons,Styleapp._bubble]}
                    onPress={()=>this.onOpenSearchMap()}
                >

                <Text>Pick a Place</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[Styleapp._buttons, Styleapp._bubble]}
                onPress={() => this.onOpenTrack()}
                >
                    <Text>List Places</Text>
                </TouchableOpacity>
            <TouchableOpacity
                style={[Styleapp._buttons, Styleapp._bubble]}
                onPress={() => this.onOpenSignature()}
            >
                <Text>Signature Page</Text>
            </TouchableOpacity>
*/

const styles = StyleSheet.create({
    input: {
        width: convertWidth('40%'),
        height: convertWidth('13%'),
        paddingLeft: 15,
        // backgroundColor : 'rgba(255,255,255,0.5)',
        color: '#000',
        fontSize: convertHeight('2.5%'),
        borderWidth: 1,
        borderColor: Constant.COLOR_WHITE3,
        paddingLeft: convertWidth('2%'),
        textAlignVertical:'top'

    },
    paneltext:{
        fontFamily: Constant.POPPINS_REG,
        color: Constant.COLOR_BLACK,
        fontSize: convertWidth('1.4%')
    },
    titleTimetext: {
        fontFamily: Constant.POPPINS_MEDIUM,
        color: Constant.COLOR_GREEN3,
        fontSize: convertWidth('1.5%')
    },
    panelFeedbacktext: {
        fontFamily: Constant.POPPINS_REG,
        color: Constant.COLOR_BLACK,
        fontSize: convertWidth('1.2%')
    },
    panelFeedbackSigntext: {
       
        width: convertWidth('40%'),
        height: convertWidth('11%'),
        fontFamily: Constant.POPPINS_LIGHT,
        color: Constant.COLOR_BLACK,
        fontSize: convertWidth('1.5%')
    },
    panelFeedbackTtitletext: {
        fontFamily: Constant.POPPINS_REG,
        color: Constant.COLOR_BLACK,
        fontSize: convertWidth('1.5%'),
        marginBottom: convertHeight('2%')
    },
    cellContainer:{
        height: convertWidth('12%'),
        width: convertWidth('45%'),
        backgroundColor: "#fff",
        //elevation: 2,
        shadowColor: Constant.COLOR_GRAY2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3, 
        flexDirection: 'row',
        marginRight: 10
    },
    cellProductContainer:{
        height: convertWidth('12%'),
        width: convertWidth('25%'),
        backgroundColor: "#fff",
        marginHorizontal: convertWidth('1%')
    },
    cellFeedbackContainer:{
        height: convertWidth('20%'),
        width: convertWidth('25%'),
       // borderWidth:1,
        backgroundColor: "#fff",
        marginHorizontal: convertWidth('1%')
    },
    cellProductForm: {
        height: convertWidth('11.5%'),
        width: convertWidth('25%'),
   
        flexDirection: 'row',
     

    },
    cellPFeedbackForm: {
        height: convertWidth('15.5%'),
        width: convertWidth('25%'),
       

    },
     linegreen:{
        width: convertWidth('0.7%'),
         backgroundColor: Constant.COLOR_GREEN5
    },
    circelgreen:{
        height: convertWidth('4%'),
        width: convertWidth('4%'),
        borderRadius: convertWidth('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b7a2',
        marginHorizontal:convertWidth('2%'),
        marginTop:convertWidth('1%')
    },
    textcontainer:{
        margin:convertWidth('1%')
    }
})