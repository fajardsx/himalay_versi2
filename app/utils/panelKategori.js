import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Image,
    WebView,
} from 'react-native'
import Constant from "../global/Constant";
import {convertHeight,convertWidth} from "../global/Global";

const minHigh = convertWidth('5%');
class Panels extends Component{
    constructor(props){
        super(props)
        this.state = {
            titles1:props.titles1,
            titles2:props.titles2,
            expanded:false,
            animation:new Animated.Value(),
            init:true,
        }
    }
    initital(){
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
        finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation, {
                toValue: finalValue
            }
        ).start();
    }
    expandedPanel(){
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : minHigh,
          finalValue = this.state.expanded ? minHigh : this.state.maxHeight + this.state.minHeight;

        this.setState({ expanded: !this.state.expanded });

        this.state.animation.setValue(initialValue);
        Animated.spring(this.state.animation, {
          toValue: finalValue
        }).start();
    }
    toggle(){
        if(this.state.init === true){
            this.setState({
                init:false
            })
             this.expandedPanel();
        }else{
            this.expandedPanel()
        }

    }
    componentDidMount(){
        this.initital();
    }
    _setMaxHeight(event){
      //  console.log("heigth: ",event.nativeEvent.layout.height)
        this.setState({
            maxHeight:event.nativeEvent.layout.height
        });
    }
    _setMinHeight(event){
       // console.log("min: ", event.nativeEvent.layout.height)
        this.setState({
           minHeight:event.nativeEvent.layout.height
        });
       // console.log("minH ",event.nativeEvent.layout.height);
    }


    render(){
        const { expanded} = this.state;
        return (<Animated.View style={[stylepanel.containerPanels, { height: this.state.init ? minHigh:this.state.animation}]}>
            <View style={stylepanel.titlescontainerPanelsCategori} onLayout={this._setMinHeight.bind(this)}>
                <TouchableOpacity
                    style={stylepanel.buttonsPanelsCategory}
                            onPress={this.toggle.bind(this)}
                            // underlayColor= {'#fff'}
                        >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', marginHorizontal: convertWidth('1%'),alignItems:'center',height: convertHeight('6%')}}>
                            <Text numberOfLines={1} style={[stylepanel.titlesCategoryPanels, { fontFamily: Constant.POPPINS_REG,width:convertWidth('75%'), fontSize: convertWidth('1.5%') }]}>{this.state.titles2}</Text>
                            <Text style={[stylepanel.titlesCategoryPanels, {textAlign:'right', width: convertWidth('9%'), fontSize: convertWidth('1.5%')}]}>{this.state.titles1}</Text>
                           {expanded == true &&<Image 
                            style={{
                                right: 0, top: convertHeight('2%'), width: convertWidth('1.8%'), height: convertWidth('1.2%'),position: 'absolute'
                            }}
                            resizeMode={'contain'}
                            source={require('../../assets/ASET/Antu_arrow-right.svg.png')}
                            />}
                        {expanded == false && <Image
                            style={{
                                right: 0, top: convertHeight('2%'),width: convertWidth('1.2%'), height: convertWidth('1.2%'), position: 'absolute'
                            }}
                            resizeMode={'contain'}
                            source={ require('../../assets/ASET/Antu_arrow-down.png')}
                        />}
                        </View>
                           
                </TouchableOpacity>
                      
                    </View>
                <View style={stylepanel.panelBodyCategory} onLayout={this._setMaxHeight.bind(this)}>
                       {this.props.children}
                </View>
            </Animated.View>
        );
    }
}
const stylepanel = StyleSheet.create({
  containerPanels: {
    flexDirection: "column",
    backgroundColor: "#fff",
    marginTop: 1,
    overflow: "hidden"
  },
  titlescontainerPanelsCategori: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  titlesCategoryPanels: {
    flexDirection: "row",
    justifyContent: "center",
    fontFamily: Constant.POPPINS_MEDIUM,
    color: Constant.COLOR_GRAY3
  },
  buttonsPanelsCategory: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 5
  },
    panelBodyCategory: { marginHorizontal: convertWidth('2%') }
});
export default Panels