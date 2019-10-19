import React from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Dimensions, Alert, TextInput, TouchableOpacity, StatusBar, ScrollView, Keyboard, BackHandler } from "react-native";


//
import Constant from '../global/Constant';
import { convertHeight, convertWidth, callAlert, validateEmail } from '../global/Global';
import { Styleapp } from '../styleapp';
import { forgetPassUser } from '../module_api/module_resapi';


// create a component
const deviceh = Dimensions.get('screen').height;
var that = null;

export default class Resetscreen extends React.Component {
    onLayout(e) {
        const { width, height } = e.Dimensions.get('window');
        console.log(width, height);
    }
    constructor(props) {
        super(props);
        this.state = {
            KeyboardIsShow: false,
            nama: "",
            pass: "",
            dimensi: Dimensions.get('window'),
            isLoading: false,
            allownotif: false,
            allowgps: false,
            oldpass: "",
            confirmpass: "",
            newpass: "",
            myposition: {}
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
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", function () {

            this.setState({
                KeyboardIsShow: true
            })
        }.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", function () {

            this.setState({ KeyboardIsShow: false });
        }.bind(this));


    }
    componentWillUnmount() {
        //console.log("remove title");
        this.backbuttonHandler.remove();
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        Dimensions.removeEventListener('change', this.dimensionhandler);
    }
    handleBackButtonClick() {
        // this.props.navigation.goBack();
        this.props.onBack != null ? () => this.props.onBack() : null;
        return true;
    }
    _onPressButton() {
        Keyboard.dismiss();
        this.props.navigation.navigate(Constant.VM_APPS);
    }

    setform() {
        const { width, height } = this.state.dimensi;
        const mode = height > width ? "portaid" : "landscape"
        return <View style={{ width: "100%" }}

        >
            <KeyboardAvoidingView
                behavior='height'
                style={{ width: '100%', justifiyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{

                        width: convertWidth('25%'),

                    }}
                    onPress={this.props.onBack != null ? () => this.props.onBack() : null}
                >
                    <Image
                        style={{

                            width: '100%', height: convertHeight('18%'),
                            marginTop: convertWidth('2%'),

                        }}
                        resizeMode={'contain'}
                        source={require("../../assets/logo_himalaya.png")}
                    />
                </TouchableOpacity>

            </KeyboardAvoidingView>
            <KeyboardAvoidingView
                behavior='height'
                style={{
                    backgroundColor: Constant.COLOR_WHITE1,
                    marginBottom: convertHeight('10%'),
                    justifyContent: 'center'
                }}>
                <View style={styles.inputContainer}>

                    <TextInput underlineColorAndroid="rgba(0,0,0,0)"
                        defaultValue=""
                        ref="inputemail"
                        placeholder="Current Password"
                        placeholderTextColor="#a8a8a8"
                        secureTextEntry
                        style={styles.input}
                        onSubmitEditing={() => this.refs.new_input.focus()}
                        onChangeText={(txt) => {
                            this.setState({
                                oldpass: txt
                            })
                        }}
                    />
                </View>
                <View style={styles.inputContainer}>

                    <TextInput underlineColorAndroid="rgba(0,0,0,0)"
                        defaultValue=""
                        ref="new_input"
                        placeholder="New Password"
                        placeholderTextColor="#a8a8a8"
                        secureTextEntry
                        style={styles.input}
                        onSubmitEditing={() => this.refs.confrim_input.focus()}
                        onChangeText={(txt) => {
                            this.setState({
                                newpass: txt
                            })
                        }}
                    />
                </View>

                <View style={styles.inputContainer}>

                    <TextInput underlineColorAndroid="rgba(0,0,0,0)"
                        defaultValue=""
                        ref="confrim_input"
                        placeholder="Confirm Password"
                        placeholderTextColor="#a8a8a8"
                        secureTextEntry
                        style={styles.input}
                        onChangeText={(txt) => {
                            this.setState({
                                confirmpass: txt
                            })
                        }}
                    />
                </View>





            </KeyboardAvoidingView>
            <TouchableOpacity
                onPress={() => this.trySubmit()}
                style={styles.loginContainer}>
                <Text style={styles.loginText}>Update Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: convertWidth('2%'),
                    top: convertWidth('2%'),
                    width: convertWidth('4%'),
                    height: convertWidth('4%'),
                    borderRadius: convertWidth('4%'), backgroundColor: Constant.COLOR_RED2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => this.props.onBack()}
            >
                <Image
                    style={{ width: convertWidth('1.8%'), height: convertWidth('1.8%') }}
                    resizeMode={'contain'}
                    source={require('../../assets/ASET/xclose_white.png')}
                />
            </TouchableOpacity>
        </View>
    }
    render() {
        return <View style={{ backgroundColor: "#FDFDFD", position: 'absolute', width: convertWidth('100%'), height: convertHeight('100%'), top: this.state.KeyboardIsShow == true ? -convertHeight('15%') : 0 }}>
            {this.setform()}
        </View>
    }
    trySubmit() {
        const { oldpass, newpass, confirmpass } = this.state;
        //this.props.onSend();
        if (oldpass.length < 2 || newpass.length < 2 || confirmpass.length < 2) {
            callAlert("Failed", "Please Fill Form First")
            return;
        }
        if (newpass !== confirmpass) {
            callAlert("Failed", "Confirm Pass Not Correct")
            return;
        }
        this.props.onSend({ old: oldpass, new: newpass });
    }
}

