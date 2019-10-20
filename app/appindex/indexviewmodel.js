import React, {Component} from 'react';
import {AppState, Text, View} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  NavigationActions,
  StackActions,
} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {
  _handleAppStateChange,
  _reqAboutUs,
  Global_getreqSchedule,
  convertHeight,
  convertWidth,
  _saveSelectSchedule,
  callAlert,
  successLogutClear,
  _reqContactUs,
  GLOBAL_INITSCHEDULE,
  callToast,
  DebugToast,
  formateFullDateNumber,
  Global_getreqScheduleMonth,
  isTODAY,
  Global_resetShceduleSession,
  timeStampToDate,
  formatCurrentTime,
  getLocalSchedule,
  SYNCLoc_CORE_GET,
  SYNCLoc_CORE_SET,
  checkAttend,
} from '../global/Global';
import Geolocation from '@react-native-community/geolocation';
//screen
import TabController from './module_tab/tab_viewmodel';
import SignatureViewModel from '../appcomponent/module_signature';
import EdetailingCorePage from './module_edetailing/edetailing_core';
import user from '../global/user';
import {
  SYNCLoc,
  TargetSelect,
  clean_sync_all,
  clean_Dokter_all,
  getVisitSchedule,
  StartExecuteFIFO,
} from '../appcomponent/module_async/AsyncManager';
import KEYS from '../appcomponent/module_async/utils/keyAsync';
import Constant from '../global/Constant';
import ScreenErr from '../screen/screen_errbondari';
import BurgerMenuScreen from './drawer_menu/menuburgerscreen';
import DATA_SCHEDULE from '../db/dataScheduleManager';
//REDUX
import {connect} from 'react-redux';
import ACTION_TYPE from '../redux/actions/actions';

let that = null;

//DRAWER MENU
const AppDrawCore = createDrawerNavigator(
  {
    HomeView: {
      screen: props => (
        <TabController
          ref={refTab => {
            this.tab == refTab;
          }}
          {...props}
        />
      ),
    },
  },
  {
    initialRouteName: 'HomeView',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerPosition: 'left',
    drawerWidth: convertWidth('100%'),
    drawerBackgroundColor: 'rgba(0,0,0,0)',
    //header: null,
    //headerMode: "none",
    contentComponent: props => <BurgerMenuScreen {...props} />,
    //transitionConfig: () => transitionCustomConfig()
  },
);

