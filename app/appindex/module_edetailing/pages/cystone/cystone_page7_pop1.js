import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth } from '../../../../global/Global';


let path ='../../../../../assets/edetailing/';
class Cystone_page7_pop1_core extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data: null,
            datahospital: null
        }

        this.fadetitle = new Animated.Value(0);
        this.fadesubtitle1 = new Animated.Value(0);

        this.fadeobat = new Animated.Value(0);
        this.fadeicon1 = new Animated.Value(0);
        this.fadeicon2 = new Animated.Value(0);

        this.fadebtn1 = new Animated.Value(0);
        this.fadebtn2 = new Animated.Value(0);
        this.fadebtn3 = new Animated.Value(0);
        
      this.posobat = new Animated.ValueXY({ x: convertWidth("41%"), y: convertHeight("27%") })
      this.posicon1 = new Animated.ValueXY({ x: convertWidth("10%"), y: convertHeight("45%") })
      this.posicon2 = new Animated.ValueXY({ x: convertWidth("55%"), y: convertHeight("45%") })
    }
    componentDidMount() {
        console.log(this.props.datas)
        //this.startAnim();
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
            <View
              style={{
                backgroundColor: "rgba( 255, 255, 255, 0.5) ",
                width: convertWidth("100%"),
                height: convertHeight("100%")
              }}
            />

            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("90%"),
                height: convertHeight("65%"),
                left: convertWidth("5%"),
                top: convertHeight("15%")
                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "cytone6/cystonepopbg1.png")}
            />
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("25%"),
                height: convertHeight("43%"),
                left: convertWidth("37%"),
                top: convertHeight("32%"),
                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "cytone6/orangpop.png")}
            />
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("29%"),
                height: convertHeight("18%"),
                left: convertWidth("12%"),
                top: convertHeight("32%"),
                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "cytone6/ballon1.png")}
            />
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("27%"),
                height: convertHeight("18%"),
                left: convertWidth("16%"),
                top: convertHeight("55%"),
                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "cytone6/ballon2.png")}
            />

            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("27%"),
                height: convertHeight("18%"),
                left: convertWidth("60%"),
                top: convertHeight("33%"),
                //backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "cytone6/ballon3.png")}
            />
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("25%"),
                height: convertHeight("18%"),
                left: convertWidth("58%"),
                top: convertHeight("56%"),
               // backgroundColor:'#000'
              }}
              resizeMode={"contain"}
              source={require(path + "cytone6/ballon4.png")}
            />
            <Animated.View style={{
              left: convertWidth("86%"),
              top: convertHeight("12%"), 
              position: "absolute"}}>
              <TouchableOpacity
                onPress={() => this.props.onclose()}
              >
                <Image
                  style={{

                    width: convertWidth("4%"),
                    height: convertWidth("4%"),
                    
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
    //anim
  startAnim() {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.fadetitle, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadesubtitle1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.parallel([
        Animated.timing(this.fadeobat, { toValue: 1, duration: 500 }),
        Animated.spring(this.posobat, {
          toValue: { x: convertWidth("41%"), y: convertHeight("39%") },
          duration: 3000
        })
      ]),
      Animated.parallel([
        Animated.timing(this.fadeicon1, { toValue: 1, duration: 500 }),
        Animated.spring(this.posicon1, {
          toValue: { x: convertWidth("19%"), y: convertHeight("45%") },
          duration: 1000
        })
      ]),
      Animated.parallel([
        Animated.timing(this.fadeicon2, { toValue: 1, duration: 500 }),
        Animated.spring(this.posicon2, {
          toValue: { x: convertWidth("62%"), y: convertHeight("45%") },
          duration: 1000
        })
      ]),
      Animated.delay(300),
      Animated.timing(this.fadebtn1, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn2, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadebtn3, { toValue: 1, duration: Constant.DURATION_FADE })
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
export default Cystone_page7_pop1_core;