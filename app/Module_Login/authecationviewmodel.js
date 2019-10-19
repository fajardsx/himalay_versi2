import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import ACTION_TYPE from "../redux/actions/actions";


//
import Constant from '../global/Constant';
import user from '../global/user';
import { loginUser } from '../module_api/module_resapi'
import { convertHeight, convertWidth, loading, callAlert, sendAuth, addLocal, getLocal, callToast } from "../global/Global";
import { LEMARI_GLOBAL_LOC, LEMARI_GLOBAL_LOAD } from "../appcomponent/module_async/AsyncManager";
import KEYS from "../appcomponent/module_async/utils/keyAsync";

var that = null;
class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: "",
            pass: "",
            isLoading: false,
            tryLogin: false
        };
        that = this;
    }
    componentDidMount() {
        //check local
        if (this.props.userData == null) {
            this.props.navigation.navigate(Constant.VM_LOGIN_SCREEN);
        } else {
            console.log("userData", this.props.userData);
            if (this.props.userData.profile_status != "Active") {
                callAlert("Not Active", "Your account not active.");
                this.props.navigation.navigate(Constant.VM_INIT);
                return;
            }
            user.onUpdateUserDataLocal(this.props.userData);
            //callToast(toString(res))
            console.log("to auth");
            this.setState({
                nama: this.props.userData.profile_email,
                pass: this.props.userData.profile_pass,
                tryLogin: true,
                isLoading: true
            }, () => this.props.navigation.navigate(Constant.VM_APPS));// () => that.tryLog());
        }
        // getLocal(Constant.KEYDATA).then((res) => {
        //     console.log("Local : ", res);

        //     if (res == null || res == undefined) {
        //         console.log("to login");

        //         that.props.navigation.navigate(Constant.VM_LOGIN_SCREEN);
        //     } else {
        //         if (res.profile_status != "Active") {
        //             callAlert("Not Active", "Your account not active.");
        //             that.props.navigation.goBack();
        //             return;
        //         }
        //         user.onUpdateUserDataLocal(res);
        //         //callToast(toString(res))
        //         console.log("to auth");
        //         that.setState({
        //             nama: res.profile_email,
        //             pass: res.profile_pass,
        //             tryLogin: true,
        //             isLoading: true
        //         }, () => that.props.navigation.navigate(Constant.VM_APPS));// () => that.tryLog());
        //     }
        // })
    }

    render() {
        return <View style={{
            flex: 1,
            //justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#027266"
        }}>
            {loading()}
        </View>
    }
    async tryLog() {
        const { nama, pass } = this.state;
        let data = new FormData();
        data.append("email", nama);
        data.append("password", pass);

        try {
            await sendAuth(data).then((res) => {
                if (res) {
                    console.log("login auth : ", res);
                    if (res.api_message == 'success') {
                        if (res.profile_status != "Active") {
                            callAlert("Not Active", "Your account not active.");
                            that.props.navigation.goBack();
                            return;
                        }
                        let users = user.onUpdateUserData(res, pass, true);
                        addLocal(Constant.KEYDATA, users);
                        // LEMARI_GLOBAL_LOC([res.pdf_files], KEYS.KEY_PDF)
                        // LEMARI_GLOBAL_LOC([users], KEYS.KEY_LOGin)
                        //callAlert("", res.api_message+" Login");
                        that.setState({
                            // isAuthLoading: false,
                            isLoading: false,
                        }, () => that.props.navigation.navigate(Constant.VM_APPS));
                    } else {
                        that.props.navigation.navigate(Constant.VM_APPS);
                    }
                } else {
                    that.props.navigation.navigate(Constant.VM_APPS);
                }

            })
        } catch (error) {
            that.props.navigation.navigate(Constant.VM_APPS);
        }


    }
}
function mapStateToProps(state) {
    return {
        isFirst: state.firstopen,
        userData: state.userData
    };
}
function dispatchToProps(dispatch) {
    return {
        updateuser: data =>
            dispatch({ type: ACTION_TYPE.UPDATE_USER, value: data }),
    };
}
export default connect(
    mapStateToProps,
)(AuthScreen);