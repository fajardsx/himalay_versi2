import React from 'react'

import KEYS from './utils/keyAsync';
import { addLocal, delLocal, getLocal, updateLocal, _sendSubmitPhoto, formateFullDateNumber, getListTarget, getListTargetBK, _sendSignal, _sendAtten, _sendSelectDokter, _sendExpends, _sendLocation, _sendResulthMeetDoktor, callToast, _sendAttenabsen, callAlert, _sync_remove, SaveSyncFoto, SYNCLoc_CORE_SET} from '../../global/Global';
import Constant from '../../global/Constant';
import { getPdfFile, dwFilePdf } from '../../utils/FScontroller';
import user from '../../global/user';
import DATA_SCHEDULE from '../../db/dataScheduleManager';

/*
->Attend

->Set_Dector

->Schedule_resulth

->Expenses

->History


*/
//IMPORTANT


export async function SYNCLoc(action,key,data=null) {
   
    //console.log(key+"dataSYNCloc",data)
    //console.log("key", key)
    if(action == KEYS.KEY_G){
         return await getLocal(key).then(res => {
             if (key == KEYS.KEY_SCHEDULE){
                // console.log("GET", res)
             }
          
            if (res == undefined || res == null) {
                return null;
            } else {
                return res;
            }
        })
    } else if (action == KEYS.KEY_D) {
        //console.log("DELETE", key)
        return await delLocal(key).then(res => {
            if (key == KEYS.KEY_SCHEDULE) {
               // console.log("DELETE", res)
            }
            return res;
        });
    } else if (action == KEYS.KEY_A) {
        if (data == null) {
            return;
        }
       // console.log("ADD", key)
        return await addLocal(key, data).then(res => {
            if (key == KEYS.KEY_SCHEDULE) {
                //console.log("ADD", data)
            }
            return res;
        });
      
    } else if (action == KEYS.KEY_U) {
       
        if (data == null) {
            return;
        }
        //console.log("UPDATE", key)
        return await updateLocal(key, data).then(res=>{
            if (key == KEYS.KEY_SCHEDULE) {
                //console.log("UPDATE", data)
            }
            return res;
        });
      
    }
}

