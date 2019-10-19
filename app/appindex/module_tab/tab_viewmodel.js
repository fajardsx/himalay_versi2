import React, { Component } from 'react';
import { StatusBar, Platform, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, BackHandler, Alert, AppState } from "react-native";
import { createBottomTabNavigator, createStackNavigator, StackActions, createAppContainer, NavigationActions } from "react-navigation";
import BottomNavigation, {
    IconTab,
    Badge
} from 'react-native-material-bottom-navigation';
//import OneSignal from "react-native-onesignal";
import Constant from "../../global/Constant";
import Global, { getDateNumber, getDateNumberAttend, saveAttenToCore, SYNCLoc_CORE_GET, UPDATE_SET_TODAY, SYNCLoc_CORE_SET } from "../../global/Global";
import user from "../../global/user";
import { _handleAppStateChange, convertHeight, convertWidth, callAlert, generateSelectDokter, getLocal, delLocal, successLogutClear, loading, reqNotifList, _sendSubmitComplete, addLocal, getListLocation, getExpendsList, callToast, formateFullDateNumber, getDokterId, getListTarget, rebuildSchedule, getDokterIdTab, getListTargetBK, getListUnTarget, _getDoktorDetail, getIfYesterday, _reqAboutUs, _checkStatus, Global_checkStatus, getDokterisArray, Global_resetShceduleSession, getDoctorById, reduceWithMetSchedule, _sendAtten, getDokterIdTabBySetSchedule } from "../../global/Global"

import { connect } from 'react-redux';
import ACTION_TYPE from "../../redux/actions/actions";
//view page
import HomeViewModel from '../module_home/home_viewmodel';
import NotificationViewModel from '../module_notif';
import HistoryViewModel from '../module_history';
import ExpensesViewModel from '../module_expenses';
import EdetailingViewModel from '../module_edetailing';
import PopViewModel from '../../appcomponent/module_popup/popup_viewmodel';
import PopBurgerMenuViewModel from '../../appcomponent/module_popup/menuburger_viewmodel';
import LocationModule from '../../appcomponent/module_location';
import ExpensesCore from '../module_expenses/expenses_stack';
import HomeCore from '../module_home/home_stack';
import DoctorDetailViewModel from '../module_doctordetail';
import { reqSchedule, sendSchedule, sendAttend, unsetSchedule, initSignal, logExitUser, sendPass, about, contact, help, update, sendAttend_SYN } from '../../module_api/module_resapi';
import EdetailingCore from '../module_edetailing/edatailingstack';
import Resetscreen from '../../Module_Login/resetpassviewmodel';
import AboutUsScreen from '../module_burger/module_aboutus';
import ContactUsScreen from '../module_burger/module_contactus';
import HelpScreen from '../module_burger/module_help';
import { Execute_Sync_Photo_Resulth, clean_sync_all, LEMARI_GLOBAL_LOC, LEMARI_GLOBAL_LOAD, LEMARI_GLOBAL_LOCDEBUG, F_I_F_O_GLOBAL_LOC, TargetSelect, getIDSAsync, LEMARI_GLOBAL_SELECT, Execute_FIFO, LEMARI_GLOBAL_DETAIL, LEMARI_GLOBAL_DETAIL_DEL, updateStatusDoktor, LEMARI_GLOBAL_DETAIL_GET, updateUserAttend, grabFile, showwFIFO, LEMARI_GLOBAL_DETAIL_GET_ALL, ASYNC_getScheduleToday, SYNCLoc, clean_sync_session, StartExecuteFIFO, getVisitSchedule } from '../../appcomponent/module_async/AsyncManager';
import PopFeedBackViewModel from '../../appcomponent/module_popup/popup_feedback_viewmodel';
import PAGE_CONFIG, { toTopHome } from '../../pagemanager/Module_pagemanager';

import constants from 'jest-haste-map/build/constants';
import KEYS from '../../appcomponent/module_async/utils/keyAsync';
import Headers from '../module_header';
import PopNotifViewModel from '../../appcomponent/module_popup/popup_notif_viewmodel';
import PopListDokterViewModel from '../../appcomponent/module_popup/popuplistdokter_viewmodel';
import SyncScreen from '../module_burger/module_sync';
import DokterManager, { getMonthSchedulerDoktor, GetAllDocter, SaveSendDoctor, GetListTodayPlan } from '../../global/dokter_manager';
import ScreeDevmode from '../../screen/screen_devmode';
import store from "react-native-simple-store";
import DATA_SCHEDULE from '../../db/dataScheduleManager';

console.disableYellowBox = true;

