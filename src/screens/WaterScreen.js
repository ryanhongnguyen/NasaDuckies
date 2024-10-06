import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, Image } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

const WaterScreen = () => {
  const [soilMoistureLevels, setSoilMoistureLevels] = useState([]);
  const [optimalLevels, setOptimalLevels] = useState([]);
  const [dates, setDates] = useState([]);
  const [waterRequired, setWaterRequired] = useState(59); // Water level in percentage
  const [wateringDay, setWateringDay] = useState(null);
  const [ndviValue, setNdviValue] = useState(75); // Hard-coded NDVI value at 75%

  // Get the screen width for responsive chart sizing
  const screenWidth = Dimensions.get('window').width;

  // Simulate fetching data for the last 7 days
  useEffect(() => {
    const soilMoistureData = [0.46, 0.46, 0.47, 0.49, 0.46, 0.42, 0.55];
    const dateLabels = ['1-Sep', '2-Sep', '3-Sep', '4-Sep', '5-Sep', '6-Sep', '7-Sep'];
    // const optimalLevelData = Array(soilMoistureData.length).fill(0.4);
    // console.log(optimalLevelData);

    // Validate the data to ensure it's finite and within acceptable range
    const validSoilMoistureData = soilMoistureData.map((value) =>
      typeof value === 'number' && isFinite(value) ? value : 0
    );

    const validOptimalLevels = optimalLevelData.map((value) =>
      typeof value === 'number' && isFinite(value) ? value : 0
    );

    // Update the state only with valid data
    setSoilMoistureLevels(validSoilMoistureData);
    setOptimalLevels(validOptimalLevels);
    setDates(dateLabels);

    // Simulate fetching for water tank and schedule
    const weeklyWaterDay = 2; // Example: Tuesday
    setWateringDay(weeklyWaterDay);
  }, []);

  const today = 'Tuesday'; // Hardcoding Tuesday as the current day

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Water Schedule</Text>

        {/* Water Scale */}
        <View style={styles.waterTankContainer}>
          <View style={styles.waterTank}>
            {/* Green layer for the difference */}
            <View style={styles.normalWaterLayer} />
            {/* Water fill */}
            <View style={[styles.waterFill, { height: `${waterRequired}%` }]} />
            {/* Black line indicating the 75% watering mark */}
            <View style={styles.blackLine} />
          </View>
          <Text style={styles.waterPercentage}>
            We suggest watering {waterRequired}% less than you normally do per week
          </Text>
        </View>

        {/* Calendar Section - Displaying all days */}
        <Text style={styles.calendarTitle}>7-Day Watering Schedule</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.calendarGrid}>
            {['Sun (10/6)', 'Mon (10/7)', 'Tue (10/8)', 'Wed (10/9)', 'Thu (10/10)', 'Fri (10/11)', 'Sat (10/12)'].map((day, index) => (
              <View key={index} style={wateringDay === index ? [styles.day, styles.today] : styles.day}>
                <Text style={styles.dayText}>{day}</Text>
                <Ionicons
                  name={wateringDay === index ? 'water' : 'thumbs-up'}
                  size={30}
                  color={wateringDay === index ? 'blue' : 'green'}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Centered Soil Moisture Graph Image */}
        <View style={styles.graphContainer}>
          <Text style={styles.title}>Soil Moisture Levels (Last 7 Days)</Text>
          <Image
            source={require('../../assets/graph.png')}
            style={{ width: screenWidth - 40, height: 250, resizeMode: 'contain' }}
          />
        </View>

        <Text style={styles.ndviTitle}>NDVI Index</Text>
        <View style={styles.ndviContainer}>
          <View style={[styles.ndviBar, { width: `${ndviValue}%` }]}>
            <Text style={styles.ndviIcon}>
              <Ionicons name='thumbs-up' size={30} color="yellow" />
            </Text>
          </View>
        </View>
        <Text style={styles.ndviText}>{ndviValue}% NDVI</Text>
        {Array.from({ length: 14 }).map((_, index) => (
          <Text></Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50',
  },
  waterTankContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  waterTank: {
    width: 100,
    height: 300,
    borderColor: '#3498DB',
    borderWidth: 3,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#EAF9F8',
    marginBottom: 10,
  },
  waterFill: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#3498DB',
  },
  waterPercentage: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2C3E50',
    fontSize: 18,
    marginTop: 10,
  },
  normalWaterLayer: {
    position: 'absolute',
    width: '100%',
    height: '75%', // Normal watering ratio (mid-point)
    backgroundColor: 'rgba(0, 255, 0, 0.2)', // Light green background to show the normal watering difference
    bottom: 0,
  },
  blackLine: {
    position: 'absolute',
    width: '100%',
    height: 2, // Thicker black line
    backgroundColor: 'black', // Solid black color
    bottom: '75%', // Positioned at the 75% mark
  },
  calendarTitle: {
    fontSize: 22,
    marginBottom: 10,
    color: '#34495E',
  },
  calendarGrid: {
    flexDirection: 'row',
    marginBottom: 20,
    marginRight: 10,
  },
  day: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#D6EAF8',
    width: 80,
    marginHorizontal: 5,
  },
  today: {
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    marginHorizontal: 5,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  graphContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  ndviTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#2C3E50',
  },
  ndviContainer: {
    width: '80%',
    height: 30,
    backgroundColor: '#808080',
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ndviBar: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#A9DFBF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ndviText: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  ndviIcon: {
    paddingHorizontal: 3,
    marginLeft: 'auto',
  },
});

export default WaterScreen;
