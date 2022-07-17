import { StatusBar } from 'expo-status-bar';
import React, { createContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast, { SuccessToast, ErrorToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './src/components/Contexts';
import { TokenContext } from './src/components/Contexts';
import { PicContext } from './src/components/Contexts';
import Login from './src/screens/Login';
import Registration from './src/screens/Registration';
import Authentication from './src/screens/Authentication';
import Contacts from './src/screens/Contacts';
import UseCamera from './src/screens/UseCamera';
import SendPicture from './src/screens/SendPicture';
import Snaps from './src/screens/Snaps';
import OpenSnap from './src/screens/OpenSnap';
import GalleryPicker from './src/screens/GalleryPicker';

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 20,
        fontWeight: '400'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [picture, setPicture] = useState('');

  AsyncStorage.getItem("user-token")
  .then(res => {
    if (res !== null) {
      setLoggedIn(true)
      setToken(res)
    } else {
      setLoggedIn(false)
    }
  })
  .catch(err => reject(err));

  useEffect(() => {
    setLoggedIn();
  }, []);

  const logout = () => {
    AsyncStorage.removeItem("user-token");
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
      <TokenContext.Provider value={[token, setToken]}>
        <PicContext.Provider value={[picture, setPicture]}>
          <NavigationContainer>
            <Stack.Navigator>
              {!loggedIn ? (
                <>
                <Stack.Screen options={{header: () => null}} name="Authentication" style={styles.container} component={Authentication}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Registration" component={Registration} />
                </>
              ): (
                <>
                <Stack.Screen options={{
                  headerRight: () => (
                    <Button
                      onPress={() => logout()}
                      title="Logout"
                      buttonStyle={{backgroundColor: 'red'}}
                    />
                  )
                }} name="Camera" component={UseCamera} />
                <Stack.Screen options={{
                  headerRight: () => (
                      <Button
                          onPress={() => logout()}
                          title="Logout"
                          buttonStyle={{backgroundColor: 'red'}}
                      />
                  )
                }} name="GalleryPicker" component={GalleryPicker} />
                <Stack.Screen options={{
                  headerRight: () => (
                      <Button
                          onPress={() => logout()}
                          title="Logout"
                          buttonStyle={{backgroundColor: 'red'}}
                      />
                  )
                }} name="Contacts" component={Contacts} />
                <Stack.Screen options={{
                  headerRight: () => (
                      <Button
                          onPress={() => logout()}
                          title="Logout"
                          buttonStyle={{backgroundColor: 'red'}}
                      />
                  )
                }} name="SendPicture" component={SendPicture} />
                <Stack.Screen options={{
                  headerRight: () => (
                    <Button
                      onPress={() => logout()}
                      title="Logout"
                      buttonStyle={{backgroundColor: 'red'}}
                    />
                  )
                }} name="Snaps" component={Snaps} />
                  <Stack.Screen name="OpenSnap" component={OpenSnap} />
                </>
              )}
              </Stack.Navigator>
            <Toast config={toastConfig}/>
          </NavigationContainer>
        </PicContext.Provider>
      </TokenContext.Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
});
