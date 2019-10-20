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
class Cystone_page5_core extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myposition: {},
      data: null,
      datahospital: null,
      timers: 0,
    };
    //list

    this.fadetitle = new Animated.Value(0);
    this.fadefooter = new Animated.Value(0);

    this.fadelambung1 = new Animated.Value(0);
    this.fadelambung2 = new Animated.Value(0);
    this.fadelambung3 = new Animated.Value(0);
    this.fadetable = new Animated.Value(0);
    this.postable = new Animated.ValueXY({
      x: convertWidth('8%'),
      y: convertHeight('40%'),
    });
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
            width: convertWidth('85%'),
            height: convertHeight('20%'),
            left: convertWidth('8%'),
            top: moderateScale(30),
            opacity: this.fadetitle,
            borderWidth: 1,
          }}
          resizeMode={'contain'}
          source={require(path + 'cytone4/title.png')}
        />
        <View style={{borderWidth: 0}}>
          <Animated.Image
            style={[
              this.postable.getLayout(),
              {
                width: moderateScale(650),

                opacity: this.fadetable,
                borderWidth: 0,
              },
            ]}
            resizeMode={'contain'}
            source={require(path + 'cytone4/middletable.png')}
          />
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              left: '40%',
              top: '20%',
            }}>
            <Animated.Image
              style={{
                width: moderateScale(133 * 0.65),
                height: moderateScale(182 * 0.65),
                marginRight: 50,
                opacity: this.fadelambung1,
              }}
              resizeMode={'contain'}
              source={require(path + 'cytone4/lambung1.png')}
            />
            <Animated.Image
              style={{
                width: moderateScale(133 * 0.65),
                height: moderateScale(182 * 0.65),
                marginRight: 50,

                opacity: this.fadelambung2,
              }}
              resizeMode={'contain'}
              source={require(path + 'cytone4/lambung2.png')}
            />
            <Animated.Image
              style={{
                width: moderateScale(133 * 0.65),
                height: moderateScale(182 * 0.65),
                marginRight: 10,

                opacity: this.fadelambung3,
              }}
              resizeMode={'contain'}
              source={require(path + 'cytone4/lambung3.png')}
            />
          </View>
        </View>

        <Animated.Image
          style={{
            width: convertWidth('79%'),
            height: convertHeight('18%'),
            alignSelf: 'center',
            opacity: this.fadefooter,
            // backgroundColor: '#000',
            borderWidth: 0,
          }}
          resizeMode={'contain'}
          source={require(path + 'cytone4/footer.png')}
        />
      </View>
    );
  }
  //

  startAnim() {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.fadetitle, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.parallel([
        Animated.timing(this.fadetable, {toValue: 1, duration: 500}),
        Animated.spring(this.postable, {
          toValue: {x: convertWidth('8%'), y: 0},
          duration: 3000,
        }),
      ]),
      Animated.delay(200),
      Animated.timing(this.fadelambung1, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.timing(this.fadelambung2, {
        toValue: 1,
        duration: Constant.DURATION_FADE,
      }),
      Animated.timing(this.fadelambung3, {
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
export default Cystone_page5_core;
