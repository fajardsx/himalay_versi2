import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, RefreshControl } from "react-native";

//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, addSpace, formateFullDayUTC, getListLocation, formatCurrentTime, formateFullDayUTCFormat, isCloseBottom} from '../../global/Global';
import { Styleapp } from '../../styleapp';

import Headers from '../module_header'
import CalendarView from "../../appcomponent/module_calendar";
import { ScrollView } from "react-native-gesture-handler";
import HistoryCell from "../../appcomponent/module_historycell";
import user from "../../global/user";



let dataDummy = [{
    jarak: "< 10 Km", 
    namadokter:"Dr.Harry"
},
{
    jarak: "< 10 Km", 
    namadokter: "Dr.Neni"
},
{
    jarak: "< 10 Km", 
    namadokter: "Dr.Fachri D."
},
{
    jarak: "< 10 Km",
    namadokter: "Dr.Anna Maria" 
},
{
    jarak: "< 10 Km", 
    namadokter: "Dr.Thomas"
},
{
    jarak: "< 18 Km", 
    namadokter: "Dr.Michele"
}
];
let that;
class HistoryViewModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            currentDay: formateFullDayUTC(new Date()),
            isLoading:true,
            isRefresh:false,
            data:[],
            allData:[]
        }
        that = this;
    }
    componentDidMount() {
        //console.log(formateFullDayUTCFormat(new Date(),"Y-MM-DD"));
       //this._onReqListLocation(formateFullDayUTCFormat(new Date(), "Y-MM-DD"));
        this.setState({
            allData: this.props.screenProps._historydata
        }, () => this._setData())

        //console.log("history", this.props.screenProps._historydata);
    }
    componentWillReceiveProps(){
        this.setState({
            allData: this.props.screenProps._historydata
        }, () => this._setData())
    }
    _onSelectDate(e){
       // console.log("select date ",e);
       // console.log("select date ", formateFullDayUTCFormat(e, "Y-MM-DD"));
       if(Constant.ONLINE==true){
           this.setState({
               currentDay: formateFullDayUTC(e),
               data: [],
               isLoading: true
           }, () => this._onReqListLocation(formateFullDayUTCFormat(e, "Y-MM-DD")))
       }else{
           
       }
       
    }
    _onReqListLocation(date){

        this.props.screenProps._reqHistory(date).then(res=>{
            console.log(res)
            if(res.api_message == 'success') {
                if (res.data != null) {
                    that.setState({
                        allData: res.data
                    }, () => that._setData())
                }
            }
        })
    
    }
    _onRefresh() {
        this.setState({ isRefresh: true },
            () => this._onReqListLocation());
    }
    _onEndScroll(e) {
       
        if (isCloseBottom(e.nativeEvent)){
           // console.log('end')
            this._setData();
        }
       
    }
    _setData(){
        const{data,allData} = this.state;
        let startData = data;
        if (allData.length > Constant.MAX_CELL) {
            let max = Constant.MAX_CELL + startData.length;
            let startcel = startData.length;
            if (max > allData.length) {
                max = allData.length
            }

            for (var i = startcel; i < max; i++) {
                startData.push(allData[i])
            }

            this.setState({
                data: startData,
                isLoading: false, isRefresh: false
            })
        } else if (allData.length < Constant.MAX_CELL) {
            this.setState({
                data: allData,
                isLoading: false, isRefresh: false
            })
        }
    }
    render() {
        const { currentDay, data, isLoading, isRefresh} = this.state;
        return <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Headers
                navigation={this.props.navigation}
                burgeronpress={this.props.screenProps._callPopBurger}
                titleheader={Constant.TAB_HISTORY}
            />
            <ScrollView style={{flex:1}}
                refreshControl={<RefreshControl
                    refreshing={isRefresh}
                    onRefresh={this._onRefresh.bind(this)}
                />}
                onScroll={(e) => this._onEndScroll(e)}
                scrollEventThrottle={400}
            >    
                <CalendarView onSelect={this._onSelectDate.bind(this)}/>
                {addSpace("10%")}
                <Text style={styles.titletxt}>{currentDay}</Text>
                {addSpace("5%")}
             
                <View style={{height: convertHeight('10%')}}/>
            </ScrollView>
           
        </View>
    }

}
/*
   {
                    isLoading == false && data.length > 0 && data.map((data, index) => (
                    <HistoryCell key={index} id={index} dataSchedule={data} namadokter={data.namadokter}/>
                ))
                }

                {isLoading == false && data.length == 0 &&
                    <Text style={styles.titleWarningtxt} >
                        {"No Data Found"}
                    </Text>
                }
                {isLoading == true &&
                    <Text style={styles.titleWarningtxt} >
                        {"Loading Data.."}
                    </Text>
                }
*/
const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    titletxt:{
        width: convertWidth('90%'),
        height: convertHeight('10%'),
        textAlignVertical: 'center',
        fontFamily: Constant.POPPINS_REG,
        fontSize: convertWidth('2%'),
        color: Constant.COLOR_BLACK,
        marginLeft: convertWidth('5%'),
        paddingLeft: convertWidth('3%'),
        borderLeftWidth: 10, borderColor: "#4B4B4B",
        textAlign: 'left', backgroundColor: '#F7F7F7'
    },
    titleWarningtxt:{
        width: convertWidth('90%'),
        height: convertHeight('10%'),
        textAlignVertical: 'center',
        fontFamily: Constant.POPPINS_LIGHT,
        fontSize: convertWidth('2.5%'),
        color: Constant.COLOR_GRAY2,
      
        textAlign: 'center'
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});

export default HistoryViewModel;