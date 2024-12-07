import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function HomeScreen() {
  useEffect(() => {
    const lockToPortrait = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    lockToPortrait();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  },[]);

  return (
    <View style={styles.container}>
      <Image 
      source={require("../../assets/images/sea.jpg")}
      style={styles.background} />
      <Text style={styles.title}>START YOUR JOURNEY</Text>

      <TouchableOpacity style={styles.button} onPress={() => alert('Button Pressed')}>
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        {/* Start Point Icon */}
        <Image
          source={require("../../assets/images/start-icon.png")}
          style={styles.icon}
        />
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={styles.progress}></View>
        </View>
        {/* End Point Icon */}
        <Image
          source={require("../../assets/images/end-icon.png")}
          style={styles.icon}
        />
      </View>

      {/* Boat Section */}
      <Image
        source={require("../../assets/images/boat.png")} // Add boat image
        style={styles.boat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87CEEB",
  },
  button: {
    backgroundColor: '#2e6ddf',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2e6ddf",
    marginBottom: 20,
  },
  progressContainer: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  progressBar: {
    flex: 1,
    height: 20,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  progress: {
    width: "30%", // Adjust this value to set progress
    height: "100%",
    backgroundColor: "#2e6ddf",

  },
  boat: {
    width: 200,
    height: 120,
    resizeMode: "contain",
    position: "absolute",
    bottom: 20,
  },
});
