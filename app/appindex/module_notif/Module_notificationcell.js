import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import ShadowView from 'react-native-shadow-view';
//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, formateFullDate, formateFullDateNumberUTC2 } from '../../global/Global';
import { Styleapp } from '../../styleapp';
const icon_schedule = require("../../../assets/ASET/kalender.png");
const icon_dompet = require("../../../assets/ASET/dompet.png");
const icon_mssage = require("../../../assets/ASET/mail_white.png");

const allH = "14%";
class NotificationCell extends React.Component{
    constructor(props){
        super(props)
    }
    getColors=(id)=>{
        switch (id) {
            case 1:
                return '#00B7A2';
            case 2:
                return '#D0021B';
        }
    }
    getImage = (id) => {
        switch (id) {
            case "doctor":
                return icon_schedule;
            case "expense":
                return icon_dompet;
            case "message":
                return icon_mssage;
        }
    }
    onPressNotif = (texts)=>{
        if (this.props.datacell.module=="message"){
            console.log('open', texts)
            console.log('data', this.props.datacell)
            let notifcontent = { date: this.props.datacell.created_at,
                content: this.props.datacell.content,
                title: this.props.datacell.title
            }
        this.props._onNotifOpen(notifcontent)
        }
    }
    render(){
        return <View style={[styles.signature, { backgroundColor: "#fff" }]}>
            <ShadowView style={{
                height: convertHeight(allH),
                width: convertWidth('90%'),
                backgroundColor: this.props.datacell.is_read == 0 ? Constant.COLOR_WHITE3 : "#fff",
                position: 'absolute',
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            }} />
            <View style={{
                backgroundColor: this.getColors(this.props.datacell.status),
                height: convertHeight(allH),
                width: convertHeight(allH),
                alignContent: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    style={styles.icons}
                    resizeMode={'contain'}
                    source={this.getImage(this.props.datacell.module)}
                />
            </View>

            <TouchableOpacity style={styles.desContainer}
                onPress={() => this.onPressNotif(this.props.datacell.content)}
            >
                <Text style={styles.titletext} >{this.props.datacell.module == 'message' ? "Himalaya Notification" : this.props.datacell.title}</Text>
                <Text style={[styles.subtext, { fontFamily: Constant.POPPINS_REG }]}  >{this.props.datacell.module == 'message' ? this.props.datacell.title : this.props.datacell.content}</Text>
                <Text style={styles.subtext}  >{formateFullDateNumberUTC2(this.props.datacell.created_at)}</Text>
            </TouchableOpacity>
            <Text style={[styles.proposContainer, { fontSize: convertWidth('1.5%'), color: this.props.datacell.is_read == 1 ? Constant.COLOR_GREEN4 : '#7984F3' }]}>
                {this.props.datacell.is_read == 1 ? "Read" : "Unread"}
            </Text>
        </View>
    }
    
}
/*
  <View style={{
            backgroundColor: getColors(props.datacell.status),
            height: convertHeight('17%'),
            alignContent:'center'
        }}>
            <Image
                style={styles.icons}
                resizeMode={'contain'}
                source={getImage(props.datacell.status)}
            />
        </View>

        <View style={styles.desContainer}>
            <Text style={styles.titletext} >{props.datacell.title}</Text>
            <Text style={[styles.subtext,{fontFamily: Constant.POPPINS_REG}]}  >{props.datacell.desc}</Text>
            <Text style={styles.subtext}  >{formateFullDate(props.datacell.dateNotif)}</Text>
        </View>
        <Text style={[styles.proposContainer, { color: props.datacell.isRead ? Constant.COLOR_GREEN4 : '#7984F3'}]}>
            {props.datacell.isRead?"Read":"Unread"}
        </Text>
*/
const styles = StyleSheet.create({
  icons: {
    height: convertHeight("4%"),
    width: convertWidth("4%"),
    alignSelf: "center"
    //marginTop: convertHeight('2%')
  },
  desContainer: {
    width: convertWidth("60%"),
    height: convertHeight(allH),
    marginLeft: convertWidth("3%"),
    justifyContent: "center"
    // borderWidth:1
  },
  proposContainer: {
    width: convertWidth("10%"),
    // height: convertHeight('10%'),
    fontFamily: Constant.POPPINS_MEDIUM,
    color: Constant.COLOR_GREEN4,
    marginTop: convertHeight("5%"),
    textAlign: "right"
  },
  titletext: {
    fontSize: convertWidth("1.5%"),
    fontFamily: Constant.POPPINS_MEDIUM,
    color: Constant.COLOR_BLACK
  },
  subtext: {
    fontSize: convertWidth("1.2%"),
    fontFamily: Constant.POPPINS_LIGHT,
    color: Constant.COLOR_BLACK
  },
  lines: {
    height: convertHeight("10%"),
    width: convertWidth("0.8%"),
    borderRadius: convertHeight("2%"),
    backgroundColor: Constant.COLOR_GREEN4
  },
  signature: {
    flexDirection: "row",
    // alignItems:'baseline',
    height: convertHeight(allH),
    width: convertWidth("90%"),

    backgroundColor: "#FFFFFF",
    marginBottom: convertHeight("2%")
  }
});

export default NotificationCell;