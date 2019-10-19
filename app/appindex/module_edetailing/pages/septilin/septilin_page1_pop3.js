import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';

let path = '../../../../../assets/edetailing/';
class Septilin_page1_pop3_core extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myposition: {},
      data: null,
      datahospital: null,
      timers: 0
    }
   
    //this.xSubTitle = new Animated.ValueXY({ x:convertWidth('63%'), y: convertHeight('12%')});
  }
  componentDidMount() {
    
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
          height: convertHeight("100%"),
          backgroundColor: "rgba( 255, 255, 255, 0.5) ",
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
       
        <View style={{
          width: convertWidth("85%"),
          height: convertHeight("70%"),
          
          backgroundColor: '#fff',
         // position: 'absolute',
          overflow: 'hidden',
          borderColor: '#dddbd3',
          borderRadius: convertHeight('1%'),
          borderWidth: convertHeight('1%'),
        }}>
          <View style={{
            width: convertWidth("85%"),
            height: convertHeight("11%"),
            backgroundColor: "#6E8562",
            position: 'absolute',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: "#eeeeee",
              fontFamily: Constant.POPPINS_MEDIUM,
              width: convertWidth('85%'),
              //height: convertHeight("10%"),
              textAlign: 'center',
              //borderWidth:1,
              fontSize: convertWidth('3%'),
            }}>{"Dosis"}</Text>
          </View>
          <View style={{ position: 'absolute', top: convertHeight('1%'), left: convertWidth('5%')}}>
              <Image
                style={{

                  width: convertWidth("30%"),
                  height: convertWidth("40%"),
                  alignItems:'center',
                 //backgroundColor: '#000'
                }}
                resizeMode={"contain"}
                source={require(path + "septilin1/pop3_img1.png")}
              />
          </View>
          <View style={{ position: 'absolute', top: convertHeight('25%'),left:convertWidth('35%')}}>
              <Image
                style={{

                  width: convertWidth("20%"),
                  height: convertWidth("23%"),
                  alignItems:'center',
                  //backgroundColor: '#000'
                }}
                resizeMode={"contain"}
                source={require(path + "septilin1/pop3_img2.png")}
              />
          </View>
          <View style={{ position: 'absolute', top: convertHeight('6%'), left: convertWidth('54%') }}>
            <Image
              style={{

                width: convertWidth("30%"),
                height: convertWidth("38%"),
                alignItems: 'center',
                //backgroundColor: '#000'
              }}
              resizeMode={"contain"}
              source={require(path + "septilin1/pop3_img3.png")}
            />
          </View>
        </View>
    

        <Animated.View style={{
          left: convertWidth("90%"),
          top: convertHeight("12.5%"),
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
export default Septilin_page1_pop3_core;