//Resulth photo from submit doctor after edetailing
export async function Sync_Photo_Resulth(data) {
   // console.log('send',data)
    return await SYNCLoc(KEYS.KEY_G,KEYS.KEY_MEETDOCTOR_PHOTO).then(res=>{

        if (res == false || res == undefined){
            let dataObject = [];
            data.map((datas, index) => {
                datas.id = index;
                dataObject.push(datas);

            })
            return SYNCLoc(KEYS.KEY_A, KEYS.KEY_MEETDOCTOR_PHOTO, dataObject).then(()=>{
                return true;
            })
        }else{
            //console.log(res);
            let dataObject = res;
            data.map((datas,index)=>{
                datas.id = dataObject[dataObject.length-1].id + index;
                dataObject.push(datas);
               
            })
            return SYNCLoc(KEYS.KEY_U, KEYS.KEY_MEETDOCTOR_PHOTO, res).then(()=>{
                return true;
            });
            //console.log('found', res);
         
        }
    })
}
//SYNC first in first out
/*
    statement
    let data={
        id:0,
        type:types_service,
        date:datenow,
        data:dataObject,
    }
*/
export async function F_I_F_O_GLOBAL_LOC(data) {
    //console.log("send data", data)//KEYS.KEY_NAME_SYNC
    if (data.map==undefined){
        data = [data];
    }
    return await SYNCLoc(KEYS.KEY_G, KEYS.KEY_NAME_SYNC).then(res => {
        //console.log("FIFO ",res);
        if (res == false || res == undefined || res == null) {
            let dataObject = [];
            data.map((datas, index) => {
                datas.id = index;
                datas.date = formateFullDateNumber(Date.now(), "YYYY-MMMM-DD HH:mm")
                dataObject.push(datas);
            })
            return SYNCLoc(KEYS.KEY_A, KEYS.KEY_NAME_SYNC, dataObject).then(res => {
                return res;
            });
        } else {
           // console.log(res);
            let dataObject = res;
            data.map((datas, index) => {
                datas.id = dataObject.length + index;
                datas.date = formateFullDateNumber(Date.now(), "YYYY-MMMM-DD HH:mm")
                dataObject.push(datas);
            })
            return SYNCLoc(KEYS.KEY_U, KEYS.KEY_NAME_SYNC, res).then(res=>{
                return res;
            });
           
           // console.log('found', res);
        }
    })
}
//OFFLINE MODE
export async function LEMARI_GLOBAL_LOC(data, _KEYS,sctionContinue=false) {
    //console.log("send data", data)
   // console.log("send data", _KEYS)
     SYNCLoc(KEYS.KEY_G,_KEYS,data).then(res => {
        //console.log("LEMARI ",res)
         if (res == false || res == undefined) {
            let dataObject = [];
            data.map((datas, index) => {
                datas.idsave = index;
                datas.date = formateFullDateNumber(Date.now(), "YYYY-MMMM-DD HH:mm")
                dataObject.push(datas);
            })
            SYNCLoc(KEYS.KEY_A, _KEYS, dataObject);
        } else {
           // console.log('update',res);
            if (sctionContinue == true){
                let dataObject = res;
                data.map((datas, index) => {
                    datas.idsave = dataObject.length + index;
                    datas.date = formateFullDateNumber(Date.now(), "YYYY-MMMM-DD HH:mm")
                    dataObject.push(datas);
                })
                SYNCLoc(KEYS.KEY_U, _KEYS, res);
            }else{
                let dataObject = [];
                data.map((datas, index) => {
                    datas.idsave = index;
                    datas.date = formateFullDateNumber(Date.now(),"YYYY-MMMM-DD HH:mm")
                    dataObject.push(datas);
                })
                SYNCLoc(KEYS.KEY_U, _KEYS, dataObject);
            }
        }
    });
}
//OFFLINE MODE SELECT
export async function LEMARI_GLOBAL_SELECT(data,sctionContinue = false) {
    let _KEYS = KEYS.KEY_SELECTTARGET
    console.log("send data select", data)
    console.log("send data select", _KEYS)
    console.log("send data select sctionContinue ", sctionContinue);
    return result = await SYNCLoc(KEYS.KEY_G, _KEYS, data).then(res => {
        console.log("LEMARI KEY_SELECTTARGET", res)
        if (res == false || res == undefined) {
            let dataObject = [];
            data.map((datas, index) => {
                datas.idsave = index;
                datas.date = formateFullDateNumber(Date.now(), "YYYY-MM-DD HH:mm")
                dataObject.push(datas);
            })
            SYNCLoc(KEYS.KEY_A, _KEYS, dataObject);
        } else {
           
            if (sctionContinue == true) {
                console.log('update SELECT continue', res);
                let dataObject = res;
                dataObject.map((dataRes, index) => {

                    //datas.idsave = dataObject.length + index;
                    dataRes.date = formateFullDateNumber(Date.now(), "YYYY-MM-DD HH:mm")
                   // dataObject.push(datas);
                    //dataRes.datas.concat(data.datas);
                    Array.prototype.push.apply(dataRes.datas,data[0].datas);
                    console.log(data[0].datas);
                    console.log(dataRes.datas);
                })
                console.log('select dokter', dataObject);
                SYNCLoc(KEYS.KEY_U, _KEYS, dataObject);
            } else {
                console.log('update SELECT renew', res);
                let dataObject = [];
                data.map((datas, index) => {
                    datas.idsave = index;
                    datas.date = formateFullDateNumber(Date.now(), "YYYY-MM-DD HH:mm")
                    dataObject.push(datas);
                })
                SYNCLoc(KEYS.KEY_U, _KEYS, dataObject);
            }
        }
    });
}
//OFFLINE MODE DOCKTER DETAIL
export async function LEMARI_GLOBAL_DETAIL(data) {
    let _KEYS = KEYS.KEY_DETAILDOCTOR
   // console.log("send data", data)
    //console.log("key ", _KEYS)
    SYNCLoc(KEYS.KEY_G, _KEYS, data).then(res => {
        //console.log("LEMARI ", res)
        if (res == false || res == undefined) {
            let dataObject = [];
            data.map((datas, index) => {
                dataObject.push(datas);
            })
            SYNCLoc(KEYS.KEY_A, _KEYS, dataObject);
        } else {
            //console.log('check ', res);
            let found = -1;
            res.map((datadok, index) => {
                if (datadok.detail.id == data[0].detail.id){
                    //console.log('found ', datadok);
                    found = index;
                }
             });

             if(found>-1){
                 //console.log('update ', res);
                 res[found]=data[0];
                 SYNCLoc(KEYS.KEY_U, _KEYS, res);
             }else{
                 //console.log('add ', res);
                 res.push(data[0]);
                 SYNCLoc(KEYS.KEY_U, _KEYS, res);
             }

        }
    });
}
export async function LEMARI_GLOBAL_DETAIL_GET(data) {
    let _KEYS = KEYS.KEY_DETAILDOCTOR
    //console.log("send data", data)
    //console.log("key ", _KEYS)
    return await SYNCLoc(KEYS.KEY_G, _KEYS).then(res => {
        //console.log("LEMARI_GLOBAL_DETAIL_GET ", res)
        if (res) {
            //console.log('check ', res);
            let found = -1;
            res.map((datadok, index) => {
                if (datadok.detail.id == data) {
                   // console.log('found ', datadok);
                    found = index;
                }
            });

            if (found > -1) {
               // console.log('update ', res);
                return res[found]
            } 
        }
    });
}
export async function LEMARI_GLOBAL_DETAIL_GET_ALL() {
    let _KEYS = KEYS.KEY_DETAILDOCTOR
    return await SYNCLoc(KEYS.KEY_G, _KEYS).then(res => {
        
        if (res) {
            return res
        }
    });
}
export function LEMARI_GLOBAL_DETAIL_DEL() {
    SYNCLoc(KEYS.KEY_D, KEYS.KEY_DETAILDOCTOR);
}
//load debug
export function LEMARI_GLOBAL_LOCDEBUG(data, _KEYS, sctionContinue = false) {
    //console.log("send data debug", data)
    SYNCLoc(KEYS.KEY_G, _KEYS).then(res => {
        //console.log("LEMARI ")
    });
}
export async function LEMARI_GLOBAL_LOAD(_KEYS) {
    return await SYNCLoc(KEYS.KEY_G, _KEYS).then(res => {
       // console.log("LEMARI ", res)
       if(res) {
            return res;
        }
    })
}
//Show all Sync
export function showwFIFO() {
    SYNCLoc(KEYS.KEY_G, KEYS.KEY_NAME_SYNC).then(RES => {
        console.log("list small sync ", RES);
    });
}
//INIT SYNC

