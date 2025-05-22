import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splashscreen from './Screens/Splashscreen';
import Loginscreen from './Screens/Loginscreen';
import Homescreen from './Screens/Homescreen';

const Stack =createStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style="auto" />
    <NavigationContainer >
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name='Splash'
       component={Splashscreen}
       options={{ headerShown: false }}></Stack.Screen>
     <Stack.Screen
     name='Login'
     component={Loginscreen}
     options={{headerShown:false}}
     ></Stack.Screen>
     <Stack.Screen
     name='Home'
     component={Homescreen}
     
     ></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
    </>
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
