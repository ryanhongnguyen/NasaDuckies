import { Text, View, TextInput, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useState } from "react";
import { supabase } from '../utils/hooks/supabase';

// Components
import ReturnButton from "../components/ReturnButton";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alreadyInUseButton, setAlreadyInUseButton] = useState(false);
  const [alreadyInUseMessage, setAlreadyInUseMessage] = useState('');

  async function handleSubmit() {
    console.log("handle submit invoked!!");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            // Add more metadata if needed
            // first_name: 'John',
            // last_name: 'Doe',
          },
        },
      });

      if (error) {
        console.error("Error signing up:", error.message);
        if (error.message.includes("User already registered")) {
          setAlreadyInUseButton(true);
          setAlreadyInUseMessage("That email is already associated with a username");
        } else {
          setAlreadyInUseMessage('');
        }
      } else {
        console.log("User signed up:", data);
        // After successful signup, insert into the profiles table
        await insertUserProfile(data.user);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  const insertUserProfile = async (user) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: user.id, // Assuming 'id' is the primary key for profiles
          email: user.email || email, // User's email, fallback to state variable
          surveyCompleted: false,
        },
      ]);

    if (error) {
      console.error('Error inserting user profile:', error);
    } else {
      console.log('User profile inserted:', data);
      // Optionally navigate to a different screen here
    }
  };

  return (
    <View style={styles.signUpScreen}>
      <ReturnButton navigation={navigation} returnName="AuthHome" />
      <Text style={styles.signUpTitle}>Sign Up</Text>
      <View style={styles.signUpFields}>
        <Text style={styles.accountExistsText}>{alreadyInUseMessage}</Text>
        <Text style={styles.inputText}>USERNAME OR EMAIL</Text>
        <TextInput
          style={styles.inputField}
          secureTextEntry={false}
          autoCapitalize="none"
          onChangeText={setEmail} // Directly set email state
        />
        <Text style={styles.inputText}>PASSWORD</Text>
        <TextInput
          style={styles.inputField}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={setPassword} // Directly set password state
        />
        <Text style={styles.disclaimerText}>
          By tapping Sign Up & Accept, you acknowledge that you have read the{" "}
          <TouchableOpacity
            styles={styles.blueText}
            onPress={() =>
              Linking.openURL(
                "https://www.nasa.gov/privacy/#:~:text=The%20information%20you%20provide%20on,the%20Freedom%20of%20Information%20Act"
              )
            }
          >
            <Text style={styles.blueText}>Privacy Policy</Text>
          </TouchableOpacity>{" "}
        </Text>
      </View>
      {password.length >= 4 && (
        <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
          <Text style={styles.signUpText}>{"Sign Up & Accept"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  signUpScreen: {
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  signUpTitle: {
    position: "absolute",
    top: 150,
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 2,
  },
  signUpFields: {
    width: 250,
    height: 80,
    position: "absolute",
    top: 200,
  },
  inputText: {
    marginBottom: 20,
    color: "#B1B1B1",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  inputField: {
    borderBottomColor: "#AEB5BF",
    borderBottomWidth: 1,
    marginBottom: 20,
    fontWeight: "600",
  },
  disclaimerText: {
    top: 135,
    fontSize: 12,
    textAlign: "center",
  },
  blueText: {
    color: "#2B83B3",
    fontSize: 12,
    paddingTop: 2,
  },
  signUpButton: {
    padding: 15,
    backgroundColor: "#65b5ff",
    width: 250,
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    bottom: 25,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
  },
  accountExistsText: {
    fontSize: 12,
    fontWeight: "600",
    color: "red",
    padding: 5,
    textAlign: "center",
  },
});
