import React, { useState } from 'react';
import LoadingPage from './src/Pages/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './src/Pages/Homepage';
import { RootNavigator } from './src/Router/navigation';

const Stack = createNativeStackNavigator()
export default function App() {

  return (
    <NavigationContainer>
     <RootNavigator/>
    </NavigationContainer>


  );
}