import React from "react";
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
//import Image from "react-native-image-progress";
import { CustomCachedImage } from "react-native-img-cache";
import ShadowView from 'react-native-shadow-view'
//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, calcDistance, Glob_sendNA, formateFullDateNumber, isTODAY, getDistance } from '../../global/Global';
import user from '../../global/user';
import { Styleapp } from '../../styleapp';
import CheckComponent from "../module_check";
import { SYNCLoc, LEMARI_GLOBAL_DETAIL_GET } from "../module_async/AsyncManager";
import KEYS from "../module_async/utils/keyAsync";



const cellH = convertWidth('4%');
let that = null
let near = false;
let _dokterData = [];
class ScheduleCell_opt extends React.Component {
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
        }
        that = this;
    }
    componentDidMount() {
        that = this;
        this.setState({ isMount: true, isLoading: true })
        if (this.props.dataSchedule) {
            // console.log("cell",this.props.dataSchedule);
            this.setState({
                celldata: this.props.dataSchedule,
                // isnear: this.props.dataSchedule.rsnear
            }, this.checkDetailDokter)

        }
        // this.dashboard.updateStatusSchedule();
    }
    componentWillUnmount() {
        this.setState({ isMount: false })
    }
    componentWillReceiveProps() {
        console.log('update cell', this.props.dataSchedule)
        console.log('update cell', this.state.celldata)
        this.setState({
            celldata: this.props.dataSchedule,
        }, this.checkDetailDokter)
    }
    scheduleSize(e) {
        this.setState({
            wSchedule: e.nativeEvent.layout.width
        })
    }
    onRumahSakitSelect(id) {
        console.log('rumah sakit', id)
        const { celldata } = this.state;

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
        console.log('cell data', celldata);

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

        //this.props.checkHospitalCallback(id)
    }
    onCompleteUpdate() {

        this.setState({
            isLoading: false
        })
    }
    checkDoctorSelect() {
        let dokterSelec = 0;
        _dokterData.map((value, index) => {
            if (value.isSelect == 1) {
                dokterSelec++;
            }
        })

        return dokterSelec;
    }
    onDokterSelectByHospital(id, iselect) {
        //console.log('dokter', id)

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
            /*for (var i = 0; i < _dokterData.length; i++) {

                if (_dokterData[i].listid == id.listid) {
                    currentindex = i;
                }
            }*/
            // console.log('get index', currentindex);
            if (currentindex == -1) {
                _dokterData.push(id);
                currentindex = _dokterData.length - 1;
            }
        }


        //console.log('dokter data', _dokterData);
        if (currentindex > -1) {
            //  console.log('current data', currentindex)
            _dokterData[currentindex].isSelect = iselect;


            this.setState({
                updateCheckParent: true,
                selectRumahSakit: iselect
            }, () => this.setState({
                updateCheckParent: false
            }))
            this.props.checkDokterCallback(id);
        }

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
            /* for (var i = 0; i < _dokterData.length; i++) {
     
                 if (_dokterData[i].listid == id.listid) {
                     currentindex = i;
                 }
             }*/
            //  console.log('get index', currentindex);
            if (currentindex == -1) {
                _dokterData.push(id);
                currentindex = _dokterData.length - 1;
            }
        }



        if (currentindex > -1) {
            // console.log('current data', currentindex)
            _dokterData[currentindex].isSelect = id.isSelect;


            this.setState({
                updateCheckParent: true,
                //selectRumahSakit: this.checkDoctorSelect() > 0 ? 0 : 0
            }, () => this.setState({
                updateCheckParent: false
            }))
            this.props.checkDokterCallback(id);
        }

    }




    _getStatusDocter(data) {
        console.log("_getStatusDocter",data);
        let _status = 0;
        let dokterr = data[0].results;
        data.forEach((datas, index) => {
            if (datas.results) {
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
    }
    _getFeedBackSalles(data) {
        let resulthStatus = null;
        data.forEach((datas, index) => {
            //console.log("dokter schedule", datas)
            if (datas.results) {
                resulthStatus = datas.results.feedback_sales;

            } else {
                resulthStatus = null;
            }
        })
        //console.log("resulth feedback", resulthStatus)
        return resulthStatus;
    }
    _getResulthDocter(data) {
        let resulthStatus = 0;
        data.forEach((datas, index) => {
            //
            if (datas.results) {
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
    }
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

            this.props.onNotAvaiable(jdata)
        }

    }
    onClickViewDetail(gnear, dokter, listDokter, boolclick) {
        // console.log('dok',dokter)
        //console.log('list',listDokter)
        console.log('near ', gnear)
        //  let near = Math.floor(this._onGetDistance(listDokter)) < Constant.MAX_DISTANCE ? true : false;
        // console.log('near ', near)
        if (gnear == true) {
            this.props.onViewDetail(dokter, listDokter, boolclick)
        }

        if (Constant.TRAC_DEBUG_MODE) {
            this.props.onViewDetail(dokter, listDokter, boolclick)
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

                    <CustomCachedImage
                        component={Image}
                        indicator={ActivityIndicator}
                        style={{ width: convertWidth(_size), height: convertWidth(_size) }}
                        resizeMode={'contain'}
                        source={require('../../../assets/ASET/status.png')}
                    />
                }
            </TouchableOpacity>
        } else if (_feedbacksalles == null) {
            return <TouchableOpacity
                style={styles.icondone}
                onPress={() => { this.props.onOpenFeedback(currentDataDoctor) }}
            >
                <CustomCachedImage
                    component={Image}
                    indicator={ActivityIndicator}
                    style={{ width: convertWidth(_size), height: convertWidth(_size) }}
                    resizeMode={'contain'}
                    source={require('../../../assets/ASET/status.png')}
                />

            </TouchableOpacity>
        } else {
            return null;
        }
    }
    //CHECK DETAIL DOKTER
    checkDetailDokter = () => {
        const { celldata } = this.state;
        celldata.map(res => {
            res.dataHospital.doctors.map(resdok => {
                //console.log("dokter", resdok);
                LEMARI_GLOBAL_DETAIL_GET(resdok.id).then(res => {
                    if (res) {
                        _status = true;
                    } else {
                        _status = false;
                    }
                    resdok['isDetail'] = _status;
                });
            })
        })
        console.log(celldata)
        this.setState({ isLoading: false });
    }
    //RENDER NAME DOKTER
    renderNameDoker(keyid, listDokter, index, data = null) {
        let _keyid = keyid;
        const { celldata, isnear, iscacheDetail } = this.state;


        
        return listDokter.doctors.map((dokter, index) => {
            let _resulth = null;
            let _status;
            let _feedbacksalles = null;
            let _size = '4%';
            let currentDataDoctor = null;
            let cacheDetail = false;
            //near = Math.floor(this._onGetDistance(listDokter)) < Constant.MAX_DISTANCE ? true : false

            near = data.rsnear;
            //console.log(near);
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
                    schedule_date: dokter.schedule[0].schedule_date,
                    locations_id: dokter.pivot.locations_id,
                    e_detailings_name: dokter.speciality_name,
                    doctors_id: dokter.id
                }
            }
            //CHECK OFFLINE 

            console.log("detaildoktor", dokter);
            return <View key={index} style={{ flexDirection: 'row' }}>
                {this.state.isLoading == false && this.props.userrole != Constant.ROLE_FINISHTODAY && this.props.userrole != Constant.ROLE_READYSTARTSCHEDULE && this.props.userrole != Constant.ROLE_INLOGIN &&
                    <CheckComponent
                        keyid={_keyid}
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
                    color: dokter.isDetail == true ? Constant.COLOR_GREEN3 : '#b3b3b3',
                    justifyContent: 'flex-start',
                    width: convertWidth(this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE ? "60%" : '50%')
                }]} >
                    {dokter.name}</Text>

                {this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE && _resulth == null && near == true &&
                    <TouchableOpacity
                        onPress={() => this.props.onViewDetail(dokter, listDokter, false)}
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
                    </TouchableOpacity>
                }
                {this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE && _resulth == null && near == false &&
                    <TouchableOpacity
                        //onPress={() => near == true ? this.props.onViewDetail(dokter, listDokter, false) : null}
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
                    </TouchableOpacity>
                }
                {this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE && _resulth == null &&
                    <TouchableOpacity
                        style={[styles.icondone, { width: convertWidth('3.5%'), height: convertWidth('3.5%') }]}
                        onPress={() => this._CallNotAvaiable(dokter)}
                    >

                        <CustomCachedImage
                            component={Image}
                            indicator={ActivityIndicator}
                            style={{ width: convertWidth('3.5%'), height: convertWidth('3.5%') }}
                            resizeMode={'contain'}
                            source={require('../../../assets/ASET/status_5.png')}
                        />
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

                            <CustomCachedImage
                                component={Image}
                                indicator={ActivityIndicator}
                                style={{ width: convertWidth(_size), height: convertWidth(_size) }}
                                resizeMode={'contain'}
                                source={this._setCheckCell(_status)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icondone}
                        // onPress={() => this.props.onViewDetail(dokter, listDokter,true)}
                        >

                            <CustomCachedImage
                                component={Image}
                                indicator={ActivityIndicator}
                                source={this._setStatusCell(_status)}
                                style={{ width: convertWidth(_size), height: convertWidth(_size) }}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        })
    }
    _setStatusCell(status) {
        switch (status) {
            case 0:
                return require('../../../assets/ASET/status_5.png');
            case 1:
                return require('../../../assets/ASET/status_3.png');
            case null:
                return require('../../../assets/ASET/status_5.png');
        }
    }
    _setCheckCell(status) {
        switch (status) {
            case 0:
                return require('../../../assets/ASET/status_4.png');
            case 1:
                return require('../../../assets/ASET/status_2.png');
            case null:
                return require('../../../assets/ASET/status_4.png');
        }
    }
    renderCheck(keyid, datadokter) {
        if (this.props.userrole == Constant.ROLE_INSELECTSCHEDULE || this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN) {
            if (this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN && datadokter.iseditable == 1) {
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
            } else {
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
   /* setNamaDokter(keyid, datadokter, id) {
        //console.log("cell",datadokter);
        return <View key={id} style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            {this.state.isLoading == false &&
                this.renderCheck(keyid, datadokter)
            }

            <Text style={[styles.nameliststyle, { width: convertWidth("65%") }]}>{datadokter.namadokter}</Text>

            {this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE &&
                <TouchableOpacity
                    onPress={() => this.props.onViewDetail(datadokter)}
                    style={{
                        width: 100, height: 30,
                        marginRight: '5%', justifyContent: 'center', alignItems: 'center',
                        borderWidth: 1, borderColor: Constant.COLOR_GRAY2,
                        borderRadius: 25, backgroundColor: Constant.COLOR_WHITE1
                    }}>
                    <Text style={{ fontFamily: Constant.POPPINS_LIGHT, fontSize: 10, color: Constant.COLOR_GRAY2 }}>{"View Detail"}</Text>
                </TouchableOpacity>
            }
        </View>
    }*/
    getDistance(value) {
        //console.log("geo rs",value);
        //console.log("geo user", user.getUserGeolocation());
        if (user.getUserGeolocation() != null) {
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
            }, 1000);

        }


    }
    _oncellLayout(e) {
        let curdata = e.nativeEvent.layout.height
        // console.log(e.nativeEvent.layout.height)
        this.setState({
            hcell: curdata
        })
    }
    _renterHospitalNoDoctor(index, data) {

        return <View key={index}
            style={{
                width: convertWidth('92%'),
                //height: convertWidth('50%'),
                //borderWidth:1,
                marginHorizontal: convertWidth('1%'),
                //marginTop: convertHeight('1%'),
                paddingBottom: convertHeight('1%')
            }}
        //onLayout={(e) => this._oncellLayout(e, hcell3)}
        > <View style={{ width: convertWidth('92%'), flexDirection: 'row', padding: convertWidth('1%') }}>

                <View style={{ width: convertWidth('10%'), alignItems: 'center' }}>
                    <View style={{ width: convertWidth('5%'), height: convertWidth('5%'), borderRadius: convertWidth('3%'), backgroundColor: "#7785EC", justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                        {data.dataHospital.picture != null &&
                            <CustomCachedImage
                                component={Image}
                                indicator={ActivityIndicator}
                                source={{ uri: Constant.BASELINK + data.dataHospital.picture }}
                                style={{ width: convertWidth('5%'), height: convertWidth('5%') }}
                                resizeMode={"cover"}
                            />
                            /*<Image
                                style={{ width: convertWidth('5%'), height: convertWidth('5%') }}
                                source={{ uri: Constant.BASELINK + data.dataHospital.picture }}
                               // resizeMode={'contain'}
                            />*/
                        }
                    </View>
                </View>

                <View >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.nameliststyle, { fontFamily: Constant.POPPINS_BOLD, fontSize: convertWidth('1.9%'), color: "#515151" }]}>{data.dataHospital.name}</Text>
                        {
                            <Text style={[styles.nameliststyle, { marginLeft: 10, marginTop: convertHeight('2.3%'), paddingHorizontal: 10, borderWidth: 1, borderRadius: convertWidth('1%'), height: convertHeight('3%'), fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.2%'), color: "#515151" }]}>
                                {data.jarak ? Math.round(data.jarak) + " km" : "Get Location Failed"}
                            </Text>
                        }

                    </View>
                    <Text style={[styles.nameliststyle, { fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.5%'), color: "#515151" }]}>{"No Doctor This Hospital"}</Text>
                </View>
            </View>
        </View>;
    }
    _renderHospital(celldata) {
        const { updateCheckParent } = this.state;
        let hospital_cell = [];
        let maxShow = this.props.onMax;
        celldata.map((data, index) => {
            //console.log("hospital ", data. dataHospital.doctors );
            //console.log("max ", maxShow);
            //console.log("index ", index);
            if (index > maxShow) {
                return;
            } else if (data.dataHospital.doctors && data.dataHospital.doctors.length == 0) {
                maxShow += 1;
                return;
                //hospital_cell.push(this._renterHospitalNoDoctor(index, data));
            }

            console.log('create hospital', data)
            hospital_cell.push(<View key={index}
                style={{
                    width: convertWidth('92%'),
                    //height: convertWidth('50%'),
                    //borderWidth:1,
                    marginHorizontal: convertWidth('1%'),
                    //marginTop: convertHeight('1%'),
                    paddingBottom: convertHeight('1%')
                }}
            //onLayout={(e) => this._oncellLayout(e, hcell3)}
            >
                <View style={{ width: convertWidth('92%'), flexDirection: 'row', padding: convertWidth('1%') }}>
                    {this.props.userrole != Constant.ROLE_READYSTARTSCHEDULE && this.props.userrole != Constant.ROLE_FINISHTODAY && this.props.userrole != Constant.ROLE_INLOGIN && updateCheckParent == false &&
                        <CheckComponent
                            checkid={data.dataHospital.isSelect}
                            keyid={data.dataHospital.id}
                            disable={false}
                            data={data.dataHospital}
                            onCheckUpdate={this.onRumahSakitSelect.bind(this)}
                            stylecheck={{
                                width: convertWidth('3%'),
                                height: convertWidth('4%'),
                                backgroundColor: 'transparent',
                                marginTop: 5,
                                //marginRight: 30
                            }}
                        />
                    }

                    <View style={{ width: convertWidth('10%'), alignItems: 'center' }}>
                        <View style={{ width: convertWidth('5%'), height: convertWidth('5%'), borderRadius: convertWidth('3%'), backgroundColor: "#7785EC", justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            {data.dataHospital.picture != null &&
                                <CustomCachedImage
                                    component={Image}
                                    indicator={ActivityIndicator}
                                    source={{ uri: Constant.BASELINK + data.dataHospital.picture }}
                                    style={{ width: convertWidth('5%'), height: convertWidth('5%') }}
                                    resizeMode={"cover"}
                                />
                                /*<Image
                                    style={{ width: convertWidth('5%'), height: convertWidth('5%') }}
                                    source={{ uri: Constant.BASELINK + data.dataHospital.picture }}
                                   // resizeMode={'contain'}
                                />*/
                            }
                        </View>
                    </View>

                    <View >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.nameliststyle, { fontFamily: Constant.POPPINS_BOLD, fontSize: convertWidth('1.9%'), color: "#515151" }]}>{data.dataHospital.name}</Text>
                            {
                                <Text style={[styles.nameliststyle, { marginLeft: 10, marginTop: convertHeight('2.3%'), paddingHorizontal: 10, borderWidth: 1, borderRadius: convertWidth('1%'), height: convertHeight('3%'), fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('1.2%'), color: "#515151" }]}>{Math.round(data.jarak) + " km"}</Text>
                            }

                        </View>

                        {
                            data.dataHospital.doctors.length > 0 &&
                            this.renderNameDoker(this.props.parentid, data.dataHospital, index, data)
                        }
                    </View>

                </View>
                <View style={{
                    width: convertWidth('90%'),
                    borderBottomWidth: 0.5,
                    borderBottomColor: Constant.COLOR_GRAY2,
                }} />
            </View>)
        }

        );
        return hospital_cell;
    }
    //RENDER
    render() {
        const { celldata, isLoading, updateCheckParent, rumahSakitDistance, hcell, hcell2, hcell3 } = this.state;
        return <View style={{
            width: convertWidth('95%'), marginHorizontal: 20, marginBottom: convertHeight('3%'), borderWidth: 1, borderColor: 'rgba(0,0,0,0)',
            // elevation: 3,
            shadowColor: '#000',
            shadowOffset: {
                width: 0, height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            //backgroundColor: Constant.COLOR_WHITE1,
            borderRadius: convertWidth('1%')
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
                    shadowRadius: 4,
                }}
            />

            {isLoading == false &&
                <View style={{
                    flexDirection: 'row',
                    height: convertHeight('6%'),
                    backgroundColor: Constant.COLOR_WHITE2,
                    borderLeftColor: Constant.COLOR_GREEN3,
                    alignItems: 'center'
                }}

                >
                    <View
                        style={{
                            backgroundColor: Constant.COLOR_GREEN3,
                            width: convertWidth('1%'),
                            height: convertHeight('6%'),
                            //borderTopLeftRadius: convertWidth('6%'),
                        }}
                    // onLayout={(e) => this._oncellLayout(e, hcell2)}
                    />
                    <Text style={{ width: convertWidth('85%'), fontFamily: Constant.POPPINS_MEDIUM, fontSize: convertWidth('1.8%'), color: Constant.COLOR_GREEN3, marginLeft: convertWidth('1.5%') }}>
                        {
                            celldata[0].jaraktext
                        }
                    </Text>

                    <CustomCachedImage
                        component={Image}
                        indicator={ActivityIndicator}
                        style={{ width: 15, height: 15 }}
                        source={require("../../../assets/ASET/Antu_arrow-right.svg.png")}
                        resizeMode={'contain'}
                    />
                </View>

            }
            {
                celldata && this._renderHospital(celldata)
            }
        </View>
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


export default ScheduleCell_opt;