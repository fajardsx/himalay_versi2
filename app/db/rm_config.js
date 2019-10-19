export class RM_CONFIG{
    static Name_DB = "Himalaya.realm";

    static USER_QUERY = "User_Details";
}

export class RM_SCHEMA{
    static USERSCHEMA ={
        name:RM_CONFIG.USER_QUERY,
        properties:{
            user_id:{type:'int',default:0},
            profile_id:'string',
            profile_name:'string',
            profile_position:'string',
            profile_email:'string',
            profile_pass:'string',
            profile_geolocation:'string',
            profile_lastlogin:'string',
            profile_status:'string',
            profile_atten:'string',
            profile_pass:'string',
            profile_photo:'string',
            profile_schedule:'string',
            profile_today:'string',
            profile_doneToday:'string',
            profile_doneMonth:'string',
        }
    }
}