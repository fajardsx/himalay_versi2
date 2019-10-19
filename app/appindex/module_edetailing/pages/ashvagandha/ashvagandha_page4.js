import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';
import Ashavandha_page4_pop1_core from "./ashvagandha_page4_pop1";
import Ashvagandha_page1_clinical from "./ashvagandha_page4_clinical";
import Ashvagandha_page4_clinical from "./ashvagandha_page4_clinical";


let path = '../../../../../assets/edetailing/';
class Ashvagandha_page4_core extends React.Component {

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
    this.fadeinfo = new Animated.Value(0);
    this.fadeinfo2 = new Animated.Value(0);
    this.fadeinfo3 = new Animated.Value(0);
    this.fadebtn1 = new Animated.Value(0);
    this.fadebtn2 = new Animated.Value(0);
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

  _popShow(id = 0) {
    if (id == 0) {
      return null;
    } else if (id == 1) {
      return <Ashavandha_page4_pop1_core onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 2) {
      return <Ashvagandha_page4_clinical showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
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
            top: convertHeight("3%")
          }}
          resizeMode={"contain"}
          source={require(path + "bg/logo.png")}
        />
      
         <View>
          <Animated.Image
            style={
              {
                position: "absolute",
                width: convertWidth("24%"),
                height: convertHeight("59%"),
                opacity: this.fadeinfo,
                left: convertWidth('8%'),
                top: convertHeight('20%'),
                //borderWidth: 1,
                //backgroundColor: '#000',
              }
            }
            resizeMode={"contain"}
            source={require(path + "ashvagandha4/box1.png")}
          />
          <Animated.Image
            style={
              {
                position: "absolute",
                width: convertWidth("24%"),
                height: convertHeight("59%"),
                opacity: this.fadeinfo2,
                left: convertWidth('37%'),
                top: convertHeight('20%'),
                //borderWidth: 1,
                //backgroundColor: '#000',
              }
            }
            resizeMode={"contain"}
            source={require(path + "ashvagandha4/box2.png")}
          />
          <Animated.Image
            style={
              {
                position: "absolute",
                width: convertWidth("24%"),
                height: convertHeight("59%"),
                opacity: this.fadeinfo3,
                left: convertWidth('66%'),
                top: convertHeight('20%'),
                //borderWidth: 1,
                //backgroundColor: '#000',
              }
            }
            resizeMode={"contain"}
            source={require(path + "ashvagandha4/box3.png")}
          />
         </View>
       

         <Animated.Image
          style={
            {
              position: "absolute",
              width: convertWidth("39%"),
              height: convertWidth("9%"),
              opacity: this.faderef,
              left: convertWidth('8%'),
              top: convertHeight('80%'),
              //borderWidth: 1,
              //backgroundColor: '#000',
            }
          }
          resizeMode={"contain"}
          source={require(path + "ashvagandha4/ref.png")}
        />

        <Animated.Image
          style={
            {
              position: "absolute",
              width: convertWidth("30%"),
              height: convertHeight("14%"),
              opacity: this.fadeTitle,
              left: convertWidth('36%'),
              //top: convertHeight('5%'),
              //borderWidth: 1,
              //backgroundColor: '#000',
            }
          }
          resizeMode={"contain"}
          source={require(path + "ashvagandha1/title2.png")}
        />
       
        <TouchableOpacity
          style={{
            position: "absolute",
            width: convertWidth("5%"),
            height: convertWidth("5%"),
            left: convertWidth("85%"),
            top: convertHeight("80%"),
          // backgroundColor: '#000'
          }}
          onPress={() => this._onBtnPopPress(1)}
        >
          <Animated.View style={{
            width: convertWidth("8%"),
            height: convertWidth("5%"),
         
            opacity: this.fadebtn1,
            position: "absolute"
          }}>
            <Image
              style={{
                // position: "absolute",
                width: convertWidth("5%"),
                height: convertWidth("5%"),

              }}
              resizeMode={"contain"}
              source={require(path + "icons/icon_indikasi.png")}
            />
            <Text style={{
              color: "#0D9B86",
              fontFamily: Constant.POPPINS_SEMIBOLD,
              // marginTop: convertWidth("0.2%"),
              width: convertWidth('5%'),
              textAlign: 'center',

              //borderWidth:1,
              fontSize: convertWidth('1.2%'),

            }}>Indikasi</Text>
          </Animated.View>
        </TouchableOpacity>
    
        
        <Animated.View style={{
          width: convertWidth("5%"),
          height: convertWidth("5%"),
          left: convertWidth("92%"),
          opacity: this.fadebtn2,
          top: convertHeight("80%"), position: "absolute"
        }}>
          <TouchableOpacity
            style={{ justifyContent: 'center'}}
            onPress={() => this._onBtnPopPress(2)}
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
        Animated.spring(this.xTitle, { toValue: { x: convertWidth('47%'), y: convertHeight('20%') }, duration: 3000 })
      ]),
      Animated.timing(this.fadebulat, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadeProduk, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadeinfo, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadeinfo2, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadeinfo3, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn2, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.faderef, { toValue: 1, duration: Constant.DURATION_FADE }),
     
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
export default Ashvagandha_page4_core;