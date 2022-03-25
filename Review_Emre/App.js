import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {DrawChart} from "./chart";

function ProvidedApp() {
  return(
      <>
        <View style={styles.container}>
          <DrawChart/>
          <StatusBar style="auto" />
        </View>
      </>
  )
}

export default function App() {
  return (
      <ProvidedApp/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});