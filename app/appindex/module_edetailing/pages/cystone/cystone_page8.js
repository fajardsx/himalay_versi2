import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth } from '../../../../global/Global';
import Cystone_page7_pop1_core from "./cystone_page7_pop1";
import Cystone_page7_pop2_core from "./cystone_page7_pop2";
import Cystone_page7_pop3_core from "./cystone_page7_pop3";
import Cystone_page7_pop4_core from "./cystone_page7_pop4";
import Cystone_page7_pop5_core from "./cystone_page7_pop5";


let path ='../../../../../assets/edetailing/';
class Cystone_page8_core extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data: null,
            datahospital: null,
            currentPop:0,
          timers:0
        }

        this.fadetitle = new Animated.Value(0);
        this.fadesubtitle1 = new Animated.Value(0);

        this.fadeobat = new Animated.Value(0);
        this.fadeicon1 = new Animated.Value(0);
        this.fadeicon2 = new Animated.Value(0);

        this.fadebtn1 = new Animated.Value(0);
        this.fadebtn2 = new Animated.Value(0);
        this.fadebtn3 = new Animated.Value(0);
        
      this.posobat = new Animated.ValueXY({ x: convertWidth("38%"), y: convertHeight("27%") })
      this.posicon1 = new Animated.ValueXY({ x: convertWidth("10%"), y: convertHeight("45%") })
      this.posicon2 = new Animated.ValueXY({ x: convertWidth("55%"), y: convertHeight("45%") })
    }
    componentDidMount() {
       // console.log(this.props.datas)
    this.setState({
      timers: Number(this.props.page_id.duration)
    }, () => {
      this.startAnim();
      this.startTime();
    });
  }
  componentWillUnmount() {

    this.props.page_id.duration = this.state.timers;
    console.log(this.props.page_id);
    clearInterval(this.timerinterval);
  }
  startTime() {
    this.timerinterval = setInterval(() => {
      this.setState((prevState) => ({
        timers: prevState.timers + 1
      }));
    }, 1000);
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
            <Image
              style={{
                position: "absolute",
                width: convertWidth("15%"),
                height: convertHeight("6.5%"),
                left: convertWidth("81%"),
                top: convertHeight("2%")
              }}
              resizeMode={"contain"}
              source={require(path + "bg/logo.png")}
            />
            <Animated.Image
              style={
                {
                  position: "absolute",
                  width: convertWidth("25%"),
                  height: convertHeight("6%"),
                  left: convertWidth('40%'),
                  top: convertHeight('5%'),
                  //borderWidth: 1,
                  //backgroundColor: '#FFFFFF',
                }
              }
              resizeMode={"contain"}
              source={require(path + "cystone1/title.png")}
            />
            <View style={{ width: convertWidth('100%'), marginTop: convertWidth('10%'), justifyContent: 'center' }}>
              <Text style={styles.subStyle2}>{"Pilihan alami pada Infeksi Saluran Kemih"}</Text>
            </View>
            <View style={{width:convertWidth('100%'),marginBottom: convertWidth('3%'),justifyContent:'center'}}>
              <Text style={styles.subStyle}>{"Perlekatan bakteri di uroepithelium – merupakan faktor penyebab\n utama untuk ISK berulang"}</Text>
            </View>
            
            <View style={{flexDirection: 'row',alignItems: 'center',width: convertWidth('100%'),justifyContent:"center"}}>
              <Animated.Image
                style={
                  {
                    //position: "absolute",
                    width: convertWidth("40%"),
                    height: convertHeight("43%"),
                    //left: convertWidth('40%'),
                    //top: convertHeight('5%'),
                    marginRight: convertWidth("5%"),
                   
                    //backgroundColor: '#000',
                  }
                }
                resizeMode={"contain"}
                source={require(path + "cytone7/table1.png")}
              />
              <Animated.Image
                style={
                  {
                    //position: "absolute",
                    width: convertWidth("40%"),
                    height: convertHeight("38%"),
                    //left: convertWidth('40%'),
                    //top: convertHeight('5%'),
                   // borderWidth: 1,
                   // backgroundColor: '#FFFFFF',
                  }
                }
                resizeMode={"contain"}
                source={require(path + "cytone7/obat.png")}
              />
            </View>
            

           
          </View>
        );
    }
    //anim
  startAnim() {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.fadetitle, { toValue: 1, duration: Constant.DURATION_FADE }),
      Animated.timing(this.fadesubtitle1, { toValue: 1, duration: Constant.DURATION_FADE })
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

    },
    subStyle:{
      fontFamily: Constant.POPPINS_REG,
      textAlign: 'center',
      color: "#3C2415",
      //borderWidth:1,
      fontSize: convertWidth('2%'),
    },
     subStyle2: {
    fontFamily: Constant.POPPINS_BOLD,
    textAlign: 'center',
       color:"#3C2415",
    //borderWidth:1,
    fontSize: convertWidth('2%'),
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
export default Cystone_page8_core;