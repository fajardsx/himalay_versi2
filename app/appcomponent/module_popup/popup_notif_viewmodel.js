import React, { Component } from 'react';
import { Text, TextInput, View, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, Keyboard } from "react-native";
import Constant from "../../global/Constant";
import { convertHeight, convertWidth, formateFullDateNumberUTCTime } from "../../global/Global";
import user from "../../global/user";
import { WebView } from 'react-native-webview';

class PopNotifViewModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            KeyboardIsShow: false,
            feedtxt: "",
        }
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", function () {

            this.setState({
                KeyboardIsShow: true
            })
        }.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", function () {

            this.setState({ KeyboardIsShow: false });
        }.bind(this));
        console.log(this.props.data);
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    onSubmitFeedBack() {
        const { KeyboardIsShow, feedtxt } = this.state;
        Keyboard.dismiss();
        this.props.onPressStart(feedtxt)
    }
    render() {
        const { KeyboardIsShow, feedtxt } = this.state;
        return <View style={{
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
            backgroundColor: 'rgba(0,0,0,0.8)',
            position: 'absolute',
            zIndex: 10,
            //justifyContent: 'center',
            alignItems: 'center',
        }}>
            <KeyboardAvoidingView
                behavior='padding'
                style={{
                    height: convertHeight('80%'),
                    width: convertWidth('80%'),
                    marginTop: KeyboardIsShow ? 0 : convertHeight('10%'),
                    backgroundColor: Constant.COLOR_WHITE4,
                    alignItems: 'center', overflow: 'hidden',
                    justifyContent: 'center',
                    paddingHorizontal: convertWidth("10%")
                }}>
                <Text style={{
                    width: convertWidth('75%'),
                    fontSize: convertWidth("3%"),
                    fontFamily: Constant.POPPINS_BOLD
                }}>
                    {this.props.data.title}
                </Text>
                <Text style={{
                    width: convertWidth('75%'),
                    fontSize: convertWidth("1.2%"),
                    fontFamily: Constant.POPPINS_REG
                }}>
                    {formateFullDateNumberUTCTime(this.props.data.date, 'DD MMMM YYYY | HH:MM:SS')}
                </Text>
                <View
                    style={{
                        width: convertWidth('78%'),
                        height: convertHeight('66%'),
                        // marginTop: convertHeight('10%'),
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
                            width: convertWidth('75%'),
                            color: Constant.COLOR_GREEN5,
                            alignSelf: 'center',

                            // borderWidth:1,
                            // height:convertHeight('90%')
                        }}
                        originWhitelist={['*']}
                        source={{ html: this.props.data.content }}
                    // source={{ uri:"https://facebook.com" }}

                    />
                </View>
                <TouchableOpacity style={{
                    position: 'absolute',
                    backgroundColor: Constant.COLOR_WHITE3,
                    height: convertHeight('5%'),
                    width: convertWidth('3%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 0,
                    right: 0
                }}
                    onPress={() => this.props.onClose()}
                >
                    <Image
                        style={{
                            width: convertWidth('2%'),
                            height: convertHeight('2%'),
                        }}
                        source={require("../../../assets/ASET/xclose.png")}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    }

}

export default PopNotifViewModel;


