import React from "react";
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, ActivityIndicator } from "react-native";
//import Image from "react-native-image-progress";
import { CustomCachedImage } from "react-native-img-cache";
import Icon from "react-native-vector-icons/FontAwesome";
import ShadowView from 'react-native-shadow-view'
//
import Constant from '../../../global/Constant';
import { convertHeight, convertWidth, calcDistance, Glob_sendNA, formateFullDateNumber, isTODAY, getDistance, callAlert, callToast } from '../../../global/Global';
import user from '../../../global/user';
import { Styleapp } from '../../../styleapp';
import CheckComponent from "../../module_check";
import { SYNCLoc, LEMARI_GLOBAL_DETAIL_GET } from "../../module_async/AsyncManager";
import KEYS from "../../module_async/utils/keyAsync";

const cellH = convertWidth('4%');
let that = null
let near = false;
let _dokterData = [];
class DoktorCell_opt extends React.Component {
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
            isnear: null,
            iscacheDetail: false,
            dokter:null,
            isDetailDokter: false,
            userRole:0
        }
        that = this;

        this._isMounted = false;
    }
  
    componentWillUnmount(){
        this._isMounted = false;
    }
    componentDidMount() {
        //console.log('data dokter',this.props.dataDokter);
        //console.log('data dokter', this.props);
        this._isMounted= true;
        if (this.props.dataDokter) {
            this._isMounted && this.setState({
                dokter: this.props.dataDokter,
                isnear: this.props.rsnear
            }, this.checkDetailDokter)
        }
    }
    componentWillReceiveProps(prevProps,prevState){

        if (this.props.rsnear != this.state.isnear){
            if (this.props.dataDokter) {
                this._isMounted && this.setState({
                    dokter: this.props.dataDokter
                })
            }
        }
        if (prevProps.userrole != this.props.userrole){
            if (this.props.dataDokter) {
                this._isMounted && this.setState({
                    dokter: this.props.dataDokter
                })
            }
        }
        
    }
    _setStatusCell(status) {
        switch (status) {
            case 0:
                return require('../../../../assets/ASET/status_5.png');
            case 1:
                return require('../../../../assets/ASET/status_3.png');
            case null:
                return require('../../../../assets/ASET/status_5.png');
        }
    }
    _setCheckCell(status) {
        switch (status) {
            case 0:
                return require('../../../../assets/ASET/status_4.png');
            case 1:
                return require('../../../../assets/ASET/status_2.png');
            case null:
                return require('../../../../assets/ASET/status_4.png');
        }
    }
    _setStatusCell2(status) {
        let _size = '3.5%';
        let _sizem = '3.5%';
        switch (status) {
            case 0:
                return <View style={{ borderRadius: convertWidth(_sizem), justifyContent: 'center', backgroundColor: Constant.COLOR_REDNA, width: convertWidth(_sizem), height: convertWidth(_sizem) }}>
                    <Text style={[styles.NA_text_style, { width: convertWidth(_size), height: convertWidth(_size) }]}>N/A</Text>
                </View>;
            case 1:
                return <View style={{ borderRadius: convertWidth(_sizem), justifyContent: 'center', backgroundColor: Constant.COLOR_GRAY_ICON, width: convertWidth(_sizem), height: convertWidth(_sizem) }}>
                    <Text style={[styles.NA_text_style, { width: convertWidth(_size), height: convertWidth(_size) }]}>N/A</Text>
                </View>;
            case null:
                return <View style={{ borderRadius: convertWidth(_sizem), justifyContent: 'center', backgroundColor: Constant.COLOR_REDNA, width: convertWidth(_sizem), height: convertWidth(_sizem) }}>
                    <Text style={[styles.NA_text_style, { width: convertWidth(_size), height: convertWidth(_size) }]}>N/A</Text>
                </View>;
        }
    }
    _setCheckCell2(status) {
        let _size = '3.5%';
        let _sizem = '3.5%';
        let _sizeicons = '2.5%';
        switch (status) {
            case 0:
                return <View style={{ borderRadius: convertWidth(_sizem), alignItems: 'center', justifyContent: 'center', backgroundColor: Constant.COLOR_GRAY_ICON, width: convertWidth(_sizem), height: convertWidth(_sizem) }}>
                    <Icon
                        name="check"
                        size={convertWidth(_sizeicons)}
                        color={Constant.COLOR_WHITE7}
                    />
                </View>;
            case 1:
                return <View style={{ borderRadius: convertWidth(_sizem), alignItems: 'center', justifyContent: 'center', backgroundColor: Constant.COLOR_GREEN_CHECKMEET, width: convertWidth(_sizem), height: convertWidth(_sizem) }}>
                    <Icon
                        name="check"
                        size={convertWidth(_sizeicons)}
                        color={Constant.COLOR_WHITE7}
                    />
                </View>;
            case null:
                return <View style={{ borderRadius: convertWidth(_sizem), alignItems: 'center', justifyContent: 'center', backgroundColor: Constant.COLOR_GRAY_ICON, width: convertWidth(_sizem), height: convertWidth(_sizem) }}>
                    <Icon
                        name="check"
                        size={convertWidth(_sizeicons)}
                        color={Constant.COLOR_WHITE7}
                    />
                </View>;
        }
    }
    _setFeedBackIcon(){
        let _sizem = '3.5%';
        let _sizeicons = '2.2%';
        return <View style={{ borderRadius: convertWidth(_sizem), alignItems: 'center', justifyContent: 'center', backgroundColor: Constant.COLOR_BLUE_FEEDBACKICON, width: convertWidth(_sizem), height: convertWidth(_sizem) }}>
            <Icon
                name="comments"
                size={convertWidth(_sizeicons)}
                color={Constant.COLOR_WHITE7}
            />
        </View>;
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
            }, () => this.setState({
                updateCheckParent: false
            }))
            this.props.checkDokterCallback(id);
        }

    }
    //refresh jarak
    _onGetDistance(data) {

        let nears = getDistance({
            latitude: data.lat,
            longitude: data.lng
        });
        return nears
    }
    //Add FeddbackButton
    addFeedback(_feedbacksalles, currentDataDoctor) {
        let _size = '4%';
        if (_feedbacksalles != null) {
            return <TouchableOpacity
                style={styles.icondone}
                onPress={() => { _feedbacksalles.length < 2 ? this.props.onOpenFeedback(currentDataDoctor) : null }}
            >

                {_feedbacksalles.length < 2 &&
                    this._setFeedBackIcon()
                    /*<CustomCachedImage
                        component={Image}
                        indicator={ActivityIndicator}
                        style={{ width: convertWidth(_size), height: convertWidth(_size) }}
                        resizeMode={'contain'}
                        source={require('../../../../assets/ASET/status.png')}
                    />*/
                }
            </TouchableOpacity>
        } else if (_feedbacksalles == null) {
            return <TouchableOpacity
                style={styles.icondone}
                onPress={() => { this.props.onOpenFeedback(currentDataDoctor) }}
            >
                {this._setFeedBackIcon()
                /*
                 <CustomCachedImage
                    component={Image}
                    indicator={ActivityIndicator}
                    style={{ width: convertWidth(_size), height: convertWidth(_size) }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/ASET/status.png')}
                />
                */
                }
               

            </TouchableOpacity>
        } else {
            return null;
        }
    }
    //CHECK DETAIL DOKTER
    checkDetailDokter = () => {
        const { dokter } = this.state;

        if (this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE){
            //doctor.map(resdok => {
            //console.log("dokter", dokter);
            //let _status = false;
            
            LEMARI_GLOBAL_DETAIL_GET(dokter.id).then(res => {
                
                this._isMounted && this.setState({
                    isDetailDokter: res ? true : false,
                    isLoading: false
                })
            });
            //});
       // console.log(celldata)
       // this.setState({ isLoading: false });
        }else{
            this._isMounted && this.setState({
                isDetailDokter: false,
                isLoading: false
            })
        }
     
    }
    //
    _getStatusDocter(data) {
        //console.log(data);
        let _status = 0;
        //let dokterr = data[0].results;
        if (data.length > 0) {
        data.forEach((datas, index) => {
            if (datas && datas.results) {
                //console.log("dokter", datas)
                if (datas.results.length == 1) {
                    // console.log("dokter status schedule", datas.results[0].status)
                    _status = datas.results[0].status;

                } else {
                    _status = datas.results.status;
                }
            }
        })
        return _status;
    }else{
        return _status;
    }
    }
    _getFeedBackSalles(data) {
        let resulthStatus = null;
        if (data.length > 0) {
            data.forEach((datas, index) => {
                //console.log("dokter schedule", datas)
                if (datas && datas.results) {
                    resulthStatus = datas.results.feedback_sales;

                } else {
                    resulthStatus = null;
                }
            })
            //console.log("resulth feedback", resulthStatus)
            return resulthStatus;
        }else{
            return resulthStatus;
        }
    }
    _getResulthDocter(data) {
        let resulthStatus = 0;
        if(data.length>0){
            data.forEach((datas, index) => {
                //
                //console.log("dokter resulth", datas)
                if (datas && datas.results) {
                    // console.log("dokter resulth", datas)
                    // console.log(isTODAY(datas.results.updated_at))
                    if (datas.results.updated_at) {
                        if (isTODAY(datas.results.updated_at) == true) {
                            resulthStatus = datas.results;
                        } else {
                            resulthStatus = null;
                        }
                    } else {
                        resulthStatus = null;
                    }


                } else {
                    resulthStatus = null;
                }
            })
            // console.log("resulth status", resulthStatus)
            return resulthStatus;
        }else{
            return resulthStatus;
        }
        
    }
    //
    _CallNotAvaiable(data) {
        if (data) {
            console.log("_CallNotAvaiable", data);

            let startDate = formateFullDateNumber(Date.now(), "YYYY-MM-DD")

            let jdata = {
                status: 0,
                cms_users_id: user.getUsId(),
                doctors_id: data.id,
                schedule_date: startDate,
                signature: false,
                feedback: false,
                feedback_sales: "",
                locations_id: data.pivot.locations_id,
                e_detailings_name: data.speciality_name,
                json_result: null,
                photos: null
            };

            this.props.onNotAvaiable(jdata);
        }

    }
    //
    _onPressViewDetail(dokter,dataHospital, bollComplete){
        if(Constant.ONLINE == false && this.state.isDetailDokter == false){
            return callAlert(Constant.NAME_APPS,"Offline Detail Not Found")
        }
        if(Constant.ONLINE == true && this.state.isDetailDokter == false){
            callToast('Try Download Dokter Detail');
        }

        this.props.onViewDetail(dokter, dataHospital, bollComplete)
    }
    //
    render() {
        const { celldata, isLoading, updateCheckParent, rumahSakitDistance, hcell, hcell2, hcell3, isnear, dokter, isDetailDokter } = this.state;
        if (dokter && isLoading == false){
            let _resulth = null;
            let _status;
            let _feedbacksalles = null;
            let _size = '4%';
            let currentDataDoctor = null;
            let cacheDetail = false;
            //near = Math.floor(this._onGetDistance(listDokter)) < Constant.MAX_DISTANCE ? true : false

            near = this.props.rsnear;
           // console.log("result detail", isDetailDokter);
            //console.log("jarak", this._onGetDistance(listDokter));
            // console.log("dokter_name", celldata[0].jarak);
            //console.log("max radius", Constant.MAX_DISTANCE);
            if (dokter.schedule && dokter.schedule.length > 0) {
                _resulth = this._getResulthDocter(dokter.schedule);
                _status = this._getStatusDocter(dokter.schedule);
                _feedbacksalles = this._getFeedBackSalles(dokter.schedule);

                //console.log("doktor feedback", _feedbacksalles);
                currentDataDoctor = {
                    status: _status,
                    cms_users_id: user.getUsId(),
                    schedule_date: dokter.schedule[0]?dokter.schedule[0].schedule_date:null,
                    locations_id: dokter.pivot.locations_id,
                    e_detailings_name: dokter.speciality_name,
                    doctors_id: dokter.id
                }
            }
            return <View style={{ width: convertWidth('92%'), flexDirection: 'row', height: convertWidth('5%'),margin:convertHeight('1%')}}>
                {this.props.userrole != Constant.ROLE_FINISHTODAY && this.props.userrole != Constant.ROLE_READYSTARTSCHEDULE && this.props.userrole != Constant.ROLE_INLOGIN &&
                    <CheckComponent
                        keyid={dokter.pivot.locations_id}
                        listid={dokter.id}
                        data={dokter}
                        checkid={dokter.isSelect}
                        onCheckUpdate={this.onDokterSelect.bind(this)}
                        disable={false}
                        stylecheck={{
                            width: convertWidth('4%'),
                            height: convertWidth('4%'),
                            backgroundColor: 'transparent',
                            marginTop: 5,
                            marginRight: 20
                        }} />
                }

                <Text style={[styles.nameliststyle,
                {
                    fontFamily: Constant.POPPINS_REG,
                    color: isDetailDokter == true ? Constant.COLOR_GREEN3 : '#b3b3b3',
                    justifyContent: 'flex-start',
                    width: convertWidth(this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE ? "60%" : '50%')
                }]} >
                    {dokter.name}</Text>

                {this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE && _resulth == null && isnear == true &&
                    <TouchableHighlight
                    underlayColor={Constant.COLOR_WHITE3}
                    onPress={() => this._onPressViewDetail(dokter, this.props.dataHospital, false)}
                        style={{
                            width: convertWidth('14%'), height: convertHeight('5%'),
                            marginRight: convertWidth('1%'), justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 25,
                            backgroundColor: Constant.COLOR_ORANGE1,
                            borderColor: Constant.COLOR_WHITE1
                        }}>
                        <Text style={{ fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.2%'), color: Constant.COLOR_WHITE1 }}>
                            {"View Detail"}
                        </Text>
                    </TouchableHighlight>
                }
                {this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE && _resulth == null && isnear == false &&
                    <TouchableHighlight
                        underlayColor={Constant.COLOR_WHITE3}
                        style={{
                            width: convertWidth('14%'), height: convertHeight('5%'),
                            marginRight: convertWidth('1%'), justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 25,
                            backgroundColor: Constant.COLOR_WHITE1,
                            borderColor: Constant.COLOR_GRAY2
                        }}>
                        <Text style={{ fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.2%'), color: Constant.COLOR_GRAY2 }}>
                            {"View Detail"}
                        </Text>
                    </TouchableHighlight>
                }
                {this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE && _resulth == null && isnear == null &&
                    <TouchableHighlight
                        underlayColor={Constant.COLOR_WHITE3}
                        style={{
                            width: convertWidth('14%'), height: convertHeight('5%'),
                            marginRight: convertWidth('1%'), justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 25,
                            backgroundColor: Constant.COLOR_WHITE1,
                            borderColor: Constant.COLOR_GRAY2
                        }}>
                        <Text style={{ fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.2%'), color: Constant.COLOR_GRAY2 }}>
                            {"Cordinat not found"}
                        </Text>
                    </TouchableHighlight>
                }
                {this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE && _resulth == null &&
                    <TouchableOpacity
                        style={[styles.icondone, { width: convertWidth('3.5%'), height: convertWidth('3.5%') }]}
                         onPress={() => this._CallNotAvaiable(dokter)}
                    >

                        {
                            this._setStatusCell2(null)
                            /* <CustomCachedImage
                            component={Image}
                            indicator={ActivityIndicator}
                            style={{ width: convertWidth('3.5%'), height: convertWidth('3.5%') }}
                            resizeMode={'contain'}
                            source={require('../../../../assets/ASET/status_5.png')}
                        />*/
                        }
                    </TouchableOpacity>
                }
                {this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE && _resulth &&
                    <View style={{ flexDirection: 'row', height: convertHeight('5%'), alignItems: 'center' }}>
                        {
                            this.addFeedback(_feedbacksalles, currentDataDoctor)
                        }

                        <TouchableOpacity
                            style={styles.icondone}
                        //onPress={() => this.props.onViewDetail(dokter, listDokter,true)}
                        >
                            {
                             this._setCheckCell2(_status)
                            /*
                             <CustomCachedImage
                                component={Image}
                                indicator={ActivityIndicator}
                                style={{ width: convertWidth(_size), height: convertWidth(_size) }}
                                resizeMode={'contain'}
                                source={this._setCheckCell2(_status)}
                            />
                            */
                            }
                           
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icondone}
                        // onPress={() => this.props.onViewDetail(dokter, listDokter,true)}
                        >

                            {
                                this._setStatusCell2(_status)
                                /*<CustomCachedImage
                                component={Image}
                                indicator={ActivityIndicator}
                                source={this._setStatusCell(_status)}
                                style={{ width: convertWidth(_size), height: convertWidth(_size) }}
                                resizeMode={'contain'}
                                />*/
                            }
                        </TouchableOpacity>
                    </View>
                }
            </View>
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
    },
    NA_text_style: {
         textAlign: 'center', 
         textAlignVertical: 'center',
          marginTop: convertHeight('0.5%'), 
          fontFamily: Constant.POPPINS_BOLD, 
          fontSize: convertWidth('1.4%'), 
          color: Constant.COLOR_WHITE1 
    }
})
export default DoktorCell_opt;