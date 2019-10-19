import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, callAlert, loading, formateFullDateNumber } from '../../global/Global';
import { Styleapp } from '../../styleapp';

import Headers from '../module_header'
import UserDashboard from "../../appcomponent/module_user";
import { ScrollView } from "react-native-gesture-handler";
import ExpendsesCell from "./module_expenses_cell";
import ExpensesFormCell from "./expensesformcell";
import { sendExepense } from "../../module_api/module_resapi";
import user from "../../global/user"
import { LEMARI_GLOBAL_LOC, F_I_F_O_GLOBAL_LOC } from "../../appcomponent/module_async/AsyncManager";
import KEYS from "../../appcomponent/module_async/utils/keyAsync";

let that=null;
class ExpensesFormViewModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data: [],
            isLoading:false,
            listdokter:[],
            datadokter:[]
        }
    }
    componentDidMount() {
       
        if(this.props.navigation.state.params!=null){
            let listdokter = [];
            let datadokter = [];
            this.props.navigation.state.params.dokterlist.map((item)=>{
                listdokter.push(item.name)
                datadokter.push(item)
            })
            this.setState({ listdokter, datadokter}, () => this.onAddCell());
            console.log('list doket', listdokter)
           
        }
        that = this;
    }
   
    
    onOpenSignature = () => {
        this.props.screenProps.navigation.navigate(Constant.VM_SIGNATURE);
    }
    onAddCell(){
        this.setState({
           isLoading: true
        })
       // let _data = this.state.data;
        //_data.push(<ExpensesFormCell key={_data.length}/>)

        this.setState({
            data: <ExpensesFormCell ref={refs=>{this.cell = refs}} list={this.state.listdokter} key={this.state.data.length} />
        },()=>{
                this.setState({
                   isLoading: false
                })
        })
    }
    onRenderCell(){
        return this.state.data;
    }
    onSubmit(){
        //this.props.navigation.goBack();
        //console.log(this.cell._ongetData())
        this._trySendExpense(this.cell._ongetData());
    }
  
    render() {
        const { data,isLoading} = this.state;
        return <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Headers
                navigation={this.props.navigation}
                burgeronpress={this.props.screenProps._callPopBurger}
                titleheader={Constant.TAB_EXPENSES}
            />
           
            <ScrollView style={styles.scrollcontainer}
            contentContainerStyle={{
                flexGrow:1,
               alignItems: 'center'
            }}
            >
                <Text style={styles.titleText}>{"Input Your Expenses Amount"}</Text>

                {this.onRenderCell()}

                <View style={{ height: convertHeight("2%")}}/>
                <View style={{ flexDirection: 'row', height: convertHeight("9%"),marginHorizontal:convertWidth('5%'), width: convertWidth('50%'),alignSelf: 'flex-end',justifyContent: 'flex-end'}}>
                   
                    <TouchableOpacity
                        onPress={() => this.onSubmit()}
                        style={{
                            alignSelf: 'flex-end', marginRight: '5%', width: convertWidth('20%'), height: convertWidth('5%'), justifyContent: 'center', alignItems: 'center', borderRadius: 25,
                          
                            backgroundColor: Constant.COLOR_ORANGE1
                        }}>
                        <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: convertWidth('1.8%'), color: "#fff" }}>{"Submit"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: convertHeight("10%") }} />
            </ScrollView>
            {isLoading && loading()}
        </View>
    }
    //REST API

    //request
    _trySendExpense(datas) {
        let data = new FormData();
        let dokter = this.state.datadokter[Number(datas.indexdoktor)];
        console.log("dokter id ",dokter)
        
        data.append("cms_users_id", user.getUsId());
        data.append("doctors_id", dokter.id );
        data.append("setdate", datas.date);
        data.append("amount", Number(datas.amount));
        data.append("purpose", datas.purpose);
        if (dokter.id < 1) {
            return callAlert("Failed", "Select Doctor");
        }
        if (datas.date < 2) {
            return callAlert("Failed", "Insert Your Date");
        }
        if (Number(datas.amount) < 1 ) {
            return callAlert("Failed", "Your Amount To Small");
        }
        if (Number(datas.amount) >10000000) {
            return callAlert("Failed", "Your Amount To Big");
        }
        if (datas.purpose == null || datas.purpose.length < 2) {
            return callAlert("Failed", "Insert Your Purpose");
        }
        if (datas.photouri == null){
            return callAlert("Failed", "Please Upload Photo");
        }
        data.append("picture", {
            uri: datas.photouri.uri,
            type: datas.photouri.type,
            name: datas.photouri.fileName
        });

        let _data = {
            "cms_users_id": user.getUsId(),
            "doctors_id": dokter.id,
            "setdate": datas.date,
            "amount": Number(datas.amount),
            "purpose": datas.purpose,
            "picture": {
                uri: datas.photouri.uri,
                type: datas.photouri.type,
                name: datas.photouri.fileName
            }
        }

        console.log("kirim ", data)
        this.setState({
            isLoading: true
        });
        //this._sendOFF(_data);
       
        try{
            sendExepense(data).then((res) => {
                console.log('resulth schedule', res);

                if (res) {
                    if (res.api_message == 'success') {
                        callAlert("", res.api_message);
                        that.props.navigation.goBack();
                        that.setState({ isLoading: false });
                    } else {
                        callAlert("Failed", res.api_message);
                        that._sendOFF(_data);
                    }

                } else {
                    callAlert("Failed", res);
                    that._sendOFF(_data);
                }
            });
        }catch(error){
            that._sendOFF(_data);
            
        }
    }
    _sendOFF(_datas){
        let _jdata = {
            id:0 ,
            data: _datas,
            type: KEYS.KEY_SEND_EXEPENDS
        }
        F_I_F_O_GLOBAL_LOC([_jdata]);
        this.props.navigation.goBack();
        this.setState({ isLoading: false });
    }
}
const styles = StyleSheet.create({
    titleText:{
        width: convertWidth('90%'),
        fontFamily: Constant.POPPINS_MEDIUM,
        //borderWidth:1,
        color:"#000",
        textAlign: 'center',
        fontSize:convertWidth("2%"),
        marginTop: convertHeight('5%'),
        marginBottom: convertHeight('5%'),
    },
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    scrollcontainer: {
       // marginTop: convertHeight('1%'),
        marginHorizontal: convertWidth('2%'),
       
    },
    buttonsortcontiner: {
        height: '70%',
        width: convertWidth('10%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
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
        color: Constant.COLOR_GRAY2
    },
    statussortcontainer: {
        flexDirection: 'row',
        backgroundColor: '#FBFBFB',
        height: convertHeight('8%'),
        width: convertWidth('100%'),
        alignItems: 'center',
        paddingLeft: convertWidth('2%'),
        marginBottom: convertHeight('2%')
    }
});

export default ExpensesFormViewModel;