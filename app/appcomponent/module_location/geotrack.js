import React, { Component } from 'react';
import { Alert } from 'react-native';
//import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import User from '../../global/user';
let statusApp = false;
class BGTracking extends Component {
    // static init(state) {
    //     BackgroundGeolocation.configure({
    //         desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    //         stationaryRadius: 50,
    //         distanceFilter: 1,
    //         notificationTitle: 'Himalaya',
    //         notificationText: 'enabled',
    //         debug: false,
    //         startOnBoot: true,
    //         stopOnTerminate: true,
    //         locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    //         interval: 300000,
    //         fastestInterval: 300000,
    //         activitiesInterval: 300000,
    //         stopOnStillActivity: false
    //     });
    //     BackgroundGeolocation.getConfig(function (config) {
    //         console.log(config);
    //     });
    //     BackgroundGeolocation.getCurrentLocation(lastLocation => {
    //         let region = state.state.region;
    //         const latitudeDelta = 0.01;
    //         const longitudeDelta = 0.01;
    //         region = Object.assign({}, lastLocation, {
    //             latitudeDelta,
    //             longitudeDelta
    //         });
    //         state.setState({ routeCordinatesGeoTrack: [lastLocation], region })
    //         //console.log("Last location ", region);
    //         User.updateUserGeolocation(region);
    //     }, (error) => {
    //         setTimeout(() => {
    //             Alert.alert("Error obtaining current location", JSON.stringify(error))
    //         }, 100);
    //     });

    //     BackgroundGeolocation.on('location', (location) => {
    //         //console.log('[DEBUG] BackgroundGeolocation location', location);
    //         BackgroundGeolocation.startTask(tastkey => {
    //             //console.log('[DEBUG] BackgroundGeolocation location', location);
    //             //console.log('[DEBUG] BackgroundGeolocation location', tastkey);
    //             BackgroundGeolocation.endTask(tastkey);

    //         });
    //     });
    //     BackgroundGeolocation.getLocations(
    //         function (locations) {
    //             //console.log("get location : ",locations);
    //             User.updateUserGeolocation(locations[locations.length - 1]);
    //         }
    //     );

    //     BackgroundGeolocation.on('error', (error) => {
    //         console.log('[ERROR] BackgroundGeolocation error : ' + error);
    //     });

    //     BackgroundGeolocation.on('start', () => {
    //         console.log('[INFO] BackgroundGeolocation service has been started');
    //         state.setState({ isRunning: true })
    //     });
    //     BackgroundGeolocation.on('stop', () => {
    //         console.log('[INFO] BackgroundGeolocation service has been stopped');
    //         state.setState({ isRunning: false })
    //     });

    //     BackgroundGeolocation.on('authorization', (status) => {
    //         console.log('[INFO] BeckgroundGeolocation authorization status : ' + status);
    //         if (status !== BackgroundGeolocation.AUTHORIZED) {
    //             setTimeout(() => {
    //                 Alert.alert('App require location tracking permission', 'Would you like to open app settings?', [
    //                     { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
    //                     { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
    //                 ])
    //             }, 1000);
    //         }
    //     });

    //     BackgroundGeolocation.on('background', () => {
    //         console.log("[INFO] App is in Background");
    //         statusApp = false
    //     });

    //     BackgroundGeolocation.on("foreground", () => {
    //         console.log("[INFO] App is in foreground");
    //         statusApp = true;
    //     });

    //     BackgroundGeolocation.on("abort_requested", () => {
    //         console.log("[INFO] Server responded with 285 Updates Not Required");
    //     });

    //     BackgroundGeolocation.on("http_authorization", () => {
    //         console.log("[INFO] App needs to authorize the http requests");
    //     });

    //     BackgroundGeolocation.checkStatus(status => {
    //         console.log("[INFO] BackgroundGeolocation services is running " + status.isRunning);
    //         console.log("[INFO] BackgroundGeolocation services enabled " + status.locationServicesEnabled);
    //         console.log("[INFO] BackgroundGeolocation auth status " + status.authorization);
    //         if (!status.isRunning) {
    //             console.log("[INFO] BackgroundGeolocation services will start");
    //             BackgroundGeolocation.start();
    //         }
    //     });
    // }

    // static unInitTracking() {
    //     BackgroundGeolocation.events.forEach(event => {
    //         BackgroundGeolocation.removeAllListeners();
    //     })

    // }
    // static clear() {
    //     BackgroundGeolocation.deleteAllLocations(status => {
    //         console.log("[INFO] BackgroundGeolocation delete all locations ", status);
    //     })
    // }
    // static getAllLocation(state) {
    //     BackgroundGeolocation.getLocations(function (locations) {
    //         //console.log("location", locations);
    //         state.setState({ routeCordinatesGeoTrack: locations });
    //         // User.updateUserGeolocation(locations[locations.length - 1]);
    //     }
    //     );
    // }
}

export default BGTracking;