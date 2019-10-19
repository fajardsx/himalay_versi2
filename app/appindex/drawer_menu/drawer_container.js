import React, { Component } from 'react';
import { BackHandler, AppState, Text, View } from "react-native";
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import AppCore from '../indexviewmodel';
import BurgerMenuScreen from './menuburgerscreen';
import { convertWidth } from '../../global/Global';
import TabController from '../module_tab/tab_viewmodel';


const DrawerController = createAppContainer(createDrawerNavigator(
    {
        HomeView: {
            screen: props => <TabController {...props} />
        },
    },
    {
        initialRouteName: "HomeView",
        drawerOpenRoute: "DrawerOpen",
        drawerCloseRoute: "DrawerClose",
        drawerToggleRoute: "DrawerToggle",
        drawerPosition: "right",
        drawerWidth: convertWidth("50%"),
        drawerBackgroundColor: "rgba(0,0,0,0)",
        header: null,
        headerMode: "none",
        contentComponent: props => <BurgerMenuScreen {...props} />,
        //transitionConfig: () => transitionCustomConfig()
    }
));
