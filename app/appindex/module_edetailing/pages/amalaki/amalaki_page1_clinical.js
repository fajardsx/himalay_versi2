import React from "react";
import { Platform, Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
// With Flow type annotations (https://flow.org/)
//import PDFView from 'react-native-view-pdf';
// Without Flow type annotations
// import PDFView from 'react-native-view-pdf/lib/index';

const resources = {
  file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
  url: 'https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf',
  base64: 'JVBERi0xLjMKJcfs...',
};
//
import Constant from '../../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../../global/Global';

let path = '../../../../../assets/edetailing/';
const resourceType = 'base64';

class Amalaki_page1_clinical extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myposition: {},
      data: null,
      datahospital: null,
      timers: 0,
      currentPop: 0
    }
    //lista anim
    this.fadeTitle = new Animated.Value(0);
    this.fadeSubTitle = new Animated.Value(0);

    this.xTitle = new Animated.ValueXY({ x: convertWidth('63%'), y: convertHeight('15%') });
    this.xSubTitle = new Animated.ValueXY({ x: convertWidth('63%'), y: convertHeight('25%') });

    this.fadebox1 = new Animated.Value(0);

    //this.xSubTitle = new Animated.ValueXY({ x:convertWidth('63%'), y: convertHeight('12%')});
  }
  componentDidMount() {

  }
  componentWillUnmount() {


  }


  render() {
    const { datas } = this.props;
    return (
      <View
        style={{
          width: convertWidth("100%"),
          height: convertHeight("100%")
        }}
      >



        <View style={{
          width: convertWidth("95%"),
          height: convertHeight("90%"),
          top: convertHeight("5%"),
          left: convertHeight("5%"),
          backgroundColor: '#fff',
          position: 'absolute',
          overflow: 'hidden',
          borderColor: '#dddbd3',
          borderRadius: convertHeight('2%'),
          borderWidth: convertHeight('1%'),
          // alignItems: 'center'
        }}>

          <Text style={{
            color: "#EA5B1B",
            fontFamily: Constant.POPPINS_SEMIBOLD,
            width: convertWidth('20%'),
            textAlign: 'left',
            marginLeft: convertWidth('3%'),
            marginTop: convertWidth('5%'),
            //borderWidth:1,
            fontSize: convertWidth('2.5%'),

          }}>
            Clinical Trial
              </Text>
          <Animated.View style={{
            width: convertWidth("40%"),
            height: convertHeight("22%"),
            left: convertWidth('2%'),
            top: convertHeight('25%'), position: "absolute"
          }}>
            <TouchableOpacity
              onPress={() => this.props.showPdf('Amalaki Antioxidant', '/data/user/0/com.himalaya/files/files63.pdf')}
            >
              <Image
                style={{

                  width: convertWidth("40%"),
                  height: convertHeight("22%"),

                }
                }
                resizeMode={"contain"}
                source={require(path + "amalaki1/pdfbox.png")}
              />
            </TouchableOpacity>
          </Animated.View>

        </View>
        <Animated.View
          style={{
            left: convertWidth("95%"),
            top: convertHeight("2.5%"),
            position: "absolute"
          }}
        >
          <TouchableOpacity onPress={() => this.props.onclose()}>
            <Image
              style={{
                width: convertWidth("4%"),
                height: convertWidth("4%"),
              }}
              resizeMode={"contain"}
              source={require(path + "bg/closepopbtn.png")}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  //anim
  startAnim() {
    Animated.sequence([
      Animated.delay(500),

      Animated.timing(this.fadeTitle, { toValue: 1, duration: Constant.DURATION_FADE }),

      Animated.timing(this.fadebox1, { toValue: 1, duration: Constant.DURATION_FADE }),

    ]).start();


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
  },
  TextTitle: {
    color: "#eeeeee",
    fontFamily: Constant.POPPINS_SEMIBOLD,
    width: convertWidth('20%'),
    textAlign: 'center',
    //borderWidth:1,
    fontSize: convertWidth('1.8%'),

  }
});
/*
   <TouchableOpacity
                style={[Styleapp._buttons, Styleapp._bubble]}
                onPress={() => this.onOpenSignature()}
            >
                <Text>Signature Page</Text>
            </TouchableOpacity>
*/
export default Amalaki_page1_clinical;