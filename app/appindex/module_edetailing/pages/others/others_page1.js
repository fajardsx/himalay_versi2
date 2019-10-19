import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';
import Others_page1_pop1_core from "./others_page1_pop1";
import Others_page1_pop2_core from "./others_page1_pop2";
import Others_page1_pop3_core from "./others_page1_pop3";
import Others_page1_pop4_core from "./others_page1_pop4";
import Others_page1_pop5_core from "./others_page1_pop5";

let path = '../../../../../assets/edetailing/';
class Others_page1_core extends React.Component {

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
    this.fadebox1 = new Animated.Value(0);
    this.fadebox2 = new Animated.Value(0);
    this.fadebox3 = new Animated.Value(0);
    this.fadebox4 = new Animated.Value(0);
    this.fadebox5 = new Animated.Value(0);
    this.xTitle = new Animated.ValueXY({ x: convertWidth('63%'), y: convertHeight('30%') });
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
      return <Others_page1_pop1_core showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 2) {
      return <Others_page1_pop2_core showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 3) {
      return <Others_page1_pop3_core showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 4) {
      return <Others_page1_pop4_core showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
    } else if (id == 5) {
      return <Others_page1_pop5_core showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
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
        <Animated.Image
          style={{
            //position: "absolute",
            width: convertWidth("20%"),
            height: convertHeight("11%"),
            alignSelf: 'center',
            marginTop: convertHeight("11%"),
            opacity:this.fadeTitle
            //backgroundColor:"#000"
          }}
          resizeMode={"contain"}
          source={require(path + "bg/logo.png")}
        />
        <View style={{ flexDirection: 'row', marginTop: convertHeight("5%"), width: convertWidth("100%"),justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => this._onBtnPopPress(1)}
          >
            <Animated.Image
              style={{
                //position: "absolute",
                marginHorizontal: convertWidth("3%"),
                width: convertWidth("18%"),
                height: convertHeight("23%"),
                opacity: this.fadebox1
                //alignSelf: 'center',
                //marginTop: convertHeight("11%"),
               // backgroundColor: "#000"
              }}
              resizeMode={"contain"}
              source={require(path + "others1/btnbox1.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this._onBtnPopPress(2)}
          >
            <Animated.Image
              style={{
                marginHorizontal: convertWidth("3%"),
                width: convertWidth("18%"),
                height: convertHeight("23%"),
                opacity: this.fadebox2
                //alignSelf: 'center',
                //marginTop: convertHeight("11%"),
               // backgroundColor: "#000"
              }}
              resizeMode={"contain"}
              source={require(path + "others1/btnbox2.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this._onBtnPopPress(3)}
          >
            <Animated.Image
              style={{
                marginHorizontal: convertWidth("3%"),
                width: convertWidth("18%"),
                height: convertHeight("23%"),
                opacity: this.fadebox3
                //alignSelf: 'center',
                //marginTop: convertHeight("11%"),
               // backgroundColor: "#000"
              }}
              resizeMode={"contain"}
              source={require(path + "others1/btnbox3.png")}
            />
          </TouchableOpacity>
          
        </View>
        <View style={{ flexDirection: 'row', marginTop: convertHeight("5%"), width: convertWidth("100%"), justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => this._onBtnPopPress(4)}
          >
            <Animated.Image
              style={{
                //position: "absolute",
                marginHorizontal: convertWidth("3%"),
                width: convertWidth("18%"),
                height: convertHeight("23%"),
                opacity: this.fadebox4
                //alignSelf: 'center',
                //marginTop: convertHeight("11%"),
                // backgroundColor: "#000"
              }}
              resizeMode={"contain"}
              source={require(path + "others1/btnbox4.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this._onBtnPopPress(5)}
          >
            <Animated.Image
              style={{
                marginHorizontal: convertWidth("3%"),
                width: convertWidth("18%"),
                height: convertHeight("23%"),
                opacity: this.fadebox5
                //alignSelf: 'center',
                //marginTop: convertHeight("11%"),
                // backgroundColor: "#000"
              }}
              resizeMode={"contain"}
              source={require(path + "others1/btnbox5.png")}
            />
          </TouchableOpacity>


        </View>
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
        Animated.spring(this.xTitle, { toValue: { x: convertWidth('45%'), y: convertHeight('30%') }, duration: 3000 })
      ]),
     
      Animated.timing(this.fadebox1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebox2, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebox3, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebox4, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebox5, { toValue: 1, duration: Constant.DURATION_FADE }),
     
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
export default Others_page1_core;