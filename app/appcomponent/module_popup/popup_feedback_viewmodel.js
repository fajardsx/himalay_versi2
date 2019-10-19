import React, { Component } from 'react';
import { Text, TextInput, View, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView , Keyboard} from "react-native";
import Constant from "../../global/Constant";
import {convertHeight,convertWidth, callAlert} from "../../global/Global";
import user from "../../global/user";


class PopFeedBackViewModel extends Component{
    constructor(props) {
        super(props);
        this.state={
            KeyboardIsShow: false,
            feedtxt:"",
        }
    }
    componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", function () {
           
            this.setState({
                KeyboardIsShow: true
            })
        }.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", function () {
            
            this.setState({ KeyboardIsShow: false });
        }.bind(this));
    }
    componentWillUnmount(){
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    onSubmitFeedBack(){
        const { KeyboardIsShow, feedtxt } = this.state;
        Keyboard.dismiss();
        if (feedtxt.length>5){
            this.props.onPressStart(feedtxt)
        }else{
            callAlert(Constant.NAME_APPS,"Mohon Feedback diisi Minimal 6 karakter");
        }
       
    }
    render(){
        const {KeyboardIsShow,feedtxt} = this.state;
        return <View style={{
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
            backgroundColor: 'rgba(0,0,0,0.8)',
            position: 'absolute',
            //zIndex: 10,
            //justifyContent: 'center',
            alignItems: 'center',
        }}>
            <KeyboardAvoidingView
            behavior='padding'
           
            style={{
                height: convertHeight('75%'),
                width: convertWidth('60%'),
                marginTop: KeyboardIsShow ? 0:convertHeight('15%'),
                backgroundColor: Constant.COLOR_WHITE4,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <TouchableOpacity style={{
                    height: convertHeight('100%'),
                    width: convertWidth('100%'),
                   // marginTop: KeyboardIsShow ? 0 : convertHeight('15%'),
                   // backgroundColor: Constant.COLOR_WHITE4,
                   
                    position: 'absolute'
            }} onPress={()=>{Keyboard.dismiss()}} />
                <Image
                    style={{
                        width: convertWidth('15%'),
                        height: convertHeight('15%'),
                        marginTop: convertHeight('3%'),
                        marginBottom: convertHeight('3%'),
                    }}
                    source={require("../../../assets/ASET/MESSAGE.png")}
                    resizeMode={'contain'}
                />
                <Text style={{ fontFamily: Constant.POPPINS_MEDIUM, fontSize: convertWidth("2%"), color: "#686868" }}>{"Hi, " + user.getNameUser()}</Text>
                <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: convertWidth("2%"), color: "#686868" }}>{"Please input your feedback soon..."}</Text>
                <TextInput underlineColorAndroid="rgba(0,0,0,0)"
                    defaultValue={''}
                   multiline
                    placeholder={'please write your feedback'}
                    placeholderTextColor="#a8a8a8"
                    style={{
                        
                            width: convertWidth('40%'),
                            height: convertWidth('13%'),
                           // paddingLeft: 15,
                            // backgroundColor : 'rgba(255,255,255,0.5)',
                            color: '#000',
                            fontSize: convertHeight('1.9%'),
                            textAlign: 'center',
                            borderWidth: 1,
                            borderColor: Constant.COLOR_WHITE3,
                            //paddingLeft: convertWidth('2%'),
                            textAlignVertical: 'top',
                            fontFamily: Constant.POPPINS_LIGHT
                        
                    }}
                    onChangeText={
                        (txt) => this.setState({
                            feedtxt:txt
                        })
                    }
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                    onBlur={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{}}
                />
                <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: convertHeight('2%') }}>
                  
                    <TouchableOpacity
                       onPress={() =>this.onSubmitFeedBack()}
                        style={{ alignSelf: 'flex-end', marginHorizontal: '5%', width: convertWidth('16%'), height: convertHeight('7%'), justifyContent: 'center', alignItems: 'center', borderRadius: convertHeight('8%'), backgroundColor: Constant.COLOR_ORANGE1 }}>
                        <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: convertWidth('2%'), color: "#fff" }}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    position: 'absolute',
                    backgroundColor: Constant.COLOR_WHITE3,
                    height: convertHeight('5%'),
                    width: convertWidth('3%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 0,
                    right: 0
                }}
                    onPress={() => this.props.onPressStartCancel()}
                >
                    <Image
                        style={{
                            width: convertWidth('2%'),
                            height: convertHeight('2%'),
                        }}
                        source={require("../../../assets/ASET/xclose.png")}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    }
    
}

export default PopFeedBackViewModel;


