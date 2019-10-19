import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, RefreshControl } from "react-native";
import Constant from '../../global/Constant';
import {convertHeight,convertWidth, getDokterRest, getExpendsList, callAlert, loading, isCloseBottom} from '../../global/Global';
import { Styleapp } from '../../styleapp';

import Headers from '../module_header'
import UserDashboard from "../../appcomponent/module_user";
import { ScrollView } from "react-native-gesture-handler";
import ExpendsesCell from "./module_expenses_cell";
import user from "../../global/user";
import { LEMARI_GLOBAL_LOAD } from "../../appcomponent/module_async/AsyncManager";
import KEYS from "../../appcomponent/module_async/utils/keyAsync";
import { GetAllDocterThisMonth } from "../../global/dokter_manager";

let dataDummy = [
{
    status:1,
        date:"20 December 2018 12.30",
    namadokter: "Presentation visit to Dr.Elena Homes on thuesday, 31 January 2019 at 10:00 AM",
    price: "100000",
},
{
    status:2,
    date:"20 December 2018 12.30",
    namadokter: "Presentation visit to Dr.Elena Homes on thuesday, 31 January 2019 at 10:00 AM",
    price: "100000",
},
{
    status:1,
    date:"20 December 2018 12.30",
    namadokter: "Presentation visit to Dr.Elena Homes on thuesday, 31 January 2019 at 10:00 AM",
    price: "20190110",
},
{
    status:3,
    date:"20 December 2018 12.30",
    namadokter: "Presentation visit to Dr.Elena Homes on thuesday, 31 January 2019 at 10:00 AM",
    price: "100000",
},
{
    status:1,
    date:"20 December 2018 12.30",
    namadokter: "Presentation visit to Dr.Elena Homes on thuesday, 31 January 2019 at 10:00 AM",
    price: "100000",
},

];

let that = null;
let colorSel = '#038B7B';

class ExpensesViewModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data:[],
            listDokter:[],
            allDatas:[],
            typeSelect:0,
            isLoading:true,
            isRefresh:false,
           
        }
        that = this;
    }
    componentDidMount() {
        this.setState({
            allDatas: this.props.screenProps._expensesList
        },()=> this._setData())

        //get list dokter
       /* getDokterRest().then(res=>{
            console.log(res)
            that.setState({
                listDokter:res
            })
        });*/
        //LEMARI_GLOBAL_LOAD(KEYS.KEY_SCHEDULE).then(res=>{
        let temp=[];
        GetAllDocterThisMonth(tem).then(()=>{
            that.setState({
                listDokter: temp
            })
        })
            
       //});

        //this._reqExpenseslist();
    }
    componentWillReceiveProps(){
        this.setState({
            allDatas: this.props.screenProps._expensesList
        }, () => this._setData())

    }
    _reqExpenseslist(){
        let data = new FormData();
        data.append("cms_users_id", user.getUsId());
        this.props.screenProps._reqExpendses(data).then(res => {
            console.log(res)
            if (res.data != null) {
                that.setState({ allDatas: res.data},()=>that._setData())
            } else {
                callAlert("Failed", res.api_message);
                that.setState({ isLoading: false, isRefresh:false})
            }
        })
    }
    onOpenForm = () => {
        console.log("to form", this.state.listDokter);
        if (this.state.listDokter.length>0){
            this.props.navigation.navigate(Constant.VM_EXPENSES_FORM, { "dokterlist": this.state.listDokter });
        }     
        
    }

    //PAGING CELL
     _setData(){
        
        const {data,allDatas} = this.state;
        let startData = data;
       if(allDatas.length>Constant.MAX_CELL){
           let max = Constant.MAX_CELL + startData.length;
           let startcel = startData.length;
           if (max > allDatas.length){
               max = allDatas.length
           }

           for (var i = startcel; i < max;i++){
               startData.push(allDatas[i])
           }

           this.setState({
               data: startData,
               isLoading: false, isRefresh: false
           })
       } else if (allDatas.length < Constant.MAX_CELL){
           this.setState({
               data: allDatas,
               isLoading: false, isRefresh: false
           })
       }
      
    }
    _setFilter(){
        const {typeSelect,allDatas} = this.state;
        this._doneProgress(1);
        let cat = "";
        if(typeSelect == 1){
            cat = "Approved";
        }else if(typeSelect == 2){
            cat = "Pending";
        }else if(typeSelect == 3){
            cat = "Rejected";
        }else{
            cat = "ALL"
        }
        let filterdata = []
        if(typeSelect >0){
            allDatas.forEach((curdata) => {
                console.log(curdata);
                if (curdata.status == cat){
                    filterdata.push(curdata);
                }
            })
            this.setState({
                data: filterdata
            }, () => this._doneProgress(0));
        }else{
            this.setState({
                data:allDatas
            }, () => this._doneProgress(0));
        }
       

    }
    _doneProgress(id){
        this.setState({
            isLoading: id==0?false:true
        })
    }
    _onSelect(id){
        this.setState({
            typeSelect:id
        },()=>this._setFilter())
    }
    _onRefresh() {
        this.setState({isRefresh: true }, 
            () => this._reqExpenseslist());
    }
    _onEndScroll(e){
        if (isCloseBottom(e.nativeEvent)) {
            console.log('end')
            this._setData();
        }
    }
   
    ///
    render() {
        const { data, typeSelect, isLoading, isRefresh,isPdf} = this.state;
        return <View style={{ backgroundColor: '#F9F9F2', flex: 1 }}>
            <Headers
                navigation={this.props.navigation}
                burgeronpress={this.props.screenProps._callPopBurger}
                titleheader={Constant.TAB_EXPENSES}
            />
            <UserDashboard atExpenses={true}
                ref={dashboard => this.dashboard = dashboard}
                onPressStart={this.onOpenForm}
             />
            <View style={[styles.statussortcontainer, { marginTop: convertHeight('10%'),}]}>
                    <TouchableOpacity 
                        style={[styles.buttonsortcontiner, { backgroundColor: typeSelect == 1 ? colorSel: '#FBFBFB'}]}
                     onPress={()=>this._onSelect(1)}
                    >
                        <Text style={[styles.buttonTextStyle, { color: typeSelect == 1 ? '#FBFBFB' : Constant.COLOR_GRAY2}]}
                        >{"Approved"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.buttonsortcontiner, { backgroundColor: typeSelect == 2 ? colorSel : '#FBFBFB' }]}>
                        <Text style={[styles.buttonTextStyle, { color: typeSelect == 2 ? '#FBFBFB' : Constant.COLOR_GRAY2 }]}
                            onPress={() => this._onSelect(2)}
                        >{"Pending"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsortcontiner, { backgroundColor: typeSelect == 3 ? colorSel : '#FBFBFB' }]}
                        onPress={() => this._onSelect(3)}
                    >
                        <Text style={[styles.buttonTextStyle, { color: typeSelect == 3 ? '#FBFBFB' : Constant.COLOR_GRAY2 }]}
                        >{"Rejected"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonsortcontiner, { backgroundColor: typeSelect == 0 ? colorSel: '#FBFBFB' }]}
                        onPress={() => this._onSelect(0)}
                    >
                        <Text style={[styles.buttonTextStyle, { color: typeSelect == 0 ? '#FBFBFB' : Constant.COLOR_GRAY2 }]}
                        >{"All"}</Text>
                    </TouchableOpacity>
                </View>
            {data.length>0 && 
                <ScrollView style={styles.scrollcontainer}
                refreshControl={<RefreshControl
                    refreshing={isRefresh}
                    onRefresh={this._onRefresh.bind(this)}
                />}
                onScroll={(e) => this._onEndScroll(e)}
                scrollEventThrottle={400}
                >

                    {data.map((data, index) => (
                        <ExpendsesCell
                            key={index}
                            status={data.status}
                            doktername={data.purpose}
                            date={data.setdate}
                            price={data.amount}
                        />
                    ))
                    }
                </ScrollView>
            }
            {isLoading == false && data.length == 0 &&
                <TouchableOpacity style={{
                    width: convertWidth('100%'),
                    height: convertHeight('20%'),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: Constant.POPPINS_REG,
                        fontSize: convertWidth('2%')

                    }}>{'Expenses Empty'}</Text>
                </TouchableOpacity>

            }
          
            {isLoading == true &&
                loading()
            }
          
        </View>
    }
    
}
const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    scrollcontainer:{
       // marginTop: convertHeight('1%'),
        marginHorizontal:convertWidth('2%')
    },  
    buttonsortcontiner:{
        height:'70%',
        width: convertWidth('10%'),
        justifyContent: 'center',
        alignItems:'center',
        borderWidth:1,
        borderColor: Constant.COLOR_LINE,
      
        
    },  
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    buttonTextStyle: {
        fontFamily: Constant.POPPINS_MEDIUM,
        fontSize: convertHeight("2%"),
        color:Constant.COLOR_GRAY2
    },
    statussortcontainer:{
        flexDirection: 'row',
        
        height:convertHeight('8%'),
        width:convertWidth('100%'),
        alignItems: 'center',
       paddingLeft: convertWidth('2%'),
       marginBottom: convertHeight('2%'),
     
    }
});

export default ExpensesViewModel;