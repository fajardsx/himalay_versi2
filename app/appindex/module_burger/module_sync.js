import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert, TextInput, TouchableOpacity, StatusBar, ScrollView, Keyboard, BackHandler } from "react-native";

import Permissions from 'react-native-permissions';
//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, callAlert, validateEmail, callToast, addSpace, getKeyAsyncName} from '../../global/Global';
import { Styleapp } from '../../styleapp';
import { forgetPassUser, about } from '../../module_api/module_resapi';
import Headers from '../module_header'
import { LEMARI_GLOBAL_LOAD, SYNCLoc, Execute_FIFO, getPDFLINK, grabFile, getSavePDF, StartExecuteFIFO } from '../../appcomponent/module_async/AsyncManager';
import KEYS from '../../appcomponent/module_async/utils/keyAsync';
import { FlatList } from 'react-native-gesture-handler';
// create a component
const deviceh = Dimensions.get('screen').height;
var that = null;

export default class SyncScreen extends React.Component {
    onLayout(e) {
        const { width, height } = e.Dimensions.get('window');
        console.log(width, height);
    }
    constructor(props) {
        super(props);
        this.state = {
            KeyboardIsShow: false,
            isLoading: true,
            isProcess:false,
            dataSync:[],
           abotutcontent:null,
           aboutustitle:null
        };
        that = this;
    }

    dimensionhandler = (dim) => this.setState({ dimensi: dim });
    componentWillMount() {
        Dimensions.addEventListener('change', this.dimensionhandler);
        this.setState({
            allowgps: Constant.PERMISSION_GPS,
            allownotif: Constant.PERMISSION_NOTIF,
            txtPdfAvaiable:""
        })
    }
    componentDidMount() {
        this.backbuttonHandler = BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick.bind(this));
        let that = this;
        this.getListSmallSync();
        getSavePDF(this.getPdf);
    }
    componentWillUnmount() {
        //console.log("remove title");
        this.backbuttonHandler.remove();
    
    }
    handleBackButtonClick() {
        this.props.onClose();
        return true;
    }
    getPdf=(data)=>{
        that.setState({
            txtPdfAvaiable: data
        })
    }
    getListSmallSync(){
        
        SYNCLoc(KEYS.KEY_G, KEYS.KEY_NAME_SYNC).then(RES => {
           
            if(RES){
                console.log("small sync ", RES);
                that.setState({
                    dataSync:RES,
                    isLoading: false,
                })
            }else{
                that.setState({
                    //dataSync: RES,
                    isLoading: false,
                })
            }
        });
    }
    callSync(){
      StartExecuteFIFO(this._callback.bind(this), 0);
    }
    _callback(value){
        if(value){
            getSavePDF(this.getPdf);
            that.getListSmallSync();
            that.setState({
                isProcess:false
            })
        }
    }
    callGetPdf(){
        if (this.state.isProcess == true) {
            return callToast("GET PDF On Process");
        }
        this.setState({
            isProcess: true
        })
        callToast("Get Pdf..");
        grabFile(0, this._callback.bind(this));
    }
    getDate(item){
        let date_item = item.create_at ? item.create_at : item.date; 
        return date_item;
    }
    render() {
        const { isLoading, dataSync, txtPdfAvaiable} = this.state;
        return (
          <View
            style={{
              backgroundColor: "#FDFDFD",
              position: "absolute",
              width: convertWidth("100%"),
              height: convertHeight("83%"),
              top:
                this.state.KeyboardIsShow == true
                  ? -convertHeight("10%")
                  : 0
            }}
          >
            <Headers
              navigation={this.props.navigation}
              burgeronpress={this.props._callPopBurger}
              titleheader={"SYNC"}
            />
            <View
              style={{
                marginTop: convertHeight("5%"),
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              {isLoading == false && (
                <View>
                  <Text
                    style={{
                      fontFamily: Constant.POPPINS_LIGHT,
                      fontSize: convertWidth("2%"),
                      alignSelf: "center",
                      color: "#000"
                    }}
                  >
                    {dataSync.length > 0
                      ? "You have " +
                        dataSync.length +
                        " data need send to server press sync now."
                      : "no data need send to server "}
                  </Text>
                  <FlatList
                    style={{
                      //marginTop: convertHeight('5%'),
                      alignSelf: "center",
                      borderWidth: 0.5,
                      width: convertWidth("50%"),
                      height: convertHeight("30%"),
                      marginBottom: convertHeight("5%")
                    }}
                    contentContainerStyle={{
                      justifyContent: "center"
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    data={dataSync}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flexDirection: "row",
                          //height: convertHeight('2%')
                          alignSelf: "center"
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: Constant.POPPINS_REG,
                            fontSize: convertWidth("1.2%"),
                            color: "#b3b3b3",
                            marginVertical: convertHeight("1.5%")
                          }}
                        >
                          {"SYNC " +
                            this.getDate(item) +
                            " - " +
                            getKeyAsyncName(item.key)}
                        </Text>
                      </View>
                    )}
                  />
                  {dataSync.length > 0 && (
                    <TouchableOpacity
                      onPress={() => this.callSync()}
                      style={{
                        width: convertWidth("15%"),
                        height: convertHeight("5%"),
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: Constant.COLOR_GREEN6,
                        borderRadius: convertWidth("10%"),
                        backgroundColor: Constant.COLOR_GREEN5
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: Constant.POPPINS_LIGHT,
                          fontSize: convertWidth("2%"),
                          color: Constant.COLOR_WHITE1
                        }}
                      >
                        {"Sync Now"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <View
                style={{
                  height: convertHeight("10%")
                }}
              >
                <Text
                  style={{
                    fontFamily: Constant.POPPINS_LIGHT,
                    fontSize: convertWidth("2%"),
                    alignSelf: "center",
                    color: "#000"
                  }}
                >
                  {"You have " + txtPdfAvaiable + " pdf files"}
                </Text>
                <TouchableOpacity
                  onPress={() => this.callGetPdf()}
                  style={{
                    width: convertWidth("15%"),
                    height: convertHeight("5%"),
                    marginTop: convertHeight("5%"),
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: Constant.COLOR_GREEN6,
                    borderRadius: convertWidth("10%"),
                    backgroundColor: Constant.COLOR_GREEN5
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Constant.POPPINS_LIGHT,
                      fontSize: convertWidth("2%"),
                      color: Constant.COLOR_WHITE1
                    }}
                  >
                    {"Get PDF"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
   
}

// define your styles
const styles = StyleSheet.create({
    titles:{
        fontSize:convertWidth('3.2%'),
        color:Constant.COLOR_GREEN2,
        fontFamily: Constant.POPPINS_MEDIUM
    },  
   
    image: {

        flex: 0.2,
        height: 30,
        right: 12,
        marginTop: '5%'
    },
    input: {
        width: '100%',
        paddingLeft: 15,
        // backgroundColor : 'rgba(255,255,255,0.5)',
        color: '#000',
        fontSize: convertHeight('3%'),
        textAlign: 'center'

    }
});
