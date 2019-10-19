import React from 'react';
import { View, Text, StyleSheet, Image, WebView, Dimensions, Alert, TextInput, TouchableOpacity, StatusBar, ScrollView, Keyboard, BackHandler } from "react-native";

import ShadowView from 'react-native-shadow-view';
//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, callAlert, validateEmail, getCordinat, loading } from '../../global/Global';
import { Styleapp } from '../../styleapp';
import { forgetPassUser, about, contact } from '../../module_api/module_resapi';
import Headers from '../module_header'
import MapView, { Marker } from "react-native-maps";
import { LEMARI_GLOBAL_LOAD } from '../../appcomponent/module_async/AsyncManager';
import KEYS from '../../appcomponent/module_async/utils/keyAsync';
// create a component
const deviceh = Dimensions.get('screen').height;
var that = null;
const _iconalamat = require('../../../assets/ASET/building.png');
const _iconatlp = require('../../../assets/ASET/contact.png');
const _iconemial = require('../../../assets/ASET/envelope_1.png');
export default class ContactUsScreen extends React.Component {
    onLayout(e) {
        const { width, height } = e.Dimensions.get('window');
        console.log(width, height);
    }
    constructor(props) {
        super(props);
        this.state = {
            KeyboardIsShow: false,
            isLoading: false,
            isMapReady: false,
            contact_corrdinate:null,
            abotutcontent: null,
            aboutustitle: null,
            contactemail:null,
            contactphone:null,
            contactalamat:null,
            contact_corrdinate:null
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
        this._reqContactUs().then((RES) => {
            console.log('contactus', RES);
            if (RES.api_message== "success") {
               that.setState({
                    contactemail:RES.emails,
                    contactphone:RES.phones,
                   contactalamat: RES.address,
                   contact_corrdinate: RES.lt_contactus + "," + RES.ln_contactus,
                   isLoading:false
               })
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


    render() {
        return <View style={{ backgroundColor: "#FDFDFD", position: 'absolute', width: convertWidth('100%'), height: convertHeight('83%'), top: this.state.KeyboardIsShow == true ? -convertHeight('10%') : 0 }}>
            <Headers
                navigation={this.props.navigation}
                burgeronpress={this.props._callPopBurger}
                titleheader={"Contact Us"}

            />
            <ScrollView
                style={{width: convertWidth('100%')}}
                contentContainerStyle={{flexGrow:1}}
            >
            <View style={{ width: convertWidth('100%'), alignItems: 'center', justifyContent: 'flex-end', height: convertHeight('15%') }}>
                <Text style={styles.titles}>{"Contact Us"}</Text>
            </View>
            <View style={{ width: convertWidth('100%'), alignItems: 'center', justifyContent: 'flex-end', height: convertHeight('35%') ,marginTop: convertHeight('5%')}}>
                {this.state.contact_corrdinate != null && this.state.isLoading == false &&
                  
                  <MapView
                        style={{ width: convertWidth('80%'), height: convertHeight('35%')}}
                        region={{
                            latitude: Number(getCordinat(this.state.contact_corrdinate)[0]),
                            longitude: Number(getCordinat(this.state.contact_corrdinate)[1]),
                            latitudeDelta: 0.004,
                            longitudeDelta: 0.004,
                        }}
                        provider={'google'}
                        mapType={'standard'}
                        scrollEnabled={false}
                        cacheEnabled={true}
                        maxZoomLevel={20}
                        minZoomLevel={10}
                        onLayout={()=>{this.setState({isMapReady:true})}}
                    >
                    {this.state.isMapReady == true && 
                        <Marker

                            coordinate={{
                                latitude: Number(getCordinat(this.state.contact_corrdinate)[0]),
                                longitude: Number(getCordinat(this.state.contact_corrdinate)[1]),
                            }}
                            title={"Location"}

                        />
                    }
                      
                    </MapView>
                }
            </View>
            <View
                style={styles.contentcontainer}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', width: convertWidth('30%'), marginHorizontal: convertWidth('0.8%')}}>
                    <ShadowView
                        style={{
                            width: convertWidth('30%'), height: convertHeight('20%'), position: 'absolute', top: convertHeight('3%'), backgroundColor: '#fff', shadowColor: '#A8A8A8',
                            shadowOffset: {
                                width: 0, height: 2,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                        }}
                    />
                    <View
                        style={{
                            width: convertWidth('6%'),
                            height: convertWidth('6%'),
                            borderRadius: convertWidth('6%'), backgroundColor: Constant.COLOR_GREEN5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: convertHeight('3%'),
                        }}
                    >
                        <Image
                            style={{
                                width: convertWidth('3%'),
                                height: convertWidth('3%'),
                            }}
                            source={_iconalamat}
                            resizeMode={'contain'}
                        />
                    </View>
                    
                    <Text style={styles.textcontent}
                        multiline={true}
                    >{this.state.contactalamat}</Text>
                    
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: convertWidth('30%'), marginHorizontal: convertWidth('0.8%')}}>
                    <ShadowView
                        style={{
                            width: convertWidth('30%'), height: convertHeight('20%'), position: 'absolute', top: convertHeight('3%'), backgroundColor: '#fff', shadowColor: '#A8A8A8',
                            shadowOffset: {
                                width: 0, height: 2,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                        }}
                    />
                    <View
                        style={{
                            width: convertWidth('6%'),
                            height: convertWidth('6%'),
                            borderRadius: convertWidth('6%'), backgroundColor: Constant.COLOR_GREEN5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: convertHeight('3%'),
                        }}
                    >
                        <Image
                            style={{
                                width: convertWidth('3%'),
                                height: convertWidth('3%'),
                            }}
                            source={_iconatlp}
                            resizeMode={'contain'}
                        />
                    </View>

                    <Text style={styles.textcontent}
                        multiline={true}
                    >{this.state.contactphone}</Text>

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: convertWidth('30%'), marginHorizontal: convertWidth('0.8%')}}>
                    <ShadowView
                        style={{
                            width: convertWidth('30%'), height: convertHeight('20%'), position: 'absolute', top: convertHeight('3%'), backgroundColor: '#fff', shadowColor: '#A8A8A8',
                            shadowOffset: {
                                width: 0, height: 2,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                        }}
                    />
                    <View
                        style={{
                            width: convertWidth('6%'),
                            height: convertWidth('6%'),
                            borderRadius: convertWidth('6%'), backgroundColor: Constant.COLOR_GREEN5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: convertHeight('3%'),
                        }}
                    >
                        <Image
                            style={{
                                width: convertWidth('3%'),
                                height: convertWidth('3%'),
                            }}
                            source={_iconemial}
                            resizeMode={'contain'}
                        />
                    </View>

                    <Text style={styles.textcontent}
                        multiline={true}
                    >{this.state.contactemail}</Text>

                </View>
            </View>
            </ScrollView>
            {this.state.isLoading == true &&
                loading()
           }
        </View>
    }
    //REst
    async _reqContactUs() {
        try {
            this.setState({
                isLoading:true
            })
            return resulth = await contact().then((res) => {
                if (res) {
                    if (res.api_message == 'success') {

                        return res;
                    } else {
                        //callAlert("Failed", res.api_message);
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
            return this.onLoad
        }
    }
    onLoad() {

        return LEMARI_GLOBAL_LOAD(KEYS.KEY_CONTENT_CONTACT).then(res => {
            return res[0];
        })
    }
}

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
        fontSize: convertWidth('1.5%'),
        height: convertHeight('20%'),
        width: convertWidth('20%'),
        textAlign: 'center',
        fontFamily: Constant.POPPINS_MEDIUM
    },
    map: {
        flex: 1,
    },
});
