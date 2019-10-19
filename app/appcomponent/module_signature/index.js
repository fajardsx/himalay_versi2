import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";
import SignatureCapture from 'react-native-signature-capture';
//
import Constant from '../../global/Constant';
import {convertHeight,convertWidth} from '../../global/Global';
import { Styleapp } from '../../styleapp';


let that = null;
class SignatureViewModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            result:null
        }
        that = this;
    }
    componentDidMount() {
    
    }
    
    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        console.log(result);
        that.props.onSave(result);
    }
    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }

    render() {
        return <View style={{ backgroundColor: '#f7f7f7',width:convertWidth('100%'),height: convertHeight('100%'),position: 'absolute' }}>
            <SignatureCapture
                style={[{ flex: 1 }, styles.signature]}
                ref="sign"
                onSaveEvent={this._onSaveEvent}
                onDragEvent={this._onDragEvent}
                saveImageFileInExtStorage={true}
                showNativeButtons={false}
                showTitleLabel={false}
                viewMode={"landscape"}
                
            />
            <View style={{ height:convertHeight("20%"), flexDirection: "row" }}>
                <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => { this.saveSign() }} >
                    <Text>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => { this.resetSign() }} >
                    <Text>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => { this.props.onCancel() }} >
                    <Text>Cancel</Text>
                </TouchableOpacity>

            </View>
        </View>
    }

}
const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});

export default SignatureViewModel;