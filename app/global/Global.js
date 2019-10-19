import React, { Component } from 'react';
import {
    Alert,
    View,
    ActivityIndicator,
    Dimensions,
    Platform,
    ToastAndroid,
    BackHandler,
    Image,
    Text,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Constans from "./Constant";
import store from "react-native-simple-store";
import Constant from './Constant';
import { heightPercentageToDP as sh, widthPercentageToDP as sw } from "react-native-responsive-screen";
import { MaskService } from 'react-native-masked-text'
import moment from 'moment';
import 'moment/locale/id';
import 'moment/min/moment-with-locales'

import {
    gSetup,
    getDokters,
    sendLocation,
    loginUser,
    getListExpenses,
    getReveresGEO,
    listLocation,
    gNotification,
    getDetailDokters,
    resultScheduleDokter,
    photoSchedule,
    initSignal,
    sendSchedule,
    sendAttend,
    sendAttend_SYN, sendExepense, about, contact, help, reqSchedule, reqSchedule_FORCE
} from '../module_api/module_resapi';
import haversine from 'haversine';
import user from './user'
import { LEMARI_GLOBAL_LOAD, LEMARI_GLOBAL_LOC, ASYNC_getScheduleToday, TargetSelect, getIDSAsync, LEMARI_GLOBAL_SELECT, SYNCLoc, Sync_Photo_Resulth, Execute_Sync_Photo_Resulth, F_I_F_O_GLOBAL_LOC, updateStatusDoktor } from '../appcomponent/module_async/AsyncManager';
import KEYS from '../appcomponent/module_async/utils/keyAsync';
import { restlist } from '../config/restConfig';
import { getMonthSchedulerDoktor } from './dokter_manager';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import ShdeuleProvider from '../db/shedulesProvider';
//import Schedule_local from '../db/shedules';
import DATA_SCHEDULE from '../db/dataScheduleManager';
var encrymd5 = require('crypto-js');
export default class Global {

};
//setup
export function setup() {
    //cekNetInfo();
    return gSetup().then((res) => {
        console.log(res);
        if (res) {
            if (res.api_message == "success") {
                if (res.data) {
                    return res.data;
                }
            } else {
                callAlert("Failed", res.api_message);
                return null;
            }
        }

    });
}
//Save Local
export async function addLocal(keys, _data) {
    try {
        if (keys == KEYS.KEY_SCHEDULE) {
            console.log("KEYS.KEY_SCHEDULE", _data);
        }
        var data = JSON.stringify(_data);
        return result = await store.save(keys, data).then(() => { return true }
        ).catch(error => {
            console.error(error.message);
            return false;
        });
        //return true;
    } catch (error) {
        console.log(error)
        return false
    }
}
//update Local
export async function updateLocal(keys, _data) {
    try {
        var data = JSON.stringify(_data);
        return result = await store.update(keys, data).then(res => { return true; }
        ).catch(error => {
            console.error(error.message);
            return false;
        });
        //store.update(keys, data);
        //return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
//Get Local
export async function getLocal(keys) {
    try {
        return result = await store.get(keys).then(
            keyValue => {
                //if(result){
                result = JSON.parse(keyValue);
                // callToast(keys+" , "+result)
                //console.log(keys+" , "+result)
                return result


            }, (error) => {
                console.log(error)
                callToast(error)
            }
        );
    } catch (error) {
        console.log(error)
        callToast(error)
    }
}
//Delete Local
export async function delLocal(keys) {
    try {
        store.delete(keys);
        return true;
    } catch (error) {
        return false;
        console.log(error)
    }
}
//random 2 number
export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
///-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


///-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//format time
export function formatTime(value) {
    return moment(value).format('h:mm a');
}
//format time2
export function formatTimByType(value, id) {
    switch (id) {
        case Constant.KEY_TIME_PM:
            return moment.unix(value).format('h:mm A');
            break;
        case Constant.KEY_TIME_24:
            return moment.unix(value).format('HH:mm');
            break;
        default:
            break;
    }
    return moment(value).format('h:mm a');
}
//get current time
export function formatCurrentTime() {
    return moment().format('LT');
}
//get format date
export function formateDate(value) {
    moment.locale('id');
    return moment.unix(value).format("DD MMM YYYY");
}
//get format full date
export function formateFullDate(value) {
    moment.locale('id');
    return moment.unix(value).format("DD MMM YYYY HH:mm");
}
//get format date from number
export function formateDateNumber(value) {
    moment.locale('id');
    const dateTime = new Date(value).getTime();
    console.log(dateTime);
    const timestamp = Math.floor(dateTime / 1000);
    console.log(timestamp);

    return moment.unix(timestamp).format("DD MMMM YYYY");
}
//get format date from number
export function formateFullDateNumber(value, format = "DD MMMM YYYY HH:mm") {
    moment.locale('id');
    const dateTime = new Date(value).getTime();

    const timestamp = Math.floor(dateTime / 1000);

    return moment.unix(timestamp).format(format);
}//get format date from number
export function getDateNumber(value, format = "DD MMMM YYYY HH:mm") {

    let _date = moment(value).format("YYYY-MM-DDTHH:mm:ss");
    console.log("_date", _date);
    const dateTime = new Date(_date).getTime();

    const timestamp = Math.floor(dateTime / 1000);
    //moment.locale('id');
    let result = moment.unix(timestamp).format(format);
    console.log("getDateNumber", result)
    return result;
}
export function getDateNumberAttend(value, format = "DD MMMM YYYY HH:mm") {

    let _date = moment(value).format("YYYY-MM-DDTHH:mm:ss");
    console.log("_date", _date);
    const dateTime = new Date(value).getTime();
    console.log("_date", dateTime);
    const timestamp = Math.floor(dateTime / 1000);
    moment.locale();
    let result = moment(value).format(format);
    console.log("getDateNumber", result)
    return result;
}
//get format date from number
export function formateFullDateNumberTomorrow(value, format = "DD MMMM YYYY HH:mm") {
    moment.locale('id');
    const dateTime = new Date(value).getTime();

    const timestamp = Math.floor(dateTime / 1000);

    return moment.unix(timestamp).add(1, 'days').format(format)
}
//get format date from number
export function formateFullDateNumberUTC(value) {
    moment.locale('id');
    const dateTime = new Date(value).getTime();
    // console.log(dateTime);
    const timestamp = Math.floor(dateTime / 1000);
    //console.log(timestamp);

    return moment.parseZone(value).format("DD/MM/YYYY HH:mm:ss");
}
//get format date from number
export function formateFullDateNumberUTC2(value) {
    moment.locale('id');
    const dateTime = new Date(value).getTime();
    // console.log(dateTime);
    const timestamp = Math.floor(dateTime / 1000);
    //console.log(timestamp);

    return moment.parseZone(value).format("DD MMMM YYYY • HH:mm");
}
//get format time
export function formateFullDateNumberUTCTime(value, formats = "HH:mm") {
    moment.locale('id');
    const dateTime = new Date(value).getTime();
    // console.log(dateTime);
    const timestamp = Math.floor(dateTime / 1000);
    //console.log(timestamp);

    return moment.parseZone(value).format(formats);
}
//get format date from number
export function formateFullDayUTCExpends(value) {
    moment.locale('id');


    return moment.parseZone(value).format("YYYY-MM-DD HH:mm:ss");
}
//get format date from number
export function formateFullDayUTC(value) {
    moment.locale('id');
    return moment.parseZone(value).format("DD MMMM YYYY");
}
//get format date from number for 
export function formateFullDayUTCFormat(value, format) {
    moment.locale('id');
    return moment.parseZone(value).format(format);
}
//Check if Yesterday
export function getIfYesterday(params1, params2) {
    moment.locale('id');
    const dateTime = new Date(params1).getTime();
    const dateTime2 = new Date(params2).getTime();
    const timestamp = Math.floor(dateTime / 1000);
    const timestamp2 = Math.floor(dateTime2 / 1000);

    return moment.parseZone(timestamp).isBefore(timestamp2);
}
///-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//dashboard date
//get format full date
export function dashboardDate(value) {
    moment.locale('id');
    return moment.unix(value).format("MMMM YYYY");
}
//get current timestamp
export function curretntimestamp() {
    const date = Date.now();
    // console.log('current date : ', new Date()) ;
    const timestamp = Math.floor(date / 1000);
    return timestamp;
}
//encode md5
export function encmd(value) {
    //console.log("md5",value);
    let cryp = encrymd5.MD5(value).toString();
    //console.log("ecry ", cryp);
    return cryp;
}
//======================================================================
export function formatPrice(params) {
    var money = MaskService.toMask("money", Number(params), {
        unit: "Rp ",
        delimiter: "."
    });
    var pricestr = money.toString();
    pricestr = pricestr.slice(0, -3);

    return pricestr;
}
//call loading render
export function loading() {
    return <View

        style={{ backgroundColor: 'rgba(0,0,0,0.2)', height: convertHeight('100%'), width: convertWidth('100%'), position: 'absolute', justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Constant.COLOR_GREEN5} style={{ flex: 1, justifyContent: "center" }} />
    </View>
}
export function onlyLoading() {
    return <View
        style={{ height: Dimensions.get('screen').height * 0.1, width: Dimensions.get('screen').width, position: 'absolute', bottom: 0, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Constant.COLOR_GREEN5} style={{ flex: 1, justifyContent: "center" }} />
    </View>;
}
//call toast
export function callToast(msg) {
    console.log(msg);
    if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }
}
export function callToastTop(msg) {
    console.log(msg);
    if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.TOP
        )
    }
}
//call alert with parameter
export function callAlert(title, msg, onYes) {
    Alert.alert(title, msg, onYes != null ? [
        { text: "Yes", onPress: () => onYes() },
        { text: "No", onPress: () => console.log("") }
    ] : null);
}
//important call alert with parameter
export function callAlertImportant(title, msg) {
    Alert.alert(title, msg, [
        { text: "Yes", onPress: () => BackHandler.exitApp() },
        { text: "No", onPress: () => BackHandler.exitApp() }
    ], { cancelable: false });
}
//get link apps
export function getLinkApp() {
    return Platform.OS == "android" ? Constant.GOOGLEPLAY_LINK : Constant.PLAYSTORE;
}
//Check Latgest Version 
export function checkLatestVersion(serverver) {
    console.log("APP VERSION " + Number(Constans.CUERRENT_BUILD) + " , " + Number(serverver));
    if (Number(Constans.CUERRENT_BUILD) >= Number(serverver)) {
        return true;
    } else {
        return false;
    }
}
//Check envi
export function checkMaintance() {
    console.log("envi", Constans.APPSTATUS);
    if (Constans.APPSTATUS == "Maintenance") {
        return true;
    } else {
        return false;
    }
}
//validate email
export function validateEmail(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //   if(reg.test(text) === )
    return reg.test(text);
}
//format timestamp to date
export function timeStampToDate(params) {
    return moment.unix(params).format("DD MMMM YYYY - hh:mm") + " WIB";
}
export function timeToDate(params) {
    return moment(params).format("DD MMMM YYYY - HH:mm") + " WIB";
}
export function getCordinat(params) {
    return String(params).split(',')
}

export function cekNetInfo() {
    NetInfo.getConnectionInfo().then(connectioninfo => {
        Constant.ONLINE = connectioninfo.type === "none" ? false : true;
        console.log("internet : " + Constant.ONLINE)
        if (Constant.ONLINE == false) {
            //callToast("Network Offline");
        }
    });
    function handleFirstConnectionChange(connectioninfo) {
        Constant.ONLINE = connectioninfo.type === "none" ? false : true;
        let statuss = Constant.ONLINE == true ? "Available" : "Not Available"
        callToast("Network Internet " + statuss);
        /*NetInfo.removeEventListener(
            'connectionChange',
            handleFirstConnectionChange
        );*/
    }
    NetInfo.addEventListener("connectionChange", handleFirstConnectionChange);
}

//handle app in background
export function _handleAppStateChange(appStateChange) {
    if (Constant.appStatus().match(/inactive|background/) && appStateChange === 'active') {
        console.log(appStateChange);
        console.log(Constant.appStatus());
    }
    Constant.updateAppStatus(appStateChange);
}

//callculate size
export function convertWidth(params) {
    return sw(params)
}
export function convertHeight(params) {
    return sh(params)
}

//add space
export function addSpace(valueH) {
    return <View style={{
        width: '100%',
        height: convertHeight(valueH)
    }} />
}
//detectscollend
export function isCloseBottom({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
}
//Greeting
export function getGreetingTime() {
    var g = null;

    //if(!moment){return;}

    var split_afternoon = 12;
    var split_evening = 17;
    var split_morning = 3;
    var currentHour = parseFloat(formateFullDateNumber(Date.now(), "HH"));
    console.log('hour', formateFullDateNumber(Date.now(), "HH:mm"));
    console.log('hour', currentHour);
    if (currentHour >= split_afternoon && currentHour <= split_evening) {
        g = "Afternoon";
    } else if (currentHour >= split_evening || currentHour <= split_morning) {
        g = "Evening";
    } else {
        g = "Morning";
    }

    return g;
}

//find
export function findRumahSakit(arry, id) {

    return arry.find((item, index) => {
        return item.idrumahsakit === id//){
        //  return index;
        // }
    })
}
export function avaiableData(arry, value) {
    let avaiable = true;
    for (var s = 0; s < arry.length; s++) {
        if (arry[s] == value) {
            avaiable = false;
        }
    }
    return avaiable;
}
//generateSelect
export function generateSelectDokter(arry) {

    let data = [];
    for (var s = 0; s < arry.length; s++) {
        for (var i = 0; i < arry[s].doctors.length; i++) {
            if (arry[s].doctors[i].isSelect == 1) {
                if (avaiableData(data, arry[s].doctors[i].id) == true) {
                    data.push(arry[s].doctors[i].id)
                }
            }
        }
    }
    console.log(data);
    //var mapped = data.map(item=>({[item.key]:item.value}));
    // console.log(mapped)
    //var newobj = Object.assign({},...mapped)
    /*
    data.reduce(function (result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
    }, {});
    */
    return data;
}

export function calcDistance(prevLatLng, newLatLng) {
    //const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng, { unit: 'km' }) || 0;
}

//g doktors
export function getDokterRest() {
    return getDokters().then((res) => {
        console.log("result nama dokter ", res);
        if (res) {
            if (res.api_message == "success") {
                return res.data;
            } else {
                callAlert("Failed", res.api_message);
            }
        }

    });
}
//s location
export async function sendCurrentLocation(data) {

    const res = await sendLocation(data);
    console.log(res);
    if (res) {
        if (res.api_message == "success") {
            return res;
        }
        else {
            console.log("Failed", res.api_message);
            return false;
        }
    }
}
//g list location
export function getListLocation(data) {

    return listLocation(data).then((res) => {
        //console.log(res);
        if (res) {
            //if (res) {
            return res;
            // } else {
            //  console.log("Failed", res.api_message);
            //   return false
            //  }
        } else {
            return false
        }

    });
}
//s reverse location
export async function getReverseGeo(data) {

    const res = await getReveresGEO(data);
    //console.log(res);
    if (res) {
        //if (res) {
        return res;
        // } else {
        //  console.log("Failed", res.api_message);
        //   return false
        //  }
    }
    else {
        return false;
    }
}

//g list Expeends
export function getExpendsList(data) {
    return getListExpenses(data).then((res) => {
        console.log("result ", res);
        if (res) {
            if (res.api_message == "success") {
                return res;
            } else {
                callAlert("Failed", res.api_message);
                return false;
            }
        }

    });
}
//auth
export function sendAuth(data) {

    return loginUser(data).then((res) => {
        console.log(res);
        if (res) {
            if (res.api_message == "success") {
                return res;
            } else {
                callAlert("Failed", res.api_message);
                return false
            }
        }

    });
}
//success()
export function successLogutClear() {
    return delLocal(Constant.KEYDATA).then(result => {
        console.log("del", result)
        return true;
    });
}

//Distance()
export function getDistance(value) {
    //console.log("geo rs",value);
    //console.log("geo user", user.getUserGeolocation());
    if (user.getUserGeolocation() != null) {
        let geouser = {
            latitude: user.getUserGeolocation().latitude,
            longitude: user.getUserGeolocation().longitude
        }

        // console.log("geo",geouser);
        let distance = calcDistance(geouser, value)
        // setTimeout(() => {
        // console.log("geo", distance);
        return distance;
        //}, 2000);

    } else {
        SYNCLoc(KEYS.KEY_G, KEYS.KEY_LAST_LOCATION).then(res => {
            console.log("last location", res)
            if (res) {
                let geouser = {
                    latitude: res.latitude,
                    longitude: res.longitude
                }

                // console.log("geo",geouser);
                let distance = calcDistance(geouser, value)
                // setTimeout(() => {
                // console.log("geo", distance);
                return distance;
            }
        })
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//REST CHECK ATTEN
//check status user atten
export async function Global_checkStatus(callback) {
    let now = getDATENoW();
    console.log("Global_checkStatus");
    console.log("user _checkStatus", user.getData())
    console.log("attand _checkStatus", user.getUserAttend())
    console.log("date now", formateFullDateNumber(Date.now(), "YYYY-MM-DD HH:mm:ss"));
    if (user.getUserAttend() != null) {

        let _in = user.getUserAttend().in ? user.getUserAttend().in.length : 0;
        let _out = user.getUserAttend().out ? user.getUserAttend().out.length : 0;
        console.log("inAttend", _in)
        console.log("outAttend", _out)

        if (_in > 5 && _out < 1) {
            let datein = user.getUserAttend().in.slice(0, 10);
            let loc = formateFullDateNumber(datein, "YYYY-MM-DD")
            console.log("date", datein)
            console.log("in", loc)
            console.log("now", now)

            if (loc == now) {
                console.log("atten correct");
                DATA_SCHEDULE.getDataSchedule().then(list => {
                    console.log('ASYNC_getScheduleToday list today', list);
                    let tempList = Object.assign([], list);
                    let res = tempList.set_schedule;
                    console.log('ASYNC_getScheduleToday list today', tempList);
                    if (res.length > 0) {
                        if (user.getStatusRole() != Constant.ROLE_ADDDOCTORAGAIN) {
                            user.updateStatusRole(Constant.ROLE_READYSTARTSCHEDULE);
                            //return Constant.ROLE_READYSTARTSCHEDULE;
                            callback(Constant.ROLE_READYSTARTSCHEDULE);
                        }
                    } else {
                        user.updateStatusRole(Constant.ROLE_INSELECTSCHEDULE);
                        callback(
                            Constant.ROLE_INSELECTSCHEDULE
                        );
                        return;
                        //return Constant.ROLE_INSELECTSCHEDULE;
                    }
                });
                /*SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(list => {
                    console.log('ASYNC_getScheduleToday list today', list);
                    let tempList = Object.assign([], list);
                    let res = tempList[0].set_schedule;
                    console.log('ASYNC_getScheduleToday list today', tempList);
                    if (res.length > 0) {
                        if (user.getStatusRole() != Constant.ROLE_ADDDOCTORAGAIN) {
                            user.updateStatusRole(Constant.ROLE_READYSTARTSCHEDULE);
                            //return Constant.ROLE_READYSTARTSCHEDULE;
                            callback(Constant.ROLE_READYSTARTSCHEDULE);
                        }
                    } else {
                        user.updateStatusRole(Constant.ROLE_INSELECTSCHEDULE);
                        callback(
                            Constant.ROLE_INSELECTSCHEDULE
                        );
                        return;
                        //return Constant.ROLE_INSELECTSCHEDULE;
                    }
                });*/

            } else {
                console.log("atten expired");
                //callToast("Start");
                user.updateStatusRole(Constant.ROLE_FINISHTODAY);
                callback(Constant.ROLE_FINISHTODAY, true);
                return;
            }

        } else if (_out > 5 && _in < 1) {
            let dateiout = user.getUserAttend().out.slice(0, 10);
            let loc = formateFullDateNumber(dateiout, "YYYY-MM-DD")
            console.log("date", dateiout)
            console.log("in", loc)
            console.log("now", now)

            if (loc == now) {
                ASYNC_getScheduleToday(KEYS.KEY_LISTDOCTODAY).then(res => {
                    console.log('list today', res);
                    if (res.length > 0) {
                        if (user.getStatusRole() != Constant.ROLE_ADDDOCTORAGAIN) {
                            user.updateStatusRole(Constant.ROLE_READYSTARTSCHEDULE);
                            //return Constant.ROLE_READYSTARTSCHEDULE;
                            callback(Constant.ROLE_READYSTARTSCHEDULE);
                        }
                    } else {
                        user.updateStatusRole(Constant.ROLE_INSELECTSCHEDULE);
                        callback(
                            Constant.ROLE_INSELECTSCHEDULE
                        );
                        return;
                        //return Constant.ROLE_INSELECTSCHEDULE;
                    }
                });

            } else {
                console.log("atten out expired");
                user.updateStatusRole(Constant.ROLE_FINISHTODAY);
                callback(Constant.ROLE_FINISHTODAY, true);
                return;
            }

        } else if (_in > 5 && _out > 5) {
            let loc = formateFullDateNumber(user.getUserAttend().out.slice(0, 10), "YYYY-MM-DD")
            if (loc == now) {
                user.updateStatusRole(Constant.ROLE_FINISHTODAY);
                callback(Constant.ROLE_FINISHTODAY);
                return;
            } else {
                console.log("atten expired");
                user.updateStatusRole(Constant.ROLE_FINISHTODAY);
                callback(Constant.ROLE_FINISHTODAY, true);
                return;
            }
            //return Constant.ROLE_FINISHTODAY;

        } else if (_in < 1 && _out < 1) {
            user.updateStatusRole(Constant.ROLE_INLOGIN);
            callback(Constant.ROLE_INLOGIN);
            return;
            //return Constant.ROLE_FINISHTODAY;
        }
    } else {
        console.log("user.getUserAttend null");
        user.updateStatusRole(Constant.ROLE_INLOGIN);
        state.setState({
            ROLE: Constant.ROLE_INLOGIN,
            init_apps: true
        })
    }
    //console.log("user", user.getData());
}

//reset session schedule
export async function Global_resetShceduleSession(_calback = null) {
    return await getLocal(KEYS.KEY_SCHEDULE).then((res) => {
        console.log('Global_resetShceduleSession', res)
        if (res) {
            let tempRes = Object.assign({}, res[0]);
            console.log('temp schedule', tempRes);
            tempRes.set_schedule = [];
            tempRes.list_doctor_set_today = [];

            tempRes.visit_schedule.map((res, index) => {
                //console.log('hospital', res);
                res.isSelect = 0;
                res.doctors.map((resdok, index) => {
                    res.doctors.isSelect = 0;
                })
            })
            console.log('update temp schedule', tempRes);
            let clone = Object.assign({}, tempRes)
            console.log("Global_resetShcedule")
            SYNCLoc_CORE_SET(tempRes).then(() => {
                if (_calback) {
                    _calback(false);
                }
            })
            /*SYNCLoc(KEYS.KEY_U, KEYS.KEY_SCHEDULE, clone).then(() => {
                if (_calback) {
                    _calback(false);
                }
            })*/
        } else {

        }
    });
}
//REQ Not Avaiable
export function Glob_sendNA(data) {

    let dataform = new FormData();
    dataform.append("status", 0);
    dataform.append("cms_users_id", data.cms_users_id);
    dataform.append("schedule_date", data.schedule_date);
    dataform.append("doctors_id", data.doctors_id);
    dataform.append("signature", data.signature);
    dataform.append("feedback", data.feedback);
    dataform.append("feedback_sales", data.feedback_sales);
    dataform.append("locations_id", data.locations_id);//id_rumah sakit
    dataform.append("e_detailings_name", data.e_detailings_name);
    dataform.append("json_result", data.json_result);

    console.log("glob_sendNA", dataform);
    let jdata = {
        status: 0,
        cms_users_id: data.cms_users_id,
        doctors_id: data.doctors_id,
        schedule_date: data.schedule_date,
        signature: false,
        feedback: false,
        feedback_sales: "",
        locations_id: data.locations_id,
        e_detailings_name: data.e_detailings_name,
        json_result: null,
        photos: null
    };
    let _data = {
        id: 0,
        type: KEYS.KEY_MEETDOCTOR_RESULTH,
        //date: datenow,
        data: jdata,
    }
    console.log("sendjdata", jdata);
    /*LEMARI_GLOBAL_LOAD(KEYS.KEY_SCHEDULE).then(res => {
        console.log("Glob_sendNA", res)
    })*/
    /*LEMARI_GLOBAL_LOC([jdata], KEYS.KEY_MEETDOCTOR_COMPLETE, true);
     try{
            F_I_F_O_GLOBAL_LOC(_data);
            updateStatusDoktor(jdata);
         
            setTimeout(() => {
                //this._getreqSchedule();
                console.log("next");

                _sendSubmitComplete(dataform).then(res => {
                    console.log("res _sendSubmitComplete", res);
                    if (res) {
                        //toTopHome(PAGE_CONFIG.homeRoute, 'HomeView', { callBackRefresh: true });

                        that.setState({
                            isLoading: false
                        })
                     
                    } 
                });
            }, 1000);

        }catch(e){
            console.log('e', e)
        }
    */

}
//REQ SCHEDULE WITHOUT TIMEOUT
export async function GLOBAL_INITSCHEDULE_NOFORCE(_state) {
    let data = new FormData();

    data.append("user_id", user.getUsId());
    let dataFetch = await fetch(Constant.RESTLINK + restlist().req_schdule, {
        method: Constant.P,
        // headers: header,
        body: data
    })
    let datajson = dataFetch.json();
    console.log('GLOBAL_INITSCHEDULE_NOFORCE', datajson);
}
//REQ SCHEDULE WITH TIMEOUT
export function GLOBAL_INITSCHEDULE(_state) {
    let data = new FormData();
    let didTimeOut = false;
    data.append("user_id", user.getUsId());
    let _url = Constant.RESTLINK + restlist().req_schdule;
    console.log("GLOBAL_INITSCHEDULE", _url);
    console.log("GLOBAL_INITSCHEDULE Form", data);
    new Promise((resolve, reject) => {
        const Timeout = setTimeout(() => {
            didTimeOut = true;
            callToast('Server Request Time Out')
            clearTimeout(Timeout);
            reject(new Error('Request Time Out'));
        }, 30000);

        fetch(Constant.RESTLINK + restlist().req_schdule, {
            method: Constant.P,
            // headers: header,
            body: data
        }).then(response => {
            console.log('response', response);
            return response.json()
        }
        ).then(responsetext => {
            clearTimeout(Timeout);
            if (!didTimeOut) {
                console.log('success', responsetext);
                resolve(responsetext)

            }
        }).catch(error => {
            callToast(String(error));
            if (didTimeOut) return;
            clearTimeout(Timeout);
            reject(error);

        });
    }).then(res => {
        console.log('GLOBAL_INITSCHEDULE VISIT API RESULTH', res);
        if (res != undefined) {
            //console.log('req schedule', res);
            if (res.api_message == 'success') {
                /**/
                let tempres = Object.assign({}, res);
                tempres.dateCreate = formateFullDateNumber(Date.now(), "YYYY-MM-DD")
                // SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE);
                //LEMARI_GLOBAL_LOC([tempres], KEYS.KEY_SCHEDULE_SERVER);


                let ids = getDokterIdTab(res.list_doctor_set_today);
                let temp = res.visit_schedule.slice(0)
                let completeids = getDokterIdTab(temp);
                let tempset = res.set_schedule.slice(0)
                let meetDokter = res.list_doctor_set_this_month.slice(0)

                let setVisitMonth = rebuildSchedule(temp);
                let set_schedule_rebuild = rebuildSchedule(tempset);
                let serverSet = getDokterIdTabBySetSchedule(tempset);
                //find list schedule today
                console.log("set ", serverSet);
                //let setVisitToday = getListTargetBK(setVisitMonth, ids);
                let setVisitToday = getListTargetCompleteMonth(setVisitMonth, serverSet);
                //console.log('visit schedule', setVisitMonth);
                //console.log('id today ', ids);
                //console.log('id yesterday ', completeids);
                //console.log('target visit today ', setVisitToday);
                //console.log('selectschedule ', set_schedule_rebuild);
                //console.log('meetDokter ', meetDokter);
                //let temp2 = res.visit_schedule.slice(0)
                //let setUnVisitToday = getListUnTarget(temp2, ids);
                // console.log('untarget',setUnVisitToday)
                TargetSelect().then(resSelect => {
                    console.log('init off select', resSelect)
                    if (resSelect && resSelect.length == 0) {
                        _saveSelectSchedule(res.set_schedule_rebuild)
                        //_state(true);
                    } else {
                        //_state(true);
                    }
                }).then(() => {
                    DATA_SCHEDULE.updateDataSchedule(res);
                    console.log("GLOBAL INITSCHEDULE")
                    SYNCLoc_CORE_SET(res);

                    //return;
                    _state(true, res);
                    /* SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(resLocal => {
                        console.log('LOCAL COMPARE WITH SERVER SCHEDULE', resLocal);
                        if (resLocal) {

                            let createNew = false;
                            // && isTODAY(res.attend.in) == true
                            if (res.attend.in) {
                                if (res.attend.in.length > 5) {
                                    user.updateUserAttend(res.attend);
                                }
                            }
                            if (res.attend.out) {
                                if (res.attend.out.length > 5) {
                                    user.updateUserAttend(res.attend);
                                }
                            }
                            user.updateUserAttend(res.attend);
                            console.log('untarget', user.getUserAttend())

                            if (tempres.attend.in && tempres.attend.in.length > 5 && tempres.attend.out && tempres.attend.out.length > 5) {

                                let now = formateFullDateNumber(Date.now(), "YYYY-MM-DD");
                                let datein = res.attend.out.slice(0, 10);
                                let loc = formateFullDateNumber(datein, "YYYY-MM-DD");
                                if (now != loc) {
                                    console.log("NEW GET FROM SERVER")
                                    resLocal[0].visit_schedule = setVisitToday;
                                    resLocal[0].set_schedule = set_schedule_rebuild;
                                    resLocal[0].list_doctor_set_this_month = meetDokter;
                                    resLocal[0].list_doctor_set_today = ids;
                                    console.log('SYNC LOCAL COMPARE', resLocal[0]);
                                    Constant.SCHEDULE_DATA = resLocal.slice(0)
                                    SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE).then(res => {
                                        if (res) {
                                            SYNCLoc(KEYS.KEY_A, KEYS.KEY_SCHEDULE, [resLocal[0]]).then(res => {
                                                _state(res, [resLocal[0]]);
                                            })

                                            // _state(res);
                                        }

                                    });


                                } else {
                                    console.log("UPDATE GET FROM SERVER")
                                    resLocal[0].visit_schedule = setVisitToday;
                                    resLocal[0].set_schedule = set_schedule_rebuild;
                                    resLocal[0].list_doctor_set_this_month = meetDokter;
                                    resLocal[0].list_doctor_set_today = ids;
                                    TargetSelect().then(resSelect => {
                                        console.log('init off select', resSelect)
                                        if (resLocal) {
                                            if (resLocal.length > 0) {
                                                _saveSelectSchedule(res.list_doctor_set_today)
                                            }

                                        } else {
                                            _saveSelectSchedule(res.list_doctor_set_today)
                                        }
                                    }).then(() => {
                                        console.log('UPDATE GET FROM SERVER_SYNC LOCAL COMPARE', resLocal[0]);
                                        let tempData = [...resLocal[0]];
                                        SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE).then(res => {
                                            if (res) {
                                                SYNCLoc(KEYS.KEY_A, KEYS.KEY_SCHEDULE, [tempData]).then(res => {
                                                    _state(res, [tempData]);
                                                })

                                                // _state(res);
                                            }

                                        });
                                    })
                                }

                            } else {
                                console.log("CONTINUES GET FROM SERVER", resLocal[0])
                                resLocal[0].visit_schedule = setVisitToday;
                                resLocal[0].set_schedule = set_schedule_rebuild;
                                resLocal[0].list_doctor_set_this_month = meetDokter;
                                resLocal[0].list_doctor_set_today = ids;
                                TargetSelect().then(resSelect => {
                                    console.log('init off select', resSelect)
                                    if (resLocal) {
                                        if (resLocal.length > 0) {
                                            _saveSelectSchedule(res.list_doctor_set_today)
                                        }

                                    } else {
                                        _saveSelectSchedule(res.list_doctor_set_today)
                                    }
                                })
                                console.log(' CONTINUES GET FROM SERVER_SYNC LOCAL COMPARE', resLocal[0]);
                                let tempData = resLocal.slice(0);
                                console.log('data', tempData);
                                SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE).then(res => {
                                    if (res) {
                                        SYNCLoc(KEYS.KEY_A, KEYS.KEY_SCHEDULE, tempData).then(res => {
                                            _state(res, tempData);
                                        })

                                        // _state(res);
                                    }

                                });


                            }


                        } else {
                            console.log('LOCAL NOT FOUND ', [tempres]);
                            user.updateUserAttend(tempres.attend);
                            SYNCLoc(KEYS.KEY_A, KEYS.KEY_SCHEDULE, [tempres]).then(() => {
                                _state(true, [tempres]);
                            });
                        }
                    });*/
                })


            } else {
                _state(false);

            }

        } else {
            _state(false);
        }
    }).catch(err => {
        console.log('Request Err', err);
        _state(false);
    })

}
//IS TODAY
export function isTODAY(params) {
    let now = formateFullDateNumber(Date.now(), "YYYY-MM-DD");
    let datein = params.slice(0, 10);
    let loc = formateFullDateNumber(datein, "YYYY-MM-DD");
    let istoday = false;
    if (now == loc) {
        return true;
    } else {
        return false;
    }
}
//REQ SCHEDULE
export async function Global_getreqSchedule(_state) {
    let isFirstLoad = true;
    let data = new FormData();
    data.append("user_id", user.getUsId());
    result = reqSchedule_FORCE(data).then((res) => {
        console.log('FORCE Global_getreqSchedule VISIT API RESULTH', res);
        if (res != undefined) {
            //console.log('req schedule', res);
            if (res.api_message == 'success') {
                /**/
                let tempres = Object.assign({}, res);
                tempres.dateCreate = formateFullDateNumber(Date.now(), "YYYY-MM-DD")
                // SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE);
                //LEMARI_GLOBAL_LOC([tempres], KEYS.KEY_SCHEDULE_SERVER);


                let completeids = getDokterIdTab(res.list_doctor_set_this_month)
                let ids = getDokterIdTab(res.list_doctor_set_today);
                let temp = res.visit_schedule.slice(0)
                let tempset = res.set_schedule.slice(0)
                let meetDokter = res.list_doctor_set_this_month.slice(0)

                let setVisitMonth = rebuildSchedule(temp);
                let set_schedule_rebuild = rebuildSchedule(tempset);
                //find list schedule today
                //let setVisitToday = getListTargetBK(setVisitMonth, ids);
                let setVisitToday = getListTargetCompleteMonth(setVisitMonth, completeids);
                // console.log('visit schedule', setVisitMonth);
                // console.log('id today ', ids);
                //console.log('id yesterday ', completeids);
                //console.log('target visit today ', setVisitToday);
                //console.log('selectschedule ', set_schedule_rebuild);
                //let temp2 = res.visit_schedule.slice(0)
                //let setUnVisitToday = getListUnTarget(temp2, ids);
                // console.log('untarget',setUnVisitToday)
                //ABSEN
                console.log('-------INIT ABSEN-------');
                console.log('ATTEND BEFORE', user.getUserAttend())
                console.log('ATTEND Server', tempres.attend)

                if (tempres.attend.in) {
                    if (user.getUserAttend().in.length < tempres.attend.in.length && tempres.attend.in.length > 5) {
                        user.updateUserAttend(tempres.attend);
                    }
                }
                if (tempres.attend.in && tempres.attend._out) {
                    if (user.getUserAttend().out.length < tempres.attend.out.length && tempres.attend.out.length > 5) {
                        user.updateUserAttend(tempres.attend);
                    }
                }
                if (res.attend.out == null) {
                    user.updateUserAttend(tempres.attend);
                }
                // user.updateUserAttend(tempres.attend);
                console.log('ATTEND DONE', user.getUserAttend())

                TargetSelect().then(resSelect => {
                    console.log('init off select', resSelect)
                    if (!resSelect) {
                        _saveSelectSchedule(res.list_doctor_set_today)
                    } else {
                    }
                }).then(() => {
                    //DATA_SCHEDULE.updateDataSchedule(res);
                    console.log("Global getreqshcedule")
                    //let rescore = SYNCLoc_CORE_SET(res);

                    //return;
                    _state(true, res);

                    //NEW METHOD

                    //return;
                    //OLD
                    /*SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(resLocal => {
                        console.log('LOCAL COMPARE WITH SERVER SCHEDULE', resLocal);
                        if (resLocal) {
                            console.log('LOCAL COMPARE', resLocal[0]);
                            let tempLocal = resLocal[0].slice(0);
                            tempLocal.visit_schedule = setVisitToday;
                            tempLocal.set_schedule = set_schedule_rebuild;
                            tempLocal.list_doctor_set_this_month = meetDokter;
                            console.log('LOCAL UPDATE', tempLocal);
                            SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE).then(res => {
                                if (res) {
                                    SYNCLoc(KEYS.KEY_A, KEYS.KEY_SCHEDULE, [tempLocal]).then(res => {
                                        _state(res, [tempLocal]);
                                    })

                                    // _state(res);
                                }

                            });


                        } else {
                            SYNCLoc(KEYS.KEY_A, KEYS.KEY_SCHEDULE, [tempres]).then(() => {
                                _state(true, [tempres]);
                            });

                        }
                    });*/
                })

            } else {
                _state(false);

            }

        } else {
            _state(false);

        }

    }

    );


}
//REQ SCHEDULE NEW MOON
/*export async function Global_getreqScheduleMonth(_state) {
    let isFirstLoad = true;


    let data = new FormData();
    data.append("user_id", user.getUsId());


    try {

        return result = await reqSchedule(data).then((res) => {
            console.log('Global_getreqScheduleMonth VISIT API RESULTH', res);
            if (res != undefined) {
                //console.log('req schedule', res);
                if (res.api_message == 'success') {
                    
                    let tempres = Object.assign({}, res);
                    tempres.dateCreate = formateFullDateNumber(Date.now(), "YYYY-MM-DD")
                    // SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE);
                    //LEMARI_GLOBAL_LOC([tempres], KEYS.KEY_SCHEDULE_SERVER);
                    //let completeids = getDokterIdTab(res.list_doctor_visit_this_month)
                    let ids = getDokterIdTab(res.list_doctor_set_today);
                    let temp = res.visit_schedule.slice(0)
                    let tempset = res.set_schedule.slice(0)
                    let meetDokter = res.list_doctor_set_this_month.slice(0)

                    let setVisitMonth = rebuildSchedule(temp);
                    let set_schedule_rebuild = rebuildSchedule(tempset);
                    //find list schedule today
                    let setVisitToday = getListTargetBK(setVisitMonth, ids);
                    console.log('visit schedule', setVisitMonth);
                    console.log('id today ', ids);
                    // console.log('id yesterday ', completeids);
                    console.log('target visit today ', setVisitToday);
                    console.log('selectschedule ', set_schedule_rebuild);
                    //let temp2 = res.visit_schedule.slice(0)
                    //let setUnVisitToday = getListUnTarget(temp2, ids);
                    // console.log('untarget',setUnVisitToday)
                    TargetSelect().then(resSelect => {
                        console.log('init off select', resSelect)
                        if (!resSelect) {
                            _saveSelectSchedule(res.list_doctor_set_today)
                            //_state(true);
                        } else {
                            //_state(true);
                        }
                    }).then(() => {
                        SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(resLocal => {
                            console.log('LOCAL COMPARE WITH SERVER SCHEDULE', resLocal);
                            if (resLocal) {
                                console.log('LOCAL COMPARE', resLocal[0]);
                                resLocal[0].visit_schedule = setVisitMonth;
                                resLocal[0].set_schedule = set_schedule_rebuild;
                                resLocal[0].list_doctor_set_this_month = meetDokter;
                                SYNCLoc(KEYS.KEY_U, KEYS.KEY_SCHEDULE, [resLocal[0]]);
                                _state(true, [resLocal[0]]);
                            } else {
                                console.log('USE SERVER COMPARE', resLocal[0]);
                                SYNCLoc(KEYS.KEY_A, KEYS.KEY_SCHEDULE, [tempres]);
                                _state(true, [tempres]);
                            }
                        });
                    })


                    let tempids = getIDSAsync();

                    // console.log('tempid', tempids);

                    let _data = {
                        visit_schedule: setVisitMonth,
                        set_schedule: set_schedule_rebuild,

                    }
                    // return _data;
                } else {
                    //_state(false);

                }

            } else {
                //_state(false);

            }

        }

        );

    } catch (error) {
        console.log(error)
        //_state(false);

    }
}*/
export async function Global_loadOffSchedule() {
    //that.initDoktor();
    return result = await DATA_SCHEDULE.getDataSchedule().then((res) => {
        console.log("Global_loadOffSchedule res schedule", res);
        let data = res;

        if (data) {
            let resids = getDokterIdTab(data.list_doctor_set_today);
            let ids = [];
            let tempset = data.set_schedule.slice(0);
            let temp2 = data.visit_schedule.slice(0)
            let _result = null;
            let set_schedule_rebuild = rebuildSchedule(tempset);

            return LEMARI_GLOBAL_LOAD(KEYS.KEY_SELECTTARGET).then((res_ids) => {

                let fromids = null;

                console.log('ids res', resids)
                console.log('ids', res_ids)
                if (res_ids) {
                    let expired = getIfYesterday(formateFullDateNumber(res_ids[0].date, "YYYY-MM-DD"), formateFullDateNumber(Date.now(), "YYYY-MM-DD"))
                    if (!expired) {
                        fromids = resids.length > res_ids[0].datas.length ? resids : res_ids[0].datas;
                        //callToast("fromid" + fromids.length);
                    } else {
                        fromids = [];
                        //callToast("fromid" + fromids.length);
                    }

                } else {
                    fromids = resids;
                }
                //let temp2 = data.visit_schedule.slice(0)

                console.log('fromid', fromids)
                let setVisitMonth = rebuildSchedule(temp2);
                const setVisitToday = getListTargetBK(setVisitMonth, fromids);

                console.log("today", setVisitToday);
                console.log("month", setVisitMonth);
                /*that.setState({
                    dataschedule: setVisitMonth,
                    selectToday: data.list_doctor_set_today,
                    selectschedule: setVisitToday,
                    complete: data.list_doctor_visit_this_month,
                    complete_yesterday: data.list_doctor_set_this_month,
                    isLoading: false
                }, () => that.onProcessSchdedule())*/

                //console.log('user', this.state.ROLE);
                let _data = {
                    visit_schedule: setVisitMonth,
                    set_schedule: fromids.length > 0 ? setVisitToday : tempset
                };
                //console.log('set', _data)
                return _data
                //return _result;
            })
        }


    })
    /*return result = await LEMARI_GLOBAL_LOAD(KEYS.KEY_SCHEDULE).then((res) => {
        console.log("Global_loadOffSchedule res schedule", res);
        let data = res[0];
        if (res[0].length == 1) {
            data = data[0];
        }
        if (data) {
            let resids = getDokterIdTab(data.list_doctor_set_today);
            let ids = [];
            let tempset = data.set_schedule.slice(0);
            let temp2 = data.visit_schedule.slice(0)
            let _result = null;
            let set_schedule_rebuild = rebuildSchedule(tempset);

            return LEMARI_GLOBAL_LOAD(KEYS.KEY_SELECTTARGET).then((res_ids) => {

                let fromids = null;

                console.log('ids res', resids)
                console.log('ids', res_ids)
                if (res_ids) {
                    let expired = getIfYesterday(formateFullDateNumber(res_ids[0].date, "YYYY-MM-DD"), formateFullDateNumber(Date.now(), "YYYY-MM-DD"))
                    if (!expired) {
                        fromids = resids.length > res_ids[0].datas.length ? resids : res_ids[0].datas;
                        //callToast("fromid" + fromids.length);
                    } else {
                        fromids = [];
                        //callToast("fromid" + fromids.length);
                    }

                } else {
                    fromids = resids;
                }
                //let temp2 = data.visit_schedule.slice(0)

                console.log('fromid', fromids)
                let setVisitMonth = rebuildSchedule(temp2);
                const setVisitToday = getListTargetBK(setVisitMonth, fromids);

                console.log("today", setVisitToday);
                console.log("month", setVisitMonth);
            
                //console.log('user', this.state.ROLE);
                let _data = {
                    visit_schedule: setVisitMonth,
                    set_schedule: fromids.length > 0 ? setVisitToday : tempset
                };
                //console.log('set', _data)
                return _data
                //return _result;
            })
        }


    })*/
}
export function _saveSelectSchedule(_schdeuleAToday) {
    console.log("_saveSelectSchedule", _schdeuleAToday);
    let _selectDokter = getDokterisArray(_schdeuleAToday);

    console.log('select id', _selectDokter);

    let listSelect = []
    _selectDokter.map((item, index) => {
        listSelect.push({ "doctors_ids": item, "date": formateFullDateNumber(Date.now(), "YYYY-MM-DD") })
    })


    // let _addMode = this.state.ROLE == Constant.ROLE_INSELECTSCHEDULE ? false : true;
    let _data = {
        user_id: user.getUsId(),
        datas: listSelect,
        date_select: formateFullDateNumber(Date.now(), "YYYY-MM-DD")
    }
    console.log("select dokter", listSelect);


    LEMARI_GLOBAL_SELECT([_data])

}

//REst ABOUT US
export async function _reqAboutUs() {
    try {

        return resulth = await about().then((res) => {
            if (res) {
                if (res.api_message == 'success') {
                    LEMARI_GLOBAL_LOC([res], KEYS.KEY_CONTENT_ABOUT);
                    _reqContactUs()
                    //return res;
                } else {
                    //callAlert("Failed", res.api_message);
                    // that.setState({ isLoading: false });
                    return false;
                }

            } else {
                //callAlert("Failed", res);
                // that.setState({ isLoading: false });
                return false;
            }
        });
    } catch (error) {
        console.log(error)
    }
}
//REst CONTACT US
export async function _reqContactUs() {
    try {
        return resulth = await contact().then((res) => {
            console.log('contact', res)
            if (res) {
                if (res.api_message == 'success') {
                    //LEMARI_GLOBAL_LOC([res], KEYS.KEY_CONTENT_CONTACT);
                    LEMARI_GLOBAL_LOC([res], KEYS.KEY_CONTENT_CONTACT);
                    Constans.MAX_DISTANCE = res.radius;//13985//
                    Constans.DEFAULT_MAX_DISTANCE = res.radius;//13985//
                    console.log('contact', res)
                    //_reqHelp()
                    return res;
                } else {
                    //callAlert("Failed", res.api_message);
                    // that.setState({ isLoading: false });
                    return false;
                }

            } else {
                //callAlert("Failed", res);
                // that.setState({ isLoading: false });
                return false;
            }
        });
    } catch (error) {
        console.log(error)
    }
}
export async function getCollection(_callback) {
    let data = [];
    await LEMARI_GLOBAL_LOAD(KEYS.KEY_CONTENT_CONTACT).then(res => {
        if (res) {
            data = res[0].list_doctor_categories;
        }
    });
    return data;
}
//REst HELP
export async function _reqHelp() {
    try {

        return resulth = await help().then((res) => {
            if (res) {
                if (res.api_message == 'success') {
                    LEMARI_GLOBAL_LOC([res], KEYS.KEY_CONTENT_HELP);
                    //_reqfile();
                    //return res;
                } else {
                    //callAlert("Failed", res.api_message);
                    //that.setState({ isLoading: false });
                    return false;
                }

            } else {
                // callAlert("Failed", res);
                // that.setState({ isLoading: false });
                return false;
            }
        });
    } catch (error) {
        console.log(error)
    }
}
//Grouping List
export function groupBY(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item])
        } else {
            collection.push(item);
        }
    })
    return map;
}
//NOTIFICATION
export async function reqNotifList() {
    let data = new FormData();
    data.append("cms_users_id", user.getUsId());
    try {
        return await gNotification(data).then(res => {
            console.log(res)
            if (res.api_message == "success") {
                return res.data;
            } else {
                callAlert("Failed", res.api_message);
                return false
            }
        })
    } catch (error) {
        console.log(error)
    }
}
//SYNC REDUCE
export async function _sync_remove(data, index) {

    let tempData = [...data];
    console.log("SYNC BEFORE", tempData);
    tempData.splice(index, 1);
    return await tempData;
}
//DETAIL DOCTER
export async function _getDoktorDetail(id) {
    let tryAgain = 1;
    let data = new FormData();
    data.append("user_id", user.getUsId());
    data.append("doctors_id", id);
    try {
        return await getDetailDokters(data).then(res => {
            console.log(res)
            if (res) {
                if (res.api_message == "success") {
                    return res.data;
                } else {
                    callAlert("Failed", res.api_message);
                    return false
                }
            }

        })
    } catch (error) {
        console.log(error);
        return false;
    }
}
//SUBMIT MEET DOCTER
export async function _sendSubmitComplete(data) {

    try {
        return await resultScheduleDokter(data).then(res => {
            console.log('resultScheduleDokter', res)
            if (res) {
                if (res.api_message == "success") {
                    return { result: true, msg: res };
                } else {
                    callToast("Failed : " + res.api_message);
                    return { result: false, msg: res.api_message };
                }
            } else {
                return { result: false, msg: res.api_message };
            }

        })
    } catch (error) {
        console.log(error)
    }
}
//SUBMIT PHOTO MEET DOCTER
export async function _sendSubmitPhoto(data) {

    try {
        return await photoSchedule(data)
            .then(res => {
                console.log(res);
                if (res == undefined) {
                    return false;
                }
                if (res) {
                    return res;
                } else {
                    //callToast(res.api_message);
                    return false;
                }
            })
            .catch(err => {
                console.log(err);
                return false;
            });
    } catch (error) {
        console.log(error)
        return false
    }
}
//FIND SELECT DOKTOR
export function getListUnTarget(shedule, target) {
    let result = [];
    //console.log(target)
    // target.map((ids,index)=>{
    //
    let tempHospital = shedule;
    let foundhospital = [];
    target.map((ids, index) => {
        console.log('id', ids)
        foundhospital = [];
        tempHospital.map((hospital, indexhos) => {
            //console.log("HOSPITAL ",hospital)
            if (hospital.doctors != undefined && hospital.doctors.length > 0) {
                let found = [];
                hospital.doctors.map((res, index) => {
                    if (res.id == ids.doctors_ids) {
                        //found.push(index);
                        var i = hospital.doctors.indexOf(res);
                        if (i != -1) {
                            hospital.doctors.splice(i, 1);
                        }
                    }
                })
                if (found.length > 0) {
                    found.reverse();
                    found.forEach((res) => {
                        hospital.doctors.splice(res, 1);
                    })
                }
            }
            if (hospital.doctors.length == 0) {
                foundhospital.push(hospital);
                //tempHospital.splice(index,1);
            }
        });

        //console.log('foundhospital ', foundhospital);

    });
    if (foundhospital.length > 0) {
        foundhospital.reverse();
        foundhospital.forEach((res) => {
            //tempHospital.splice(res, 1);
        })
    }
    //console.log('result getListUnTarget', tempHospital);
    return tempHospital;
}
//FIND DATA 
export function getListTargetBK(shedule, target) {
    let result = [];
    //console.log("getListTargetBK",target)
    //console.log("getTargetBK", shedule)
    target.forEach((ids, index) => {
        //console.log('id', ids)
        shedule.map((hospital, index) => {
            //console.log(hospital)
            let tempHospital = Object.assign({}, hospital);
            tempHospital.doctors = [];
            let indexDokter = 0;
            hospital.doctors.map((dokter, index) => {

                if (dokter.id === ids.doctors_ids) {
                    let fondDokter = Object.assign({}, dokter)
                    fondDokter.isSelect = 1;
                    if (result.find(hosptal => hosptal.id == tempHospital.id) == undefined) {

                        tempHospital.doctors[indexDokter] = fondDokter;

                        result.push(tempHospital);
                        indexDokter += 1;

                        if (hospital.doctors.length == indexDokter) {
                            tempHospital.isSelect = 1;
                        }
                    } else {
                        let tmpHospital = result.findIndex((elm) => {
                            return elm.id === hospital.id;
                        })
                        //console.log(" Hospital", result[tmpHospital])
                        result[tmpHospital].doctors.push(fondDokter);
                        //console.log(" tmpHospital",  tmpHospital)
                    }
                    //console.log("FOUND")
                }
            });

            //console.log(indexDokter + "," + hospital.doctors.length)
        });
    });
    // console.log('result getListTargetBK ', result);
    return result;
}
export function getListTargetCompleteMonth(shedule, target) {
    let result = [];
    //console.log("getListTargetCompleteMonth", target)
    //console.log("getListTargetCompleteMonth target", shedule)
    target.forEach((ids, index) => {
        //console.log('id', ids)
        shedule.map((hospital, index) => {
            //console.log(hospital)
            let tempHospital = Object.assign({}, hospital);
            tempHospital.doctors = [];
            let indexDokter = 0;
            hospital.doctors.map((dokter, index) => {

                if (dokter.id === ids.doctors_ids) {
                    if (dokter.schedule && dokter.schedule.length == 0) {
                        /*dokter.schedule[0] = { doctors_id: dokter.id, 
                            results: { created_at: formateFullDateNumber(Date.now(), "YYYY-MM-DD HH:MM:SS") ,status: 1, updated_at: null}, 
                            created_at: formateFullDateNumber(Date.now(), "YYYY-MM-DD HH:MM:SS"),
                            updated_at:null};
                        console.log("FOUND", dokter)*/
                        dokter.schedule[0] = ids.schedule;
                    }

                }
            });

            //console.log(indexDokter + "," + hospital.doctors.length)
        });
    });
    console.log('result getListTargetCompleteMonth ', shedule);
    return shedule;
}
//find Doktor by id
export async function getDoctorById(target) {
    return await DATA_SCHEDULE.getDataSchedule().then((shedule) => {
        let dataDokter = null;
        shedule.visit_schedule.map((hospital, index) => {
            hospital.doctors.map((dokter, index) => {
                if (dokter.id == target.doctors_ids) {
                    //if (result.find(hosptal => hosptal.id == tempHospital.id) == undefined) {
                    let fondDokter = Object.assign({}, dokter)
                    fondDokter.isSelect = 1;

                    dataDokter = fondDokter;
                    // }
                    //console.log("FOUND")
                }
            });
        });
        return dataDokter
    });
    /*return await LEMARI_GLOBAL_LOAD(KEYS.KEY_SCHEDULE).then((shedule) => {
        let dataDokter = null;
        shedule[0].visit_schedule.map((hospital, index) => {
            hospital.doctors.map((dokter, index) => {
                if (dokter.id == target.doctors_ids) {
                    //if (result.find(hosptal => hosptal.id == tempHospital.id) == undefined) {
                    let fondDokter = Object.assign({}, dokter)
                    fondDokter.isSelect = 1;

                    dataDokter = fondDokter;
                    // }
                    //console.log("FOUND")
                }
            });
        });
        return dataDokter
    });*/
}
//get doktor count
export async function getDoctorTotal() {
    return await DATA_SCHEDULE.getDataSchedule().then((shedule) => {
        if (shedule) {
            let dataDokter = [];
            shedule.visit_schedule.map((hospital, index) => {
                hospital.doctors.map((dokter, index) => {
                    let found = dataDokter.findIndex(reslt => { return reslt.id == dokter.id });
                    if (found < 0) {
                        dataDokter.push(dokter);
                    }
                });
            });
            console.log("total", dataDokter.length);
            return dataDokter.length
        }
    });
    /*return await LEMARI_GLOBAL_LOAD(KEYS.KEY_SCHEDULE).then((shedule) => {
        if (shedule) {
            let dataDokter = [];
            shedule[0].visit_schedule.map((hospital, index) => {
                hospital.doctors.map((dokter, index) => {
                    let found = dataDokter.findIndex(reslt => { return reslt.id == dokter.id });
                    if (found < 0) {
                        dataDokter.push(dokter);
                    }
                });
            });
            //console.log("total",dataDokter.length);
            return dataDokter.length
        }
    });*/
}
//ADD STATUS ID FROM DB 
export function rebuildSchedule(listschedule) {
    listschedule.map((res, index) => {
        //console.log("rebuildSchedule",res);
        res['isSelect'] = 0;
        res.doctors.map((resDOC, index) => {
            resDOC['isSelect'] = 0;
            if (resDOC.schedule == undefined) {
                resDOC['schedule'] = [];
            } else if (resDOC.schedule && resDOC.schedule.length > 0) {
                let now = getDATENoW();
                //console.log("SCHEDULE DATE ", resDOC);
                if (resDOC.schedule[0] && resDOC.schedule[0].schedule_date) {
                    let scheduleDate = resDOC.schedule[0].schedule_date;

                    if (now == scheduleDate) {
                        //console.log(resDOC.name + "SCHEDULE DATE valid");
                        resDOC['isSelect'] = 1;
                    } else {
                        //console.log("SCHEDULE DATE invalid");
                        resDOC['schedule'] = [];
                    }
                }

            }

        })
    })
    return listschedule
}
//REDUCE SHCEDULE FROM MET DOKTOR 
export function reduceWithMetSchedule(metDoktor, listschedule) {
    let tempSchedule = listschedule.slice(0);
    getMonthSchedulerDoktor(tempSchedule)
    tempSchedule.map((res, index) => {
        metDoktor.map((resmetdok, indexs) => {
            //console.log('already met', resmetdok);
            let found = res.doctors.findIndex(result => { return result.id == resmetdok.id })
            if (found > -1) {
                //console.log(found);
                res.doctors.splice(found, 1);
            }
        })
    })
    //getMonthSchedulerDoktor(metDoktor)
    getMonthSchedulerDoktor(tempSchedule)
    console.log('after reduce', tempSchedule);
    return tempSchedule
}
export function getDokterId(target) {
    let dataID = [];
    target.map((rmhskit, index) => {
        rmhskit.doctors.map((doktr, index) => {

            if (dataID.find(r => r.doctors_ids == doktr.id) == undefined) {
                dataID.push({ "doctors_ids": doktr.id });
            }
        })
    });

    return dataID;
}
export function getDokterisArray(target) {
    let dataID = [];
    if (target) {
        target.forEach((doktr, index) => {
            dataID.push(doktr.id);
        });
    }


    return dataID;
}
export function getDokterIdTab(target) {
    let dataID = [];
    console.log("getDokterIdTab", target)
    if (target) {
        if (target.length > 0) {
            target.map((doktr, index) => {
                if (dataID.find(r => r.doctors_ids == doktr.id) == undefined) {
                    dataID.push({ "doctors_ids": doktr.id });
                }
            });
        }
    }


    return dataID;
}
export function getDokterIdTabBySetSchedule(target) {
    let dataID = [];
    console.log("getDokterIdTab", target)
    if (target) {
        if (target.length > 0) {
            target.map((hospital, index) => {
                hospital.doctors.map((doktr, index) => {
                    if (dataID.find(r => r.doctors_ids == doktr.id) == undefined) {
                        dataID.push({ "doctors_ids": doktr.id, "schedule": doktr.schedule });
                    }
                });
            });
        }
    }


    return dataID;
}
export function getDokterStatusTodayTab(target, uid) {
    let dataID = 0;
    if (target.length > 0) {
        target.map((rmhskit, index) => {
            rmhskit.doctors.map((doktr, index) => {
                // console.log('today set doktor',doktr)
                if (doktr.id == uid) {
                    //  console.log("found",doktr.schedule[0].results)
                    if (doktr.schedule[0].results != null) {
                        dataID = 1;
                    }
                }
            })
        });
    }

    return dataID;
}
//GET SMALL SYNC
export async function Global_getListSmallSync() {

    return await SYNCLoc(KEYS.KEY_G, KEYS.KEY_NAME_SYNC).then(RES => {

        if (RES) {
            //console.log("small sync ", RES);
            return RES;
        } else {
            return false
        }
    });
}
//REST FOR ASYNC
export async function _sendSignal(_data) {
    let data = new FormData();
    data.append("user_id", user.getUsId());
    data.append("player_id", _data.userId);
    try {
        return result = await initSignal(data).then((res) => {
            console.log('resulth Send signal', res);

            if (res) {
                if (res.api_message == 'success') {
                    return res;
                } else {
                    return false;
                }

            } else {

                return false;
            }
        }
        );
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function _sendAttenabsen(_data) {
    let data = new FormData();

    let _status = null;
    let _date = null;
    if (_data.status == "in") {
        _date = _data.attend.in;
        _status = "in"
    } else if (_data.status == "out") {
        _date = _data.attend.out;
        _status = "out"
    }


    data.append("user_id", user.getUsId());
    data.append("status", _status);
    data.append("date", _date);

    try {
        return result = await sendAttend(data).then((res) => {
            console.log('resulth Send Attend', res);

            if (res) {
                if (res.api_message == 'success') {
                    return res;
                } else {
                    return false;
                }

            } else {

                return false;
            }
        }
        );
    } catch (error) {
        console.log(error);
        return false;
    }
}
//SAVE ATTEN TO CORE DATA
export function saveAttenToCore(_data) {
    DATA_SCHEDULE.getDataSchedule().then(res => {
        if (res) {
            res.attend = _data;
            DATA_SCHEDULE.updateDataSchedule(res);
        }
    })
    SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res => {
        if (res[0]) {
            console.log(res[0])
            res[0].attend = _data;
            //SYNCLoc(KEYS.KEY_U, KEYS.KEY_SCHEDULE, res[0]);
        } else if (res) {
            console.log(res)
            res.attend = _data;
            console.log("saveAttenToCore")
            SYNCLoc_CORE_SET(data);
            //SYNCLoc(KEYS.KEY_U, KEYS.KEY_SCHEDULE, res);
        }
    });
}
//AUTO LOG OUT
export async function _sendAtten(_data) {
    let data = new FormData();
    data.append("user_id", user.getUsId());
    let _status = null;
    let _date = null;
    if (_data.attend.in && _data.attend.in.length > 0) {
        _date = _data.attend.in;
        _status = "in"
    } else if (_data.attend.out && _data.attend.out.length > 0) {
        _date = _data.attend.out;
        _status = "out"
    }


    data.append("in", _data.attend.in);
    data.append("out", _data.attend.out);
    //data.append("date", _date);
    try {
        return result = await sendAttend_SYN(data).then((res) => {
            console.log('resulth Send Attend IN OUT', res);

            if (res) {
                if (res.api_message == 'success') {
                    return res;
                } else {
                    return false;
                }

            } else {

                return false;
            }
        }
        );
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function _sendSelectDokter(_data) {
    let _selectDokter = _data.datas;

    console.log('select', _selectDokter);
    //for api
    let data = new FormData();
    data.append("user_id", _data.user_id);
    //let listSelect = []
    _selectDokter.map((item, index) => {
        console.log(item)
        data.append("doctors_ids[" + index + "]", item.doctors_ids);
        //listSelect.push({ "doctors_ids": item })
    })

    try {
        return result = await sendSchedule(data).then((res) => {
            console.log('resulth Send Select Dokter', res);

            if (res) {
                if (res.api_message == 'success') {
                    return res;
                } else {
                    return false;
                }

            } else {

                return false;
            }
        }
        );
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function _sendExpends(_data) {
    let data = new FormData();
    data.append("cms_users_id", _data.cms_users_id);
    data.append("doctors_id", _data.doctors_id);
    data.append("setdate", _data.setdate);
    data.append("amount", _data.amount);
    data.append("purpose", _data.purpose);
    data.append("picture", {
        uri: _data.uri,
        type: _data.type,
        name: _data.fileName
    });
    try {
        return result = await sendExepense(data).then((res) => {
            console.log('resulth Send expends', res);

            if (res) {
                if (res.api_message == 'success') {
                    return res;
                } else {
                    return false;
                }

            } else {

                return false;
            }
        }
        );
    } catch (error) {
        console.log(error)
        return false;
    }
}
export async function _sendLocation(_data) {
    let value = _data.coordinate;
    let loc = value.lat + "," + value.lng;
    let data = new FormData();

    let locjson = value
    let address = ""
    try {
        return result = await getReverseGeo(locjson).then(res => {
            console.log("reveres", res)
            if (res != null && res != false) {
                // that.setState({ allDatas: res.data }, () => that._setData())
                address = res.address.road;
                data.append("cms_users_id", user.getUsId());
                data.append("coordinate", loc);
                data.append("address", address);
                return sendCurrentLocation(data).then(res => {
                    console.log('resulth getReverseGeo', res);

                    if (res) {
                        if (res.api_message == 'success') {
                            return res;
                        } else {
                            return false;
                        }

                    } else {

                        return false;
                    }
                })
            } else {
                return false;
                //callAlert("Failed", res.api_message);
                // that.setState({ isLoading: false, isRefresh: false })
            }
        })

    } catch (error) {
        console.log(error)
        return false;
    }
}
export async function SaveSyncFoto(_photos, _id, _callback) {

    let _fotoObject = [];
    let id_schedule = _id;
    console.log(_photos);
    if (_photos) {
        _photos.forEach((datas, index) => {
            if (datas.dataPhoto != null) {
                let dataPhoto = {
                    id: index,
                    id_submit: id_schedule,
                    data: datas,
                    key: KEYS.KEY_MEETDOCTOR_PHOTO,
                    create_at: formateFullDateNumber(Date.now())
                };
                _fotoObject.push(dataPhoto);
            }

            if (index == _photos.length - 1) {
                // console.log("save image success");
                console.log("foto dir", _fotoObject);
                Sync_Photo_Resulth(_fotoObject).then(res => {
                    console.log("Sync_Photo_Resulth RES", res);
                    if (res) {
                        console.log("save image success");
                        //_callback();
                        let exePhoto = setTimeout(() => {
                            Execute_Sync_Photo_Resulth(0);
                            _callback();
                            clearTimeout(exePhoto);
                        }, 3000);
                    }
                });
            }
        });
    } else {
        return false;
    }
}
export async function _sendResulthMeetDoktor(_data) {
    console.log("_sendResulthMeetDoktor", _data);
    let datein = _data.updated_at.slice(0, 10);
    let loc = formateFullDateNumber(datein, "YYYY-MM-DD");
    let dates = _data.schedule_date ? _data.schedule_date : loc;
    let dataform = new FormData();
    dataform.append("status", _data.status);
    dataform.append("cms_users_id", _data.cms_users_id);
    dataform.append("schedule_date", dates);
    dataform.append("doctors_id", _data.doctors_id);
    dataform.append("signature", _data.signature);
    dataform.append("feedback", _data.feedback);
    dataform.append("feedback_sales", _data.feedback_sales);
    dataform.append("locations_id", _data.locations_id);//id_rumah sakit
    dataform.append("e_detailings_name", _data.e_detailings_name);
    dataform.append("json_result", _data.json_result);

    console.log("_sendSubmitComplete form : ", dataform)
    //return false;
    try {
        return await _sendSubmitComplete(dataform).then(res => {
            console.log("_sendSubmitComplete", res);
            if (res) {
                if (res.result == true) {
                    if (res.msg.api_message == 'success') {
                        updateStatusDoktor(_data);

                        /*console.log("SYNC FOTO",_fotoObject);
                        Sync_Photo_Resulth(_fotoObject).then(res=>{
                            console.log("Sync_Photo_Resulth RES",res);
                        
                            if(res){
                                //let exePhoto = setTimeout(() => {
                                    Execute_Sync_Photo_Resulth(0);
                                // clearTimeout(exePhoto);
                                    
                                //}, 2000);
                            }
                        
                        });*/
                        return res;
                    } else {
                        return res;
                    }
                } else {
                    return res;
                }

            } else {

                return res;
            }
        }).catch(e => {
            callToast(String(e))
            return false;
        })
    } catch (error) {
        console.log(error)
        return false;
    }

}
export function getDATENoW() {
    //return formateFullDateNumberTomorrow(Date.now(),"YYYY-MM-DD")
    return formateFullDateNumber(Date.now(), "YYYY-MM-DD");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function getLocalSchedule() {
    /*let schedule = ShdeuleProvider.findAll();
    if (Object.keys(schedule).length != 0) {
        let dataSchedule = [...schedule];
        return dataSchedule;
    } else {
        return null
    }*/

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function DebugToast(msg) {
    if (Constant.TRAC_DEBUG_MODE) {
        callToast(msg)
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function getKeyAsyncName(key) {
    switch (key) {
        case KEYS.KEY_MEETDOCTOR_PHOTO:
            return "Meet Doctor Photo";
        case KEYS.KEY_MEETDOCTOR_RESULTH:
            return "Meet Doctor Submit";
        case KEYS.KEY_SEND_LOCATION:
            return "Location";
        case KEYS.KEY_ATTEND:
            return "Attend";
        case KEYS.KEY_SELECTTARGET:
            return "Select Doctor";
        default:
            return key
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NEW SYSTEM
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function SYNCLoc_CORE_SET(data) {
    console.log("SYNCLoc_CORE_SET ");
    let dataClone = Object.assign({}, data);
    let maxData = 100;
    //console.log("dataClone ", dataClone);
    let coredata = {};
    let dataTodayUpdate = await UPDATE_SET_TODAY(dataClone.list_doctor_set_today, dataClone.visit_schedule);//add visitable
    // console.log('=UPDATE_SET_TODAY=',dataTodayUpdate);
    //user.updateSelectSchedule(dataTodayUpdate);
    coredata.api_message = dataClone.api_message;
    coredata.attend = dataClone.attend;
    coredata.set_schedule = dataClone.set_schedule;
    coredata.list_doctor_set_today = dataTodayUpdate;
    coredata.list_doctor_set_this_month = dataClone.list_doctor_set_this_month;

    if (dataClone.visit_schedule && dataClone.visit_schedule.length > maxData) {
        let counts = Math.ceil(dataClone.visit_schedule.length / maxData);
        coredata.visit_schedule = [];
        let dataHospital = ArraySplitChunk(maxData, dataClone.visit_schedule);
        for (i = 0; i < counts; i++) {
            let tempKey = KEYS.KEY_HOSPITALLIST + i;
            coredata.visit_schedule.push({ keys: tempKey })

            //
            // console.log("save group hospital ",dataHospital[i]);
            SYNCLoc(KEYS.KEY_U, tempKey, dataHospital[i]).then(res => {
                // console.log("save page "+tempKey+" result ", res)
            });

        }
        // console.log("SYNCLoc_CORE_SET ", dataHospital);

    } else {
        coredata.visit_schedule = dataClone.visit_schedule;
    }
    // SAVE DATA PAGING - DON't REPLACE

    console.log("SYNCLoc_CORE_SET ", coredata);
    return coredata;

    return await SYNCLoc(KEYS.KEY_U, KEYS.KEY_SCHEDULE, coredata).then(res => {
        //console.log("save KEY_SCHEDULE result ", res)
    });


}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//update status set today
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function UPDATE_SET_TODAY(target, schedulelist) {
    console.log('=UPDATE_SET_TODAY=')
    // console.log('today ',target)
    //console.log('schedule ', schedulelist)
    if (target && target.length > 0) {
        target.map(res => {
            // console.log(res);
            if (schedulelist && schedulelist.length > 0) {
                schedulelist.map(reshospital => {
                    let data = reshospital.doctors.find(resdoktor => resdoktor.id == res.id);
                    if (data != undefined) {
                        // console.log("found ",data);
                        res['visitable'] = data.visitable;
                    }
                })
            }
        })
        return await target;
    } else {
        return await target;
    }



}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function SYNCLoc_CORE_GET() {
    return await SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res => {
        //console.log("Get SYNCLoc_CORE_GET result ", res)
        if (res) {
            let resultData = Object.assign({}, res)
            if (resultData.visit_schedule[0].keys) {
                //console.log("read data paging");
                let tempVisit_schedule = [];
                resultData.visit_schedule.map(async resdata => {
                    //console.log("KEY", resdata);
                    let data = await SYNCLoc(KEYS.KEY_G, resdata.keys)
                    //
                    //console.log("data paging", data);
                    tempVisit_schedule = tempVisit_schedule.concat(data);
                    //console.log("visit_schedule : ", tempVisit_schedule);
                    resultData.visit_schedule = tempVisit_schedule;
                });

            }
            return resultData;
        } else {
            return null;
        }

    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function ArraySplitChunk(counts, params) {
    Object.defineProperty(Array.prototype, 'chunk_ineffiecent', {
        value: function (chunkSize) {
            var array = this;
            return [].concat.apply([],
                array.map(function (elem, i) {
                    return i % chunkSize ? [] : [array.slice(i, i + chunkSize)]
                })
            );
        },
        configurable: true
    })

    return params.chunk_ineffiecent(counts);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