class AppCore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      data: null,
      _first: false,
      _email: '',
    };

    that = this;
  }
  UNSAFE_componentWillMount() {
    console.log('LOCATION');
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const newCoordinate = {
          latitude,
          longitude,
        };
        console.log('LOCATION', newCoordinate);
        this.props.updateuserlocation(newCoordinate);
        user.updateUserGeolocation(newCoordinate);
      },
      error => {
        callAlert(String(error.message));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 100,
      },
    );
  }
  componentDidMount() {
    //initRouter(this.props.navigation);
    AppState.addEventListener('change', _handleAppStateChange);

    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.firstlogin) {
        this.setState(
          {
            _first: this.props.navigation.state.params.firstlogin,
            _email: this.props.navigation.state.params.emaillogin,
          },
          () => this.callSyncronize(),
        );
      } else {
        this.callSyncronize();
      }
    } else {
      this.callSyncronize();
    }
  }
  componentWillUnmount() {
    AppState.addEventListener('change', _handleAppStateChange);
  }
  //INITSYNC
  callSyncronize() {
    StartExecuteFIFO(this.onInitContent.bind(this));
  }
  //content

  onInitContent(value) {
    console.log('INIT CONTENT', value);
    const {_first} = this.state;
    const {_email} = that.state;

    //check last user
    if (_first == true) {
      //if (this.props.userData == null) {
      this._getData();
      //}
      // SYNCLoc(KEYS.KEY_G, KEYS.KEY_LAST_LOGIN).then(res => {
      //   console.log("KEY_LAST_LOGIN", res);
      //   // console.log("KEY_LAST_LOGIN", _email);
      //   if (res && res[0].length > 3) {
      //     //console.log("KEY_LAST_LOGIN", res)

      //     if (res[0] == _email) {
      //       //console.log("KEY_LAST_LOGIN same user")
      //       that._getData();
      //     } else {
      //       //console.log("KEY_LAST_LOGIN new user")
      //       SYNCLoc(KEYS.KEY_D, KEYS.KEY_NAME_SYNC).then(() => {
      //         SYNCLoc(KEYS.KEY_A, KEYS.KEY_LAST_LOGIN, [_email]);
      //         that._getData();
      //       })

      //     }

      //   } else {
      //     //console.log("KEY_LAST_LOGIN user not found")
      //     SYNCLoc(KEYS.KEY_A, KEYS.KEY_LAST_LOGIN, [_email])
      //     that._getData();
      //   }
      // })
    } else {
      _reqContactUs().then(() => {
        let today = formateFullDateNumber(Date.now(), 'DD');
        console.log('tgl', today);
        /* if (today == "01") {
 
           SYNCLoc(KEYS.KEY_G, KEYS.KEY_NEWMONTH).then(res => {
             console.log('trigger', res)
             if (res) {
               if (res[0].newMoon == true) {
                 //clean_Dokter_all();
                 console.log("Call NEW MONTH SCHEDULE");
                 Global_getreqScheduleMonth(that._callbackNewMoon.bind(this));
               } else {
                 that._getData();
               }
             } else {
               //SYNCLoc(KEYS.KEY_A,KEYS.KEY_NEWMONTH,[{newMoon:true}]);
               console.log("Call NEW MONTH SCHEDULE new moon not found");
 
               Global_getreqScheduleMonth(that._callbackNewMoon.bind(this));
 
             }
           });
         } else {*/

        that._getData();
        // }
      });
      //_reqContactUs();
      //Global_getreqSchedule(that._callback.bind(this));
    }
  }
  _getData() {
    if (this.props.scheduleData == null) {
      console.log('LOCAL FIRST LOGIN');
      Global_getreqSchedule(this.props.userData, this._callback.bind(this));
    } else {
      if (this.state._first == true) {
        console.log('LOCAL FIRST LOGIN');
        Global_getreqSchedule(this.props.userData, this._callback.bind(this));
      } else {
        console.log('LOCAL RELOGIN');
        //that._callback(true,[res]);
        GLOBAL_INITSCHEDULE(this.props.userData, this._callback.bind(this));
      }
    }
    // DATA_SCHEDULE.getDataSchedule().then(res => {
    //   console.log("LOCAL DATA", res);
    //   if (res) {
    //     console.log("LOCAL");
    //     if (this.state._first == true) {
    //       console.log("LOCAL FIRST LOGIN");
    //       Global_getreqSchedule(that._callback.bind(this));
    //     } else {
    //       console.log("LOCAL RELOGIN");
    //       //that._callback(true,[res]);
    //       GLOBAL_INITSCHEDULE(that._callback.bind(this));
    //     }

    //   } else {
    //     console.log("LOCAL FIRST LOGIN");
    //     Global_getreqSchedule(that._callback.bind(this));
    //   }
    // })

    /* SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res => {
       console.log('_getData() LOCAL SCHEDULE ', res);
     });
     SYNCLoc_CORE_GET().then(res => {
       console.log('_getData() LOCAL SYNCLoc_CORE_GET ', res);
     });*/
    /*SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res => {
      console.log('_getData() LOCAL SCHEDULE ', res);
      if (res) {
          console.log("LOCAL");
        if(this.state._first == true){
          console.log("LOCAL FIRST LOGIN");
          Global_getreqSchedule(that._callback.bind(this));
        }else{
          console.log("LOCAL RELOGIN");
          //that._callback(true,[res]);
          GLOBAL_INITSCHEDULE(that._callback.bind(this));
        }
  
      } else {
        console.log("LOCAL FIRST LOGIN");
        Global_getreqSchedule(that._callback.bind(this));
      }
    });*/
  }
  //RENDER WELCOME
  displayWelcome() {
    const {_first} = this.state;
    return (
      <View
        style={{
          width: convertWidth('100%'),
          height: convertHeight('100%'),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#027266',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: convertHeight('3%'),
            textAlign: 'center',
          }}>
          {'Welcome, ' +
            this.props.userData.profile_name +
            '\n\n Please Wait...'}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: convertHeight('1.5%'),
            textAlign: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
          }}>
          {'ver.' + Constant.NAME_VERSION}
        </Text>
        {_first == true && (
          <Text
            style={{
              color: '#fff',
              fontSize: convertHeight('2%'),
              marginTop: convertHeight('3%'),
              textAlign: 'center',
            }}>
            {
              'For First Login will take time to Syncronize. And Ensure Network Connection Stable'
            }
          </Text>
        )}
      </View>
    );
  }
  ///
  _callbackNewMoon(valu) {
    if (value == true) {
      SYNCLoc(KEYS.KEY_A, KEYS.KEY_NEWMONTH, [{newMoon: false}]);
      this.setState({
        init: value,
      });
    } else {
      callAlert(
        Constant.NAME_APPS,
        'Syncronize Data Gagal, Mohon check koneksi dan login kembali.',
      );
      successLogutClear().then(res => {
        that.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: Constant.VM_LOGIN_SCREEN}),
            ],
          }),
        );
      });
    }
  }
  //
  _callback(value, res = null) {
    console.log('_callback', value);
    if (value == true) {
      console.log('CALLBACK ', res);
      if (res) {
        this.props.updateSchedule(res);
        checkAttend(res, function done(res, expired = false) {
          console.log('CHECK ABSEN', res);
          console.log('IS EXPIRED', expired);
          that.props.updateUserRole(res);
          that.props.updateUserRoleExpired(expired);
          that.setState({
            //data: res,
            init: value,
          });
        });

        //CHECK ABSEN
      }
    } else {
      if (this.state._first == true) {
        callAlert('Login Failed', 'Please Check Your Connection');
        successLogutClear().then(res => {
          that.props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: Constant.VM_LOGIN_SCREEN,
                }),
              ],
            }),
          );
        });
        return;
      }
      callAlert(Constant.NAME_APPS, 'You are using offline data');
      console.log(
        'INIT OFFLINE==============================================================',
      );
      SYNCLoc_CORE_GET().then(res => {
        console.log('LOCAL SCHEDULE CALLBACK', res);
        if (res) {
          console.log('attend', user.getUserAttend());
          console.log('attend server', res.attend);

          if (res.attend.in != null) {
            if (
              user.getUserAttend().in.length == 0 &&
              res.attend.in.length > 5 &&
              isTODAY(res.attend.in) == true
            ) {
              user.updateUserAttend(res.attend);
            }
          }
          console.log('update attend in', user.getUserAttend());
          if (res.attend.out != null) {
            if (user.getUserAttend().out) {
              if (
                user.getUserAttend().out.length == 0 &&
                res.attend.out.length > 5 &&
                isTODAY(res.attend.out) == true
              ) {
                user.updateUserAttend(res.attend);
              }
            }
          } else if (res.attend.out == null) {
            user.updateUserAttend(res.attend);
          }

          console.log('update attend out', user.getUserAttend());

          //check atten after update
          let _in = user.getUserAttend().in
            ? user.getUserAttend().in.length
            : 0;
          let _out = user.getUserAttend().out
            ? user.getUserAttend().out.length
            : 0;

          console.log('in', _in);
          console.log('out', _out);
          if (_in == 0 && _out == 0) {
            let _ofin = res.attend.in ? res.attend.in.length : 0;
            let _ofout = res.attend.out ? res.attend.out.length : 0;
            //res[0].set_schedule = [];
            if (_ofin > 5 && _ofout > 5) {
              user.updateUserAttend(res.attend);
              that.setState({
                //init: true
              });
            } else {
              Global_resetShceduleSession().then(() => {
                that.setState({
                  //init: true
                });
              });
            }
          } else if (_in > 5 && _out == 0) {
            //CHECK SELECT DOKTOR FROM
            TargetSelect()
              .then(resSelect => {
                console.log('init off select', resSelect);
                if (resSelect) {
                  if (resSelect.length == 0) {
                    _saveSelectSchedule(res.set_schedule);
                  } else if (resSelect.length > 0) {
                    if (resSelect.length > res.set_schedule) {
                      res.set_schedule = resSelect;
                    }
                  }
                  //_saveSelectSchedule(res[0].set_schedule)
                } else {
                  //_saveSelectSchedule(res[0].list_doctor_set_today)
                }
              })
              .then(() => {
                DATA_SCHEDULE.updateDataSchedule(res);

                console.log('SAVE KEY_SCHEDULE ', res);
                console.log('Callback');
                SYNCLoc_CORE_SET(res).then(() => {
                  that.setState({
                    // init: true
                  });
                });
                /*SYNCLoc(KEYS.KEY_U, KEYS.KEY_SCHEDULE, res).then(() => {
                that.setState({
                  init: true
                })
              });*/
              });
          } else {
            that.setState({
              //init: true
            });
          }
          console.log('update attend final', user.getUserAttend());
        } else {
          callAlert(
            'Failed',
            'Syncronize Data Failed, please check your connection.and Login Again.',
          );
        }
      });
    }
  }
  render() {
    const {init, data} = this.state;
    if (init == true) {
      return (
        <ScreenErr style={{flex: 1}}>
          <AppContainer screenProps={this.props.navigation} />
        </ScreenErr>
      );
    } else {
      return this.displayWelcome();
    }
  }
}

