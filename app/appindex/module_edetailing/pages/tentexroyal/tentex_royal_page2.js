import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth } from '../../../../global/Global';
import Tentex_royal_page2_pop1_core from "./tentex_royal_page2_pop1";
import Tentex_royal_page2_pop2_core from "./tentex_royal_page2_pop2";
import Tentex_royal_page2_clinical from "./tentex_royal_page2_clinical";




let path ='../../../../../assets/edetailing/';
class Tentex_Royal_page2_core extends React.Component {

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
    this.fadebtn4 = new Animated.Value(0);
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
  _popShow(id = 0) {
    if (id == 0) {
      return null;
    } else if (id == 1) {
      return <Tentex_royal_page2_pop1_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 2) {
      return <Tentex_royal_page2_pop2_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 3) {
      return <Tentex_royal_page2_clinical showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
    } 

  }
  _onBtnPopPress(id) {
    this.setState({
      currentPop: id
    })
  }
  _onBtnPopClosePress() {
    this.setState({
      currentPop: 0
    })
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
              width: convertWidth("25%"),
              height: convertHeight("6%"),
              left: convertWidth('40%'),
              top: convertHeight('5%'),
              //borderWidth: 1,
              //backgroundColor: '#FFFFFF',
            }
          }
          resizeMode={"contain"}
          source={require(path + "tentexroyal1/title2.png")}
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
          source={require(path + "tentexroyal2/subtitle.png")}
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
          source={require(path + "tentexroyal2/box1.png")}
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
          source={require(path + "tentexroyal2/box2.png")}
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
          source={require(path + "tentexroyal2/box3.png")}
        />

         
          <View style={{flexDirection: 'row',
          left: convertWidth("71%"),
          top: convertHeight("80%"),
          position: "absolute"
        }}>
          <Animated.View style={{
            width: convertWidth("7%"),
            height: convertWidth("9%"),
           // left: convertWidth("80%"),
           // top: convertHeight("75%"),
            opacity: this.fadebtn2,
            //position: "absolute"
          }}>
            <TouchableOpacity
              onPress={() => this._onBtnPopPress(1)}
            >
              <Image
                style={{
                  // position: "absolute",
                  width: convertWidth("5.2%"),
                  height: convertWidth("5.2%"),

                }}
                resizeMode={"contain"}
                source={require(path + "icons/icon_indikasi.png")}
              />
              <Text style={{
                color: "#0D9B86",
                fontFamily: Constant.POPPINS_SEMIBOLD,
                marginTop: convertWidth("0.2%"),
                width: convertWidth('5%'),
                textAlign: 'center',

                //borderWidth:1,
                fontSize: convertWidth('1%'),

              }}>Indikasi</Text>
            </TouchableOpacity>
          </Animated.View>
      
          <Animated.View style={{
            width: convertWidth("7%"),
            height: convertWidth("8%"),
            //left: convertWidth("86%"),
            opacity: this.fadebtn3,
            //top: convertHeight("75%"), position: "absolute"
          }}>
            <TouchableOpacity
              onPress={() => this._onBtnPopPress(2)}
            >
              <Image
                style={{
                  //position: "absolute",
                  width: convertWidth("5.3%"),
                  height: convertWidth("7.2%"),


                  //backgroundColor:'#000'
                }}
                resizeMode={"contain"}
                source={require(path + "cytone6/icon3.png")}
              />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{
            width: convertWidth("5%"),
            height: convertWidth("5%"),
           // left: convertWidth("92%"),
            opacity: this.fadebtn4,
           // top: convertHeight("75.3%"), position: "absolute"
          }}>
            <TouchableOpacity
              style={{ justifyContent: 'center' }}
              onPress={() => this._onBtnPopPress(3)}
            >
              <Image
                style={{
                  //position: "absolute",
                  width: convertWidth("6.2%"),
                  height: convertWidth("9%"),

                  //backgroundColor:'#000'
                }}
                resizeMode={"contain"}
                source={require(path + "icons/icon_clinical_text.png")}
              />
            </TouchableOpacity>
          </Animated.View>
          </View>
           
        {this._popShow(this.state.currentPop)}
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
      Animated.timing(this.fadebtn3, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn4, { toValue: 1, duration: Constant.DURATION_FADE })
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
export default Tentex_Royal_page2_core;