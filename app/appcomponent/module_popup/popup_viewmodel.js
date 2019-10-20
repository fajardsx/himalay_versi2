import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Constant from '../../global/Constant';
import {convertHeight, convertWidth} from '../../global/Global';
import user from '../../global/user';
//REDUX
import {connect} from 'react-redux';
import ACTION_TYPE from '../../redux/actions/actions';

class PopViewModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listrev: [],
      currentrole: -1,
    };
  }
  componentWillReceiveProps(prevProps) {
    const {currentrole} = this.state;
    console.log('popup_role', prevProps);
    if (currentrole != prevProps.role) {
      console.log('popup_role', prevProps.role);
      this.setState({
        currentrole: prevProps.role,
      });
    }
  }
  getTitleText = () => {
    switch (this.props.userrole) {
      case Constant.ROLE_INLOGIN:
        return 'Have Nice Day, ' + this.props.userprofile.profile_name + '!';
        break;
      case Constant.ROLE_INSELECTSCHEDULE:
        return 'Okay, ' + this.props.userprofile.profile_name;
        break;
      case Constant.ROLE_ADDDOCTORAGAIN:
        return 'Okay, ' + this.props.userprofile.profile_name;
        break;
      case Constant.ROLE_READYSTARTSCHEDULE:
        return 'Hi, ' + this.props.userprofile.profile_name;
        break;
    }
  };
  getSubTitleText = () => {
    console.log('role ', this.props.userrole);
    switch (this.props.userrole) {
      case Constant.ROLE_INLOGIN:
        return 'Are your ready to start your day?';
        break;
      case Constant.ROLE_INSELECTSCHEDULE:
        return 'Are you sure want to set your schedule?';
        break;
      case Constant.ROLE_ADDDOCTORAGAIN:
        return 'Are you sure want to set your schedule?';
        break;
      case Constant.ROLE_READYSTARTSCHEDULE:
        return 'Are you sure want finish for today?';
        break;
    }
  };
  _renderReview = () => {
    const {listrev} = this.state;
    const {_rew} = this.props;
    if (
      this.props.userrole == Constant.ROLE_INSELECTSCHEDULE ||
      this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN
    ) {
      //let res = await this.props.dataSelect();

      console.log('render flatList', _rew);
      return (
        <View
          style={{
            height: convertHeight('30%'),
            width: convertWidth('40%'),
            overflow: 'hidden',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#b3b3b3',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Constant.POPPINS_REG,
              fontSize: convertWidth('1.2%'),
              color: '#000',
              marginVertical: convertHeight('1.5%'),
            }}>
            {'List of Doctors : '}
          </Text>
          <FlatList
            style={{
              //marginTop: convertHeight('5%'),
              width: convertWidth('40%'),
            }}
            data={_rew}
            renderItem={({item}) => (
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Constant.POPPINS_REG,
                  fontSize: convertWidth('1.2%'),
                  color: '#b3b3b3',
                  marginVertical: convertHeight('1.5%'),
                }}>
                {item.name}
              </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  };
  _setHBG = () => {
    if (
      this.props.userrole == Constant.ROLE_INSELECTSCHEDULE ||
      this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN
    ) {
      return '80%';
    } else {
      return '50%';
    }
  };
  _setTBG = () => {
    if (
      this.props.userrole == Constant.ROLE_INSELECTSCHEDULE ||
      this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN
    ) {
      return '10%';
    } else {
      return '20%';
    }
  };
  render() {
    return (
      <View
        style={{
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
          backgroundColor: 'rgba(0,0,0,0.8)',
          position: 'absolute',
          zIndex: 10,
          //justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: convertHeight(this._setHBG()),
            width: convertWidth('50%'),
            marginTop: convertHeight(this._setTBG()),
            backgroundColor: Constant.COLOR_WHITE4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: convertWidth('15%'),
              height: convertHeight('15%'),
              marginTop: convertHeight('4%'),
              marginBottom: convertHeight('3%'),
            }}
            source={require('../../../assets/ASET/SMILE.png')}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontFamily: Constant.POPPINS_MEDIUM,
              fontSize: convertWidth('2%'),
              color: '#686868',
            }}>
            {this.getTitleText()}
          </Text>
          <Text
            style={{
              fontFamily: Constant.POPPINS_LIGHT,
              fontSize: convertWidth('1.5%'),
              color: '#686868',
            }}>
            {this.getSubTitleText()}
          </Text>
          {this._renderReview()}
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: convertHeight('2%'),
            }}>
            <TouchableOpacity
              onPress={() => this.props.onPressStartCancel()}
              style={{
                alignSelf: 'flex-end',
                marginHorizontal: '5%',
                width: convertWidth('16%'),
                height: convertHeight('7%'),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: convertHeight('8%'),
                backgroundColor: Constant.COLOR_WHITE2,
                borderWidth: 1,
                borderColor: '#686868',
              }}>
              <Text
                style={{
                  fontFamily: Constant.POPPINS_LIGHT,
                  fontSize: convertWidth('1.5%'),
                  color: '#000',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.onPressStart()}
              style={{
                alignSelf: 'flex-end',
                marginHorizontal: '5%',
                width: convertWidth('16%'),
                height: convertHeight('7%'),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: convertHeight('8%'),
                backgroundColor: Constant.COLOR_ORANGE1,
              }}>
              <Text
                style={{
                  fontFamily: Constant.POPPINS_LIGHT,
                  fontSize: convertWidth('1.5%'),
                  color: '#fff',
                }}>
                Yes, please
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              backgroundColor: Constant.COLOR_WHITE3,
              height: convertHeight('5%'),
              width: convertWidth('3%'),
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              right: 0,
            }}
            onPress={() => this.props.onPressStartCancel()}>
            <Image
              style={{
                width: convertWidth('2%'),
                height: convertHeight('2%'),
              }}
              source={require('../../../assets/ASET/xclose.png')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    userrole: state.userRole,
    userprofile: state.userData,
  };
}
function dispatchToProps(dispatch) {
  return {
    updateuser: data => dispatch({type: ACTION_TYPE.UPDATE_USER, value: data}),
  };
}
export default connect(
  mapStateToProps,
  dispatchToProps,
)(PopViewModel);
