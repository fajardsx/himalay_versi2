import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth } from '../../../../global/Global';
import Cystone_page7_pop1_core from "./cystone_page7_pop1";
import Cystone_page7_pop2_core from "./cystone_page7_pop2";
import Cystone_page7_pop3_core from "./cystone_page7_pop3";
import Cystone_page7_pop4_core from "./cystone_page7_pop4";
import Cystone_page7_pop5_core from "./cystone_page7_pop5";
import Cystone_page7_pop6_core from "./cystone_page7_pop6";

let path ='../../../../../assets/edetailing/';
class Cystone_page6_core extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data: null,
            datahospital: null,
            timers:0
        }

        //
      this.fadetitle = new Animated.Value(0);
      this.fadefooter = new Animated.Value(0);

      this.fadebar1 = new Animated.Value(0);
      this.fadebar2 = new Animated.Value(0);

      this.fadeIcon1 = new Animated.Value(0);
      this.fadeIcon2 = new Animated.Value(0);
      this.fadebtn1 = new Animated.Value(0);
      this.fadebtn2 = new Animated.Value(0);
      this.fadebtn3 = new Animated.Value(0);
      this.fadebtn4 = new Animated.Value(0);
      this.fadetable = new Animated.Value(0);
      this.postable = new Animated.ValueXY({ x: convertWidth("8%"), y: convertHeight("40%") });
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
    startTime(){
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
      return <Cystone_page7_pop1_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 2) {
      return <Cystone_page7_pop2_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 3) {
      return <Cystone_page7_pop3_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 4) {
      return <Cystone_page7_pop4_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 5) {
      return <Cystone_page7_pop5_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 6) {
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
              style={
                {
                  position: "absolute",
                  width: convertWidth("21%"),
                  height: convertHeight("7%"),
                  left: convertWidth('40%'),
                  top: convertHeight('5%'),
                  //borderWidth: 1,
                  //backgroundColor: '#FFFFFF',
                }
              }
              resizeMode={"contain"}
              source={require(path + "cystone1/title2.png")}
            />

            <Animated.View
              style={{
                position: "absolute",
                width: convertWidth("100%"),
                height: convertHeight("17%"),
                left: convertWidth("28%"),
                top: convertHeight("13%"),
                opacity: this.fadetitle,
                borderWidth: 0
              }}
              //resizeMode={"contain"}
             // source={require(path + "cytone5/title.png")}
            >
              <Text style={{
                color: "#EA5B1B",
                fontFamily: Constant.POPPINS_BOLD,
                // marginTop: convertWidth("0.2%"),
                width: convertWidth('50%'),
                textAlign: 'center',

                //borderWidth:1,
                fontSize: convertWidth('2.2%'),

              }}>Meta-Analysis Study (CMAS)</Text>
            </Animated.View>
            <View>
              <Animated.Image
                style={[this.postable.getLayout(), {
                  position: "absolute",
                  width: convertWidth("85%"),
                  height: convertHeight("50%"),
                  // backgroundColor: '#000',
                  opacity: this.fadetable,
                  borderWidth: 0
                }]}
                resizeMode={"contain"}
                source={require(path + "cytone5/bgtable.png")}
              />
              <View style={{ flexDirection: 'row', position: "absolute", left: convertWidth("12%"),
                   top: convertHeight("23%")}}>
                <Animated.Image
                  style={{
                    //position: "absolute",
                    width: convertWidth("28%"),
                    height: convertHeight("40%"),
                  //  left: convertWidth("12%"),
                   // top: convertHeight("26%"),
                    opacity: this.fadebar1,
                    //backgroundColor: '#000'
                  }}
                  resizeMode={"contain"}
                  source={require(path + "cytone5/bar1.png")}
                />
                <Animated.Image
                  style={{
                   // position: "absolute",
                    width: convertWidth("28%"),
                    height: convertHeight("40%"),
                  //  left: convertWidth("40%"),
                  //  top: convertHeight("26%"),
                    opacity: this.fadebar2,
                  }}
                  resizeMode={"contain"}
                  source={require(path + "cytone5/bar2.png")}
                />
                
              </View>
              <Animated.Image
                style={{
                  //position: "absolute",
                  width: convertWidth("12%"),
                  height: convertHeight("5%"),
                  left: convertWidth("58%"),
                  top: convertHeight("64%"),
                  opacity: this.fadebar2,

                }}
                resizeMode={"contain"}
                source={require(path + "cytone5/beforafter.png")}
              />
            </View>
            
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("70%"),
                height: convertHeight("9%"),
                left: convertWidth("11%"),
                top: convertHeight("70%"),
                opacity: this.fadefooter,
                //backgroundColor: '#000'
              }}
              resizeMode={"contain"}
              source={require(path + "cytone5/footer.png")}
            />
          
            
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("10%"),
                height: convertWidth("10%"),
                left: convertWidth("78%"),
                top: convertHeight("27%"),
                opacity: this.fadeIcon1,
                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "cytone5/starijo.png")}
            />
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("10%"),
                height: convertWidth("10%"),
                left: convertWidth("78%"),
                top: convertHeight("50%"),
                opacity: this.fadeIcon2,
                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "cytone5/staroren.png")}
            />
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
                opacity: this.fadebtn1,

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
                opacity: this.fadebtn2,

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
                opacity: this.fadebtn3,

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
                opacity: this.fadebtn4,

              }}>
                <TouchableOpacity
                  onPress={() => this._onBtnPopPress(6)}
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
            <View style={{ position: 'absolute' }}>
              {this._popShow(this.state.currentPop)}
            </View>
          </View>
        );
    }
  startAnim() {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.fadetitle, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.parallel([
        Animated.timing(this.fadetable, { toValue: 1, duration: 500 }),
        Animated.spring(this.postable, {
          toValue: { x: convertWidth("8%"), y: convertHeight("20%") },
          duration: 3000
        })
      ]),
      Animated.delay(300),
      Animated.timing(this.fadebar1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebar2, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadeIcon1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadeIcon2, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadefooter, { toValue: 1, duration: Constant.DURATION_FADE }),
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
export default Cystone_page6_core;