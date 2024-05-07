import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavigator } from './src/Router/navigation';

export default function App() {

  return (
    <NavigationContainer>
     <RootNavigator/>
    </NavigationContainer>
  );
}