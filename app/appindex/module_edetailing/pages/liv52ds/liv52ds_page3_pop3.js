import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
import LinearGradient from "react-native-linear-gradient";
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';

let path = '../../../../../assets/edetailing/';
class Liv52ds_page3_pop3_core extends React.Component {

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
          width: convertWidth("90%"),
          height: convertHeight("70%"),
          
          backgroundColor: '#fff',
         // position: 'absolute',
          overflow: 'hidden',
          borderColor: '#dddbd3',
          borderRadius: convertHeight('1%'),
          borderWidth: convertHeight('1%'),
        }}>
          <LinearGradient start={{ x: 0.0, y: 1.0 }}
            end={{ x: 0.0, y: 0.0 }}
            locations={[0, 0.9]} colors={["#6E8562", "#6E8562"]} style={{
              width: convertWidth("90%"),
              height: convertHeight("11%"),
              position: 'absolute',
              justifyContent: 'center'
            }}>
            <Text style={{
              color: "#eeeeee",
              fontFamily: Constant.POPPINS_SEMIBOLD,
              width: convertWidth('90%'),
              //height: convertHeight("10%"),
              textAlign: 'center',
              //borderWidth:1,
              fontSize: convertWidth('2%'),
            }}>{"Liv.52 DS Komposisi"}</Text>
          </LinearGradient>
          <View style={{ flexDirection: 'row', position: 'absolute', top: convertHeight('14%')}}>
            <View style={{ width: convertWidth("90%"), alignItems: 'center',justifyContent:'center' }}>
              <Image
                style={{

                  width: convertWidth("40%"),
                  height: convertHeight("53%"),
               //  backgroundColor:'#000'
                }}
                resizeMode={"contain"}
                source={require(path + "liv52ds3/pop3_img2.png")}
              />
            </View>
            
          </View>
         
        </View>
    

        <Animated.View style={{
          left: convertWidth("93%"),
          top: convertHeight("12%"),
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
export default Liv52ds_page3_pop3_core;