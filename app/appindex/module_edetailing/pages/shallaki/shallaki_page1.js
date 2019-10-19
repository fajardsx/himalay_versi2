import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';
import Shallaki_page1_pop1_core from "./shallaki_page1_pop1";
import Shallaki_page1_pop3_core from "./shallaki_page1_pop3";
import Others_page5_clinical from "../others/others_page5_clinical";


let path = '../../../../../assets/edetailing/';
class Shallaki_page1_core extends React.Component {

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
    this.fadebtn1 = new Animated.Value(0);
    this.fadebtn2 = new Animated.Value(0);
    this.fadebtn3 = new Animated.Value(0);
    this.xTitle = new Animated.ValueXY({ x: convertWidth('63%'), y: convertHeight('26%') });
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


  _popShow(id = 0) {
    if (id == 0) {
      return null;
    } else if (id == 1) {
      return <Shallaki_page1_pop1_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 2) {
      return <Shallaki_page1_pop3_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 3) {
      return <Others_page5_clinical showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
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
            left: convertWidth("4%"),
            top: convertHeight("3%")
          }}
          resizeMode={"contain"}
          source={require(path + "bg/logo.png")}
        />
        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("36%"),
            height: convertWidth("36%"),
            left: convertWidth("10%"),
            top: convertHeight("25%"),
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
          source={require(path + "shallaki1/info.png")}
        />

        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("26%"),
            height: convertHeight("65%"),
            left: convertWidth("15%"),
            top: convertHeight("20%"),
            opacity: this.fadeProduk,
          //backgroundColor: '#000'
            //borderWidth: 1,
            //backgroundColor: '#FFFFFF',
          }}
          resizeMode={"contain"}
          source={require(path + "shallaki1/obat.png")}
        />

        <Animated.Image
          style={[
            this.xTitle.getLayout(),
            {
              position: "absolute",
              width: convertWidth("19%"),
             height: convertHeight("12%"),
              opacity: this.fadeTitle,
              //left: convertWidth('43%'),
              //top: convertHeight('5%'),
              //borderWidth: 1,
             //backgroundColor: '#000',
            }
          ]}
          resizeMode={"contain"}
          source={require(path + "shallaki1/title.png")}
        />
        
      
        <Animated.View style={{
          width: convertWidth("5%"),
          height: convertWidth("5%"),
          left: convertWidth("80%"),
          top: convertHeight("75%"),
          opacity: this.fadebtn1,
          position: "absolute",
          alignItems: 'center'

        }}
        >
          <TouchableOpacity
            onPress={() => this._onBtnPopPress(1)}
          >
            <Image
              style={{
                //position: "absolute",
                width: convertWidth("5%"),
                height: convertWidth("5%"),

                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "icons/icon_obat.png")}
            />
          </TouchableOpacity>
          <Text style={{
            color: "#EA5B1B",
            fontFamily: Constant.POPPINS_SEMIBOLD,
            // marginTop: convertWidth("0.2%"),
            width: convertWidth('7%'),
            textAlign: 'center',

            //borderWidth:1,
            fontSize: convertWidth('1.2%'),

          }}>Komposisi</Text>
        </Animated.View>   
        
        <Animated.View style={{
          width: convertWidth("5%"),
          height: convertWidth("5%"),
          left: convertWidth("86%"),
          opacity: this.fadebtn2,
          top: convertHeight("75%"), position: "absolute"
        }}>
          <TouchableOpacity
            onPress={() => this._onBtnPopPress(2)}
          >
            <Image
              style={{
                //position: "absolute",
                width: convertWidth("5%"),
                height: convertWidth("5%"),

                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "icons/icon_kimia.png")}
            />
          </TouchableOpacity>
          <Text style={{
            color: "#6E8562",
            fontFamily: Constant.POPPINS_SEMIBOLD,
            // marginTop: convertWidth("0.2%"),
            width: convertWidth('5%'),
            textAlign: 'center',

            //borderWidth:1,
            fontSize: convertWidth('1.2%'),

          }}>Dosis</Text>
        </Animated.View>
        <Animated.View style={{
          width: convertWidth("5%"),
          height: convertWidth("5%"),
          left: convertWidth("92%"),
          opacity: this.fadebtn3,
          top: convertHeight("75%"), position: "absolute"
        }}>
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => this._onBtnPopPress(3)}
          >
            <Image
              style={{
                //position: "absolute",
                width: convertWidth("6%"),
                height: convertWidth("9%"),

                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "icons/icon_clinical_text.png")}
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.Image
          style={
            {
              position: "absolute",
              width: convertWidth("50%"),
              height: convertHeight("10%"),
              opacity: this.fadeinfo,
              left: convertWidth('45%'),
              top: convertHeight('85%'),
              //borderWidth: 1,
              //backgroundColor: '#000',
            }
          }
          resizeMode={"contain"}
          source={require(path + "shallaki1/ref.png")}
        />
        {this._popShow(this.state.currentPop)}
      </View>
    );
  }

  //anim
  startAnim() {
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(this.fadeTitle, { toValue: 1, duration: Constant.DURATION_FADE }),
        Animated.spring(this.xTitle, { toValue: { x: convertWidth('48%'), y: convertHeight('26%') }, duration: 3000 })
      ]),
     
      Animated.timing(this.fadebulat, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadeProduk, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.parallel([
        Animated.timing(this.fadeinfo, { toValue: 1, duration: 500 }),
        Animated.spring(this.xinfo, { toValue: { x: convertWidth('20%'), y: convertHeight('36%') }, duration: 3000 })
      ]),
      Animated.timing(this.fadebtn1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn2, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn3, { toValue: 1, duration: Constant.DURATION_FADE }),
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
export default Shallaki_page1_core;