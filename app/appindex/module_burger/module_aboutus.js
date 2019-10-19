import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert, TextInput, TouchableOpacity, StatusBar, ScrollView, Keyboard, BackHandler } from "react-native";

import Permissions from 'react-native-permissions';
//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, callAlert, validateEmail } from '../../global/Global';
import { Styleapp } from '../../styleapp';
import { forgetPassUser, about } from '../../module_api/module_resapi';
import Headers from '../module_header'
import { WebView } from 'react-native-webview';
import { LEMARI_GLOBAL_LOAD } from '../../appcomponent/module_async/AsyncManager';
import KEYS from '../../appcomponent/module_async/utils/keyAsync';
// create a component
const deviceh = Dimensions.get('screen').height;
var that = null;

export default class AboutUsScreen extends React.Component {
    onLayout(e) {
        const { width, height } = e.Dimensions.get('window');
        console.log(width, height);
    }
    constructor(props) {
        super(props);
        this.state = {
            KeyboardIsShow: false,

            isLoading: true,

            abotutcontent: null,
            aboutustitle: null
        };
        that = this;
    }

    dimensionhandler = (dim) => this.setState({ dimensi: dim });
    componentWillMount() {
        Dimensions.addEventListener('change', this.dimensionhandler);
        this.setState({
            allowgps: Constant.PERMISSION_GPS,
            allownotif: Constant.PERMISSION_NOTIF
        })
    }
    componentDidMount() {
        this.backbuttonHandler = BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick.bind(this));
        let that = this;
        this._reqAboutUs().then((RES) => {
            console.log('about', RES);
            if (RES.content != null || RES.content != undefined) {
                that.setState({
                    abotutcontent: RES.content,
                    aboutustitle: RES.name
                }, () => that.setState({
                    isLoading: false
                }))
            }
            that.setState({
                isLoading: false
            });
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
                titleheader={"About Us"}

            />
            <View style={{ width: convertWidth('100%'), alignItems: 'center', justifyContent: 'flex-end', height: convertHeight('18%') }}>
                <Text style={styles.titles}>{"About " + Constant.NAME_APPS}</Text>
            </View>

            {this.state.isLoading == false && this.state.abotutcontent != null &&
                <View
                    style={{
                        width: convertWidth('95%'),
                        height: convertHeight('45%'),
                        overflow: 'hidden',
                        alignSelf: 'center'
                    }}
                >
                    <WebView
                        scalesPageToFit={true}
                        cacheEnabled={true}
                        bounces={true}
                        javaScriptEnabled={true}
                        startInLoadingState={false}
                        //injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                        style={{
                            width: convertWidth('95%'),
                            color: Constant.COLOR_GREEN5,
                            alignSelf: 'center',

                            // borderWidth:1,
                            // height:convertHeight('90%')
                        }}
                        originWhitelist={['*']}
                        source={{ html: this.state.abotutcontent }}

                    />
                </View>

            }
        </View>
    }
    //REst
    async _reqAboutUs() {
        this.setState({
            isLoading: true
        })
        try {
            return resulth = await about().then((res) => {
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
            return this.onLoad();
        }
    }
    onLoad() {
        return LEMARI_GLOBAL_LOAD(KEYS.KEY_CONTENT_ABOUT).then(res => {
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

    }
});
