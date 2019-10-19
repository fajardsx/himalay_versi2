import React from "react";
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, formatPrice, formateDateNumber, curretntimestamp } from '../../global/Global';
import { Styleapp } from '../../styleapp';
import DatePicker from "../../appcomponent/module_datepicker/";
import ModulDatetime from '../../appcomponent/module_datetimepicker';

var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Select Profil Picture',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}


const Amounnticons=require("../../../assets/ASET/amounticon.png");
const Calendaricons = require("../../../assets/ASET/calendaricon.png");
const Doktericons = require("../../../assets/ASET/DOCTOR.png");
const Purposeicons = require("../../../assets/ASET/purposeicon.png");
const Uploadicons = require("../../../assets/ASET/uploadicon.png");
const photoicons = require("../../../assets/ASET/CAMERA.png");

var that = null;
let dataDokter = ["Dr. Elena Homes", "Dr. Suryanto", "Dr. Shariyanti Debora", "Dr. Harry Susanto"];

class ExpensesFormCell extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            localphoto: null,
            amount:null,
            indexDokter:null,
            displayamount:null,
            createdate:null,
            todokter:null,
            purposetext:null,
            listDokter:[]
        }
        that = this;
    }
    componentDidMount(){
        //dataDokter = this.props.list;
        if (this.props.list!=null){
            console.log(this.props.list)
            this.setState({
                listDokter:this.props.list
            })
        }
    }
    _getimage(id){
        switch (id) {
            case 0:
                    return Amounnticons;
                break;
            case 1:
                return Calendaricons;
                break;
            default:
            return "";
                break;
        }
    }
    onRenderDatePick = () => {
        return <ModulDatetime onchange={this._onEditDate.bind(this)}/>
    }
    _onEditDate(date){
        console.log('date ',date);
        this.setState({
            createdate:date
        })
    }
    _oneditamount(txt){
        this.setState({
            amount: txt,
            displayamount:txt
        })
    }
    _oneditpurpose(txt) {
        this.setState({
            purposetext: txt
        })
    }
    _onSubmitEditAmount(){
        this.setState({
           
            displayamount: formatPrice(this.state.amount)
        })
    }
    _form(imgs, title, textholder, styleinputs, ontext, onEdit, ondone,keyboardTypes='default'){
       
            return <View style={styles.titlecontainer}>

                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ width: convertWidth('3%'), height: convertWidth('3%')}}
                        resizeMode='contain'
                        source={imgs}
                    />

                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <TextInput underlineColorAndroid="rgba(0,0,0,0)"
                    defaultValue={ontext != null ? ontext:''}
                    keyboardType={keyboardTypes}
                    placeholder={textholder}
                    placeholderTextColor="#a8a8a8"
                    style={styleinputs ? styleinputs : styles.input}
                   // onFocus={() => this.setState({displayamount:''})}
                    onSubmitEditing={() => {
                        ondone!=null?ondone():null
                    }}
                    onChangeText={(txt) =>onEdit(txt)}
                />
            </View>
        
       
    } 
    _onselectDokter(idx,value){
        console.log('select : '+idx+" , "+value);
        that.setState({
            indexDokter:idx
        })
    }
    _ongetData(){
        let dataexpends={
            amount:this.state.amount,
            date:this.state.createdate,
            indexdoktor:this.state.indexDokter,
            purpose:this.state.purposetext,
            photouri:this.state.localphoto
        }

        return dataexpends;
    }
    _formDrop(imgs, title, textholder, styleinputs) {

        return <View style={styles.titlecontainer}>

            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={styles.iconsize}
                    resizeMode='contain'
                    source={imgs}
                />

                <Text style={styles.titleText}>{title}</Text>
            </View>
            {this.onRenderDropDown(
                textholder,
                this.state.listDokter,
                this._onselectDokter, { textAlign: 'left' }, { width: "50%" }
            )}
            <View style={{height:convertHeight('5%')}}/>
        </View>


    } 
    _formCalendar(imgs, title){
        return <View style={styles.titlecontainer}>

            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={styles.iconsize}
                    resizeMode='contain'
                    source={imgs}
                />

                <Text style={styles.titleText}>{title}</Text>
            </View>
            {this.onRenderDatePick()}
        </View>
    }
    onRenderDropDown(title, data, onselect, textstyles, ...style) {

        return <View style={[style, {

            height: convertHeight('2%'),
            width: convertWidth('62%'),
        }]}>
            <ModalDropdown
                defaultValue={title}
                onSelect={(idx, value) => onselect(idx, value)}
                options={data}
                style={{
                    height: convertHeight('5%'),
                    width: convertWidth('62%'),
                    borderColor: Constant.COLOR_WHITE3,
                    borderWidth: 1,
                    justifyContent: 'center'
                }}
                textStyle={[textstyles, {
                    marginLeft: convertWidth("2%"),
                    fontSize: convertHeight('2%'),
                    color: '#000',
                    textAlignVertical: 'center'
                }]
                }
                dropdownStyle={{
                    width: convertWidth('62%'),
                    height: convertHeight('25%'),

                    backgroundColor: '#f2f2f2',
                    justifyContent: 'center'
                }}
            >

            </ModalDropdown>
            <Image
                style={{ height: convertWidth('1.5%'), width: convertWidth('1.5%'), position: 'absolute', top: convertWidth('1%'), right:convertWidth('1%')}}
                resizeMode={'contain'}
                source={require('../../../assets/ASET/Antu_arrow-down.png')}
            />
        </View>
    }
    onOpenGallery() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('respone ', response)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                that.setState({
                    localphoto: source
                })
                //that.onUpdatePhotoEvent(source);
            }
        })
    }
    _photoform() {
        const { localphoto} = this.state;
        if (localphoto == null){
            return <View style={styles.titlecontainer}>

                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={styles.iconsize}
                        resizeMode='contain'
                        source={Uploadicons}
                    />

                    <Text style={styles.titleText}>{"Upload Proof"}</Text>
                </View>
                <TouchableOpacity style={{
                    width: convertWidth('30%'),
                    height: convertHeight('20%'),
                    borderColor: Constant.COLOR_GRAY2,
                    borderWidth: 1,
                    borderRadius: 1,
                    borderStyle: 'dashed',
                    backgroundColor: Constant.COLOR_WHITE2,
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
                onPress={()=>this.onOpenGallery()}
                >
                    <Image
                        style={{ width: convertWidth('10%'), height: convertHeight('10%') }}
                        resizeMode='contain'
                        source={photoicons}
                    />
                </TouchableOpacity>
            </View>
        }else{
            return <View style={styles.titlecontainer}>

                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={styles.iconsize}
                        resizeMode='contain'
                        source={Uploadicons}
                    />

                    <Text style={styles.titleText}>{"Upload Proof"}</Text>
                </View>
                <TouchableOpacity style={{
                    width: convertWidth('30%'),
                    height: convertHeight('20%'),
                    //borderColor: Constant.COLOR_GRAY2,
                   // borderWidth: 1,
                   // borderRadius: 1,
                   // borderStyle: 'dashed',
                   // backgroundColor: Constant.COLOR_WHITE2,
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
                    onPress={() => this.onOpenGallery()}
                >
                    <Image
                        style={{ width: convertWidth('30%'), height: convertHeight('20%') }}
                        resizeMode='contain'
                        source={{ uri: localphoto.uri}}
                    />
                </TouchableOpacity>
            </View>
        }
       
    }
    render(){
        const { listDokter} = this.state;
        return <View style={styles.container}>
            <View style={{ flexDirection: 'row'}}>
                {this._form(Amounnticons, "Amount", "e.g : " + formatPrice("20000"), null, this.state.displayamount,this._oneditamount.bind(this),this._onSubmitEditAmount.bind(this),'numeric')}
                {this._formCalendar(Calendaricons,"Date & Time")}
                </View>
                {listDokter.length>0 && this._formDrop(Doktericons, "Doctor", "Select Doctors", styles.inputdoctor)}
                 <View style={{flexDirection: 'row',width: convertWidth('20%')}}>
                {this._form(Purposeicons, "Purpose", "Input your text here", styles.inputPurpose, this.state.purposetext,this._oneditpurpose.bind(this),null,'default')}
                {this._photoform()}
                </View>
        </View>
    }
}

const styles = StyleSheet.create({
    input:{
        width: convertWidth('30%'),
        paddingLeft: 15,
        // backgroundColor : 'rgba(255,255,255,0.5)',
        color: '#000',
        fontSize: convertHeight('2.5%'),
        borderWidth: 1,
        borderColor: Constant.COLOR_WHITE3,
        paddingLeft: convertWidth('2%')

    },
    iconsize:{
        width: convertWidth('3%'), height: convertWidth('3%')
    },
    inputdoctor: {
        width: convertWidth('62%'),
        paddingLeft: 15,
        // backgroundColor : 'rgba(255,255,255,0.5)',
        color: '#000',
        fontSize: convertHeight('2.5%'),
        borderWidth: 1,
        borderColor: Constant.COLOR_WHITE3,
        paddingLeft: convertWidth('2%')

    },
    inputPurpose: {
        width: convertWidth('30%'),
        height: convertHeight('20%'),
        paddingLeft: 15,
        textAlignVertical:'top',
        // backgroundColor : 'rgba(255,255,255,0.5)',
        color: '#000',
        fontSize: convertHeight('2.5%'),
        borderWidth: 1,
        borderColor: Constant.COLOR_WHITE3,
        paddingLeft: convertWidth('2%')

    },
    container: {
        width: convertWidth('80%'),
       // height: convertHeight('50%'),
        padding:20,
        paddingLeft: convertWidth('8%'),
       // paddingHorizontal: 50,
        backgroundColor: "#fff",
        elevation: 5,
        shadowColor: Constant.COLOR_GRAY2,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        borderRadius: 4,
        marginBottom: convertWidth('2%')
    },
    titlecontainer: {
        width: convertWidth('30%'),
        margin:10,
        //borderWidth:1
        //height: convertHeight('50%'),
        //marginHorizontal: 10,
       // borderWidth:1,
        //justifyContent: 'space-between'
    
    },
    titleText:{
        fontFamily: Constant.POPPINS_SEMIBOLD,
        width: '60%',
        marginLeft: convertWidth('1%')
    }
    
});

export default ExpensesFormCell;