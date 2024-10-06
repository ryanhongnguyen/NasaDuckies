import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Pressable, Button } from "react-native";
import { supabase } from '../utils/hooks/supabase';

// Screens
import MapScreen from "../screens/MapScreen";
import CommunityScreen from "../screens/CommunityScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WaterScreen from "../screens/WaterScreen";

// Stacks
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function UserStack({ route, navigation }) {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
      } else {
        // Handle successful sign out (e.g., redirect to login screen)
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const screenOptions = {
    tabBarShowLabel: false,
    headerLeft: () => (
      <Button onPress={handleSignOut} title="Log Out" />
    ),
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="Map"
      screenOptions={{ headerShown: false }} // Move headerShown option here to apply it to all screens
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Water" component={WaterScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const getTabIcon = (routeName) => {
  switch (routeName) {
    case "Map":
      return <Ionicons name="map" size={24} color="green" />;
    case "Water":
      return <Ionicons name="water-outline" size={24} color="green" />;
    case "Community":
      return <Ionicons name="people-circle-outline" size={24} color="green" />;
    case "Profile":
      return <Ionicons name="person-outline" size={24} color="green" />;
    default:
      return null;
  }
};

const CustomTabBar = (props) => {
  const { state, descriptors, navigation } = props;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.grayRectangle}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isActive = state.index === index;
          const tabStyle = isActive ? styles.activeTab : styles.inactiveTab;

          return (
            <Pressable
              key={route.key}
              style={[styles.tab, tabStyle]}
              onPress={() => navigation.navigate(route.name)}
            >
              {getTabIcon(route.name)}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 0,
    padding: 0,
    bottom: 0,
    borderTopColor: "#ccc", // Adjust the color as needed
    borderTopWidth: 0.8,
  },
  grayRectangle: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 100,
    height: 48,
  },
  tab: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    // Add styles for active tab if needed
  },
  inactiveTab: {
    // Add styles for inactive tab if needed
  },
});
