import CONSTANT from "../global/Constant";
import { Buffer } from "buffer";

var RNFS = require('react-native-fs');

export function getLocalF() {
    //console.log("file",Buffer.from(CONSTANT.NAME_CFG + CONSTANT.LINKTXT).toString('base64'));
   // console.log("file", Buffer.from(CONSTANT.NAME_LINK, 'base64').toString('ascii'));
    return RNFS.readDir(RNFS.DocumentDirectoryPath).then(result => {

        let cfg = null
        result.map((value, index) => {
            if (value.name == Buffer.from(CONSTANT.NAME_CFG, "base64").toString("ascii")) {
                cfg = result[index];
            }
        })
        return Promise.all([RNFS.stat(cfg.path), cfg.path]);
    }).then((statresult) => {
        //console.log('cek file cfg', statresult)
        if (statresult[0].isFile()) {
            return RNFS.readFile(statresult[1]);
        }
        return 'no file';
    }).then((content) => {
        return JSON.parse(content);
    }).catch(error => {
        console.log(error.message, error.code);
    })
}
export function dwfileconfig() {
    return RNFS.downloadFile({ fromUrl: Buffer.from(CONSTANT.NAME_LINK, 'base64').toString('ascii'), toFile: RNFS.DocumentDirectoryPath + "/" + Buffer.from(CONSTANT.NAME_CFG, 'base64').toString('ascii') }).promise.then(res => { return res });
}

export function  getPdfFile(datas) {
    return RNFS.readDir(RNFS.DocumentDirectoryPath).then(result=>{
        let cfg = null;
        //console.log('path',result)
        result.map((value,index)=>{
            if (value.name == datas){
                cfg = result[index]
            }
        })
        if(cfg){
            return Promise.all([RNFS.stat(cfg.path), cfg.path])
        }else{
            return false;
        }
        
    }).then((statresult)=>{
        //console.log('cek file',statresult)
        if (statresult){
            if (statresult[0].isFile()) {
                return statresult;
            }
        }
      
        return false;
    }).then((content)=>{
        return content;
    }).catch(error=>{
        console.log(error.message,error.code);
    })
}
export function dwFilePdf(fromurls, namepdf) {
    return RNFS.downloadFile({ fromUrl: fromurls, toFile: RNFS.DocumentDirectoryPath + "/" + namepdf }).promise.then(res => { 
        console.log(res);
        return res 
    });
}