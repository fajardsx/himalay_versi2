import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';
import Kapikachhu_page1_pop1_core from "./kapikachhu_page1_pop1";
import Kapikachhu_page1_clinical from "./kapikachhu_page1_clinical";

let path = '../../../../../assets/edetailing/';
class Kapikachhu_page1_core extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myposition: {},
      data: null,
      datahospital: null,
      timers: 0,
      currentPop:0
    }
    //lista anim
    this.fadeTitle = new Animated.Value(0);
    this.fadeSubTitle = new Animated.Value(0);

    this.xTitle = new Animated.ValueXY({ x: convertWidth('63%'), y: convertHeight('15%') });
    this.xSubTitle = new Animated.ValueXY({ x: convertWidth('63%'), y: convertHeight('25%') });
   
    this.fadebox1 = new Animated.Value(0);
    this.fadebox2 = new Animated.Value(0);
    this.fadebox3 = new Animated.Value(0);
    this.fadebtn1 = new Animated.Value(0);
    this.fadebtn2 = new Animated.Value(0);
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
      return <Kapikachhu_page1_pop1_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 2) {
      return <Kapikachhu_page1_clinical showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
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
          style={[
            this.xTitle.getLayout(),
            {
              position: "absolute",
              width: convertWidth("33%"),
              height: convertHeight("10%"),
              opacity: this.fadeTitle,
              //left: convertWidth('43%'),
              //top: convertHeight('5%'),
              //borderWidth: 1,
              //backgroundColor: '#FFFFFF',
            }
          ]}
          resizeMode={"contain"}
          source={require(path + "kapikachhu1/title.png")}
        />
        <Animated.View
          style={[
            this.xSubTitle.getLayout(),
            {
              position: "absolute",
              width: convertWidth("35%"),
              height: convertHeight("5%"),
              opacity: this.fadeSubTitle,
              // backgroundColor: '#FFFFFF',
            }
          ]}
          //resizeMode={"contain"}
          //source={require(path + "kapikachhu1/subtitle.png")}
        >
          <Text style={{
            color: "#EA5B1B",
            fontFamily: Constant.POPPINS_SEMIBOLD,
            // marginTop: convertWidth("0.2%"),
            width: convertWidth('90%'),
            //textAlign: 'center',

            //borderWidth:1,
            fontSize: convertWidth('1.5%'),

          }}>{"Meningkatakan parameter penting sperma"}</Text>
        </Animated.View>
        <Animated.View
          style={[
            this.xSubTitle.getLayout(),
            {
              position: "absolute",
              marginTop:convertHeight('4%'),
              width: convertWidth("88%"),
              height: convertHeight("7%"),
              opacity: this.fadeSubTitle,
              //backgroundColor: 'gray',
            }
          ]}
         // resizeMode={"contain"}
          //source={require(path + "kapikachhu1/info.png")}
        >
          <Text style={{
            color: "#3C2415",
            fontFamily: Constant.POPPINS_MEDIUM,
            // marginTop: convertWidth("0.2%"),
            width: convertWidth('95%'),
            //textAlign: 'center',

            //borderWidth:1,
            fontSize: convertWidth('1.78%'),

          }}>{"Mucuna pruriens improves male fertility by its action on the hypothalamus – pituitary - gonadal\naxis - Fertility and Sterility 2008"}</Text>
        </Animated.View>
        <View style={{ flexDirection: 'row', position: "absolute", left: convertWidth("5%"),
            top: convertHeight("39%"),}}>
          <Animated.Image
            style={{
              //position: "absolute",
              width: convertWidth("25%"),
              height: convertHeight("45%"),
              //left: convertWidth("7%"),
             // top: convertHeight("38%"),
              opacity: this.fadebox1,
              //backgroundColor: 'gray',
            }}
            resizeMode={"contain"}
            source={require(path + "kapikachhu1/box1.png")}
          />
          <Animated.Image
            style={{
              //position: "absolute",
              width: convertWidth("25%"),
              height: convertHeight("45%"),
              //left: convertWidth("32%"),
             // top: convertHeight("38%"),
              marginHorizontal: convertWidth("2%"),
              opacity: this.fadebox2,
              //backgroundColor: '#000'
            }}
            resizeMode={"contain"}
            source={require(path + "kapikachhu1/box2.png")}
          />
          <Animated.Image
            style={{
             // position: "absolute",
              width: convertWidth("25%"),
              height: convertHeight("45%"),
             // left: convertWidth("57%"),
              //top: convertHeight("38%"),
              
              opacity: this.fadebox3,
              //backgroundColor: '#000'
            }}
            resizeMode={"contain"}
            source={require(path + "kapikachhu1/box3.png")}
          />
        </View>
       
        <Animated.View style={{
          width: convertWidth("7%"),
          height: convertWidth("9%"),
          left: convertWidth("85%"),
          top: convertHeight("75%"),
          opacity: this.fadebtn1,
          position: "absolute"
        }}>
              <TouchableOpacity
          onPress={() => this._onBtnPopPress(1)}
        >
          <Image
            style={{
              //position: "absolute",
                width: convertWidth("5.3%"),
                height: convertWidth("7.5%"),

              //backgroundColor:'#000'
            }}
            resizeMode={"contain"}
            source={require(path + "cytone6/icon1.png")}
          />
        </TouchableOpacity>
            </Animated.View>
        <Animated.View style={{
          width: convertWidth("5%"),
          height: convertWidth("5%"),
          left: convertWidth("92%"),
          opacity: this.fadebtn2,
          top: convertHeight("75.3%"), position: "absolute"
        }}>
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => this._onBtnPopPress(2)}
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
        Animated.spring(this.xTitle, { toValue: { x: convertWidth('5%'), y: convertHeight('15%') }, duration: 3000 })
      ]),
      Animated.parallel([
        Animated.timing(this.fadeSubTitle, { toValue: 1, duration: 500 }),
        Animated.spring(this.xSubTitle, { toValue: { x: convertWidth('5%'), y: convertHeight('25%') }, duration: 3000 })
      ]),
      Animated.timing(this.fadebox1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebox2, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebox3, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn2, { toValue: 1, duration: Constant.DURATION_FADE })
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
export default Kapikachhu_page1_core;