///TAB
const hIcon = "6%";
let that = null;
let data_pushnotif = {
    notif: 0,
    msg: 0
}
let TimerCheck = 0;
let schdeuleAToday = [];
let corehome = React.createRef();
let expenseCore = React.createRef();
let tabBoolean = true;
let countNotif_int = 0;
class TabController extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props)
        this.state = {
            init_onesignal: false,
            init_apps: false,
            enable: true,
            datanotif: data_pushnotif,
            isPopStart: false,
            isPopFeedBackStart: false,
            feedbackForm: null,//feedback
            resulthFormDataForm: null,//feedback
            isBurgerStart: false,
            isResetPass: false,
            isAboutUsOpen: false,
            isContactUsOpen: false,
            isSyncPageOpen: false,
            isHelpOpen: false,
            complete: null,
            completeDetailDocter: 0,
            dataschedule: [],
            initSchedule: [],
            selectschedule: [],
            complete_yesterday: [],
            isLoading: false,
            countNotif: 1,
            notifList: [],
            historyList: [],
            expensesList: [],
            scheduleList: [],
            selectToday: [],
            isSync: false,
            timerSync: 0,
            isFirstLoad: true,
            ROLE: 0,
            currentRew: [],
            popNotifEnable: false,
            popNotifMessage: null,
            popListDoktor: false,
            typeListDokter: 0
        }
        that = this;

    }
    componentWillMount() {
        console.log('TAB')
        this.initOS();
        //this._checkStatus();

        // getLocal(Constant.KEY_NOTIFICATION).then((res) => {
        //     console.log("NOTIF : ", res);

        //     if (res == null || res == undefined) {

        //         OneSignal.setSubscription(true);
        //         let data = {
        //             notif_enabled: true
        //         }
        //         addLocal(Constant.KEY_NOTIFICATION, data)
        //     } else {
        //         //if (res.notif_enabled == true){
        //         OneSignal.setSubscription(res.notif_enabled);
        //         // }
        //         that.setState({ enable: res.notif_enable, init_onesignal: true });
        //     }
        // })

    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        AppState.addEventListener("change", _handleAppStateChange);
        PAGE_CONFIG.tabRoute = this.props.navigation;
        this._onSuccess(this)
        this.initOSignal();


        //list notif
        getLocal(Constant.KEY_DATA_NOTIFICATION).then(results => {
            console.log("localdata_notif", results);
            if (results != null) {
                this.setState({
                    datanotif: results
                })
            }
        })
        //DATA SCHEDULE






        //that._getreqSchedule2()

        //SYNC
        this._syncConnect();

        //
        /*
         onPressReset={this.onPressResetPass.bind(this)}
                    onAboutPress={this._onAboutOpen.bind(this)}
                    onContactPress={this._onContactOpen.bind(this)}
                    onHelpPress={this._onHelpOpen.bind(this)}
                 
                    onSyncPress={this._onSyncPageOpen.bind(this)}
        */
        this.props.navigation.setParams({
            'onClose': this.onPressCloseBurgerMenu.bind(this),
            'onLogout': this.onPressLogoutBurgerMenu.bind(this),
            'onShowResetPass': this.onPressResetPass.bind(this),
            'onShowAbout': this._onAboutOpen.bind(this),
            'onShowContact': this._onContactOpen.bind(this),
            'onShowHelp': this._onHelpOpen.bind(this),
            'onShowSync': this._onSyncPageOpen.bind(this),
        });

        //console.log("TODAY NOW", getDateNumber(new Date().now, "YYYY-MM-DD HH:mm:ss"));
        //INIT

    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        AppState.removeEventListener("change", _handleAppStateChange);
        this.uninitOSignal();
        if (this.callSyncCountdown) {
            clearTimeout(this.callSyncCountdown);
        }
    }
    componentDidUpdate() {
        //console.log("tab ref : ", this.tabs);
        // console.log("chat ref : ", this.chatpage);
    }
    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;
    }
    // FUNCTION
    //CHANGE ROOT ROLE
    onUpdateRole(value, callEnd = false) {
        this.setState({
            ROLE: value,

        }, () => {
            this.setState({
                init_apps: true
            })
        });

        if (callEnd == true) {
            this._sendAttendSchedule('out', true);
        }
    }
    //CHANGE ROLE ACTIVITY USER
    onStartSelectSchedule() {
        const { ROLE } = this.state;
        if (ROLE == Constant.ROLE_INLOGIN) {
            this._sendAttendSchedule('in');
            //user.updateStatusRole(Constant.ROLE_INSELECTSCHEDULE);
        } else if (ROLE == Constant.ROLE_INSELECTSCHEDULE) {
            console.log("send", generateSelectDokter(schdeuleAToday));
            this._sendSelectSchedule();
            //user.updateStatusRole(Constant.ROLE_READYSTARTSCHEDULE);
        } else if (ROLE == Constant.ROLE_ADDDOCTORAGAIN) {
            console.log("send", generateSelectDokter(schdeuleAToday));
            this._sendSelectSchedule();
        } else if (ROLE == Constant.ROLE_READYSTARTSCHEDULE) {
            this._sendAttendSchedule('out');
        }
        this.setState({
            isPopStart: false
        })
    }
    onOpenList(id) {
        this.setState({
            popListDoktor: true,
            typeListDokter: id
        })
    }
    onCloseOpenList() {
        this.setState({
            popListDoktor: false
        })
    }


    onPressLogoutBurgerMenu(_string = "Success Log Out") {
        //send log out id
        if (this.state.isloading == true) {
            return;
        }
        this.setState({ isloading: true });
        //OneSignal.setSubscription(false);
        successLogutClear().then(res => {

            // that.props.screenProps.navigate(Constant.VM_LOGIN_SCREEN);
            clean_sync_all().then(res => {
                console.log("clear", res)
                if (res == true) {
                    let timeLogout = setTimeout(() => {
                        callAlert(Constant.NAME_APPS, _string)
                        clearTimeout(timeLogout);
                        this._log_out().then(res => {
                            console.log(res);

                            if (res != false) {
                                if (res.api_message == "success") {
                                    that.setState({
                                        isloading: false,
                                        isBurgerStart: false
                                    });
                                    that._onExit()
                                } else {
                                    //callAlert(Constant.NAME_APPS, "Failed Log Out")
                                    //that.props.screenProps.goBack();
                                }
                            } else {
                                //that.props.screenProps.goBack();
                            }
                        });
                    }, 1000);
                }

            })
        });

    }

    onStatusGeoLocation() {
        return <LocationModule />
    }
    reqSchedule() {
        console.log('request schedule');
        return schdeuleAToday;
    }
    saveSchedule(data) {
        schdeuleAToday = data;
        console.log("set", schdeuleAToday);
    }
    sendScheduleToHome() {
        //console.log();
        console.log(corehome.fromParent());
        // this.corehome.fromParent()
    }
    _onTryResetPass(datas) {
        //console.log(datas);
        this._sendChange(datas).then(res => {
            console.log(res)
            if (res != false) {
                that.setState({
                    isResetPass: false
                })
            }

        });
    }
    //event show burger menu

    onPressStartCancel() {
        this.setState({
            isPopStart: false
        })
    }
    PopStart() {

        this.setState({
            isPopStart: true
        })

    }

    onPressCloseBurgerMenu() {
        this.props.navigation.closeDrawer();
        this.setState({
            isBurgerStart: false,
            isContactUsOpen: false,
            isSyncPageOpen: false,
            isAboutUsOpen: false,
            isHelpOpen: false
        })
    }
    onPressResetPass() {
        this.onPressCloseBurgerMenu();
        this.setState({
            isBurgerStart: false,
            isResetPass: true
        })
    }
    PopBurget() {
        this._onAboutClose();
        this.props.navigation.openDrawer();
        this.setState({
            //isBurgerStart: true
        })
    }
    _onCloseResetPass() {
        this.setState({
            isResetPass: false
        })
    }
    _onAboutOpen() {
        this.onPressCloseBurgerMenu();
        this.setState({
            isBurgerStart: false,
            isAboutUsOpen: true
        })
    }
    _onAboutClose() {
        this.setState({
            isAboutUsOpen: false
        })
    }
    _onContactOpen() {
        this.onPressCloseBurgerMenu();
        this.setState({
            isBurgerStart: false,
            isContactUsOpen: true
        })
    }
    _onContactClose() {
        this.setState({
            isContactUsOpen: false
        })
    }
    _onSyncPageOpen() {
        this.onPressCloseBurgerMenu();
        this.setState({
            isBurgerStart: false,
            isSyncPageOpen: true
        })
    }
    _onSyncPageClose() {
        this.setState({
            isSyncPageOpen: false
        })
    }
    _onHelpOpen() {
        this.onPressCloseBurgerMenu();
        this.setState({
            isBurgerStart: false,
            isHelpOpen: true
        })
    }
    _onCHelpClose() {
        this.setState({
            isHelpOpen: false
        })
    }
    _onNotifClose() {
        this.setState({
            popNotifEnable: false
        })
    }
    _onNotifOpen(content) {
        this.setState({
            popNotifMessage: content,
            popNotifEnable: true
        })
    }
    //////////////////////
    //feedback
    _onSendFeedBackPress(txt) {
        //this._onFeedbackClose();
        console.log("feedback")

        this.setState({
            isLoading: true
        })
        this._sendFeedBack(txt)
    }
    _onFeedbackOpen(data, jdata = null) {
        this.onPressCloseBurgerMenu();
        console.log('openfeed', data);
        console.log('openfeed jdata', jdata);
        this.setState({
            isBurgerStart: false,
            isPopFeedBackStart: true,
            feedbackForm: data,
            resulthFormDataForm: jdata
        })
    }
    _onFeedbackClose() {
        this.setState({
            isPopFeedBackStart: false
        })
    }
    //proses schedule data this month
    onProcessSchdedule() {
        let data = this.state.dataschedule;

        // console.log('proces',data);
        //save complete schedule
        user.updateUserDoneMonth(this.state.complete_yesterday);

        Global_checkStatus(this.onUpdateRole.bind(this))
        // ASYNC_getScheduleToday(KEYS.KEY_LISTDOCTODAY)
    }

    //ONE SIGNAL
    async enableNotification(value) {
        console.log("enable notif", value)
        //OneSignal.setSubscription(value);
        if (value == false) {
            //this.uninitOSignal();
        } else {
            //this.initOS();
            //this.initOSignal();
        }

    }
    initOS() {
        that.setState({ enable: true });
        // OneSignal.setLogLevel(0, 0);
        // OneSignal.setRequiresUserPrivacyConsent(Constant.OSKEY_PRIVACY)
        // OneSignal.init(Constant.OSKEY);
        // OneSignal.setLocationShared(false);
        // OneSignal.inFocusDisplaying(2);
        // OneSignal.configure();
        // OneSignal.addEventListener("ids", this.onIdes.bind(this));
    }
    initOSignal() {
        console.log("Init onesignal");

        // OneSignal.addEventListener("received", this.onReceived.bind(this));
        // OneSignal.addEventListener("opened", this.onOpened.bind(this));
    }
    uninitOSignal() {
        console.log("unInit onesignal");

        // OneSignal.removeEventListener("received", this.onReceived.bind(this));
        // OneSignal.removeEventListener("opened", this.onOpened.bind(this));
        // OneSignal.removeEventListener("ids", this.onIdes.bind(this));
        //OneSignal.clearListeners();
    }
    onReceived(notification) {
        console.log("Notification received: ", notification);

        if (notification.payload.additionalData.detail == 'force out') {
            callAlert("force out", "someone login to your account")
            this._onFailed(this, notification.payload.body);
        } else {
            this._reqNotif();
        }


    }
    setBadge(badgecount) {
        console.log("update badge ", badgecount)
        this.setState({ datanotif: badgecount }, () =>
            addLocal(CONSTANT.KEY_DATA_NOTIFICATION, this.state.datanotif)
        );
    }
    reduceBadge(notificationtype) {
        console.log("Notification reduce: ", notificationtype);

    }
    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
        if (openResult.notification.payload.additionalData.detail == 'force out') {
            this._onFailed(this, openResult.notification.payload.body);
        } else {
            this._jumpfromnotification(openResult.notification);
        }

    }
    onIdes(devices) {
        console.log("Device info: ", devices);
        // this._reqfile();
        //send player id
        //that._onSuccess(that);
        //if(Constant.ONLINE == true){
        this._sendSignal(devices).then(res => {
            console.log("onesignal", res);
            let _data = {
                id: 0,
                type: KEYS.KEY_ONESIGNALTARGET,
                //date: datenow,
                data: devices,
            }
            if (res != false) {
                if (res.api_message == "success") {

                    LEMARI_GLOBAL_LOC([devices], KEYS.KEY_ONESIGNALTARGET);
                    //
                    that.setState({
                        init_onesignal: true
                    });
                } else {
                    callAlert("Login Failed", res.api_message)
                    //that._onSuccess(that);
                }
            } else {
                //that._onSuccess(that);
            }
        })
        // }else{
        // that._onSuccess(that);
        // }

    }
    _onFailed(parent, _msg) {
        if (_msg) {
            parent.onPressLogoutBurgerMenu(_msg);
        } else {
            parent.onPressLogoutBurgerMenu();
        }

    }
    _onSuccess(parent) {

        console.log("INIT LIST SCHEDULE")

        this._getreqSchedule2() //START APPS

    }
    _jumpfromnotification(data) {
        console.log("click notif : ", data);
        let datas = null
        let key_di = Math.random() * 10000;
        this.setState({
            popNotifMessage: {
                date: data.payload.additionalData.created_at.date,
                content: data.payload.additionalData.detail,
                title: data.payload.body
            }
        }, () => {
            this.setState({ popNotifEnable: true })
        })
        /*switch (data.payload.additionalData.type) {
            case Constant.NOTIF_NEWS:
            

                break;
            case Constant.NOTIF_PRODUCT:
               

                break;
            case Constant.NOTIF_RECIPES:
               
                break;
            case Constant.NOTIF_CHAT:
               
                break;
            default:
                break;
        }*/
    }
    ///////////

    onSetTab = (show) => {
        //if (this.state.isLoading == false && this.state.dataschedule.length>0){
        //console.log(this.state.dataschedule)
        if (show == true) {
            return <TabContainer
                ref={refs => this.tabs = refs}
                screenProps={{
                    navigation: this.props.navigation,
                    _callPopStart: this.PopStart.bind(this),
                    _callPopFeedback: this._onFeedbackOpen.bind(this),
                    _callPopBurger: this.PopBurget.bind(this),
                    _callCloseBurger: this.onPressCloseBurgerMenu.bind(this),
                    _saveSchedule: this.saveSchedule.bind(this),
                    _reqSchedule: this._getreqSchedule2.bind(this),
                    _reqNotif: this._reqNotif.bind(this),
                    _reqHistory: this._reqHistory.bind(this),
                    _reqExpendses: this._reqExpendses.bind(this),
                    _resync: this._onSyncAll.bind(this),
                    //_firstSchedule: this._firstreqSchedule.bind(this),
                    _unsetSchedule: this._getUnsetSchedule.bind(this),
                    _updateReviewSchedule: this._reviewSelectDokter.bind(this),
                    _dataschedule: this.state.dataschedule,
                    _selectschedule: this.state.selectschedule,
                    _notifdata: this.state.notifList,
                    _historydata: this.state.historyList,
                    _expensesList: this.state.expensesList,
                    _scheduleList: this.state.scheduleList,
                    _onUpdateRole: this.onUpdateRole.bind(this),
                    _onNotifOpen: this._onNotifOpen.bind(this),
                    _onOpenList: this.onOpenList.bind(this),
                    _role: this.state.ROLE,
                    _initapps: this.state.init_apps
                    //_rootloading: this.state.isLoading,
                }} />
        } else {
            return <View style={{
                width: convertWidth('100%'),
                height: convertHeight('100%'),
            }}>
                <Headers
                    navigation={this.props.navigation}
                    // burgeronpress={this.props.screenProps._callPopBurger}
                    titleheader={Constant.TAB_SCHEDULE}
                />
                <View style={{
                    flex: 1
                }}>

                </View>
            </View>
        }
    }
    //RENDER WELCOME
    displayWelcome = () => {
        return <View style={{
            width: convertWidth('100%'),
            height: convertHeight('100%'),
        }}>
            <Headers
                navigation={this.props.navigation}
                // burgeronpress={this.props.screenProps._callPopBurger}
                titleheader={Constant.TAB_SCHEDULE}
            />
            <View style={{
                flex: 1
            }}>

            </View>
        </View>
    }
    //SHOW RENDER
    render() {
        const { isPopStart,
            isBurgerStart,
            isContactUsOpen,
            isResetPass,
            isHelpOpen,
            isLoading,
            isPopFeedBackStart,
            isSyncPageOpen,
            popNotifEnable,
            init_onesignal,
            init_apps,
            ROLE,
            listrev,
            popNotifMessage,
            typeListDokter,
            popListDoktor,
            isAboutUsOpen,
            dataschedule
        } = this.state;


        return <View style={{ flex: 1, backgroundColor: Constant.COLOR_WHITE2 }}>

            {
                this.onSetTab(true)

            }
            {isPopStart == true &&
                <PopViewModel _rew={listrev} onPressStartCancel={this.onPressStartCancel.bind(this)} onPressStart={this.onStartSelectSchedule.bind(this)} />
            }
            {popListDoktor == true &&
                <PopListDokterViewModel currentType={typeListDokter} onPressStartCancel={this.onCloseOpenList.bind(this)} />
            }
            {isPopFeedBackStart == true &&
                <PopFeedBackViewModel onPressStartCancel={this._onFeedbackClose.bind(this)} onPressStart={this._onSendFeedBackPress.bind(this)} />
            }
            {
                this.onStatusGeoLocation()
            }
            {isResetPass == true &&
                <Resetscreen onBack={this._onCloseResetPass.bind(this)} onSend={this._onTryResetPass.bind(this)} />
            }
            {isAboutUsOpen == true &&
                <AboutUsScreen navigation={this.props.navigation} _callPopBurger={this.PopBurget.bind(this)} onClose={this._onAboutClose.bind(this)} />
            }
            {isContactUsOpen == true &&
                <ContactUsScreen navigation={this.props.navigation} _callPopBurger={this.PopBurget.bind(this)} onClose={this._onContactClose.bind(this)} />
            }
            {isHelpOpen == true &&
                <HelpScreen navigation={this.props.navigation} _callPopBurger={this.PopBurget.bind(this)} onClose={this._onCHelpClose.bind(this)} />
            }
            {
                popNotifEnable == true &&
                <PopNotifViewModel navigation={this.props.navigation} data={popNotifMessage} onClose={this._onNotifClose.bind(this)} />
            }
            {
                isSyncPageOpen == true &&
                <SyncScreen navigation={this.props.navigation} _callPopBurger={this.PopBurget.bind(this)} onClose={this._onSyncPageClose.bind(this)} />
            }
            {isBurgerStart == true &&
                <PopBurgerMenuViewModel
                    onPressClose={this.onPressCloseBurgerMenu.bind(this)}
                    onPressLogout={this.onPressLogoutBurgerMenu.bind(this)}
                    //onPressLogout={this._onExit.bind(this)}
                    onPressReset={this.onPressResetPass.bind(this)}
                    onAboutPress={this._onAboutOpen.bind(this)}
                    onContactPress={this._onContactOpen.bind(this)}
                    onHelpPress={this._onHelpOpen.bind(this)}
                    //onSyncPress={this._onSyncAll.bind(this)}
                    onSyncPress={this._onSyncPageOpen.bind(this)}
                />
            }
            <ScreeDevmode />
            {isLoading &&
                loading()
            }

        </View>;
    }
    _onExit() {
        this.props.cleardata();
        this.props.screenProps.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: Constant.VM_LOGIN_SCREEN_S })]
            })
        )
    }
    //SYNC AFTER EDETAILING
    _onUnSync() {
        clean_sync_all();
        // clean_sync_photo();
    }
    _onSync() {
        console.log("Sync")
        //Execute_Sync_Photo_Resulth(0);

    }
    //SYNC ALL
    _onSyncAll() {
        console.log("Sync ALL")
        //StartExecuteFIFO();
        //showwFIFO();
        //Execute_Sync_Photo_Resulth(0);
        //clean_sync_photo();
    }
    //SYNC AFTER INTERNET CONNECT
    _syncConnect() {
        const { isSync } = this.state;
        //this._countdownAutoSync();
        this.checkInterval = setInterval(() => {
            if (Constant.ONLINE == false && isSync == false) {
                TimerCheck += 1;
                //console.log(TimerCheck);
                if (TimerCheck == 60) {
                    this._trySync();
                }
            } else if (Constant.ONLINE == true && isSync == false) {
                this._trySync();
            }
        }, 1000);
    }
    _trySync() {
        const { isSync } = this.state;
        if (Constant.ONLINE == true && isSync == false) {
            this.setState({ isSync: true }, () => {
                console.log("sync start ");
                StartExecuteFIFO();
                //callToast("sync..");
                TimerCheck = 0;
                clearInterval(this.checkInterval);
                this._syncDisonnect();
            });
        } else {
            TimerCheck = 0;
            callToast("sync failed");
        }
    }
    /*
        else
    */
    //SYNC AFTER if INTERNET DISCONNECT
    _syncDisonnect() {
        const { isSync } = this.state;
        this.checkDisonnect = setInterval(() => {
            if (Constant.ONLINE == false) {
                TimerCheck = 0;
                this.setState({ isSync: false });
                clearInterval(this.checkDisonnect);
                callToast("sync off ");
                this._syncConnect();
            }
        }, 1000);
    }
    //Auto SYNC
    _countdownAutoSync() {
        if (this.callSyncCountdown) {
            clearTimeout(this.callSyncCountdown);
        }

        this.callRefreshCountdown = setTimeout(() => {
            callToast("Sync..")
            //StartExecuteFIFO();
            clearTimeout(this.callSyncCountdown);
            this._countdownAutoSync();
        }, Constant.TIME_OUT_REFRESH);
    }
    ////////////////////////////////////////////////REST API
    /***
     * 
     */


    //ABsen
    _sendAttendSchedule(st12, isExpired = false) {

        let dateCall = getDateNumberAttend(Date.now(), "YYYY-MM-DD HH:mm:ss");
        //callToast("ATTEND : "+dateCall);
        //return;
        let _data = null;
        if (st12 == 'in') {
            _data = {
                user_id: user.getUsId(),
                attend: {
                    in: dateCall,
                    out: ""
                },
                status: st12,
                date_check: dateCall
            }

        }
        if (st12 == 'out' && isExpired == false) {
            _data = {
                user_id: user.getUsId(),
                attend: {
                    in: user.getUserAttend().in,
                    out: dateCall
                },
                status: st12,
                date_check: dateCall
            }
        }


        if (isExpired == true) {
            let datenow = user.getUserAttend().in;
            let tempIn = getDateNumberAttend(datenow, "YYYY-MM-DD");
            dateCall = tempIn + " 23:59:00";
            _data = {
                user_id: user.getUsId(),
                attend: {
                    in: user.getUserAttend().in,
                    out: dateCall
                },
                date_check: dateCall
            }
        }

        saveAttenToCore(_data.attend);//SAVE ATTEND TO CORE DATA

        this.setState({
            //isLoading: true
        });
        if (isExpired == false) {
            let data = new FormData();
            data.append("user_id", user.getUsId());
            data.append("status", st12);
            data.append("date", dateCall);
            console.log("FINISH ", data);
            that.onOffAttend(_data, st12, false, isExpired);
            try {

                sendAttend(data).then((res) => {
                    console.log('resulth attend', res);
                    if (res) {
                        if (res.api_message == 'success') {
                            // that.onOffAttend(_data, st12, false, isExpired);
                        } else {
                            that.onOffAttend(_data, st12, true, isExpired);
                        }
                    } else {
                        that.onOffAttend(_data, st12, true, isExpired);
                    }

                }
                );
            } catch (error) {
                console.log("onOffAttend", error)
                that.onOffAttend(_data, st12, true, isExpired);
            }
        } else if (isExpired == true) {
            let data = new FormData();
            data.append("user_id", user.getUsId());
            data.append("in", user.getUserAttend().in);
            data.append("out", dateCall);
            //data.append("date", dateCall);
            that.onOffAttendSYNC(_data, st12, false, isExpired);
            try {
                sendAttend_SYN(data).then((res) => {
                    console.log('resulth attend', res);
                    if (res) {
                        if (res.api_message == 'success') {
                            //that.onOffAttendSYNC(_data, st12, false, isExpired);
                        } else {
                            that.onOffAttendSYNC(_data, st12, true, isExpired);
                        }
                    } else {
                        that.onOffAttendSYNC(_data, st12, true, isExpired);
                    }
                }
                );
            } catch (error) {
                console.log("sendAttend_SYN", error)
                that.onOffAttendSYNC(_data, st12, true, isExpired);
            }
        }





    }
    //ATTEND OFFLINE
    //SIgnal init
    //request
    async _sendSignal(datas) {
        let data = new FormData();
        data.append("user_id", user.getUsId());
        data.append("player_id", datas.userId);

        this.setState({
            //isLoading: true
        });
        try {
            return result = await initSignal(data).then((res) => {
                console.log('resulth schedule', res);

                if (res) {
                    if (res.api_message == 'success') {
                        that.setState({ isLoading: false });
                        return res;
                    } else {
                        // callAlert("Failed", res.api_message);
                        that.setState({ isLoading: false });
                        return false;
                    }

                } else {
                    //callAlert("Failed", res);
                    that.setState({ isLoading: false });
                    return false;
                }

            }

            );
        } catch (error) {
            console.log(error);
            that.setState({ isLoading: false });
        }
    }
    //save/udate attend
    onOffAttend(_data, st12, _syncsave = false, isExpired) {
        console.log('save attend', _data)
        if (st12 == 'in') {
            if (_syncsave == true) {
                let jdata = {
                    type: KEYS.KEY_ATTEND,
                    data: _data
                }
                F_I_F_O_GLOBAL_LOC([jdata]);
            }
            updateUserAttend(_data);
            user.updateUserAttend(_data.attend);
            DATA_SCHEDULE.getDataSchedule().then(res => {
                console.log("onOffAttend", res)
                if (res) {
                    if (res.set_schedule.length > 0) {
                        user.updateStatusRole(Constant.ROLE_READYSTARTSCHEDULE);
                        // user.updateUserAttend(_data);
                        that.setState({ isLoading: false, ROLE: Constant.ROLE_READYSTARTSCHEDULE });
                    } else {
                        user.updateStatusRole(Constant.ROLE_INSELECTSCHEDULE);
                        // user.updateUserAttend(_data);
                        that.setState({ isLoading: false, ROLE: Constant.ROLE_INSELECTSCHEDULE });
                    }
                }
            })
            /*SYNCLoc(KEYS.KEY_G,KEYS.KEY_SCHEDULE).then(res=>{
                console.log("onOffAttend",res)
                if(res && res[0]){
                    if (res[0].set_schedule.length>0){
                        user.updateStatusRole(Constant.ROLE_READYSTARTSCHEDULE);
                        // user.updateUserAttend(_data);
                        that.setState({ isLoading: false, ROLE: Constant.ROLE_READYSTARTSCHEDULE });
                    }else{
                        user.updateStatusRole(Constant.ROLE_INSELECTSCHEDULE);
                        // user.updateUserAttend(_data);
                        that.setState({ isLoading: false, ROLE: Constant.ROLE_INSELECTSCHEDULE });
                    }
                }
            })*/

        } else if (st12 == 'out') {
            if (isExpired == false) {
                if (_syncsave == true) {
                    let jdata = {
                        type: KEYS.KEY_ATTEND,
                        data: _data
                    }
                    F_I_F_O_GLOBAL_LOC([jdata]);
                }
                updateUserAttend(_data)
                user.updateUserAttend(_data.attend);
                user.updateStatusRole(Constant.ROLE_FINISHTODAY);
                console.log(user.getUserAttend())
                this.setState({ isLoading: false, ROLE: Constant.ROLE_FINISHTODAY });
            } else if (isExpired == true) {
                console.log("Create New")

                if (_syncsave == true) {
                    let jdata = {
                        type: KEYS.KEY_ATTEND_RESET,
                        data: _data
                    }
                    F_I_F_O_GLOBAL_LOC([jdata]);

                    this._onResetSessionUser();
                } else {
                    _sendAtten(_data);
                    this._onResetSessionUser();
                }

                //user.updateStatusRole(Constant.ROLE_INLOGIN);
                //this.setState({ isLoading: false, ROLE: Constant.ROLE_INLOGIN });
            }

        }

    }
    onOffAttendSYNC(_data, st12, _syncsave = false, isExpired) {
        console.log('save expiret attend', _data)
        console.log('save expiret attend save sync', _syncsave)
        user.updateUserAttend(_data.attend);

        console.log("Create New")

        if (_syncsave == true) {
            let jdata = {
                type: KEYS.KEY_ATTEND_RESET,
                data: _data
            }
            //F_I_F_O_GLOBAL_LOC([jdata]);
        }
        this._onResetSessionUser();
    }
    //RESET SESSION
    _onResetSessionUser() {

        console.log("NEW SESSION");
        let dateCall = formateFullDateNumber(Date.now(), "YYYY-MM-DD HH:mm:ss");
        let _data = {
            user_id: user.getUsId(),
            attend: {
                in: "",
                out: ""
            },
            date_check: dateCall
        }
        updateUserAttend(_data);
        clean_sync_session().then(res => {
            if (res) {
                console.log(res);
            }
        }).then(res => {
            callAlert(Constant.NAME_APPS, "Your last plan is done,let's Start Today Plan.")
            Global_resetShceduleSession(that._getreqSchedule2.bind(that));
            let limit = setTimeout(() => {
                user.updateStatusRole(Constant.ROLE_INLOGIN);
                user.updateSelectSchedule([]);
                that.setState({ isLoading: false, ROLE: Constant.ROLE_INLOGIN });
                clearTimeout(limit);
            }, 1000);
        });


    }
    _testNewDay() {
        // Global_resetShceduleSession(this._getreqSchedule2.bind(this));
    }
    //change
    //request unset
    async _sendChange(datas) {
        let data = new FormData();
        data.append("email", user.getUserEmail());
        data.append("old_password", datas.old);
        data.append("new_password", datas.new);

        this.setState({
            isLoading: true
        });
        try {
            return result = await sendPass(data).then((res) => {
                console.log('resulth schedule', res);

                if (res) {
                    if (res.api_message == 'success') {
                        that.setState({ isLoading: false });
                        //callAlert(Constant.NAME_APPS, res.api_message);
                        return res;
                    } else {
                        //callAlert("Failed", res.api_message);
                        that.setState({ isLoading: false });
                        return false;

                    }

                } else {
                    //callAlert("Failed", res);
                    that.setState({ isLoading: false });
                    return false;

                }

            }

            );
        } catch (error) {
            console.log(error)
        }
    }
    //request unset
    async _getUnsetSchedule() {
        this.setState({
            isLoading: true
        });
        try {
            /*return result = await DATA_SCHEDULE.getDataVisitSchedule().then(res => {
                console.log("schedule", res);
                let data = res;
                let resids = getDokterIdTabBySetSchedule(data.set_schedule) //getDokterIdTab(data.list_doctor_set_today);
                let ids = [];
                let temp2 = data.visit_schedule;
                let _result = null;
                return LEMARI_GLOBAL_LOAD(KEYS.KEY_SELECTTARGET).then((res_ids) => {

                    let fromids = null;

                    console.log('ids res', resids)
                    console.log('ids', res_ids)
                    //  if (res_ids) {
                    //    fromids = resids.length > res_ids[0].datas.length ? resids : res_ids[0].datas;
                    //} else {
                    fromids = resids;
                    //}
                    let setUnVisitToday = getListUnTarget(temp2, fromids);
                    console.log('ids done', fromids)
                    console.log('setUnVisitToday', setUnVisitToday)
                    _result = [];
                    setUnVisitToday.map((resHospital, index) => {
                        if (resHospital.doctors.length > 0) {
                            _result.push(resHospital);
                        }
                    })
                    getMonthSchedulerDoktor()

                    console.log('untarget', _result)
                    let setVisitMonthAfterReduce = _result//reduceWithMetSchedule(data.list_doctor_set_this_month, _result);
                    that.setState({ isLoading: false });
                    return setVisitMonthAfterReduce;
                })
            })*/
            return await SYNCLoc_CORE_GET().then(res => {
                console.log("_getUnsetSchedule schedule", res);
                let data = null;
                if (res == null || res == undefined) {
                    return callToast("Local Data Not found")
                }
                //if (res[0]) data = res[0];
                //else if(res) data = res;
                //data = Object.assign({},res);
                console.log("_getUnsetSchedule data", res);
                let resids = getDokterIdTabBySetSchedule(res.set_schedule) //getDokterIdTab(data.list_doctor_set_today);
                let ids = [];
                //let temp2 = Object.assign({},data.visit_schedule);
                let _result = null;
                return LEMARI_GLOBAL_LOAD(KEYS.KEY_SELECTTARGET).then((res_ids) => {

                    let fromids = null;

                    console.log('ids res', resids)
                    console.log('ids', res_ids)
                    //console.log('temp2', temp2)
                    //  if (res_ids) {
                    //    fromids = resids.length > res_ids[0].datas.length ? resids : res_ids[0].datas;
                    //} else {
                    fromids = resids;
                    //}
                    let setUnVisitToday = getListUnTarget(res.visit_schedule, fromids);
                    console.log('ids done', fromids)
                    console.log('setUnVisitToday', setUnVisitToday)
                    _result = [];
                    setUnVisitToday.map((resHospital, index) => {
                        if (resHospital.doctors.length > 0) {
                            _result.push(resHospital);
                        }
                    })
                    getMonthSchedulerDoktor()

                    console.log('untarget', _result)
                    let setVisitMonthAfterReduce = _result//reduceWithMetSchedule(data.list_doctor_set_this_month, _result);
                    that.setState({ isLoading: false });
                    return setVisitMonthAfterReduce;
                })

            })
        } catch (error) {
            console.log(error)
        }
    }

    //REQUEST VISIT
    _getreqSchedule2(_proccess = true) {
        if (this.props.scheduleData) {
            let data = this.props.scheduleData;
            if (data) {
                let resids = getDokterIdTab(data.list_doctor_set_today);
                let ids = [];
                let tempset = data.set_schedule.slice(0);
                let temp2 = data.visit_schedule.slice(0)
                let _result = null;
                let set_schedule_rebuild = rebuildSchedule(tempset);

                return LEMARI_GLOBAL_LOAD(KEYS.KEY_SELECTTARGET).then((res_ids) => {
                    //SET IS SELECT FROM LIST_SET_DOCTOR_TODAY
                    let fromids = null;

                    console.log('ids res', resids)
                    console.log('ids', res_ids)
                    if (res_ids) {
                        let expired = getIfYesterday(getDateNumber(res_ids[0].date, "YYYY-MM-DD"), getDateNumber(Date.now(), "YYYY-MM-DD"))
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
                    console.log('fromid', fromids)
                    let setVisitMonth = rebuildSchedule(temp2);
                    const setVisitToday = getListTargetBK(setVisitMonth, fromids);
                    //let setVisitMonthAfterReduce = reduceWithMetSchedule(data.list_doctor_set_this_month,setVisitMonth);

                    console.log("today", setVisitToday);
                    console.log("today is", set_schedule_rebuild);
                    //console.log("month", setVisitMonth);
                    that.setState({
                        dataschedule: setVisitMonth,
                        selectToday: data.list_doctor_set_today,
                        selectschedule: set_schedule_rebuild,
                        complete_yesterday: data.list_doctor_set_this_month,

                    }, () => {
                        if (_proccess == true) {
                            that.onProcessSchdedule()
                        }
                    });

                    console.log('user', this.state.ROLE);
                    let _data = {
                        visit_schedule: setVisitMonth,
                        set_schedule: fromids.length > 0 ? setVisitToday : tempset
                    };
                    //console.log('set', _data);

                    //if(this.state.ROLE == Constant.ROLE_READYSTARTSCHEDULE){
                    let listDoktor = [];
                    GetAllDocter(listDoktor).then(() => {
                        console.log("list FIND DETAIL DOKTER", listDoktor);
                        that.setState({
                            complete: listDoktor
                        }, () => that.initDoktor(listDoktor, 0))

                    })
                    //}


                    console.log("_getreqSchedule2=============================DONE=====================================")
                    return _data;
                })
            } else {
                that.onPressLogoutBurgerMenu("Data Not Found,Please login again.")
            }
        }
        // return DATA_SCHEDULE.getDataSchedule().then(res => {
        //     console.log("_getreqSchedule2====================================================================")
        //     console.log("res _getreqSchedule2", res);
        //     if (res == undefined) {
        //         return;
        //     }
        //     let data = null;

        //     if (res[0]) {
        //         data = res[0]
        //     } else {
        //         data = res;
        //     }


        //     if (data) {
        //         let resids = getDokterIdTab(data.list_doctor_set_today);
        //         let ids = [];
        //         let tempset = data.set_schedule.slice(0);
        //         let temp2 = data.visit_schedule.slice(0)
        //         let _result = null;
        //         let set_schedule_rebuild = rebuildSchedule(tempset);

        //         return LEMARI_GLOBAL_LOAD(KEYS.KEY_SELECTTARGET).then((res_ids) => {
        //             //SET IS SELECT FROM LIST_SET_DOCTOR_TODAY
        //             let fromids = null;

        //             console.log('ids res', resids)
        //             console.log('ids', res_ids)
        //             if (res_ids) {
        //                 let expired = getIfYesterday(getDateNumber(res_ids[0].date, "YYYY-MM-DD"), getDateNumber(Date.now(), "YYYY-MM-DD"))
        //                 if (!expired) {
        //                     fromids = resids.length > res_ids[0].datas.length ? resids : res_ids[0].datas;
        //                     //callToast("fromid" + fromids.length);
        //                 } else {
        //                     fromids = [];
        //                     //callToast("fromid" + fromids.length);
        //                 }

        //             } else {
        //                 fromids = resids;
        //             }
        //             console.log('fromid', fromids)
        //             let setVisitMonth = rebuildSchedule(temp2);
        //             const setVisitToday = getListTargetBK(setVisitMonth, fromids);
        //             //let setVisitMonthAfterReduce = reduceWithMetSchedule(data.list_doctor_set_this_month,setVisitMonth);

        //             console.log("today", setVisitToday);
        //             console.log("today is", set_schedule_rebuild);
        //             //console.log("month", setVisitMonth);
        //             that.setState({
        //                 dataschedule: setVisitMonth,
        //                 selectToday: data.list_doctor_set_today,
        //                 selectschedule: set_schedule_rebuild,
        //                 complete_yesterday: data.list_doctor_set_this_month,

        //             }, () => {
        //                 if (_proccess == true) {
        //                     that.onProcessSchdedule()
        //                 }
        //             });

        //             console.log('user', this.state.ROLE);
        //             let _data = {
        //                 visit_schedule: setVisitMonth,
        //                 set_schedule: fromids.length > 0 ? setVisitToday : tempset
        //             };
        //             //console.log('set', _data);

        //             //if(this.state.ROLE == Constant.ROLE_READYSTARTSCHEDULE){
        //             let listDoktor = [];
        //             GetAllDocter(listDoktor).then(() => {
        //                 console.log("list FIND DETAIL DOKTER", listDoktor);
        //                 that.setState({
        //                     complete: listDoktor
        //                 }, () => that.initDoktor(listDoktor, 0))

        //             })
        //             //}


        //             console.log("_getreqSchedule2=============================DONE=====================================")
        //             return _data;
        //         })
        //     } else {
        //         that.onPressLogoutBurgerMenu("Data Not Found,Please login again.")
        //     }
        // })


    }
    //BK
    /*_getreqSchedule2_BK(_proccess = true){

            return SYNCLoc(KEYS.KEY_G,KEYS.KEY_SCHEDULE).then(res => {
                console.log("_getreqSchedule2====================================================================")
                console.log("res _getreqSchedule2", res);
               
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
                            let expired = getIfYesterday(getDateNumber(res_ids[0].date, "YYYY-MM-DD"), getDateNumber(Date.now(), "YYYY-MM-DD"))
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
                        let temp2 = data.visit_schedule.slice(0)

                        console.log('fromid', fromids)
                        let setVisitMonth = rebuildSchedule(temp2);
                        const setVisitToday = getListTargetBK(setVisitMonth, fromids);
                        //let setVisitMonthAfterReduce = reduceWithMetSchedule(data.list_doctor_set_this_month,setVisitMonth);
                        
                        console.log("today", setVisitToday);
                        console.log("today is", set_schedule_rebuild);
                        console.log("month", setVisitMonth);
                        that.setState({
                            dataschedule: setVisitMonth,
                            selectToday: data.list_doctor_set_today,
                            selectschedule: set_schedule_rebuild,//setVisitToday,
                            //complete: data.list_doctor_visit_this_month,
                            complete_yesterday: data.list_doctor_set_this_month,
                            //isLoading: false
                        }, () => {
                            if (_proccess == true) {
                                that.onProcessSchdedule()
                            }
                        });

                        console.log('user', this.state.ROLE);
                        let _data = {
                            visit_schedule: setVisitMonth,
                            set_schedule: fromids.length > 0 ? setVisitToday : tempset
                        };
                        //console.log('set', _data);
                      
                        //if(this.state.ROLE == Constant.ROLE_READYSTARTSCHEDULE){
                            let listDoktor = [];
                            GetAllDocter(listDoktor).then(() => {
                                console.log("list FIND DETAIL DOKTER" ,listDoktor);
                                that.setState({
                                    complete: listDoktor
                                },()=>that.initDoktor(listDoktor, 0))
                                
                            })
                        //}
                       
                        
                        console.log("_getreqSchedule2=============================DONE=====================================")
                        return _data;
                    })
                }


            })
       
        
    }*/
    //request visit
    /* async _getreqSchedule() {
         const{ isFirstLoad } = this.state;
 
         console.log('req schedule')
         let data = new FormData();
         data.append("user_id", user.getUsId());
 
         this.setState({
             //isLoading: true
         });
         try {
             if (isFirstLoad == false) {
                 return that._loadOffSchedule();
             } else {
             return result = await reqSchedule(data).then((res) => {
                 console.log('VISIT API RESULTH', res);
 
                 if (res != undefined) {
                    //console.log('req schedule', res);
                     if (res.api_message == 'success') {
                         
                             let tempres = Object.assign({},res);
                         tempres.dateCreate = getDateNumber(Date.now(), "YYYY-MM-DD")
                             SYNCLoc(KEYS.KEY_D,KEYS.KEY_SCHEDULE);
                             LEMARI_GLOBAL_LOC([tempres], KEYS.KEY_SCHEDULE);
                             //let completeids = getDokterIdTab(res.list_doctor_visit_this_month)
                             let ids = getDokterIdTab(res.list_doctor_set_today);
                             let temp = res.visit_schedule.slice(0)
                             let tempset = res.set_schedule.slice(0)
 
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
                                 console.log('off select', resSelect)
                                 if(!resSelect){
                                     that._saveSelectSchedule(res.list_doctor_set_today)
                                 };
                             })
                             that.setState({
                                 dataschedule: setVisitMonth,
                                 selectToday: res.list_doctor_set_today,
                                 selectschedule: set_schedule_rebuild,
                                 //complete: res.list_doctor_visit_this_month,
                                 complete_yesterday: res.list_doctor_set_this_month,
                                 isFirstLoad:false,
                                // isLoading: false
                             }, () => that.onProcessSchdedule())
                             let tempids = getIDSAsync();
 
                             console.log('tempid', tempids);
 
                             let _data = {
                                 visit_schedule: setVisitMonth,
                                 set_schedule: res.set_schedule
                             }
 
                             //that.initDoktor();
                             return _data;
                             
                         
                         
                     } else {
                         return that._loadOffSchedule();
                     }
 
                 } else {
                     return that._loadOffSchedule();
                 }
 
             }
 
             );
         }
         } catch (error) {
             console.log(error)
             
             return that._loadOffSchedule();
         }
     }*/

    async _loadOffSchedule() {

        //that.initDoktor();
        return result = await DATA_SCHEDULE.getDataSchedule().then((res) => {
            console.log("res schedule", res);
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
                    TargetSelect().then(resSelect => {
                        console.log('off select', resSelect)
                        if (!resSelect) {
                            that._saveSelectSchedule(data.list_doctor_set_today)
                        };
                    })
                    that.setState({
                        dataschedule: setVisitMonth,
                        selectToday: data.list_doctor_set_today,
                        selectschedule: setVisitToday,
                        //complete: data.list_doctor_visit_this_month,
                        complete_yesterday: data.list_doctor_set_this_month,
                        isLoading: false
                    }, () => that.onProcessSchdedule())

                    console.log('user', this.state.ROLE);
                    let _data = {
                        visit_schedule: setVisitMonth,
                        set_schedule: fromids.length > 0 ? setVisitToday : tempset
                    };
                    // console.log('set', _data)
                    return _data
                    //return _result;
                })
            }

        })
        /*return result = await LEMARI_GLOBAL_LOAD(KEYS.KEY_SCHEDULE).then((res) => {
            console.log("res schedule", res);
            let data = res[0];
            if(res[0].length==1){
                data = data[0];
            }
            if (data){
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
                    TargetSelect().then(resSelect => {
                        console.log('off select', resSelect)
                        if (!resSelect) {
                            that._saveSelectSchedule(data.list_doctor_set_today)
                        };
                    })
                    that.setState({
                        dataschedule: setVisitMonth,
                        selectToday: data.list_doctor_set_today,
                        selectschedule: setVisitToday,
                        //complete: data.list_doctor_visit_this_month,
                        complete_yesterday: data.list_doctor_set_this_month,
                        isLoading: false
                    }, () => that.onProcessSchdedule())

                    console.log('user', this.state.ROLE);
                    let _data = {
                        visit_schedule: setVisitMonth,
                        set_schedule: fromids.length > 0 ? setVisitToday : tempset
                    };
                   // console.log('set', _data)
                    return _data
                    //return _result;
                })
            }
            
        })*/
    }
    //SEND SELECT DOKTOR
    _reviewSelectDokter(data) {
        let _selectDokter = generateSelectDokter(data);

        console.log('_reviewSelectDokter dokter id ', _selectDokter);
        let rew = [];
        if (_selectDokter.length > 0) {
            _selectDokter.forEach((res) => {
                let id = { "doctors_ids": res, "date": formateFullDateNumber(Date.now(), "YYYY-MM-DD") }
                getDoctorById(id).then(resdoktor => {
                    console.log('review doktor', resdoktor);
                    rew.push(resdoktor);
                    that.setState({
                        listrev: rew
                    })
                })
            })
        }


    }
    async _sendSelectSchedule() {
        console.log('selec dokter ', schdeuleAToday);
        let _selectDokter = generateSelectDokter(schdeuleAToday);//find select dokter

        console.log('selec dokter id ', _selectDokter);
        //for api
        let data = new FormData();
        data.append("user_id", user.getUsId());
        let listSelect = []
        _selectDokter.map((item, index) => {
            data.append("doctors_ids[" + index + "]", item);
            listSelect.push({ "doctors_ids": item, "date": formateFullDateNumber(Date.now(), "YYYY-MM-DD") })
        })
        ///
        let _addMode = this.state.ROLE == Constant.ROLE_INSELECTSCHEDULE ? false : true;
        let _data = {
            user_id: user.getUsId(),
            datas: listSelect,
            date_select: formateFullDateNumber(Date.now(), "YYYY-MM-DD")
        }
        console.log("select dokter", listSelect);
        console.log("add mode", _addMode);
        this.setState({
            isLoading: true
        });
        //add to local cache
        //let updateselect = await GetListTodayPlan(listSelect);
        //return;
        LEMARI_GLOBAL_SELECT([_data], _addMode).then(res => {

            TargetSelect().then(resSelect => {
                console.log('off select', resSelect)
                that.setState({
                    selectschedule: resSelect
                }, () => {
                    SaveSendDoctor(resSelect).then(() => {
                        user.updateStatusRole(Constant.ROLE_READYSTARTSCHEDULE);
                        that.setState({
                            ROLE: Constant.ROLE_READYSTARTSCHEDULE,
                            isLoading: false
                        })
                    })
                });
                return resSelect;
            }).then(res => {
                console.log('send select doktor', data)

                try {
                    sendSchedule(data).then((res) => {
                        console.log('resulth select schedule', res);
                        if (res != undefined) {
                            console.log("res found")
                            if (res.api_message == 'success') {
                                SYNCLoc_CORE_GET().then(async resLocal => {
                                    let dataTodayUpdate = await UPDATE_SET_TODAY(res.list_doctor_set_today, resLocal.visit_schedule);//add visitable
                                    user.updateSelectSchedule(dataTodayUpdate);
                                    resLocal.set_schedule = resLocal.set_schedule;
                                    resLocal.list_doctor_set_today = dataTodayUpdate;
                                    console.log(resLocal);
                                    SYNCLoc_CORE_SET(resLocal).then(res => {
                                        console.log(res);
                                    })
                                });
                            } else {
                                if (res.api_message == "One of schedule date has already been set") {
                                    callToast(res.api_message)
                                } else {
                                    that._selectDokterComplete(_data, true);
                                }
                            }

                        } else {
                            //callToast("res select not found");
                            that._selectDokterComplete(_data, true);
                        }

                    })

                } catch (error) {
                    console.log('error select ', error.message)
                    that._selectDokterComplete(_data, true);
                    callToast('error select ', error.message);
                }
            })

        })


    }
    //IF EMPTY
    _saveSelectSchedule(_schdeuleAToday) {
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
    //ASYNC select dokter complete
    _selectDokterComplete(_data, _async = false) {
        if (_async == true) {
            let jdata = {
                type: KEYS.KEY_SELECTTARGET,
                data: _data
            }
            F_I_F_O_GLOBAL_LOC(jdata);
        }
        //user.updateStatusRole(Constant.ROLE_READYSTARTSCHEDULE);
        // this.setState({
        //ROLE: Constant.ROLE_READYSTARTSCHEDULE
        //})
    }
    //request logout
    async _log_out() {
        let data = new FormData();
        data.append("user_id", user.getUsId());

        this.setState({
            isLoading: true
        });
        try {
            return result = await logExitUser(data).then((res) => {
                console.log('logExitUser', res);

                if (res) {
                    if (res.api_message == 'success') {
                        return res;
                    } else {
                        callAlert("Failed", res.api_message);
                        that.setState({ isLoading: false });
                        return false;
                    }

                } else {
                    callAlert("Failed", res);
                    that.setState({ isLoading: false });
                    return false;
                }

            }

            );
        } catch (error) {
            console.log(error)
        }
    }
    //request reset pass
    async _resetPasss() {
        let data = new FormData();
        data.append("user_id", user.getUsId());

        this.setState({
            isLoading: true
        });
        try {
            return result = await sendPass(data).then((res) => {
                console.log('resulth schedule', res);

                if (res) {
                    if (res.api_message == 'success') {
                        return res;
                    } else {
                        callAlert("Failed", res.api_message);
                        that.setState({ isLoading: false });
                        return false;
                    }

                } else {
                    callAlert("Failed", res);
                    that.setState({ isLoading: false });
                    return false;
                }

            }

            );
        } catch (error) {
            console.log(error)
        }
    }
    //req notif list
    async _reqNotif() {
        //if(Constant.ONLINE==true){
        try {
            return result = await reqNotifList().then(res => {

                if (res != null || res != false) {
                    console.log("notif ", res)
                    LEMARI_GLOBAL_LOC(res, KEYS.KEY_NOTIF);
                    that.setState({
                        notifList: res.reverse()
                    }, () => that._setCountNotif())
                    //let resclone = res.slice(0);

                }
            });
        } catch (error) {
            LEMARI_GLOBAL_LOAD(KEYS.KEY_NOTIF).then(res => {
                if (res) {
                    that.setState({
                        notifList: res
                    }, () => that._setCountNotif())
                }

            });
        }


    }
    //History List
    async _reqHistory(date) {
        if (Constant.ONLINE == true) {
            let data = new FormData();
            data.append("cms_users_id", user.getUsId());
            data.append("setdate", date);
            try {
                return result = await getListLocation(data).then(res => {

                    if (res.api_message == 'success') {
                        if (res.data != null) {
                            that.setState({
                                historyList: res.data
                            })
                            LEMARI_GLOBAL_LOC([res.data], KEYS.KEY_HISTORY);
                        }
                    }
                    return res;
                })
            } catch (error) {
                callToast(error)
                LEMARI_GLOBAL_LOAD(KEYS.KEY_HISTORY).then(res => {
                    that.setState({
                        historyList: res[0]
                    });
                });
            }
        } else {
            LEMARI_GLOBAL_LOAD(KEYS.KEY_HISTORY).then(res => {
                that.setState({
                    historyList: res[0]
                });
            });
        }
    }
    //History List
    async _reqExpendses(date) {
        if (Constant.ONLINE == true) {
            let data = new FormData();
            data.append("cms_users_id", user.getUsId());

            try {
                return result = await getExpendsList(data).then(res => {

                    if (res.data != null) {
                        that.setState({ expensesList: res.data })
                        LEMARI_GLOBAL_LOC([res.data], KEYS.KEY_EXPENSES);
                    }
                    return res;
                })
            } catch (error) {
                callToast(error)
                LEMARI_GLOBAL_LOAD(KEYS.KEY_EXPENSES).then(res => {
                    that.setState({
                        expensesList: res[0]
                    });
                });
            }
        } else {
            LEMARI_GLOBAL_LOAD(KEYS.KEY_EXPENSES).then(res => {
                that.setState({
                    expensesList: res[0]
                });
            });
        }
    }
    //COUNT NOTIF
    _setCountNotif() {
        let tempCount = 0;
        this.state.notifList.forEach((data, index) => {
            //console.log(data)
            if (data.is_read == 0) {
                tempCount++;
            }
        })
        countNotif_int = tempCount;
        this.setState({
            countNotif: tempCount
        })
    }


    //REQ FILE
    async _reqfile() {
        try {
            grabFile(0);
        } catch (error) {
            console.log('grab file', error);
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////
    //REQ DETAILS DOKTOR
    initDoktor(_data, index = 0) {
        console.log(this.state.ROLE);
        if (this.state.ROLE != Constant.ROLE_READYSTARTSCHEDULE) {
            return;
        }
        //LEMARI_GLOBAL_DETAIL_DEL();
        // LEMARI_GLOBAL_LOAD(KEYS.KEY_SCHEDULE).then((res) => {
        //console.log('dokter schedule detail ', _data)
        if (index == 0) {
            callToast("Loading Detail Doctor")
            console.log("Loading Detail Doctor");
        }
        if (_data.length > 0) {
            let list = Object.assign([], _data);
            // console.log("check ",list[index]);
            if (list[index]) {
                LEMARI_GLOBAL_DETAIL_GET(list[index].id).then(result => {
                    //console.log("LEMARI_GLOBAL_DETAIL_GET ", result);
                    if (result) {
                        // console.log('found initDoktor', result);
                        that.initDoktor(_data, index + 1)
                    } else {
                        console.log('req dokter Detail')
                        that._doktorDetail(list[index].id, index);
                    }
                })
            }
        }
        //});
    }
    async _doktorDetail(id) {
        try {
            return resulth = await _getDoktorDetail(id).then(res => {

                if (res != false) {
                    // console.log("add detail dokter ", res);
                    LEMARI_GLOBAL_DETAIL([res]).then(() => {
                        that.completeDoktorDetail();
                    });
                } else {
                    callToast("Failed Get Detail DOckter")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    completeDoktorDetail() {
        const { complete } = this.state;
        LEMARI_GLOBAL_DETAIL_GET_ALL().then(res => {
            console.log("save detail ", res)
            console.log("all detail ", complete)
            if (res) {

                if (res.length < complete.length) {
                    that.initDoktor(complete, res.length);
                } else {
                    callToast("Detail Dokter Complete")
                }
                let completedata = Object.assign([], res);
                DokterManager.DOKTERLIST = completedata

            }
        })
    }
    /////////////////////////////////////////////////////////////////////////////
    //feedback update
    _sendFeedBack(txt) {
        const { feedbackForm, resulthFormDataForm } = this.state;
        console.log("send feedback ", txt)

        let dataform = new FormData();
        dataform.append("status", feedbackForm.status);
        dataform.append("cms_users_id", feedbackForm.cms_users_id);
        dataform.append("schedule_date", feedbackForm.schedule_date);
        dataform.append("doctors_id", feedbackForm.doctors_id);
        dataform.append("locations_id", feedbackForm.locations_id);
        dataform.append("signature", false);
        dataform.append("feedback", false);
        dataform.append("feedback_sales", txt);
        dataform.append("e_detailings_name", feedbackForm.e_detailings_name);
        dataform.append("json_result", null);
        console.log("feed", feedbackForm);
        let jdata = {
            status: feedbackForm.status,
            cms_users_id: feedbackForm.cms_users_id,
            doctors_id: feedbackForm.doctors_id,
            schedule_date: feedbackForm.schedule_date,
            signature: false,
            feedback: false,
            feedback_sales: txt,
            locations_id: feedbackForm.locations_id,
            e_detailings_name: null,
            json_result: null,
            photos: null,

        };
        let _data = {
            id: 0,
            type: KEYS.KEY_MEETDOCTOR_RESULTH,
            //date: datenow,
            data: jdata,
        }
        console.log("sendjdata", jdata);
        // return;
        LEMARI_GLOBAL_LOC([jdata], KEYS.KEY_MEETDOCTOR_COMPLETE, true);


        updateStatusDoktor(jdata).then(res => {

            console.log("updateStatusDoktor", res);
            if (res) {
                this._onFeedbackClose();

                this._getreqSchedule2().then(_res => {
                    try {
                        console.log("next");

                        _sendSubmitComplete(dataform).then(res => {
                            console.log("res _sendSubmitComplete", res);
                            if (res) {
                                //if (res.api_message = "success"){

                                that.setState({
                                    isLoading: false
                                })
                                // clearTimeout(startsend)


                                //that.onSavePhoto(res.schedules_id, _avaiable);
                                //toTopHome(PAGE_CONFIG.homeRoute, 'HomeView', { callBackRefresh: true });
                                //that._onFeedbackClose()
                            } else {
                                F_I_F_O_GLOBAL_LOC(_data);
                                //F_I_F_O_GLOBAL_LOC(_data);
                                //toTopHome(PAGE_CONFIG.homeRoute, 'HomeView', { callBackRefresh: true });
                                //that._onFeedbackClose()
                                that.setState({
                                    isLoading: false
                                })
                            }
                        });



                        let feedNavigate = setTimeout(() => {
                            toTopHome(PAGE_CONFIG.homeRoute, 'HomeView', { callBackRefresh: true });
                            clearTimeout(feedNavigate);
                        }, 1500);
                    } catch (e) {
                        console.log('e', e)
                        F_I_F_O_GLOBAL_LOC(_data);
                        that.setState({
                            isLoading: false
                        })
                        //  F_I_F_O_GLOBAL_LOC(_data);

                    }
                });
            }


        })



    }

}
//EdetailingViewModel
//hide tabbar
const tabbarVisible = (navigation) => {
    const { routeName } = navigation.state;

    tabBoolean = true;
    //  console.log('navi', navigation)
    if (routeName === Constant.TAB_SEDETAILING) {

        //if (navigation.state.params != undefined) {
        //if (navigation.state.params.isStart == true && Constant.START_PRESENT == true) {
        tabBoolean = false;
        // }else{
        // tabBoolean = true;
        // }

        // }

    }

    return tabBoolean;
};

/*
    History: {
            screen: (props) => <HistoryViewModel ref={expenseCore} {...props} />
        },
*/
//screen: (props) => <DoctorDetailViewModel {...props} />
/*  Expenses: {
screen: (props) => <ExpensesCore ref={expenseCore} {...props} />
        },
        ,
        */
const Tabs = createBottomTabNavigator(
    {
        'Schedule': {
            screen: (props) => <HomeCore {...props} />
        },


        'E-Detailing': {
            screen: (props) => <EdetailingCore {...props} />
        },
        Notification: {
            screen: (props) => <NotificationViewModel ref={expenseCore} {...props} />
        }

    },
    {
        initialRouteName: Constant.TAB_SCHEDULE,
        tabBarPosition: "bottom",
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: Constant.COLOR_GREEN2,
            inactiveTintColor: "#939393",
            indicatorStyle: {
                backgroundColor: Constant.COLOR_GREEN2,
                height: 5
            },
            showIcon: true,
            showLabel: true,
            style: {
                backgroundColor: "#FFF",
                height: convertHeight('14%'),

            },
            tabStyle: {
                height: convertHeight('14%'),
                //borderRightWidth: 0.5,
                //borderRightColor: "#939393"
            },
            labelStyle: {
                fontSize: convertWidth('1.5%'),
                marginBottom: convertHeight('1%')
            },
            iconStyle: {
                //paddingBottom: convertHeight('1%'),
                //paddingTop: convertHeight('1%')
            }
        },
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;


                let icons = null;
                if (routeName === Constant.TAB_SCHEDULE) {
                    icons = (
                        <Image
                            source={require("../../../assets/ASET/SCHEDULE.png")}
                            style={{ width: convertWidth(hIcon), height: convertHeight(hIcon) }}
                            resizeMode={'contain'}
                            tintColor={tintColor}
                        />
                    );
                } else if (routeName === Constant.TAB_NOTIF) {
                    icons = (
                        <View>

                            <Image
                                source={require("../../../assets/ASET/notification_icon.png")}
                                style={{ width: convertWidth(hIcon), height: convertHeight(hIcon) }}
                                resizeMode={'contain'}
                                tintColor={tintColor}
                            />
                            {countNotif_int > 0 &&
                                <View style={styles.badgebg_notif}>
                                    <Text style={styles.badgeText}>
                                        {countNotif_int}
                                    </Text>
                                </View>
                            }
                        </View>

                    );
                } else if (routeName === Constant.TAB_HISTORY) {
                    icons = (
                        <Image
                            source={require("../../../assets/ASET/History_icon.png")}
                            style={{ width: convertWidth(hIcon), height: convertHeight(hIcon) }}
                            resizeMode={'contain'}
                            tintColor={tintColor}
                        />
                    );
                } else if (routeName === Constant.TAB_SEDETAILING) {
                    //console.log("navi bottom",navigation)

                    icons = (
                        <Image
                            source={require("../../../assets/ASET/edetailing_icon.png")}
                            style={{ width: convertWidth(hIcon), height: convertHeight(hIcon) }}
                            resizeMode={'contain'}
                            tintColor={tintColor}
                        />
                    );
                } else if (routeName === Constant.TAB_EXPENSES) {
                    //console.log(routeName+" , "+focused)
                    icons = (

                        <Image
                            source={require("../../../assets/ASET/expenses_icon.png")}
                            style={{ width: convertWidth(hIcon), height: convertHeight(hIcon) }}
                            resizeMode={'contain'}
                            tintColor={tintColor}
                        />


                    );
                }
                return icons;
            },
            tabBarVisible: tabbarVisible(navigation),
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                console.log('onPress', navigation);
                defaultHandler();
            },
        })
    }
);
const TabContainer = createAppContainer(Tabs);
const styles = StyleSheet.create({
    badgebg_notif: {
        position: "absolute",
        width: convertWidth('3%'),
        height: convertWidth('3%'),
        backgroundColor: "#e50000",
        borderRadius: convertWidth('1.5%'),
        justifyContent: "center",
        alignItems: 'center',
        right: 0,
        top: -(convertHeight('1%'))
        //right: convertWidth('1%'), bottom: convertHeight('1%')
    },
    badgebg_msg: {
        position: "absolute",
        width: 20,
        height: 20,
        backgroundColor: "#e50000",
        borderRadius: 100,
        justifyContent: "center",
        left: '40%',
        bottom: '7%'
    },
    tabbtnstyle: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#000"
    },
    badgeText: {
        //alignSelf: "center",
        fontSize: convertWidth('1.4%'),
        color: "#fff"
    }
});


function mapStateToProps(state) {
    return {
        isFirst: state.firstopen,
        userData: state.userData,
        scheduleData: state.scheduleData
    };
}
function dispatchToProps(dispatch) {
    return {
        cleardata: () =>
            dispatch({ type: ACTION_TYPE.CLEAR_DATA })
    };
}
export default connect(
    mapStateToProps,
    dispatchToProps,
)(TabController);