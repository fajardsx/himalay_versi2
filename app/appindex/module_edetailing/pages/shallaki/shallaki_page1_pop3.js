import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';

let path = '../../../../../assets/edetailing/';
class Shallaki_page1_pop3_core extends React.Component {

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
            width: convertWidth("80%"),
            height: convertHeight("11%"),
            backgroundColor: "#6E8562",
            position: 'absolute',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: "#eeeeee",
              fontFamily: Constant.POPPINS_MEDIUM,
              width: convertWidth('80%'),
              //height: convertHeight("10%"),
              textAlign: 'center',
              //borderWidth:1,
              fontSize: convertWidth('3%'),
            }}>{"Dosis"}</Text>
          </View>
          <View style={{ position: 'absolute', top: convertHeight('15%'),flexDirection: 'row'}}>
            
            <View style={{ alignItems: 'center',marginHorizontal:convertWidth('2%') }}>
              <Image
                style={{

                  width: convertWidth("18%"),
                  height: convertWidth("25%"),
                  //backgroundColor: '#000'
                }}
                resizeMode={"contain"}
                source={require(path + "shallaki1/obat.png")}
              />
             
            </View>
            <View>
              <View style={{ top: convertWidth('5%'),}}>
                <Image
                  style={{

                    width: convertWidth("35%"),
                    height: convertWidth("8%"),
                    //alignItems:'center',
                    //backgroundColor: '#000'
                  }}
                  resizeMode={"contain"}
                  source={require(path + "shallaki1/pop1_img2.png")}
                />
                <View style={{ top: convertWidth('3%'), marginLeft: convertWidth('%') ,flexDirection: 'row'}}>
                  <View style={{ flexDirection: 'row' }}><Text style={[styles.TextContent, { width: convertWidth('3%'), textAlign: 'center' }]}>{"•"}</Text><Text style={styles.TextContent}>{"Nama Latin: Boswellia serrata q"}</Text></View>
                  <View
                    style={{borderLeftWidth:1}}
                  />
                  <View style={{ flexDirection: 'row' }}><Text style={[styles.TextContent, { width: convertWidth('3%'),textAlign:'center' }]}>{"•"}</Text><Text style={styles.TextContent}>{"Nama English: Boswellia tiap kapsul\nmengandung 125mg ekstrak\ngetah Shallaki"}</Text></View>
                  </View>
              </View>
            </View>
           
           
          </View>
         
        </View>
    

        <Animated.View style={{
          left: convertWidth("85.5%"),
          top: convertHeight("18%"),
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
    width: convertWidth('20%'),
    //marginTop: convertHeight('2%'),
    textAlign: 'left',
    //borderWidth:1,
    fontSize: convertWidth('1%'),

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
export default Shallaki_page1_pop3_core;