import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import { convertWidth, convertHeight, callToast } from '../global/Global';
import Constant from '../global/Constant';

class ScreeErr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error:false,
            message:''
        };
    }
    componentDidCatch(err,errInfo){
        console.log("err ",err);
        console.log("info",errInfo);
        this.setState({
            error:true,
            message:errInfo.componentStack.toString()
        })
    }
   
    render() {
        const {error,message } = this.state;
        if(error){
            return <View style={{
                       flex:1,
                       justifyContent:'center',
                       alignItems: 'center'
                    }}>
                        {Constant.SHOW_MESSAGE && 
                            <ScrollView>
                                <Text>Something Went Wrong. Please Restart Apps</Text>
                                <Text >{message}</Text>
                            </ScrollView>
                        }
                        {Constant.SHOW_MESSAGE == false && 
                            
                                <Text>Something Went Wrong.  Please Restart Apps</Text>
                               
                        }
                       
                        
                    </View>
        }
        return this.props.children;
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


export default ScreeErr;
