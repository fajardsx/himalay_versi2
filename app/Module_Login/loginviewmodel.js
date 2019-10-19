import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, Alert, TextInput, TouchableOpacity, StatusBar, ScrollView, Keyboard, BackHandler } from "react-native";

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from "@react-native-community/geolocation";
import Constant from '../global/Constant';
import { convertHeight, convertWidth, loading, callAlert, validateEmail, addLocal, getLocal } from '../global/Global';
import { Styleapp } from '../styleapp';
import { connect } from 'react-redux';
import ACTION_TYPE from "../redux/actions/actions";
//
import user from '../global/user';
import { loginUser } from '../module_api/module_resapi'
import { LEMARI_GLOBAL_LOC, SYNCLoc, LEMARI_GLOBAL_LOAD } from '../appcomponent/module_async/AsyncManager';
import KEYS from '../appcomponent/module_async/utils/keyAsync';
import ScreeDevmode from '../screen/screen_devmode';


// create a component
const deviceh = Dimensions.get('screen').height;
var that = null;

class LoginScreen extends React.Component {
    onLayout(e) {
        const { width, height } = e.Dimensions.get('window');
        console.log(width, height);
    }
    constructor(props) {
        super(props);
        this.state = {
            KeyboardIsShow: false,
            nama: "",
            tempnama: "",
            pass: "",
            dimensi: Dimensions.get('window'),
            isLoading: false,
            allownotif: false,
            allowgps: false,
            allowfile: false,
            isAuthLoading: true,
            myposition: {},
            tryLogin: false
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
        // check('location').then(response => {
        //     // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        //     console.log(response);
        //     let result = true;
        //     if (response != 'authorized') {
        //         result = false;
        //     }
        //     this.setState({ allowgps: result })
        // })
        // Permissions.check("storage").then(response => {
        //     // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        //     console.log(response);
        //     let result = true;
        //     if (response != "authorized") {
        //         result = false;
        //         this._onReqPermissionStorage();
        //     }
        //     this.setState({ allowfile: result });
        // });
        //
        this.checkPermission()
        //check local
        getLocal(Constant.KEYDATA).then((res) => {
            console.log("Local : ", res);

            if (res == null || res == undefined) {

                that.setState({
                    isAuthLoading: false,
                    // isLoading: true
                })
            } else {

                that.setState({
                    // isAuthLoading: tru,
                    nama: res.profile_email,
                    pass: res.profile_pass,
                    tryLogin: false,
                    isAuthLoading: false,
                    isLoading: false
                })
            }
        })


    }
    componentWillUnmount() {
        //console.log("remove title");
        this.backbuttonHandler.remove();
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        Dimensions.removeEventListener('change', this.dimensionhandler);
    }
    //check
    checkPermission = () => {
        Promise.all([
            check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION),
            check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION),
            check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        ]).then(([bgStatus, coarseStatus, fineStatus]) => {
            console.log({ bgStatus, coarseStatus, fineStatus });
            if (bgStatus == RESULTS.DENIED || coarseStatus == RESULTS.DENIED || fineStatus == RESULTS.DENIED) {

                return that._requestPermission();
            }
            if (bgStatus == RESULTS.GRANTED || coarseStatus == RESULTS.GRANTED || fineStatus == RESULTS.GRANTED) {
                // kwkwkwkwkw(that.cfgResult.bind(this));
                that.setState({ allowgps: true })
            }
        })
    }
    async _requestPermission() {
        const fineStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        const coarseStatus = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
        const bgsStatus = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
        if (fineStatus == RESULTS.GRANTED || coarseStatus == RESULTS.GRANTED || bgsStatus == RESULTS.GRANTED) {

            that.setState({ allowgps: true })
        }
        return { fineStatus, coarseStatus, bgsStatus };
    };
    //
    handleBackButtonClick() {
        Alert.alert("", "Do you want to exit the application?", [
            { text: "Yes", onPress: () => BackHandler.exitApp() },
            { text: "No", onPress: () => console.log("") }
        ]);

        return true;
    }
    _onPressButton() {
        Keyboard.dismiss();
        //CLEAR LOCAL SCHEDULE
        SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res => {
            console.log("KEY_SCHEDULE", res);
            if (res) {
                SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE)
            }

        }).then(() => {
            SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res => {
                console.log("KEY_SCHEDULE", res);
            })
        }).then(() => {
            that.tryLog();
        })


    }
    _onPressPermission(id) {
        const { allowgps, allownotif } = this.state;
        if (id === Constant.TYPE_GPS) {
            this._onCallGPS();
        }
        else if (id === Constant.TYPE_NOTIF) {

            this.setState({
                allownotif: !allownotif,
            }, () => Constant.updatePermission(id, this.state.allownotif))
        }
    }
    _onpermissiongpsDone() {
        //Permissions.check('location').then(response => {
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log(response);
        let result = true;
        if (response != 'authorized') {
            result = false;
        }
        this.setState({ allowgps: result }, () => Constant.updatePermission(Constant.TYPE_GPS, this.state.allowgps))
        // })
    }
    _onCallGPS() {
        this._onReqPermissionLocation();

    }
    _onReqPermissionStorage() {
        Permissions.request('storage').then(response => {
            console.log(response);
            let result = true;
            if (response != "authorized") {
                result = false;
            }
            this.setState({ allowfile: result })
        })
    }
    _onReqPermissionLocation() {
        this.checkPermission()
        // Permissions.request('location').then(response => {
        //     console.log(response);
        //     let result = true;
        //     if (response != "authorized") {
        //         result = false;
        //     }
        //     this.setState({ allowgps: result }, () => this._syncLocation())
        // })
    }
    _syncLocation() {
        //this._onpermissiongpsDone();
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                    latitude,
                    longitude
                };
                console.log(newCoordinate);
                this.setState({
                    myposition: newCoordinate,
                    allowgps: true
                }, () => this._onpermissiongpsDone())
            },
            error => console.log(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        )
    }
    onForgotPage() {
        this.props.navigation.navigate(Constant.VM_FORGOT_SCREEN);
    }
    setform() {
        const { width, height, isLoading, isAuthLoading } = this.state.dimensi;
        const mode = height > width ? "portaid" : "landscape"
        return <View style={{ width: "100%" }}

        >
            <TouchableOpacity style={{
                width: convertWidth('100%'),
                height: convertHeight('100%'),
                backgroundColor: 'transparent',
                position: 'absolute'
            }}
                onPress={() => Keyboard.dismiss()}
            />
            <View style={{ width: '100%', justifiyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{

                        width: convertWidth('25%'), height: convertWidth('10%'),
                        marginTop: convertWidth('2%'),

                    }}
                    resizeMode={'contain'}
                    source={require("../../assets/logo_himalaya.png")}
                />
                <Text style={[styles.TitleText, { marginTop: convertHeight('2%') }]}>{"Welcome"}</Text>

            </View>
            <View style={{ height: convertHeight('2%') }} />

            <View style={{
                flexDirection: 'row', backgroundColor: Constant.COLOR_WHITE1,

                marginBottom: convertWidth('2%')
            }}>
                <View style={styles.containerSubmit}>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Image
                                style={{
                                    width: convertWidth('4%'), height: convertHeight('4%')
                                }}
                                resizeMode={'contain'}
                                source={require("../../assets/ASET/ic_account_circle_1.png")}
                            />
                        </View>
                        <TextInput underlineColorAndroid="rgba(0,0,0,0)"
                            defaultValue=""
                            placeholder="Username or email"
                            keyboardType='email-address'
                            placeholderTextColor="#97989A" style={styles.input}
                            onSubmitEditing={() => {
                                this.refs.passinput.focus();
                            }}
                            onChangeText={(txt) => {
                                this.setState({
                                    nama: txt
                                })
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Image
                                style={{
                                    width: convertWidth('4%'), height: convertHeight('4%')
                                }}
                                resizeMode={'contain'}
                                source={require("../../assets/ASET/ic_vpn_key_1.png")}
                            />
                        </View>
                        <TextInput underlineColorAndroid="rgba(0,0,0,0)"
                            defaultValue=""
                            ref="passinput"
                            placeholder="Password"
                            placeholderTextColor="#a8a8a8"
                            secureTextEntry style={styles.input}
                            onChangeText={(txt) => {
                                this.setState({
                                    pass: txt
                                })
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => this.onForgotPage()}
                        style={styles.forgotPassContainer}>
                        <Text style={styles.forgotPassText}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignSelf: 'center',
                        backgroundColor: "#ECECEC",
                        width: 1,
                        height: "90%"
                    }}
                />
                <View style={styles.containerSubmit}>
                    <View style={styles.barLogin}>
                        <Image
                            style={{
                                width: convertWidth('6%'), height: convertHeight('6%'),
                                //margin: convertWidth('1%')
                            }}
                            resizeMode={'contain'}
                            source={require("../../assets/ASET/LONCENG.png")}
                        />
                        <Text style={[styles.forgotPassText, { textAlign: "left", fontSize: convertWidth('2.2%'), color: Constant.COLOR_GRAY, width: convertHeight('25%') }]}>
                            Notifications
                        </Text>
                        <TouchableOpacity onPress={() => this._onPressPermission(Constant.TYPE_NOTIF)}
                            style={[styles.allowContainer, { backgroundColor: this.state.allownotif ? Constant.COLOR_GREEN1 : "#fff" }]}
                        >
                            <Text style={[styles.loginText, { fontSize: convertWidth('1.5%'), color: this.state.allownotif ? "#fff" : "#C1C1C2" }]}>Allow</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.barLogin}>
                        <Image
                            style={{
                                width: convertWidth('6%'), height: convertHeight('6%'),
                                // margin: convertWidth('1%')
                            }}
                            resizeMode={'contain'}
                            source={require("../../assets/ASET/LOCATION.png")}
                        />
                        <Text style={[styles.forgotPassText, { textAlign: "left", fontSize: convertWidth('2.2%'), color: Constant.COLOR_GRAY, width: convertHeight('25%') }]}>
                            Location
                        </Text>
                        <TouchableOpacity onPress={() => this._onPressPermission(Constant.TYPE_GPS)}
                            style={[styles.allowContainer, { backgroundColor: this.state.allowgps ? Constant.COLOR_GREEN1 : "#fff" }]}
                        >
                            <Text style={[styles.loginText, { fontSize: convertWidth('1.5%'), color: this.state.allowgps ? "#fff" : "#C1C1C2" }]}>Allow</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <TouchableOpacity onPress={() => this._onPressButton()} style={styles.loginContainer}>
                <Text style={styles.loginText}>Sign in</Text>
            </TouchableOpacity>
            <Text style={{ position: 'absolute', top: 0, left: 0, color: '#000' }}>{"ver." + Constant.NAME_VERSION}</Text>
        </View>
    }
    render() {
        return <View style={{ backgroundColor: "#fff", bottom: this.state.KeyboardIsShow == true ? "10%" : 0 }}>
            {this.state.isAuthLoading == false && this.setform()}
            {this.state.tryLogin && <View style={{ width: convertWidth('100%'), height: convertHeight('100%'), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.TitleText, { textAlign: 'center' }]}>
                    {"Welcome Back, " + user.getNameUser() + "\n Please Wait"}
                </Text>
            </View>}
            <ScreeDevmode />
            {this.state.isLoading && loading()}
        </View>
    }

    _onSuccessLogin() {

        this.setState({ isAuthLoading: false }, () => this.props.navigation.navigate(Constant.VM_APPS, { emaillogin: this.state.tempnama, firstlogin: true }))

    }
    tryLog() {
        console.log("login")
        const { allowgps, allownotif } = this.state;
        if (allowgps == false) {
            return callAlert("Permission", "Please allow Location Permission ");
        }
        if (allownotif == false) {
            return callAlert("Permission", "Please allow Notification Permission ");
        }
        if (!validateEmail(this.state.nama)) {
            return callAlert("Email", "Format email not valid ");
        }

        if (this.state.pass != undefined && this.state.pass.length <= 5) {

            return callAlert("Password", "Minimum 6 character ");
        }
        let data = new FormData();
        data.append("email", this.state.nama);
        data.append("password", this.state.pass);
        this.setState({
            isLoading: true,
            tempnama: this.state.nama
        });
        loginUser(data).then((res) => {
            console.log('resulth log', res);

            if (res) {
                if (res.api_message == 'success') {
                    if (res.status != "Active") {
                        callAlert("Not Active", "Your account not active.");
                        //that.props.navigation.goBack();
                        return;
                    }
                    let users = user.onUpdateUserData(res, that.state.pass, true);
                    addLocal(Constant.KEYDATA, users);
                    LEMARI_GLOBAL_LOC([res.pdf_files], KEYS.KEY_PDF)
                    //callAlert("", res.api_message+" Login");
                    that.props.updateuser(users)
                    that.setState({
                        nama: "",
                        pass: "",
                        isAuthLoading: false,
                        isLoading: false,
                    }, () => that._onSuccessLogin());
                } else {
                    that.setState({
                        isAuthLoading: false,
                        tryLogin: false,
                        isLoading: false,
                    })
                    callAlert("Failed", res.api_message);

                }

            } else {
                callAlert("Failed", res);
                that.setState({ isLoading: false, isAuthLoading: false });
            }

        }
        ).then((res) => {
            console.log('resulth log', res);
        });

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
        borderColor: "#C1C1C2",
        justifyContent: 'flex-start',
        width: convertWidth('40%'),
        borderWidth: 1,
        borderRadius: convertWidth('2%')
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
        width: convertWidth('30%'),
        paddingLeft: 15,
        // backgroundColor : 'rgba(255,255,255,0.5)',
        color: '#000',
        fontSize: convertWidth('2%'),

    },
    forgotPassContainer: {
        height: 50,
        width: convertWidth('45%'),
        //alignSelf: 'flex-end'
        //  textAlign : 'left',
    },
    forgotPassText: {
        fontSize: convertWidth('1.8%'),
        textAlign: 'right',
        color: "#28746F",
        fontFamily: Constant.POPPINS_REG,
    },
    TitleText: {
        fontSize: convertWidth('3%'),
        color: Constant.COLOR_BLACK,
        fontFamily: Constant.POPPINS_MEDIUM
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
        borderRadius: 40
    },
    allowContainer: {
        width: convertWidth('15%'),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: convertWidth('4%'),
        borderRadius: convertWidth('8%'),
        backgroundColor: '#fff',
        borderColor: '#C1C1C2',
        borderWidth: 1
    },
    submitContainer: {
        width: '100%',

        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: convertHeight('13.5%'),
        backgroundColor: "rgb(225, 149, 24)",
        borderRadius: 4
    },
    loginText: {
        fontSize: convertWidth('2.5%'),
        color: '#ffffff',
        fontFamily: Constant.POPPINS_REG,
    },
    barLogin: {
        flexDirection: 'row',
        //borderWidth: 1,
        width: convertWidth('45%'),
        height: convertHeight('13.5%'),
        marginLeft: convertWidth('3%'),
        // justifyContent: 'flex-start',
        alignItems: 'center',
        // borderWidth:1
    },
    containerSubmit: {
        width: "50%",

        // justifyContent: "center"
    }


});

function mapStateToProps(state) {
    return {
        isFirst: state.firstopen,
        userData: state.userData
    };
}
function dispatchToProps(dispatch) {
    return {
        updateuser: data =>
            dispatch({ type: ACTION_TYPE.UPDATE_USER, value: data }),
    };
}
export default connect(
    mapStateToProps,
    dispatchToProps,
)(LoginScreen);