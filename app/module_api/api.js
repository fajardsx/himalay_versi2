'use strict';
import React from "react";
import { Alert } from 'react-native';
import CONSTANT from '../global/Constant';
import { callAlert, callToast, callToastTop } from "../global/Global";

export function callG(rest, header) {
    console.log("connection", rest);
    console.log("header", header);
    try {
        return fetch(rest, {
            method: CONSTANT.G,
            headers: header,
        })
            .then(response => response.json())
            .then(responsetext => {
                return responsetext;
            })
            .catch(error => {
                console.log(error);
                //callToast("Failed ", error.message);
            });
    } catch (error) {
        console.log(error)
    }
}
export function callGClean(rest, header) {
    //console.log("connection", rest);
    //console.log("header", header);
    try {
        return fetch(rest, {
            method: CONSTANT.G,
            headers: header,
        })
            .then(response => response.json())
            .then(responsetext => {
                return responsetext;
            })
            .catch(error => {
                console.log(error);
                //callToast("Failed ", error.message);
            });
    } catch (error) {
        console.log(error)
    }
}
export function callP(rest, header, data) {
    console.log("connection", rest);
    console.log("header", header);
    let didTimeOut = false;
    let jdata = data;
    // let jdata = JSON.stringify(data);
    console.log("j : ", jdata);

    /*new Promise((resolve, reject) => {
        const Timeout = setTimeout(() => {
            didTimeOut = true;
            callToast('Server Request Time Out')
            reject(new Error('Request Time Out'));
        }, CONSTANT.TIME_OUT);

        fetch(rest, {
            method: CONSTANT.P,
            // headers: header,
            body: data
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
            console.log("failed", error);
            callToast(String(error));
            reject(error);

        });
    }).then(res => {
        console.log('POST RESULTH', res);
        return res;
    }).catch(err => {
        console.log('Request Err', err);
        callToast(String(err));
    })*/
    try {
        return fetch(rest, {
            method: CONSTANT.P,
           // headers: header,
            body: jdata
        })
            .then(response =>
                response.json()
            
                )
            .then(responsetext => {
                return responsetext;
            })
            .catch(error => {
                console.log(error);
                //callToast(String(error.message));
            });
    } catch (error) {
        console.log(error)
       // callToast(String(error));
    }
}
export function callPBK(rest, header, data, title = "") {

    let didTimeOut = false;
    let jdata = data;
    // let jdata = JSON.stringify(data);
    let Timeout =  null;
    console.log("REST_API : ", rest);
    console.log("j : ", jdata);

    return new Promise((resolve, reject) => {
        Timeout = setTimeout(() => {
            didTimeOut = true;
            callToast(title+' Server Request Time Out')
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
        console.log(rest+'POST RESULTH', res);
        clearTimeout(Timeout);
        return res;
    }).catch(err => {
        console.log('Request Err', err);
        clearTimeout(Timeout);
        callToast(String(err));
    })
} 
export function callGBK(rest, header, data, title="") {

    let didTimeOut = false;
    let jdata = data;
    let Timeout = null;
    // let jdata = JSON.stringify(data);
    console.log("rest : ", rest);
    console.log("j : ", jdata);
    try{
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
            console.log(rest +'POST RESULTH', res);
            clearTimeout(Timeout);
            return res;
        }).catch(err => {
            console.log('Request Err', err);
            clearTimeout(Timeout);
            callToast(String(err));
        })
    }catch (err ){
        console.log('Request Err', err);
        clearTimeout(Timeout);
        callToast(String(err));
    }
    
}
export function callPClean(rest, header, data) {
    //console.log("connection", rest);
   // console.log("header", header);
    let jdata = data;
    // let jdata = JSON.stringify(data);
   // console.log("j : ", jdata);
    try {
        return fetch(rest, {
            method: CONSTANT.P,
           // headers: header,
            body: jdata
        })
            .then(response =>
                response.json()
            
                )
            .then(responsetext => {
                return responsetext;
            })
            .catch(error => {
                console.log(error);
                //callToast(String(error.message));
                return false;
            });
    } catch (error) {
        console.log(error)
    }
}
export function callP2(rest, header, data) {
    console.log("connection", rest);
    // console.log("header", header);
    let jdata = data;
    // let jdata = JSON.stringify(data);
    console.log("j : ", jdata);
    try {
        return fetch(rest, {
            method: CONSTANT.P,
            headers: header,
            body: jdata
        })
            .then(response => {
                return response.json()
            })
            .then(responsetext => {
                return responsetext;
            })
            .catch(error => {
                console.log(error);
                //callToastTop(String(error));
                return false;
               
            });
    } catch (error) {
        console.log(error)
        return false;
    }
}
export function callPDebug(rest, header, data) {
    console.log("connection", rest);
    // console.log("header", header);
    let jdata = data;
    // let jdata = JSON.stringify(data);
    console.log("j : ", jdata);
    try {
        return fetch(rest, {
            method: CONSTANT.P,
            // headers: header,
            body: jdata
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(responsetext => {
                return responsetext;
            })
            .catch(error => {
                console.log(error);
                callAlert("Failed ", error.message);
            });
    } catch (error) {
        console.log(error)
    }
}
export function callGwithP(rest, header, data) {
    console.log("connection", rest);
    // console.log("header", header);
    let jdata = data;
    // let jdata = JSON.stringify(data);
    console.log("j : ", jdata);
    try {
        return fetch(rest, {
            method: CONSTANT.G,
            // headers: header,
            body: jdata
        })
            .then(response => {
                return response.json()
            })
            .then(responsetext => {
                return responsetext;
            })
            .catch(error => {
                console.log(error);
                callAlert("Failed ", error.message);
            });
    } catch (error) {
        console.log(error)
    }
}