// define your styles
const styles = StyleSheet.create({
    logoContainer: {
        marginTop: "20%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleLogo: {
        height: 90,
    },
    backgroundImage: {
        width: '100%',
        height: deviceh,
        position: 'absolute'
    },
    copyrightText: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        color: '#000',
    },
    copyrightContainer: {

        width: '100%',
        position: 'absolute',
        bottom: '12%',
    },
    forgetText: {
        width: '100%',
        fontSize: 21,
        textAlign: 'left',
        marginBottom: '3%',
        color: '#000',
        letterSpacing: 5
    },

    loginContentContainer: {
        paddingTop: '20%',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        // backgroundColor : 'red',
        margin: 50,
    },
    inputContainer: {
        flexDirection: 'row',

        height: convertHeight('9%'),
        marginBottom: 10,
        marginTop: 20,
        alignSelf: 'center',
        borderColor: '#E2E3E5',
        justifyContent: 'flex-start',
        width: convertWidth('50%'),
        borderWidth: 1,
        borderRadius: 10
    },
    iconContainer: {
        height: '100%',
        width: convertWidth('8%'),
        borderColor: Constant.COLOR_GRAY2,
        borderRightWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    forgotPassContainer: {
        height: 50,
        width: '92%',
        //alignSelf: 'flex-end'
        //  textAlign : 'left',
    },
    forgotPassText: {
        fontSize: convertWidth('2.2%'),
        textAlign: 'right',
        color: Constant.COLOR_GREEN1,
        fontFamily: Constant.POPPINS_REG,
    },
    TitleText: {
        fontSize: convertWidth('2.5%'),
        color: Constant.COLOR_BLACK,
        fontFamily: Constant.POPPINS_MEDIUM
    },
    TitleSubText: {
        marginTop: convertHeight('7%'),
        marginBottom: convertHeight('3%'),
        textAlign: 'center',
        fontSize: convertWidth('1.8%'),
        color: Constant.COLOR_BLACK,
        letterSpacing: 2,
        fontFamily: Constant.POPPINS_REG
    },
    subTitleText: {
        fontSize: 20,
        color: Constant.COLOR_GRAY2,
        fontFamily: Constant.POPPINS_REG,
        marginBottom: 40
    },
    loginContainer: {
        width: convertWidth('27%'),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: convertWidth('6%'),
        backgroundColor: Constant.COLOR_ORANGE1,
        borderRadius: convertWidth('16%')
    },
    allowContainer: {
        width: 120,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 34,
        borderRadius: 40,
        backgroundColor: '#fff',
        borderWidth: 1
    },
    submitContainer: {
        width: '100%',

        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 57,
        backgroundColor: "rgb(225, 149, 24)",
        borderRadius: 4
    },
    loginText: {
        fontSize: convertWidth('2%'),
        color: '#ffffff',
        fontFamily: Constant.POPPINS_REG,
    },
    barLogin: {
        flexDirection: 'row',
        //borderWidth: 1,
        width: '80%',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',

    }


});
