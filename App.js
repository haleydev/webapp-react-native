import { StyleSheet, View,PermissionsAndroid } from 'react-native';
import WebView from 'react-native-webview';
import Constants from 'expo-constants'

export default function App() {

  const functions_before =
  `alert('helo word')`;

  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location Access Permission',
      message: 'We would like to use your location',
      buttonPositive: 'Okay'
    }
  );

  console.log(Constants.deviceName)

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>

      <WebView
        geolocationEnabled={true}
        javaScriptEnabled={true}
        allowFileAccess={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        onTouchEnd={function(e) {
          console.log(e)
        }}

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
