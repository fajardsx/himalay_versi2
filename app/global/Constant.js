import {curretntimestamp, encmd} from './Global';

class Constant {
  static COPYRIGHT = 'Copyright © Himalaya 2019';
  static DEBUG_MODE = false;
  static TRAC_DEBUG_MODE = false; //////////IMPORTANT DEVELOPER MODE
  static FORCE_UPDATE = false;
  //ONESIGN
  static OSKEY = '015bad2a-fe56-4a52-a8d2-a5198aa54b9a'; //one-signal
  static OSKEY_PRIVACY = false; //one-signal-privacy
  //local
  static NAME_CFG = 'Y29uZmlnLnR4dA=='; //external config.txt
  static TOKET_LOCATIONIQ = '907fb3e373967e'; //Token my.locationiq.com
  static NAME_LINK =
    'aHR0cHM6Ly9kb3Rjb21zb2x1dGlvbi4wMDB3ZWJob3N0YXBwLmNvbS9oaW1hbGF5YS9vcHRpb24udHh0'; //hosting file external url
  //versioning
  static NAME_APPS = 'Himalaya';
  static SERVERVERSION = '2';
  static CUERRENT_BUILD = '18.8';
  static TIMECUERRENT_BUILD = '0001';
  static NAME_VERSION =
    '20191020_' + this.CUERRENT_BUILD + '_' + this.TIMECUERRENT_BUILD;

  //link googleplay
  static GOOGLEPLAY_LINK =
    'https://beta2.dotcomsolution.co.id/apk/himalaya.apk';
  //SET Up
  static initinf0 = [];
  //api rest method
  static P = 'post';
  static G = 'get';
  static PU = 'put';
  //key local
  static KEY_POS = 'userposition';
  static KEYPIN = 'pins';
  static KEYDATA = 'dat';
  static KEY_NOTIFICATION = 'setting_notification';
  static KEY_DATA_NOTIFICATION = 'data_notification';
  static KEYFIRST = 'first';
  static KEYLOG = 'log';
  static KEYHISTORYSEARCH = 'logsearch';
  static KEY_PLAYERID = 'playerid';
  //Logo Apps
  static LOGO = '';
  //Key cell
  static MAX_CELL = 5;
  //key timer format
  static KEY_TIME_24 = '24';
  static KEY_TIME_PM = 'pm_am';
  //ONLINE
  static TIME_ISONLINE = 60;
  static TIME_OUT = 40000;
  static TIME_OUT_SMALL = 8000;
  static TIME_OUT_REFRESH = 300000;
  static TIME_OUT_SYNC = 600000;
  static TIME_OUT_SERVER_CONNECT = 3600000;
  static DEVICE_ONLINE = false;
  static DEVICE_DEBUG_OFFLINE = false; //////////IMPORTANT VIRTUAL OFFLINE WHENT ONLINE DEVICE
  static APPSTATUS = '';
  static SYNC_MODE = false;
  //Header
  static HEADER_1 = {
    'X-Requested-With': 'XMLHttpRequest',
  };
  //http://3.1.201.136
  //"https://www.himalayafrontline.com/public/api/"
  static SERVER_ID = 0; //DEBUG USE 0
  static rest_url =
    this.SERVER_ID == 1
      ? 'https://beta2.dotcomsolution.co.id/himalaya/public/api/'
      : 'http://52.220.37.245/public/api/';
  static RESTLINK = '';
  static BASELINK = '';
  static HEADER_2 = {
    Accept: 'application/json',
    //"Content-Type": "multipart/form-data"
    //"Accept-Language": DEFAULT_USER_CONFIG.userlanguage,
    //"Access-Token": DEFAULT_USER_CONFIG.userToken,
    //"Content-Type": "application/json;charset=UTF-8"
  };

