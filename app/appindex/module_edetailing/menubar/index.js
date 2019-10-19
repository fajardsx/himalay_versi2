import React from "react";
import {StyleSheet, Text, View,Animated,Easing, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
//
import Constant from '../../../global/Constant';
import { convertHeight, convertWidth } from '../../../global/Global';
import PAGE_ID from "../config/pagemanager";
import user from "../../../global/user";




const BoxMenu = posed.View({
    visible: {
    y: convertHeight("82%"),
        transition: { duration: 500 }
    },
    hidden: {
      y: convertHeight("120%"),
        transition: { duration: 500 }
    }
})
let path = '../../../../assets/edetailing/';
class Menubarpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          myposition: {},
          data: null,
          datahospital: null,
          isVisible:false
        };
    }
    componentDidMount() {
        console.log(this.props.datas)
    }
    showMenu(){
        this.setState({
            isVisible:!this.state.isVisible
        })
    }
    onEndPress = () => {
      console.log("end", this.props.datas.isdemos)
      if (this.props.datas.isdemos == false){
        this.props.showLoading();
        PAGE_ID.GenerateResulthTime(this.props._currentPage,this.onCompleteGenerateTime.bind(this));
       /* setTimeout(() => {
          this.props.onEnd(this.props.datas, dataDuration);
        }, 2000);*/
      } else if (this.props.datas.isdemos == true) {
       // onEndDemo
      
        this.props.onEndDemo();
      }
     
    }
    onCompleteGenerateTime(result){
      this.props.onEnd(this.props.datas, result);
    }
   
    onPressMenuSelectBtn(id){
      this.showMenu();
      this.props.onGoPage(id);
    }
    onPressMenuHome(){
      this.showMenu();
      this.props.onGoHome();
    }
    
    _renderMiniMenu(){
      const {_currentPage} = this.props;
      if (_currentPage!=null){
        if (_currentPage.detail.length > 0){
          let menucontainer = [];
          //Home
          let _btnHome = <TouchableOpacity
            key={0}
            style={{
              flex: 1,
              // marginTop: convertHeight('1%'),
              // position: 'absolute',
              height: convertWidth('5%'),
              margin: convertWidth('1.2%'),
              justifyContent: "center",
              alignItems: 'center',
              //left: convertWidth('2%'),
              // top: 0,
              backgroundColor: '#06755F'
            }}
            onPress={() => this.onPressMenuHome()}
          >
            <Text style={[styles.TextTitle2, { textAlignVertical: 'center', width: convertWidth('20%'), height: convertWidth('5%') }]}>{'Home'}</Text>
          </TouchableOpacity>
          menucontainer.push(_btnHome)
      
          _currentPage.detail.map((res,index) => {
            let _btn = <TouchableOpacity
              key={index+1}  
            style={{
                flex: 1,
               // marginTop: convertHeight('1%'),
               // position: 'absolute',
               height:convertWidth('5%'),
                margin: convertWidth('1%'),
                justifyContent:"center",
                alignItems: 'center',
                //left: convertWidth('2%'),
               // top: 0,
                backgroundColor: '#06755F'
              }}
              onPress={() => this.onPressMenuSelectBtn(res.page[0].id)}
            >
              <Text style={[styles.TextTitle2, {textAlignVertical:'center', width: convertWidth('20%'), height: convertWidth('5%')}]}>{res.name}</Text>
            </TouchableOpacity>
            menucontainer.push(_btn)
          })
          return menucontainer;
        }
        
      }
    }
    
    render() {
      const { datas, _currentPage } = this.props;
        return (
          <View
            style={{
              position: "absolute",
              width: convertWidth("100%"),
              height: convertHeight("100%"),
              //backgroundColor: "#F9F9F2"
            }}
          >
            {user.getUserContry() == Constant.COUNTRY_INA &&
               <TouchableOpacity
              style={{
                position: "absolute",
                top: convertHeight("92%"),
                left: convertWidth("10%")
              }}
              onPress={()=>this.showMenu()}
            >
              <Image
                style={{
                  width: convertWidth("20%"),
                  height: convertHeight("10%")
                }}
                resizeMode={"contain"}
                source={require(path + "bg/mainmenubtn.png")}
              />
            </TouchableOpacity>
            }
           


            {
              datas.enable == true &&
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  top: convertHeight('92%'),
                  width: convertWidth('11%'),
                  height: convertWidth('5%'),
                 // backgroundColor: '#000'
                }}
                onPress={() => this.onEndPress()}
              >
                <Image
                  style={{
                    width: convertWidth('11%'),
                    height: convertWidth('5%'),
                   // backgroundColor: '#FFFFFF'
                  }}
                  resizeMode={'contain'}
                  source={require('../../../../assets/edetailing/home/end_btn.png')}
                />

              </TouchableOpacity>
            }
            {user.getUserContry() == Constant.COUNTRY_INA &&
              <BoxMenu
                style={{
                  width: convertWidth("100%"),
                  height: convertHeight("25%"),

                  justifyContent: 'center'
                }}
                pose={this.state.isVisible == true ? "visible" : "hidden"}
              >
                <TouchableOpacity

                  style={{
                    //flex: 1,
                    // marginTop: convertHeight('1%'),
                    position: 'absolute',
                    height: convertWidth('3%'),
                    width: convertWidth('10%'),
                    // margin: convertWidth('1.2%'),
                    justifyContent: "center",
                    alignItems: 'center',
                    //left: convertWidth('2%'),
                    top: convertWidth('1.2%'),
                    backgroundColor: '#06755F'
                  }}
                  onPress={() => this.showMenu()}
                >
                  <Text style={[styles.TextTitle2, { textAlignVertical: 'center', width: convertWidth('20%'), height: convertWidth('5%') }]}>{'Close'}</Text>
                </TouchableOpacity>
                <View style={{
                  flexDirection: 'row', width: convertWidth("100%"),
                  backgroundColor: '#04846E',
                  height: convertHeight("12%"),
                  alignItems: 'center',
                }}
                // onPress={()=>this.showMenu()}
                >

                  {this._renderMiniMenu()}

                </View>

              </BoxMenu>
            }
           
          </View>
        );
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

    },
    TextTitle2: {
        color: "#CCD095",
        fontFamily: Constant.POPPINS_SEMIBOLD,
        width: convertWidth('30%'),
        textAlign: 'center',
        //borderWidth:1,
      fontSize: convertWidth('1.2%'),

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
export default Menubarpage;