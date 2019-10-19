import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';

let path = '../../../../../assets/edetailing/';
class Shallaki_page1_pop1_core extends React.Component {

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
          width: convertWidth("70%"),
          height: convertHeight("60%"),
          
          backgroundColor: '#fff',
         // position: 'absolute',
          overflow: 'hidden',
          borderColor: '#dddbd3',
          borderRadius: convertHeight('2%'),
          borderWidth: convertHeight('1%'),
        }}>
          <View style={{
            width: convertWidth("70%"),
            height: convertHeight("13%"),
            backgroundColor: "#EA5B1B",
            position: 'absolute',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: "#eeeeee",
              fontFamily: Constant.POPPINS_MEDIUM,
              width: convertWidth('70%'),
              //height: convertHeight("10%"),
              textAlign: 'center',
              //borderWidth:1,
              fontSize: convertWidth('2%'),
            }}>{"Shallaki"}</Text>
          </View>
            <View style={{flexDirection: 'row'}}>
            <Image
              style={{

                width: convertWidth("22%"),
                height: convertWidth("30%"),
                top: convertWidth('8%'),
                left: convertWidth('0%'),
                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "shallaki1/pop1_img1.png")}
            />
            <View style={{ top: convertWidth('10%'),marginLeft:convertWidth('2%')}}>
              <View style={{ flexDirection: 'row' }}><Text style={[styles.TextContent,{width:convertWidth('2.5%')}]}>{"•"}</Text><Text style={styles.TextContent}>{"Membantu menjaga persendian tetap sehat"}</Text></View>
              <View style={{ flexDirection: 'row' }}><Text style={[styles.TextContent, { width: convertWidth('2.5%') }]}>{"•"}</Text><Text style={styles.TextContent}>{"Asam boswellic secara signifikan memiliki \nefek sebagai anti-inflamasi (anti-peradangan)"}</Text></View>
              <View style={{ flexDirection: 'row' }}><Text style={[styles.TextContent, { width: convertWidth('2.5%') }]}>{"•"}</Text><Text style={styles.TextContent}>{"Mengurangi nyeri dan meningkatkan\nkelenturan sendi"}</Text></View>
              <View style={{ flexDirection: 'row' }}><Text style={[styles.TextContent, { width: convertWidth('2.5%') }]}>{"•"}</Text><Text style={styles.TextContent}>{"Aman dan nyaman digunakan (tidak mengiritasi\nlambung dan aman untuk pasien dengan\ngangguan lambung)"}</Text></View>

              </View>
            </View>
         
        </View>
    

        <Animated.View style={{
          left: convertWidth("83%"),
          top: convertHeight("18.5%"),
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

  },
  TextContent: {
    color: "#000",
    fontFamily: Constant.POPPINS_MEDIUM,
    width: convertWidth('40%'),
   marginTop:convertHeight('2%'),
    textAlign: 'left',
    //borderWidth:1,
    fontSize: convertWidth('1.3%'),

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
export default Shallaki_page1_pop1_core;