import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import ShadowView from 'react-native-shadow-view';

//
import Constant from '../../global/Constant';
import {convertHeight, convertWidth} from '../../global/Global';
import user from '../../global/user';
import {Styleapp} from '../../styleapp';

class DokterDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wSchedule: 0,
      scheduletxt: 0,
      todaytxt: 0,
    };
  }
  componentDidMount() {
    this.updateStatusSchedule();
    console.log('module_dokter_dashboard.js user data => ', this.props.dokter);
  }
  scheduleSize(e) {
    this.setState({
      wSchedule: e.nativeEvent.layout.width,
    });
  }
  setTextBtn() {
    if (this.props.atExpenses == null) {
      switch (user.getStatusRole()) {
        case Constant.ROLE_INLOGIN:
          return 'Start Your Day';
          break;
        case Constant.ROLE_INSELECTSCHEDULE:
          return 'Set';
          break;
        case Constant.ROLE_READYSTARTSCHEDULE:
          return 'Finish';
          break;
      }
    } else {
      return '+ Add Expenses';
    }
  }
  onGetAddFriend() {
    if (
      this.props.atExpenses == null &&
      user.getStatusRole() == Constant.ROLE_READYSTARTSCHEDULE
    ) {
      return (
        <TouchableOpacity
          style={{
            width: convertWidth('5%'),
            height: convertWidth('5%'),
            borderRadius: convertWidth('5%'),
            backgroundColor: Constant.COLOR_BLUE,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: convertWidth('2.5%'), height: convertWidth('2.5%')}}
            resizeMode={'contain'}
            source={require('../../../assets/ASET/add_doctor.png')}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={{
            width: convertWidth('5%'),
            height: convertWidth('5%'),
            orderRadius: convertWidth('5%'),
            backgroundColor: 'rgba(0,0,0,0)',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      );
    }
  }
  getColorScheduleText() {
    if (this.props.atExpenses) {
      return Constant.COLOR_GRAY2;
    } else if (
      this.props.atExpenses == null &&
      user.getStatusRole() >= Constant.ROLE_READYSTARTSCHEDULE
    ) {
      return Constant.COLOR_GRAY2;
    } else if (
      this.props.atExpenses == null &&
      user.getStatusRole() >= Constant.ROLE_INSELECTSCHEDULE
    ) {
      return Constant.COLOR_BLUE;
    } else {
      return Constant.COLOR_BLACKALL;
    }
  }
  getColorTodayText() {
    if (this.props.atExpenses) {
      return Constant.COLOR_GRAY2;
    } else if (
      this.props.atExpenses == null &&
      user.getStatusRole() == Constant.ROLE_READYSTARTSCHEDULE
    ) {
      return Constant.COLOR_BLUE;
    }
  }
  updateStatusSchedule() {
    this.setState({
      scheduletxt: user.getUserSchedule(),
      todaytxt: user.getUserToday(),
    });
  }
  render() {
    const {scheduletxt, todaytxt} = this.state;
    //console.log(user.getPhoto());
    return (
      <View style={Styleapp._userdashboardcontainer}>
        <View style={Styleapp._userdashboard}>
          <ShadowView
            style={{
              width: convertWidth('95%'),
              height: convertHeight('14%'),
              backgroundColor: '#FFFFFF',
              position: 'absolute',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }}
          />
          <View style={Styleapp._userPhotoContainerdashboard}>
            <Image
              style={Styleapp._userPhotodashboard}
              resizeMode={'contain'}
              source={{
                uri:
                  this.props.profilDok.picture != null
                    ? this.props.profilDok.picture
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
              }}
            />
          </View>
          {this.props.dokter != null && (
            <View style={{paddingRight: '5%'}}>
              <Text
                style={{
                  fontFamily: Constant.POPPINS_MEDIUM,
                  fontSize: convertWidth('2.3%'),
                  color: '#000',
                }}>
                {this.props.profilDok.name != null
                  ? this.props.profilDok.name
                  : ''}
              </Text>
              <Text
                style={{
                  fontFamily: Constant.POPPINS_ULTRALIGHT,
                  fontSize: convertWidth('1.7%'),
                  color: '#000',
                }}>
                {this.props.profilDok.speciality != null
                  ? this.props.profilDok.speciality.name
                  : ''}
              </Text>
            </View>
          )}

          {this.props.isDetail && (
            <View
              style={{
                position: 'absolute',
                width: convertWidth('25%'),
                height: convertHeight('10%'),
                alignItems: 'center',
                left: convertWidth('59%'),
                flexDirection: 'row',
                // borderWidth:1
              }}>
              {
                /* <TouchableOpacity
                                 onPress={() => this.props.onBtn1 != null ? this.props.onBtn1() : {}}
                                 style={{
                                     marginLeft: convertWidth('1%'), width: convertWidth('18%'), height: convertHeight('6.5%'), justifyContent: 'center', alignItems: 'center', borderRadius: convertHeight('7%'),
                                     backgroundColor: '#ff0000'
                                 }}>
                                 <Text style={{ fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.7%'), color: "#fff" }}>{"Not Available"}</Text>
                             </TouchableOpacity>*/

                <TouchableOpacity
                  onPress={() =>
                    this.props.onBtn1 != null ? this.props.onBtn1() : {}
                  }
                  style={{
                    width: convertWidth('10%'),
                    height: convertHeight('6.5%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: convertHeight('7%'),
                    backgroundColor: '#ff0000',
                  }}>
                  <Text
                    style={{
                      fontFamily: Constant.POPPINS_REG,
                      fontSize: convertWidth('1.7%'),
                      color: '#fff',
                    }}>
                    {'Back'}
                  </Text>
                </TouchableOpacity>
              }

              <TouchableOpacity
                onPress={() =>
                  this.props.onBtn2 != null ? this.props.onBtn2() : {}
                }
                style={{
                  marginLeft: convertWidth('3%'),
                  width: convertWidth('18%'),
                  height: convertHeight('6.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: convertHeight('7%'),
                  backgroundColor: '#00b7a2',
                }}>
                <Text
                  style={{
                    fontFamily: Constant.POPPINS_LIGHT,
                    fontSize: convertWidth('1.7%'),
                    color: '#fff',
                  }}>
                  {'Start'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default DokterDashboard;
