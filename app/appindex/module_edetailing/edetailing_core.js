import React, { Component } from 'react';
import { BackHandler, StatusBar } from "react-native";
import { TabNavigator, createStackNavigator, View, createAppContainer } from "react-navigation";
import { _handleAppStateChange } from '../../global/Global';

import DoctorDetailViewModel from '../module_doctordetail';
import EdetailingViewModel from '.';
import EdetailingPage1 from './page1';
import Constant from '../../global/Constant';
import { onComplete, onBackDashBoard } from '../../pagemanager/Module_pagemanager';
import PopGreetingViewModel from '../../appcomponent/module_popup/popup_greeting';

//screen e detaling after click start

export default class EdetailingCorePage extends React.Component {
    static navigationOptions = {
        tabBarVisible: false,
    }
    constructor(props) {
        super(props)
        console.log('edetailing', props)
    }
    fromParent() {
        console.log("FROM PARENT")
    }
    componentDidMount() {
       
        //initRouter(this.props.navigation);
        //AppState.addEventListener("change", _handleAppStateChange);
        // console.log('homepage',this.homep);
    }
    componentWillReceiveProps(prevstate) {
        console.log('EdetailingCore update', prevstate)
    }
    componentWillUnmount() {
        // AppState.addEventListener("change", _handleAppStateChange);
       
    }
   
    render() {
        return<AppEdetailingContainer ref={(refs) => { this.homecore = refs }} screenProps={{
                navigation: this.props.navigation,
            }}>

            </AppEdetailingContainer>;
    }
}

//CORE CONTROLLER
const EdetailingCoreController = createStackNavigator(
    {
        HomeEdetailView: {
            screen: EdetailingViewModel,

        },
        DokterDetailView: {
            screen: (props) => <DoctorDetailViewModel   {...props} />
        },
        Page1iDetailing: {
            screen: EdetailingPage1
        },
    },
    {
        initialRouteName: "HomeEdetailView",
        headerMode: 'none'
    }
);

const AppEdetailingContainer = createAppContainer(EdetailingCoreController);