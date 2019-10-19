import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";
import { NavigationActions,StackActions } from "react-navigation";

const PAGE_CONFIG = {
    currentRouter: "",
    currentNavigation: [],
    indexRouter: [],
    homeRoute:null,
    mainRoute:null,
    tabRoute:null,
};
export default PAGE_CONFIG;

export function setCurrentRouter(params, params2) {
    console.log("add ", params);
    console.log("add ", params2);
    PAGE_CONFIG.currentRouter = params
    PAGE_CONFIG.currentNavigation.push(params2)
    PAGE_CONFIG.indexRouter.push(params);
};

export function getRoute() {
  return this.PAGE_CONFIG;
}

export function onMainMenu(navigation,newrouter) {
  if(navigation!=null){
     navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: newrouter })]
      })
    );
  }
}
export function onBackDashBoard(navigation, newrouter){
  navigation.dispatch(
    NavigationActions.navigate({
      routeName: newrouter,
      //params: { role: id },
      //action: NavigationActions.navigate({routeName:Constant.DW_HOME}),
    })
  )
}

export function toAboutUs(navigation) {
  console.log("TO ABOUT UD",navigation)
  if (navigation != null) {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "AboutUsView" }),
          NavigationActions.navigate({ routeName: "AboutUsView" })
        ]
      })
    );
  }
}

export function onComplete(navigation, newrouter) {
  if (navigation != null) {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate(newrouter )]
      })
    );
  }
}
export function onBackDashBoard2(navigation, newrouter,params) {
  navigation.dispatch(
    NavigationActions.navigate({
      routeName: newrouter,
      params: params,
      //action: [toTopHome(PAGE_CONFIG.homeRoute, params)],
    })
  )
}

export function toTopHome(navigation,newrouter,_params){
 // if (navigation != null) {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        key:null,
        actions: [
          NavigationActions.navigate({ 
            routeName: newrouter,
             params: _params})]
      })
    );
  //}
}
export function goBackEdetailing(navigation,newrouter) {
  navigation.dispatch(
    NavigationActions.reset({
      index:0,
      actions:[
        NavigationActions.setParams({ isStart: false, dataDokter: null, dataHospital: null}),
        NavigationActions.navigate({routeName:newrouter})
      ]
    })
  )
}