class KEYS{
    //Action
    static KEY_G = "get";
    static KEY_D = "delete";
    static KEY_A = "add";
    static KEY_U = "update";

    static KEY_POS = "userposition";
    static KEYPIN = "pins";
    static KEYDATA = "dat";
    static KEY_NOTIFICATION = "setting_notification";
    static KEY_DATA_NOTIFICATION = "data_notification";
    static KEYFIRST = "first";
    static KEYLOG = "log";
    static KEYHISTORYSEARCH = "logsearch";
    static KEY_PLAYERID = "playerid";
    //KEYS
    static KEY_STARTMEETDOCTOR= "startMeetDokter";
    static KEY_DATAVISIT_SCHEDULE= 'scheduleDat';
    static KEY_SETUP= 'stupconfig';
    static KEY_LOGin= 'stuplogin';
    static KEY_LAST_LOGIN= 'lastlogin';
   
    static KEY_NOTIF= 'notiflist';
    static KEY_SCHEDULE= 'shedulelist';
    static KEY_SCHEDULE_SERVER= 'shedulelist_server';
    static KEY_HISTORY= 'historylist';
    static KEY_MONTHLIST= 'meetMonth';
    static KEY_HOSPITALLIST= 'listHospital';
    static KEY_EXPENSES= 'expenseslist';
    static KEY_NEWMONTH= 'newmonth';

    static KEY_PDF = 'pdflogin';//get file link
    static KEY_ATTEND= 'attend_api';//API ATTEND 
    static KEY_ATTEND_RESET= 'resetattend_api';//API ATTEND 
    static KEY_SELECTTARGET= 'selectdoctor_api';//API SELECT DOCKTOR
    static KEY_DETAILDOCTOR= 'detaildoctor_api';//API DETAIL DOCKTOR
    static KEY_TODAYTARGET= 'todaydoctor_api';
    static KEY_ONESIGNALTARGET = 'onesignal_api';//API ONE SIGNAL
    static KEY_SEND_EXEPENDS= 'expends_api';//API SEND EXPENDS
    static KEY_SEND_LOCATION= 'location_api';//API SEND LOCATION
    static KEY_LAST_LOCATION= 'last_location_api';//LAST LOCATION

    static KEY_CONTENT_HELP = 'contenthelp';
    static KEY_CONTENT_CONTACT = 'contentcontact';
    static KEY_CONTENT_ABOUT = 'contentabout';
    static KEY_DOKTER_CATEGORI = 'categorydokter';
    static KEY_DOKTER_SPECIALIS = 'specialisdokter';

    //SYNC KEY
    static KEY_MEETDOCTOR_PHOTO= "startMeetDokter_photo";
    static KEY_MEETDOCTOR_RESULTH= "startMeetDokter_resulth";
    static KEY_MEETDOCTOR_COMPLETE= "dokter_complete";

    //SYNC ALL FIFO METHOD
    static KEY_NAME_SYNC = "himasync";

    //SCHEDULE
    static KEY_LISTDOCMONTH = 0;
    static KEY_LISTDOCTODAY = 1;
    static KEY_LISTSCHEDULETODAY = 2;
    static KEY_LISTVISITSCHEDULE = 3;
}



export default KEYS;