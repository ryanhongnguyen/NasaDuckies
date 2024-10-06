import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Text } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Constants from 'expo-constants';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import CityAndRightBar from '../components/CityAndRightBar';

const apiKey = Constants.expoConfig.extra.GOOGLE_PLACES_API_KEY;

export default function MapScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const mapRef = useRef(null);
  const [isSatellite, setIsSatellite] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        let loc = await Location.getCurrentPositionAsync({});
        setCity(await getCityName(loc.coords.latitude, loc.coords.longitude));
        setLocation(loc);
        setCurrentRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        });
      } catch (error) {
        console.error(error.message);
      }
    };
    getLocation();
  }, []);

  const getCityName = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const cityComponent = response.data.results[0]?.address_components.find(component => component.types.includes('locality'));
      return cityComponent ? cityComponent.long_name : 'Unknown City';
    } catch (error) {
      console.error(error);
      return 'Error retrieving city name';
    }
  };

  const handleRegionChangeComplete = async (region) => {
    const cityName = await getCityName(region.latitude, region.longitude);
    setCity(cityName);
  };

  const fetchNearbyPlaces = async (keyword) => {
    const radius = 3 * 1609.34; // 3 miles in meters
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      setPlaces(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowPlaces = () => {
    if (!location) {
      console.error("Location not available");
      return;
    }
    fetchNearbyPlaces("shop");
  };

  const handleRecenter = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(currentRegion, 1000);
    }
  };

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { marginBottom: tabBarHeight }]}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={currentRegion}
          onRegionChangeComplete={handleRegionChangeComplete}
          mapType={isSatellite ? 'hybrid' : 'standard'}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            >
              <Image
                source={require("../../assets/Me Bitmoji Icon.png")}
                style={{ width: 100, height: 100 }}
              />
            </Marker>
          )}
          {places.map((place, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              onPress={() => console.log(`Selected place: ${place.name}`)}
            >
              <Image style={{ height: 40, width: 40 }} source={require("../../assets/marker.png")} />
            </Marker>
          ))}
        </MapView>

        <CityAndRightBar city={city} isSatellite={isSatellite} setIsSatellite={setIsSatellite} />

        <View style={styles.mapFooter}>
          <View style={styles.locationContainer}>
            <TouchableOpacity
              style={styles.userLocation}
              onPress={handleRecenter}
            >
              <Ionicons name="navigate" size={15} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.showPlacesButton}
              onPress={handleShowPlaces}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Show Farming Shops</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userLocation: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  showPlacesButton: {
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 10,
  },
});
