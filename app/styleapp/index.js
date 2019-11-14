import React from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import Constant from '../global/Constant';
import {convertHeight, convertWidth} from '../global/Global';

export const Styleapp = StyleSheet.create({
  _bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',

    borderRadius: 20,
  },
  _buttons: {
    width: '80%',
    height: '10%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  _formlogincontainer: {
    width: '50%',

    justifyContent: 'center',
  },
  _linegray: {
    backgroundColor: Constant.COLOR_WHITE2,
    width: Dimensions.get('window').width,
    height: 1,
  },
  _userdashboardcontainer: {
    zIndex: 2,
    width: Dimensions.get('window').width,
    height: convertHeight('12%'),
    alignItems: 'center',
    position: 'absolute',
    top: convertHeight('10%'),
  },
  _userdashboard: {
    width: '95%',
    height: '100%',

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    flexDirection: 'row',
  },
  _userPhotoContainerdashboard: {
    width: convertWidth('6.7%'),
    height: convertWidth('6.7%'),
    borderRadius: convertWidth('3.35%'),
    overflow: 'hidden',
    //backgroundColor: Constant.COLOR_GREEN3,
    marginHorizontal: '3.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  _userPhotodashboard: {
    width: convertWidth('12%'),
    height: convertHeight('12%'),
    backgroundColor: Constant.COLOR_GREEN2,
  },
});
