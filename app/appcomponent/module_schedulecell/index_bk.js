import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import ShadowView from 'react-native-shadow-view'
//
import Constant from '../../global/Constant';
import {convertHeight,convertWidth, calcDistance} from '../../global/Global';
import user from '../../global/user';
import { Styleapp } from '../../styleapp';
import CheckComponent from "../module_check";


const cellH = 50;
let that= null
/*
  {this.setNamaDokter("Dr. Elena Homes")}
                    {this.setNamaDokter("Dr. Suryanto")}
                    {this.setNamaDokter("Dr. Shariyanti Debora")}
                    {this.setNamaDokter("Dr. Harry Susanto")}
*/

let _dokterData = [];
class ScheduleCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wSchedule: 0,
            celldata:null,
            listDokter:[],
            dokterData:[],
            rumahsakitID:-1,
            isLoading:true,
            selectRumahSakit:0,
            updateCheckParent: false,
            rumahSakitDistance:0,
            isMount:false,
            hcell:0,
            hcell2:0,
            hcell3:0,
        }
        that = this;
    }
    componentDidMount(){
        that = this;
        this.setState({ isMount: true, isLoading:true})
        if (this.props.dataSchedule){
            console.log("cell",this.props.dataSchedule);
            this.setState({
               celldata:[this.props.dataSchedule],
              
            },()=>{this.setState({isLoading:false})})
            
        }
       // this.dashboard.updateStatusSchedule();
    }
    componentWillUnmount(){
        this.setState({ isMount: false })
    }
    componentWillReceiveProps(){
        console.log('update cell', this.state.celldata)
    }
    scheduleSize(e) {
        this.setState({
            wSchedule: e.nativeEvent.layout.width
        })
    }
    onRumahSakitSelect(id){
        console.log('rumah sakit', id)
        /*const {celldata} = this.state;
        this.setState({
            isLoading :true
        })
        let tempDatadokter=[];
        c
       // console.log('data', celldata)
        let tempData = celldata;
        tempData.schedule[id.parentid].rumahsakit.isSelect = id.isSelectParent;
        //if (celldata.shedule[id.parentid].rumahsakit.isSelect === 1){
        for (let i = 0; i < tempData.schedule[id.parentid].nama_dokter.length;i++){
          
            tempData.schedule[id.parentid].nama_dokter[i].isSelect = id.isSelectParent;
            let dokter = tempData.schedule[id.parentid].nama_dokter[i];
            let dataOneHospital ={
                parentid:id.parentid,
                isSelectParent:id.isSelectParent,
                listid:dokter.iddokter,
                isSelect: id.isSelectParent
            }
            tempDatadokter.push(dataOneHospital);
           // console.log("namadoketer", tempData.schedule[id.parentid].nama_dokter[i]);
        }
        this.props.checkHospitalCallback(tempDatadokter)
            this.setState({
                celldata: tempData,
                //isLoading: false
            },()=>this.onCompleteUpdate())
      
       
       */
        this.props.checkHospitalCallback(id)
    }
    onCompleteUpdate(){
      
            this.setState({
                isLoading: false
            })
        
       
    }
    checkDoctorSelect(){
        let dokterSelec = 0;
        _dokterData.map((value,index)=>{
            if(value.isSelect==1){
                dokterSelec++;
            }
        })

        return dokterSelec;
    }
    onDokterSelect(id){
      console.log('dokter',id)
     console.log('dokter data', _dokterData);
     let currentindex = -1;
    if(_dokterData.length<1){
        _dokterData.push(id);
        currentindex = 0;
    }else{
       
        for (var i = 0; i < _dokterData.length; i++) {

            if (_dokterData[i].listid == id.listid) {
                currentindex = i;
            }
        }
        console.log('get index', currentindex);
        if (currentindex == -1){
            _dokterData.push(id);
            currentindex=_dokterData.length-1;
        }
    }
     
         
        
        if(currentindex>-1){
            console.log('current data', currentindex)
            _dokterData[currentindex].isSelect = id.isSelect;


            this.setState({
                updateCheckParent: true,
                selectRumahSakit: this.checkDoctorSelect() > 0 ? 1 : 0
            }, () => this.setState({
                updateCheckParent: false
            }))
            this.props.checkDokterCallback(id);
        }
       
    }

    onListDokter(keyid,_rumahsakit){
       // console.log("rumahsakit", _rumahsakit);
        let dara= _rumahsakit;
        if (dara){
            return <View key={keyid}
                style={{
                    width: convertWidth('100%'),
                    height: convertWidth('50%'),
                    marginHorizontal: 20,
                    marginTop: 20,
                    paddingBottom: 10
                }}
            >
                <View style={{ width: '100%', flexDirection: 'row', padding: 10 }}>
                    {user.getStatusRole() == Constant.ROLE_INSELECTSCHEDULE &&
                        <CheckComponent
                            checkid={this.state.selectRumahSakit}
                            keyid={keyid}
                            onCheckUpdate={this.onRumahSakitSelect.bind(this)}
                        />
                    }

                    <View style={{ width: 100, alignItems: 'center' }}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#7785EC", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: Constant.COLOR_WHITE2, fontFamily: Constant.POPPINS_SEMIBOLD, fontSize: 15 }}>{"00"}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.nameliststyle, { fontFamily: Constant.POPPINS_MEDIUM, fontSize: 18, color: Constant.COLOR_BLACK }]}>{"nama"}</Text>

                    </View>

                </View>
                <View style={{
                    width: convertWidth('90%'),
                    borderBottomWidth: 0.5,
                    borderBottomColor: Constant.COLOR_GRAY2,
                }} />
            </View>
        }
       
    }
    renderSelectDokter(keyid,listDokter){
         dataDokter = [];
        
        listDokter.map((dokter, index) => {
            //console.log(dokter)
            if (dokter.isSelect == 1){
                dataDokter.push(
                    <View key={index} style={{ flexDirection: 'row', justifyContent: "space-between" }}>

                        <Text style={[styles.nameliststyle, { width: convertWidth("65%") }]}>{dokter.namadokter}</Text>


                        <TouchableOpacity
                            onPress={() => this.props.onViewDetail()}
                            style={{
                                width: 100, height: 30,
                                marginRight: '5%', justifyContent: 'center', alignItems: 'center',
                                borderWidth: 1, borderColor: Constant.COLOR_GRAY2,
                                borderRadius: 25, backgroundColor: Constant.COLOR_WHITE1
                            }}>
                            <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: 10, color: Constant.COLOR_GRAY2 }}>{"View Detail"}</Text>
                        </TouchableOpacity>

                    </View>
                )
            }
        });
      
    }
    renderPrevDokter(keyid,listDokter){
        // console.log("render name",listDokter);
        let dataDokter = []
        listDokter.map((dokter, index) => {
            //console.log(dokter)
            if (dokter.isSelect == 0) {
                dataDokter.push(
                    this.setNamaDokter(keyid, dokter, index)
                )
            }
        });
        return dataDokter;
    }
    renderNameDoker(keyid,listDokter){
        let _keyid = keyid;
       
        return listDokter.map((dokter, index) => {
     
            return < View key={index} style={{ flexDirection: 'row'}}>
                {this.state.isLoading == false && user.getStatusRole() != Constant.ROLE_READYSTARTSCHEDULE && user.getStatusRole() != Constant.ROLE_INLOGIN &&
                    <CheckComponent
                        keyid={_keyid}
                        listid={dokter.id}
                        checkid={dokter.isSelect}
                        onCheckUpdate={this.onDokterSelect.bind(this)}
                        disable={false}
                        stylecheck={{
                            width: 30,
                            marginTop: 5,
                            marginRight: 30
                        }} />
                }

                < Text style={[styles.nameliststyle, {fontFamily: Constant.POPPINS_REG,color:'#b3b3b3',justifyContent: 'flex-start',width: convertWidth("62%") }]} >{dokter.name}</Text>

                {user.getStatusRole() == Constant.ROLE_READYSTARTSCHEDULE && this.state.rumahSakitDistance>0 &&
                    <TouchableOpacity
                        onPress={() => this.props.onViewDetail()}
                        style={{
                            width: convertWidth('15%'), height: convertHeight('5%') ,
                            marginRight: 0, justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 25, 
                            backgroundColor: Math.floor(this.state.rumahSakitDistance) > 1 ? Constant.COLOR_WHITE1 : Constant.COLOR_ORANGE1,
                            borderColor: Math.floor(this.state.rumahSakitDistance) > 1 ? Constant.COLOR_GRAY2 : Constant.COLOR_WHITE1
                        }}>
                    <Text style={{ fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.2%'), color: Math.floor(this.state.rumahSakitDistance) > 1 ? Constant.COLOR_GRAY2 : Constant.COLOR_WHITE1 }}>{"View Detail"}</Text>
                    </TouchableOpacity>
                }
            </View>



        })
    }
    renderCheck(keyid,datadokter){
        if (user.getStatusRole() == Constant.ROLE_INSELECTSCHEDULE || user.getStatusRole() == Constant.ROLE_ADDDOCTORAGAIN )
        {
            if (user.getStatusRole() == Constant.ROLE_ADDDOCTORAGAIN && datadokter.iseditable==1){
                return <CheckComponent
                    keyid={keyid}
                    listid={datadokter.iddokter}
                    checkid={datadokter.isSelect}
                   // onCheckUpdate={this.onDokterSelect.bind(this)}
                    disable={true}
                    stylecheck={{
                        width: 30,
                        marginTop: 5,
                        marginRight: 30
                    }} />
            }else{
                return <CheckComponent
                    keyid={keyid}
                    listid={datadokter.id}
                    //checkid={datadokter.isSelect}
                    onCheckUpdate={this.onDokterSelect.bind(this)}
                    disable={false}
                    stylecheck={{
                        width: 30,
                        marginTop: 5,
                        marginRight: 30
                    }} />
            }
          
        }
       
    }
    setNamaDokter(keyid,datadokter,id){
            //console.log("cell",datadokter);
          return <View key={id} style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    {this.state.isLoading == false &&
                       this.renderCheck(keyid,datadokter)
                    }
                    
                    <Text style={[styles.nameliststyle, { width: convertWidth("65%") }]}>{datadokter.namadokter}</Text>

                    {user.getStatusRole() == Constant.ROLE_READYSTARTSCHEDULE &&
                        <TouchableOpacity
                           onPress={() => this.props.onViewDetail()}
                            style={{
                                width: 100, height: 30,
                                marginRight: '5%', justifyContent: 'center', alignItems: 'center',
                                borderWidth: 1, borderColor: Constant.COLOR_GRAY2,
                                borderRadius: 25, backgroundColor: Constant.COLOR_WHITE1
                            }}>
                  <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: 10, color: Constant.COLOR_GRAY2}}>{"View Detail"}</Text>
                        </TouchableOpacity>
                    }
                </View>
    }
    getDistance(value){
        //console.log("geo rs",value);
        //console.log("geo user", user.getUserGeolocation());
        if (user.getUserGeolocation()!=null){
            let geouser = {
                latitude: user.getUserGeolocation().latitude,
                longitude: user.getUserGeolocation().longitude
            }

            //console.log(calcDistance(geouser, value));
            let distance = calcDistance(geouser, value)
            setTimeout(() => {
                this.setState({
                    rumahSakitDistance: distance
                })
            }, 2000);
          
        }
        

    }
    _oncellLayout(e){
        let curdata = e.nativeEvent.layout.height
        console.log(e.nativeEvent.layout.height)
        this.setState({
            hcell:curdata
        })
    }
    //RENDER
    render() {
        const { celldata, isLoading, updateCheckParent, rumahSakitDistance, hcell,hcell2,hcell3} = this.state;
        return <View style={{
            width: convertWidth('95%'),marginHorizontal:20,marginBottom: convertHeight('3%'),borderWidth:1,borderColor:'rgba(0,0,0,0)',
           // elevation: 3,
            shadowColor: '#000',
            shadowOffset: {
                width: 0, height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4, 
            //backgroundColor: Constant.COLOR_WHITE1,
            borderRadius:convertWidth('1%')
            }}
            onLayout={(e) => this._oncellLayout(e)}
            >

            <ShadowView
                style={{
                    width: convertWidth('94.8%'), height: hcell, position: 'absolute', top: 0, backgroundColor: '#fff', shadowColor: '#A8A8A8',
                    shadowOffset: {
                        width: 0, height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 4, }}
            />

            {isLoading == false &&  
            <View style={{ flexDirection:'row',
            height: convertHeight('8%'), 
           
            backgroundColor: Constant.COLOR_WHITE2,
             borderLeftColor: Constant.COLOR_GREEN3,
            
            
            alignItems: 'center'}}
           
            >
                <View
                    style={{
                        backgroundColor: Constant.COLOR_GREEN3,
                        width: convertWidth('1%'),
                        height: convertHeight('8%'), 
                        //borderTopLeftRadius: convertWidth('6%'),
                    }}
                   // onLayout={(e) => this._oncellLayout(e, hcell2)}
                />
                <Text style={{ width: '90%', fontFamily: Constant.POPPINS_MEDIUM, fontSize: 18, color: Constant.COLOR_GREEN3, marginLeft: '2%' }}>
                    {
                      "< "+Math.floor(rumahSakitDistance)+" Km"
                    }
                </Text>
                <Image
                    style={{ width: 15, height: 15 }}
                    source={require("../../../assets/ASET/Antu_arrow-right.svg.png")}
                    resizeMode={'contain'}
                />
            </View>
            }
            {isLoading == false &&  celldata.map((data,index) => {
                //console.log(data)
               //this.onListDokter(index, data)
               {
                    this.getDistance({
                        latitude: data.lat,
                        longitude: data.lng
                    })
               }
                 return   < View key = { index }
                style = {{
                    width: convertWidth('100%'),
                                    //height: convertWidth('50%'),
                        marginHorizontal: 20,
                        marginTop: 20,
                        paddingBottom: 10
                    }}
                     //onLayout={(e) => this._oncellLayout(e, hcell3)}
                >
                <View style={{ width: '100%', flexDirection: 'row', padding: 10 }}>
                         {user.getStatusRole() != Constant.ROLE_READYSTARTSCHEDULE && user.getStatusRole() != Constant.ROLE_INLOGIN && updateCheckParent == false &&
                    <CheckComponent
                        checkid={data.isSelect}
                        keyid={data.id}
                         disable={false}
                        onCheckUpdate={this.onRumahSakitSelect.bind(this)}
                    />
                }

                <View style={{ width: 100, alignItems: 'center' }}>
                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#7785EC", justifyContent: 'center', alignItems: 'center' ,overflow:'hidden'}}>
                       {data.picture!=null && <Image
                            style={{width: convertWidth('5%'),height: convertWidth('5%')}}
                             source={{ uri: Constant.BASELINK + data.picture}}
                        />}
                    </View>
                </View>

                <View>
                    <Text style={[styles.nameliststyle, { fontFamily: Constant.POPPINS_BOLD, fontSize: convertWidth('1.9%'), color: "#515151" }]}>{data.name}</Text>
                     {
                        this.renderNameDoker(this.props.parentid, data.doctors)
                    }
                </View>

            </View>
            <View style={{
                width: convertWidth('90%'),
                borderBottomWidth: 0.5,
                borderBottomColor: Constant.COLOR_GRAY2,
            }} />
           </View>
            }       
        )}
            
        </View>
    }

}
/*
  {celldata!=null && celldata.map((data)=>(
                that.onListDokter(data.nama_rumahsakit,data.code,data.nama_dokter)
            ))}

              {user.getStatusRole() != Constant.ROLE_READYSTARTSCHEDULE &&
                       this.renderNameDoker(keyid,listDokter)
                    }

                    {user.getStatusRole() == Constant.ROLE_READYSTARTSCHEDULE &&
                       this.renderSelectDokter(keyid,listDokter)
                    }
*/

const styles = StyleSheet.create({
    nameliststyle:{
         width: '100%', 
         fontFamily: Constant.POPPINS_LIGHT, 
         fontSize: convertWidth("2%"), 
         //borderWidth:1,
         color: Constant.COLOR_GRAY2, 
         height:cellH,
         justifyContent: 'center',
         alignItems: 'center',
         marginTop:5
    }
})


export default ScheduleCell;