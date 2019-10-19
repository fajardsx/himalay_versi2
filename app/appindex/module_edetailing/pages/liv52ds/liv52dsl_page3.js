import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth } from '../../../../global/Global';
import Liv52ds_page3_pop1_core from "./liv52ds_page3_pop1";
import Liv52ds_page3_pop2_core from "./liv52ds_page3_pop2";
import Liv52ds_page3_pop3_core from "./liv52ds_page3_pop3";
import Liv52ds_page3_clinical from "./liv52ds_page3_clinical";





let path ='../../../../../assets/edetailing/';
class Liv52DS_page3_core extends React.Component {

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
      return <Liv52ds_page3_pop1_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 2) {
      return <Liv52ds_page3_pop2_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 3) {
      return <Liv52ds_page3_pop3_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 4) {
      return <Liv52ds_page3_clinical showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
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
              width: convertWidth("22%"),
              height: convertHeight("15%"),
              opacity: this.fadeTitle,
              left: convertWidth('38%'),
              top: convertHeight('2%'),
              //borderWidth: 1,
            //backgroundColor: '#000',
            }
          }
          resizeMode={"contain"}
          source={require(path + "liv52ds1/title2.png")}
        />

        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("78%"),
            height: convertHeight("11%"),
            left: convertWidth("10%"),
            top: convertHeight("15%"),
            opacity: this.fadesubtitle,
            //backgroundColor: '#000'
          }}
          resizeMode={"contain"}
          source={require(path + "liv52ds3/title_utama.png")}
        />
        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("25%"),
            height: convertHeight("50%"),
            left: convertWidth("10%"),
            top: convertHeight("26%"),
            opacity: this.fadebox1,
            //backgroundColor: '#000'
          }}
          resizeMode={"contain"}
          source={require(path + "liv52ds3/box1.png")}
        />
        <Animated.View
          style={{
            position: "absolute",
            width: convertWidth("55%"),
            height: convertHeight("45.5%"),
            left: convertWidth("36%"),
            top: convertHeight("27%"),
            opacity: this.fadebox2,
            // backgroundColor: '#000'
          }}
        >
          <Image
            style={{
            
              width: convertWidth("57%"),
              height: convertHeight("48.5%"),
            
              //opacity: this.fadebox2,
              //backgroundColor: '#000'
            }}
            resizeMode={"contain"}
            source={require(path + "liv52ds3/box2.png")}

            
          />
          <Image
            style={{
              position: "absolute",
              width: convertWidth("20%"),
              height: convertHeight("35%"),
              left: convertWidth("5%"),
              top: convertHeight("10%"),
              //opacity: this.fadebox2,
              //backgroundColor: '#000'
            }}
            resizeMode={"contain"}
            source={require(path + "liv52ds3/box2_img1.png")}
          />
          <Image
            style={{
              position: "absolute",
              width: convertWidth("22%"),
              height: convertHeight("35%"),
              left: convertWidth("30%"),
              top: convertHeight("10%"),
              //opacity: this.fadebox2,
              //backgroundColor: '#000'
            }}
            resizeMode={"contain"}
            source={require(path + "liv52ds3/box2_img2.png")}
          />
          </Animated.View>
          

          <View style={{
            flexDirection:'row',
          left: convertWidth("68%"),
          top: convertHeight("80%"),
          position: "absolute",
          }}>

          <Animated.View style={{
            width: convertWidth("5%"),
            height: convertWidth("5%"),

            opacity: this.fadebtn1,
            marginHorizontal: convertWidth('1%'),
            alignItems: 'center'

          }}
          >
            <TouchableOpacity
              onPress={() => this._onBtnPopPress(1)}
            >
              <Image
                style={{
                  // position: "absolute",
                  width: convertWidth("5%"),
                  height: convertWidth("5%"),


                }}
                resizeMode={"contain"}
                source={require(path + "icons/icon_indikasi.png")}
              />
            </TouchableOpacity>
            <Text style={{
              color: "#0D9B86",
              fontFamily: Constant.POPPINS_SEMIBOLD,
              marginTop: convertWidth("0.1%"),
              width: convertWidth('5%'),
              textAlign: 'center',

              //borderWidth:1,
              fontSize: convertWidth('1.1%'),

            }}>Indikasi</Text>
          </Animated.View>

          <Animated.View style={{
            width: convertWidth("5%"),
            height: convertWidth("5%"),
            //left: convertWidth("79.5%"),
            //top: convertHeight("75%"),
            opacity: this.fadebtn2,
           // position: "absolute"
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
                source={require(path + "icons/icon_obat.png")}
              />
            </TouchableOpacity>
            <Text style={{
              color: "#EA5B1B",
              fontFamily: Constant.POPPINS_SEMIBOLD,
              marginTop: convertWidth("0.1%"),
              width: convertWidth('5%'),
              textAlign: 'center',

              //borderWidth:1,
              fontSize: convertWidth('1.1%'),

            }}>Dosis</Text>
          </Animated.View>

          <Animated.View style={{
            width: convertWidth("5%"),
            height: convertWidth("5%"),
            //left: convertWidth("86%"),
            opacity: this.fadebtn3,
            alignItems: 'center',
            marginHorizontal:convertWidth('1%')
            //top: convertHeight("75%"), position: "absolute",
          }}>


            <TouchableOpacity
              onPress={() => this._onBtnPopPress(3)}
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
              marginTop: convertWidth("0.1%"),
              width: convertWidth('7%'),
              textAlign: 'center',

              //borderWidth:1,
              fontSize: convertWidth('1.1%'),

            }}>Komposisi</Text>
          </Animated.View>
          <Animated.View style={{
            width: convertWidth("5%"),
            height: convertWidth("5%"),
           // left: convertWidth("92%"),
            opacity: this.fadebtn4,
            //top: convertHeight("75%"), position: "absolute"
          }}>
            <TouchableOpacity
              style={{ justifyContent: 'center' }}
              onPress={() => this._onBtnPopPress(4)}
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
      Animated.timing(this.fadebtn4, { toValue: 1, duration: Constant.DURATION_FADE }),
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
export default Liv52DS_page3_core;