import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../../../supabase';

const CropSurvey = ({ navigation }) => {
  const [cropType, setCropType] = useState('');

  const saveCropType = async () => {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('profiles')
      .update({ crop_type: cropType })
      .eq('id', user.id);

    if (error) {
      console.error('Error saving crop type:', error.message);
    } else {
      console.log('Crop type saved:', data);
      navigation.navigate('NextSurveyScreen'); // Navigate to next survey
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Profile</Text>
      <Text style={styles.question}>What crop do you grow?</Text>

      <TouchableOpacity style={styles.optionButton} onPress={() => setCropType('Wheat')}>
        <Text style={styles.optionText}>Wheat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => setCropType('Corn')}>
        <Text style={styles.optionText}>Corn</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => setCropType('Soy')}>
        <Text style={styles.optionText}>Soy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={saveCropType}>
        <Text style={styles.saveButtonText}>Save & Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 18,
    marginVertical: 20,
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 25,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  saveButton: {
    backgroundColor: '#65b5ff',
    padding: 15,
    width: '80%',
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

export default CropSurvey;
