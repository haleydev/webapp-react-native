import { useState } from "react";
// import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from "react-native";

// import * as PermissionsAndroid from "expo-permissions";
// import * as Geolocation from "expo-location";

Geolocation =  require('@react-native-community/geolocation');

const [currentLatitude, setCurrentLatitude] = useState('');
const [currentLongitude, setCurrentLongitude] = useState('');
const [watchID, setWatchID] = useState(0);

export default {
   

    init : function() {
        const callLocation = () => {
            if (Platform.OS === 'ios') {
                getLocation();
            } else {
                const requestPermission = async () => {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Localização',
                            message: 'Este aplicativo precisa acessar sua localização',
                            buttonPositive: 'Aceitar',
                            buttonNegative: 'Cancelar',
                            buttonNeutral: 'Pergunte-me depois'
                        }
                    );
    
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        getLocation();
                    } else {
                        alert('Permicao nao concedida')
                    }
                }
    
                requestPermission();
            }
        }
    
        const getLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const currentLatitude = JSON.stringify(position.coords.latitude);
                    const currentLongitude = JSON.stringify(position.coords.longitude);
                    setCurrentLatitude(currentLatitude);
                    setCurrentLongitude(currentLongitude);
                },
    
                (error) => alert(error.message),
    
                { enableHighAccuracy: true, timeout: 4000, maximumAge: 0 }
            )
    
            const watchID = Geolocation.watchPosition((position) => {           
                const currentLatitude = JSON.stringify(position.coords.latitude);
                const currentLongitude = JSON.stringify(position.coords.longitude);
                setCurrentLatitude(currentLatitude);
                setCurrentLongitude(currentLongitude);
    
                console.log(currentLatitude,currentLongitude)
            });
    
            setWatchID(watchID);
        }
    
        const clearLocation = () => {
            Geolocation.clearWatch(watchID);
        }
    }
}