import { StyleSheet, View,PermissionsAndroid } from 'react-native';
import WebView from 'react-native-webview';
import Constants from 'expo-constants';
import geolocation from './src/geolocation';

export default function App() {
  const device = Constants.deviceName ?? null;
  const platform = Constants.platform ?? null;
  const version = Constants.systemVersion ?? null;

  console.log(geolocation.init())

  setInterval(() => {
    if(geolocation.latitude !== '') {
      console.log(geolocation.latitude,geolocation.longitude)
    }
  }, 2000);

  const functions_before =
  `alert('helo word')`;

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>

      <WebView
        geolocationEnabled={true}
        javaScriptEnabled={true}
        allowFileAccess={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
    
        originWhitelist={'https://ninosflores.codehalley.com'}
        source={{ uri: 'https://ninosflores.codehalley.com', baseUrl: 'https://ninosflores.codehalley.com' }}

        injectedJavaScriptBeforeContentLoaded={`document.addEventListener("DOMContentLoaded", function(){${functions_before}})`}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor:"#3170d7",
    height: Constants.statusBarHeight ?? 0
  },
  container: {
    flex: 1
  },
  webview: {
    flex: 1
  },
});
