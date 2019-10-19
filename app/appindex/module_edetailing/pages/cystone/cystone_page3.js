import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth } from '../../../../global/Global';

let path ='../../../../../assets/edetailing/';
class Cystone_page3_core extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data: null,
            datahospital: null,
            timers: 0
        }
        //list
        this.fadeBook1 = new Animated.Value(0);
        this.fadeBook2 = new Animated.Value(0);

        this.fadeBox1 = new Animated.Value(0);
        this.fadeBox2 = new Animated.Value(0);
        this.xBox1 = new Animated.ValueXY({ x: convertWidth('0%'), y: convertHeight('28%') });
        this.xBox2 = new Animated.ValueXY({ x: convertWidth('0%'), y: convertHeight('55%') });
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

    onEndPress = () => {
        this.props.onEnd(this.props.datas);
    }
    render() {
        const { datas } = this.props;
        return <View style={{
             width: convertWidth('100%'),
            height: convertHeight('100%'),
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
                        top: convertHeight('8%'),
                        //borderWidth: 1,
                        //backgroundColor: '#000',
                    }
                }
                resizeMode={"contain"}
                source={require(path + "cystone1/title2.png")}
            />
            <Animated.Image
                style={[
                    this.xBox1.getLayout(),{
                    position: 'absolute',
                    width: convertWidth('60%'),
                    height: convertHeight('17%'),
                    opacity: this.fadeBox1,
                    borderWidth:0,
                }]}
                resizeMode={'contain'}
                source={require(path +'cystone2/boxtext1.png')}
            />
            <Animated.Image
                style={[
                    this.xBox2.getLayout(),{
                    position: 'absolute',
                    width: convertWidth('60%'),
                    height: convertHeight('17%'),
                    opacity: this.fadeBox2,
                    borderWidth: 0,
                }]}
                resizeMode={'contain'}
                source={require(path + 'cystone2/boxtext2.png')}
            />
            <Animated.Image
                style={{
                    position: 'absolute',
                    width: convertWidth('18%'),
                    height: convertHeight('25%'),
                    left: convertWidth('53%'),
                    top: convertHeight('25%'),
                    opacity: this.fadeBook1,
                   
                }}
                resizeMode={'contain'}
                source={require(path + 'cystone2/boxtext1Book.png')}
            />
            <Animated.Image
                style={{
                    position: 'absolute',
                    width: convertWidth('27%'),
                    height: convertHeight('23%'),
                    left: convertWidth('62%'),
                    top: convertHeight('53%'),
                    opacity: this.fadeBook2,
                    borderWidth: 0,
                   
                }}
                resizeMode={'contain'}
                source={require(path + 'cystone2/boxtext2Book.png')}
            />
           
           
        </View>
    }
    //ANim
    startAnim(){
        Animated.sequence([
            Animated.delay(500),
            Animated.parallel([
                Animated.timing(this.fadeBox1, { toValue: 1, duration: 500 }),
                Animated.spring(this.xBox1, { toValue: { x: convertWidth('4%'), y: convertHeight('28%') }, duration: 3000 })
            ]),
            Animated.timing(this.fadeBook1, { toValue: 1, duration: Constant.DURATION_FADE }),
            Animated.parallel([
                Animated.timing(this.fadeBox2, { toValue: 1, duration: 500 }),
                Animated.spring(this.xBox2, { toValue: { x: convertWidth('10%'), y: convertHeight('55%') }, duration: 3000 })
            ]),
            Animated.timing(this.fadeBook2, { toValue: 1, duration: Constant.DURATION_FADE }),
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
export default Cystone_page3_core;