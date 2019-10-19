//REALM
import { RM_CONFIG,RM_SCHEMA } from "./rm_config";


//var Realm = require('realm');

export function SetupRMD() {
    let realms// = new Realm({path: RM_CONFIG.Name_DB,schema: [RM_SCHEMA.USERSCHEMA]});
    return realms;
}
export function InitRMD() {
    let realms //= new Realm({ path: RM_CONFIG.Name_DB });
    return realms;
}