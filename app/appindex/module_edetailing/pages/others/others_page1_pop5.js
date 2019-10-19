import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';
import Others_page5_clinical from "./others_page5_clinical";
let path = '../../../../../assets/edetailing/';
//SHALLAKI
class Others_page1_pop5_core extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myposition: {},
      data: null,
      datahospital: null,
      timers: 0,
      currentPop:0
    }
   
    //this.xSubTitle = new Animated.ValueXY({ x:convertWidth('63%'), y: convertHeight('12%')});
  }
  componentDidMount() {
    
  }
  _popShow(id = 0) {
    if (id == 0) {
      return null;
    } else if (id == 1) {
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

  onEndPress = () => {
    this.props.onEnd(this.props.datas);
  }
  render() {
    const { datas } = this.props;
    return (
      <View
        style={{
          position: 'absolute',
          width: convertWidth("100%"),
          height: convertHeight("100%"),
          backgroundColor: "rgba( 255, 255, 255, 0.5) ",
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
       
        <View style={{
          width: convertWidth("95%"),
          height: convertHeight("90%"),
          
          backgroundColor: '#fff',
         // position: 'absolute',
          overflow: 'hidden',
          borderColor: '#dddbd3',
          borderRadius: convertHeight('1%'),
          borderWidth: convertHeight('1%'),
        }}>
            <Animated.Image
              style={{
                //marginHorizontal: convertWidth("3%"),
                width: convertWidth("25%"),
                height: convertHeight("16%"),
                opacity: this.fadebox3,
                marginLeft: convertWidth("20%"),
                marginTop: convertHeight("2%"),
               // backgroundColor: "#000"
              }}
              resizeMode={"contain"}
            source={require(path + "others1/pop5_title.png")}
            />
                <View>
                   
            <View style={{ backgroundColor: "#EFEFE6", height: convertHeight('32%'), width: convertWidth('65%'), top: convertHeight('2%'), marginLeft: convertWidth('20%') }}>
                        <View style={{ top: convertWidth('2%'), marginLeft: convertWidth('7%') }}>
                        <View style={{ flexDirection: 'row' }}><Text style={[styles.TextContent, { width: convertWidth('2%') }]}>{"•"}</Text><Text style={styles.TextContent}>{"Membantu menjaga persendian tetap sehat"}</Text></View>
                <View style={{ flexDirection: 'row' }}><Text style={[styles.TextContent, { width: convertWidth('2%') }]}>{"•"}</Text><Text style={styles.TextContent}>{"Asam boswellic secara signifikan memiliki efek sebagai \nanti-inflamasi (anti-peradangan)"}</Text></View>
                        <View style={{ flexDirection: 'row' }}><Text style={[styles.TextContent, { width: convertWidth('2%') }]}>{"•"}</Text><Text style={styles.TextContent}>{"Mengurangi nyeri dan meningkatkan kelenturan sendi"}</Text></View>
                <View style={{ flexDirection: 'row' }}><Text style={[styles.TextContent, { width: convertWidth('2%') }]}>{"•"}</Text><Text style={styles.TextContent}>{"Aman dan nyaman digunakan (tidak mengiritasi lambung dan \naman untuk pasien dengan gangguan lambung)"}</Text></View>

                      </View>
            
                    </View>
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("17%"),
                height: convertWidth("17%"),
                left: convertWidth("8.5%"),
                marginTop: convertHeight("5%"),
                opacity: this.fadebulat,

              }}
              resizeMode={"contain"}
              source={require(path + "cystone1/obatimagebg.png")}
            />
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("23%"),
                height: convertWidth("19%"),
                left: convertWidth("5%"),
                marginTop: convertHeight("3%"),
                opacity: this.fadebulat,
                //backgroundColor: '#000'
              }}
              resizeMode={"contain"}
              source={require(path + "others1/pop5_obat.png")}
            />
            <Animated.Image
              style={{
                //position: "absolute",
                width: convertWidth("85%"),
                height: convertHeight("25%"),
                left: convertWidth("4.5%"),
                marginTop: convertHeight("5%"),
                opacity: this.fadebulat,
                //backgroundColor: '#000'
              }}
              resizeMode={"contain"}
              source={require(path + "others1/pop5_bar.png")}
            />
            
                </View>
                  <Animated.View style={{
                    width: convertWidth("7%"),
                    height: convertWidth("9%"),
                    left: convertWidth("85%"),
                    opacity: this.fadebtn3,
                     top: convertHeight("75%"),
                    position: "absolute"
                  }}>
                    <TouchableOpacity
                     onPress={() => this._onBtnPopPress(1)}
                    >
                      <Image
                        style={{
                          //position: "absolute",
                          width: convertWidth("6%"),
                          height: convertWidth("8%"),

                          //backgroundColor:'#000'
                        }}
                        resizeMode={"contain"}
                        source={require(path + "icons/icon_clinical_text.png")}
                      />
                    </TouchableOpacity>
                  </Animated.View>
              
            

        </View>
    

        <Animated.View style={{
          left: convertWidth("95%"),
          top: convertHeight("3%"),
          position: "absolute"
        }}>
          <TouchableOpacity
            onPress={() => this.props.onclose()}
          >
            <Image
              style={{
                width: convertWidth("3.5%"),
                height: convertWidth("3.5%"),
              }}
              resizeMode={"contain"}
              source={require(path + "bg/closepopbtn.png")}
            />
          </TouchableOpacity>
        </Animated.View>

        {this._popShow(this.state.currentPop)}
      </View>
    );
  }

  //ani
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
  TextContent: {
    color: "#5D5D5D",
    fontFamily: Constant.POPPINS_MEDIUM,
    width: convertWidth('60%'),
    marginTop: convertHeight('0.1%'),
    textAlign: 'left',
    //borderWidth:1,
    fontSize: convertWidth('1.7%'),

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
export default Others_page1_pop5_core;