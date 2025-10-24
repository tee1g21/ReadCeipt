import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import "../global.css";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

 return (
    <Stack />
  );
}
