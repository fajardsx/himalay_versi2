import React from "react";
import { Platform, StyleSheet, Animated, Text, View, TextInput, ScrollView, RefreshControl, Keyboard } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from "@react-native-community/geolocation";
import ContentLoader from "rn-content-loader";
import { Circle, Rect } from "react-native-svg";
//
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, dashboardDate, curretntimestamp, formateFullDateNumber, formateFullDayUTCFormat, loading, getDistance, isCloseBottom, callToast, getIfYesterday, GLOBAL_INITSCHEDULE, callAlert, onlyLoading, groupBY, UPDATE_SET_TODAY } from '../../global/Global';
import user, { userdata } from '../../global/user';
import { Styleapp } from '../../styleapp';
import Headers from '../module_header'
import UserDashboard from "../../appcomponent/module_user";
import ScheduleCell from "../../appcomponent/module_schedulecell";
import ScheduleCell_opt from "../../appcomponent/module_schedulecell/scheduleCell_opt";
import PAGE_CONFIG from "../../pagemanager/Module_pagemanager";
import { LEMARI_GLOBAL_LOAD, TargetSelect, SYNCLoc } from "../../appcomponent/module_async/AsyncManager";
import KEYS from "../../appcomponent/module_async/utils/keyAsync";
import { getMonthSchedulerDoktor, CheckDokterSelect } from "../../global/dokter_manager";
import HospitalCell_opt from "../../appcomponent/module_schedulecell/component/hospitalCell";
import DoktorCell_opt from "../../appcomponent/module_schedulecell/component/doktorCell";
import DATA_SCHEDULE from "../../db/dataScheduleManager";
//REDUX
import { connect } from 'react-redux';
import ACTION_TYPE from "../../redux/actions/actions";
import { moderateScale } from "../../styleapp/scaling";


