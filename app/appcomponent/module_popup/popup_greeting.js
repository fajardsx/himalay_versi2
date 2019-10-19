import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity} from "react-native";
import Constant from "../../global/Constant";
import {convertHeight,convertWidth, getGreetingTime} from "../../global/Global";
import user from "../../global/user";


class PopGreetingViewModel extends Component{
    constructor(props) {
        super(props);
        
    }
    
    getTitleText=()=>{
        const{name} = this.props;
        return "Good "+getGreetingTime()+", Doctor "+name;
    }
    getSubTitleText = () => {
        return "Are your ready to start presentation?";    
    }
    render(){
        return <View style={{
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
            backgroundColor: 'rgba(0,0,0,0.8)',
            position: 'absolute',
            zIndex: 10,
            //justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                height: convertHeight('55%'),
                width: convertWidth('50%'),
                marginTop: convertHeight('20%'),
                backgroundColor: Constant.COLOR_WHITE4,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    style={{
                        width: convertWidth('15%'),
                        height: convertHeight('15%'),
                        marginTop: convertHeight('4%'),
                        marginBottom: convertHeight('3%'),
                    }}
                    source={require("../../../assets/ASET/SMILE.png")}
                    resizeMode={'contain'}
                />
                <Text style={{ fontFamily: Constant.POPPINS_MEDIUM, fontSize: convertWidth("2%"), color: "#686868" }}>{this.getTitleText()}</Text>
                <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: convertWidth("1.5%"), color: "#686868" }}>{this.getSubTitleText()}</Text>
                <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: convertHeight('2%') }}>
                    <TouchableOpacity
                        onPress={() => this.props.onPressStartCancel()}
                        style={{ alignSelf: 'flex-end', marginHorizontal: '5%', width: convertWidth('16%'), height: convertHeight('7%'), justifyContent: 'center', alignItems: 'center', borderRadius: convertHeight('8%'), backgroundColor: Constant.COLOR_WHITE2, borderWidth: 1, borderColor: "#686868" }}>
                        <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: convertWidth("1.5%"), color: "#000" }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.onPressStart()}
                        style={{ alignSelf: 'flex-end', marginHorizontal: '5%', width: convertWidth('16%'), height: convertHeight('7%'), justifyContent: 'center', alignItems: 'center', borderRadius: convertHeight('8%'), backgroundColor: Constant.COLOR_ORANGE1 }}>
                        <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: convertWidth("1.5%"), color: "#fff" }}>Yes, please</Text>
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
            </View>
        </View>
    }
    
}

export default PopGreetingViewModel;


