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

//
let path = '../../../../../assets/edetailing/';
const resourceType = 'base64';

class Liv52DS_page4_core extends React.Component {

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
    //console.log(this.props.datas)
    this.setState({
      timers: Number(this.props.page_id.duration)
    }, () => {
      this.startAnim();
      this.startTime();
    });
  }
  componentWillUnmount() {

    this.props.page_id.duration = this.state.timers;
    ///console.log(this.props.page_id);
    clearInterval(this.timerinterval);
  }
  startTime() {
    this.timerinterval = setInterval(() => {
      this.setState((prevState) => ({
        timers: prevState.timers + 1
      }));
    }, 1000);
  }

  _onBtnPopPress(id) {
    this.setState({
      currentPop: id
    })
  }
  _onBtnPopClosePress() {
    this.setState({
      currentPop: 0
    })
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
        <Image
          style={{
            position: "absolute",
            width: convertWidth("15%"),
            height: convertHeight("6.5%"),
            left: convertWidth("81%"),
            top: convertHeight("2%")
          }}
          resizeMode={"contain"}
          source={require(path + "bg/logo.png")}
        />


        <Animated.Image
          style={{
            position: "absolute",
            width: convertWidth("22%"),
            height: convertHeight("15%"),
            opacity: this.fadeTitle,
            left: convertWidth('38%'),
            top: convertHeight('5%'),

            //backgroundColor: '#000',
          }
          }
          resizeMode={"contain"}
          source={require(path + "liv52ds1/title2.png")}
        />

        <Text style={{
          color: "#EA5B1B",
          fontFamily: Constant.POPPINS_BOLD,
          width: convertWidth('20%'),
          textAlign: 'left',
          marginLeft: convertWidth('9%'),
          marginTop: convertWidth('10%'),
          //borderWidth:1,
          fontSize: convertWidth('2.3%'),

        }}>
          Clinical Trial
              </Text>
        <Animated.View style={{
          width: convertWidth("25%"),
          height: convertHeight("18%"),
          left: convertWidth('8%'),
          top: convertHeight('30%'),
          position: "absolute"
        }}>
          <TouchableOpacity
            onPress={() => this.props.showPdf('Evaluasi Liv52.DS', '/data/user/0/com.himalaya/files/files48.pdf')}
          >
            <Image
              style={{

                width: convertWidth("25%"),
                height: convertHeight("18%"),

              }
              }
              resizeMode={"contain"}
              source={require(path + "liv52ds4/btnicon1.png")}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{
          width: convertWidth("25%"),
          height: convertHeight("18%"),
          left: convertWidth('8%'),
          top: convertHeight('58%'),
          position: "absolute"
        }}>
          <TouchableOpacity
            onPress={() => this.props.showPdf('Liv.52 Meta-Analysis', '/data/user/0/com.himalaya/files/files49.pdf')}
          >
            <Image
              style={{

                width: convertWidth("25%"),
                height: convertHeight("18%"),

              }
              }
              resizeMode={"contain"}
              source={require(path + "liv52ds4/btnicon2.png")}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{
          width: convertWidth("25%"),
          height: convertHeight("18%"),
          left: convertWidth('38%'),
          top: convertHeight('30%'),
          position: "absolute",
          // backgroundColor: '#000'
        }}>
          <TouchableOpacity
            onPress={() => this.props.showPdf('Liv.52 Sebagai Adjuvan pada terapi Anti-TB', '/data/user/0/com.himalaya/files/files50.pdf')}
          >
            <Image
              style={{

                width: convertWidth("25%"),
                height: convertHeight("18%"),
                //backgroundColor: '#000'
              }
              }
              resizeMode={"contain"}
              source={require(path + "liv52ds4/btnicon3.png")}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{
          width: convertWidth("25%"),
          height: convertHeight("18%"),
          left: convertWidth('38%'),
          top: convertHeight('58%'),
          position: "absolute"
        }}>
          <TouchableOpacity
            onPress={() => this.props.showPdf('Liv.52 Sebagai Adjuvan pada terapi Statin', '/data/user/0/com.himalaya/files/files51.pdf')}
          >
            <Image
              style={{

                width: convertWidth("25%"),
                height: convertHeight("18%"),

              }
              }
              resizeMode={"contain"}
              source={require(path + "liv52ds4/btnicon4.png")}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{
          width: convertWidth("25%"),
          height: convertHeight("18%"),
          left: convertWidth('68%'),
          top: convertHeight('30%'),
          position: "absolute",
          // backgroundColor: '#000'
        }}>
          <TouchableOpacity
            onPress={() => this.props.showPdf('Liv.52 Sebagai Adjuvan pada Radioterapi dan Kemoterapi', '/data/user/0/com.himalaya/files/files52.pdf')}
          >
            <Image
              style={{

                width: convertWidth("25%"),
                height: convertHeight("18%"),
                //backgroundColor: '#000'
              }
              }
              resizeMode={"contain"}
              source={require(path + "liv52ds4/btnicon5.png")}
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
export default Liv52DS_page4_core;