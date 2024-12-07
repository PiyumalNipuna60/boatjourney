import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

export default function HomeScreen() {
  const [progress, setProgress] = useState(0); // State for progress
  const [isStarted, setIsStarted] = useState(false); // State to track button press

  useEffect(() => {
    const lockToPortrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    lockToPortrait();

    let progressInterval: NodeJS.Timeout;
    if (isStarted) {
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prevProgress + 5;
        });
      }, 100);
    }

    return () => {
      clearInterval(progressInterval);
      ScreenOrientation.unlockAsync();
    };
  }, [isStarted]);

  const handleStartButton = () => {
    setIsStarted(true); // Set isStarted to true when the button is clicked
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/sea.jpg")}
        style={styles.background}
      />
      <Text style={styles.title}>START YOUR JOURNEY</Text>

      {/* Conditionally render the button only if isStarted is false */}
      {!isStarted && (
        <TouchableOpacity style={styles.button} onPress={handleStartButton}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
      )}

      <View style={styles.progressContainer}>
        {/* Start Point Icon */}
        <Image
          source={require("../assets/images/start-icon.png")}
          style={styles.icon}
        />
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]}></View>
        </View>
        {/* End Point Icon */}
        <Image
          source={require("../assets/images/end-icon.png")}
          style={styles.icon}
        />
      </View>

      {/* Boat Section */}
      <Image
        source={require("../assets/images/boat.png")}
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
    backgroundColor: "#2e6ddf",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
    width: "60%",
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
