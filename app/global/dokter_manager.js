import React, {Component} from 'react';
import {
  Alert,
  View,
  ActivityIndicator,
  Dimensions,
  Platform,
  ToastAndroid,
  Image,
  Text,
  NetInfo,
} from 'react-native';
import Constans from './Constant';
import store from 'react-native-simple-store';
import Constant from './Constant';
import {
  heightPercentageToDP as sh,
  widthPercentageToDP as sw,
} from 'react-native-responsive-screen';
import {MaskService} from 'react-native-masked-text';
import * as moment from 'moment';
import 'moment/locale/id';
import {
  gSetup,
  getDokters,
  sendLocation,
  loginUser,
  getListExpenses,
  getReveresGEO,
  listLocation,
  gNotification,
  getDetailDokters,
  resultScheduleDokter,
  photoSchedule,
  initSignal,
  sendSchedule,
  sendAttend,
  sendAttend_SYN,
  sendExepense,
  about,
  contact,
  help,
  reqSchedule,
} from '../module_api/module_resapi';
import haversine from 'haversine';
import user from './user';
import {
  LEMARI_GLOBAL_LOAD,
  LEMARI_GLOBAL_LOC,
  ASYNC_getScheduleToday,
  TargetSelect,
  getIDSAsync,
  LEMARI_GLOBAL_SELECT,
  SYNCLoc,
} from '../appcomponent/module_async/AsyncManager';
import KEYS from '../appcomponent/module_async/utils/keyAsync';
import {restlist} from '../config/restConfig';
import {formateFullDateNumber, getDATENoW, SYNCLoc_CORE_SET} from './Global';
import {Global} from '@jest/types';
import DATA_SCHEDULE from '../db/dataScheduleManager';

