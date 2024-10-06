import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
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
  const mapRef = useRef(null);
  const [isSatellite, setIsSatellite] = useState(false);
  const [farmMarkers, setFarmMarkers] = useState([]);
  const [neighborMarkers, setNeighborMarkers] = useState([]);

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
        populateFarmMarkers(loc.coords.latitude + 0.003, loc.coords.longitude);
        populateNeighborFarmMarkers(loc.coords.latitude - 0.01, loc.coords.longitude - 0.01);
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

  const handleRecenter = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(currentRegion, 1000);
    }
  };


  const populateFarmMarkers = (latitude, longitude) => {
    const markers = [];
    const distance = 0.001;
    const gridSize = 5;
    
    for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
      for (let j = -gridSize / 2; j <= gridSize / 2; j++) {
        markers.push({
          latitude: latitude + i * distance,
          longitude: longitude + j * distance,
        });
      }
    }

    setFarmMarkers(markers);
  };

  const populateNeighborFarmMarkers = (latitude, longitude) => {
    const markers = [];
    const distance = 0.001;
    const gridSize = 5;
    
    for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
      for (let j = -gridSize / 2; j <= gridSize / 2; j++) {
        markers.push({
          latitude: latitude + i * distance,
          longitude: longitude + j * distance,
        });
      }
    }

    setNeighborMarkers(markers);
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
            <>
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                zIndex={999}
              >
                <Image
                  source={require("../../assets/man.png")}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </Marker>
              <Marker
                coordinate={{
                  latitude: location.coords.latitude - 0.013,
                  longitude: location.coords.longitude - 0.01,
                }}
                zIndex={999}
              >
                <Image
                  source={require("../../assets/neighbor.png")}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </Marker>
            </>
          )}

          {/* Render farm markers */}
          {farmMarkers.map((marker, index) => (
            <Marker key={index} coordinate={marker}>
              <Image
                source={require("../../assets/corn.png")}
                style={{ width: 50, height: 50 }}
              />
            </Marker>
          ))}

          {/* Render neighbor farm markers */}
          {neighborMarkers.map((marker, index) => (
            <Marker key={`neighbor-${index}`} coordinate={marker}>
              <Image
                source={require("../../assets/pineapple.png")}
                style={{ width: 50, height: 50 }}
              />
            </Marker>
          ))}
        </MapView>

        <CityAndRightBar city={city} isSatellite={isSatellite} setIsSatellite={setIsSatellite} handleRecenter={handleRecenter} />

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
});