//CORE CONTROLLER
const AppCoreController = createStackNavigator(
  {
    HomeViewTab: {
      screen: AppDrawCore,
    },
    EdetailingScreen: {
      screen: EdetailingCorePage,
    },
  },
  {
    initialRouteName: 'HomeViewTab',
    headerMode: 'none',
  },
);
const AppContainer = createAppContainer(AppCoreController);

function mapStateToProps(state) {
  return {
    isFirst: state.firstopen,
    userData: state.userData,
    userlocation: state.userGeolocation,
    scheduleData: state.scheduleData,
  };
}
function dispatchToProps(dispatch) {
  return {
    updateuser: data => dispatch({type: ACTION_TYPE.UPDATE_USER, value: data}),
    updateUserRole: data =>
      dispatch({type: ACTION_TYPE.UPDATE_USERROLE, value: data}),
    updateUserRoleExpired: data =>
      dispatch({type: ACTION_TYPE.UPDATE_USERATTENDEXPIRED, value: data}),
    updateuserlocation: data =>
      dispatch({type: ACTION_TYPE.UPDATE_USER_LOCATION, value: data}),
    updateSchedule: data =>
      dispatch({type: ACTION_TYPE.UPDATE_SCHEDULE, value: data}),
  };
}
export default connect(
  mapStateToProps,
  dispatchToProps,
)(AppCore);
