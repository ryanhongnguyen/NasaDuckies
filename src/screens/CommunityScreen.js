import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function InsightsCarousel() {
  const [activeSlide, setActiveSlide] = useState(0); // To track current slide

  const data = [
    {
      title: 'Best Growing Practice for Corn',
      image: require('../../assets/cornPhoto.png'),
      description: [
        'Grow in full sun',
        'Well-drained soil pH 6.0 - 6.8',
        'Plant early Spring for high yield',
        'Use a water-soluble plant food'
      ]
    },
    {
      title: 'Strategies to Adopt for Climate Change',
      image: require('../../assets/climate.png'),
      description: [
        'Climate data analysis',
        'Improved irrigation systems',
        'Extreme weather event alert',
        'Crop diversification'
      ]
    },
    {
      title: 'NASA Resources - Intro to NDVI',
      image: require('../../assets/NASA.jpg'),
      description: [
        'NDVI Data is a graphical indicator (-1 to 1)',
        'that measures the greenness of vegetation',
        'and can be used to assess the health',
        'of plants and vegetation density!'
      ]
    }
  ];

  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / screenWidth);
    if (slide !== activeSlide) {
      setActiveSlide(slide);
    }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.heading}>Community Insights</Text>
      
      <ScrollView 
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.descriptionContainer}> 
            <Text style={styles.title}>{item.title}</Text>
            {item.description.map((desc, i) => (
              <Text key={i} style={styles.description}>{desc}</Text>
            ))}
          </View>
        </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View key={index} style={[styles.dot, { opacity: activeSlide === index ? 1 : 0.3 }]} />
        ))}
      </View>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 50,
    marginTop: 30,
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    width: screenWidth,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 30
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 25, // Increase line height for better readability
  },
  descriptionContainer: {
    width: '90%',  // Adjust width as needed
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    top: 280,  // Adjust the position to center the description box at the bottom half
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android
    alignItems: 'center', // Center text horizontally
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#007AFF',
    margin: 8,
    borderRadius: 4,
  },
});
