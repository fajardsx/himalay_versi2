import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import ShadowView from 'react-native-shadow-view';
//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, formatPrice, formateFullDateNumberUTC2} from '../../global/Global';
import { Styleapp } from '../../styleapp';



const checkicon = require("../../../assets/ASET/expendes_check.png");
const crossicon = require("../../../assets/ASET/expends_cross.png");
const bellicon = require("../../../assets/ASET/expends_bell.png");
let h=convertHeight('11%');
const ExpendsesCell=(props)=>{

    setColorStatus=()=>{
        switch (props.status) {
            case "Approved":
                return '#03B5A0';
                break;
            case "Rejected":
                return '#CF0621';
                break;
            case "Pending":
                return '#F9C522';
                break;
        
            default:
                break;
        }
    }
    setIcon =()=>{
        switch (props.status) {
            case "Approved":
                return checkicon;
                break;
            case "Rejected":
                return crossicon;
                break;
            case "Pending":
                return bellicon;
                break;

            default:
                break;
        }
    }
   
    return <View style={styles.signature}>
               <ShadowView style={{
            height: h,
            width: convertWidth('95%'),
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                }} />
                <View style={{
                      width: convertWidth('9%'),
                      backgroundColor: setColorStatus(),
                      justifyContent: 'center',
                      alignItems:'center'
                }}>
                    <Image
                        style={styles.icons}
                        resizeMode={'contain'}
                        source={ require("../../../assets/ASET/dompet.png")}
                    />
                </View>
                
                <View style={styles.desContainer}>
                    <Text style={styles.titletext} 
                        numberOfLines={1}
                    >{props.doktername}</Text>
                    <Text style={styles.subtext} 
                         numberOfLines={1}
                    >{formateFullDateNumberUTC2(props.date)}</Text>
                </View>
                  <View style={{
                     // marginHorizontal: convertWidth('1%')
                }}>
                    <Image
                style={{
                    height: convertHeight('4%'),
                    width: convertWidth('4%'),
                    marginTop: convertHeight('1.5%'),
                    //borderWidth:1
                }}
                        resizeMode={'contain'}
                source={require('../../../assets/ASET/attachment.png')}
                    />
                </View>
                <Text style= {[styles.proposContainer,{color: setColorStatus(),fontSize:convertWidth('1.5%')}]}>
            {formatPrice( props.price)}
                </Text>
    </View>
}

const styles = StyleSheet.create({
    icons: {
        height: convertHeight('4%'),
        width: convertWidth('4%'),
       
        //borderWidth:1
    },
    desContainer:{
        width:convertWidth('68.5%'),
        marginTop: convertHeight('2%'),
        marginLeft: convertHeight('2%'),
      //borderWidth:1
       // height: convertHeight('100%')
    },
    proposContainer:{
        width:convertWidth('11%'),
        fontFamily: Constant.POPPINS_SEMIBOLD,
        color:Constant.COLOR_GREEN4,
        //textAlign: 'right',
        right:0,
        marginTop: convertHeight('2%'),
       //borderWidth:1
    },
    titletext:{
       
        marginRight: convertWidth('2%'),
        fontSize: convertWidth('1.5%'),
        fontFamily:Constant.POPPINS_MEDIUM,
        
    },
    subtext:{
        fontSize: convertWidth('1.2%'),
        fontFamily: Constant.POPPINS_LIGHT
    },
    lines:{
        height: h,
        width:convertWidth('1%'),
       // borderRadius: convertHeight('0.5%'),
       // backgroundColor: Constant.COLOR_GREEN4
    },
    signature: {
        flexDirection: 'row',
      
        height: h,
        width: convertWidth('95%'),
     //alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
      
        
    },
   
});

export default ExpendsesCell;