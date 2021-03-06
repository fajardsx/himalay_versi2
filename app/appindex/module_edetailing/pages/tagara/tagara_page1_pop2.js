import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';

let path = '../../../../../assets/edetailing/';
class Tagara_page1_pop2_core extends React.Component {

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
          width: convertWidth("56%"),
          height: convertHeight("65%"),
          
          backgroundColor: '#fff',
         // position: 'absolute',
          overflow: 'hidden',
          borderColor: '#dddbd3',
          borderRadius: convertHeight('2%'),
          borderWidth: convertHeight('1%'),
        }}>
          <View style={{
            width: convertWidth("56%"),
            height: convertHeight("11%"),
            backgroundColor: "#0D9B86",
            position: 'absolute',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: "#eeeeee",
              fontFamily: Constant.POPPINS_MEDIUM,
              width: convertWidth('56%'),
              //height: convertHeight("10%"),
              textAlign: 'center',
              //borderWidth:1,
              fontSize: convertWidth('2%'),
            }}>{"Indikasi"}</Text>
          </View>
          <View style={{ flexDirection: 'row', position: 'absolute', top: convertHeight('20%'), left: convertHeight('10%')}}>
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{

                  width: convertWidth("15%"),
                  height: convertWidth("15%"),

                }}
                resizeMode={"contain"}
                    source={require(path + "tagara1/pop2_img1.png")}
              />
              <Text style={{
                marginTop: convertHeight('5%'),
                color: "#C06F00",
                fontFamily: Constant.POPPINS_SEMIBOLD,
                width: convertWidth('18%'),
                textAlign: 'center',
                //borderWidth:1,
                fontSize: convertWidth('1.4%'),
              }}>
                {"Gangguan tidur"}
              </Text>
            </View>
            <View style={{ alignItems: 'center',marginLeft:convertWidth('5%') }}>
              <Image
                style={{

                  width: convertWidth("15%"),
                  height: convertWidth("15%"),

                }}
                resizeMode={"contain"}
                    source={require(path + "tagara1/pop2_img2.png")}
              />
              <Text style={{
                marginTop: convertHeight('5%'),
                color: "#C06F00",
                fontFamily: Constant.POPPINS_SEMIBOLD,
                width: convertWidth('18%'),
                textAlign: 'center',
                //borderWidth:1,
                fontSize: convertWidth('1.4%'),
              }}>
                {"Insomnia"}
              </Text>
            </View>
            
          </View>
         
        </View>
    

        <Animated.View style={{
          left: convertWidth("76%"),
          top: convertHeight("15%"),
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
export default Tagara_page1_pop2_core;