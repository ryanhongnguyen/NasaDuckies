import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';

// Get screen dimensions
const screenWidth = Dimensions.get('window').width;

const CombinedSurvey = ({ navigation }) => {
  const [farmerName, setFarmerName] = useState('');
  const [selectedCrops, setSelectedCrops] = useState([]); // Now an array for multiple choice
  const [experience, setExperience] = useState('');

  // Progress bar calculation (33% for each section completed)
  const progressPercentage =
    [farmerName, selectedCrops.length > 0, experience].filter(Boolean).length * 33 + '%';

  const handleSave = () => {
    console.log('Farmer Name:', farmerName);
    console.log('Selected Crops:', selectedCrops);
    console.log('Experience Level:', experience);
    navigation.navigate('NextSurveyScreen');
  };

  // Function to handle selection/unselection of crops
  const toggleCropSelection = (crop) => {
    if (selectedCrops.includes(crop)) {
      // Unselect the crop if it's already selected
      setSelectedCrops(selectedCrops.filter((item) => item !== crop));
    } else {
      // Select the crop if it's not selected
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Farmer Profile</Text>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: progressPercentage }]} />
      </View>

      {/* Farmer Name Section */}
      <Text style={styles.question}>What's your name?</Text>
      <TextInput
        style={styles.inputField}
        value={farmerName}
        onChangeText={setFarmerName}
        placeholder="Enter your name"
      />

      {/* Crop Survey Section */}
      <Text style={styles.question}>What crops do you grow? (Select multiple)</Text>

      {['Wheat', 'Corn', 'Soy'].map((crop) => (
        <TouchableOpacity
          key={crop}
          style={[styles.optionButton, selectedCrops.includes(crop) ? styles.selectedButton : null]}
          onPress={() => toggleCropSelection(crop)}
        >
          <Text style={styles.optionText}>{crop}</Text>
        </TouchableOpacity>
      ))}

      {/* Farming Experience Section */}
      <Text style={styles.question}>What is your farming experience level?</Text>

      <TouchableOpacity
        style={[styles.optionButton, experience === 'Beginner' ? styles.selectedButton : null]}
        onPress={() => setExperience('Beginner')}
      >
        <Text style={styles.optionText}>Beginner (0-2 years)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionButton, experience === 'Intermediate' ? styles.selectedButton : null]}
        onPress={() => setExperience('Intermediate')}
      >
        <Text style={styles.optionText}>Intermediate (3-5 years)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionButton, experience === 'Advanced' ? styles.selectedButton : null]}
        onPress={() => setExperience('Advanced')}
      >
        <Text style={styles.optionText}>Advanced (6+ years)</Text>
      </TouchableOpacity>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save & Continue</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
  inputField: {
    borderBottomColor: '#AEB5BF',
    borderBottomWidth: 1,
    width: '100%',
    maxWidth: 500,
    padding: 10,
    marginVertical: 20,
    fontSize: 16,
  },
  progressBar: {
    width: '100%',
    maxWidth: 500,
    height: 4,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  progress: {
    height: '100%',
    backgroundColor: 'green',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginVertical: 10,
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    borderRadius: 25,
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#65b5ff',
    padding: 15,
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 30,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CombinedSurvey;