//exe sync small task
export function GetSamllSync(){

}
export function StartExecuteFIFO(_callback = null, indexSync = 0){
    if (Constant.SYNC_MODE == true) {
        console.log("Execute_FIFO Sync On Progress")
        callToast("Sync on progress");
        return 
    }
   
   
    console.log('Start SYNC Execute');
    SYNCLoc(KEYS.KEY_G, KEYS.KEY_NAME_SYNC).then(RES => {
        console.log("small sync ", RES);
        if (RES != null && RES.length>0){
            callToast("sync..");
            Constant.SYNC_MODE = true;
            Execute_FIFO(_callback, indexSync, RES);
        }else{
            callToast("No data need sync")
            Constant.SYNC_MODE = false;
            if(_callback){
                _callback(true);
            }
        }
    });
    
}

export function Execute_FIFO(_callback=null,indexSync=0,RES=null) {
    
  
        console.log("small sync ",RES);
       
        //execute
        if(RES){
            callToast("Sync.." + RES.length)
            console.log("Sync.." + RES.length)
            if (RES.length > indexSync){

                RES.map((res, index) => {
                    if (index == indexSync) {
                        console.log(index + " small sync type ", res.type);
                        console.log(index + " small sync type ", res.key);
                        let _type = "";
                        if (res.type){
                            _type = res.type;
                        }else if(res.key){
                            _type = res.key;
                        }
                        console.log('SYNC', _type)
                        //callToast(_type);
                        switch (_type) {
                            
                            case KEYS.KEY_ONESIGNALTARGET:
                                _sendSignal(res.data).then(res => {
                                    console.log('result send signal', res)
                                    //callAlert("KEY_ONESIGNALTARGET", res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        if (res.api_message == 'This account still online, please logout first') {
                                            console.log('delete')
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        }else{
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        }
                                        
                                    }
                                });
                                break;
                            case KEYS.KEY_ATTEND:
                                _sendAttenabsen(res.data).then(res => {
                                    console.log('result atten', res)
                                    //callAlert("KEY_ATTEND",res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        
                                        if (res == false) {
                                            console.log('delete')
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        } else {
                                            FIFO_CONTINUE(_callback, indexSync, RES)
                                        }
                                    }
                                });
                                break;
                            case KEYS.KEY_ATTEND_RESET:
                                _sendAtten(res.data).then(res => {
                                    console.log('result atten', res)
                                    //callAlert("KEY_ATTEND_RESET", res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        
                                        if (res == false) {
                                            console.log('delete')
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        } else {
                                            FIFO_CONTINUE(_callback, indexSync, RES)
                                        }
                                    }
                                });
                                break;
                            case KEYS.KEY_SELECTTARGET:
                                _sendSelectDokter(res.data).then(res => {
                                    console.log('result select doktor', res)
                                    //callAlert("KEY_SELECTTARGET", res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        if (res == false) {
                                            console.log('delete')
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        } else {
                                            FIFO_CONTINUE(_callback, indexSync, RES)
                                        }
                                      
                                    }
                                });
                                break;
                         
                            case KEYS.KEY_SEND_LOCATION:
                                _sendLocation(res.data).then(res => {
                                    console.log('result send location', res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        FIFO_CONTINUE(_callback, indexSync, RES)
                                    }
                                }).then(res=>{
                                    console.log('result send location2', res)
                                });
                                break;
                            case KEYS.KEY_MEETDOCTOR_RESULTH:
                                let _photos = res.data.photos;
                                _sendResulthMeetDoktor(res.data).then(res => {
                                    console.log('result send meet doktor', res);
                                    console.log('PHOTO ', _photos);
                                   // callAlert("KEY_MEETDOCTOR_RESULTH", res)
                                  if(res){
                                      if (res.result == true) {
                                          SaveSyncFoto(_photos, res.msg.data.results.schedules_id,function(){
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        });
                                       
                                        } else {
                                          if (
                                              res.msg ==
                                              "Feedback Sales has already inserted" ||
                                              res.msg ==
                                              "Schedule was invalid"
                                          ) {
                                              _sync_remove(
                                                  RES,
                                                  indexSync
                                              ).then(
                                                  res => {
                                                      FIFO_SUCCESS(
                                                          _callback,
                                                          res
                                                      );
                                                  }
                                              );
                                          } else {
                                              FIFO_CONTINUE(
                                                  _callback,
                                                  indexSync,
                                                  RES
                                              );
                                          }
                                        
                                        /*if (res == undefined) {
                                            ////RES.pop();
                                            RES.splice(indexSync, 1);
                                            FIFO_SUCCESS(RES)
                                        } else if (res == false) {
                                            ////RES.pop();
                                            RES.splice(indexSync, 1);
                                            FIFO_SUCCESS(RES)
                                        } else {
                                            FIFO_CONTINUE(indexSync)
                                        }*/
                                    }
                                  }
                                   
                                });
                                break;
                            case KEYS.KEY_MEETDOCTOR_PHOTO:
                               // FIFO_CONTINUE(indexSync);
                                console.log("upload photo " + KEYS.KEY_MEETDOCTOR_PHOTO, res);
                                _sendSubmitPhoto_sync(res).then(res => {
                                    console.log("upload photo " + KEYS.KEY_MEETDOCTOR_PHOTO, res);
                                   // callAlert("KEY_MEETDOCTOR_PHOTO", res)
                                  
                                    if (res == true) {
                                            //RES.splice(indexSync, 1);  
                                             _sync_remove(RES,indexSync).then(res=>{
                                               console.log("SYNC..",res);
                                                 FIFO_SUCCESS(_callback, res)
                                        });
                                    } else if (res == false) {
                                        FIFO_CONTINUE(_callback, indexSync, RES)
                                    }
                                })
                              
                                break;
                            default:
                                FIFO_CONTINUE(_callback,indexSync,RES);
                                break;
                        }
                    }
                    //
                })
            }else{
                if (RES.length==0){
                    callToast("SYNC DONE");
                }
                Constant.SYNC_MODE = false;
                if (_callback){
                    _callback(true);
                }
            }
           //
        }
}
export function FIFO_SUCCESS(_callback=null,data) {
    console.log("FIFO SUCCESS",data);
    SYNCLoc(KEYS.KEY_U, KEYS.KEY_NAME_SYNC, data).then(res=>{
        console.log("FIFO CONTINUE", res);
        if (res){
            if (data.length == 0) {
                callToast("SYNC DONE");
                Constant.SYNC_MODE = false;
                if (_callback) {
                    _callback(true);
                }
            }else{
                Execute_FIFO(_callback, 0, data);
            }
            
        }
    })
  
}
export function FIFO_CONTINUE(_callback=null,indexs,data) {
    console.log("FIFO CONTINUE");
 
    Execute_FIFO(_callback, indexs + 1, data);

}
//EXE sync photo
export function Execute_Sync_Photo_Resulth(intparent) {
    let currentParent = intparent;
   // let current = intchild;
    let maxParent =0;
    let maxChild =0;
    SYNCLoc(KEYS.KEY_G, KEYS.KEY_MEETDOCTOR_PHOTO).then(res=>{
        if(res){
            console.log("execute photo ",res)
           console.log("current photo ", res[currentParent])
            let schedule_id = 0;
            let _type = "";
            let _picture = null;
            let _status = 0;
            
            maxChild = res.length;
            if (res[currentParent]){
                if (res[currentParent].data.dataPhoto == null || res[currentParent].data.dataPhoto == undefined){
                    if (currentParent < res.length - 1) {
                        currentParent += 1;
                        Execute_Sync_Photo_Resulth(currentParent);
                    }
                    return;
                }
                if (res[currentParent].data.dataPhoto.path == null || res[currentParent].data.dataPhoto.path == undefined) {
                    if (currentParent < res.length - 1) {
                        currentParent += 1;
                        Execute_Sync_Photo_Resulth(currentParent);
                    }
                    return;
                }
                if (res[currentParent].data.dataPhoto.type == null || res[currentParent].data.dataPhoto.type == undefined) {
                    if (currentParent < res.length - 1) {
                        currentParent += 1;
                        Execute_Sync_Photo_Resulth(currentParent);
                    }
                    return;
                }
                if (res[currentParent].data.dataPhoto.fileName == null || res[currentParent].data.dataPhoto.fileName == undefined) {
                    res[currentParent].data.dataPhoto.fileName = "images_" + res[currentParent].data.dataPhoto.type+"_" + user.getUsId() + formateFullDateNumber(Date.now()) + ".png";
                }
                
                schedule_id = res[currentParent].id_submit;
                _type = res[currentParent].data.type;



                let _uri="";
                _uri = "file://" + res[currentParent].data.dataPhoto.path

                /*if(res[currentParent].data.dataPhoto!=null){
                    _uri = "file://" + res[currentParent].data.dataPhoto.path
                }else{
                    if (currentParent < res.length - 1) {
                        currentParent += 1;
                        Execute_Sync_Photo_Resulth(currentParent);
                    }
                }*/

                _picture = {
                    uri:_uri,
                    type: res[currentParent].data.dataPhoto.type,
                    name: res[currentParent].data.dataPhoto.fileName
                };
                let form = new FormData();
                form.append("schedules_id", schedule_id);
                form.append("type", _type);
                form.append("picture", _picture);
                console.log(form)
                _sendSubmitPhoto(form).then(uploadres => {
                    console.log("upload photo",uploadres);
                    //if (uploadres != false) {
                      //  if (uploadres.api_message == "success") {
                            res.splice(0, 1);
                            SYNCLoc(KEYS.KEY_U, KEYS.KEY_MEETDOCTOR_PHOTO, res).then(result=>{
                                if(result){
                                    if (res.length > 0) {
                                        Execute_Sync_Photo_Resulth(0);
                                    }
                                }
                            });
                           
                        //} else {
                          //  if (currentParent < res.length-1) {
                            //    currentParent += 1;
                              //  Execute_Sync_Photo_Resulth(currentParent);
                           // }
                        //}
                    //} else if (uploadres == false) {
                      //  if (currentParent < res.length-1) {
                        //    currentParent += 1;
                          //  Execute_Sync_Photo_Resulth(currentParent);
                        //}
                        //Execute_Sync_Photo_Resulth(0);
                    //}
                })
            }
           
        }else{
            console.log("not found")
        }
        
    })
}
//send photo
export async function _sendSubmitPhoto_sync(res){
    console.log("execute photo ", res);
    let schedule_id = 0;
    let _type = "";
    let _picture = null;

    schedule_id = res.id_submit;
    _type = res.data.type;
    let _uri = "";


    if (res.data.dataPhoto != null) {
         if (res.data.dataPhoto.type == null || res.data.dataPhoto.type == undefined){
            res.data.dataPhoto.type = 'image/png'
        }
        if (res.data.dataPhoto.path == null || res.data.dataPhoto.path == undefined){
            return false;
        }
       
        if (res.data.dataPhoto.fileName == null || res.data.dataPhoto.fileName == undefined){
            res.data.dataPhoto.fileName = "images_" + _type+"_"+user.getUsId() + formateFullDateNumber(Date.now()) + ".png";
        }
        _uri = "file://" + res.data.dataPhoto.path

        _picture = {
            uri: _uri,
            type: res.data.dataPhoto.type,
            name: res.data.dataPhoto.fileName
        };
        let form = new FormData();
        form.append("schedules_id", schedule_id);
        form.append("type", _type);
        form.append("picture", _picture);
        console.log(form);
        return await _sendSubmitPhoto(form).then(uploadres => {
            console.log("upload photo", uploadres);
            if (uploadres != false) {
                if (uploadres.api_message){
                     //&& uploadres.api_message == "success") {
                    callToast(uploadres.api_message);
                   return true;
                } else {
                    return false;
                }
            } else if (uploadres == false) {
                return false;
               
            }
        })
    }else{
        return false;
    }

    
    
    /*return await _sendSubmitPhoto(form).then(uploadres => {
        console.log("upload photo", uploadres);
        if (uploadres != false) {
            if (uploadres.api_message == "success") {
                return true;
            } else {
                return false;
            }
        } else if (uploadres == false) {
            return false;
        }
    })*/
}
//clean sync
export async function clean_sync_all() {
    return await SYNCLoc(KEYS.KEY_D, KEYS.KEY_ATTEND).then(()=>{
        SYNCLoc(KEYS.KEY_D, KEYS.KEY_SELECTTARGET);
        console.log("clear", KEYS.KEY_SELECTTARGET);
    }).then(()=>{
        SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE);
        console.log("clear", KEYS.KEY_SCHEDULE);
    }).then(()=>{
        SYNCLoc(KEYS.KEY_D, KEYS.KEY_MEETDOCTOR_RESULTH);
        console.log("clear", KEYS.KEY_MEETDOCTOR_RESULTH);
    }).then(()=>{
        SYNCLoc(KEYS.KEY_D, KEYS.KEY_MEETDOCTOR_PHOTO);
        
    }).then(()=>{
        DATA_SCHEDULE.updateDataSchedule(null);
        return true;
    });
     
}  
    //SYNCLoc(KEYS.KEY_D, KEYS.KEY_NAME_SYNC);
  //  await SYNCLoc(KEYS.KEY_D, KEYS.KEY_EXPENSES);
   