  static LINK_EDETAILING = '../../../../assets/edetailing/';
  static LINKTXT = '.txt';
  static LINKPDF = '.pdf';
  //type category
  static TYPE_PRODUCT;
  static ONLINE = false;
  static appstatus = '';
  //Distance
  static MAX_DISTANCE = 1;
  //country data
  static COUNTRY_INA = 'INDONESIA';
  static COUNTRY_SGH = 'SINGAPORE';
  //permission save
  static PERMISSION_NOTIF = false;
  static PERMISSION_GPS = false;
  //NAME_VIEWMODEL
  static VM_AUTH = 'Authorize';
  static VM_INIT = 'AuthPage';
  static VM_SPLASH_SCREEN = 'SplashPage';
  static VM_LOGIN_SCREEN = 'LoginViews';
  static VM_LOGIN_SCREEN_S = 'LoginPage';
  static VM_TRYLOGIN_SCREEN = 'TryLoginPage';
  static VM_FORGOT_SCREEN = 'ForgotPage';
  static VM_APPS = 'AppsPage';
  static VM_APPINDEX = 'AppIndex';
  static VM_MAPVIEW = 'MapView';
  static VM_HOMEVIEW = 'HomeView';
  static VM_MAPRESULTH = 'MapSearchResult';
  static VM_SIGNATURE = 'SignatureView';
  static VM_EXPENSES_FORM = 'ExpensesForm';
  static VM_DOCTOR_DETAIL = 'DokterDetailView';
  static VM_DOCTOR_DETAIL_EDETAILING = 'DokterDetailView';
  //tab
  static TAB_SCHEDULE = 'Schedule';
  static TAB_HISTORY = 'History';
  static TAB_DOCTOR = 'Doctor Detail';
  static TAB_SEDETAILING = 'E-Detailing';
  static TAB_EXPENSES = 'Expenses';
  static TAB_NOTIF = 'Notification';
  //color primer
  static COLOR_GRAY = '#777582';
  static COLOR_GRAY2 = '#A8A8A8';
  static COLOR_GRAY3 = '#686868';
  static COLOR_GRAY_ICON = '#ababab';
  static COLOR_WHITE3 = '#EEEFF1';
  static COLOR_WHITE1 = '#FDFDFD';
  static COLOR_WHITE2 = '#f7f7f7';
  static COLOR_WHITE4 = '#fcfcfc';
  static COLOR_WHITE5 = '#F8F8F8';
  static COLOR_WHITE6 = '#F3F3F3';
  static COLOR_WHITE7 = '#FAFAFA';
  static COLOR_GREEN1 = '#137365';
  static COLOR_GREEN2 = '#027266';
  static COLOR_GREEN3 = '#038B7B';
  static COLOR_GREEN4 = '#B8E884';
  static COLOR_GREEN5 = '#03B6A0';
  static COLOR_GREEN6 = '#028B7B';
  static COLOR_GREEN_CHECKMEET = '#7ed321';
  static COLOR_ORANGE1 = '#E95A21';
  static COLOR_ORANGE3 = '#EA5B1B';
  static COLOR_ORANGE2 = '#F8C221';
  static COLOR_RED1 = '#EB5355';
  static COLOR_RED2 = '#E52C4E';
  static COLOR_RED3 = '#FE0001';
  static COLOR_REDNA = '#d0021b';
  static COLOR_BLACK = '#535353';
  static COLOR_BLACKALL = '#000';
  static COLOR_BLUE = '#7785EC';
  static COLOR_BLUE_FEEDBACKICON = '#7984f3';
  static COLOR_LINE = '#F5F5F5';
  static COLOR_LINE_doktorInfo = '#F8FCFB';
  //font
  static POPPINS_REG = 'Poppins-Regular';
  static POPPINS_SEMIBOLD = 'Poppins-SemiBold';
  static POPPINS_BOLD = 'Poppins-Bold';
  static POPPINS_MEDIUM = 'Poppins-Medium';
  static POPPINS_LIGHT = 'Poppins-Light';
  static POPPINS_ULTRALIGHT = 'Poppins-ExtraLight';
  static POPPINS_ITALIC = 'Poppins-Italic';

