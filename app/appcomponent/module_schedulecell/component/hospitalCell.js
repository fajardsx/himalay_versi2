import React from "react";
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
//import Image from "react-native-image-progress";
import { CustomCachedImage } from "react-native-img-cache";
import ShadowView from 'react-native-shadow-view'
//
import Constant from '../../../global/Constant';
import { convertHeight, convertWidth, calcDistance, Glob_sendNA, formateFullDateNumber, isTODAY, getDistance } from '../../../global/Global';
import user from '../../../global/user';
import { Styleapp } from '../../../styleapp';
import CheckComponent from "../../module_check";
import { SYNCLoc, LEMARI_GLOBAL_DETAIL_GET } from "../../module_async/AsyncManager";
import KEYS from "../../module_async/utils/keyAsync";
import DoktorCell_opt from "./doktorCell";
//REDUX
import { connect } from 'react-redux';
import ACTION_TYPE from "../../../redux/actions/actions";
const cellH = convertWidth('4%');
let that = null
let near = false;
let _dokterData = [];
class HospitalCell_opt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wSchedule: 0,
            celldata: null,
            listDokter: [],
            dokterData: [],
            rumahsakitID: -1,
            isLoading: true,
            selectRumahSakit: 0,
            updateCheckParent: false,
            rumahSakitDistance: 0,
            max_dokter: 5,
            isMount: false,
            hcell: 0,
            hcell2: 0,
            hcell3: 0,
            isnear: false,
            iscacheDetail: false,
            data:null,
            dokters:null,
            avaiableDoctor:0,
            listDoctor:0,
        }
        that = this;
        this._isMounted = false;
    }
    componentDidMount(){
        
        //console.log('JARAK',this.props.dataJarak);
        this._isMounted = true;
        if(this.props.dataHospital ){
            //console.log('HOSPITAL', this.props.dataHospital);
            this._isMounted && this.setState({
                data: this.props.dataHospital ,
                dokters: this.props.dataHospital.dataHospital.doctors,
                listDoctor:this.props.dataHospital.dataHospital.doctors.length,
            }, () => { this.onCekAvaialbeDoctor()})
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    // UNSAGE_componentWillReceiveProps(prevProps,prevState){
    //     if(this.props.dataHospital){
    //       if (this._isMounted) {
    //         this.setState({
    //           data: this.props.dataHospital,
    //           dokters: this.props.dataHospital.dataHospital.doctors,
    //           listDoctor: this.props.dataHospital.dataHospital.doctors.length,
    //         }, () => { this.onCekAvaialbeDoctor() })
    //       }
    //     }
    //   if (prevProps.userrole != this.props.userrole){
    //       if(this._isMounted){
    //         console.log("UPDATE")
    //         this.setState({
    //           data: this.props.dataHospital,
    //           dokters: this.props.dataHospital.dataHospital.doctors,
    //           listDoctor: this.props.dataHospital.dataHospital.doctors.length,
    //         }, () => { this.onCekAvaialbeDoctor() })
    //       }
    //   }
    // }
    onRumahSakitSelect(id) {
        console.log('rumah sakit', id)
        const { celldata } = this.state;
        //console.log('cell data', celldata);

        id.data.doctors.map((datas, index) => {
            //console.log(datas)
            that.onDokterSelect({
                parentid: id.parentid,
                listid: datas.id,
                isSelect: id.isSelectParent,
                data: datas
            });
            //that.onDokterSelectByHospital({ parentid: index, listid: datas.id, isSelect: id.isSelectParent}, id.isSelectParent)
        })
    }
    onCekAvaialbeDoctor(){

        let available = 0;
        this.state.dokters.map(res=>{
          if (res.visitable == true){
            available+=1;
          }
        })
        this.setState({
          avaiableDoctor:available
        })
        //console.log("doctor visitable ", this.state.dokters);
        //console.log("doctor visitable ",available);
    }
    onDokterSelect(id) {
        console.log('dokter', id)
        // console.log('dokter data', _dokterData);
        let currentindex = -1;
        if (_dokterData && _dokterData.length < 1) {
            _dokterData.push(id);
            currentindex = 0;
        } else {
            _dokterData.map((res, index) => {
                if (res.listid == id.listid) {
                    currentindex = index;
                }
            })
            if (currentindex == -1) {
                _dokterData.push(id);
                currentindex = _dokterData.length - 1;
            }
        }



        if (currentindex > -1) {
            // console.log('current data', currentindex)
            _dokterData[currentindex].isSelect = id.isSelect;


            this._isMounted && this.setState({
                updateCheckParent: true,
                //selectRumahSakit: this.checkDoctorSelect() > 0 ? 0 : 0
            }, () => this._isMounted && this.setState({
                updateCheckParent: false
            }))
            this.props.checkDokterCallback(id);
        }

    }
    ///
    _oncellLayout(e) {
        let curdata = e.nativeEvent.layout.height
        // console.log(e.nativeEvent.layout.height)
        this._isMounted && this.setState({
            hcell: curdata
        })
    }
    ///
    render() {
      const { celldata, isLoading, updateCheckParent, data, hcell, dokters, avaiableDoctor} = this.state;
        if(data){
            return (
              <View
                style={{
                  flex: 1,
                  //borderWidth:1,
                  marginHorizontal: convertWidth("2%"),
                  //marginTop: convertHeight('1%'),
                  paddingBottom: convertHeight("1%")
                }}
                onLayout={e => this._oncellLayout(e)}
              >
                <ShadowView
                  style={{
                    width: convertWidth("94.8%"),
                    height: hcell,
                    position: "absolute",
                    top: 0,
                    backgroundColor: "#fff",
                    shadowColor: "#A8A8A8",
                    shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 4
                  }}
                />
                {this.props.areaid == 0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      height: convertHeight("6%"),
                      backgroundColor: Constant.COLOR_WHITE2,
                      borderLeftColor: Constant.COLOR_GREEN3,
                      alignItems: "center"
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Constant.COLOR_GREEN3,
                        width: convertWidth("1%"),
                        height: convertHeight("6%")
                        //borderTopLeftRadius: convertWidth('6%'),
                      }}
                      // onLayout={(e) => this._oncellLayout(e, hcell2)}
                    />
                    <Text
                      style={{
                        width: convertWidth("85%"),
                        fontFamily: Constant.POPPINS_MEDIUM,
                        fontSize: convertWidth("1.8%"),
                        color: Constant.COLOR_GREEN3,
                        marginLeft: convertWidth("1.5%")
                      }}
                    >
                      {data.jaraktext}
                    </Text>

                    <CustomCachedImage
                      component={Image}
                      indicator={ActivityIndicator}
                      style={{ width: 15, height: 15 }}
                      source={require("../../../../assets/ASET/Antu_arrow-right.svg.png")}
                      resizeMode={"contain"}
                    />
                  </View>
                )}
                <View
                  style={{
                    width: convertWidth("92%"),
                    flexDirection: "row",
                    padding: convertWidth("1%")
                  }}
                >
                  {this.props.userrole !=
                    Constant.ROLE_READYSTARTSCHEDULE &&
                    this.props.userrole !=
                      Constant.ROLE_FINISHTODAY &&
                    this.props.userrole != Constant.ROLE_INLOGIN &&
                    updateCheckParent == false && avaiableDoctor>0 && (
                      <CheckComponent
                        checkid={data.dataHospital.isSelect}
                        keyid={data.dataHospital.id}
                        disable={false}
                        data={data.dataHospital}
                        onCheckUpdate={this.onRumahSakitSelect.bind(
                          this
                        )}
                        stylecheck={{
                          width: convertWidth("3%"),
                          height: convertWidth("4%"),
                          backgroundColor: "transparent",
                          marginTop: 5
                          //marginRight: 30
                        }}
                      />
                    )}

                  <View
                    style={{
                      width: convertWidth("10%"),
                      alignItems: "center"
                    }}
                  >
                    <View
                      style={{
                        width: convertWidth("5%"),
                        height: convertWidth("5%"),
                        borderRadius: convertWidth("3%"),
                        backgroundColor: "#7785EC",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                      }}
                    >
                      {data.dataHospital.picture != null && (
                        <CustomCachedImage
                          component={Image}
                          indicator={ActivityIndicator}
                          source={{
                            uri:
                              Constant.BASELINK +
                              data.dataHospital.picture
                          }}
                          style={{
                            width: convertWidth("5%"),
                            height: convertWidth("5%")
                          }}
                          resizeMode={"cover"}
                        />
                      )
                      /*<Image
                                    style={{ width: convertWidth('5%'), height: convertWidth('5%') }}
                                    source={{ uri: Constant.BASELINK + data.dataHospital.picture }}
                                   // resizeMode={'contain'}
                                />*/
                      }
                      {
                        data.dataHospital.picture == null &&
                        <Text style={[
                          styles.nameliststyle,
                          {
                            fontFamily: Constant.POPPINS_BOLD,
                            fontSize: convertWidth("1.9%"),
                            color: "#fff",
                            marginTop: convertHeight('2%'),
                           // width: convertWidth("5%"),
                            height: convertWidth("5%")
                          }
                        ]}>
                          {String(data.dataHospital.name[0])}
                        </Text>
                      }
                    </View>
                  </View>
                    
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      {
                        data.dataHospital.city_name &&
                        <Text
                          style={[
                            styles.nameliststyle,
                            {
                              fontFamily: Constant.POPPINS_BOLD,
                              fontSize: convertWidth("1.9%"),
                              color: "#515151"

                            }
                          ]}
                        >
                          {data.dataHospital.city_name + " - "}
                        </Text>
                      }
                      <Text
                        style={[
                          styles.nameliststyle,
                          {
                            fontFamily: Constant.POPPINS_BOLD,
                            fontSize: convertWidth("1.9%"),
                            color: "#515151",
                           
                          }
                        ]}
                      >
                        {data.dataHospital.name}
                      </Text>
                    
                      {
                        <Text
                          style={[
                            styles.nameliststyle,
                            {
                              marginLeft: 10,
                              marginTop: convertHeight("2.3%"),
                              paddingHorizontal: 10,
                              borderWidth: 1,
                              borderRadius: convertWidth("1%"),
                              height: convertHeight("3%"),
                              fontFamily: Constant.POPPINS_REG,
                              fontSize: convertWidth("1.2%"),
                              color: "#515151"
                            }
                          ]}
                        >
                          {Math.floor(data.jarak) + " km"}
                        </Text>
                      }
                    </View>
                    {this._isMounted && (
                      <FlatList
                        extraData={this.state}
                        data={dokters}
                        numColumns={1}
                        renderItem={({ item, index }) => {
                          //console.log(item.name + "," + item.visitable)
                          if (this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN && item.visitable == true ) { 
                           
                            return <DoktorCell_opt
                              checkDokterCallback={this.props._onCheckHospitalByDoktor.bind(
                                this
                              )}
                              dataDokter={item}
                              dataHospital={
                                this.props.dataHospital.dataHospital
                              }
                              rsnear={
                                this.props.dataJarak.parentdata.rsnear
                              }
                              key={index}
                              //userrole={this.props.userrole}
                              parentid={index}
                              dataSelect={this.state.dataSelect}
                              //dataSchedule={datas.data}
                              onViewDetail={this.props.onViewDetail.bind(
                                this
                              )}
                              onOpenFeedback={this.props.onOpenFeedback.bind(
                                this
                              )}
                              onNotAvaiable={this.props.onNotAvaiable.bind(
                                this
                              )}
                            />
                          } else if (this.props.userrole == Constant.ROLE_INSELECTSCHEDULE && item.visitable == true) {

                            return <DoktorCell_opt
                              checkDokterCallback={this.props._onCheckHospitalByDoktor.bind(
                                this
                              )}
                              dataDokter={item}
                              dataHospital={
                                this.props.dataHospital.dataHospital
                              }
                              rsnear={
                                this.props.dataJarak.parentdata.rsnear
                              }
                              key={index}
                              //userrole={this.props.userrole}
                              parentid={index}
                              dataSelect={this.state.dataSelect}
                              //dataSchedule={datas.data}
                              onViewDetail={this.props.onViewDetail.bind(
                                this
                              )}
                              onOpenFeedback={this.props.onOpenFeedback.bind(
                                this
                              )}
                              onNotAvaiable={this.props.onNotAvaiable.bind(
                                this
                              )}
                            />
                          } else if (this.props.userrole == Constant.ROLE_INSELECTSCHEDULE && item.visitable == true) {

                            return <DoktorCell_opt
                              checkDokterCallback={this.props._onCheckHospitalByDoktor.bind(
                                this
                              )}
                              dataDokter={item}
                              dataHospital={
                                this.props.dataHospital.dataHospital
                              }
                              rsnear={
                                this.props.dataJarak.parentdata.rsnear
                              }
                              key={index}
                              //userrole={this.props.userrole}
                              parentid={index}
                              dataSelect={this.state.dataSelect}
                              //dataSchedule={datas.data}
                              onViewDetail={this.props.onViewDetail.bind(
                                this
                              )}
                              onOpenFeedback={this.props.onOpenFeedback.bind(
                                this
                              )}
                              onNotAvaiable={this.props.onNotAvaiable.bind(
                                this
                              )}
                            />
                          } else if (this.props.userrole == Constant.ROLE_INLOGIN || this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE || this.props.userrole == Constant.ROLE_FINISHTODAY ) {
                            return <DoktorCell_opt
                              checkDokterCallback={this.props._onCheckHospitalByDoktor.bind(
                                this
                              )}
                              dataDokter={item}
                              dataHospital={
                                this.props.dataHospital.dataHospital
                              }
                              rsnear={
                                this.props.dataJarak.parentdata.rsnear
                              }
                              key={index}
                              //userrole={this.props.userrole}
                              parentid={index}
                              dataSelect={this.state.dataSelect}
                              //dataSchedule={datas.data}
                              onViewDetail={this.props.onViewDetail.bind(
                                this
                              )}
                              onOpenFeedback={this.props.onOpenFeedback.bind(
                                this
                              )}
                              onNotAvaiable={this.props.onNotAvaiable.bind(
                                this
                              )}
                            />
                            }
                          }
                        }
                        keyExtractor={(item, index) =>
                          index.toString()
                        }
                      />
                    )}
                  </View>
                </View>
                <View
                  style={{
                    width: convertWidth("90%"),
                    borderBottomWidth: 0.5,
                    borderBottomColor: Constant.COLOR_GRAY2
                  }}
                />
              </View>
            );
        }else{
            return null;
        }
        
    }
}
const styles = StyleSheet.create({
    nameliststyle: {
        //width: '100%', 
        height: convertWidth('5%'),
        fontFamily: Constant.POPPINS_LIGHT,
        fontSize: convertWidth("1.7%"),
        //borderWidth:1,
        color: Constant.COLOR_GRAY2,
        height: cellH,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: convertWidth("1%")
    },
    icondone: {
        width: convertWidth('4%'),
        height: convertWidth('4%'),
        //borderRadius: convertWidth('5%'), backgroundColor: Constant.COLOR_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: convertWidth('1.8%')
    }
})
/***/
function mapStateToProps(state) {
  return {

      userrole:state.userRole
  };
}
function dispatchToProps(dispatch) {
  return {
      updateRole: role =>
          dispatch({ type: ACTION_TYPE.UPDATE_USERROLE,value:role }),
  };
}
export default connect(
  mapStateToProps,
  dispatchToProps,
)( HospitalCell_opt);