import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useFonts, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { RootNavigator } from './src/Router/navigation';
import { MainProvider } from './src/Context';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Poppins_500Medium,
      Poppins_700Bold,
      'MaterialIcons': require('react-native-vector-icons/Fonts/MaterialIcons.ttf'),
      'MaterialCommunityIcons': require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
    });
    setFontsLoaded(true);
  };

  const [googleFontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (googleFontsLoaded) {
      loadFonts();
    }
  }, [googleFontsLoaded]);

  if (!fontsLoaded) {
    return null
  }

  return (
    <MainProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </MainProvider>
  );
}
