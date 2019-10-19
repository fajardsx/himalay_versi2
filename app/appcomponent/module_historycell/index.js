import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import ShadowView from 'react-native-shadow-view';

//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, addSpace, formateFullDateNumberUTCTime} from '../../global/Global';
import user from '../../global/user';
import { Styleapp } from '../../styleapp';
import CheckComponent from "../module_check";


const cellH = 50;
let that= null

class HistoryCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wSchedule: 0,
            celldata:null
        }
        that = this;
    }
    componentDidMount(){
        that = this;
        if (this.props.dataSchedule){
            //console.log(this.props.dataSchedule);
            this.setState({
                celldata:this.props.dataSchedule
            })
            
        }
    }
    
    render() {
        const { celldata} = this.state;
        return <View style={{ width: convertWidth('70%'), marginHorizontal: convertWidth('5%'),marginBottom: convertWidth('2%') }}>
            <ShadowView style={{
                height: convertHeight('14%'),
                width: convertWidth('89.8%'),
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                shadowColor: Constant.COLOR_GRAY3,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            }} />
            {celldata && 
        <View style={{ flexDirection: 'row', height: convertHeight('14%')}}>
            <View style={{width:convertWidth('10%'),backgroundColor: '#03B5A0',justifyContent: 'center',alignItems:'center' }}>
                    <Image
                        style={{ width: convertWidth('4%'), height: convertHeight('4%')}}
                        source={require("../../../assets/ASET/kalender.png")}
                        resizeMode={'contain'}
                    />
            </View>

                <View style={{width:convertWidth('58%'),justifyContent:'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ width: convertWidth('56%'), fontFamily: Constant.POPPINS_MEDIUM, fontSize: convertWidth('1.9%'), color: '#303030', marginLeft: convertWidth('2%') }}>
                        {
                                celldata.address
                           // this.props.namadokter?this.props.namadokter:"Dr.Harry"
                        }
                        </Text>
                        <Text style={{
                            width: convertWidth('18%'), textAlign: 'right', fontFamily: Constant.POPPINS_MEDIUM, fontSize: convertWidth('1.6%'),
                            color: '#9b9b9b' , marginLeft: convertWidth('2%')
                        }}>{formateFullDateNumberUTCTime(celldata.created_at)}</Text>
                    </View>
                   
                    
                   
                </View>
                
                
            </View>
            }
      
        </View>
    }

}
/*
 <Text style={{ width: convertWidth('40%'), fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.6%'), color:'#a2a2a2', marginLeft: convertWidth('2%') }}>
                        {celldata.address}
                    </Text>
 <View
                style={{ borderBottomWidth: 0.8, width: convertWidth('90%'), marginBottom: convertHeight('1%'), borderColor: '#e6e6e6'}}
            />

          {that!=null && celldata != null && celldata.schedule.map((data,index) => (
                that.onListDokter(index, data.nama_rumahsakit, data.code, data.nama_dokter)
        ))}
  {celldata!=null && celldata.map((data)=>(
                that.onListDokter(data.nama_rumahsakit,data.code,data.nama_dokter)
            ))}
*/

const styles = StyleSheet.create({
    nameliststyle:{
         width: '100%', fontFamily: Constant.POPPINS_LIGHT, fontSize: 16, color: Constant.COLOR_GRAY2, height:cellH,justifyContent: 'center',alignItems: 'center',marginTop:5
    }
})


export default HistoryCell;