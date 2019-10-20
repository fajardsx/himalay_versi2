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
import {
  convertHeight,
  convertWidth,
  callToast,
} from '../../../../global/Global';
import Gokshura_page1_pop1_core from './gokshura_page1_pop1';
import Gokshura_page1_clinical from './gokshura_page1_clinical';

let path = '../../../../../assets/edetailing/';
class Gokshura_page1_core extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myposition: {},
      data: null,
      datahospital: null,
      timers: 0,
    };
    //lista anim
    this.fadeTitle = new Animated.Value(0);
    this.fadeSubTitle = new Animated.Value(0);
    this.fadebulat = new Animated.Value(0);
    this.fadeProduk = new Animated.Value(0);
    this.fadeinfo = new Animated.Value(0);
    this.faderef = new Animated.Value(0);
    this.fadebtn3 = new Animated.Value(0);
    this.fadebtn2 = new Animated.Value(0);
    this.xTitle = new Animated.ValueXY({x: convertWidth('63%'), y: 0});
    this.xSubTitle = new Animated.ValueXY({
      x: convertWidth('63%'),
      y: convertHeight('30%'),
    });
    this.xinfo = new Animated.ValueXY({
      x: convertWidth('0%'),
      y: convertHeight('36%'),
    });
    //this.xSubTitle = new Animated.ValueXY({ x:convertWidth('63%'), y: convertHeight('12%')});
  }
  componentDidMount() {
    //console.log(this.props.datas)
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
    ///console.log(this.props.page_id);
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
        <Gokshura_page1_pop1_core
          onclose={this._onBtnPopClosePress.bind(this)}
        />
      );
    } else if (id == 2) {
      return (
        <Gokshura_page1_clinical
          showPdf={this.props.showPdf.bind(this)}
          onclose={this._onBtnPopClosePress.bind(this)}
        />
      );
    } else if (id == 3) {
      //return <Tripahala_page1_pop3_core onclose={this._onBtnPopClosePress.bind(this)} />;
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
            top: convertHeight('3%'),
          }}
          resizeMode={'contain'}
          source={require(path + 'bg/logo.png')}
        />

        <Animated.Image
          style={[
            this.xTitle.getLayout(),
            {
              //position: "absolute",
              width: convertWidth('30%'),
              marginTop: '5%',
              //height: convertHeight("18%"),
              opacity: this.fadeTitle,
              //left: convertWidth('43%'),
              //top: convertHeight('5%'),
              //borderWidth: 1,
              //backgroundColor: '#000',
            },
          ]}
          resizeMode={'contain'}
          source={require(path + 'gokshura/title.png')}
        />
        <Animated.Image
          style={{
            position: 'absolute',
            width: convertWidth('83%'),
            height: convertHeight('13%'),
            opacity: this.fadeSubTitle,
            left: convertWidth('7%'),
            top: convertHeight('24%'),
            //borderWidth: 1,
            //backgroundColor: '#000',
          }}
          resizeMode={'contain'}
          source={require(path + 'gokshura/subtitle.png')}
        />
        <View
          style={{
            position: 'absolute',
            left: convertWidth('7%'),
            top: convertHeight('34.5%'),
          }}>
          <Animated.Image
            style={{
              //position: "absolute",
              width: convertWidth('33%'),
              height: convertHeight('17%'),
              opacity: this.fadebulat,
              //left: convertWidth('7%'),
              //top: convertHeight('35%'),
              //borderWidth: 1,
              //backgroundColor: '#000',
            }}
            resizeMode={'contain'}
            source={require(path + 'gokshura/box1.png')}
          />
          <Animated.Image
            style={{
              //position: "absolute",
              width: convertWidth('33%'),
              height: convertHeight('30%'),
              opacity: this.fadebulat,
              // left: convertWidth('7%'),
              // top: convertHeight('53%'),
              //borderWidth: 1,
              // backgroundColor: '#000',
            }}
            resizeMode={'contain'}
            source={require(path + 'gokshura/box2.png')}
          />
        </View>

        <Animated.Image
          style={{
            position: 'absolute',
            width: convertWidth('46%'),
            height: convertHeight('45%'),
            opacity: this.fadebulat,
            left: convertWidth('44%'),
            top: convertHeight('35%'),
            //borderWidth: 1,
            //backgroundColor: '#000',
          }}
          resizeMode={'contain'}
          source={require(path + 'gokshura/diagram1.png')}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            left: convertWidth('80%'),
            top: convertHeight('81%'),
            position: 'absolute',
          }}>
          <Animated.View
            style={{
              width: convertWidth('5%'),
              height: convertWidth('5%'),
              // left: convertWidth("85%"),
              marginRight: convertWidth('1%'),
              opacity: this.fadebtn2,
              // top: convertHeight("81%"), position: "absolute"
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => this._onBtnPopPress(1)}>
              <Image
                style={{
                  //position: "absolute",
                  marginTop: convertHeight('1%'),
                  width: convertWidth('5.25%'),
                  height: convertWidth('5.25%'),
                  //backgroundColor:'#000'
                }}
                resizeMode={'contain'}
                source={require(path + 'icons/icon_indikasi.png')}
              />
              <Text
                style={{
                  color: '#0D9B86',
                  fontFamily: Constant.POPPINS_SEMIBOLD,
                  // marginTop: convertWidth("0.2%"),
                  width: convertWidth('5%'),
                  textAlign: 'center',

                  //borderWidth:1,
                  fontSize: convertWidth('1%'),
                }}>
                Indikasi
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              width: convertWidth('5%'),
              height: convertWidth('5%'),
              //left: convertWidth("92%"),
              opacity: this.fadebtn3,
              //top: convertHeight("80%"), position: "absolute"
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => this._onBtnPopPress(2)}>
              <Image
                style={{
                  //position: "absolute",
                  width: convertWidth('6.2%'),
                  height: convertWidth('9%'),

                  //backgroundColor:'#000'
                }}
                resizeMode={'contain'}
                source={require(path + 'icons/icon_clinical_text.png')}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {this._popShow(this.state.currentPop)}
      </View>
    );
  }

  //anim
  startAnim() {
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(this.fadeTitle, {
          toValue: 1,
          duration: Constant.DURATION_FADE,
        }),
        Animated.spring(this.xTitle, {
          toValue: {x: convertWidth('7%'), y: 0},
          duration: 3000,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.fadeSubTitle, {
          toValue: 1,
          duration: Constant.DURATION_FADE,
        }),
        Animated.spring(this.xSubTitle, {
          toValue: {x: convertWidth('38%'), y: convertHeight('30%')},
          duration: 3000,
        }),
      ]),
      Animated.timing(this.fadebulat, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.timing(this.fadeProduk, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.parallel([
        Animated.timing(this.fadeinfo, {toValue: 1, duration: 500}),
        Animated.spring(this.xinfo, {
          toValue: {x: convertWidth('20%'), y: convertHeight('36%')},
          duration: 3000,
        }),
      ]),
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
export default Gokshura_page1_core;
