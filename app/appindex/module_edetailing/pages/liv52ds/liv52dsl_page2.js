import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth } from '../../../../global/Global';





let path ='../../../../../assets/edetailing/';
class Liv52DS_page2_core extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myposition: {},
      data: null,
      datahospital: null,
      currentPop:0,
      timers: 0
    }

    //
    this.fadetitle = new Animated.Value(0);
    this.fadesubtitle = new Animated.Value(0);

    this.fadebox1 = new Animated.Value(0);
    this.fadebox2 = new Animated.Value(0);
    this.fadebox3 = new Animated.Value(0);



    this.fadebtn1 = new Animated.Value(0);
    this.fadebtn2 = new Animated.Value(0);
    this.fadebtn3 = new Animated.Value(0);
  }
  componentDidMount() {
    // console.log(this.props.datas)
    this.setState({
      timers: Number(this.props.page_id.duration)
    }, () => {
      this.startAnim();
      this.startTime();
    });
  }
  componentWillUnmount() {

    this.props.page_id.duration = this.state.timers;
    console.log(this.props.page_id);
    clearInterval(this.timerinterval);
  }
  startTime() {
    this.timerinterval = setInterval(() => {
      this.setState((prevState) => ({
        timers: prevState.timers + 1
      }));
    }, 1000);
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
          style={
            {
              position: "absolute",
              width: convertWidth("22%"),
              height: convertHeight("15%"),
              opacity: this.fadeTitle,
              left: convertWidth('38%'),
              top: convertHeight('5%'),
            }
          }
          resizeMode={"contain"}
          source={require(path + "liv52ds1/title2.png")}
        />

        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("70%"),
            height: convertHeight("17%"),
            left: convertWidth("15%"),
            top: convertHeight("14%"),
            opacity: this.fadesubtitle,
            borderWidth: 0
          }}
          resizeMode={"contain"}
          source={require(path + "liv52ds2/title_utama.png")}
        />
        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("23%"),
            height: convertHeight("50%"),
            left: convertWidth("10%"),
            top: convertHeight("25%"),
            opacity: this.fadebox1,
            // backgroundColor: '#000'
          }}
          resizeMode={"contain"}
          source={require(path + "liv52ds2/box1.png")}
        />
        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("23%"),
            height: convertHeight("50%"),
            left: convertWidth("39%"),
            top: convertHeight("25%"),
            opacity: this.fadebox2,
            //backgroundColor: '#000'
          }}
          resizeMode={"contain"}
          source={require(path + "liv52ds2/box2.png")}
        />
        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("23%"),
            height: convertHeight("50%"),
            left: convertWidth("68%"),
            top: convertHeight("25%"),
            opacity: this.fadebox3,
            //backgroundColor: '#000'
          }}
          resizeMode={"contain"}
          source={require(path + "liv52ds2/box3.png")}
        />
       
        
       
       

       
      </View>
    );
  }
  startAnim() {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.fadetitle, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadesubtitle, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebox1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebox2, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebox3, { toValue: 1, duration: Constant.DURATION_FADE }),
    
      Animated.timing(this.fadebtn1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn2, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn3, { toValue: 1, duration: Constant.DURATION_FADE })
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
export default Liv52DS_page2_core;