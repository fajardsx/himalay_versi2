import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
//
import Constant from '../../global/Constant';
import { addLocal, convertHeight, convertWidth} from '../../global/Global';
import { Styleapp } from '../../styleapp';

import Headers from '../module_header'
import Timermanager from "./utils/TimerManag";


const styles = StyleSheet.create({
    mainContent: {
        // flex: 1,
        alignItems: 'center',
        //justifyContent:"space-around",
    },
    imagesplice: {
        width: convertWidth('100%'),
        height: convertHeight('90%'),
        marginVertical: convertHeight('7%')
    },
    image: {
        width: convertWidth("100%"),
        height: convertHeight("90%"),
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
        des: 'Easily add all your cellared beers into a single,\n easy to manage list',
        image: require("../../../assets/edetailing/e-detailing_tagara-01.jpg"),
        imageStyle: styles.imagesplice
    },
    {
        key: 'splashIntro2',
        titles: 'Himalaya',
        subtitles: 'Achieve Your Goals',
        des: 'Easily add all your cellared beers into a single,\n easy to manage list',
        image: require("../../../assets/edetailing/e-detailing_tagara-02.jpg"),
        imageStyle: styles.imagesplice
    },
    {
        key: 'splashIntro3',
        titles: 'Himalaya',
        subtitles: 'Effective & Efficient',
        des: 'Easily add all your cellared beers into a single,\n easy to manage list',
        image: require("../../../assets/edetailing/e-detailing_tagara-03.jpg"),
        imageStyle: styles.imagesplice
    }
    ,
    {
        key: 'splashIntro3',
        titles: 'Himalaya',
        subtitles: 'Effective & Efficient',
        des: 'Easily add all your cellared beers into a single,\n easy to manage list',
        image: require("../../../assets/edetailing/e-detailing_tagara-04.jpg"),
        imageStyle: styles.imagesplice
    }
];
class EdetailingPage1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
        }
    }
    componentDidMount() {

    }
    _onDone = () => {
        // User finished the introduction. Show "real" app
        var data = {
            firstopen: true
        };
        addLocal(Constant.KEYFIRST, data);
       // this.props.navigation.navigate(Constant.VM_LOGIN_SCREEN);
    }
    _onSkip = () => {
        // User skipped the introduction. Show "real" app
        var data = {
            firstopen: true
        };
        addLocal(Constant.KEYFIRST, data);
        //this.props.navigation.navigate(Constant.VM_LOGIN_SCREEN);
    }
    _renderDoneButton = () => {
        return (<View style={{ width: '100%', backgroundColor: 'rgba(0,0,0,1)' }}>
            <Text>{"SKIP"}</Text>
        </View>);
    }
    _renderSlide = props => {
        return (
            <View style={[styles.mainContent, { width: convertWidth('100%'), height: convertHeight('90%'), backgroundColor: '#FFFFFF' }]}>
             
                <Image
                    style={props.imageStyle}
                  // resizeMode={'contain'}
                    source={props.image}
                />
              
            </View>
        )
    }

    onOpenSignature = () => {
        this.props.screenProps.navigation.navigate(Constant.VM_SIGNATURE);
    }
    render() {
        return <View style={{ backgroundColor: Constant.COLOR_GREEN2, height: convertHeight('90%'), }}>
            <Timermanager/>
            <AppIntroSlider

                slides={slides}
                renderItem={this._renderSlide}
                onDone={this._onDone}

            />
        </View>
    }

}

/*
   <TouchableOpacity
                style={[Styleapp._buttons, Styleapp._bubble]}
                onPress={() => this.onOpenSignature()}
            >
                <Text>Signature Page</Text>
            </TouchableOpacity>
*/
export default EdetailingPage1;