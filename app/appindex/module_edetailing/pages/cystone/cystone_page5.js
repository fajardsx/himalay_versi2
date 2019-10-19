import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth } from '../../../../global/Global';


let path ='../../../../../assets/edetailing/';
class Cystone_page5_core extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data: null,
            datahospital: null,
            timers:0
        }
        //list

        this.fadetitle = new Animated.Value(0);
        this.fadefooter = new Animated.Value(0);
       
        this.fadelambung1 = new Animated.Value(0);
        this.fadelambung2 = new Animated.Value(0);
        this.fadelambung3 = new Animated.Value(0);
         this.fadetable = new Animated.Value(0);
        this.postable = new Animated.ValueXY({ x: convertWidth("8%"), y: convertHeight("40%") });
    }
    componentDidMount() {
        //console.log(this.props.datas)
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
    startTime(){
        this.timerinterval = setInterval(() => {
            this.setState((prevState) => ({
              timers: prevState.timers + 1
            }));
        }, 1000);
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
                  width: convertWidth("21%"),
                  height: convertHeight("7%"),
                  left: convertWidth('40%'),
                  top: convertHeight('5%'),
                  //borderWidth: 1,
                  //backgroundColor: '#FFFFFF',
                }
              }
              resizeMode={"contain"}
              source={require(path + "cystone1/title2.png")}
            />

            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("85%"),
                height: convertHeight("20%"),
                left: convertWidth("8%"),
                top: convertHeight("14%"),
                opacity:this.fadetitle,
                borderWidth: 0
              }}
              resizeMode={"contain"}
              source={require(path + "cytone4/title.png")}
            />
            <Animated.Image
              style={[this.postable.getLayout(),{
                position: "absolute",
                width: convertWidth("85%"),
                height: convertHeight("40%"),
               
                opacity: this.fadetable,
                borderWidth: 0
              }]}
              resizeMode={"contain"}
              source={require(path + "cytone4/middletable.png")}
            />
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("79%"),
                height: convertHeight("18%"),
                left: convertWidth("11%"),
                top: convertHeight("67%"),
                opacity: this.fadefooter,
               // backgroundColor: '#000',
                borderWidth: 0
              }}
              resizeMode={"contain"}
              source={require(path + "cytone4/footer.png")}
            />

            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("12%"),
                height: convertHeight("23%"),
                left: convertWidth("44%"),
                top: convertHeight("38%"),
                opacity: this.fadelambung1
              }}
              resizeMode={"contain"}
              source={require(path + "cytone4/lambung1.png")}
            />
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("12%"),
                height: convertHeight("23%"),
                left: convertWidth("60%"),
                top: convertHeight("38%"),
                opacity: this.fadelambung2
              }}
              resizeMode={"contain"}
              source={require(path + "cytone4/lambung2.png")}
            />
            <Animated.Image
              style={{
                position: "absolute",
                width: convertWidth("12%"),
                height: convertHeight("23%"),
                left: convertWidth("76%"),
                top: convertHeight("38%"),
                opacity:this.fadelambung3
              }}
              resizeMode={"contain"}
              source={require(path + "cytone4/lambung3.png")}
            />
          </View>
        );
    }
    //

    startAnim(){
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(this.fadetitle, { toValue: 1, duration: Constant.DURATION_FADE }),
        Animated.parallel([
          Animated.timing(this.fadetable, { toValue: 1, duration: 500 }),
          Animated.spring(this.postable, {
            toValue: { x: convertWidth("8%"), y: convertHeight("28%") },
            duration: 3000
          })
        ]),
        Animated.delay(200),
        Animated.timing(this.fadelambung1, { toValue: 1, duration: Constant.DURATION_FADE }),
        Animated.timing(this.fadelambung2, { toValue: 1, duration: Constant.DURATION_FADE }),
        Animated.timing(this.fadelambung3, { toValue: 1, duration: Constant.DURATION_FADE }),
        Animated.timing(this.fadefooter, { toValue: 1, duration: Constant.DURATION_FADE })
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
export default Cystone_page5_core;