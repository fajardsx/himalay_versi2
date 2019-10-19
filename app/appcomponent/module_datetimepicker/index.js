import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';


import Constant from '../../global/Constant';
import { convertHeight, formateFullDateNumberUTC, convertWidth, formateFullDayUTCExpends } from '../../global/Global';
import DateTimePicker from 'react-native-modal-datetime-picker';

class ModulDatetime extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            datetime:null,
            isOpen:false
        }
    }
    componentDidMount(){

    }
    _onShowDate=()=>{
        this.setState({isOpen:true})
    }
    _onhideDate=()=> {
        this.setState({ isOpen: false })
    }
    _onConfirmDate=(data)=>{
        console.log('date ',data)
        console.log('date ', formateFullDateNumberUTC(data))
        this.setState({
            datetime:data
        })
        this.props.onchange(formateFullDayUTCExpends(data))
        this._onhideDate();
    }
    
    
    render(){
        const { datetime, isOpen} = this.state
        return <View style={[styles.container]}>
                {datetime != null &&
                <TouchableOpacity style={[styles.placeholderText, { flexDirection: 'row' }]} onPress={()=>this._onShowDate()}>
                        <Text style={styles.text}>{formateFullDateNumberUTC(datetime)}</Text>
                    </TouchableOpacity>
                }
                {datetime == null &&
                <TouchableOpacity style={[styles.placeholderText, { flexDirection: 'row' }]}   onPress={()=>this._onShowDate()}>
                <Text style={[styles.text, styles.placeholderText]}>{formateFullDateNumberUTC(new Date())}</Text>
                        <Image
                            style={{
                                width: convertWidth('1%'),
                                height: convertWidth('1%'),
                                alignSelf: 'center'
                            }}
                            resizeMode={"contain"}
                            source={require("../../../assets/ASET/Antu_arrow-down.png")}
                        />
                    </TouchableOpacity>
                }
            <DateTimePicker
                mode='datetime'
                isVisible={isOpen}
                onConfirm={this._onConfirmDate}
                onCancel={this._onhideDate}
            />
        </View>
        
       
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Constant.COLOR_GRAY1,
        borderColor: Constant.COLOR_WHITE3,
        // borderBottomColor: colors.gray.veryLight,
        borderWidth: 1,
        //marginVertical: spacing[0],
        //marginHorizontal: spacing[0],
        justifyContent: 'center',
        //borderRadius: convertHeight('1%') ,

        width: convertWidth('30%'),
        height: convertHeight('9%'),
        // borderRadius: 25,
        justifyContent: "space-around",
        alignItems: "center",

        paddingHorizontal: 7
    },
    placeholderText: {
        //color: "#000",

    },
    text: {
        width: '80%',

        fontFamily: Constant.POPPINS_MEDIUM,
        fontSize: convertWidth('1.5%'),
        color: Constant.COLOR_GRAY2
    }
})

export default ModulDatetime