import React from "react";
import "react-native-gesture-handler";
import './src/utils/hooks/supabase'
import RootNavigation from "./src/navigation/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigation>
      </RootNavigation>
    </SafeAreaProvider>
  );
}
