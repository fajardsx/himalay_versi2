import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import haversine from 'haversine';
import Geolocation from "@react-native-community/geolocation";

import Constant from "../../global/Constant";
import { addLocal, getLocal, delLocal, convertHeight, convertWidth, curretntimestamp, formateFullDate, formateFullDateNumber } from "../../global/Global";
import BGTracking from './geotrack';
import { ScrollView } from "react-native-gesture-handler";
import { sendLocation } from "../../module_api/module_resapi";
import user from "../../global/user";
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

const MAP_TARGET = [{ latitude: -6.174256, longitude: 106.8119182 }];

let id = 0;

var userData = {
    currentPos: {},
    historyPos: [],
}


class LocationModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: null,
            locations: [],
            targetLocation: [],
            isRunning: false,
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCordinates: [],
            distanceTravel: 0,
            prevLatLng: {},
            routeCordinatesGeoTrack: []
        };
        this.isMount = false;
    }
    componentWillMount() {
        //this.getLastCoordinate();
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                    latitude,
                    longitude
                };
                //console.log(newCoordinate);

                //let data = BGTracking.getAllLocation()
                //console.log('list location',data)
            },
            error => console.log(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        )
    }

    componentDidMount() {

        //BGTracking.init(this);
        //this.onTrack();
        this.onUpdateInterval();
        this.isMount = true;
    }

    componentWillUnmount() {
        this.isMount = false;
        //BGTracking.unInitTracking();
        // Geolocation.clearWatch(this.watchID);
    }
    /**
    * GEOLOCATION
    */
    getLocation() {
        let data = []
        //BGTracking.getAllLocation(this);

        this.onUpdateInterval();
    }
    onUpdateInterval() {
        let that = this;
        /*console.log(this.state.routeCordinatesGeoTrack)
        let las = this.state.routeCordinatesGeoTrack[this.state.routeCordinatesGeoTrack.length-1];
        let data = new FormData();
        data.append("user_id", user.getUsId());
        data.append("player_id", );
        sendLocation(data)*/
        setTimeout(function () {
            that.getLocation();
        }, 300000)
    }
    onTrack() {
        const { coordinate } = this.state;

        this.watchID = Geolocation.watchPosition(
            position => {
                const { coordinate, routeCordinates, distanceTravel } = this.state;
                const { latitude, longitude } = position.coords;
                let date = curretntimestamp();
                date = formateFullDate(date);
                // console.log(date);
                const newCoordinate = {
                    date,
                    latitude,
                    longitude
                };

                /* if (Platform.OS === 'android') {
                     if (this.marker) {
                         this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
                     };
                 } else {
                     coordinate.timing(newCoordinate).start();
                 }
                 console.log("update", coordinate);*/
                userData.currentPos = newCoordinate;
                let saveCoordinate = routeCordinates;
                //if (this.onTrySaveCoordinate(newCoordinate) === 0) {
                if (newCoordinate) {
                    saveCoordinate = routeCordinates.concat([newCoordinate]);
                }

                //console.log("save update", saveCoordinate);
                //}
                userData.historyPos = saveCoordinate;
                addLocal(Constant.KEY_POS, userData)
                this.isMount && this.setState({
                    latitude,
                    longitude,
                    routeCordinates: saveCoordinate,
                    distanceTravel: distanceTravel + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate,
                });
            }, error => {
                // console.log(error.message);
            },
            { enableHighAccuracy: true, timeout: 6000, maximumAge: 6000, distanceFilter: 1 }
        )
    }
    onTrySaveCoordinate(newcordinate) {
        let found = 0;
        this.isMount && this.state.routeCordinates.map((loc, index) => {
            // console.log(String(loc.latitude));
            //console.log(String(newcordinate.latitude));
            if (loc.latitude === newcordinate.latitude && loc.longitude === newcordinate.longitude) {
                found = 1;
                // console.log('found');
            }
        })
        return found;
    }
    getLastCoordinate() {
        let data;
        let that = this;
        getLocal(Constant.KEY_POS).then(result => {
            // console.log('data', result)
            if (result) {
                userData = result;
                that.isMount && that.setState({
                    latitude: userData.currentPos.latitude,
                    longitude: userData.currentPos.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    routeCordinates: userData.historyPos
                });
            }

            //console.log("start tracking", userData);
        });
    }
    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    }

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    })
    onCleanList() {
        delLocal(Constant.KEY_POS);
        this.setState({
            routeCordinates: []
        })

        //BGTracking.clear();
    }

    render() {
        const { routeCordinates, routeCordinatesGeoTrack } = this.state;
        return null;
    }


}
/*
 <Polyline coordinates={this.state.routeCordinates} strokeWidth={5} strokeColor={"blue"} />
        {this.state.routeCordinates.map((markerCoordinate, index) => (

          <Marker.Animated key={index} ref={marker => {
            this.marker = marker;
          }} coordinate={markerCoordinate}
            title={String("location " + index)}
            description={String(markerCoordinate.latitude + "," + markerCoordinate.longitude)}
          />
        ))}

    <View style={{
            position: 'absolute',
             width: convertWidth("70%"),

            bottom:0,
            height: convertHeight('40%'),
            backgroundColor: "#fff"
        }}>
            <Text>Track Sales</Text>
            <ScrollView

                contentContainerStyle={{flexGrow:1}}
            >
            {routeCordinatesGeoTrack.map((data,index)=>(

                <Text key={index}>{formateFullDateNumber(data.time)+"- Position: "+data.latitude+","+data.longitude}</Text>
            ))
            }
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.bubble, styles.buttons]}
                    onPress={() => this.onCleanList()}
                >
                    <Text>
                        Clean
            </Text>
                </TouchableOpacity>
            </View>
        </View>
*/


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
        right: 0,
        width: convertWidth('20%')
    },
    inputcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 18,
        borderRadius: 20
    },
    buttons: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10
    },
    placeInput: {
        width: '70%'
    },
    placebutton: {
        width: '30%'
    },
    listcontainer: {
        width: '100%'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    imagestyle: {
        width: 75,
        height: 130
    }
});
export default LocationModule;