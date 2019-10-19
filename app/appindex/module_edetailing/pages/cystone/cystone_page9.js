import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth } from '../../../../global/Global';
import Cystone_page9_pop1_core from "./cystone_page9_pop1";
import Cystone_page9_pop2_core from "./cystone_page9_pop2";
import Cystone_page7_pop3_core from "./cystone_page7_pop3";
import Cystone_page7_pop6_core from "./cystone_page7_pop6";


let path ='../../../../../assets/edetailing/';
class Cystone_page9_core extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data: null,
            datahospital: null,
            currentPop:0,
          timers:0
        }

        this.fadetitle = new Animated.Value(0);
        this.fadesubtitle1 = new Animated.Value(0);

        this.fadeobat = new Animated.Value(0);
        this.fadeicon1 = new Animated.Value(0);
        this.fadeicon2 = new Animated.Value(0);

        this.fadebtn1 = new Animated.Value(0);
        this.fadebtn2 = new Animated.Value(0);
        this.fadebtn3 = new Animated.Value(0);
        
      this.posobat = new Animated.ValueXY({ x: convertWidth("38%"), y: convertHeight("27%") })
      this.posicon1 = new Animated.ValueXY({ x: convertWidth("10%"), y: convertHeight("45%") })
      this.posicon2 = new Animated.ValueXY({ x: convertWidth("55%"), y: convertHeight("45%") })
    }
    componentDidMount() {
        console.log(this.props.datas)
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
      return <Cystone_page9_pop1_core style={{position: 'absolute'}} onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 2) {
      return <Cystone_page9_pop2_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 3) {
      return <Cystone_page7_pop3_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 4) {
      return <Cystone_page7_pop6_core showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
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
              source={require(path + "cystone1/title.png")}
            />
            <View style={{width:convertWidth('100%'),marginTop: convertWidth('12%'),marginBottom: convertWidth('2%'),justifyContent:'center'}}>
              <Text style={styles.subStyle}>{"Observations on Cystone in Various Urinary Tract Complaints"}</Text>
            </View>
            
            <View style={{flexDirection: 'row',alignItems: 'center',width: convertWidth('100%'),justifyContent:"center",alignItems: 'center'}}>
              <Animated.Image
                style={
                  {
                    //position: "absolute",
                    width: convertWidth("80%"),
                    height: convertHeight("45%"),
                    //left: convertWidth('40%'),
                    //top: convertHeight('5%'),
                    //marginRight: convertWidth("5%"),

                    //backgroundColor: '#000',
                  }
                }
                resizeMode={"contain"}
                source={require(path + "cystone9/table1.png")}
              />
            </View>
            <View style={{ width: convertWidth('90%'), marginBottom: convertWidth('2%'), marginTop: convertWidth('2%'), justifyContent: 'center' }}>
              <Text style={styles.refStyle2}>Cystone sangat berguna dalam terapi kondisi saluran kemih, Cystone juga bermanfaat dalam keluhan saluran kemih selama kehamilan*</Text>
              <Text style={[styles.refStyle2, { fontFamily: Constant.POPPINS_ITALIC}]}>{"*The Med.& Surg.,(1987)"}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              left: convertWidth("61%"),
              top: convertHeight("82%"),
              position: "absolute"
            }}>
              <Animated.View style={{
                width: convertWidth("7%"),
                height: convertWidth("9%"),
                //marginRight: convertWidth("0.3%"),
               // opacity: this.fadebtn1,

              }}>
                <TouchableOpacity
                  onPress={() => this._onBtnPopPress(1)}
                >
                  <Image
                    style={{
                      //position: "absolute",
                      width: convertWidth("6.1%"),
                      height: convertWidth("9%"),

                      //backgroundColor:'#000'
                    }}
                    resizeMode={"contain"}
                    source={require(path + "cytone6/icon1.png")}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{
                width: convertWidth("7%"),
                height: convertWidth("9%"),
                //marginRight: convertWidth("0.3%"),
               // opacity: this.fadebtn2,

              }}>
                <TouchableOpacity
                  onPress={() => this._onBtnPopPress(2)}
                >
                  <Image
                    style={{
                      // position: "absolute",
                      width: convertWidth("6.1%"),
                      height: convertWidth("9%"),

                    }}
                    resizeMode={"contain"}
                    source={require(path + "cytone6/icon2.png")}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{
                width: convertWidth("7%"),
                height: convertWidth("9%"),
                //marginRight: convertWidth("0.3%"),
                //opacity: this.fadebtn3,

              }}>
                <TouchableOpacity
                  onPress={() => this._onBtnPopPress(3)}
                >
                  <Image
                    style={{
                      //position: "absolute",
                      width: convertWidth("6.1%"),
                      height: convertWidth("9%"),

                      //backgroundColor:'#000'
                    }}
                    resizeMode={"contain"}
                    source={require(path + "cytone6/icon3.png")}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{
                width: convertWidth("7%"),
                height: convertWidth("9%"),
                marginRight: convertWidth("0.3%"),
               // opacity: this.fadebtn4,

              }}>
                <TouchableOpacity
                  onPress={() => this._onBtnPopPress(4)}
                >
                  <Image
                    style={{
                      //position: "absolute",
                      width: convertWidth("7%"),
                      height: convertWidth("9%"),

                      //backgroundColor:'#000'
                    }}
                    resizeMode={"contain"}
                    source={require(path + "icons/icon_clinical_text.png")}
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
      Animated.timing(this.fadetitle, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadesubtitle1, { toValue: 1, duration: Constant.DURATION_FADE })
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

    },
    subStyle:{
      fontFamily: Constant.POPPINS_BOLD,
      textAlign: 'center',
      color: "#3C2415",
      //borderWidth:1,
      fontSize: convertWidth('2%'),
    },
    refStyle2: {
      fontFamily: Constant.POPPINS_REG,
    textAlign: 'right',
    //borderWidth:1,
    fontSize: convertWidth('1%'),
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
export default Cystone_page9_core;