import React, { Component } from 'react'
import { Text, View } from 'react-native'

//redux
import configstore from './app/redux/config_store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import App from './App';

//authorize
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

//redux config

var context = null;
const { store, presistor } = configstore();

export class MainApp extends Component {
    render() {
        return (
            <Provider store={store} style={{ flex: 1 }}>
                <PersistGate loading={null} persistor={presistor}>
                    <App />
                </PersistGate>
            </Provider>
        )
    }
}

export default MainApp;
