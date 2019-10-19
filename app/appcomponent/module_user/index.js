import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import ShadowView from 'react-native-shadow-view';

//
import Constant from '../../global/Constant';
import {convertHeight,convertWidth, getDokterId, getDokterisArray, getDokterStatusTodayTab, getDoctorTotal, formateFullDateNumber, formateFullDateNumberUTCTime} from '../../global/Global';
import user from '../../global/user';
import {Styleapp} from '../../styleapp';
import { LEMARI_GLOBAL_LOAD, SYNCLoc } from "../module_async/AsyncManager";
import KEYS from "../module_async/utils/keyAsync";
import { isToday } from "date-fns";
import { GetMeetDoktor, UpdateOFFLINE_list_doctor_set_this_month, GetAllDocter, GetAllDocterCound, getTodayPlan } from "../../global/dokter_manager";
import DATA_SCHEDULE from "../../db/dataScheduleManager";




let  MET_COUNT = 0;
let  TOTAL_COUNT = 0;
let TODAY_NUM = 0;
let ROLE=0;
let that = null;
let tempMetfound = [];
let tempSetSchedul = [];
let compelete = false;

class UserDashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            wSchedule:0,
            scheduletxt:[],
            scheduleYesterdaytxt:[],
            todaytxt:[],
            metCount:0,
            popAbsenShow:false,
            todayplan:0,
            meetcount:0,
        }
        that = this;
    }
    componentDidMount(){
       // this.updateStatusSchedule();
       // console.log("dashboard user",this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.onGetCFData();
    }
    
    scheduleSize(e) {
        this.setState({
            wSchedule:e.nativeEvent.layout.width
        })
    }
    setTextBtn(){
        if(this.props.atExpenses == false){
            user.getStatusRole(); 
            switch (this.props.userrole) {
                case Constant.ROLE_INLOGIN:
                    return "Start Your Day";
                    break;
                case Constant.ROLE_INSELECTSCHEDULE:
                    return "Set";
                    break;
                case Constant.ROLE_ADDDOCTORAGAIN:
                    return "Set";
                    break;
                case Constant.ROLE_READYSTARTSCHEDULE:
                    return "Finish";
                    break;
                case Constant.ROLE_FINISHTODAY:
                    return "End This Today";
                    break;
            }
        }else{
            return "+ Add Expenses";
        }
        
    }
    onGetAddFriend(){
        //console.log("add button")
        //ADD OTHER DOCTOR
        if (this.props.atExpenses == false && this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE){
            if (this.state.todaytxt!=this.state.scheduletxt){
                return <TouchableHighlight
                    underlayColor={Constant.COLOR_WHITE3}
                    style={{
                        width: convertWidth('5%'),
                        height: convertWidth('5%'),
                        borderRadius: convertWidth('5%'), backgroundColor: Constant.COLOR_BLUE,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => this.props.onAgain()}
                >
                    <Image
                        style={{ width: convertWidth('2.5%'), height: convertWidth('2.5%') }}
                        resizeMode={'contain'}
                        source={require('../../../assets/ASET/add_doctor.png')}
                    />
                </TouchableHighlight>
            }
            
        } if (this.props.atExpenses == false && this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN) {
            if (this.state.todaytxt != this.state.scheduletxt) {
                return <TouchableHighlight
                    underlayColor={Constant.COLOR_WHITE3}
                    style={{
                        width: convertWidth('5%'),
                        height: convertWidth('5%'),
                        borderRadius: convertWidth('5%'), backgroundColor: Constant.COLOR_RED2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => this.props.onCancelAgain()}
                >
                    <Image
                        style={{ width: convertWidth('2%'), height: convertWidth('2%') }}
                        resizeMode={'contain'}
                        source={require('../../../assets/ASET/xclose_white.png')}
                    />
                </TouchableHighlight>
            }

        }else{
           return  <View
                style={{
                    width: convertWidth('5%'),
                    height: convertWidth('5%'),
                    orderRadius: convertWidth('5%'), backgroundColor: "rgba(0,0,0,0)",
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                
            </View>
        }
       
    }
    getColorScheduleText(){
        if(this.props.atExpenses){
            return Constant.COLOR_GRAY2;
        } else if (this.props.atExpenses == false ){
            if (this.props.userrole == Constant.ROLE_INSELECTSCHEDULE || this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN)
            {
                return '#5C5C5C'//Constant.COLOR_BLUE
            } else if (this.props.userrole ==Constant.ROLE_READYSTARTSCHEDULE) {
                     return Constant.COLOR_GRAY2;
                   }

        }else{
            return Constant.COLOR_BLACKALL;
        }
    }
    getColorTodayText() {
        if (this.props.atExpenses == true) {
            return Constant.COLOR_GRAY2;
        } else if (this.props.atExpenses == false && this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE) {
            return Constant.COLOR_GREEN5;
        } else if (this.props.atExpenses == false && this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN) {
            return Constant.COLOR_GREEN5;
        } else if (this.props.atExpenses == false && this.props.userrole== Constant.ROLE_INSELECTSCHEDULE && this.state.todaytxt!=null && this.state.todaytxt.length>0) {
            return Constant.COLOR_GREEN5;
        } else if (this.props.atExpenses == false && this.props.userrole== Constant.ROLE_FINISHTODAY && this.state.todaytxt!=null && this.state.todaytxt.length>0) {
            return Constant.COLOR_GREEN5;
        }else{
            return Constant.COLOR_GRAY2;
        }
    }
    updateStatusSchedule(data1,data2){
        this.onGetTotal()
        this.setState({
            scheduletxt:user.getUserSchedule(),
            todaytxt: user.getUserToday(),
            scheduleYesterdaytxt:user.getUserDoneMonth(),
        })
    }
    tryGetPhotoProfil(){
        let _url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        if(user.getPhoto()!=null){
            _url = user.getPhoto();
            if (_url.includes('http') == false){
                _url = Constant.BASELINK+user.getPhoto();
            }
        }   
        return _url;
    }
    setSizeButtonStart(){
        if (this.props.atExpenses == true || this.props.userrole == Constant.ROLE_INLOGIN){
            return convertWidth('1.4%');
        }else{
            return convertWidth('1.9%') 
        }
    }
    onTargetToday(){
        const { todaytxt, scheduletxt} = this.state;
        //TODAY_NUM = 0;
       
        if(todaytxt!=null){
            let tempfound=[];
           
            //console.log('schedule', scheduletxt);
           
            let loc = formateFullDateNumber(Date.now(), "YYYY-MM-DD");
            /*
            todaytxt.map((data, index) => {
                console.log('dashboard today', data);
                
                let dataCreate = formateFullDateNumberUTCTime(data.created_at, "YYYY-MM-DD");
                //console.log("today schedule", dataCreate)
                //console.log("today date", loc)
               // if(loc == dataCreate){
                    today_num++;
                //}
            })*/
            //console.log("TODAY COUNT", tempSetSchedul);
            
            
           
        }
        /*if (this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN || this.props.userrole == Constant.ROLE_INSELECTSCHEDULE){
            GetAllDocterCound(this.setTodayPlanCount);
            TODAY_NUM = this.setTodayPlanCount+user.getUserToday().length;
        }else{*/
            GetAllDocterCound(this.setTodayPlanCount.bind(this));
       // }
        
       // return today_num;
    }
    async setTodayPlanCount(num){
        console.log("TODAY_NUM ",num);
       // console.log("GET USER TODAY ", user.getUserToday().length);
       /* if (this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN || this.props.userrole == Constant.ROLE_INSELECTSCHEDULE){
            if(user.getUserToday().length>num){
                TODAY_NUM = user.getUserToday().length;
            }else{
                TODAY_NUM = num + user.getUserToday().length;
            }
           
        }else{
            if(num>TODAY_NUM){*/
                let resultcount = await getTodayPlan();
                console.log("getTodayPlan()",resultcount)
                TODAY_NUM = resultcount;
                this.setState({
                    todayplan:resultcount
                }, () => this.onGetCFData())
          //  }
        //}
    }
    onGetTotal(){
        getDoctorTotal().then(res => {
            TOTAL_COUNT = res;
        });
    }
    onGetBFData(){
        const {scheduletxt,scheduleYesterdaytxt,todaytxt} = this.state;
        let bf = 0;
        //console.log(scheduleYesterdaytxt)
        if(scheduletxt!=null && scheduleYesterdaytxt!=null){
            scheduletxt.forEach((data, index) => {
                //console.log(data)
                scheduleYesterdaytxt.map((datas,index)=>{
                    if (data.id == datas.id){
                        bf++;
                    }
                })
            })
           
        }
        if(scheduletxt!=null){
            bf = TOTAL_COUNT - MET_COUNT;
           if(bf<0){
               bf =0
           }
        }
        return bf;
    }
     onGetCFData(){
        const {scheduletxt,todaytxt} = this.state;
        let CF = 0;
        let resultCF =0;
        
        GetMeetDoktor(tempMetfound)
         

         UpdateOFFLINE_list_doctor_set_this_month(tempMetfound).then(res=>{
             if(res){
                 MET_COUNT = res.length;
             }
         })
         //MET_COUNT = tempMetfound.length;
    }
    onFinish(){
        this.props.onPressStart();
    }
    onCheckComplete(_callback) {
        const { scheduletxt, todaytxt } = this.state;
        let resulthComplete = false;
        let complete = 0;
        let dokterSelect = 0;
        DATA_SCHEDULE.getDataSchedule().then(res => {
            if (res) {
                // console.log(res[0])
                if (res.set_schedule && res.set_schedule.length > 0) {
                    res.set_schedule.forEach((rs, index) => {
                        rs.doctors.forEach((dokter, index) => {
                            //console.log("status resulth", dokter);
                            dokterSelect++;
                            if (dokter.schedule) {
                                dokter.schedule.forEach((dataResulth, index) => {
                                    // console.log("dokter schedule", dataResulth)
                                    if (dataResulth.results) {
                                        let _status = dataResulth.results.status;
                                        //console.log("status resulth", dataResulth.results.feedback_sales);

                                        if (isToday(dataResulth.results.updated_at)) {
                                            if (dataResulth.results.feedback_sales != null && _status != null) {
                                                if (dataResulth.results.feedback_sales.length > 2) {
                                                    complete++;
                                                }

                                            }
                                            //console.log("today complete " + complete + "," + dokterSelect)
                                        }

                                    }
                                })
                            }
                        });
                    })
                    //console.log("today complete " + complete + "," + dokterSelect)
                    if (complete == dokterSelect) {
                        if (complete > 0) {
                            resulthComplete = true;
                        }

                    } else {
                        resulthComplete = false;
                    }
                    //console.log("complete ",resulthComplete);
                    _callback(resulthComplete);
                }
            }
        })
      //  console.log("today dokter schedule", todaytxt)
        /*SYNCLoc(KEYS.KEY_G,KEYS.KEY_SCHEDULE).then(res=>{
            if(res){
               // console.log(res[0])
                if (res[0].set_schedule && res[0].set_schedule.length>0){
                    res[0].set_schedule.forEach((rs, index) => {
                        rs.doctors.forEach((dokter,index)=>{
                            //console.log("status resulth", dokter);
                            dokterSelect++;
                            if (dokter.schedule) {
                                dokter.schedule.forEach((dataResulth, index) => {
                                    // console.log("dokter schedule", dataResulth)
                                    if (dataResulth.results) {
                                        let _status = dataResulth.results.status;
                                        //console.log("status resulth", dataResulth.results.feedback_sales);

                                        if (isToday(dataResulth.results.updated_at)) {
                                            if (dataResulth.results.feedback_sales != null && _status != null) {
                                                if (dataResulth.results.feedback_sales.length > 2) {
                                                    complete++;
                                                }

                                            }
                                            //console.log("today complete " + complete + "," + dokterSelect)
                                        }

                                    }
                                })
                            }
                        });
                    })
                    //console.log("today complete " + complete + "," + dokterSelect)
                    if (complete == dokterSelect) {
                        if (complete > 0){
                            resulthComplete = true;
                        }
                       
                    }else{
                        resulthComplete = false;
                    }
                    //console.log("complete ",resulthComplete);
                    _callback(resulthComplete);
                }
            }
        })*/
       /* if (todaytxt != null) {
            todaytxt.forEach((dokter, index) => {
               
                dokterSelect++;
                if (dokter.schedule){
                    dokter.schedule.forEach((dataResulth, index) => {
                        // console.log("dokter schedule", dataResulth)
                        if (dataResulth.results) {
                            let _status = dataResulth.results.status;
                            //console.log("status resulth", dataResulth.results.feedback_sales);
                            console.log("status resulth", dataResulth.results);
                            if (isToday(dataResulth.results.updated_at)){
                                if (dataResulth.results.feedback_sales != null && _status != null) {
                                    if (dataResulth.results.feedback_sales.length > 2){
                                        complete++;
                                    }
                                   
                                }
                               console.log("today complete " + complete + "," + dokterSelect)
                            }
                          
                        } 
                    })
                }
               
            })
           
            if (complete == dokterSelect && complete>0) {
                resulthComplete = true;
            }

            return resulthComplete;
        }*/
       
    }
    updateComplete(res){
        compelete = res;
    }
    setButtonSet(){
        let colorbtn = "#00B7A2";
        let colorbtntxt = "#fff";
        //console.log("BUTTON MODE", user.getStatusRole());

        if (this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE){
          
           
            this.onCheckComplete(this.updateComplete.bind(this));
            if (compelete == false){
                colorbtn = Constant.COLOR_GRAY2;
                colorbtntxt = Constant.COLOR_WHITE5;
            }

            return <TouchableHighlight
                underlayColor={Constant.COLOR_WHITE3}
                onPress={() =>compelete==true?this.onFinish():null}
                style={{
                    marginLeft: convertWidth('3.5%'), width: convertWidth('15%'), height: convertHeight('6%'), justifyContent: 'center', alignItems: 'center', borderRadius: 25,
                    backgroundColor: colorbtn
                }}>
                <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: this.setSizeButtonStart(), color: colorbtntxt }}>{this.setTextBtn()}</Text>
            </TouchableHighlight>
        } else if (this.props.userrole == Constant.ROLE_FINISHTODAY){
            return <TouchableHighlight
               // onPress={() => compelete == true ? this.onFinish() : null}
                underlayColor={Constant.COLOR_WHITE3}
                style={{
                    marginLeft: convertWidth('3.5%'), width: convertWidth('15%'), height: convertHeight('6%'), justifyContent: 'center', alignItems: 'center', borderRadius: 25,
                    backgroundColor: Constant.COLOR_GRAY2
                }}>
                <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: convertWidth('1.5%'), color: Constant.COLOR_WHITE5 }}>{this.setTextBtn()}</Text>
            </TouchableHighlight>
        } else if (this.props.userrole == Constant.ROLE_NOTLOGIN) {
            return null;
        }else{
            return <TouchableHighlight
                underlayColor={Constant.COLOR_WHITE3}
                onPress={() => this.props.onPressStart != null ? this.props.onPressStart() : {}}
                style={{
                    marginLeft: convertWidth('3.5%'), width: convertWidth('15%'), height: convertHeight('6%'), justifyContent: 'center', alignItems: 'center', borderRadius: 25,
                    backgroundColor: colorbtn
                }}>
                <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: this.setSizeButtonStart(), color: colorbtntxt }}>{this.setTextBtn()}</Text>
            </TouchableHighlight>
        }
       
    }
    setButtonExpendsSet() {
        let colorbtn = "#00B7A2";
        let colorbtntxt = "#fff";
        return <TouchableOpacity
                onPress={() => this.props.onPressStart != null ? this.props.onPressStart() : {}}
                style={{
                    marginLeft: convertWidth('3.5%'), width: convertWidth('15%'), height: convertHeight('6%'), justifyContent: 'center', alignItems: 'center', borderRadius: 25,
                    backgroundColor: colorbtn
                }}>
                <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: this.setSizeButtonStart(), color: colorbtntxt }}>{this.setTextBtn()}</Text>
            </TouchableOpacity>
        

    }
    get popAbsen(){
        return <View style={styles.absenContainer}>
            <View style={styles.absenTextContainer}>
                <Text style={[styles.absenTextFormat, { color: Constant.COLOR_GREEN5,fontWeight:'bold' }]}>IN</Text>
                <Text style={styles.absenTextFormat}>{user.getUserAttend().in}</Text>
            </View>
            <View style={styles.absenTextContainer}>
                <Text style={[styles.absenTextFormat, { color: Constant.COLOR_RED2, fontWeight: 'bold'}]}>OUT</Text>
                <Text style={styles.absenTextFormat}>{user.getUserAttend().out ? user.getUserAttend().out:" - "}</Text>
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: Constant.COLOR_RED2,
                    position: 'absolute',
                    right:'1%',
                    width:convertWidth(2),
                    height:convertWidth(2),
                    borderRadius: convertWidth(2),
                    justifyContent:'center',
                    alignItems:'center',
                }}
                onPress={() => {
                    this.setState({
                        popAbsenShow: false
                    })}}
            >
                <Text style={[styles.absenTextFormat, { color: "#fff", height: convertWidth(2.2)}]}>X</Text>
            </TouchableOpacity>
        </View>
    }
    render(){
        const { scheduletxt, todaytxt, scheduleYesterdaytxt, metCount, popAbsenShow, todayplan} = this.state;
       
        //this.onTargetToday();
        ROLE = user.getStatusRole();
        //console.log(user.getPhoto());
        return <View style={Styleapp._userdashboardcontainer}>
            <View style={Styleapp._userdashboard}>
                <ShadowView style={{
                    width: convertWidth('95%'), height: convertHeight('14%'),
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                }} />
                <TouchableOpacity style={{
                    width: convertWidth("6.7%"),
                    height: convertWidth("6.7%"),
                    marginHorizontal: "3.5%",
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    onPress={()=>this.setState({
                        popAbsenShow:true
                    })}
                >
                    <View style={Styleapp._userPhotoContainerdashboard}>
                        <Image
                            style={Styleapp._userPhotodashboard}
                            resizeMode={'contain'}
                            source={{ uri: this.tryGetPhotoProfil() }}
                        />
                    </View>
                    <View
                        style={{
                            bottom:0,
                            right:0,
                            position: 'absolute',
                            width: convertWidth('2%'),
                            height: convertWidth('2%'),
                            borderRadius: convertWidth('1%'),
                            backgroundColor:Constant.ONLINE==true? Constant.COLOR_GREEN5:Constant.COLOR_RED2
                        }}
                    />
                </TouchableOpacity>
               
                <View style={{ paddingRight: '5%' ,borderWidth:0}}>
                    <Text numberOfLines={1} style={{ borderWidth: 1, maxWidth: convertWidth('20%'), textAlignVertical:'top', borderWidth:0,fontFamily: Constant.POPPINS_MEDIUM, fontSize: convertWidth('2.3%'), color: "#000" ,height:convertHeight('4.6%')}}>{user.getNameUser()}</Text>
                    <Text numberOfLines={1} style={{ borderWidth: 0, fontFamily: Constant.POPPINS_ULTRALIGHT, fontSize: convertWidth('1.7%'), color: "#000", height: convertHeight('4%'),marginTop:convertHeight('1%') }}>{user.getUserRank()}</Text>
                </View>

                <View style={{ paddingRight: '2%' }}>
                    <Text style={{ fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.5%'), color: this.getColorScheduleText() }}>MSL</Text>
                      
                            <Text
                                ref={shed => this.schedules = shed}
                                style={{
                                   
                                    fontFamily: Constant.POPPINS_REG,
                                    fontSize: convertWidth('1.5%'),
                                    color: this.getColorScheduleText(),
                                    //textDecorationLine:'underline'
                                }} 
                                
                                >{TOTAL_COUNT}</Text>
                    {this.props.userrole == Constant.ROLE_INLOGIN &&
                    <View style={{ borderBottomWidth: 2, width: convertWidth('2%'), borderColor: this.getColorScheduleText()}}/>
                    }
                </View>

                <TouchableOpacity style={{ paddingRight: '2%' }}
                    onPress={() => this.props.onOpenlist(Constant.TYPE_NO_MEET)}
                >
                    <Text style={{ fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.5%'), color: this.getColorScheduleText() }}>Not Met</Text>
                    <Text style={{
                        fontFamily: Constant.POPPINS_REG,
                        fontSize: convertWidth('1.5%'),
                        color: this.getColorTodayText(),
                        borderBottomColor: Constant.COLOR_GRAY2,
                        // textDecorationLine:'underline'
                    }}>{this.onGetBFData()}</Text>
                  
                      
                   
                   
                </TouchableOpacity>

                    <View style={{ paddingRight: '2%' }}>
                    <Text style={{ fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.5%'), color: this.getColorScheduleText() }}>Today Plan</Text>
                        <Text style={{ 
                            fontFamily: Constant.POPPINS_REG,
                        fontSize: convertWidth('1.5%'),
                              color: this.getColorTodayText(), 
                              borderBottomColor: Constant.COLOR_GRAY2, 
                           // textDecorationLine:'underline'
                    }}>{todayplan}</Text>
                    {this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE &&
                     <View style={{ borderBottomWidth: 2, width: convertWidth('2%'), borderColor: this.getColorTodayText() }} />
                    }
                    {this.props.userrole == Constant.ROLE_FINISHTODAY &&
                     <View style={{ borderBottomWidth: 2, width: convertWidth('2%'), borderColor: this.getColorTodayText() }} />
                    }
                </View>
                
                <TouchableOpacity style={{ paddingRight: '2%' }}
                    onPress={() => this.props.onOpenlist(Constant.TYPE_MEET)}
                >
                    <Text style={{ fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.5%'), color: this.getColorScheduleText() }}>Met</Text>
                    <Text style={{
                        fontFamily: Constant.POPPINS_REG,
                        fontSize: convertWidth('1.5%'),
                        color: this.getColorTodayText(),
                        borderBottomColor: Constant.COLOR_GRAY2,
                        // textDecorationLine:'underline'
                    }}>{MET_COUNT}</Text>
                   
                </TouchableOpacity>

                <View style={{ position:'absolute',width: convertWidth('25%'), height: convertHeight('20%'),marginLeft: convertWidth('0%'),
                alignItems:'center',right:convertWidth('2%'),
                flexDirection: 'row'}}>

                    {this.onGetAddFriend()}
                   {this.props.atExpenses == false && this.setButtonSet()}
                   {this.props.atExpenses == true && this.setButtonExpendsSet()}
                </View>
                
                </View>
                {popAbsenShow && this.popAbsen}
            </View>
    }
    
}

const styles = StyleSheet.create({
    absenTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding:2,
    },
    absenTextFormat:{
        fontFamily: Constant.POPPINS_REG,
        fontSize: convertWidth('1.5%'),
        color:"#fff"
    },
    absenContainer: {
        position: 'absolute',
        
        backgroundColor: Constant.COLOR_GREEN6,
        left: convertWidth(11),
        top: convertHeight(10),
        //borderWidth: 1,
        padding: convertWidth(1),
        borderRadius: 10
    }
})
export default UserDashboard;