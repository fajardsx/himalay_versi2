import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Constant from '../global/Constant';
import { addLocal, convertHeight, convertWidth } from "../global/Global";
import { connect } from 'react-redux';
import ACTION_TYPE from "../redux/actions/actions";
import { moderateScale } from "../styleapp/scaling";

const styles = StyleSheet.create({
    mainContent: {
        // flex: 1,
        alignItems: 'center',
        //justifyContent:"space-around",
    },
    imagesplice: {
        width: moderateScale(100),
        //aspectRatio: 1,
        //marginTop: moderateScale(2)
    },
    image: {
        width: convertWidth(30),
        height: convertHeight(30),
        marginVertical: '1%'
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    }

});

const slides = [
    {
        key: 'splashIntro1',
        titles: 'Himalaya',
        subtitles: 'Increase Your Sales',
        des: 'Save Your Cost By going digital, you can save cost of printing, distribution, and transportation.',
        image: require("../../assets/onboarding_1.png"),
        imageStyle: styles.imagesplice
    },
    {
        key: 'splashIntro2',
        titles: 'Himalaya',
        subtitles: 'Achieve Your Goals',
        des: 'Monitor Your Resources Easily track and monitor your employees and their work.',
        image: require("../../assets/onboarding_2.png"),
        imageStyle: styles.imagesplice
    },
    {
        key: 'splashIntro3',
        titles: 'Himalaya',
        subtitles: 'Effective & Efficient',
        des: 'More effective & efficient marketing tool than conventional way.',
        image: require("../../assets/onboarding_3.png"),
        imageStyle: styles.imagesplice
    }
];
class SplashScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    _onDone = () => {
        // User finished the introduction. Show "real" app
        var data = {
            firstopen: true
        };
        this.props.updatestatusisfirst(false)
        addLocal(Constant.KEYFIRST, data);
        this.props.navigation.navigate(Constant.VM_LOGIN_SCREEN);
    }
    _onSkip = () => {
        // User skipped the introduction. Show "real" app
        var data = {
            firstopen: true
        };
        this.props.updatestatusisfirst(false)
        addLocal(Constant.KEYFIRST, data);
        this.props.navigation.navigate(Constant.VM_LOGIN_SCREEN);
    }
    _renderDoneButton = () => {
        return (<View style={{ width: '100%', backgroundColor: 'rgba(0,0,0,1)' }}>
            <Text>{"SKIP"}</Text>
        </View>);
    }
    _renderSlide = props => {
        console.log(props)
        return (
            <View style={[styles.mainContent, { flex: 1, paddingHorizontal: moderateScale(140), backgroundColor: '#FFFFFF' }]}>
                <Image
                    style={{ width: convertWidth('20%'), height: convertHeight('10%'), marginTop: '3%' }}
                    resizeMode={'contain'}
                    source={require("../../assets/logo_himalaya.png")}
                />
                <Image
                    style={props.item.imageStyle}
                    resizeMode={'contain'}
                    source={props.item.image}
                />
                <Text style={{
                    color: '#137365',
                    backgroundColor: 'transparent',
                    textAlign: 'center',
                    fontSize: moderateScale(26),
                    fontFamily: Constant.POPPINS_MEDIUM,

                    //marginVertical: '1%'

                }}>{props.item.subtitles}</Text>
                <Text style={{
                    color: '#777582',
                    backgroundColor: 'transparent',
                    textAlign: 'center', fontSize: moderateScale(15),
                    fontFamily: Constant.POPPINS_REG,
                    letterSpacing: 2
                }}>{props.item.des}</Text>
            </View>
        )
    }
    render() {
        return (<View style={{ flex: 1 }}>
            <AppIntroSlider
                dotStyle={{
                    backgroundColor: 'rgba(255, 255, 255,0.1)', width: 15, borderRadius: 7.5, height: 15, borderColor: '#000', borderWidth: 3
                }}
                activeDotStyle={{
                    width: 15, height: 15, borderRadius: 7.5, backgroundColor: 'rgba(22, 22, 22,0.9)'
                }}
                buttonStyle={{
                    width: '100%',
                    marginHorizontal: 0,
                    fontFamily: Constant.POPPINS_SEMIBOLD,
                }}
                slides={slides}
                renderItem={this._renderSlide}
                onDone={this._onDone}

            />
            <TouchableOpacity style={{
                Width: convertWidth('100%'),
                height: convertHeight('10%'),
                backgroundColor: '#F4F4F6',
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={() => this._onDone()}
            >
                <Text style={{ fontFamily: Constant.POPPINS_REG, fontSize: convertWidth('2%'), color: '#000' }}>{"SKIP"}</Text>
            </TouchableOpacity>
        </View>

        );
    }
}

function mapStateToProps(state) {
    return {
        isFirst: state.firstopen,
    };
}
function dispatchToProps(dispatch) {
    return {
        updatestatusisfirst: isfirst =>
            dispatch({ type: ACTION_TYPE.ISFIRST, value: isfirst }),
    };
}
export default connect(
    mapStateToProps,
    dispatchToProps,
)(SplashScreen);