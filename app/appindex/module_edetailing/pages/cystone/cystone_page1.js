import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';

let path ='../../../../../assets/edetailing/';
class Cystone_page1_core extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data: null,
            datahospital: null,
            timers:0
        }

        this.fadeLogo=new Animated.Value(0)
        this.fadeTitle=new Animated.Value(0)
    }
    componentDidMount() {
        
        //callToast('start anim')
        //if(this.props.page_id && this.props.page_id.duration){
            console.log(this.props.page_id)
            this.setState({
                timers:Number(this.props.page_id.duration)
            },()=>{
                    this.startAnim();
                    this.startTime();
            });
           
       // }
       
    }
    componentWillUnmount() {
       
        this.props.page_id.duration = this.state.timers;
        
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
        const { datas} = this.props;
        const { timers } = this.state;
        //console.log(timers);

        return <View style={{
           width: convertWidth('100%'),
            height: convertHeight('100%'),
        }}

        >
            
            <Animated.Image
                style={{
                    position: 'absolute',
                    width: convertWidth('30%'),
                    height: convertHeight('9%'),
                    left: convertWidth('35%'),
                    top: convertHeight('25%'),
                    opacity:this.fadeLogo
                }}
                resizeMode={'contain'}
                source={require(path +'bg/logo.png')}
            />
            <Animated.Image
                style={{
                    position: 'absolute',
                    width: convertWidth('50%'),
                    height: convertHeight('15%'),
                    left: convertWidth('25%'),
                    top: convertHeight('40%'),
                    opacity: this.fadeTitle
                    //backgroundColor:'#000'
                }}
                resizeMode={'contain'}
                source={require(path +'cystone1/titlecytone.png')}
            />

        </View>
    }
    //anim
    startAnim() {
        Animated.timing(this.fadeLogo, { toValue: 1, duration: 1000, useNativeDriver: true }).start(()=>this._step2())
    }
    _step2(){
        Animated.timing(this.fadeTitle, { toValue: 1, duration: 1000, useNativeDriver: true }).start()
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
export default Cystone_page1_core;