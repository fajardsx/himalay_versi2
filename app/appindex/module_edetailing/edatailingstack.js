import React, { Component } from 'react';
import { BackHandler } from "react-native";
import { TabNavigator, createStackNavigator, withNavigationFocus, createAppContainer } from "react-navigation";
import { _handleAppStateChange } from '../../global/Global';

import DoctorDetailViewModel from '../module_doctordetail';
import EdetailingViewModel from '.';
import EdetailingPage1 from './page1';
import Constant from '../../global/Constant';
import { onBackDashBoard, onMainMenu, goBackEdetailing, onComplete} from '../../pagemanager/Module_pagemanager';

//screen

class EdetailingCore extends React.Component {
    static navigationOptions = {
        tabBarVisible: false,
    }
    constructor(props) {
        super(props)
        console.log('edetailing',props)
    }
    fromParent() {
        console.log("FROM PARENT")
    }
    componentDidMount() {
        this.props.screenProps._callCloseBurger();
        //initRouter(this.props.navigation);
        //AppState.addEventListener("change", _handleAppStateChange);
        // console.log('homepage',this.homep);
    }
    componentWillReceiveProps(prevstate){
        console.log('EdetailingCore prev', prevstate)
        
    }
    componentDidUpdate = (prevProps) => {
      if(prevProps.isFocused != this.props.isFocused){
          console.log('EdetailingCore fokus ', this.props)
          if(this.props.isFocused == true){
              this.props.screenProps._callCloseBurger();
              if(Constant.START_PRESENT == true){
                  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
              }else{
                  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
              }
          }
      }
    }
    handleBackButton = () => {
       this.resetThis();
        return true;
    }
    resetThis(){
        Constant.START_PRESENT = false;
        onComplete(this.props.navigation,{routeName:'Schedule'})
    }
    render() {
        return <AppEdetailingContainer ref={(refs) => { this.homecore = refs }} screenProps={{
            navigation: this.props.navigation,
            _callPopStart: this.props.screenProps._callPopStart.bind(this),
            _callPopBurger: this.props.screenProps._callPopBurger.bind(this),
            _saveSchedule: this.props.screenProps._saveSchedule.bind(this),
            _reqSchedule: this.props.screenProps._reqSchedule.bind(this),
            // _getSchedule:this.props.screenProps._getSchedule.bind(this),
            _unsetSchedule: this.props.screenProps._unsetSchedule.bind(this),
            _dataschedule: this.props.screenProps._dataschedule,
            _selectschedule: this.props.screenProps._selectschedule
        }}>

        </AppEdetailingContainer>;
    }
}

export default withNavigationFocus(EdetailingCore);

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