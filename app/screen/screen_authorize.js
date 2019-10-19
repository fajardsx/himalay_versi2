
import React, { Component } from 'react';
import { Linking, BackHandler, Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Alert, YellowBox } from 'react-native';
import { createStackNavigator, StackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions'

import Constant from '../global/Constant';
import { loading, checkMaintance, callAlert, callAlertImportant } from '../global/Global';

import { cekNetInfo, getLocal, checkLatestVersion, convertHeight, convertWidth, setup, getLinkApp } from "../global/Global";

import { getLocalF, dwfileconfig, kwkwkwkwkw } from "../files/FileManager";

import { LEMARI_GLOBAL_LOC, LEMARI_GLOBAL_LOAD } from '../appcomponent/module_async/AsyncManager';
import KEYS from '../appcomponent/module_async/utils/keyAsync';

import { connect } from 'react-redux';
import ACTION_TYPE from "../redux/actions/actions";


var _version = "";
var that = null;
var notif = null;
var logouri = "";

class Authorize extends Component {
    constructor(props) {
        super(props)
        that = this;

        this.state = {
            isLoading: true,
            isFirst: false,
            StoragePermission: ""
        }
    }
    componentDidMount() {
        cekNetInfo();
        this.loadCfg();
        //this.init();
    }
    async loadCfg() {
        this.setState({
            isLoading: true
        })
        /*Config Load*/
        //this.cfgResult();

        //  check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(response => {
        //     // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        //     console.log("permission", response);
        //     if (response == 'authorized') {
        //       kwkwkwkwkw(this.cfgResult.bind(this))
        //     }
        //     this.setState({ StoragePermission: response }, () => {
        //       this._requestPermission();
        //     });
        //   });
        //kwkwkwkwkw(this.init.bind(this))

        //kwkwkwkwkw(this.cfgResult.bind(this))
        this.checkPermission();
    }
    checkPermission = () => {
        Promise.all([
            check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
            check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        ]).then(([readStatus, writeStatus]) => {
            console.log({ readStatus, writeStatus });
            if (readStatus == RESULTS.DENIED || writeStatus == RESULTS.DENIED) {
                this.setState({ StoragePermission: RESULTS.DENIED });
                return that._requestPermission();
            }
            if (readStatus == RESULTS.GRANTED || writeStatus == RESULTS.GRANTED) {
                kwkwkwkwkw(that.cfgResult.bind(this));
            }
        })
    }
    async _requestPermission() {
        const cameraStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        const contactsStatus = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        return { cameraStatus, contactsStatus };
        // if (this.state.StoragePermission == "undetermined") {
        //   Permissions.request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(response => {
        //     // Returns once the user has chosen to 'allow' or to 'not allow' access
        //     // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        //     if (response == "authorized") {
        //       kwkwkwkwkw(this.cfgResult.bind(this))
        //     } else {
        //       callToast("Application need permission to access storage");
        //     }
        //     //this.setState({ StoragePermission: response });
        //   });
        // }
    };
    cfgResult() {
        this.options({ "url_server": Constant.rest_url });
    }
    options(rest) {
        console.log(rest);
        Constant.updateresturl(rest.url_server);

        let restbase = String(rest.url_server);

        console.log("base ", restbase);

        Constant.updatebaseurl(restbase);
        //if (Constant.ONLINE == true) {
        console.log("Server setup");
        setup().then(res => {
            console.log('response setup', res);
            if (res) {
                Constant.savesetup(res);
                let stpdata = [res];

                LEMARI_GLOBAL_LOC(stpdata, KEYS.KEY_SETUP)
                console.log(Constant.SERVERVERSION)
                that.versioning(Constant.SERVERVERSION);
            } else {
                LEMARI_GLOBAL_LOAD(KEYS.KEY_SETUP).then(res => {
                    console.log('setup', res);
                    if (res) {
                        Constant.savesetup(res[0]);
                        console.log(Constant.SERVERVERSION)
                        console.log(Constant.APPSTATUS)
                        that.versioning(Constant.SERVERVERSION);
                    } else {
                        that.alertConfig();
                    }

                });
            }

        });


        //console.log(rest.url_server)

    }
    alertConfig() {
        let version = "Failed Connect Server, Please Try Again "
        Alert.alert(Constant.NAME_APPS, version, [
            { text: "Try Again", onPress: () => { this.loadCfg(); } },

        ]);
    }
    versioning(server) {
        console.log("version");
        if (checkLatestVersion(server) == false) {
            if (Constant.FORCE_UPDATE === "No") {
                this.init();
            } else {
                let version = "Current Version Installed : " + Constant.CUERRENT_BUILD + "\n New Version found, Please update for continue. "
                Alert.alert("Update Version", version, [
                    { text: "Yes", onPress: () => { Linking.openURL(getLinkApp()); BackHandler.exitApp(); } },
                    { text: "No", onPress: () => BackHandler.exitApp() }
                ]);
            }

        } else {
            console.log("this latest Version");
            if (checkMaintance() == true) {
                Alert.alert(Constant.NAME_APPS, "Application is Under Maintance.", [
                    { text: "Ok", onPress: () => { BackHandler.exitApp(); } },

                ]);
            } else {
                this.init();//launch app
            }

        }
    }
    init() {
        console.log("launch app", this.props.isFirst);
        if (this.props.isFirst == false) {
            this.setState({
                isLoading: false
            });
            let inits = setTimeout(function () {
                that.initLogin();
                clearTimeout(inits)
            }, 100);
        } else {
            this.setState({
                isLoading: false
            });
        }
        // getLocal(Constant.KEYFIRST).then(result => {
        //   console.log("intro", result);
        //   if (result == null) {
        //     that.setState({
        //       isLoading: false
        //     })
        //   } else {
        //     that.setState({
        //       isFirst: result.firstopen,
        //       isLoading: false
        //     });
        //     if (result.firstopen === true) {
        //       if (Constant.DEBUG_MODE) {
        //         //that.initLogin();
        //       }

        //       setTimeout(function () {
        //         that.initLogin();
        //       }, 100);
        //     }
        //   }
        // });
    }
    initLogin() {
        if (Constant.DEBUG_MODE) {
            //this.props.navigation.navigate(Constant.VM_LOGIN_SCREEN);
            //this.props.navigation.navigate(Constant.VM_APPS);
        } else {
            this.props.navigation.navigate(Constant.VM_TRYLOGIN_SCREEN);
        }

        //
    }
    _onGettingStared() {
        this.props.navigation.navigate(Constant.VM_SPLASH_SCREEN);
    }
    render() {
        const { isFirst, isLoading } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} backgroundColor={Constant.COLOR_GREEN1} />
                <Image
                    style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, position: 'absolute' }}
                    resizeMode={'stretch'}
                    source={require("../../assets/ASET/splash.png")}
                />
                <View style={{
                    marginTop: convertHeight('30%')
                }}>
                    <Text style={styles.welcome}>
                        {"W E L C O M E  T O ,"}
                    </Text>
                    <Image
                        style={{ width: convertWidth('40%'), height: convertHeight('10%') }}
                        resizeMode={'contain'}
                        source={require("../../assets/ASET/Himalaya-White.png")}
                    />
                </View>

                <Text style={{ position: 'absolute', top: 0, left: 0, color: '#fff' }}>{"ver." + Constant.NAME_VERSION}</Text>
                {this.props.isFirst == true && isLoading == false &&
                    <TouchableOpacity style={styles.gettingContainer} onPress={() => this._onGettingStared()}>
                        <Text style={styles.gettingstarterText}>{"Get Started"}</Text>
                    </TouchableOpacity>
                }
                {isLoading == true &&
                    loading()
                }

            </View>
        );
    }
}
/*
 <Text style={styles.copyrightText}>{Constant.COPYRIGHT}</Text>
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#027266"
    },
    welcome: {
        fontSize: convertWidth('3%'),
        textAlign: "center",
        margin: 10,
        color: "#fff",
        fontFamily: Constant.POPPINS_REG
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    },
    copyrightText: {
        flex: 1,
        textAlign: "center",
        color: "#fff",
        alignSelf: "center"
    },
    gettingstarterText: {
        width: convertWidth("100%"),
        fontFamily: Constant.POPPINS_REG,
        textAlign: "center",
        color: "#E95A21",
        fontSize: convertWidth("3%")
    },
    copyrightContainer: {
        width: "100%",
        position: "absolute",
        bottom: "5%"
    },
    gettingContainer: {
        width: convertWidth("32%"),
        height: convertHeight("12%"),
        position: "absolute",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: convertHeight('10%'),
        bottom: convertHeight("15%")
    },
    developermode: {
        width: convertWidth("32%"),
        height: convertHeight("12%"),
        position: "absolute",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: convertHeight('10%'),
        right: 0
    }
});

function mapStateToProps(state) {
    return {
        isFirst: state.firstopen,
    };
}
function dispatchToProps(dispatch) {
    return {
        updatestatusisfirst: isfirst =>
            dispatch({ type: ACTION_TYPE.ISFIRST, value: isfirst }),
    };
}
export default connect(
    mapStateToProps,
    dispatchToProps,
)(Authorize);