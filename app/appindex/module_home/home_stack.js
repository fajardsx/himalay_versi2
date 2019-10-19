import React, { Component } from 'react';
import { AppState } from "react-native";
import { TabNavigator, createStackNavigator, View, createAppContainer,withNavigation } from "react-navigation";
import { _handleAppStateChange } from '../../global/Global';
import HomeViewModel from './home_viewmodel';
import DoctorDetailViewModel from '../module_doctordetail';
import EdetailingPage1 from '../module_edetailing/page1';
import AboutUsScreen from '../module_burger/module_aboutus';
import PAGE_CONFIG, { toTopHome, onBackDashBoard2, onComplete} from '../../pagemanager/Module_pagemanager';

//screen

 class HomeCore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          isLoading: false
        };
    }
    fromParent(){
        console.log("FROM PARENT")
    }
    componentDidMount() {
      //  PAGE_CONFIG.homeRoute = this.props.navigation;
        this.props.screenProps._callCloseBurger();
       // console.log(this.props);
        this.focuslistener = this.props.navigation.addListener("didFocus",()=>{
            console.log("home stack focus")
            let _callBackRefresh = this.props.navigation.getParam("callBackRefresh", false);
            console.log(_callBackRefresh);
            this.props.screenProps._callCloseBurger();
            if (_callBackRefresh == true) {
              //REQ SYNC
                console.log("REQ SYNC");
               // this.props.screenProps._resync();
               toTopHome(PAGE_CONFIG.homeRoute,'HomeView', { callBackRefresh: true});
                //console.log("to home");
            }
            
        })
        
        //console.log('home stack',this.refs);
        //initRouter(this.props.navigation);
        //AppState.addEventListener("change", _handleAppStateChange);
       // console.log('homepage',this.homep);
    }
    componentWillUnmount() {
       // AppState.addEventListener("change", _handleAppStateChange);
        this.focuslistener.remove();
    }
    componentWillReceiveProps(){
       // console.log(this.props);
    }
    _startPresent(_params){
        console.log(this.props.screenProps)
        console.log(_params);
       // this.props.screenProps.navigation.navigate("EdetailingScreen",params);
        onComplete(this.props.screenProps.navigation, {
          routeName: "EdetailingScreen",
          params: _params
        });
    }
    render() {
        return <AppHomeContainer ref='homecore' screenProps={{
                        navigation: this.props.navigation,
                        start_press:this._startPresent.bind(this),
                        _callPopStart: this.props.screenProps._callPopStart.bind(this),
                        _callPopFeedback: this.props.screenProps._callPopFeedback.bind(this),
                        _callPopBurger: this.props.screenProps._callPopBurger.bind(this),
                         _saveSchedule:this.props.screenProps._saveSchedule.bind(this),
                         _reqSchedule:this.props.screenProps._reqSchedule.bind(this),
                         _reqNotif:this.props.screenProps._reqNotif.bind(this),
                         _reqHistory:this.props.screenProps._reqHistory.bind(this),
                         _reqExpendses:this.props.screenProps._reqExpendses.bind(this),
                        // _getSchedule:this.props.screenProps._getSchedule.bind(this),
                         _unsetSchedule:this.props.screenProps._unsetSchedule.bind(this),
                         _updateReviewSchedule:this.props.screenProps._updateReviewSchedule.bind(this),
                        _dataschedule: this.props.screenProps._dataschedule,
                        _selectschedule: this.props.screenProps._selectschedule,
                        _rootloading: this.state.isLoading,
                        _onUpdateRole: this.props.screenProps._onUpdateRole.bind(this),
                        _onOpenList: this.props.screenProps._onOpenList.bind(this),
                        _role: this.props.screenProps._role,
                        _initapps: this.props.screenProps._initapps,
                    }}>

        </AppHomeContainer>;
    }
}

//CORE CONTROLLER
const AppCoreController = createStackNavigator(
    {
        HomeView: {
            screen: (props)=><HomeViewModel   {...props} />
        },
        DokterDetailView: {
            screen: DoctorDetailViewModel
        }

    },
    {
        initialRouteName: "HomeView",
        headerMode:'none'
    }
);

const AppHomeContainer = createAppContainer(AppCoreController);

export default withNavigation(HomeCore);