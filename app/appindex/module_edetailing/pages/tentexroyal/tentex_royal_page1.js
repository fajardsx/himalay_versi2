import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';

let path = '../../../../../assets/edetailing/';
class Tentex_Royal_page1_core extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myposition: {},
      data: null,
      datahospital: null,
      timers: 0
    }
    //lista anim
    this.fadeTitle = new Animated.Value(0);
    this.fadeSubTitle = new Animated.Value(0);
    this.fadebulat = new Animated.Value(0);
    this.fadeProduk = new Animated.Value(0);
    this.fadeinfo = new Animated.Value(0);
    this.faderef = new Animated.Value(0);
    this.xTitle = new Animated.ValueXY({ x: convertWidth('63%'), y: convertHeight('20%') });
    this.xSubTitle = new Animated.ValueXY({ x: convertWidth('63%'), y: convertHeight('30%') });
    this.xinfo = new Animated.ValueXY({ x: convertWidth('0%'), y: convertHeight('36%') });
    //this.xSubTitle = new Animated.ValueXY({ x:convertWidth('63%'), y: convertHeight('12%')});
  }
  componentDidMount() {
    //console.log(this.props.datas)
    this.setState({
      timers: Number(this.props.page_id.duration)
    }, () => {
      this.startAnim();
      this.startTime();
    });
  }
  componentWillUnmount() {

    this.props.page_id.duration = this.state.timers;
    ///console.log(this.props.page_id);
    clearInterval(this.timerinterval);
  }
  startTime() {
    this.timerinterval = setInterval(() => {
      this.setState((prevState) => ({
        timers: prevState.timers + 1
      }));
    }, 1000);
  }

  onEndPress = () => {
    this.props.onEnd(this.props.datas);
  }
  render() {
    const { datas } = this.props;
    return (
      <View
        style={{
          width: convertWidth("100%"),
          height: convertHeight("100%")
        }}
      >
        <Image
          style={{
            position: "absolute",
            width: convertWidth("15%"),
            height: convertHeight("6.5%"),
            left: convertWidth("81%"),
            top: convertHeight("2%")
          }}
          resizeMode={"contain"}
          source={require(path + "bg/logo.png")}
        />
        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("40%"),
            height: convertWidth("40%"),
            left: convertWidth("2%"),
            top: convertHeight("23%"),
            opacity: this.fadebulat,
            borderWidth: 1
          }}
          resizeMode={"contain"}
          source={require(path + "cystone1/obatimagebg.png")}
        />
        <Animated.Image
          style={[
            this.xinfo.getLayout(), {
              position: "absolute",
              width: convertWidth("75%"),
              height: convertHeight("35%"),
              opacity: this.fadeinfo,
              // backgroundColor: '#000'
            }]}
          resizeMode={"contain"}
          source={require(path + "tentexroyal1/info.png")}
        />

        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("35%"),
            height: convertHeight("31.2%"),
            left: convertWidth("2.2%"),
            top: convertHeight("38%"),
            opacity: this.fadeProduk,
           // backgroundColor: '#000'
            //borderWidth: 1,
            //backgroundColor: '#FFFFFF',
          }}
          // resizeMode={"contain"}
          source={require(path + "tentexroyal1/obat.png")}
        />

        <Animated.Image
          style={[
            this.xTitle.getLayout(),
            {
              position: "absolute",
              width: convertWidth("30%"),
              height: convertHeight("10%"),
              opacity: this.fadeTitle,
              //left: convertWidth('43%'),
              //top: convertHeight('5%'),
              //borderWidth: 1,
              //backgroundColor: '#FFFFFF',
            }
          ]}
          resizeMode={"contain"}
          source={require(path + "tentexroyal1/title.png")}
        />
        <Animated.View
          style={[
            this.xSubTitle.getLayout(),
            {
              position: "absolute",
              width: convertWidth("45%"),
              height: convertHeight("5%"),
              opacity: this.fadeSubTitle,
              // backgroundColor: '#FFFFFF',
            }
          ]}
          //resizeMode={"contain"}
          //source={require(path + "cystone1/title_sub.png")}
        >
          <Text style={{
            color: "#EA5B1B",
            fontFamily: Constant.POPPINS_SEMIBOLD,
            // marginTop: convertWidth("0.2%"),
            width: convertWidth('50%'),
            //textAlign: 'center',

            //borderWidth:1,
            fontSize: convertWidth('2%'),

          }}>Meningkatkan hasrat dan performa seksual</Text>
        </Animated.View>

      </View>
    );
  }

  //anim
  startAnim() {
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(this.fadeTitle, { toValue: 1, duration: Constant.DURATION_FADE }),
        Animated.spring(this.xTitle, { toValue: { x: convertWidth('38%'), y: convertHeight('20%') }, duration: 3000 })
      ]),
      Animated.parallel([
        Animated.timing(this.fadeSubTitle, { toValue: 1, duration: 500 }),
        Animated.spring(this.xSubTitle, { toValue: { x: convertWidth('38%'), y: convertHeight('30%') }, duration: 3000 })
      ]),
      Animated.timing(this.fadebulat, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadeProduk, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.parallel([
        Animated.timing(this.fadeinfo, { toValue: 1, duration: 500 }),
        Animated.spring(this.xinfo, { toValue: { x: convertWidth('20%'), y: convertHeight('36%') }, duration: 3000 })
      ]),
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
    flex: 1, justifyContent: "center", alignItems: "center", height: 50,
    backgroundColor: "#eeeeee",
    margin: 10
  },
  TextTitle: {
    color: "#eeeeee",
    fontFamily: Constant.POPPINS_SEMIBOLD,
    width: convertWidth('20%'),
    textAlign: 'center',
    //borderWidth:1,
    fontSize: convertWidth('1.8%'),

  }
});
/*
   <TouchableOpacity
                style={[Styleapp._buttons, Styleapp._bubble]}
                onPress={() => this.onOpenSignature()}
            >
                <Text>Signature Page</Text>
            </TouchableOpacity>
*/
export default Tentex_Royal_page1_core;