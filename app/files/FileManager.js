
import {
    Alert,
    BackHandler,
} from 'react-native';
import { Buffer } from "buffer";
import RNFetchBlob from 'rn-fetch-blob';
import Constant from '../global/Constant';
////////////
let NAME_LINK ="https://raw.githubusercontent.com/fajardsx/Cfg_Repo/master/him_cfg.txt";//hosting file external url
let NAME_CFG ="aGltX2NmZy50eHQ=";//external config.txt
var RNFS = require('react-native-fs');
/////////
export function callAlertImportant(title, msg) {
    Alert.alert(title, msg, [
        { text: "Yes", onPress: () => BackHandler.exitApp() },
        { text: "No", onPress: () => BackHandler.exitApp() }
    ], { cancelable: false });
}
//call alert with parameter
export function callAlert(title, msg, onYes) {
    Alert.alert(title, msg, onYes != null ? [
        { text: "Yes", onPress: () => onYes() },
        { text: "No", onPress: () => console.log("") }
    ] : null);
}
///////////////////////////////
export function getdecode(param){
    return Buffer.from(param, 'base64').toString('ascii')
}
///////////////////////////////
export function getLocalF() {
    //console.log("file",Buffer.from(CONSTANT.NAME_CFG + CONSTANT.LINKTXT).toString('base64'));
    //console.log("file", Buffer.from(CONSTANT.NAME_LINK, 'base64').toString('ascii'));
    const dirs = RNFetchBlob.fs.dirs.DocumentDir;
    return RNFS.readDir(dirs).then(result => {
        console.log(result);
        let cfg = null
        result.map((value, index) => {
            if (value.name == getdecode(NAME_CFG)) {
                cfg = result[index];
            }
        })
        
        return Promise.all([RNFS.stat(cfg.path), cfg.path]);
    }).then((statresult) => {

        if (statresult[0].isFile()) {
            return RNFS.readFile(statresult[1]);
        }
        return 'no file';
    }).then((content) => {
        return JSON.parse(content);
    }).catch(error => {
        return false;
        console.log(error.message, error.code);
    })
}
export function dwfileconfig() {
   // console.log(getdecode(NAME_LINK));
    const fs = RNFetchBlob.fs;
    const dirs = RNFetchBlob.fs.dirs;
    console.log(getdecode(NAME_CFG));
    console.log(dirs.DocumentDir + "/" + getdecode(NAME_CFG));
    return RNFetchBlob.fetch('GET',NAME_LINK,{
        'Content-Type':"octet-stream"
    }).progress((receive,total)=>{
        console.log('progress',receive/total);
    }).then((resp)=>{
        console.log(resp);
        fs.writeFile(dirs.DocumentDir + "/" + getdecode(NAME_CFG),resp.data,'utf8').then(()=>{});
        return true;
    }).catch((err)=>{
        return false;
    })
   /* return RNFS.downloadFile({ 
        fromUrl: NAME_LINK, 
        toFile: RNFS.DocumentDirectoryPath + "/" + getdecode(NAME_CFG)
    }).promise.then(res => { return res });*/
}

export async function kwkwkwkwkw(oncomplete) {
    let reqapp = await dwfileconfig();
    console.log("status", reqapp);
    if (reqapp == true) {
        let filepermit = await getLocalF();
        console.log("cfg app", filepermit);   

        if (filepermit['envi'] == 'xxx') {
            return callAlertImportant("Warning", filepermit['envi_message']);
        }
        if (filepermit['envi'] == 'yyy') {
            return callAlert("Warning", filepermit['envi_message']);
        }
        Constant.rest_url = Constant.DEBUG_MODE == 1 ? filepermit['url_server_debug']:filepermit['url_server'];
        oncomplete();
    } else {
       let filepermit = await getLocalF();
        //console.log("cfg app", filepermit);

        if (filepermit['envi'] == 'xxx') {
            return callAlertImportant("Warning", filepermit['envi_message']);
        }
        if (filepermit['envi'] == 'yyy') {
            return callAlert("Warning", filepermit['envi_message']);
        }
        Constant.rest_url = Constant.DEBUG_MODE == 1 ? filepermit['url_server_debug'] : filepermit['url_server'];
        oncomplete();
    }
}