//clean sync
export async function clean_Dokter_all() {
    await SYNCLoc(KEYS.KEY_D, KEYS.KEY_ATTEND);
    //SYNCLoc(KEYS.KEY_D, KEYS.KEY_NAME_SYNC);
    await SYNCLoc(KEYS.KEY_D, KEYS.KEY_MEETDOCTOR_RESULTH);
    await SYNCLoc(KEYS.KEY_D, KEYS.KEY_MEETDOCTOR_PHOTO)
    await SYNCLoc(KEYS.KEY_D, KEYS.KEY_SELECTTARGET);
    await SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE);
}
//clean sync
export async function clean_sync_session() {
    
   return await SYNCLoc(KEYS.KEY_D, KEYS.KEY_SELECTTARGET);
   
}
//SAVE SELECT DOKTOR
export async function TargetSelect(){
    let dataSchedule = null;
    let listdoktor = null;
    return await DATA_SCHEDULE.getDataSchedule().then(res=>{
        console.log('targerselect res schedule', res)
        if(res !=null || res != undefined){
          
            dataSchedule = res;
            let attenIN = user.getUserAttend().in != null ? user.getUserAttend().in.length:0
            let attenOut = user.getUserAttend().out != null ? user.getUserAttend().out.length:0
            if (attenIN > 0 || attenOut > 0){
                return SYNCLoc(KEYS.KEY_G, KEYS.KEY_SELECTTARGET).then(res => {
                    console.log('targerselect res select', res);
                    if (res != null || res != undefined) {
                        let now = formateFullDateNumber(Date.now(), "YYYY-MM-DD");
                        let loc = res[0].date_select;
                        if (now == loc) {
                            // console.log('schedule', dataSchedule);
                            listdoktor = res[0].datas;
                            let _found = getListTargetBK(dataSchedule.visit_schedule, listdoktor)
                            console.log('found', _found);
                            dataSchedule.set_schedule = _found;
                            console.log('dataSchedule ', dataSchedule);
                           // SYNCLoc(KEYS.KEY_U, KEYS.KEY_SCHEDULE, [dataSchedule])
                            DATA_SCHEDULE.updateDataSchedule(dataSchedule);
                            console.log("SAVE KEY_SCHEDULE ", dataSchedule);
                            console.log("targetSelect")
                            return SYNCLoc_CORE_SET(dataSchedule).then(res=>{
                                return _found;
                            })
                           
                        } else {
                            console.log('expiret');
                            return [];
                        }
                    } else {
                        console.log('dataSchedule expiret');
                        return [];
                    }
                })
            }else{
                 SYNCLoc(KEYS.KEY_D, KEYS.KEY_SELECTTARGET)
                return null;
            }
            
        }
    });


    /*return await SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res=>{
        console.log('targerselect res schedule', res)
        if(res !=null || res != undefined){
            if(res[0] == null){
                return;
            }
            dataSchedule = res[0];
            let attenIN = user.getUserAttend().in != null ? user.getUserAttend().in.length:0
            let attenOut = user.getUserAttend().out != null ? user.getUserAttend().out.length:0
            if (attenIN > 0 || attenOut > 0){
                return SYNCLoc(KEYS.KEY_G, KEYS.KEY_SELECTTARGET).then(res => {
                    console.log('targerselect res select', res);
                    if (res != null || res != undefined) {
                        let now = formateFullDateNumber(Date.now(), "YYYY-MM-DD");
                        let loc = res[0].date_select;
                        if (now == loc) {
                            // console.log('schedule', dataSchedule);
                            listdoktor = res[0].datas;
                            let _found = getListTargetBK(dataSchedule.visit_schedule, listdoktor)
                            console.log('found', _found);
                            dataSchedule.set_schedule = _found;
                            console.log('dataSchedule ', dataSchedule);
                           // SYNCLoc(KEYS.KEY_U, KEYS.KEY_SCHEDULE, [dataSchedule])
                            SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE).then(res => {
                                if (res) {
                                    SYNCLoc(KEYS.KEY_A, KEYS.KEY_SCHEDULE, [dataSchedule]).then(() => {
                                        console.log('dataSchedule ', dataSchedule);
                                    });

                                    // _state(res);
                                }

                            });
                            return _found;
                        } else {
                            console.log('expiret');
                            return [];
                        }
                    } else {
                        console.log('dataSchedule expiret');
                        return [];
                    }
                })
            }else{
                 SYNCLoc(KEYS.KEY_D, KEYS.KEY_SELECTTARGET)
                return null;
            }
            
        }
    });*/
}
//GET ID SELECT LOCAL
export function getIDSAsync(){
    let s = []; 
    getLocal(KEYS.KEY_SELECTTARGET).then(res_s => s = res_s).catch(e => Notices.results(e));
    
    console.log(s)
}
//COMPLETE MEET DOKTOR id,_data
export async function updateStatusDoktor(jdata) {
  
    //add reated at:
    jdata.updated_at = formateFullDateNumber(Date.now(),"YYYY-MM-DD HH:mm:ss");
        let dataResulth = {
            resulth:{
                status:null,
                feedback_sales:null,
            }
        }
    console.log('data submit meet doktor', jdata)
    let dataSchedule = null;
    let listdoktor = null;
    return result = await DATA_SCHEDULE.getDataSchedule().then(res => {
        console.log('update status dokter',res);
        if (res != null || res != undefined) {
            let tempdata = Object.assign([],res)
            console.log("res temp ", tempdata);
            tempdata.set_schedule.forEach((resparent, inde) => {
                let getchild = resparent.doctors.find((result) => { return result.id == jdata.doctors_id });
                if (getchild) {
                   insertDokterSchedule(getchild,jdata);
                }
            });
            tempdata.visit_schedule.forEach((resparent, inde) => {
               //console.log("location dokter ", resparent);
                let getchild = resparent.doctors.find((result) => { return result.id == jdata.doctors_id });
                if (getchild) {
                    insertDokterSchedule(getchild, jdata);
                }
            });
            let found = tempdata.list_doctor_set_this_month.find((resulth)=>{return resulth.id == jdata.doctors_id});

            if(found == undefined){
                if(jdata.status == 1){
                    tempdata.list_doctor_set_this_month.push(jdata);
                }
                
            }
            console.log("done doktor update ", tempdata);
            //let updatestart = setTimeout(() => {
            console.log("save", tempdata);
                 DATA_SCHEDULE.updateDataSchedule(tempdata);
               
                        let clone= Object.assign({},tempdata)
                    console.log("SAVE KEY_SCHEDULE ", clone);
                    console.log("UpdateStatusDoktor")
                    SYNCLoc_CORE_SET(tempdata).then(res => {
                         return res;
                    });
                 
                //clearTimeout(updatestart)
               
               
            //}, 1000);
            return true;
        }else{
            return false
        }
    });
    /*return result = await SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res => {
        console.log('update status dokter',res);
        if (res != null || res != undefined) {
            let tempdata = Object.assign([],res)
            console.log("res temp ", tempdata);
            tempdata[0].set_schedule.forEach((resparent, inde) => {
                let getchild = resparent.doctors.find((result) => { return result.id == jdata.doctors_id });
                if (getchild) {
                   insertDokterSchedule(getchild,jdata);
                }
            });
            tempdata[0].visit_schedule.forEach((resparent, inde) => {
               //console.log("location dokter ", resparent);
                let getchild = resparent.doctors.find((result) => { return result.id == jdata.doctors_id });
                if (getchild) {
                    insertDokterSchedule(getchild, jdata);
                }
            });
            let found = tempdata[0].list_doctor_set_this_month.find((resulth)=>{return resulth.id == jdata.doctors_id});

            if(found == undefined){
                if(jdata.status == 1){
                    tempdata[0].list_doctor_set_this_month.push(jdata);
                }
                
            }
            console.log("done doktor update ", tempdata);
            //let updatestart = setTimeout(() => {
                console.log("save");
                return SYNCLoc(KEYS.KEY_D, KEYS.KEY_SCHEDULE).then(()=>{
                       return SYNCLoc(KEYS.KEY_A, KEYS.KEY_SCHEDULE, tempdata).then(res => {
                            return res;
                        });
                 })
                 
                //clearTimeout(updatestart)
               
               
            //}, 1000);
            
        }else{
            return false
        }
    });*/
}
//INSERT UPDATE DOKTER
export function insertDokterSchedule(getchild,jdata) {
    console.log("doktor result", getchild);
    //console.log("doktor schedule", getchild.schedule[0]);
    //let insertData = [jdata]
    if (getchild.schedule[0] == undefined) {
        getchild['schedule'] = [];
        getchild.schedule[0] = { results: null }
        if (getchild.schedule[0].results == null) {
            console.log("doktor results update");
            getchild.schedule[0].results = jdata;
        }
    }
    else if (getchild.schedule.length > 0) {
        console.log('results ', getchild.schedule[0].results);
        if (getchild.schedule[0].results == null) {
            getchild.schedule[0].results = jdata;
        } else {
            getchild.schedule[0].results = jdata;
        }
    }
}
//GET TODAY SCHEDULE
export async function ASYNC_getScheduleToday(id) {
    return result = await DATA_SCHEDULE.getDataSchedule().then(res=>{
        console.log('SCHEDULE',res);
        if (res!=undefined){
            if (res) {
                switch (id) {
                    case KEYS.KEY_LISTSCHEDULETODAY:
                        return res.set_schedule;

                    case KEYS.KEY_LISTDOCTODAY:
                        return res.set_schedule;//res[0].list_doctor_set_today;

                    case KEYS.KEY_LISTDOCMONTH:
                        let temp = [];
                        GetAllDocterThisMonth(tem).then(() => {
                            return temp;
                        })
                      

                    case KEYS.KEY_LISTVISITSCHEDULE:
                        return res.visit_schedule;

                }
            }
        }
       
    })
    /*return result = await SYNCLoc(KEYS.KEY_G, KEYS.KEY_SCHEDULE).then(res=>{
        console.log('SCHEDULE',res);
        if (res!=undefined){
            if (res && res[0]) {
                switch (id) {
                    case KEYS.KEY_LISTSCHEDULETODAY:
                        return res[0].set_schedule;

                    case KEYS.KEY_LISTDOCTODAY:
                        return res[0].set_schedule;//res[0].list_doctor_set_today;

                    case KEYS.KEY_LISTDOCMONTH:
                        let temp = [];
                        GetAllDocterThisMonth(tem).then(() => {
                            return temp;
                        })
                      

                    case KEYS.KEY_LISTVISITSCHEDULE:
                        return res[0].visit_schedule;

                }
            }
        }
       
    })*/
}
//SAVE ATTEND
export function  updateUserAttend(data) {
    console.log('updateUserAttend', data)
    LEMARI_GLOBAL_LOAD(Constant.KEYDATA).then(res=>{
       
         console.log('updateUserAttend',res)
        if(res){
            let tempuser = Object.assign({},res);
            tempuser.profile_atten = data.attend;
            updateLocal(Constant.KEYDATA, tempuser);
            console.log('after updateUserAttend', tempuser)
            //callToast(tempuser.profile_atten)
        }
    })
}
//GET VISIT SCHEADULE
export async function getVisitSchedule() {

    return await DATA_SCHEDULE.updateDataSchedule().then(res=>{
        console.log("VisitSchedule ",res);
        if(res){
            return res;
        }
    })
    /*return await getLocal(KEYS.KEY_SCHEDULE).then(res=>{
        console.log("VisitSchedule ",res);
        if(res){
            return res[0]
        }
    })*/
}
//DOWNLOAD PDF TO LOCAL
export function grabFile(indexid=0,_callback=null) {
    LEMARI_GLOBAL_LOAD(KEYS.KEY_PDF).then(res=>{
        //console.log('file ',res)
        if (res){
            let datas = res[0];
            let paths = Constant.BASELINK + datas[indexid].filename;
            let pathname = "files" + datas[indexid].id+ ".pdf"
                getPdfFile(pathname).then(res => {
                   // console.log('pdf ready', res)
                    if (res == false) {
                        dwFilePdf(paths, pathname).then(res=>{
                            console.log('result save',res)
                            if(indexid<datas.length-1){
                                grabFile(indexid + 1, _callback);
                            }
                        })
                    }else{
                        if (indexid < datas.length-1) {
                            grabFile(indexid + 1, _callback);
                        }
                    }

                    if(indexid == datas.length-1){
                        callToast("Pdf Completed")
                        _callback(true);
                    }
                })
        }
    })
}
export function getPDFLINK(value=0) {
    LEMARI_GLOBAL_LOAD(KEYS.KEY_PDF).then(res => {
        //console.log('file KEY_PDF', res)
        if (res) {
            res[0].forEach((respdf,index)=>{
                let datas = respdf;
               // console.log('file respdf', respdf)
                //let paths = Constant.BASELINK + datas[indexid].filename;
                let pathname = "files" + respdf.id + ".pdf";
                //console.log('pathname  ', pathname)
                getPdfFile(pathname).then(respath => {
                   // console.log('pdf ready', respath)
                });
            })
        }
    });  
}
export function getSavePDF(parents) {
    LEMARI_GLOBAL_LOAD(KEYS.KEY_PDF).then(res => {
        //console.log('file KEY_PDF', res)
        let serverpdf = 0;
        let savepdf = 0;

        if (res) {
             res[0].map((respdf, index) => {
                let datas = respdf;
                serverpdf+=1;
                // console.log('file respdf', respdf)
                //let paths = Constant.BASELINK + datas[indexid].filename;
                let pathname = "files" + respdf.id + ".pdf";
                //console.log('pathname  ', pathname)
                    getPdfFile(pathname).then(respath => {
                   
                    if(respath!=false){
                        savepdf += 1;
                    }
                   parents(savepdf+" of "+serverpdf);
                });
            })
           
        }
    });
}

