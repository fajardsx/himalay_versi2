import React from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import posed from 'react-native-pose'
import ShadowView from 'react-native-shadow-view'
//
import Constant from '../../../global/Constant';
import { convertHeight, convertWidth, callToast } from '../../../global/Global';
import PAGE_ID from "../config/pagemanager";
import { ScrollView } from "react-native-gesture-handler";
import user from "../../../global/user";

class Edetailing_Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myposition: {},
            data: null,
            datahospital: null,
            currentHome:0,
            currentSpecial:null
        }
        this.fadeGlow =new Animated.Value(0);
    }
    componentDidMount() {
        console.log(this.props.datas)
       
        this.startAnimGlow()
    }


    onEndPress = () => {
        const { currentSpecial } = this.state;
        let subSpecialis = PAGE_ID.LIST_BAB[currentSpecial];
        let dataDuration = PAGE_ID.GenerateResulthTime(subSpecialis);
        setTimeout(() => {
            PAGE_ID.resetAllPage();
            this.props.onEnd(this.props.datas, dataDuration);
        }, 2000);
       
    }
    onGenerateData(){
        const { currentSpecial } = this.state;
        let subSpecialis = PAGE_ID.LIST_BAB[currentSpecial];
        PAGE_ID.GenerateResulthTime(subSpecialis);
       
    }
    exitSubMenu(){
        console.log("main menu")
        this.setState({
            currentHome:0
        })
    }
    renderHomePage(){
        const {currentHome} = this.state;
        if(currentHome == 0){
          
            return this.setHome();
        }
        if(currentHome == 1){
           // return this.setPageSpecialis();
           return this.setPageSpecialis();
        }
    }
    openSubPageHome(id,_currentSpecial=null){
        let check = _currentSpecial;
        if (this.props.datas.speciality_name != check.toUpperCase()){
            //callToast("this not Doctor Speciality")
            if (this.props.enable){
               // return;
            }
          
        }
        this.setState({
            currentHome:id,
            currentSpecial: PAGE_ID.LIST_BAB[_currentSpecial]
        }, () => this.props.stCurrentSpecialisPage(_currentSpecial,this.state.currentSpecial))
        //this.props._btnPress(1)
    }
    /////SUB MENU BUTTON
    getObatIcon(names){
        switch (names) {
            case "Ashvagandha":   
                return require('../../../../assets/edetailing/ashvagandha1/obat.png');
            case "Cystone":   
                return require('../../../../assets/edetailing/cystone1/obatimage.png');
            case "Tentex Royal":   
                return require('../../../../assets/edetailing/tentexroyal1/obat.png');
            case "Kapikachhu":   
                return require('../../../../assets/edetailing/kapikachhu1/obat.png');
            case "Shatavari":   
                return require('../../../../assets/edetailing/shatavari1/obat.png');
            case "Gokshura":   
                return require('../../../../assets/edetailing/gokshura/obat.png');
            case "Liv.52 DS":   
                return require('../../../../assets/edetailing/liv52ds1/obat.png');
            default:
                break;
        }
    }
    getNameIcon(names){
        if(names=="Others"){
            return <Image
                style={{
                    width: convertWidth('17%'),
                    height: convertWidth('17%'),
                }}
                resizeMode={'contain'}
                source={require('../../../../assets/edetailing/home/Group_12_tanpa_text.png')}
            />
        }else{
            return <View style={{
                width: convertWidth('17%'),
                height: convertWidth('17%'),
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Image
                    style={{
                        width: convertWidth('17%'),
                        height: convertWidth('17%'),
                        position: 'absolute'
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/lingkaran.png')}
                />
                <Image
                    style={{
                        width: convertWidth('14%'),
                        height: convertWidth('14%'),
                    }}
                    resizeMode={'contain'}
                    source={this.getObatIcon(names)}
                />
            </View>
        }
    }
    renderMenuSpecialis(data){
        let buttondata = [];
        data.forEach((res, index) => {
           // console.log('btn',res)
            let spp = index%2;
            let firstPage = res.page[0].id
            //console.log(spp)
            buttondata.push(<TouchableOpacity
                key={index}
                style={{
                    //backgroundColor: '#fff',
                    // position: 'absolute',
                    width: convertWidth('17%'),
                    height: convertWidth('25%'),
                    borderRadius: convertWidth('5%'),
                    marginHorizontal: convertWidth('1%'),
                    top: convertHeight(spp==1?'51%':'36%'),
                   // left: convertWidth('21%'),
                    alignItems: 'center'
                }}
                onPress={() => this.props._btnPress(firstPage)}
            >
               {this.getNameIcon(res.name)}
                <Text multiline style={styles.TextTitle2} >{res.name}</Text>
            </TouchableOpacity>);
        })
        return buttondata;
    }
    //////////////////////////////
    setPageSpecialis(){
        const {currentSpecial} = this.state;
        if(currentSpecial!=null){
            let subSpecialis = currentSpecial;
            //console.log('sub specialis',subSpecialis);
            this.props.setListPage(subSpecialis)
            return (<View style={{
                width: convertWidth('100%'),
                height: convertWidth('100%'),
                position: 'absolute',
                //backgroundColor:'#000'
            }}>
                <Image
                    style={{
                        position: 'absolute',
                        width: convertWidth('30%'),
                        height: convertWidth('6.5%'),
                        left: convertWidth('35%'),
                        top: convertHeight('7%'),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/logo.png')}
                />
                {subSpecialis.length > 5 && 
                <ScrollView horizontal>
                    {this.renderMenuSpecialis(subSpecialis)}
                </ScrollView>
                }
                {subSpecialis.length > 0 && subSpecialis.length <= 5 &&
                    <View style={{flexDirection: 'row',justifyContent:'center'}}>
                        {this.renderMenuSpecialis(subSpecialis)}
                    </View>
                }
            
            </View>);

        }
    }
    startAnimGlow(){
       
            Animated.sequence([
                Animated.timing(this.fadeGlow, {
                    toValue: 1,
                    duration: 1000,
                    delay: 500,
                }),
                Animated.timing(this.fadeGlow, {
                    toValue: 0,
                    duration: 1000,
                    delay: 1000,
                })
            ]).start(event=>{if(event.finished){this.startAnimGlow()}})
    }
    addGlow(targetspecial,sizeiconbg){
        //const { datas, speciality_name } = this.props;
        let upp = targetspecial;
       // console.log(this.props.datas);
        //console.log("GLOW " + this.props.datas.speciality_name+" "+upp.toUpperCase());
        if (this.props.datas.speciality_name == upp.toUpperCase()){
            return <Animated.View
                style={{
                    position: 'absolute',
                    opacity: this.fadeGlow,
                }}
            >
                <ShadowView
                    style={{
                        width: convertWidth(sizeiconbg),
                        height: convertWidth(sizeiconbg),
                        borderRadius: convertWidth('5%'),
                        top: 0,
                        backgroundColor: 'transparent',
                        shadowColor: '#fff',
                        shadowOffset: {
                            width: 0, height: 0,
                        },
                        shadowOpacity: 0.7,
                        shadowRadius: 20,
                    }}
                />
            </Animated.View>
        }
        
    }
    setHome(){
        const { datas, speciality_name} = this.props;
        let sizeiconbg='11%';
        let sizeIconContainer='13%';
        let sizeicon='12%';
        return (<View style={{
            width: convertWidth('100%'),
            height: convertWidth('100%'),
            position: 'absolute',
            //backgroundColor:'#000'
            alignItems:'center'
        }}>
            <Image
                style={{
                    position: 'absolute',
                    width: convertWidth('30%'),
                    height: convertWidth('6.5%'),
                    left: convertWidth('35%'),
                    top: convertHeight('20%'),
                }}
                resizeMode={'contain'}
                source={require('../../../../assets/edetailing/home/logo.png')}
            />

                <View style={{flexDirection: 'row',marginLeft: convertWidth('5%')}}>
               
            <TouchableOpacity
                style={{
                    //backgroundColor: '#fff',
                   // position: 'absolute',
                    width: convertWidth(sizeIconContainer),
                    height: convertWidth('17%'),
                    borderRadius: convertWidth('5%'),
                    //backgroundColor: '#FFFFFF',
                    top: convertHeight('41%'),
                    //left: convertWidth('2%'),
                    alignItems: 'center'
                }}
                    onPress={() => this.openSubPageHome(1, PAGE_ID.TITLE_AESTHETIC)}
            >
                    {this.addGlow(PAGE_ID.TITLE_AESTHETIC,sizeiconbg)}
                <Image
                    style={{
                        width: convertWidth(sizeiconbg),
                        height: convertWidth(sizeiconbg),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/lingkaran.png')}
                />
                <Image
                    style={{
                        width: convertWidth('6%'),
                        height: convertWidth(sizeicon),
                        position: 'absolute'
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/Group_15.png')}
                />
                <Text style={styles.TextTitle} >Aesthetic</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    //backgroundColor: '#fff',
                   // position: 'absolute',
                    width: convertWidth(sizeIconContainer),
                    height: convertWidth('17%'),
                    borderRadius: convertWidth('5%'),
                    //backgroundColor: '#FFFFFF',
                    top: convertHeight('58%'),
                    //left: convertWidth('15%'),
                    alignItems: 'center'
                }}
                    onPress={() => this.openSubPageHome(1,PAGE_ID.TITLE_UROLOGY)}
            >
                    {this.addGlow(PAGE_ID.TITLE_UROLOGY, sizeiconbg)}
                <Image
                    style={{
                        width: convertWidth(sizeiconbg),
                        height: convertWidth(sizeiconbg),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/lingkaran.png')}
                />
                <Image
                    style={{
                        width: convertWidth('6%'),
                        height: convertWidth(sizeicon),
                        position: 'absolute'
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/kidney.png')}
                />
                <Text style={styles.TextTitle} >Urology</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={{
                    //backgroundColor: '#fff',
                   // position: 'absolute',
                    width: convertWidth(sizeIconContainer),
                    height: convertWidth('17%'),
                    borderRadius: convertWidth('5%'),
                    //backgroundColor: '#FFFFFF',
                    top: convertHeight('41%'),
                   // left: convertWidth('28%'),
                    alignItems: 'center'
                }}
                    onPress={() => this.openSubPageHome(1, PAGE_ID.TITLE_OBEGYN)}
            >
                    {this.addGlow(PAGE_ID.TITLE_OBEGYN, sizeiconbg)}
                <Image
                    style={{
                        width: convertWidth(sizeiconbg),
                        height: convertWidth(sizeiconbg),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/lingkaran.png')}
                />
                <Image
                    style={{
                        width: convertWidth('6%'),
                        height: convertWidth(sizeicon),
                        position: 'absolute'
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/venus.png')}
                />
                <Text style={styles.TextTitle} >Obgyn</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    //backgroundColor: '#fff',
                    //position: 'absolute',
                    width: convertWidth(sizeIconContainer),
                    height: convertWidth('17%'),
                    borderRadius: convertWidth('5%'),
                    //backgroundColor: '#FFFFFF',
                    top: convertHeight('58%'),
                    //left: convertWidth('42%'),
                    alignItems: 'center'
                }}
                    onPress={() => this.openSubPageHome(1, PAGE_ID.TITLE_ANALOGY)}
            >
                    {this.addGlow(PAGE_ID.TITLE_ANALOGY, sizeiconbg)}
                <Image
                    style={{
                        width: convertWidth(sizeiconbg),
                        height: convertWidth(sizeiconbg),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/lingkaran.png')}
                />
                <Image
                    style={{
                        width: convertWidth('6%'),
                        height: convertWidth(sizeicon),
                        position: 'absolute'
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/male_copy.png')}
                />
                <Text style={styles.TextTitle} >Andrology</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    //backgroundColor: '#fff',
                   // position: 'absolute',
                    width: convertWidth(sizeIconContainer),
                    height: convertWidth('17%'),
                    borderRadius: convertWidth('5%'),
                    //backgroundColor: '#FFFFFF',
                    top: convertHeight('41%'),
                   // left: convertWidth('56%'),
                    alignItems: 'center'
                }}
                    onPress={() => this.openSubPageHome(1, PAGE_ID.TITLE_GP)}
            >
                    {this.addGlow(PAGE_ID.TITLE_GP, sizeiconbg)}
                <Image
                    style={{
                        width: convertWidth(sizeiconbg),
                        height: convertWidth(sizeiconbg),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/lingkaran.png')}
                />
                <Image
                    style={{
                        width: convertWidth('6%'),
                        height: convertWidth(sizeicon),
                        position: 'absolute'
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/stethoscope_copy.png')}
                />
                <Text style={styles.TextTitle} >{"General \n Practioner"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    //backgroundColor: '#fff',
                   // position: 'absolute',
                    width: convertWidth(sizeIconContainer),
                    height: convertWidth('17%'),
                    borderRadius: convertWidth('5%'),
                    //backgroundColor: '#FFFFFF',
                    top: convertHeight('58%'),
                  //  left: convertWidth('70%'),
                    alignItems: 'center'
                }}
                    onPress={() => this.openSubPageHome(1, PAGE_ID.TITLE_INTERNIST)}
            >
                    {this.addGlow(PAGE_ID.TITLE_INTERNIST, sizeiconbg)}
                <Image
                    style={{
                        width: convertWidth(sizeiconbg),
                        height: convertWidth(sizeiconbg),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/lingkaran.png')}
                />
                <Image
                    style={{
                        width: convertWidth('6%'),
                            height: convertWidth(sizeicon),
                        position: 'absolute'
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/liver.png')}
                />
                <Text style={styles.TextTitle} >{"Internist"}</Text>
            </TouchableOpacity>
{
    /*
 <TouchableOpacity
                style={{
                    //backgroundColor: '#fff',
                   // position: 'absolute',
                    width: convertWidth(sizeIconContainer),
                    height: convertWidth('17%'),
                    borderRadius: convertWidth('5%'),
                    //backgroundColor: '#FFFFFF',
                    top: convertHeight('41%'),
                   // left: convertWidth('82%'),
                    alignItems: 'center'
                }}
                    onPress={() => this.openSubPageHome(1, PAGE_ID.TITLE_OTHER)}
            >

                <Image
                    style={{
                        width: convertWidth(sizeiconbg),
                        height: convertWidth(sizeiconbg),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/Group_12_tanpa_text.png')}
                />

                <Text style={styles.TextTitle} >{"Other"}</Text>
            </TouchableOpacity>
    */
}
           
            </View>
        </View>);
    }
    _logo(){
        return <View style={{
            position: 'absolute',
             width: convertWidth('100%'),
            height: convertHeight('100%'),
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                style={{ width: convertWidth('40%'), height: convertHeight('10%') }}
                resizeMode={'contain'}
                source={require("../../../../assets/ASET/Himalaya-White.png")}
            />
            </View>
    }
    render() {
        const{datas} =this.props;
        const { currentHome} =this.state;
        return <View style={{
            backgroundColor: Constant.COLOR_GREEN2, width: convertWidth('100%'),
            height: convertHeight('100%')}}
          
            >
            <Image
                style={{
                    width: convertWidth('100%'),
                    height: convertHeight('100%'),
                }}
                resizeMode={'stretch'}
                source={require('../../../../assets/edetailing/home/bg.png')}
            />
            {
               console.log("CONTRY",user.getUserContry())
            }
            {user.getUserContry() == Constant.COUNTRY_INA &&
                this.renderHomePage()
            }
            {user.getUserContry() == Constant.COUNTRY_SGH &&
                this._logo()
            }
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
    },
    TextTitle: {
        color: "#eeeeee",
        fontFamily: Constant.POPPINS_SEMIBOLD,
        width: convertWidth('20%'),
        textAlign: 'center',
        marginTop: convertHeight('2%'),
        //borderWidth:1,
        fontSize: convertWidth('1.5%'),

    },
    TextTitle2: {
        color: "#eeeeee",
        fontFamily: Constant.POPPINS_SEMIBOLD,
        width: convertWidth('20%'),
        textAlign: 'center',
        marginTop: convertHeight('2%'),
        //borderWidth:1,
        fontSize: convertWidth('1.8%'),

    },
    iconnofocus:{
        width: convertWidth('12%'),
        height: convertHeight('12%'),
    },
    iconfocus: {
        width: convertWidth('12%'),
        height: convertHeight('12%'),
    }
});
/*
   <TouchableOpacity
                style={[Styleapp._buttons, Styleapp._bubble]}
                onPress={() => this.onOpenSignature()}
            >
                <Text>Signature Page</Text>
            </TouchableOpacity>

    setPageUrology(){
        return (<View style={{
                width: convertWidth('100%'),
                height: convertWidth('100%'),
                position: 'absolute',
                //backgroundColor:'#000'
            }}>
            <Image
                style={{
                    position: 'absolute',
                    width: convertWidth('30%'),
                    height: convertWidth('6.5%'),
                    left: convertWidth('35%'),
                    top: convertHeight('7%'),
                }}
                resizeMode={'contain'}
                source={require('../../../../assets/edetailing/home/logo.png')}
            />


            <TouchableOpacity
                style={{
                    //backgroundColor: '#fff',
                    position: 'absolute',
                    width: convertWidth('17%'),
                    height: convertWidth('17%'),
                    borderRadius: convertWidth('5%'),

                    top: convertHeight('41%'),
                    left: convertWidth('21%'),
                    alignItems: 'center'
                }}
                onPress={() => this.props._btnPress(1)}
            >
                <Image
                    style={{
                        width: convertWidth('17%'),
                        height: convertWidth('17%'),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/featured_prod_btn.png')}
                />
                <Text style={styles.TextTitle2} >Cystone</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    //backgroundColor: '#fff',
                    position: 'absolute',
                    width: convertWidth('17%'),
                    height: convertWidth('17%'),
                    borderRadius: convertWidth('5%'),

                    top: convertHeight('25%'),
                    right: convertWidth('42%'),
                    alignItems: 'center'
                }}
                onPress={() => this.props._btnPress(PAGE_ID.Tentex_Royal_Urology_1_ID.id)}
            >
                <Image
                    style={{
                        width: convertWidth('17%'),
                        height: convertWidth('17%'),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/pillar_product_btn.png')}
                />
                <Text style={styles.TextTitle2} >Tentex Royal</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    //backgroundColor: '#fff',
                    position: 'absolute',
                    width: convertWidth('17%'),
                    height: convertWidth('17%'),
                    borderRadius: convertWidth('5%'),

                    top: convertHeight('41%'),
                    right: convertWidth('22%'),
                    alignItems: 'center'
                }}
                onPress={() => this.props._btnPress(PAGE_ID.Kapipachuu_1_ID.id)}
            >
                <Image
                    style={{
                        width: convertWidth('17%'),
                        height: convertWidth('17%'),
                    }}
                    resizeMode={'contain'}
                    source={require('../../../../assets/edetailing/home/growth_product_btn.png')}
                />
                <Text style={styles.TextTitle2} >Kapikachhu</Text>
            </TouchableOpacity>
            </View>
        )
    }
*/
export default Edetailing_Homepage;