import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import Constant from "../../global/Constant";
import { convertHeight, convertWidth, Global_getListSmallSync, callAlert} from "../../global/Global";
import LocationModule from '../module_location';

let that = null
class PopBurgerMenuViewModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sync_count: 0
        }
        that = this
    }
    componentDidMount() {
        Global_getListSmallSync().then(res => {
            that.setState({
                sync_count: res.length
            },()=>that._foundSync())
        })
    }
    _foundSync() {
        const { sync_count } = this.state;
        console.log("sync : ", sync_count)
        if (sync_count > 0) {
           //callAlert(Constant.NAME_APPS, "Some Your Report pending, please go to menu sync and sync data. Make sure Internet Connection Stable")
        }
    }
    render(){
        const { sync_count } = this.state;
        return <View style={{
            height: convertHeight('100%'),
            width: Dimensions.get('screen').width,
            backgroundColor: "#027266",
            position: 'absolute',
        }}>
            <TouchableOpacity
                style={{ width: convertWidth('8%') ,height: convertHeight('8%'),borderWidth: 0,justifyContent:'center',alignItems:'center'}}
                onPress={() => this.props.onPressClose()}>

                <Image
                    style={{ width: convertWidth('3%'), height: convertHeight('3%') }}
                    resizeMode='contain'
                    source={require("../../../assets/ASET/xclose_white.png")}
                />
            </TouchableOpacity>
            <View style={{ borderWidth:0, marginHorizontal: convertWidth('10%') }}>
            
                <TouchableOpacity style={stylemenu.btncontainer}
                    onPress={() => this.props.onPressReset()}
                >
                    <Image
                        style={stylemenu.iconimg}
                        resizeMode='contain'
                        source={require("../../../assets/ASET/password.png")}
                    />
                    <Text style={stylemenu.textmenu}>Change Password</Text>
                </TouchableOpacity>
                <View style={stylemenu.linecontainer} />
                <View>
                    <TouchableOpacity style={[stylemenu.btncontainer, { flexDirection: 'row' }]}
                        onPress={() => this.props.onSyncPress()}
                    >
                        <Image
                            style={stylemenu.iconimg}
                            resizeMode='contain'
                            source={require("../../../assets/ASET/syc.png")}
                        />
                        <Text style={stylemenu.textmenu}>Sync</Text>
                        {
                            sync_count > 0 &&
                            <View style={{
                                width: convertWidth("3%"),
                                height: convertWidth("3%"),
                                borderRadius: convertWidth("2%"),
                                backgroundColor: Constant.COLOR_RED2,
                                position: 'absolute',
                                top: "40%",
                                right: "10%",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    fontSize: convertWidth('1.5%'), width: convertWidth('2.2%'), textAlignVertical: 'center', height: convertWidth("3%"), color: "#fff", textAlign: 'center',
                                    fontFamily: Constant.POPPINS_LIGHT
                                }}>
                                    {sync_count}
                                </Text>
                            </View>
                        }
                    </TouchableOpacity>
                   
                </View>
               
                <View style={stylemenu.linecontainer} />
                <TouchableOpacity style={stylemenu.btncontainer}
                    onPress={() => this.props.onAboutPress()}
                >
                    <Image
                        style={stylemenu.iconimg}
                        resizeMode='contain'
                        source={require("../../../assets/ASET/abouticon.png")}
                    />
                    <Text style={stylemenu.textmenu}>About Us</Text>
                </TouchableOpacity>
                <View style={stylemenu.linecontainer} />
                <TouchableOpacity style={stylemenu.btncontainer}
                    onPress={() => this.props.onContactPress()}
                >
                    <Image
                        style={stylemenu.iconimg}
                        resizeMode='contain'
                        source={require("../../../assets/ASET/contacticon.png")}
                    />
                    <Text style={stylemenu.textmenu}>Contact Us</Text>
                </TouchableOpacity>
                <View style={stylemenu.linecontainer} />
                <TouchableOpacity style={stylemenu.btncontainer}
                    onPress={() => this.props.onHelpPress()}
                >
                    <Image
                        style={stylemenu.iconimg}
                        resizeMode='contain'
                        source={require("../../../assets/ASET/help_ixon.png")}
                    />
                    <Text style={stylemenu.textmenu}>Help</Text>
                </TouchableOpacity>
                
            </View>
            <TouchableOpacity style={[stylemenu.btncontainer, {position:'absolute',bottom:convertHeight('3%'), height: convertHeight('12%'), marginLeft: 0,paddingLeft: convertWidth('14%'), width: convertWidth('100%'), backgroundColor: '#09665A' }]}
                onPress={() => this.props.onPressLogout()}
            >
                <Image
                    style={stylemenu.iconimg}
                    resizeMode='contain'
                    source={require("../../../assets/ASET/logout.png")}
                />
                <Text style={stylemenu.textmenu}>Log Out</Text>
            </TouchableOpacity>
        </View>
    }
    
}
const stylemenu=StyleSheet.create({
    iconimg:{
        width: convertWidth('3%')
    },
    textmenu:{
        fontFamily: Constant.POPPINS_SEMIBOLD, fontSize: convertWidth('2.5%'), color: "#fff",marginLeft: convertWidth('5%')
    },
    btncontainer:{
        width: convertWidth('80%'), height: convertHeight('14%'), alignItems: 'center', flexDirection: 'row', marginLeft: convertWidth("5%")
    },
   linecontainer: {
       width: convertWidth('80%'), borderColor: "#04665B", borderBottomWidth: 2,
    }
})

export default PopBurgerMenuViewModel;