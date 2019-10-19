import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert, TextInput, TouchableOpacity, FlatList, ScrollView, Keyboard, BackHandler } from "react-native";

import ShadowView from 'react-native-shadow-view';
//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, callAlert, validateEmail, getCordinat, loading } from '../../global/Global';
import { Styleapp } from '../../styleapp';
import { forgetPassUser, about, contact, help } from '../../module_api/module_resapi';
import Headers from '../module_header'
import MapView, { Marker } from "react-native-maps";
import PanelHelp from '../../utils/panelhelps';
import HelpCell from './helpcontent';
import { LEMARI_GLOBAL_LOAD } from '../../appcomponent/module_async/AsyncManager';
import KEYS from '../../appcomponent/module_async/utils/keyAsync';
// create a component

var that = null;

export default class HelpScreen extends React.Component {
    onLayout(e) {
        const { width, height } = e.Dimensions.get('window');
        console.log(width, height);
    }
    constructor(props) {
        super(props);
        this.state = {
            KeyboardIsShow: false,
            isLoading: false,
            helpContent:[]
        };
        that = this;
    }

    dimensionhandler = (dim) => this.setState({ dimensi: dim });
    componentWillMount() {
        Dimensions.addEventListener('change', this.dimensionhandler);
        
    }
    componentDidMount() {
        this.backbuttonHandler = BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick.bind(this));
        let that = this;
       this._reqHelp().then((RES) => {
            console.log('help', RES);
            if (RES.api_message== "success") {
                that.setState({
                    helpContent:RES.data
                    ,
                }, () => that.setState({
                    isLoading: false
                }))
               
            }else{
                that.setState({
                    isLoading: false
                });
            }
        })
    }
    componentWillUnmount() {
        //console.log("remove title");
        this.backbuttonHandler.remove();

    }
    handleBackButtonClick() {
        this.props.onClose();
        return true;
    }
    _onPressButton() {
        Keyboard.dismiss();
        this.props.navigation.navigate(Constant.VM_APPS);
    }

    _onrenderHelp(){
        let cell = []
        this.state.helpContent.forEach((datas, index) => {
            cell.push()

        })
            //<PanelHelp key={index} titles1={datas.question}>
            //< HelpCell answer = { datas.answer } />
           // </PanelHelp >
        return cell;
    }
    render() {
        return <View style={{ backgroundColor: "#FDFDFD", position: 'absolute', width: convertWidth('100%'), height: convertHeight('83%'), top: this.state.KeyboardIsShow == true ? -convertHeight('10%') : 0 }}>
            <Headers
                navigation={this.props.navigation}
                burgeronpress={this.props._callPopBurger}
                titleheader={"Help"}
            />
           
            
            {this.state.isLoading == false &&
            <FlatList
            //scrollEnabled={false}
                style={{ width: convertWidth('100%'), marginTop: convertHeight('5%') }}
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                data={this.state.helpContent} keyExtractor={(item, index) => index.toString()}
                renderItem={(datas) => (
                    <PanelHelp key={datas.index} titles1={datas.item.question}>
                        < HelpCell answer = { datas.item.answer } />
                    </PanelHelp >
                )}
            />
                }
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Text style={{ color: '#137365', fontFamily: Constant.POPPINS_MEDIUM, fontSize: convertWidth('1.5%') }}>Versi : {Constant.NAME_VERSION}</Text>
            </View>
            {this.state.isLoading == true &&
                loading()
           }
        </View>
    }
    //REst
    async _reqHelp() {
        try {
            this.setState({
                isLoading:true
            })
            return resulth = await help().then((res) => {
                if (res) {
                    if (res.api_message == 'success') {

                        return res;
                    } else {
                       // callAlert("Failed", res.api_message);
                        //that.setState({ isLoading: false });
                        return that.onLoad();
                    }

                } else {
                   // callAlert("Failed", res);
                   // that.setState({ isLoading: false });
                    return that.onLoad();
                }
            });
        } catch (error) {
            console.log(error)
            return this.onLoad();
        }
    }

    onLoad(){
        return LEMARI_GLOBAL_LOAD(KEYS.KEY_CONTENT_HELP).then(res=>{
            return res[0];
        })
    }
}
/*
 <View
                style={{ width: convertWidth('100%'),marginTop:convertHeight('10%')}}
                contentContainerStyle={{ flexGrow: 1, alignItems:'center'}}
            >
                {this.state.isLoading == false &&
                    this._onrenderHelp()
                }
            </View>
*/
// define your styles
const styles = StyleSheet.create({
    titles: {
        fontSize: convertWidth('3.2%'),
        color: Constant.COLOR_GREEN2,
        fontFamily: Constant.POPPINS_MEDIUM
    },

    image: {

        flex: 0.2,
        height: 30,
        right: 12,
        marginTop: '5%'
    },
    input: {
        width: '100%',
        paddingLeft: 15,
        // backgroundColor : 'rgba(255,255,255,0.5)',
        color: '#000',
        fontSize: convertHeight('3%'),
        textAlign: 'center'

    },
    contentcontainer:{
        marginTop: convertHeight('5%'),
        justifyContent: 'center',
        width: convertWidth('100%'),
        flexDirection: 'row'
    },
    cellcontainer: {
        justifyContent: 'center', width: convertWidth('30%')
    },
    textcontent: {
        fontSize: convertWidth('2%'),
        height: convertHeight('20%'),
        width: convertWidth('20%'),
        textAlign: 'center',
        fontFamily: Constant.POPPINS_MEDIUM
    },
    map: {
        flex: 1,
    },
});