  //id types

  static TYPE_NOTIF = 0;
  static TYPE_GPS = 1;

  //ROLE
  static ROLE_NOTLOGIN = 0;
  static ROLE_INLOGIN = 1;
  static ROLE_INSELECTSCHEDULE = 2;
  static ROLE_READYSTARTSCHEDULE = 3;
  static ROLE_ADDDOCTORAGAIN = 4;
  static ROLE_FINISHTODAY = 5;

  //TYPE GET LIST
  static LIST_TYPE_SELECT = 0;
  static LIST_TYPE_UNSELECT = 1;
  static LIST_TYPE_ALL = 2;

  //START EDETAILING
  static START_PRESENT = false;
  static DURATION_LAYOUT_ANIM = 300;
  static DURATION_FADE = 300;
  //list DOKTOR
  static TYPE_MEET = 2;
  static TYPE_NO_MEET = 1;

  //DATA
  static SCHEDULE_DATA = [];
  static MAX_SHOW = 50;
  //DATE GLOBAL

  //DEV MODE
  static DEFAULT_REST_URL =
    this.SERVER_ID == 0
      ? 'https://beta2.dotcomsolution.co.id/himalaya/public/api/'
      : 'http://3.1.201.136/public/api/';
  static DEFAULT_MAX_DISTANCE = 1;
  static DEFAULT_SHOW_MESSAGE = false;
  static PASS_DEV = 'kapuas21';
  static SHOW_MESSAGE = false;
  /**
   *
   * update status app background activities
   * @static
   * @returns
   * @memberof Constant
   */
  static updateForceUpdate(value) {
    this.FORCE_UPDATE = value;
  }
  static updateServerVersion(value) {
    this.SERVERVERSION = value;
  }
  static appStatus() {
    return this.APPSTATUS;
  }
  static updateAppStatus(values) {
    this.APPSTATUS = values;
  }
  static updatePermission(id, value) {
    if (id == this.TYPE_GPS) {
      this.PERMISSION_GPS = value;
    }
    if (id == this.TYPE_NOTIF) {
      this.PERMISSION_NOTIF = value;
    }
  }
  static GET_HEADER() {
    let timer = curretntimestamp();
    //let us = getUA();
    let us = 'okhttp/3.6.0';
    return {
      Accept: 'application/json',
      //"X-Authorization-Token": encmd(
      //  "fc92167f0fda4e9a73eddc4d2e71f47f" + timer + us
      //  ,), //getUA()),
      'X-Authorization-Time': timer,
      'Content-Type': 'multipart/form-data;',
    };
  }
  static GET_HEADER2() {
    let timer = curretntimestamp();
    //let us = getUA();
    let us = 'okhttp/3.6.0';
    return {
      Accept: 'application/json',
      //"X-Authorization-Token": encmd(
      //  "fc92167f0fda4e9a73eddc4d2e71f47f" + timer + us
      //  ,), //getUA()),
      // "X-Authorization-Time": timer,
      'Content-Type': 'multipart/form-data;',
    };
  }
  static updateresturl(value) {
    this.RESTLINK = value;

    // console.log(this.RESTLINK);
  }
  static updatebaseurl(value) {
    this.BASELINK = value;
  }
  static updatelogourl(value) {
    this.LOGO = value;
  }
  /** */
  static savesetup(setupvalue) {
    //console.log(setupvalue);
    this.initinf0 = setupvalue;
    this.initinf0.map((value, index) => {
      if (value.name == 'api_url') {
        // this.updateresturl(value.content);
        let baseurl = String(value.content);
        this.updatebaseurl(baseurl);
      } else if (value.name == 'force_update') {
        this.updateForceUpdate(value.content);
      } else if (value.name == 'environtment') {
        this.updateAppStatus(value.content);
      } else if (value.name == 'version') {
        this.updateServerVersion(value.content);
      } else if (value.name == 'logo') {
        this.updatelogourl(value.content);
      }
    });
  }
}
export default Constant;
