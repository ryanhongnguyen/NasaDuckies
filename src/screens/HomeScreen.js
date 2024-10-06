import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.homeScreen}>
      <View style={styles.homeIcon}>
        <Image
          style={styles.ghostLogo}
          source={require("../../assets/themes/plant.png")}
        />
      </View>
      <View style={styles.homeButtons}>
        <TouchableOpacity
          style={[styles.button, styles.logIn]}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.signUp]}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: "#f7f8fa", // Softer, neutral background color
    height: "100%",
    width: "100%",
    justifyContent: "center", // Center content vertically
    alignItems: "center",
  },
  homeIcon: {
    marginBottom: 50, // More space below the logo
    alignItems: "center",
  },
  ghostLogo: {
    width: 100, // Slightly bigger for better visibility
    height: 100,
    tintColor: "#333", // Make the logo monochromatic to align with minimal design
  },
  homeButtons: {
    width: "80%", // Slightly reduce the button width to allow more breathing room
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    paddingVertical: 15, // Reduced padding for a cleaner, less bulky look
    borderRadius: 10, // Rounded corners for modern design
    marginVertical: 10, // More spacing between buttons
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18, // Reduced font size for a more minimalistic feel
    fontWeight: "500", // Slightly lighter font weight
    letterSpacing: 2, // Reduced letter spacing for a cleaner look
  },
  logIn: {
    backgroundColor: "#333", // Neutral dark color for a sleek look
  },
  signUp: {
    backgroundColor: "#007AFF", // Use a bold but classic color for contrast
  },
});
