import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    StatusBar,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';

import Constant from '../../global/Constant';
import {convertHeight,convertWidth, Global_getListSmallSync, callAlert} from '../../global/Global';

let that = null
export default class Headers extends Component {

    constructor(props) {
        super(props);
        this.state={
            sync_count:0,
            isMound:false
        }
        that = this
    }
    componentDidMount(){
        this.setState({
            isMound:true
        })
      
    }
    componentWillUnmount(){
        this.setState({
            isMound: false
        })
    }
    componentWillReceiveProps(){
        if(this.state.isMound== true){
            //this._refreshSyncCount()
        }
        
    }
    _refreshSyncCount(){
        console.log("REFRESH HEADER SYNC COUNT")
        Global_getListSmallSync().then(res => {
            console.log("sync : ", res)
            that.setState({
                sync_count: res.length
            });
        })
    }
   
    _handleResults(result) {

        if (this.props != null) {
            console.log(result);
            if (this.props.onsearch != undefined) {
                this.props.onsearch(result);
            }
        }
    }
    _handleValue(result) {
        console.log("value", result);

    }
    _pressBurger=()=>{
        if(this.props.burgeronpress){
            this.props.burgeronpress();
        }
    }
    headerState() {
        const { sync_count} = this.state;
        if (this.props) {
            return <View style={styleheader.header_container}>
                    <TouchableOpacity
                    //style={{height:convertHeight('5%'),borderWidth:0}}
                    onPress={this._pressBurger}
                    >
                        <Image
                            style={styleheader.burgerMenu}
                            resizeMode={'contain'}
                            source={require('../../../assets/ASET/BURGER_MENU.png')}
                        />
                      
                    
                    </TouchableOpacity>
                   
                    <Text style={styleheader.titleStyles}>
                        {this.props.titleheader}
                    </Text>
                <Image
                    style={styleheader.Logomenu}
                    resizeMode={'contain'}
                    source={require('../../../assets/ASET/Himalaya-White.png')}
                />
                <StatusBar backgroundColor={Constant.COLOR_GREEN1} hidden={false}/>
               
            </View>;
        }
    }
    render() {

        return this.headerState();
    }
}
/*
  {
                            sync_count>0 &&
                            <View style={{
                                width: convertWidth("2.5%"),
                                height: convertWidth("2.5%"),
                                borderRadius: convertWidth("2%"),
                                backgroundColor: Constant.COLOR_RED2,
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                fontSize: convertWidth('1.5%'), width: convertWidth('2.2%'),textAlignVertical:'center', height: convertWidth("2.5%"), color: "#fff", textAlign: 'center',
                                    fontFamily: Constant.POPPINS_LIGHT
                                }}>
                                {sync_count}
                                </Text>
                            </View>
                        }
*/
const styleheader = StyleSheet.create({
    header_container: {
        width: convertWidth('100%'),
        height: '20%',
        backgroundColor: Constant.COLOR_GREEN2,
        zIndex: 1,
        flexDirection: 'row'
    },
    inputTextContainer: {
        padding: 0, flex: 1, backgroundColor: "#ffffff", borderRadius: 5, margin: 10, justifyContent: 'center'
    },
    inputText: {
        flex: 1, color: '#000', fontSize: 18, textAlign: 'left', marginLeft: 10
    },
    inputPlaceHolderText: {
        color: '#000', fontSize: 16, textAlign: 'left', padding: 0, width: '100%', paddingLeft: "1%",
    },
    headerTitle_container: {
        width: '100%',
        flexDirection: 'row'
    },
    burgerMenu:{
        width: 18,
        height: 18,
        margin: convertWidth('2%'),
        marginHorizontal: 30,
        alignSelf: 'flex-start'
    },
    Logomenu:{
        width: convertWidth('15%'),
        height: convertHeight('10%'),
        position: 'absolute',
        right:convertWidth('2%')
       // marginTop: 10,
        //alignSelf: 'flex-start'
    },
    titleStyles: {
        width: convertWidth('75%'),
        color: '#ffffff',
        marginTop: convertHeight('1%'),
        fontSize: convertWidth('2.5%'),
        textAlign: 'center',
        fontFamily: Constant.POPPINS_LIGHT    
    }
});

Headers.propTypes = {
    navigation: PropTypes.any.isRequired,
    titleheader: PropTypes.string,
}

Headers.defaultProps = {
    navigation: null,
    titleheader: "Title",
}