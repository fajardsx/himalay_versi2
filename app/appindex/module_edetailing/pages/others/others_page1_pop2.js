import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';
import Others_page2_clinical from "./others_page2_clinical";

let path = '../../../../../assets/edetailing/';
//AYURSLIM
class Others_page1_pop2_core extends React.Component {

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
      return <Others_page2_clinical showPdf={this.props.showPdf.bind(this)} onclose={this._onBtnPopClosePress.bind(this)} />;
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
              marginLeft: convertWidth("2.5%"),
              marginTop: convertWidth("1%"),
                width: convertWidth("45%"),
                height: convertHeight("14%"),
                opacity: this.fadebox3,
                //alignSelf: 'center',
                //marginTop: convertHeight("11%"),
              //backgroundColor: "#000"
              }}
              resizeMode={"contain"}
            source={require(path + "others1/pop2_title.png")}
            />
            <Text style={{
               color: "#3C2415",
              fontFamily: Constant.POPPINS_SEMIBOLD,
              width: convertWidth('90%'),
              marginLeft:  convertWidth('2.5%'),
              fontSize: convertWidth('1.58%')
          }}>Evaluation of clinical efficacy of AyurSlim on Body weight, body mass index, lipid profile and skin fold thickness: A Phase IV clinical trial
          <Text style={{ fontFamily: Constant.POPPINS_REG}}> {"—Singh AK, Patki PS, Mitra SK. The Antiseptic.2008"}</Text></Text> 
          
          <Animated.Image
            style={{
              //marginHorizontal: convertWidth("3%"),
              width: convertWidth("67%"),
              height: convertHeight("42%"),
              //opacity: this.fadebox3,
              //alignSelf: 'center',
              marginLeft: convertWidth("2.5%"),
             // backgroundColor:'#000'
              
            }}
            resizeMode={"contain"}
            source={require(path + "others1/pop2_table.png")}
          />
          <View style={{ flexDirection: 'row', marginLeft: convertWidth("2.5%"),}}>
                 
                 
                    <Animated.Image
                      style={styles.barStyle}
                      resizeMode={"contain"}
                      source={require(path + "others1/pop2_bar1.png")}
                    />
                    <Animated.Image
                      style={styles.barStyle}
                      resizeMode={"contain"}
                      source={require(path + "others1/pop2_bar2.png")}
                    />
                    <Animated.Image
                      style={styles.barStyle}
                      resizeMode={"contain"}
                      source={require(path + "others1/pop2_bar3.png")}
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

                //backgroundColor:'#000'
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
  barStyle:{
    width: convertWidth("27.3%"),
    height: convertHeight("16.5%"),
    //backgroundColor:'#000'
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
export default Others_page1_pop2_core;