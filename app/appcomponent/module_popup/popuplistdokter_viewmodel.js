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
import {convertHeight, convertWidth, getCollection} from '../../global/Global';
import user from '../../global/user';
import {LEMARI_GLOBAL_LOAD} from '../module_async/AsyncManager';
import KEYS from '../module_async/utils/keyAsync';
import {GetAllDocterThisMonth} from '../../global/dokter_manager';
import DATA_SCHEDULE from '../../db/dataScheduleManager';
//REDUX
import {connect} from 'react-redux';
//import ACTION_TYPE from '../../redux/actions/actions';

let that = null;
class PopListDokterViewModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listrev: [],
      currentrole: -1,
      currentType: 0,
      listCat: [],
    };
    that = this;
  }
  componentDidMount() {
    this.setState(
      {
        currentType: this.props.currentSelectDoktor,
      },
      () => this._setData(),
    );
  }
  //   componentWillReceiveProps(prevProps) {
  //     const {currentType} = this.state;
  //     console.log('popup_role', prevProps);
  //     if (currentType != prevProps.currentType) {
  //       console.log('popup_role', prevProps.currentType);
  //       this.setState(
  //         {
  //           currentType: prevProps.currentType,
  //         },
  //         () => this._setData(),
  //       );
  //     }
  //   }
  _setData() {
    const {currentType} = this.state;
    console.log('type', currentType);
    let cat = [];
    getCollection()
      .then(res => {
        console.log('getCollection()', res);
        cat = res;
      })
      .then(() => {
        DATA_SCHEDULE.getDataSchedule().then(res => {
          if (res) {
            console.log('LIST DOKTER', res);

            console.log('colec', cat);
            if (currentType == Constant.TYPE_MEET) {
              let tempData = [];
              //tempData = res[0].list_doctor_set_this_month.splice(0);
              res.list_doctor_set_this_month.map(resdok => {
                console.log(resdok);
                if (resdok.name) {
                  tempData.push(resdok);
                }
              });
              that.setState({
                listrev: tempData,
                listCat: cat,
              });
            }
            if (currentType == Constant.TYPE_NO_MEET) {
              let temp = [];

              GetAllDocterThisMonth(temp).then(() => {
                //tempData = temp.splice(0);
                console.log('data dokter ', temp);
                // console.log('data dokter ', tempData);
                res.list_doctor_set_this_month.map(res => {
                  let found = temp.findIndex(child => {
                    return child.id == res.id;
                  });
                  // console.log(found);
                  temp.splice(found, 1);
                });

                that.setState({
                  listrev: temp,
                  listCat: cat,
                });
              });
            }
          }
        });
      });
  }
  _nameSpecalyByCategoryID(id_doctor_categories) {
    const {listCat} = this.state;
    let found = listCat.find(resul => {
      return resul.id == id_doctor_categories;
    });
    let name_specialty = found.name;
    return name_specialty;
    //return name_specialty;
  }
  _renderReview = () => {
    const {listrev} = this.state;

    console.log('render flatList', listrev);
    if (this.props.currentSelectDoktor.length > 0) {
      return (
        <View
          style={{
            height: convertHeight('60%'),
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
              width: convertWidth('50%'),
            }}
            data={this.props.currentSelectDoktor}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontFamily: Constant.POPPINS_REG,
                    fontSize: convertWidth('1.2%'),
                    color: '#b3b3b3',
                    marginVertical: convertHeight('1.5%'),
                    width: convertWidth('20%'),
                  }}>
                  {item.name}
                </Text>
                {console.log('Select doctor ', item)}
                <Text
                  style={{
                    textAlign: 'left',
                    fontFamily: Constant.POPPINS_REG,
                    fontSize: convertWidth('1.2%'),
                    color: '#b3b3b3',
                    marginVertical: convertHeight('1.5%'),
                  }}>
                  {this._nameSpecalyByCategoryID(item.id_doctor_categories)}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  };
  _setHBG = () => {
    return '90%';
  };
  _setTBG = () => {
    return '10%';
  };
  render() {
    return (
      <View
        style={{
          height: convertHeight('100%'),
          width: Dimensions.get('screen').width,
          backgroundColor: 'rgba(0,0,0,0.8)',
          position: 'absolute',
          zIndex: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: convertHeight(this._setHBG()),
            width: convertWidth('70%'),
            //marginTop: convertHeight(this._setTBG()),
            backgroundColor: Constant.COLOR_WHITE4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
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
                backgroundColor: Constant.COLOR_ORANGE1,
              }}>
              <Text
                style={{
                  fontFamily: Constant.POPPINS_LIGHT,
                  fontSize: convertWidth('1.5%'),
                  color: '#fff',
                }}>
                Ok
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

/***/
function mapStateToProps(state) {
  return {
    userData: state.userData,
    currentSelectDoktor: state.currentSelectDoktor,
  };
}
function dispatchToProps(dispatch) {
  return {};
}
export default connect(
  mapStateToProps,
  dispatchToProps,
)(PopListDokterViewModel);
