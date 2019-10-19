/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Linking, BackHandler, Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Alert, YellowBox } from 'react-native';
import { createStackNavigator, StackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions'

import Constant from './app/global/Constant';
import { loading, checkMaintance, callAlert, callAlertImportant } from './app/global/Global';

import SplashScreen from './app/SplashModule/splashviewmodel';
import LoginScreen from './app/Module_Login/loginviewmodel';
import AppCore from './app/appindex/indexviewmodel';

import { cekNetInfo, getLocal, checkLatestVersion, convertHeight, convertWidth, setup, getLinkApp } from "./app/global/Global";
import Forgotscreen from './app/Module_Login/forgetviewmodel';
import { getLocalF, dwfileconfig, kwkwkwkwkw } from "./app/files/FileManager";
import AuthScreen from './app/Module_Login/authecationviewmodel';
import Authorize from './app/screen/screen_authorize'

import { connect } from 'react-redux';
import ACTION_TYPE from "./app/redux/actions/actions";

//Login View
const LoginView = createStackNavigator(
  {
    LoginPage: {
      screen: LoginScreen
    },
    ForgotPage: {
      screen: Forgotscreen
    }
  },
  {
    initialRouteName: "LoginPage",
    headerMode: "none"
  }
)
//init
const AppStackNavigator = createSwitchNavigator(
  {
    AuthPage: {
      screen: Authorize
    },
    SplashPage: {
      screen: SplashScreen
    },
    TryLoginPage: {
      screen: AuthScreen
    },
    LoginViews: {
      screen: LoginView
    },
    AppsPage: {
      screen: AppCore
    }
  },
  {
    initialRouteName: "AuthPage",
    headerMode: "none"
  }
);
const appContainer = createAppContainer(AppStackNavigator);

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
)(appContainer);