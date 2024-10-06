import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Vector icons for weather

export default function CommunityScreen() {


    const [news, setNews] = useState([]);
    const [weather, setWeather] = useState(null);
    const [icon, setIcon] = useState(null); // For weather icon
    // Fetch weather and news on component mount
    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const API_KEY = '187766a7990c84a38f5fd0e22d1dddda';
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=Missouri,us&units=metric&appid=${API_KEY}`
          );
          setWeather(response.data);
          // Determine weather icon
          const weatherCondition = response.data.weather[0].main.toLowerCase();
          if (weatherCondition.includes('clear')) setIcon('weather-sunny');
          else if (weatherCondition.includes('cloud')) setIcon('weather-cloudy');
          else if (weatherCondition.includes('rain')) setIcon('weather-rainy');
          else if (weatherCondition.includes('snow')) setIcon('weather-snowy');
          else setIcon('weather-partly-cloudy');
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
      const fetchNews = async () => {
        try {
          const API_KEY = '4a7e14fd5f414b48a12dab9027a4f6f3';
          const response = await axios.get(
            `https://newsapi.org/v2/everything?q=farmer+agriculture+Missouri&apiKey=${API_KEY}`
          );
          setNews(response.data.articles);
        } catch (error) {
          console.error('Error fetching news data:', error);
        }
      };
      fetchWeather();
      fetchNews();
    }, []);
    // Function to handle opening links
    const openArticle = (url) => {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };
    return (
      <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Farming Conditions in Missouri</Text>
        {/* Weather Section */}
        {weather ? (
          <View style={styles.weatherSection}>
            <View style={styles.weatherVisual}>
              {/* Show Weather Icon */}
              {icon && <Icon name={icon} size={80} color="#FFCC33" />}
            </View>
            <View style={styles.weatherDetails}>
              <Text style={styles.weatherInfo}>Temperature: {weather.main.temp}°C</Text>
              <Text style={styles.weatherInfo}>Weather: {weather.weather[0].description}</Text>
              <Text style={styles.weatherInfo}>Humidity: {weather.main.humidity}%</Text>
              <Text style={styles.weatherInfo}>Wind Speed: {weather.wind.speed} m/s</Text>
            </View>
          </View>
        ) : (
          <Text>Loading weather data...</Text>
        )}
        {/* News Section */}
        <Text style={styles.sectionTitle}>Agriculture News:</Text>
        {news.length > 0 ? (
          <FlatList
            data={news}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openArticle(item.url)}>
                <View style={styles.newsItem}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsDescription}>{item.description}</Text>
                  <Text style={styles.newsSource}>Source: {item.source.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text>Loading news data...</Text>
        )}
      </ScrollView>
      </SafeAreaView>
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F9F9F9', // Light beige for background
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#41234', // Brown for rustic feel
      marginBottom: 20,
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 5,
    },
    weatherSection: {
      marginBottom: 20,
      padding: 20,
      backgroundColor: '#A3D39C', // Light green for nature/farming feel
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    weatherVisual: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
    },
    weatherDetails: {
      flexDirection: 'column',
      padding: 10,
    },
    weatherInfo: {
      fontSize: 18,
      color: '#555',
      marginBottom: 5,
      lineHeight: 24,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#4A4A4A',
      marginBottom: 15,
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 5,
    },
    newsItem: {
      marginBottom: 20,
      padding: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 4,
    },
    newsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#444',
      marginBottom: 8,
    },
    newsDescription: {
      fontSize: 16,
      color: '#666',
      marginBottom: 10,
      lineHeight: 22,
    },
    newsSource: {
      fontSize: 14,
      fontStyle: 'italic',
      color: '#888',
    },
  });