let dataDummy = [];
let that = null;
let NUMSELECT = 0;
let isShow = 0;
class HomeViewModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            isPop: false,
            data: [],
            dataPage: [],
            _cell: [],
            MonthSchedule: [],
            SelectSchedule: [],
            dataSelect: [],
            isLoading: false,
            isRefresh: false,
            isSelectLoading: false,
            loadLoading: false,
            scrollY: new Animated.Value(0),
            currentRole: -1,
            init: false,
            listDokter: [],
            listSelectDokter: [],
            on_max: [Constant.MAX_CELL, Constant.MAX_CELL],
            convertDataState: [],
            listRefresh: false,
            searchinputText: "",
            KeyboardIsShow: false
        };
        // user.updateStatusRole(Constant.ROLE_INLOGIN);
        // this.props.updateRole(Constant.ROLE_INLOGIN)

        that = this;
        //this.dashboard = React.createRef();
        // console.log(this.props);
    }
    UNSAFE_componentWillMount() {

        this.setPositionUSER()
    }
    componentDidMount() {

        PAGE_CONFIG.homeRoute = this.props.navigation;

        this.focuslistener = this.props.navigation.addListener("didFocus", () => {
            //console.log("home focus")
            let callBackRefresh = this.props.navigation.getParam("callBackRefresh", false);
            // console.log(callBackRefresh);
            if (callBackRefresh == true) {
                this._onRefresh();
            }
        })
        this.inits();
        //KEYBOARD
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", function () {
            isShow = 1;
            this.setState({
                KeyboardIsShow: true
            })
        }.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", function () {
            isShow = 0;
            this.setState({ KeyboardIsShow: false });
        }.bind(this));
    }
    inits = () => {
        let _role = this.props.userrole
        console.log("home_viewmodel.js 116 => init ", _role)
        console.log("home_viewmodel.js 116 => currentScheduleData ", this.props.currentScheduleData)
        //console.log("_dataschedule ", this.props.screenProps._dataschedule);
        //console.log("_selectschedule ", this.props.screenProps._selectschedule);

        //dataDummy = this.props.currentScheduleData.visit_schedule;
        // this.setState(
        //     {
        //         data: dataDummy,
        //         MonthSchedule: this.props.screenProps._dataschedule,
        //         SelectSchedule: this.props.screenProps._selectschedule
        //     },
        //     () => {
        this.getTotalShedule();
        this.sortByLocation();
        //     }
        // );

    }
    UNSAFE_componentWillReceiveProps(prevProps) {
        const { _role, _selectschedule } = this.props.screenProps;

        console.log("prev schedule", prevProps.screenProps._role)
        console.log("home_viewmodel.js 151 => current role", this.props.userrole)
        if (prevProps.screenProps._role == undefined) {
            this.setState(
                {
                    isLoading: true,
                    currentRole: this.props.userrole
                },
                () => this.setToday()
            );
        }
        if (this.state.currentRole != prevProps.screenProps._role) {
            if(this.dashboard)this.dashboard.onTargetToday();
            // console.log('update role')
            if (prevProps.screenProps._role == Constant.ROLE_READYSTARTSCHEDULE) {
                this.setState(
                    {
                        isLoading: true,
                        currentRole: prevProps.screenProps._role
                    },
                    () => this.setToday()
                );
            }
            if (prevProps.screenProps._role == Constant.ROLE_INLOGIN) {
                this.setState(
                    {
                        isLoading: true,
                        currentRole: prevProps.screenProps._role
                    },
                    () => this.setToday()
                );
            }
            if (prevProps.screenProps._role == Constant.ROLE_INSELECTSCHEDULE) {
                NUMSELECT = 0;
                this.setState(
                    {
                        isLoading: true,
                        currentRole: prevProps.screenProps._role
                    },
                    () => this.setToday()
                );
            }
            if (prevProps.screenProps._role == Constant.ROLE_ADDDOCTORAGAIN) {
                NUMSELECT = 0;
                this.setState(
                    {
                         isLoading: true,
                        currentRole: prevProps.screenProps._role
                    },
                    () => this.setToday()

                );
            }
            if (prevProps.screenProps._role == Constant.ROLE_FINISHTODAY) {
                this.setState(
                    {
                        isLoading: true,
                        currentRole: prevProps.screenProps._role
                    },
                    () => this.setToday()
                );
            }
            if (prevProps.screenProps._role == 3 && this.state.currentRole == 4) {
                this.onCancelAgainSchedule()
            }
        }
    }
    componentWillUnmount() {
        this.focuslistener.remove();
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        if (this.callRefreshCountdown) {
            clearTimeout(this.callRefreshCountdown);
        }
    }

    setPositionUSER() {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                    latitude,
                    longitude
                };
                // console.log("cordinate : ", newCoordinate);
                this.props.updateUserLocation(newCoordinate)
                user.updateUserGeolocation(newCoordinate, false);

                this.setState({
                    myposition: newCoordinate
                })
            },
            error => callToast(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 100
            }
        )
    }
    setInit() {

        //  console.log('set init role status ', user.getStatusRole());
        if (dataDummy.length > 0) {

            this.setState({
                data: dataDummy
            }, () => {
                this.getTotalShedule();
                this.sortByLocation();

            });
        } else {
            //this.props.screenProps._reqSchedule();
            //  console.log("REQ SCHEDULE");
            this.props.screenProps._reqHistory(formateFullDayUTCFormat(new Date(), "Y-MM-DD"));
            this.props.screenProps._reqNotif();
            //this.props.screenProps._reqExpendses();

            this.props.screenProps._reqSchedule().then(res => {
                //    console.log("Get SCHEDULE", res)
                that.setState({
                    //data:dataDummy,

                    MonthSchedule: res.visit_schedule,
                    SelectSchedule: res.set_schedule
                }, () => {
                    that._checkStatus().then(resStatus => {
                        //  console.log("ROLE STATUS ", resStatus);
                        if (resStatus != Constant.ROLE_READYSTARTSCHEDULE) {
                            dataDummy = res.visit_schedule;
                        } else {
                            dataDummy = res.set_schedule;
                        }

                        //  console.log('init data', dataDummy);
                        that.setState({
                            data: dataDummy,

                        }, () => {
                            that.getTotalShedule();
                            that.sortByLocation()
                        })
                    });

                })
            })
        }
    }
    ///////
    setToday = () => {
        console.log("SET TODAY");
        //  console.log("_dataschedule ", this.props.screenProps._dataschedule);
        //  console.log("_selectschedule ", this.props.screenProps._selectschedule);
        //  console.log("_current  ", this.state.currentRole);

        //this.initRefresh();
        if (this.props.userrole == Constant.ROLE_INLOGIN) {
            dataDummy = this.props.currentScheduleData.visit_schedule;
            this.initToday();
        } else if (this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE) {
            dataDummy = this.props.currentScheduleData.set_schedule;
            this.initToday();
        } else if (this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN) {
            dataDummy = this.props.currentScheduleData.visit_schedule;
            this.initToday();
        } else {
            // if (this.props.screenProps._selectschedule) {
            //     if (this.props.screenProps._selectschedule.length > 1) {
            //         dataDummy = this.props.screenProps._selectschedule;
            //         this.initToday();
            //     } else {
            //         dataDummy = this.props.screenProps._dataschedule;
            //         this.initToday();
            //     }
            // } else {
            //     dataDummy = this.props.screenProps._dataschedule;
            //     this.initToday();
            // }

        }
    }
    initToday() {
        //  console.log("get update schedule for today", dataDummy)
        this.setState({
            data: dataDummy,
            //convertDataState:[],
            MonthSchedule: this.props.screenProps._dataschedule,
            SelectSchedule: this.props.screenProps._selectschedule
        }, () => {
            this.getTotalShedule();
            this.sortByLocation();

        })
    }

    onOpenTrack() {
        this.props.navigation.navigate(Constant.VM_MAPVIEW)
    }

    _renderSearchPlace = () => {


    }
    onPressStart() {
        // console.log("POP")
        this.setState({
            isPop: true
        })
    }
    onOpenSignature = () => {
        // this.props.navigation.navigate(Constant.VM_SIGNATURE);
    }
    onOpenDocterDetail = (data, hospital, complete) => {
        //console.log("open detail", data);
        // console.log("open detail hospital", hospital);
        this.props.navigation.navigate(Constant.VM_DOCTOR_DETAIL, { isDetail: true, dataDokter: data, dataHospital: hospital, isCompletes: complete });
    }

    async getTotalShedule() {
        //console.log("current role",user.getStatusRole())
        console.log("process getTotalSchedule")
        let _shecduleData = this.props.currentScheduleData.visit_schedule;
        // console.log('total', this.state.data);
        let _monthSchedule = this.props.currentScheduleData.visit_schedule;

        console.log('month', _monthSchedule);
        let shceduleList = 0;
        let todayList = 0;
        let listDokter = [];
        let listSelectDokter = [];
        if (_monthSchedule) {

            for (var i = 0; i < _monthSchedule.length; i++) {
                //console.log(_monthSchedule[i])
                for (var j = 0; j < _monthSchedule[i].doctors.length; j++) {
                    if (listDokter.find(doktor => doktor.id === _monthSchedule[i].doctors[j].id) == undefined) {
                        //console.log("dokter data ",_monthSchedule[i].doctors[j])
                        listDokter.push(_monthSchedule[i].doctors[j])
                        shceduleList = listDokter.length;
                    }
                }
            }
        }

        if (_shecduleData) {
            let _shecdule = [];
            if (this.props.screenProps._role != Constant.ROLE_READYSTARTSCHEDULE) {
                _shecduleData.map((place) => {
                    //_shecdule.push(place);

                    place.doctors.map((res) => {
                        if (res.isSelect == 1) {
                            if (listSelectDokter.find(doktor => doktor.id === res.id) == undefined) {
                                listSelectDokter.push(res)
                            }
                        }
                    })
                });
            }
            NUMSELECT = listSelectDokter.length;
        }

        if (this.state.SelectSchedule) {
            if (this.props.screenProps._role == Constant.ROLE_READYSTARTSCHEDULE) {
                let _shecduleSelectData = [];
                if (this.state.SelectSchedule.length > 0) {
                    _shecduleSelectData = this.state.SelectSchedule;
                } else {
                    _shecduleSelectData = this.props.screenProps._selectschedule;
                }
                _shecduleSelectData.map((place) => {
                    //_shecdule.push(place);

                    place.doctors.map((res) => {
                        if (res.isSelect == 1) {
                            if (listSelectDokter.find(doktor => doktor.id === res.id) == undefined) {
                                res.created_at = formateFullDateNumber(Date.now(), "YYYY-MM-DD HH:MM:SS")
                                listSelectDokter.push(res)
                            }
                        }
                    })
                });
            } else {
                let _shecduleSelectData = this.state.SelectSchedule;
                // console.log("_shecduleSelectData", _shecduleSelectData);
                if (_shecduleSelectData == undefined) {
                    return;
                }
                if (_shecduleSelectData.length > 0) {
                    _shecduleSelectData.map((place) => {
                        //_shecdule.push(place);

                        place.doctors.map((res) => {
                            if (res.isSelect == 1) {
                                if (listSelectDokter.find(doktor => doktor.id === res.id) == undefined) {
                                    res.created_at = formateFullDateNumber(Date.now(), "YYYY-MM-DD HH:MM:SS")
                                    listSelectDokter.push(res)
                                }
                            }
                        })
                    });
                }
            }
        } else {
            //   console.log("this.state.SelectSchedule", this.state.SelectSchedule);
        }



        console.log("schedule", shceduleList);
        // console.log("today list dokter", listDokter.length);

        let addVisitable = await UPDATE_SET_TODAY(listSelectDokter, _monthSchedule)
        user.updateSchedule(listDokter);

        console.log("select today", addVisitable);
        user.updateSelectSchedule(addVisitable);
        /*this.setState({
            listDokter,
            listSelectDokter
        })*/

        let updateDashboard = setTimeout(() => {
            if (this.dashboard) {
                this.dashboard.onTargetToday();
                this.dashboard.updateStatusSchedule(listDokter, listSelectDokter);
            }

            clearTimeout(updateDashboard);
        }, 500);

    }
    _onCheckDoktorByHospital(id) {
        // console.log('doctor by hospital ', id);
        let { data } = this.state;
        //  console.log(" data", data)
    }
    _findSelectDoktorFromHospital = (dok) => {
        return dok.reduce(function (a, e, i) {
            if (e.isSelect === 1)
                a.push(i);
            return a;
        }, []);
    }


    onSelectAgainSchedule() {
        if (this.state.isLoading == true) {
            return;
        }
        this.setState({
                convertDataState: []
            },()=>{
                this.props.updateRole(Constant.ROLE_ADDDOCTORAGAIN)
            });
        
        // this.setState({ isLoading: true });
        // this.setState({
        //     //isLoading:true,
        //     currentRole: -1,
        //     dataPage: [],
        //     convertDataState: []
        // }, () => {
        //     user.updateStatusRole(Constant.ROLE_ADDDOCTORAGAIN)
        //     this.props.updateRole(Constant.ROLE_ADDDOCTORAGAIN)
        //     //this.props.screenProps._onUpdateRole(Constant.ROLE_ADDDOCTORAGAIN);
        //     this.onCompareDokter();
        // });
    }
    onCancelAgainSchedule() {
        if (this.state.isLoading == true) {
            return;
        } this.setState({
            convertDataState: []
        },()=>{ this.props.updateRole(Constant.ROLE_READYSTARTSCHEDULE)
        });
       
        // this.setState({ isLoading: true });
        // user.updateStatusRole(Constant.ROLE_READYSTARTSCHEDULE)
        // this.props.updateRole(Constant.ROLE_READYSTARTSCHEDULE)
        // this.props.screenProps._onUpdateRole(Constant.ROLE_READYSTARTSCHEDULE);

        // this.setState({
        //     //isLoading:true,
        //     on_max: [Constant.MAX_CELL, Constant.MAX_CELL]
        // }, () => {
        //     this._onRefresh();
        // });
    }
    //Reset AddAgain
    onResetSelect() {

    }
    //find UNSET dokter
    onCompareDokter() {
        console.log("MONTH DOKTER ", this.state.MonthSchedule);
        console.log("SET DOKTER ", this.state.SelectSchedule);
        SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res => {
            console.log(KEYS.KEY_SCHEDULE, res);
        })
        let that = this;
        this.props.screenProps._unsetSchedule().then(res => {

            //if(res!=null && res.length>0){
            // setTimeout(() => {
            console.log("UNSET SCHEDULE", res)

            that.setState({
                data: res.slice(0),
                convertDataState: [],
                dataPage: []
            }, () => {
                that.setState({
                    isLoading: true,
                    isRefresh: false,
                    on_max: [Constant.MAX_CELL, Constant.MAX_CELL]
                }, () => that.sortByLocation())
            })
            //}, 800);
            //}
        })
    }
    //Insert Feedback Dokter
    _onFeedBackOpen(currentDataDoctor) {
        //   console.log("feedback Open", currentDataDoctor)
        this.props.screenProps._callPopFeedback(currentDataDoctor);
    }
    //Not Avaiable
    _onNotAvaiable(currentDataDoctor) {
        //   console.log("DOKTER NOT AVAIABLE", currentDataDoctor)
        let DataDoctor = {
            status: 0,
            cms_users_id: user.getUsId(),
            schedule_date: currentDataDoctor.schedule_date,
            doctors_id: currentDataDoctor.doctors_id,
            locations_id: currentDataDoctor.locations_id,
        }
        this.props.screenProps._callPopFeedback(DataDoctor, currentDataDoctor);
    }

    //RENDER CELL
    FlatListItemSeparator() {
        //Item Separator
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
        );
    }
    SetScheduleCell2() {
        const { dataPage, on_max } = this.state;
        let distanceCell = [];
        if (dataPage && dataPage.length > 0) {
            this.getTotalShedule();
            //console.log('render schedule cell', dataPage)
            // console.log('max render schedule cell', on_max)

            dataPage.forEach((datas, index) => {

                const _max = on_max[index];
                //   console.log('datas schedule cell', datas);
                let convertData = []
                datas.map(res => {
                    if (res.dataHospital.doctors.length > 0) {
                        convertData.push({
                            title: res.dataHospital.name,
                            parentdata: res,
                            data: res.dataHospital.doctors
                        })
                    }

                });
            })
            return distanceCell;
        } else {
            return null;
        }

    }
    onStart() {
        const { _role } = this.props.screenProps;
        if (
            _role == Constant.ROLE_INSELECTSCHEDULE ||
            _role == Constant.ROLE_ADDDOCTORAGAIN
        ) {
            if (NUMSELECT < 1) {
                return callAlert(
                    Constant.NAME_APPS,
                    "Please select doctor."
                );
            } else {
                this.props.screenProps._saveSchedule(this.state.data)
            }
        }

        this.props.screenProps._callPopStart()
        // console.log("update:", this.state.data);

    }

    _onRefresh(set = true) {

        this.setState({ isRefresh: set, isLoading: true, currentRole: -1 },

            this._proccessRefresh

        );
    }
    //
    _proccessRefresh = () => {
        const { _role } = this.props.screenProps;
        this.setPositionUSER();
        //this.refs.homeheader._refreshSyncCount();
        if (_role != Constant.ROLE_ADDDOCTORAGAIN) {

            this.props.screenProps._reqSchedule().then(res => {
                console.log("refressh Get SCHEDULE", res)

                if (res != undefined) {
                    that.setState({
                        MonthSchedule: res.visit_schedule,
                        SelectSchedule: res.set_schedule
                    }, () => {
                        //that._checkStatus();

                        if (_role != Constant.ROLE_READYSTARTSCHEDULE) {
                            dataDummy = res.visit_schedule.slice(0);
                        } else {
                            dataDummy = res.set_schedule.slice(0);
                        }
                        that.setState({
                            data: dataDummy,
                            convertDataState: [],
                        }, () => {
                            // that.getTotalShedule();
                            that.sortByLocation()
                        })
                    })
                } else if (res == undefined) {
                    that.setState({
                        isLoading: false,
                        isRefresh: false
                    });
                }

            })
        } else if (_role == Constant.ROLE_ADDDOCTORAGAIN) {
            this.onCompareDokter();
        }
    }
    //
    sortByLocation() {
        const _role = this.props.userrole;
        console.log("Process sortByLocation ");
        // if (_role == Constant.ROLE_READYSTARTSCHEDULE || _role == Constant.ROLE_FINISHTODAY) {

        //     TargetSelect().then(resSelect => {
        //         console.log('from off select', resSelect)

        //         if (resSelect != undefined) {
        //             if (resSelect.length > 0) {
        //                 that.setState({

        //                     //dataschedule: res.visit_schedule,
        //                     //data: res.set_schedule.slice(0),
        //                     //isLoading: true,
        //                     data: resSelect
        //                     //res.set_schedule.slice(0)
        //                 }, () => {
        //                     that.filterLocation(this.state.data)
        //                 });
        //             } else {
        //                 that.filterLocation(this.state.data)
        //             }
        //         } else {
        //             that.filterLocation(this.state.data);
        //         }


        //     })
        // } else {
            if (this.state.data) {
                this.filterLocation(this.state.data)
            }
        //}
    }
    filterLocation(_monthSchedule) {
        console.log('sort', _monthSchedule);
        const _role = this.props.userrole;
        this.setState({
            convertDataState: []
            //isLoading: false
        })
        let groupByid = [];
        let groupByKM = [];
        let _convertData = [];
        let getLocation = true;
        //CCONVERT TO SELF FORMAT
        if (!_monthSchedule) {
            return;
        }
        _monthSchedule.map(rs => {
            //console.log(rs);
            //100m
            /*
            let jarak =getDistance({
                latitude: rs.lat,
                longitude: rs.lng
            })*1000;

            let jrkTxt = "0 m";
            if(jarak>1000){
                jrkTxt = Math.round(jarak/1000)+" km";
            }else{
                jrkTxt = Math.round(jarak)+" m";
            }
                groupByid.push({ 'jarak': jarak, 'radius': Math.floor(jarak/1000) ,'jaraktext':jrkTxt,'dataHospital':rs});
            */
            //1km
            let rsLat = String(rs.lat).split(' ').join('');
            let rsLng = String(rs.lng).split(' ').join('');
            let jarak = getDistance({
                latitude: rsLat,
                longitude: rsLng
            }, this.props.userlocation);

            let isLong = "";
            let jrkTxt = "";
            let rsnear = false;

            //console.log(rsLat+","+rsLng)
            //console.log(Math.round(jarak))
            // jarak=undefined;
            console.log(`${rs.name} Found ${ CheckDokterSelect(rs)}`);
            if(this.props.userrole == Constant.ROLE_ADDDOCTORAGAIN && CheckDokterSelect(rs) == false){
                   return console.log("Found");
            }else if(this.props.userrole == Constant.ROLE_READYSTARTSCHEDULE && CheckDokterSelect(rs) == false){
                if (jarak == undefined) {
                    getLocation = false;
                } else if (jarak) {
                    if (Math.floor(jarak) > Number(Constant.MAX_DISTANCE)) {
    
                        jrkTxt = "> " + `${Constant.MAX_DISTANCE} km`;
                        rsnear = false;
                        groupByid.push({ 'jarak': jarak, 'radius': Math.floor(jarak), "rsnear": rsnear, 'jaraktext': jrkTxt, 'dataHospital': rs });
                    } else {
                        jrkTxt = "< " + `${Constant.MAX_DISTANCE} km`;
                        rsnear = true;
                        groupByid.push({ 'jarak': jarak, 'radius': Math.floor(jarak), "rsnear": rsnear, 'jaraktext': jrkTxt, 'dataHospital': rs });
                    }
    
                } else {
                    jrkTxt = "> " + `${Constant.MAX_DISTANCE} km`;
                    rsnear = false;
                    groupByid.push({ 'jarak': jarak, 'radius': -1, "rsnear": null, 'jaraktext': jrkTxt, 'dataHospital': rs });
                }
            }else{
                if (jarak == undefined) {
                    getLocation = false;
                } else if (jarak) {
                    if (Math.floor(jarak) > Number(Constant.MAX_DISTANCE)) {
    
                        jrkTxt = "> " + `${Constant.MAX_DISTANCE} km`;
                        rsnear = false;
                        groupByid.push({ 'jarak': jarak, 'radius': Math.floor(jarak), "rsnear": rsnear, 'jaraktext': jrkTxt, 'dataHospital': rs });
                    } else {
                        jrkTxt = "< " + `${Constant.MAX_DISTANCE} km`;
                        rsnear = true;
                        groupByid.push({ 'jarak': jarak, 'radius': Math.floor(jarak), "rsnear": rsnear, 'jaraktext': jrkTxt, 'dataHospital': rs });
                    }
    
                } else {
                    jrkTxt = "> " + `${Constant.MAX_DISTANCE} km`;
                    rsnear = false;
                    groupByid.push({ 'jarak': jarak, 'radius': -1, "rsnear": null, 'jaraktext': jrkTxt, 'dataHospital': rs });
                }
            }
            
        });

        if (getLocation == false && _monthSchedule.length > 0) {
            callAlert(Constant.NAME_APPS, "Failed get Your location,please cek connection and refresh");
        }
        //SORT
        groupByid.sort(function (a, b) {
            return a.jarak - b.jarak;
        })
        console.log('group ', groupByid);



        //COMBINE
        let areaID = 0;
        groupByid.map((child, index) => {

            if (groupByKM.length == 0) {
                if (child.dataHospital.doctors.length > 0) {
                    child['area'] = areaID;
                    groupByKM.push([child])
                    console.log("at 0 ", groupByKM);
                    areaID = 0;
                }
            } else {
                const jaraks = child.jaraktext;//curent find
                // console.log('child ', jaraks);
                let resulthKm = groupByKM.map((res, indexx) => {
                    //console.log(res[0].radius+" , "+jaraks);
                    if (res[0].jaraktext == jaraks) {
                        return indexx;
                    }
                });
                //console.log("at ", index);
                //console.log('resulth ', resulthKm);
                //console.log('resulth ', groupByKM.length-1);
                //console.log('index ', resulthKm[groupByKM.length-1]);
                if (resulthKm[groupByKM.length - 1] == undefined) {
                    if (child.dataHospital.doctors.length > 0) {
                        areaID = 0;
                        child["area"] = areaID;
                        groupByKM.push([child]);
                        // console.log("at1 ", groupByKM);

                    }

                } else {
                    if (child.dataHospital.doctors.length > 0) {
                        areaID += 1;
                        child["area"] = areaID;
                        groupByKM[resulthKm[groupByKM.length - 1]].push(child)
                        //console.log("at 2", groupByKM);
                    }
                }

            }
            if (index > Constant.MAX_CELL) {
                //return;
            }
            //console.log("AREA", areaID);
            if (child.dataHospital.doctors.length > 0 && child.dataHospital.doctors.visitable) {
                console.log("DOKTER ", child.dataHospital.doctors);
                let avaiable = groupBY(child.dataHospital.doctors, dokter => dokter.visitable);
                console.log("visitable ", avaiable);
                let countAdd = 0
                if (avaiable.get(true) != undefined && avaiable.get(true) != null) {
                    //       console.log("cek group ", avaiable.get(true));
                    countAdd = avaiable.get(true).length
                }
                console.log("Role ", avaiable);
                console.log("Doctor Count ", countAdd);

                //  console.log(`${child.dataHospital.name} available ${countAdd} from ${child.dataHospital.doctors.length}`);
                if (_role > Constant.ROLE_INLOGIN && _role < Constant.ROLE_READYSTARTSCHEDULE) {
                    if (countAdd > 0) {
                        _convertData.push({
                            title: child.dataHospital.name,
                            parentdata: child,
                            data: child.dataHospital.doctors,
                            area: areaID
                        });
                    }
                } else {
                    _convertData.push({
                        title: child.dataHospital.name,
                        parentdata: child,
                        data: child.dataHospital.doctors,
                        area: areaID
                    });
                }
            } else {
                _convertData.push({
                    title: child.dataHospital.name,
                    parentdata: child,
                    data: child.dataHospital.doctors,
                    area: areaID
                });
            }

        })
        /*groupByid.map(res => {
            if (res.dataHospital.doctors.length > 0) {
                _convertData.push({
                    title: res.dataHospital.name,
                    parentdata: res,
                    data: res.dataHospital.doctors
                })
            }

        });*/
        console.log('group km', groupByKM);
        console.log('sesction ', _convertData);


        this.setState({
            _cell: groupByKM,
            convertDataState: _convertData
            //isLoading: false
        }, () => this._setData())
    }
    //
    _setData() {
        const { dataPage, data, _cell, convertDataState } = this.state;
        //  console.log("setData() ", _cell)
        //  console.log("convertDataState ", convertDataState)

        let startData = dataPage;

        if (_cell.length >= Constant.MAX_CELL) {
            let max = Constant.MAX_CELL + startData.length;

            let startcel = startData.length;
            if (max > _cell.length) {
                max = _cell.length
            }

            for (var i = startcel; i < max; i++) {
                startData.push(_cell[i])
            }

            this.setState({
                dataPage: startData,

            }, () => this._onComplete())
        } else if (_cell.length < Constant.MAX_CELL) {

            this.setState({
                dataPage: _cell,
            }, () => this._onComplete())
        }


    }
    //PAGING 
    _setDataGroup() {
        const { dataPage, data, _cell, on_max } = this.state;
        //  console.log("_setDataGroup() ", _cell)
        //  console.log("no_max() ", on_max)

        _cell.forEach((res, index) => {

            let startGroupData = on_max[index];
            if (res) {
                if (res.length >= Constant.MAX_CELL) {
                    let maxcel = Constant.MAX_CELL + startGroupData;
                    let startGroupCel = startGroupData;

                    if (maxcel > res.length) {
                        maxcel = res.length
                    }
                    for (var i = startGroupCel; i < maxcel; i++) {
                        startGroupData += 1;
                    }

                    on_max[index] = startGroupData;
                }
            }
            else if (res[index]) {
                if (res[index].length < Constant.MAX_CELL) {
                    on_max[index] = res.length;
                }
            }

        })

        //   console.log("_setDataGroup() done ", on_max);
        this.setState({
            on_max
        }, () => this._onComplete())
    }
    _onComplete() {
        const { _cell, data } = this.state;
        //  console.log("_onComplete");
        this.setState({
            isLoading: false, isRefresh: false,
        }, () => this.timeutload = setTimeout(() => {
            this.setState({
                loadLoading: false
            });
            clearTimeout(this.timeutload)
        }, 1000))
    }
    clearData() {
        // this.setState({data:[]})
        //   console.log("Clear data");
    }
    _onEndScroll(e) {
        const { dataPage, data, _cell, on_max } = this.state;
        if (isCloseBottom(e.nativeEvent)) {
            //   console.log('end')
            // callToast("Loading..")
            this.setState({
                isLoading: true,
                loadLoading: true,
            }, () => this._setDataGroup())
            if (dataPage.length != _cell.length) {
                //this._setData();
                //  let nexts = on_max+Constant.MAX_CELL;
                //this._setDataGroup();
            }
        }
    }
    ///Render Loader Content
    _loadercontent() {
        const { isLoading, convertDataState, searchinputText } = this.state;
        if (convertDataState.length < 1 && searchinputText.length < 1) {
            return <View style={{ borderBottomWidth: 1, borderColor: Constant.COLOR_WHITE3, width: convertWidth("90%"), marginLeft: convertWidth("2.5%") }}>
                <ContentLoader
                    height={convertHeight("27%")}
                    width={convertWidth("90%")}
                >
                    <Rect
                        x={convertWidth("0%")}
                        y={convertHeight("0%")}
                        rx="5"
                        ry="5"
                        width={convertWidth("90%")}
                        height={convertHeight("6%")}
                    />
                    <Circle cx={convertWidth("6.5%")} cy={convertWidth("8%")} r={convertWidth("2.7%")} />

                    <Rect
                        x={convertWidth("11%")}
                        y={convertHeight("10%")}
                        rx="5"
                        ry="5"
                        width={convertWidth("40%")}
                        height={convertHeight("4.5%")}
                    />
                    <Rect
                        x={convertWidth("11%")}
                        y={convertHeight("18%")}
                        rx="5"
                        ry="5"
                        width={convertWidth("35%")}
                        height={convertHeight("4%")}
                    />
                </ContentLoader>
            </View>
        } else if (convertDataState.length < 1 && searchinputText.length > 1) {
            return <View style={{
                width: convertWidth("90%"),
                height: convertHeight("30%"),
                marginLeft: convertWidth("2.5%"),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: Constant.POPPINS_REG,
                    fontSize: convertWidth('1.8%'),
                    color: "#000",
                }}>
                    {"Search failed,Data Not Found"}
                </Text>
            </View>
        } else {
            return null;
        }

    }
    //SEARCH PROCESS
    addSearch() {
        const _role = this.props.userrole;
        if (_role == Constant.ROLE_ADDDOCTORAGAIN || _role == Constant.ROLE_INSELECTSCHEDULE) {
            return <View style={styles.inputContainer}>
                <TextInput underlineColorAndroid="rgba(0,0,0,0)"
                    defaultValue=""
                    ref="searchinput"
                    placeholder="Search"
                    placeholderTextColor="#a8a8a8"
                    style={styles.input}
                    onChangeText={(txt) => {
                        this.setState({
                            searchinputText: txt
                        }, () => this.processSearch())
                    }}
                />
                <Icon
                    name={"search"}
                    style={{
                        paddingRight: convertWidth('2%')
                    }}
                    size={convertWidth('2%')} color={Constant.COLOR_GRAY2}
                />
            </View>
        } else {
            return null;
        }
    }
    processSearch() {
        const { searchinputText, data } = this.state;
        //   console.log("data",this.state.data);
        let resultSearch = data.filter(res => {
            let resData = "";

            let keyCity = res.city_name ? res.city_name.toUpperCase() : "";
            let keyName = res.name ? res.name.toUpperCase() : "";

            resData = `${keyCity} ${keyName} ${this.getAllNameDoctorHospital(res.doctors)}`;


            const textData = searchinputText.toUpperCase();

            return resData.indexOf(textData) > -1;
        })

        // console.log("data", resultSearch);
        that.filterLocation(resultSearch)
    }
    getAllNameDoctorHospital(dataDoctor) {
        let listNamaDoctor = "";
        if (dataDoctor == null || dataDoctor.length < 0) {
            return listNamaDoctor;
        }
        dataDoctor.map((res, index) => {
            if (res.visitable == true) {
                listNamaDoctor += ` ${res.name}`;
            } else {
                listNamaDoctor += ` `;
            }
        })
        console.log('list name ', listNamaDoctor);
        return listNamaDoctor.toUpperCase();

    }
    //PROCESSS CHECKMATE VER 2
    _onCheckHospitalByDoktor(id) {
        let { _cell, data } = this.state;
        console.log('doctor click ', id);
        console.log(" cell", _cell);
        this.setState({
            convertDataState: [],
        })
        _cell.map(res => {
            console.log(" cell res ", res);
            if (id.data.locations) {
                id.data.locations.map((idlocate, index) => {
                    let gethospital = res.find(result => { return result.dataHospital.id == idlocate });
                    if (gethospital) {
                        let getdoktor = gethospital.dataHospital.doctors.find(
                            doc => {
                                return doc.id == id.listid;
                            }
                        );
                        if (getdoktor) {
                            getdoktor.isSelect = id.isSelect;
                        }
                        //auto check hospital
                        let countSelectDokter = this._findSelectDoktorFromHospital(
                            gethospital.dataHospital.doctors
                        );
                        if (
                            countSelectDokter.length ==
                            gethospital.dataHospital.doctors.length
                        ) {
                            gethospital.dataHospital.isSelect = 1;
                        } else {
                            gethospital.dataHospital.isSelect = 0;
                        }
                    }
                });
            } else {
                callToast("Doctor Location id not found");
            }
        })
        console.log(" cell done", _cell);
        this.props.updateScheduleSelectDoktor(id);
        //this.props.screenProps._updateReviewSchedule(id);
        let _convertData = [];
        for (var i = 0; i < _cell.length; i++) {
            _cell[i].map(res => {
                if (res.dataHospital.doctors.length > 0) {
                    _convertData.push({
                        title: res.dataHospital.name,
                        parentdata: res,
                        data: res.dataHospital.doctors,
                        area: res.area
                    })
                }
            });
        }

        console.log("DONE CHECK PROCESSS", _convertData)
        this.setState({
            isLoading: false,
            //isSelectLoading:false,
            convertDataState: _convertData,
            _cell: _cell
        }, () => {
            this.getTotalShedule()
            //this._setData()
        })
    }
    ///RENDER//
    //this.props.screenProps._callPopFeedback
    render() {
        const { isPop, data, isLoading, isRefresh, dataPage, KeyboardIsShow, isSelectLoading, loadLoading, convertDataState } = this.state;
        const { _role } = this.props.screenProps;
        return <View style={{ backgroundColor: '#fff', flex: 1, overflow: 'hidden' }}>
            <Headers
                ref={"homeheader"}
                navigation={this.props.navigation}
                burgeronpress={this.props.screenProps._callPopBurger}
                titleheader={"Schedule"}
                userrole={_role}
                loadings={isLoading}
            />
            {
                !KeyboardIsShow &&
                <UserDashboard
                    userROLE={_role}
                    ref={refs=>{this.dashboard=refs}}
                    onPressStart={this.onStart.bind(this)}
                    onAgain={this.onSelectAgainSchedule.bind(this)}
                    onCancelAgain={this.onCancelAgainSchedule.bind(this)}
                    onOpenlist={this.props.screenProps._onOpenList.bind(this)}
                    profilDok={this.props.userData}
                    atExpenses={false}
                    {...this.props}
                />
            }

            <View style={{
                width: convertWidth('98%'),
                marginTop: convertHeight("5%"),
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
            >
                <Text style={{
                    fontFamily: Constant.POPPINS_REG,
                    fontSize: convertWidth('1.8%'),
                    color: "#000",
                    marginLeft: convertWidth('3%'),
                    paddingTop: convertHeight('6%'),
                    paddingBottom: convertHeight('3%')
                }}>
                    {dashboardDate(curretntimestamp())}
                </Text>

                {
                    this.addSearch()
                }

            </View>

            {
                this._loadercontent()
            }
            {
                <FlatList
                    style={{
                        width: convertWidth('100%'),
                        height: convertHeight('50%'),
                        //marginBottom:convertHeight('1%')
                    }}
                    extraData={this.state}
                    data={convertDataState}
                    //pagingEnabled={true}
                    windowSize={10}
                    removeClippedSubviews={true}
                    initialNumToRender={8}

                    updateCellsBatchingPeriod={30}
                    maxToRenderPerBatch={2}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefresh}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }

                    numColumns={1}
                    renderItem={({ item, index }) => <HospitalCell_opt
                        dataHospital={item.parentdata}
                        dataJarak={item}
                        _onCheckHospitalByDoktor={this._onCheckHospitalByDoktor.bind(this)}
                        checkDokterCallback={this._onCheckHospitalByDoktor.bind(this)}
                        key={index}
                        //userrole={this.props.userrole}
                        parentid={index}
                        areaid={item.area}
                        dataSelect={this.state.dataSelect}
                        //dataSchedule={item.parentdata}
                        onViewDetail={this.onOpenDocterDetail.bind(this)}
                        onOpenFeedback={this._onFeedBackOpen.bind(this)}
                        onNotAvaiable={this._onNotAvaiable.bind(this)}
                    //onMax={on_max[index]}
                    />}
                    //scrollEventThrottle={100}
                    keyExtractor={(item, index) => index.toString()}
                />
            }

            {
                loadLoading == true && onlyLoading()
            }
            {
                //isSelectLoading == true && loading()
            }
            {
               // isLoading == true && loading()
            }
        </View>
    }
}
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        height: moderateScale(35),
        // marginBottom: 10,
        marginTop: convertHeight('5%'),
        //alignSelf: 'center',
        borderColor: "#C1C1C2",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: convertWidth('40%'),
        borderWidth: 1,
        borderRadius: convertWidth('2%')
    },
    input: {
        width: convertWidth('30%'),
        //height: moderateScale(18),
        paddingLeft: 15,
        // backgroundColor : 'rgba(255,255,255,0.5)',
        color: '#000',
        fontSize: moderateScale(12),

    },
})
/***/
function mapStateToProps(state) {
    return {
        isFirst: state.firstopen,
        userData: state.userData,
        userlocation: state.userGeolocation,
        //scheduleData: state.scheduleData,
        currentSelectDoktor: state.currentSelectDoktor,
        currentScheduleData: state.currentScheduleData,
        userrole: state.userRole
    };
}
function dispatchToProps(dispatch) {
    return {
        cleardata: () =>
            dispatch({ type: ACTION_TYPE.CLEAR_DATA }),
        updateRole: role =>
            dispatch({ type: ACTION_TYPE.UPDATE_USERROLE, value: role }),
        updateSchedule: schedule =>
            dispatch({ type: ACTION_TYPE.UPDATE_SCHEDULE, value: schedule }),
        updateScheduleSelectDoktor: doktor =>
            dispatch({ type: ACTION_TYPE.UPDATE_CURRENTSELECTDOKTOR, value: doktor }),
        updateUserLocation: data =>
            dispatch({ type: ACTION_TYPE.UPDATE_USER_LOCATION, value: data })
    };
}
export default connect(
    mapStateToProps,
    dispatchToProps,
)(withNavigation(HomeViewModel));


