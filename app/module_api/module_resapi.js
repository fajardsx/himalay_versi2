
import CONSTANT from "../global/Constant";
import { restlist } from "../config/restConfig";
import { callP, callP2, callG, callGwithP, callPDebug, callPClean, callGClean, callPBK, callGBK } from "../module_api/api";
import { getLocalF, dwfileconfig } from "../utils/FScontroller";
import Constant from "../global/Constant";
import { callToast } from "../global/Global";
//link server

/**
 * GET About US
 * 
 */
export function about() {

    return callGClean(CONSTANT.RESTLINK + restlist().req_about, CONSTANT.GET_HEADER());

}
/**
 * GET Contact US
 * 
 */
export function contact() {

    return callGClean(CONSTANT.RESTLINK + restlist().req_contact, CONSTANT.GET_HEADER());

}
/**
 * GET F&Q
 * 
 */
export function help() {

    return callGClean(CONSTANT.RESTLINK + restlist().req_help, CONSTANT.GET_HEADER());

}
/**
 * GET Setting
 * 
 */
export function gSetup() {

    // return callGBK(CONSTANT.RESTLINK + restlist().req_setting, CONSTANT.GET_HEADER(),"SETUP");
    var rest = CONSTANT.RESTLINK + restlist().req_setting;
    var header = CONSTANT.GET_HEADER();
    var data = data;
    var title = "SETUP";


    let didTimeOut = false;
    let jdata = data;
    let Timeout = null;
    // let jdata = JSON.stringify(data);
    console.log("rest : ", rest);
    console.log("j : ", jdata);
    try {
        return new Promise((resolve, reject) => {
            Timeout = setTimeout(() => {
                didTimeOut = true;
                callToast(title + ' Server Request Time Out');
                clearTimeout(Timeout);
                reject(new Error('Request Time Out'));
            }, 20000);
            fetch(rest, {
                method: CONSTANT.G,
                headers: header,
                //body: data
            }).then(response =>
                response.json()

            ).then(responsetext => {
                clearTimeout(Timeout);
                if (!didTimeOut) {
                    console.log('success', responsetext);
                    resolve(responsetext)
                }
            }).catch(error => {
                if (didTimeOut) return;
                clearTimeout(Timeout);
                console.log("failed", error);
                callToast(String(error));
                reject(error);

            });
        }).then(res => {
            console.log(rest + 'POST RESULTH', res);
            clearTimeout(Timeout);
            return res;
        }).catch(err => {
            console.log('Request Err', err);
            clearTimeout(Timeout);
            callToast(String(err));
        })
    } catch (err) {
        console.log('Request Err', err);
        clearTimeout(Timeout);
        callToast(String(err));
    }

}
/**
 * GET Notification
 * 
 */
export function gNotification(data) {


    return callPBK(CONSTANT.RESTLINK + restlist().notification_list, CONSTANT.GET_HEADER(), data);

}

/**
 * Update Notification
 * @param
 * {id => id notification,ap_member_id}
 */
export function updateNotification(data) {

    return callP(CONSTANT.RESTLINK + restlist().update_notification, CONSTANT.GET_HEADER(), data);

}

/**
 * LOGIN REST API
 * @param {*} username,password
 */
export function loginUser(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().login_rsa, null, data);
    // return callPBK(CONSTANT.RESTLINK + restlist().login_rsa, null, data).then(res=>{return res;});

}
/**
 * EXIT REST API
 * @param {*} user_id
 */
export function logExitUser(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().logut_rsa, null, data);

}
/**FORGET PASSWORD API
 * 
 * @param{username}
 */
export function forgetPassUser(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().forgpass_rsa, CONSTANT.GET_HEADER(), data);

}
/**FORGET PASSWORD API
 * 
 * @param{code,type}
 */
export function homerest(data) {


    return callPBK(CONSTANT.RESTLINK + restlist().req_home, CONSTANT.GET_HEADER(), data);

}


/**get profil API 
 * 
 * @param{id}
 */
export function profile(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().req_profile, CONSTANT.GET_HEADER(), data);

}
/**update profil API 
 * 
 * @param{id,name,jabatan/posisi}
 */
export function update(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().req_update, CONSTANT.GET_HEADER(), data);

}
/**update photo profil API 
 * 
 * @param{id,name,jabatan/posisi}
 */
export function updatePhoto(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().req_photo, CONSTANT.GET_HEADER(), data);

}
/**HELP
 * 
 * @param{}
 */
