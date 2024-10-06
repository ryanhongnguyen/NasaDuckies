import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../../../supabase';


const FarmerNameSurvey = ({ navigation }) => {
  const [farmerName, setFarmerName] = useState('');

  const saveFarmerName = async () => {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('profiles')
      .update({ farmer_name: farmerName })
      .eq('id', user.id);

    if (error) {
      console.error('Error saving farmer name:', error.message);
    } else {
      console.log('Farmer name saved:', data);
      navigation.navigate('FarmerName'); // Navigate to next survey after saving
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Profile</Text>

      <View style={styles.progressBar}>
        <View style={styles.progress}></View>
      </View>

      
      <Text style={styles.question}>What's your name?</Text>

      <TextInput
        style={styles.inputField}
        value={farmerName}
        onChangeText={setFarmerName}
        placeholder="Enter your name"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveFarmerName}>
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
  inputField: {
    borderBottomColor: '#AEB5BF',
    borderBottomWidth: 1,
    width: '80%',
    padding: 10,
    marginVertical: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#65b5ff',
    padding: 15,
    width: '80%',
    alignItems: 'center',
    borderRadius: 25,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressBar: {
    width: '80%',
    height: 4,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  progress: {
    width: '16%', // For 1/6 progress
    height: '100%',
    backgroundColor: 'green',
},
});

export default FarmerNameSurvey;
