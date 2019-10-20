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
import {moderateScale} from '../../../../styleapp/scaling';

let path = '../../../../../assets/edetailing/';
class Cystone_page4_core extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myposition: {},
      data: null,
      datahospital: null,
      timers: 0,
    };

    //
    this.fadetitle = new Animated.Value(0);
    this.fadesubtitle1 = new Animated.Value(0);
    this.fadesubtitle2 = new Animated.Value(0);
    this.fadesubtitle3 = new Animated.Value(0);

    this.fadetable = new Animated.Value(0);
    this.fadeicon1 = new Animated.Value(0);
    this.fadeicon2 = new Animated.Value(0);
    this.fadeicon3 = new Animated.Value(0);
    this.fadefooter = new Animated.Value(0);

    this.posTable = new Animated.ValueXY({
      x: convertWidth('8%'),
      y: convertHeight('50%'),
    });
  }
  componentDidMount() {
    // console.log(this.props.datas);
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

  onEndPress = () => {
    this.props.onEnd(this.props.datas);
  };
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
            width: convertWidth('55%'),
            height: convertHeight('17%'),
            left: convertWidth('23%'),
            top: convertHeight('13%'),
            opacity: this.fadesubtitle1,
            borderWidth: 0,
          }}
          resizeMode={'contain'}
          source={require(path + 'cystone3/title2.png')}
        />
        <Animated.Image
          style={{
            position: 'absolute',
            width: convertWidth('70%'),
            height: convertHeight('15%'),
            left: convertWidth('15%'),
            top: convertHeight('22%'),
            opacity: this.fadesubtitle2,
            //backgroundColor: '#000',
            borderWidth: 0,
          }}
          resizeMode={'contain'}
          source={require(path + 'cystone3/title3.png')}
        />
        <Animated.View
          style={[
            this.posTable.getLayout(),
            {
              position: 'absolute',

              opacity: this.fadetable,
              //backgroundColor:"#000"
            },
          ]}>
          <Animated.Image
            style={[
              {
                width: convertWidth('85%'),
                height: convertHeight('34%'),

                //backgroundColor:"#000"
              },
            ]}
            resizeMode={'contain'}
            source={require(path + 'cystone3/middlecenter.png')}
          />
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              left: '40%',
              top: '2%',
            }}>
            <Animated.Image
              style={{
                width: convertWidth('12.5%'),
                height: convertHeight('33%'),

                opacity: this.fadeicon1,
                // backgroundColor: "#000"
              }}
              resizeMode={'contain'}
              source={require(path + 'cystone3/fulliconi1.png')}
            />
            <Animated.Image
              style={{
                width: convertWidth('12.5%'),
                height: convertHeight('33%'),

                //backgroundColor: "#000",
                opacity: this.fadeicon2,
              }}
              resizeMode={'contain'}
              source={require(path + 'cystone3/fulliconi2.png')}
            />
            <Animated.Image
              style={{
                width: convertWidth('12.5%'),
                height: convertHeight('33%'),

                //backgroundColor: "#000",
                opacity: this.fadeicon3,
              }}
              resizeMode={'contain'}
              source={require(path + 'cystone3/fulliconi3.png')}
            />
          </View>
          <Animated.Image
            style={{
              //position: 'absolute',
              marginTop: moderateScale(10),
              alignSelf: 'center',
              width: convertWidth('70%'),
              height: convertHeight('17%'),
              //left: convertWidth('15%'),
              //top: convertHeight('70%'),
              opacity: this.fadefooter,
              //backgroundColor: '#000',
              borderWidth: 0,
            }}
            resizeMode={'contain'}
            source={require(path + 'cystone3/footertext.png')}
          />
        </Animated.View>
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
      Animated.timing(this.fadesubtitle2, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.timing(this.fadesubtitle3, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.parallel([
        Animated.timing(this.fadetable, {toValue: 1, duration: 1000}),
        Animated.spring(this.posTable, {
          toValue: {x: convertWidth('8%'), y: convertHeight('32%')},
          duration: 3000,
        }),
      ]),
      Animated.timing(this.fadeicon1, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.timing(this.fadeicon2, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.timing(this.fadeicon3, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.timing(this.fadefooter, {
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
export default Cystone_page4_core;
