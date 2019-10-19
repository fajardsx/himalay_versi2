import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl} from "react-native";
import {withNavigationFocus } from "react-navigation";
//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, callAlert, loading, isCloseBottom} from '../../global/Global';
import { Styleapp } from '../../styleapp';

import Headers from '../module_header'
import NotificationCell from "./Module_notificationcell";
import user from "../../global/user";
import { gNotification } from "../../module_api/module_resapi";

const DataDummy=[{
    title:"Complete Schedule,"+user.getNameUser()+'!',
    desc:"Congratulations,you today schedule is done",
    dateNotif:"1549447200",
    status:0,
    isRead:false
},
{
    title:"Oops,inComplete Schedule!",
    desc:"Congratulations,you today schedule is done",
    dateNotif:"1549447200",
    status: 1,
    isRead: false
},
{
    title:"Succeed!",
    desc:"Sorry,Today you can't achieve your schedule.Please check it now",
    dateNotif:"1549447200",
    status: 2,
    isRead: true
},
{
    title:"Waiting for approval",
    desc:"Congratulations,you today schedule is done",
    dateNotif:"1549447200",
    status: 3,
    isRead: true
},
{
    title:"Failed",
    desc:"Congratulations,you today schedule is done",
    dateNotif:"1549447200",
    status: 4,
    isRead: true
},
]

let that;
class NotificationViewModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            datas:[],
            allDatas:[],
            isLoading:true,
            isRefresh:false
        }
        that = this;
    }
    componentDidMount() {
        console.log("notif screen", this.props.screenProps._notifdata)
        this.setState({
            datas:[],
            allDatas: this.props.screenProps._notifdata,
            isLoading: true
        }, () => this._setData())
        this._reqFromParent();
        this.props.screenProps._callCloseBurger();
        this.focuslistener = this.props.navigation.addListener("didFocus", () => {
            this.props.screenProps._callCloseBurger();
        });
    //.reverse()
    }
    componentWillReceiveProps(){
        console.log("receive notif screen", this.props.screenProps._notifdata )
        this.setState({
            allDatas: this.props.screenProps._notifdata,
            isLoading: true
        }, () => this._setData())
    }
    _reqFromParent(){
        this.props.screenProps._reqNotif();
    }
    
    _setData(){
        const { datas,allDatas} = this.state;
       console.log(allDatas.length)
        
        let startData = datas;
        if (allDatas.length >= Constant.MAX_CELL) {
            let max = Constant.MAX_CELL + startData.length;
           
            let startcel = startData.length;
            if (max > allDatas.length) {
                max = allDatas.length
            }

            for (var i = startcel; i < max; i++) {
                startData.push(allDatas[i])
            }

            this.setState({
                datas: startData,
               
            }, () => this._onComplete())
        } else if (allDatas.length < Constant.MAX_CELL) {
            this.setState({
                datas: allDatas,
            }, () => this._onComplete())
        }

       
    }
    _onComplete(){
        this.setState({
            isLoading: false, isRefresh: false
        })
    }
    _onRefresh() {
        this.setState({ isRefresh: true, datas: [] },
            () => this._reqFromParent());
    }
    _onEndScroll(e) {
        if (isCloseBottom(e.nativeEvent)) {
            //console.log('end')
            this._setData();
        }
    }
    render() {
        const { datas, isLoading, isRefresh, allDatas} = this.state;
        return <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Headers
                navigation={this.props.navigation}
                titleheader={Constant.TAB_NOTIF}
                burgeronpress={this.props.screenProps._callPopBurger}
            />
            {datas.length>0 &&
                <ScrollView style={styles.scrollcontainer}
                refreshControl={<RefreshControl
                    refreshing={isRefresh}
                    onRefresh={this._onRefresh.bind(this)}
                />}
                showsHorizontalScrollIndicator={false}
                onScroll={(e) => this._onEndScroll(e)}
                scrollEventThrottle={400}
                >
                    {datas.length > 0 && datas.map((data, index) => (
                        <NotificationCell
                            key={index}
                            datacell={data}
                            _onNotifOpen={this.props.screenProps._onNotifOpen.bind(this)}
                        />
                    ))
                    }
                </ScrollView>
            }
            {isLoading == false && allDatas.length==0 &&
                <TouchableOpacity style={{
                width: convertWidth('100%'),
                height: convertHeight('20%'),
                justifyContent: 'center',
                alignItems: 'center'
                }}
                onPress={()=>this._reqFromParent()}
                >
                <Text style={{
                    fontFamily: Constant.POPPINS_REG,
                    fontSize:convertWidth('2%')

                }}>{'Notification Empty'}</Text>
                </TouchableOpacity>
               
            }
            {isLoading == true &&
                loading()
            }
        </View>
    }

}
const styles = StyleSheet.create({
    scrollcontainer: {
        marginTop: convertHeight('1%'),
        marginHorizontal: convertWidth('5%'),
        width: convertWidth('100%')
    },  
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});

export default withNavigationFocus(NotificationViewModel);