export function sendhelp(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().req_help, CONSTANT.GET_HEADER(), data);

}
/**CHANGE PASSWORD
 * 
 * @param{id  ,old_password  ,new_password ,attachment,subject}
 */
export function sendPass(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().change_pass, CONSTANT.GET_HEADER(), data);

}


/**LOG SHARE FAVOTIRE
 * 
 * @param{ap_member_id  ,item_id}
 */
export function reqShare(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().req_share, CONSTANT.GET_HEADER(), data);

}
/**SEARCH
 * 
 * @param{keyword}
 */
export function sendSearch(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().search, CONSTANT.GET_HEADER(), data);

}

/////////////Himalaya///////////////////////////
/**REQ SCHEDULE
 * 
 * @param{keyword}
 */
export function reqSchedule(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().req_schdule, CONSTANT.GET_HEADER(), data);

}
/**REQ FORCE SCHEDULE
 * 
 * @param{keyword}
 */
export function reqSchedule_FORCE(data) {

    return callP(CONSTANT.RESTLINK + restlist().req_schdule, CONSTANT.GET_HEADER(), data);

}
/**REQ SCHEDULE
 * 
 * @param{keyword}
 */
export function sendSchedule(data) {

    //return callPBK(CONSTANT.RESTLINK + restlist().set_schdule, CONSTANT.GET_HEADER(), data);
    var rest = CONSTANT.RESTLINK + restlist().set_schdule;
    // var header;
    var data = data;
    var title = "SEND SET SCHEDULE";


    let didTimeOut = false;
    let jdata = data;
    // let jdata = JSON.stringify(data);
    let Timeout = null;
    console.log("REST_API : ", rest);
    console.log("j : ", jdata);

    return new Promise((resolve, reject) => {
        Timeout = setTimeout(() => {
            didTimeOut = true;
            callToast(title + ' Server Request Time Out')
            clearTimeout(Timeout);
            reject(new Error('Request Time Out'));
        }, CONSTANT.TIME_OUT);

        fetch(rest, {
            method: CONSTANT.P,
            // headers: header,
            body: data
        }).then(response =>
            response.json()

        ).then(responsetext => {

            if (!didTimeOut) {
                console.log('success', responsetext);
                clearTimeout(Timeout);
                resolve(responsetext)
            }
        }).catch(error => {

            if (didTimeOut) return;
            clearTimeout(Timeout);
            console.log("failed", error);
            callToast(String(error));
            reject(error);

        });
    }).then(res => {
        console.log(rest + 'POST RESULTH', res);
        clearTimeout(Timeout);
        return res;
    }).catch(err => {
        console.log('Request Err sendSchedule', err);
        clearTimeout(Timeout);
        callToast(String(err));
    })

}
/**RESULT SCHEDULE
 * 
 * @param{keyword}
 */
export function resultSchedule(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().result_schdule, CONSTANT.GET_HEADER(), data);

}
/**UNSET SCHEDULE
 * 
 * @param{keyword}
 */
export function unsetSchedule(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().unset_schdule, CONSTANT.GET_HEADER(), data);

}
/**REQ EXPENDS
 * 
 * @param{user_id : [sales id]
doctors_id : id docter
setdate : datetime
amount : numeric
purpose : string
photo: picture}
 */
export function sendExepense(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().req_expense, CONSTANT.GET_HEADER(), data);

}
/**REQ ATTEND
 * 
 * @param{keyword}
 */
export function sendAttend(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().req_attend, CONSTANT.GET_HEADER(), data);

}
/**REQ ATTEND SYNC
 * 
 * @param{keyword}
 */
export function sendAttend_SYN(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().req_attend_sync, CONSTANT.GET_HEADER(), data);

}
/**REQ LIST EXPENDES
 * 
 * @param{keyword}
 */
export function getListExpenses(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().expenselist, CONSTANT.GET_HEADER(), data);

}
/**GET DOCTER
 * 
 * @param{user_id,
doctors_id}
 */
export function getDokters() {

    return callGBK(CONSTANT.RESTLINK + restlist().get_dokters, CONSTANT.GET_HEADER());

}
/**GET DETAIL DOCTER
 * 
 * @param{}
 */
