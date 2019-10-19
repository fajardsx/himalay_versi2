import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { convertWidth, convertHeight, callToast } from '../global/Global';
import Constant from '../global/Constant';

class ScreeDevmode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: false,
      isPass: false,
      pass: "",
      tempRadius: Constant.MAX_DISTANCE,
      tempRest: Constant.rest_url,
      tempMsgerror: Constant.SHOW_MESSAGE==false?1:2
    };
  }
  _pressOpenDev(bools) {
    this.setState({
      isPass: bools
    });
  }
  _pressSubmitDev(pass) {
    if (pass == Constant.PASS_DEV) {
      this.setState({
        verify: true
      });
    } else {
      callToast("Failed");
    }
  }
  _pressDefault = () => {
    Constant.rest_url = Constant.DEFAULT_REST_URL;
    Constant.MAX_DISTANCE = Constant.DEFAULT_MAX_DISTANCE;
    Constant.SHOW_MESSAGE = Constant.DEFAULT_SHOW_MESSAGE;
    this.setState({
      tempRadius: Constant.MAX_DISTANCE,
      tempRest: Constant.rest_url,
      tempMsgerror:1
    },()=> callToast("Set Default"));
  };
  _pressSave = () => {
    Constant.rest_url = this.state.tempRest;
    Constant.MAX_DISTANCE = Number(this.state.tempRadius);
    Constant.SHOW_MESSAGE = this.state.tempMsgerror==1?false:true;
    callToast("Save")
    this._pressCancel();
  };
  _pressCancel = () => {
    this.setState(
      {
        verify: false,
        isPass: false,
        pass: ""
      });
  };
  
  updateCheck() {
    let currents = this.state.tempMsgerror;
    console.log("checl", currents)
    if (currents == 2) {
      currents = 1;
    } else if (currents == 1) {
      currents = 2;
    }
    this.setState({
      tempMsgerror: currents
    })
    //this.checks.onUpdateFromParent(currents)
  }
  render() {
    const { verify, isPass, pass, tempRadius, tempRest,tempMsgerror } = this.state;
    if (verify) {
      return (
        <View style={styles.rootDevStyle}>
          <Text>Dev Mode</Text>
          <View style={styles.inputContainer}>
            <Text style={{ marginLeft: 10, width: convertWidth("15%") }}>
              Server :
            </Text>
            <TextInput
              underlineColorAndroid="rgba(0,0,0,0)"
              defaultValue=""
              ref="passinput"
              placeholder="Server"
              placeholderTextColor="#a8a8a8"
              defaultValue={tempRest}
              style={styles.input}
              onChangeText={txt => {
                this.setState({
                  tempRest: txt
                });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={{ marginLeft: 10, width: convertWidth("15%") }}>
              Max Radius :
            </Text>
            <TextInput
              underlineColorAndroid="rgba(0,0,0,0)"
              defaultValue=""
              ref="passinput"
              placeholder="Radius"
              placeholderTextColor="#a8a8a8"
              defaultValue={tempRadius.toString()}
              style={styles.input}
              onChangeText={txt => {
                this.setState({
                  tempRadius: txt
                });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={{ marginLeft: 10, width: convertWidth("15%") }}>
              Enable Message Error :
            </Text>
            <TouchableOpacity
              style={{ borderWidth: 0 ,alignItems: 'center',justifyContent:'center'}}
              onPress={() => this.updateCheck()}
            >
              <Text style={styles.input}>
                {tempMsgerror==1?"OFF":"ON"}
             </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={styles.touchDevCancel}
              onPress={this._pressSave}
            >
              <Text style={{ textAlign: "center" }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchDevCancel}
              onPress={this._pressCancel}
            >
              <Text style={{ textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchDevCancel}
              onPress={this._pressDefault}
            >
              <Text style={{ textAlign: "center" }}>Default</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (verify == false) {
      if (isPass) {
        return (
          <View style={styles.rootPassStyle}>
            <TextInput
              underlineColorAndroid="rgba(0,0,0,0)"
              defaultValue=""
              ref="passinput"
              placeholder="Password"
              placeholderTextColor="#a8a8a8"
              secureTextEntry
              style={styles.input}
              onChangeText={txt => {
                this.setState({
                  pass: txt
                });
              }}
            />
            <TouchableOpacity
              style={styles.touchDevCancel}
              onPress={() => this._pressSubmitDev(pass)}
            >
              <Text style={{ textAlign: "center" }}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchDevCancel}
              onPress={() => this._pressOpenDev(false)}
            >
              <Text style={{ textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={styles.rootStyle}>
            <TouchableOpacity
              style={styles.touchDev}
              onPress={() => this._pressOpenDev(true)}
            />
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  touchDev: {
    //alignSelf: "flex-end",
    width: convertWidth("2%"),
    height: convertHeight("2%"),
    backgroundColor: "transparent"
  },
  touchDevCancel: {
    width: convertWidth("10%"),
    justifyContent: "center",
    //height: convertHeight("3%"),
    backgroundColor: "#fff",
    marginHorizontal: 2
  },
  rootStyle: {
    position: "absolute",
    width: convertWidth("2%"),
    height: convertHeight("10%"),
    top: 0,
    right: 0
  },
  inputContainer: {
    flexDirection: "row",
    height: convertHeight("10%"),
    marginVertical: 5,
    alignItems: "center",
    alignSelf: "center",
    borderColor: "#C1C1C2",
    justifyContent: "flex-start",
    width: convertWidth("50%"),
    borderWidth: 1,
    borderRadius: convertWidth("2%")
  },
  rootPassStyle: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    width: convertWidth("100%"),
    //height: convertHeight('9%'),
    backgroundColor: Constant.COLOR_GREEN1,
    top: 0,
    left: 0
  },
  rootDevStyle: {
    //flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    width: convertWidth("100%"),
    //height: convertHeight('9%'),
    paddingBottom: 10,
    backgroundColor: Constant.COLOR_GREEN1,
    top: 0,
    left: 0
  },
  input: {
    width: convertWidth("30%"),
    height: convertHeight("10%"),
    paddingLeft: 15,
    // backgroundColor : 'rgba(255,255,255,0.5)',
    color: "#000",
    fontSize: convertWidth("2%")
  }
});


export default ScreeDevmode;
