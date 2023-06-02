// import { useState } from "react";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from "react-native";

export default {
    latitude: '',
    longitude: '',
    id: 0,

    init: function () {
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
                    // alert('aceitou');console.log('aceitou')
                    getLocation();
                } else {
                    alert('Permicao nao concedida')
                }
            }

            requestPermission();
        }

        const getLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const currentLatitude = JSON.stringify(position.coords.latitude);
                    const currentLongitude = JSON.stringify(position.coords.longitude);
                    this.latitude = currentLatitude;
                    this.longitude = currentLongitude;

                    alert(currentLatitude + currentLongitude)
                },

                (error) => alert(error.message),

                { enableHighAccuracy: true, timeout: 4000, maximumAge: 0 }
            )

            const watchID = Geolocation.watchPosition((position) => {
                const currentLatitude = JSON.stringify(position.coords.latitude);
                const currentLongitude = JSON.stringify(position.coords.longitude);
                this.latitude = currentLatitude;
                this.longitude = currentLongitude;

                alert(currentLatitude + currentLongitude)
            });

            this.id = watchID;
        }

        const clearLocation = () => {
            Geolocation.clearWatch(this.id);
        }
    }
}