export function getDetailDokters(data) {

    //return callPBK(CONSTANT.RESTLINK + restlist().doktordetail, CONSTANT.GET_HEADER(),data,"DETAIL DOKTER");
    var rest = CONSTANT.RESTLINK + restlist().doktordetail;
    // var header;
    var data = data;
    var title = "DETAIL DOKTER";


    let didTimeOut = false;
    let jdata = data;
    // let jdata = JSON.stringify(data);
    let Timeout = null;
    console.log("REST_API : ", rest);
    console.log("j : ", jdata);

    return new Promise((resolve, reject) => {
        Timeout = setTimeout(() => {
            didTimeOut = true;
            callToast(title + ' Server Request Time Out')
            clearTimeout(Timeout);
            reject(new Error('Request Time Out'));
        }, CONSTANT.TIME_OUT);

        fetch(rest, {
            method: CONSTANT.P,
            // headers: header,
            body: data
        }).then(response =>
            response.json()

        ).then(responsetext => {

            if (!didTimeOut) {
                console.log('success', responsetext);
                clearTimeout(Timeout);
                resolve(responsetext)
            }
        }).catch(error => {

            if (didTimeOut) return;
            clearTimeout(Timeout);
            console.log("failed", error);
            callToast(String(error));
            reject(error);

        });
    }).then(res => {
        console.log(rest + 'POST RESULTH', res);
        clearTimeout(Timeout);
        return res;
    }).catch(err => {
        console.log('Request Err', err);
        clearTimeout(Timeout);
        callToast(String(err));
        return false;
    })

}
/**SEND LOCATION USER
 * 
 * @param{'user_id,coordinate{lat,lng}}
 */
export function sendLocation(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().send_location, CONSTANT.GET_HEADER(), data);

}
/**LIST LOCATION USER
 * 
 * @param{'parameter :
cms_users_id : 2
setdate : Y-m-d}
 */
export function listLocation(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().list_location, CONSTANT.GET_HEADER(), data);

}

/**GET REVERES LOC USER
 * 
 * @param{'user_id,coordinate{lat,lng}}
 */
export function getReveresGEO(data) {

    //GET https://eu1.locationiq.com/v1/reverse.php?key=YOUR_PRIVATE_TOKEN&lat=LATITUDE&lon=LONGITUDE&format=json
    return callP("https://eu1.locationiq.com/v1/reverse.php?key=" + Constant.TOKET_LOCATIONIQ + "&lat=" + data.lat + "&lon=" + data.lng + "&format=json", null);

}

/**SEND LOCATION USER
 * 
 * @param{user_id,player_id}
 */
export function initSignal(data) {

    return callPBK(CONSTANT.RESTLINK + restlist().oneInit, CONSTANT.GET_HEADER(), data);

}
/**SEND SCHEDULE RESULT 
 * 
 * @param{schedule_date
cms_users_id : 2
doctors_id : id docter
signature : true
feedback : true
feedback_sales : string
e_detailings_name :
json_result : json}
 */
export function resultScheduleDokter(data) {

    //return callPBK(CONSTANT.RESTLINK + restlist().schedule_result, CONSTANT.GET_HEADER(),data);
    var rest = CONSTANT.RESTLINK + restlist().schedule_result;
    // var header;
    var data = data;
    var title = "SEND SCHEDULE RESULT ";


    let didTimeOut = false;
    let jdata = data;
    // let jdata = JSON.stringify(data);
    let Timeout = null;
    console.log("REST_API : ", rest);
    console.log("j : ", jdata);

    return new Promise((resolve, reject) => {
        Timeout = setTimeout(() => {
            didTimeOut = true;
            callToast(title + ' Server Request Time Out')
            clearTimeout(Timeout);
            reject(new Error('Request Time Out'));
        }, CONSTANT.TIME_OUT);

        fetch(rest, {
            method: CONSTANT.P,
            // headers: header,
            body: data
        }).then(response =>
            response.json()

        ).then(responsetext => {

            if (!didTimeOut) {
                console.log('success', responsetext);
                clearTimeout(Timeout);
                resolve(responsetext)
            }
        }).catch(error => {

            if (didTimeOut) return;
            clearTimeout(Timeout);
            console.log("failed", error);
            callToast(String(error));
            reject(error);

        });
    }).then(res => {
        console.log(rest + 'POST RESULTH', res);
        clearTimeout(Timeout);
        return res;
    }).catch(err => {
        console.log('Request Err', err);
        clearTimeout(Timeout);
        callToast(String(err));
        return false;
    })

}
/**SEND SCHEDULE PHOTO RESULT
 *
 * @param{
schedule_id
picture :
type : photo/signature/feedback}
 */
export function photoSchedule(data) {
    return callP2(CONSTANT.RESTLINK + restlist().schedule_photo, CONSTANT.GET_HEADER2(), data);
}