/*
 switch (_type) {
                            
                            case KEYS.KEY_ONESIGNALTARGET:
                                _sendSignal(res.data).then(res => {
                                    console.log('result send signal', res)
                                    //callAlert("KEY_ONESIGNALTARGET", res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        if (res.api_message == 'This account still online, please logout first') {
                                            console.log('delete')
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        }else{
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        }
                                        
                                    }
                                });
                                break;
                            case KEYS.KEY_ATTEND:
                                _sendAttenabsen(res.data).then(res => {
                                    console.log('result atten', res)
                                    //callAlert("KEY_ATTEND",res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        
                                        if (res == false) {
                                            console.log('delete')
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        } else {
                                            FIFO_CONTINUE(_callback,indexSync)
                                        }
                                    }
                                });
                                break;
                            case KEYS.KEY_ATTEND_RESET:
                                _sendAtten(res.data).then(res => {
                                    console.log('result atten', res)
                                    //callAlert("KEY_ATTEND_RESET", res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        
                                        if (res == false) {
                                            console.log('delete')
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        } else {
                                            FIFO_CONTINUE(_callback,indexSync)
                                        }
                                    }
                                });
                                break;
                            case KEYS.KEY_SELECTTARGET:
                                _sendSelectDokter(res.data).then(res => {
                                    console.log('result select doktor', res)
                                    //callAlert("KEY_SELECTTARGET", res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        if (res == false) {
                                            console.log('delete')
                                            _sync_remove(RES, indexSync).then(res => {
                                                FIFO_SUCCESS(_callback, res)
                                            });
                                        } else {
                                            FIFO_CONTINUE(_callback,indexSync)
                                        }
                                      
                                    }
                                });
                                break;
                         
                            case KEYS.KEY_SEND_LOCATION:
                                _sendLocation(res.data).then(res => {
                                    console.log('result send location', res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        FIFO_CONTINUE(_callback,indexSync)
                                    }
                                }).then(res=>{
                                    console.log('result send location2', res)
                                });
                                break;
                            case KEYS.KEY_MEETDOCTOR_RESULTH:
                                _sendResulthMeetDoktor(res.data).then(res => {
                                    console.log('result send meet doktor', res)
                                   // callAlert("KEY_MEETDOCTOR_RESULTH", res)
                                    if (res.api_message == 'success') {
                                        ////RES.pop();
                                        _sync_remove(RES, indexSync).then(res => {
                                            FIFO_SUCCESS(_callback, res)
                                        });
                                    } else {
                                        FIFO_CONTINUE(_callback,indexSync)
                                       
                                    }
                                });
                                break;
                            case KEYS.KEY_MEETDOCTOR_PHOTO:
                               // FIFO_CONTINUE(indexSync);
                                console.log("upload photo " + KEYS.KEY_MEETDOCTOR_PHOTO, res);
                                _sendSubmitPhoto_sync(res).then(res => {
                                    console.log("upload photo " + KEYS.KEY_MEETDOCTOR_PHOTO, res);
                                   // callAlert("KEY_MEETDOCTOR_PHOTO", res)
                                    if (res != false) {
                                        if (res == true) {
                                            //RES.splice(indexSync, 1);  
                                           _sync_remove(RES,indexSync).then(res=>{
                                               console.log("SYNC..",res);
                                               FIFO_SUCCESS(_callback, res)
                                           });
                                           
                                        } else {
                                            FIFO_CONTINUE(_callback,indexSync)
                                        }
                                    } else if (res == false) {
                                        FIFO_CONTINUE(_callback,indexSync)
                                    }
                                })
                              
                                break;
                            default:
                                FIFO_CONTINUE(_callback,indexSync);
                                break;
                        }
*/