import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import posed from 'react-native-pose';
//
import Constant from '../../../../global/Constant';
import {convertHeight, convertWidth} from '../../../../global/Global';
import Cystone_page7_pop1_core from './cystone_page7_pop1';
import Cystone_page7_pop2_core from './cystone_page7_pop2';
import Cystone_page7_pop3_core from './cystone_page7_pop3';
import Cystone_page7_pop4_core from './cystone_page7_pop4';
import Cystone_page7_pop5_core from './cystone_page7_pop5';
import Cystone_page7_pop6_core from './cystone_page7_pop6';
import {moderateScale} from '../../../../styleapp/scaling';

let path = '../../../../../assets/edetailing/';
class Cystone_page7_core extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myposition: {},
      data: null,
      datahospital: null,
      currentPop: 0,
      timers: 0,
    };

    this.fadetitle = new Animated.Value(0);
    this.fadesubtitle1 = new Animated.Value(0);

    this.fadeobat = new Animated.Value(0);
    this.fadeicon1 = new Animated.Value(0);
    this.fadeicon2 = new Animated.Value(0);

    this.fadebtn1 = new Animated.Value(0);
    this.fadebtn2 = new Animated.Value(0);
    this.fadebtn3 = new Animated.Value(0);

    this.posobat = new Animated.ValueXY({
      x: moderateScale(200),
      y: -convertHeight('27%'),
    });
    this.posicon1 = new Animated.ValueXY({
      x: moderateScale(100),
      y: moderateScale(25),
    });
    this.posicon2 = new Animated.ValueXY({
      x: moderateScale(380),
      y: moderateScale(25),
    });
  }
  componentDidMount() {
    console.log(this.props.datas);
    this.setState(
      {
        timers: Number(this.props.page_id.duration),
      },
      () => {
        this.startAnim();
        this.startTime();
      },
    );
  }
  componentWillUnmount() {
    this.props.page_id.duration = this.state.timers;
    console.log(this.props.page_id);
    clearInterval(this.timerinterval);
  }
  startTime() {
    this.timerinterval = setInterval(() => {
      this.setState(prevState => ({
        timers: prevState.timers + 1,
      }));
    }, 1000);
  }

  _popShow(id = 0) {
    if (id == 0) {
      return null;
    } else if (id == 1) {
      return (
        <Cystone_page7_pop1_core
          onclose={this._onBtnPopClosePress.bind(this)}
        />
      );
    } else if (id == 2) {
      return (
        <Cystone_page7_pop2_core
          onclose={this._onBtnPopClosePress.bind(this)}
        />
      );
    } else if (id == 3) {
      return (
        <Cystone_page7_pop3_core
          onclose={this._onBtnPopClosePress.bind(this)}
        />
      );
    } else if (id == 4) {
      return (
        <Cystone_page7_pop4_core
          onclose={this._onBtnPopClosePress.bind(this)}
        />
      );
    } else if (id == 5) {
      return (
        <Cystone_page7_pop5_core
          onclose={this._onBtnPopClosePress.bind(this)}
        />
      );
    } else if (id == 6) {
      return (
        <Cystone_page7_pop6_core
          showPdf={this.props.showPdf.bind(this)}
          onclose={this._onBtnPopClosePress.bind(this)}
        />
      );
    }
  }
  _onBtnPopPress(id) {
    this.setState({
      currentPop: id,
    });
  }
  _onBtnPopClosePress() {
    this.setState({
      currentPop: 0,
    });
  }
  render() {
    const {datas} = this.props;
    return (
      <View
        style={{
          width: convertWidth('100%'),
          height: convertHeight('100%'),
        }}>
        <Image
          style={{
            position: 'absolute',
            width: convertWidth('15%'),
            height: convertHeight('6.5%'),
            left: convertWidth('81%'),
            top: convertHeight('2%'),
          }}
          resizeMode={'contain'}
          source={require(path + 'bg/logo.png')}
        />
        <Animated.Image
          style={{
            position: 'absolute',
            width: convertWidth('21%'),
            height: convertHeight('7%'),
            left: convertWidth('40%'),
            top: convertHeight('5%'),
            //borderWidth: 1,
            //backgroundColor: '#FFFFFF',
          }}
          resizeMode={'contain'}
          source={require(path + 'cystone1/title2.png')}
        />

        <Animated.Image
          style={{
            position: 'absolute',
            width: convertWidth('65%'),
            height: convertHeight('15%'),
            left: convertWidth('20%'),
            top: convertHeight('18%'),
            opacity: this.fadesubtitle1,
            //backgroundColor: '#000'
          }}
          resizeMode={'contain'}
          source={require(path + 'cytone6/subtitle.png')}
        />
        <Animated.View
          style={{
            position: 'absolute',
            width: convertWidth('85%'),
            height: convertHeight('45%'),
            left: convertWidth('8%'),
            top: convertHeight('34.5%'),
            backgroundColor: '#fff',
            borderRadius: convertHeight('2%'),
            opacity: this.fadesubtitle1,
            borderWidth: 0,
          }}>
          <Animated.Image
            style={[
              this.posobat.getLayout(),
              {
                position: 'absolute',
                width: convertWidth('35%'),
                height: convertHeight('33%'),

                opacity: this.fadeobat,
                //backgroundColor:'#000'
              },
            ]}
            resizeMode={'contain'}
            source={require(path + 'cytone6/sleeppeople.png')}
          />
          <Animated.View
            style={[this.posicon1.getLayout(), {position: 'absolute'}]}>
            <TouchableOpacity onPress={() => this._onBtnPopPress(4)}>
              <Animated.Image
                style={{
                  //position: "absolute",
                  width: convertWidth('20%'),
                  height: convertWidth('20%'),

                  opacity: this.fadeicon1,
                  borderWidth: 0,
                }}
                resizeMode={'contain'}
                source={require(path + 'cytone6/preeswl.png')}
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[this.posicon2.getLayout(), {position: 'absolute'}]}>
            <TouchableOpacity onPress={() => this._onBtnPopPress(5)}>
              <Animated.Image
                style={{
                  width: convertWidth('20%'),
                  height: convertWidth('20%'),

                  opacity: this.fadeicon2,
                  borderWidth: 0,
                }}
                resizeMode={'contain'}
                source={require(path + 'cytone6/posteswl.png')}
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <View
          style={{
            flexDirection: 'row',
            left: convertWidth('61%'),
            top: convertHeight('82%'),
            position: 'absolute',
          }}>
          <Animated.View
            style={{
              width: convertWidth('7%'),
              height: convertWidth('9%'),
              //marginRight: convertWidth("0.3%"),
              opacity: this.fadebtn1,
            }}>
            <TouchableOpacity onPress={() => this._onBtnPopPress(1)}>
              <Image
                style={{
                  //position: "absolute",
                  width: convertWidth('6.1%'),
                  height: convertWidth('9%'),

                  //backgroundColor:'#000'
                }}
                resizeMode={'contain'}
                source={require(path + 'cytone6/icon1.png')}
              />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              width: convertWidth('7%'),
              height: convertWidth('9%'),
              //marginRight: convertWidth("0.3%"),
              opacity: this.fadebtn2,
            }}>
            <TouchableOpacity onPress={() => this._onBtnPopPress(2)}>
              <Image
                style={{
                  // position: "absolute",
                  width: convertWidth('6.1%'),
                  height: convertWidth('9%'),
                }}
                resizeMode={'contain'}
                source={require(path + 'cytone6/icon2.png')}
              />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              width: convertWidth('7%'),
              height: convertWidth('9%'),
              //marginRight: convertWidth("0.3%"),
              opacity: this.fadebtn3,
            }}>
            <TouchableOpacity onPress={() => this._onBtnPopPress(3)}>
              <Image
                style={{
                  //position: "absolute",
                  width: convertWidth('6.1%'),
                  height: convertWidth('9%'),

                  //backgroundColor:'#000'
                }}
                resizeMode={'contain'}
                source={require(path + 'cytone6/icon3.png')}
              />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              width: convertWidth('7%'),
              height: convertWidth('9%'),
              marginRight: convertWidth('0.3%'),
              opacity: this.fadebtn3,
            }}>
            <TouchableOpacity onPress={() => this._onBtnPopPress(6)}>
              <Image
                style={{
                  //position: "absolute",
                  width: convertWidth('7%'),
                  height: convertWidth('9%'),

                  //backgroundColor:'#000'
                }}
                resizeMode={'contain'}
                source={require(path + 'icons/icon_clinical_text.png')}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={{position: 'absolute'}}>
          {this._popShow(this.state.currentPop)}
        </View>
      </View>
    );
  }
  //anim
  startAnim() {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.fadetitle, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.timing(this.fadesubtitle1, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.parallel([
        Animated.timing(this.fadeobat, {toValue: 1, duration: 500}),
        Animated.spring(this.posobat, {
          toValue: {x: moderateScale(200), y: moderateScale(30)},
          duration: 3000,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.fadeicon1, {toValue: 1, duration: 500}),
        Animated.spring(this.posicon1, {
          toValue: {x: moderateScale(30), y: moderateScale(25)},
          duration: 1000,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.fadeicon2, {toValue: 1, duration: 500}),
        Animated.spring(this.posicon2, {
          toValue: {x: moderateScale(480), y: moderateScale(25)},
          duration: 1000,
        }),
      ]),
      Animated.delay(300),
      Animated.timing(this.fadebtn1, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.timing(this.fadebtn2, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.timing(this.fadebtn3, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
    ]).start();
  }
}
const styles = StyleSheet.create({
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
  TextTitle: {
    color: '#eeeeee',
    fontFamily: Constant.POPPINS_SEMIBOLD,
    width: convertWidth('20%'),
    textAlign: 'center',
    //borderWidth:1,
    fontSize: convertWidth('1.8%'),
  },
});
/*
   <TouchableOpacity
                style={[Styleapp._buttons, Styleapp._bubble]}
                onPress={() => this.onOpenSignature()}
            >
                <Text>Signature Page</Text>
            </TouchableOpacity>
*/
export default Cystone_page7_core;
