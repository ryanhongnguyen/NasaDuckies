import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions
const screenWidth = Dimensions.get('window').width;

const CombinedSurvey = ({ navigation }) => {
  const [farmerName, setFarmerName] = useState('');
  const [cropType, setCropType] = useState('');
  const [experience, setExperience] = useState('');

    // Progress bar calculation (33% for each field completed)
    const progressPercentage = 
    [farmerName, cropType, experience].filter(Boolean).length * 33 + '%';

  const handleSave = () => {
    console.log('Farmer Name:', farmerName);
    console.log('Crop Type:', cropType);
    console.log('Experience Level:', experience);
    navigation.navigate('NextSurveyScreen');
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.question}>What crop do you grow?</Text>
      <TouchableOpacity
        style={[styles.optionButton, cropType === 'Wheat' ? styles.selectedButton : null]}
        onPress={() => setCropType('Wheat')}
      >
        <Text style={styles.optionText}>Wheat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionButton, cropType === 'Corn' ? styles.selectedButton : null]}
        onPress={() => setCropType('Corn')}
      >
        <Text style={styles.optionText}>Corn</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionButton, cropType === 'Soy' ? styles.selectedButton : null]}
        onPress={() => setCropType('Soy')}
      >
        <Text style={styles.optionText}>Soy</Text>
      </TouchableOpacity>

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

      <Text>Debugger for Farmer Name: {farmerName}</Text>
      <Text>Debugger for Crop Type: {cropType}</Text>
      <Text>Debugger for Experience: {experience}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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