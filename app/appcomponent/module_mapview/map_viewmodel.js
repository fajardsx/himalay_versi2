import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import MapView, { AnimatedRegion, Polyline, Marker, ProviderPropType } from "react-native-maps";
import haversine from 'haversine';
import Geolocation from "@react-native-community/geolocation";

import Constant from "../../global/Constant";
import { addLocal, getLocal, delLocal } from "../../global/Global";

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

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class MapsViewModel extends React.Component {
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
        };
    }
    componentWillMount() {
        this.getLastCoordinate();
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                    latitude,
                    longitude
                };
                console.log(newCoordinate);
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

    }

    componentWillUnmount() {

        Geolocation.clearWatch(this.watchID);
    }
    /**
    * GEOLOCATION
    */
    onTrack() {
        const { coordinate } = this.state;

        this.watchID = Geolocation.watchPosition(
            position => {
                const { coordinate, routeCordinates, distanceTravel } = this.state;
                const { latitude, longitude } = position.coords;

                const newCoordinate = {
                    latitude,
                    longitude
                };

                if (Platform.OS === 'android') {
                    if (this.marker) {
                        this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
                    };
                } else {
                    coordinate.timing(newCoordinate).start();
                }
                console.log("update", coordinate);
                userData.currentPos = newCoordinate;
                let saveCoordinate = routeCordinates;
                if (this.onTrySaveCoordinate(newCoordinate) === 0) {
                    saveCoordinate = routeCordinates.concat([newCoordinate]);
                    console.log("save update", saveCoordinate);
                }
                userData.historyPos = saveCoordinate;
                addLocal(Constant.KEY_POS, userData)
                this.setState({
                    latitude,
                    longitude,
                    routeCordinates: saveCoordinate,
                    distanceTravel: distanceTravel + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate,
                });
            }, error => {
                console.log(error.message);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 300000, distanceFilter: 500 }
        )
    }
    onTrySaveCoordinate(newcordinate) {
        let found = 0;
        this.state.routeCordinates.map((loc, index) => {
            // console.log(String(loc.latitude));
            //console.log(String(newcordinate.latitude));
            if (loc.latitude === newcordinate.latitude && loc.longitude === newcordinate.longitude) {
                found = 1;
                console.log('found');
            }
        })
        return found;
    }
    getLastCoordinate() {
        let data;
        let that = this;
        getLocal(Constant.KEY_POS).then(result => {
            console.log('data', result)
            if (result) {
                userData = result;
                that.setState({
                    latitude: userData.currentPos.latitude,
                    longitude: userData.currentPos.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    routeCordinates: userData.historyPos
                });
            }

            console.log("start tracking", userData);
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
    onPressMap(e) {
        console.log("click map " + this.state.targetLocation.length);
        this.setState({
            targetLocation: [
                ...this.state.targetLocation,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: id++,
                    color: randomColor(),
                },
            ],
        });
    }
    render() {
        return <View style={styles.container}>
            <MapView style={styles.map}
                // provider = {this.props.provider}
                followsUserLocation={true}
                showsUserLocation={true}
                loadingEnabled={true}
                cacheEnabled={true}
                showsMyLocationButton={true}
                userLocationAnnotationTitle={'My Location'}
                region={this.getMapRegion()}
                onPress={(e) => this.onPressMap(e)}
            >
                <Polyline coordinates={this.state.routeCordinates} strokeWidth={2} strokeColor={"blue"} />
                {this.state.routeCordinates.map((markerCoordinate, index) => (

                    <Marker.Animated key={index} ref={marker => {
                        this.marker = marker;
                    }} coordinate={markerCoordinate}
                        title={String("location " + index)}
                        description={String(markerCoordinate.latitude + "," + markerCoordinate.longitude)}
                    />
                ))}
                {this.state.targetLocation.map(marker => (
                    <Marker
                        key={marker.key}

                        coordinate={
                            marker.coordinate
                        }
                        title={"Location " + marker.key}
                        description={String(marker.coordinate.latitude + " , " + marker.coordinate.longitude)}
                        pinColor={marker.color}
                        zIndex={18.75}
                    />
                ))}



            </MapView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.bubble, styles.buttons]}
                    onPress={() => delLocal(Constant.KEY_POS)}
                >
                    <Text>
                        {parseFloat(this.state.distanceTravel).toFixed(2)} Km
            </Text>
                </TouchableOpacity>
            </View>
        </View>
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
*/
MapsViewModel.propTypes = {
    provider: ProviderPropType,
};

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
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent'
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
export default MapsViewModel;