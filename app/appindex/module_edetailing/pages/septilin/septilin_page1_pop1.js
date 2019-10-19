import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';

let path = '../../../../../assets/edetailing/';
class Septilin_page1_pop1_core extends React.Component {

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
          width: convertWidth("75%"),
          height: convertHeight("60%"),
          
          backgroundColor: '#fff',
         // position: 'absolute',
          overflow: 'hidden',
          borderColor: '#dddbd3',
          borderRadius: convertHeight('1%'),
          borderWidth: convertHeight('1%'),
        }}>
          <View style={{
            width: convertWidth("75%"),
            height: convertHeight("10%"),
            backgroundColor: "#EA5B1B",
            position: 'absolute',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: "#eeeeee",
              fontFamily: Constant.POPPINS_MEDIUM,
              width: convertWidth('75%'),
              //height: convertHeight("10%"),
              textAlign: 'center',
              //borderWidth:1,
              fontSize: convertWidth('2'),
            }}>{"Relaxes the mind, promotes sleep"}</Text>
          </View>
          <View style={{flexDirection: 'row',position: 'absolute',top:convertHeight("15%")}}>
            <Image
              style={{

                width: convertWidth("25%"),
                height: convertWidth("25%"),
                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "septilin1/pop1_img2.png")}
            />
            <View>
              <Text style={{
                color: "#005E62",
                fontFamily: Constant.POPPINS_SEMIBOLD,
                width: convertWidth('50%'),
                //height: convertHeight("10%"),
                textAlign: 'left',
                //borderWidth:1,
                fontSize: convertWidth('1.5%'),
              }}>{"Septilin merangsang kapasitas fagositosis & membantu mengatasi infeksi"}</Text>
              <Text style={{
                color: "#000",
                paddingTop: convertHeight('2%'),
                fontFamily: Constant.POPPINS_MEDIUM,
                width: convertWidth('45.5%'),
                //height: convertHeight("10%"),
                textAlign: 'left',
                //borderWidth:1,
                fontSize: convertWidth('1.1%'),
              }}>{"Pada infeksi kronis & berulang, Septilin secara signifikan meningkatkan kapasitas fagositosis dan level imunoglobulin (IgG dan IgA)."}</Text>
              <Text style={{
                color: "#000",
                paddingTop:convertHeight('2%'),
                fontFamily: Constant.POPPINS_MEDIUM,
                width: convertWidth('45.5%'),
                //height: convertHeight("10%"),
                textAlign: 'left',
                //borderWidth:1,
                fontSize: convertWidth('1.1%'),
              }}>{"Fagositosis adalah salah satu mekanisme pertahanan yang paling penting dari tubuh terhadap invasi mikroba. Septilin memungkinkan sel fagosit bekerja tidak hanya bermigrasi ke arah mikroba, tetapi juga menelan dan menghancurkan mereka."}</Text>
            </View>
          </View>
         


        </View>
    

        <Animated.View style={{
          left: convertWidth("85%"),
          top: convertHeight("17%"),
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
export default Septilin_page1_pop1_core;