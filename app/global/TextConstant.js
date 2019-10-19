
class TEXT_CONSTANT {
    static LANGUAGE = 1; //0=bahasa indonesia , 1= inggris

    static TEXT_NO_CHAT_LIST = "TEXT_NO_CHAT_LIST";
    static TEXT_NO_NOTIF_LIST = "TEXT_NO_NOTIF_LIST";
    //profil

    static TEXT_EDIT_PROFILE = "TEXT_EDIT_PROFILE";
    static TEXT_ABOUT_US = "TEXT_ABOUT_US";
    static TEXT_CONTACT_US = "TEXT_CONTACT_US";
    static TEXT_HELP = "TEXT_HELP";
    static TEXT_CHANGE_PINCODE = "TEXT_CHANGE_PINCODE";
    static TEXT_LOGOUT = "TEXT_LOGOUT";

    //edit profil
    static TEXT_CHANGE = "TEXT_CHANGE";
    static TEXT_ADDPHOTO = "TEXT_ADDPHOTO";

    static TEXT_LIST = {
        0: {
            TEXT_NO_CHAT_LIST: "Tidak Ada Chat",
            TEXT_NO_NOTIF_LIST: "Tidak Ada Notifikasi",
            TEXT_EDIT_PROFILE: "Ubah Profil",
            TEXT_ABOUT_US: "Tentang Kami",
            TEXT_CONTACT_US: "Hubungi Kami",
            TEXT_HELP: "Bantuan",
            TEXT_CHANGE_PINCODE: "Ganti Kode Pin",
            TEXT_LOGOUT: "Keluar Akun",
            TEXT_CHANGE: "UBAH",
            TEXT_ADDPHOTO: "TAMBAH FOTO"
        },
        1: {
            TEXT_NO_CHAT_LIST: "Chat Empty",
            TEXT_NO_NOTIF_LIST: "Notification Empty",
            TEXT_EDIT_PROFILE: "Edit Profile",
            TEXT_ABOUT_US: "About Us",
            TEXT_CONTACT_US: "Contact Us",
            TEXT_HELP: "Help",
            TEXT_CHANGE_PINCODE: "Change Pincode",
            TEXT_LOGOUT: "Logout",
            TEXT_CHANGE: "CHANGE",
            TEXT_ADDPHOTO: "CHANGE PHOTO"
        }
    };

    static reqText(type) {
        return this.TEXT_LIST[this.LANGUAGE][type];
    }
}

export default TEXT_CONSTANT;