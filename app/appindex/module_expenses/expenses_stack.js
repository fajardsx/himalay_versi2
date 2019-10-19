import React, { Component } from 'react';
import { AppState } from "react-native";
import { TabNavigator, createStackNavigator, View, createAppContainer } from "react-navigation";
import { _handleAppStateChange } from '../../global/Global';
//screen
//import HomeViewModel from "./module_home/home_viewmodel";
import ExpensesViewModel from './';
import ExpensesFormViewModel from './module_expenses_form';

export default class ExpensesCore extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //initRouter(this.props.navigation);
        //AppState.addEventListener("change", _handleAppStateChange);

    }
    componentWillUnmount() {
       // AppState.addEventListener("change", _handleAppStateChange);

    }

    render() {
        return <AppContainer ref={(refs) => { this.homecore = refs }} screenProps={{
            navigation: this.props.navigation,
            _callPopStart: this.props.screenProps._callPopStart.bind(this),
            _callPopBurger: this.props.screenProps._callPopBurger.bind(this),
            _saveSchedule: this.props.screenProps._saveSchedule.bind(this),
            _reqSchedule: this.props.screenProps._reqSchedule.bind(this),
            _reqExpendses: this.props.screenProps._reqExpendses.bind(this),
            // _getSchedule:this.props.screenProps._getSchedule.bind(this),
            _unsetSchedule: this.props.screenProps._unsetSchedule.bind(this),
            _dataschedule: this.props.screenProps._dataschedule,
            _selectschedule: this.props.screenProps._selectschedule,
            _expensesList: this.props.screenProps._expensesList
        }} />;
    }
}

//CORE CONTROLLER
const AppCoreController = createStackNavigator(
    {
        HomeExpendsView: {
            screen: ExpensesViewModel
        },
        ExpensesForm: {
            screen: ExpensesFormViewModel
        }
    },
    {
        initialRouteName: "HomeExpendsView",
        headerMode:'none'
    }
);
const AppContainer = createAppContainer(AppCoreController);