var encrymd5 = require('crypto-js');
export default class DocterManager {
  static DOKTERLIST = null;
}
export function dataSchedule() {
  SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res => {
    if (res) {
      console.log(res);
    }
  });
}
export function getMonthSchedulerDoktor(data) {
  console.log(data);
  let countDoktor = [];
  if (data != undefined && data != null && data.length > 0) {
    data.map(hos => {
      hos.doctors.map(dok => {
        if (
          countDoktor.find(res => {
            res.id == dok.id;
          }) == undefined
        ) {
          countDoktor.push(dok);
        }
      });
    });
  }

  //W console.log("TOTAL",countDoktor.length)
}
export function GetMeetDoktor(tempMetfound) {
  DATA_SCHEDULE.getDataSchedule().then(res => {
    //console.log('onGetCFData', res)
    if (res) {
      let schedule = res;
      //lost meet doktor this month

      //resultCF = schedule.list_doctor_set_this_month.length;

      // if (resultCF == 0) {
      if (schedule.visit_schedule == undefined) {
        return tempMetfound;
      }
      schedule.visit_schedule.forEach((rmhskit, index) => {
        rmhskit.doctors.map((doktr, index) => {
          //console.log('today set doktor',doktr)
          if (doktr.schedule[0] != undefined) {
            if (doktr.schedule[0].results != null) {
              // console.log("check ", doktr.schedule[0].results);
              if (doktr.schedule[0].results.status == 1) {
                //console.log(tempfound.findIndex(result => { return result.doctors_id == doktr.schedule[0].doctors_id }))
                if (
                  tempMetfound.find(result => {
                    return result.id == doktr.id;
                  }) == undefined
                ) {
                  //console.log("ADD", doktr.schedule[0])
                  //resultCF += 1;
                  tempMetfound.push(doktr);
                  //console.log("MEET", tempMetfound)
                }
              }
            }
          }
        });
      });
      // }
    }
  });
  /*SYNCLoc(KEYS.KEY_G,KEYS.KEY_SCHEDULE).then(res => {
        //console.log('onGetCFData', res)
        if (res) {
            let schedule = res[0];
            //lost meet doktor this month

            //resultCF = schedule.list_doctor_set_this_month.length;

           // if (resultCF == 0) {
            if (schedule.visit_schedule == undefined){
                return tempMetfound;
            }
                schedule.visit_schedule.forEach((rmhskit, index) => {
                    rmhskit.doctors.map((doktr, index) => {
                        //console.log('today set doktor',doktr)
                        if (doktr.schedule[0] != undefined) {
                            if (doktr.schedule[0].results != null) {
                                // console.log("check ", doktr.schedule[0].results);
                                if (doktr.schedule[0].results.status == 1) {
                                    //console.log(tempfound.findIndex(result => { return result.doctors_id == doktr.schedule[0].doctors_id }))
                                    if (tempMetfound.find(result => { return result.id == doktr.id }) == undefined) {
                                        //console.log("ADD", doktr.schedule[0])
                                        //resultCF += 1;
                                        tempMetfound.push(doktr);
                                        //console.log("MEET", tempMetfound)
                                    }
                                }
                            }
                        }
                    })
                })
           // }
        }
    })*/
}
export async function UpdateOFFLINE_list_doctor_set_this_month(params) {
  return await DATA_SCHEDULE.getDataSchedule().then(res => {
    if (res) {
      let newArr = [];
      let data = res.list_doctor_set_this_month;
      let hash = {};
      //console.log("UpdateOFFLINE_list_doctor_set_this_month",data)
      if (data == undefined) {
        return newArr;
      }
      let ismonth = formateFullDateNumber(Date.now(), 'MM');
      for (let i of data.concat(params)) {
        if (!hash[i]) {
          // let dataMonth = formateFullDateNumber(i.updated_at.slice(0, 10), "MM");
          // if(dataMonth == ismonth){
          hash[i.id] = i;
          //}
        }
      }

      for (let i in hash) {
        if (hash[i].name) {
          newArr.push(hash[i]);
        }
      }
      res.list_doctor_set_this_month = newArr;
      // console.log(newArr);
      DATA_SCHEDULE.updateDataSchedule(res);
      let clone = Object.assign({}, res);
      // console.log("UpdateOFFLINE_LIST_DOKTOR")
      SYNCLoc_CORE_SET(res);
      // SYNCLoc(KEYS.KEY_U, KEYS.KEY_SCHEDULE, clone);
      return newArr;
    }
  });

  /*return await SYNCLoc(KEYS.KEY_G,KEYS.KEY_SCHEDULE).then(res => {
        if (res) {
            let newArr = [];
            let data = res[0].list_doctor_set_this_month;
            let hash = {};
           //console.log("UpdateOFFLINE_list_doctor_set_this_month",data)
            if (data == undefined ){
                return newArr;
            }
            let ismonth = formateFullDateNumber(Date.now(),"MM");
            for (let i of data.concat(params)) {
                if (!hash[i]) {
                   // let dataMonth = formateFullDateNumber(i.updated_at.slice(0, 10), "MM");
                   // if(dataMonth == ismonth){
                        hash[i.id] = i;
                    //}
                }
            }
            

            for (let i in hash) {
                if (hash[i].name){
                    newArr.push(hash[i])
                }

            }
            res[0].list_doctor_set_this_month = newArr;
           // console.log(newArr);
            SYNCLoc(KEYS.KEY_U,KEYS.KEY_SCHEDULE,res);
            return newArr;
        }
    });*/
}
export async function getTodayPlan() {
  let count = 0;
  console.log('ROLE', user.getStatusRole());
  console.log('Today', user.getUserToday());
  user.getUserToday().map(res => {
    //console.log(res);
    if (res.visitable == true) {
      //console.log(count);
      count += 1;
    }
  });

  return await count;
}
export async function GetAllDocter(tempMetfound) {
  await DATA_SCHEDULE.getDataSchedule().then(res => {
    //console.log('onGetCFData', res)
    if (res) {
      let schedule = res;
      if (schedule.set_schedule.length > 0) {
        schedule.set_schedule.map((rmhskit, index) => {
          rmhskit.doctors.map((doktr, index) => {
            if (
              tempMetfound.find(result => {
                return result.id == doktr.id;
              }) == undefined
            ) {
              tempMetfound.push(doktr);
              //console.log("MEET", tempMetfound)
            }
          });
        });
      }
    }
  });
  /*await SYNCLoc(KEYS.KEY_G,KEYS.KEY_SCHEDULE).then(res => {
       //console.log('onGetCFData', res)
        if (res) {
            let schedule = res[0];
            if(schedule.set_schedule.length>0){
                schedule.set_schedule.map((rmhskit, index) => {
                    rmhskit.doctors.map((doktr, index) => {
                        if (tempMetfound.find(result => { return result.id == doktr.id }) == undefined) {
                            tempMetfound.push(doktr);
                            //console.log("MEET", tempMetfound)
                        }
                    })
                })
            }
        }
    })*/
}
export async function GetAllDocterCound(data, callback) {
  if (data) {
    let schedule = data;
    let tempMetfound = [];
    if (schedule.length > 0 && schedule.set_schedule.length > 0) {
      schedule.set_schedule.map((rmhskit, index) => {
        let datein = rmhskit.created_at.slice(0, 10);
        let now = getDATENoW();
        //if(datein == now){
        rmhskit.doctors.map((doktr, index) => {
          if (
            tempMetfound.find(result => {
              return result.id == doktr.id;
            }) == undefined
          ) {
            tempMetfound.push(doktr);
            //console.log("MEET", tempMetfound)
          }
        });
        //}
      });
      callback(tempMetfound.length);
    } else {
      callback(0);
    }
  } else {
    //callback(0);
  }
}
export async function GetAllDocterThisMonth(tempMetfound) {
  await DATA_SCHEDULE.getDataSchedule().then(res => {
    //console.log('onGetCFData', res)
    if (res) {
      let schedule = res;
      schedule.visit_schedule.map((rmhskit, index) => {
        rmhskit.doctors.map((doktr, index) => {
          if (
            tempMetfound.find(result => {
              return result.id == doktr.id;
            }) == undefined
          ) {
            tempMetfound.push(doktr);
            // console.log("MEET", tempMetfound.length)
          }
        });
      });
    }
  });
}
export async function SaveSendDoctor(tempMetfound) {
  await DATA_SCHEDULE.getDataSchedule().then(res => {
    console.log('SaveSendDoctor', res);
    if (res) {
      let schedule = res;
      // if(schedule.set_schedule.length == 0){
      schedule.set_schedule = tempMetfound;
      DATA_SCHEDULE.updateDataSchedule(schedule);

      let clone = Object.assign({}, schedule);
      console.log('SAVE KEY_SCHEDULE ', clone);
      console.log('savesenddoctor');
      SYNCLoc_CORE_SET(schedule);
      //SYNCLoc(KEYS.KEY_U, KEYS.KEY_SCHEDULE, clone);

      // }
      /*schedule.visit_schedule.forEach((rmhskit, index) => {
                rmhskit.doctors.map((doktr, index) => {
                    if (tempMetfound.find(result => { return result.id == doktr.id }) == undefined) {
                        tempMetfound.push(doktr);
                        // console.log("MEET", tempMetfound.length)
                    }
                })
            })*/
    }
  });
  /*await SYNCLoc(KEYS.KEY_G,KEYS.KEY_SCHEDULE).then(res => {
       // console.log('SaveSendDoctor', res)
        if (res) {
            let schedule = res[0];
           // if(schedule.set_schedule.length == 0){
                schedule.set_schedule = tempMetfound;
                SYNCLoc(KEYS.KEY_U,KEYS.KEY_SCHEDULE,[schedule]);
           // }
        }
    })*/
}
export async function ResetDocterSelect() {
  await DATA_SCHEDULE.getDataSchedule().then(res => {
    //  console.log('GetAllDocterCound', res)
    if (res) {
      let schedule = res;
      let tempMetfound = [];
      if (schedule.set_schedule.length > 0) {
        schedule.set_schedule.map((rmhskit, index) => {
          let datein = rmhskit.created_at.slice(0, 10);
          let now = getDATENoW();

          rmhskit.doctors.map((doktr, index) => {
            if (
              tempMetfound.find(result => {
                return result.id == doktr.id;
              }) == undefined
            ) {
              tempMetfound.push(doktr);
              //console.log("MEET", tempMetfound)
              //callback(tempMetfound.length);
            }
          });
        });
      }
    } else {
      //callback(0);
    }
  });
  /*await SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res => {
      //  console.log('GetAllDocterCound', res)
        if (res) {
            let schedule = res[0];
            let tempMetfound = []
            if (schedule.set_schedule.length > 0) {
                schedule.set_schedule.map((rmhskit, index) => {
                    let datein = rmhskit.created_at.slice(0, 10);
                    let now = getDATENoW();
                  
                    rmhskit.doctors.map((doktr, index) => {
                        if (tempMetfound.find(result => { return result.id == doktr.id }) == undefined) {
                            tempMetfound.push(doktr);
                            //console.log("MEET", tempMetfound)
                            //callback(tempMetfound.length);
                        }
                    })
                   
                })
            }
        } else {
            //callback(0);
        }
    })*/
}
//TODAY PLAN
export async function GetListTodayPlan(listSelect) {
  let tempDokter = [];
  return await DATA_SCHEDULE.getDataSchedule()
    .then(res => {
      if (res) {
        return res;
      }
    })
    .then(resus => {
      console.log('SaveSendDoctor', resus);
      listSelect.map(selectId => {
        resus.visit_schedule.map(resHospital => {
          let dataDokter = resHospital.doctors.find(
            dok => (dok.pivot.doctors_id = selectId),
          );
          if (dataDokter) {
            //console.log(dataDokter);
            if (
              tempDokter.findIndex(
                savedoc =>
                  (savedoc.pivot.doctors_id = dataDokter.pivot.doctors_id),
              ) == -1
            ) {
              tempDokter.push(dataDokter);
              console.log(tempDokter);
              //return tempDokter;
            }
          }
        });
      });
    });
}
//GET NOT MEET
export function GetNotMet(data, callback) {
  let tempDokter = [];
  if (data) {
    let schedule = data;
    let tempMetfound = [];
    if (schedule.visit_schedule.length > 0) {
      schedule.visit_schedule.map((rmhskit, index) => {
        rmhskit.doctors.map((doktr, index) => {
          if (
            tempMetfound.find(result => {
              return result.id == doktr.id;
            }) == undefined
          ) {
            if (doktr.schedule.length == 0 || doktr.schedule.results == null) {
              tempMetfound.push(doktr);
            }

            //console.log('MEET', tempMetfound.length);
          }
        });
        //}
      });
      callback(tempMetfound.length);
    } else {
      callback(0);
    }
  } else {
    //callback(0);
  }
}
//GET PLAN TODAY
export function GetServerTodayPlan(data, callback) {
  let tempDokter = [];
  if (data) {
    let schedule = data;
    let tempMetfound = [];
    if (schedule.visit_schedule.length > 0) {
      schedule.visit_schedule.map((rmhskit, index) => {
        rmhskit.doctors.map((doktr, index) => {
          if (
            tempMetfound.find(result => {
              return result.id == doktr.id;
            }) == undefined
          ) {
            if (doktr.schedule.length > 0) {
              tempMetfound.push(doktr);
            }

            //console.log('MEET', tempMetfound.length);
          }
        });
        //}
      });
      callback(tempMetfound.length);
    } else {
      callback(0);
    }
  } else {
    //callback(0);
  }
}
//GetScheduleMonth
export function GetScheduleMonth(data, callback) {
  let tempDokter = [];
  if (data) {
    let schedule = data;
    let tempMetfound = [];
    if (schedule.visit_schedule.length > 0) {
      schedule.visit_schedule.map((rmhskit, index) => {
        rmhskit.doctors.map((doktr, index) => {
          if (
            tempMetfound.find(result => {
              return result.id == doktr.id;
            }) == undefined
          ) {
            tempMetfound.push(doktr);
          }
        });
        //}
      });
      callback(tempMetfound.length);
    } else {
      callback(0);
    }
  } else {
    //callback(0);
  }
}
//CHECK NO SELECT DOCTOR NOT MEET
export function CheckDokterSelect(data) {
  let tempDokter = [];
  if (data) {
    let hospital = data;
    let tempMetfound = [];
    hospital.doctors.map((doktr, index) => {
      if (
        tempMetfound.find(result => {
          return result.id == doktr.id;
        }) == undefined
      ) {
        if (doktr.schedule.length > 0) {
          tempMetfound.push(doktr);
        }
        //console.log('MEET', tempMetfound.length);
      }
    });

    if (tempMetfound.length > 0) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}
