import React from 'react';
import { View, Text, StyleSheet } from "react-native";

import { WebView } from 'react-native-webview';
import Constant from '../../global/Constant';
import { convertHeight, convertWidth, callAlert, validateEmail } from '../../global/Global';
//import AutoHeightWebView from 'react-native-autoheight-webview'

const jsString = `
  function post () {
    postMessage(
      Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)
    );
  }
  setTimeout(post, 200);
// other custom js you may want
`
class HelpCell extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            vH: null,

        }
    }
    getSize(e) {
        let vH = e.nativeEvent.layout.height;
        console.log(vH)
        this.setState({ vH })
    }
    _onMessage = (e) => {
        this.setState({
            vH: parseInt(e.nativeEvent.data)
        })
    }
    render() {
        const { vH, cusStyle, heightScript } = this.state;
        return <View style={{
            //flex:1,
            width: convertWidth('80%'),
            //borderWidth:1,f
            backgroundColor: "#fff",
            margin: convertWidth('1%'),
            height: vH > convertHeight('8%') ? vH : convertHeight('8%')

        }}

        >
            <View
                style={{
                    width: convertWidth('83%'),
                    height: vH > convertHeight('8%') ? vH : convertHeight('8%'),
                    overflow: 'hidden'
                }}
            // onLayout={(e) => this.getSize(e)}
            >
                <WebView
                    //automaticallyAdjustContentInsets={false}
                    scalesPageToFit={true}
                    cacheEnabled={true}
                    javaScriptEnabled={true}
                    injectedJavaScript={jsString}
                    startInLoadingState={false}
                    onMessage={this._onMessage}
                    //injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                    originWhitelist={['*']}

                    source={{ html: this.props.answer }}
                //onContentSizeChange={(e) => this.getSize(e)}

                />
            </View>

        </View>
    }
}

export default HelpCell;