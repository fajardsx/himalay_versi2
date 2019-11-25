import React, {Component} from 'react';
import {
  Alert,
  View,
  ActivityIndicator,
  Dimensions,
  Platform,
  Image,
  Text,
  NetInfo,
} from 'react-native';
import Constans from './Constant';
import store from 'react-native-simple-store';
import Constant from './Constant';
import {
  sendCurrentLocation,
  getReverseGeo,
  formateFullDateNumber,
  getDoctorById,
  callToast,
} from './Global';
import {
  SYNCLoc,
  F_I_F_O_GLOBAL_LOC,
  LEMARI_GLOBAL_LOC,
} from '../appcomponent/module_async/AsyncManager';
import KEYS from '../appcomponent/module_async/utils/keyAsync';

let userData = {
  status_role: 0,
  type_user: 0,
  profile_name: '',
  profile_position: '',
  profile_schedule: null,
  profile_today: null,
  profile_id: '0',
  profile_email: '0',
  profile_doneToday: '0',
  profile_doneMonth: null,
  profile_photo:
    'https://dotcomsolution.000webhostapp.com/himalaya/blankprofilfoto.png',
  profile_pass: null,
  profile_atten: null,
  profile_status: null,
  profile_geolocation: null,
  profile_lastlogin: null,
  profile_country: '',
};
class user {
  //
  static getData() {
    return userData;
  }
  //GET
  static getStatusRole() {
    return userData.status_role;
  }
  static getTypeUser() {
    return userData.type_user;
  }
  static getUsId() {
    return userData.profile_id;
  }
  static getPhoto() {
    return userData.profile_photo;
  }
  static getNameUser() {
    return userData.profile_name;
  }
  static getUserRank() {
    return userData.profile_position;
  }
  static getUserAttend() {
    return userData.profile_atten;
  }
  static getUserSchedule() {
    return userData.profile_schedule;
  }
  static getUserToday() {
    return userData.profile_today;
  }
  static getUserGeolocation() {
    return userData.profile_geolocation;
  }
  static getUserEmail() {
    return userData.profile_email;
  }
  static getUserDoneToday() {
    return Number(userData.profile_doneToday);
  }
  static getUserDoneMonth() {
    return userData.profile_doneMonth;
  }
  static getUserContry() {
    return userData.profile_country;
  }
  //update
  static updateUserAttend(value) {
    userData.profile_atten = value;
  }
  static updateUserDoneToday(value) {
    userData.profile_doneToday = value;
  }
  static updateUserDoneMonth(value) {
    userData.profile_doneMonth = value;
  }
  static updateUserGeolocation(value, sendAPi = true) {
    // console.log('today location', value);
    userData.profile_geolocation = value;
    //longitude: 106.81099999999999, altitude: 5.6, latitude: -6.175929999999999,
    //SEND TO SERVER
    // console.log("location", value);
    if (value) {
      let loc = value.latitude + ',' + value.longitude;

      let locjson = {
        lat: value.latitude,
        lng: value.longitude,
      };
      let _data = {
        cms_users_id: user.getUsId(),
        coordinate: locjson,
        address: '',
      };
      LEMARI_GLOBAL_LOC([_data], KEYS.KEY_SEND_LOCATION, true).then(() => {
        if (sendAPi) {
          SYNCLoc(KEYS.KEY_G, KEYS.KEY_LAST_LOCATION)
            .then(res => {
              if (value) {
                if (!res) {
                  SYNCLoc(KEYS.KEY_A, KEYS.KEY_LAST_LOCATION, value);
                } else {
                  SYNCLoc(KEYS.KEY_U, KEYS.KEY_LAST_LOCATION, value);
                }
              }
            })
            .then(() => {
              let address = '';
              getReverseGeo(locjson).then(res => {
                //console.log("reveres", res)
                if (res != null && res != false) {
                  // that.setState({ allDatas: res.data }, () => that._setData())
                  if (!res.error) {
                    address = res.address.road;
                    let data = new FormData();
                    data.append('cms_users_id', user.getUsId());
                    data.append('coordinate', loc);
                    data.append('address', address);
                    sendCurrentLocation(data).then(res => {
                      //console.log(res)
                      if (res != null) {
                        // that.setState({ allDatas: res.data }, () => that._setData())
                      } else {
                        //callAlert("Failed", res.api_message);
                        // that.setState({ isLoading: false, isRefresh: false })
                      }
                    });
                  }
                } else {
                  //callAlert("Failed", res.api_message);
                  // that.setState({ isLoading: false, isRefresh: false })
                }
              });
            });
        }
      });

      if (Constant.ONLINE == false) {
        /*let jdata = {
                    key: KEYS.KEY_SEND_LOCATION,
                    data: _data
                };
                F_I_F_O_GLOBAL_LOC([jdata])*/
      }
    } else {
      console.log('location no avaliable');
    }
  }
  static onUpdateUserData(data, pass, isreturn) {
    console.log('update user data');
    if (data) {
      userData.profile_name = data.name;
      userData.profile_position = data.position;
      userData.profile_id = data.id;
      userData.profile_photo = data.photo;
      userData.profile_email = data.email;

      userData.profile_atten = data.attend;
      userData.profile_status = data.status;
      userData.profile_country = data.country ? data.country : 'INDONESIA';
    }

    if (pass != null) {
      userData.profile_pass = pass;
    }
    if (isreturn) {
      return userData;
    }
  }
  static onUpdateUserDataLocal(data) {
    console.log('update user data local');
    userData.type_user = data.type_user;
    userData.profile_name = data.profile_name;
    userData.profile_position = data.profile_position;
    userData.profile_id = data.profile_id;
    userData.profile_photo = data.profile_photo;
    userData.profile_email = data.profile_email;
    userData.profile_country = data.profile_country
      ? data.profile_country
      : 'INDONESIA';
    //if (pass != null) {
    userData.profile_pass = data.profile_pass;
    //}
    userData.profile_atten = data.profile_atten;
    userData.profile_status = data.profile_status;
  }
  static updateStatusRole(value) {
    console.log('update ROle', value);
    userData.status_role = value;
    //callToast("Update ROLE " + userData.status_role )
  }
  static updateSchedule(value) {
    userData.profile_schedule = value;
  }
  static updateSelectSchedule(value) {
    userData.profile_today = value;
    console.log(userData.profile_today);
  }
  static updateLastLogin(value) {
    userData.profile_lastlogin = value;
  }
  static updateTypeUser(value) {
    userData.type_user = value;
  }
  static updateCountryUser(value) {
    userData.profile_country = value;
  }
}

export default user;
