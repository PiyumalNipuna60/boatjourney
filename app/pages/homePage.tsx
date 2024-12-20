import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video, ResizeMode, Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const backgroundMusic = require('../../assets/audio/seaSound.m4a');
const boat = require('../../assets/images/boat.png'); 
const background = require('../../assets/video/background.mp4'); 
const endIcon = require('../../assets/images/icon/australia.png');  
const startIcon = require('../../assets/images/icon/sri_lanka.png'); 

export default function HomeScreen() {
  const [progress, setProgress] = useState(0); 
  const [isStarted, setIsStarted] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const navigation = useNavigation();


  useEffect(() => {
    const lockToPortrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    lockToPortrait();

    // Start the background music when the component mounts
    const playBackgroundMusic = async () => {
      const { sound } = await Audio.Sound.createAsync(
        backgroundMusic,
        { shouldPlay: true, isLooping: true } // Looping the music
      );
      setSound(sound);
    };

    playBackgroundMusic(); // Play the music

    let progressInterval: NodeJS.Timeout;
    if (isStarted) {
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(progressInterval);
            navigation.navigate('GameStartPage'); // Navigate to the GameStartPage when progress reaches 100%
            return 100;
          }
          return prevProgress + 5;
        });
      }, 100);
    }

    return () => {
      clearInterval(progressInterval);
      ScreenOrientation.unlockAsync();
      sound?.unloadAsync(); // Unload the sound when the component unmounts
    };
  }, [isStarted]);

  const handleStartButton = () => {
    setIsStarted(true); // Set isStarted to true when the button is clicked
  };

  return (
    <View style={styles.container}>
      {/* Use the Video component to show the GIF */}
      <Video
        source={background}  // Use your GIF URL here
        style={styles.background}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.COVER}
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
          source={startIcon}
          style={styles.icon}
        />
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]}></View>
        </View>
        {/* End Point Icon */}
        <Image
          source={endIcon}
          style={styles.icon}
        />
      </View>

      {/* Boat Section */}
      <Image
        source={boat}
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
    bottom: 15,
  },
  icon: {
    width:70,
    height: 70,
    resizeMode: "contain",
  },
  progressBar: {
    flex: 1,
    height: 30,
    backgroundColor: "#d3d3d3",
    borderRadius: 20,
    borderColor:'#2e6ddf',
    borderWidth:4,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#e8df33",
  },
  boat: {
    width: 200,
    height: 120,
    resizeMode: "contain",
    position: "absolute",
    bottom: -30,
  },
});
