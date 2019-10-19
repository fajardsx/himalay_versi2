import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";

//
import Constant from '../../global/Constant';
import { Styleapp } from '../../styleapp';

import Headers from '../module_header'



class ScheduleViewModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
        }
    }
    componentDidMount() {

    }

  

    render() {
        return <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
            <Headers navigation={this.props.navigation} />
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

export default ScheduleViewModel;