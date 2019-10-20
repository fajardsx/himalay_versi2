import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Constant from '../../global/Constant';
import user from '../../global/user';
import {convertWidth} from '../../global/Global';

import LogoCheckno from '../../../assets/uncheck.svg';
import LogoCheckyes from '../../../assets/check.svg';
const checkDisable = require('../../../assets/ASET/emptycheck.png');
const checkyes = require('../../../assets/ASET/check.png');
const checkno = require('../../../assets/ASET/uncheck.png');
class CheckComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statuscheck: this.props.checkid != null ? this.props.checkid : 0,
      srccheck: checkDisable,
    };
  }
  componentDidMount() {
    //console.log("did mount check ", this.props.checkid )
    this.setState({
      statuscheck: this.props.checkid != null ? this.props.checkid : 0,
    });
  }
  componentWillReceiveProps() {
    this.setState({
      //statuscheck: this.props.checkid != null ? this.props.checkid : this.state.statuscheck,
    });
  }
  componentWillUnmount() {
    this.setState({
      //statuscheck: this.props.checkid != null ? this.props.checkid : 0,
    });
  }
  onUpdateSelect(id) {
    this.setState({
      statuscheck: id,
    });
  }
  _setCheckIcon(_type) {
    let _sizecontiner = 3.5;
    let _sizem = 3.5;
    let _sizeicons = 2.7;

    if (_type == 0) {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: convertWidth(_sizecontiner),
            height: convertWidth(_sizecontiner),
          }}>
          <LogoCheckno
            width={convertWidth(_sizem)}
            height={convertWidth(_sizem)}
          />
        </View>
      );
    } else if (_type == 1) {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: convertWidth(_sizecontiner),
            height: convertWidth(_sizecontiner),
          }}>
          <LogoCheckyes
            width={convertWidth(_sizem)}
            height={convertWidth(_sizem)}
          />
        </View>
      );
    }
  }
  _setCheckEmptyIcon(_color) {
    let _sizecontiner = '4.5%';
    let _sizem = '3.5%';
    let _sizeicons = '3.7%';
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: convertWidth(Constant.COLOR_GRAY2),
          height: convertWidth(_sizecontiner),
        }}>
        <View
          style={{
            borderRadius: convertWidth('1%'),
            borderWidth: convertWidth('0.4%'),
            borderColor: _color,
            width: convertWidth(_sizem),
            height: convertWidth(_sizem),
          }}
        />
      </View>
    );
  }
  onpresscheck() {
    if (this.props.disable == false) {
      let first = this.state.statuscheck;
      if (first != 2) {
        if (first == 0) {
          first = 1;
        } else if (first == 1) {
          first = 0;
        }
        this.setState({statuscheck: first}, () => {
          if (this.props.onCheckUpdate) {
            let data = null;
            if (this.props.keyid != null && this.props.listid == null) {
              data = {
                parentid: this.props.keyid,
                data: this.props.data,
                isSelectParent: first,
              };
              this.onProsesCheck(data);
              //this.props.onCheckUpdate(data)
            } else if (this.props.keyid != null && this.props.listid != null) {
              data = {
                parentid: this.props.keyid,
                listid: this.props.listid,
                data: this.props.data,
                isSelect: first,
              };
              this.onProsesCheck(data);
              // this.props.onCheckUpdate(data)
            }
          }
        });
      }
    }
  }
  onProsesCheck(data) {
    let delay = setTimeout(() => {
      this.props.onCheckUpdate(data);
      clearTimeout(delay);
    }, 10);
  }
  onUpdateFromParent(id) {
    this.setState({
      statuscheck: id,
    });
  }
  getSrcChecl() {
    switch (this.state.statuscheck) {
      case 0:
        return checkno;
        break;
      case 1:
        return checkyes;
        break;
      case 2:
        return checkDisable;
        break;
    }
  }
  getSrcChecl2() {
    switch (this.state.statuscheck) {
      case 0:
        return this._setCheckIcon(this.state.statuscheck);

      case 1:
        return this._setCheckIcon(this.state.statuscheck);

      case 2:
        return checkDisable;
    }
  }
  render() {
    const {statuscheck} = this.state;

    return (
      <View
        style={
          this.props.stylecheck ? this.props.stylecheck : stylemenu.contianer
        }>
        <TouchableOpacity onPress={() => this.onpresscheck()}>
          {this.getSrcChecl2()
          /*<Image
                        style={stylemenu.iconstyle}
                        resizeMode={'contain'}
                        source={this.getSrcChecl()}
                    />*/
          }
        </TouchableOpacity>
      </View>
    );
  }
}
const stylemenu = StyleSheet.create({
  contianer: {
    width: convertWidth('3%'),

    marginTop: 5,
  },
  iconstyle: {
    width: 30,
    height: 30,
  },
  textmenu: {
    fontFamily: Constant.POPPINS_MEDIUM,
    fontSize: 21,
    color: '#fff',
  },
  btncontainer: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '5%',
  },
  linecontainer: {
    width: '100%',
    borderColor: '#04665B',
    borderBottomWidth: 1,
  },
});

export default CheckComponent;
