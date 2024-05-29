import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { RootNavigator } from './src/Router/navigation';
import { MainProvider } from './src/Context';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Poppins_500Medium,
        Poppins_700Bold,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <MainProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </MainProvider>

  );
}
