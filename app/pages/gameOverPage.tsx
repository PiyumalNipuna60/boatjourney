import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image,Animated, } from "react-native";

import { NavigationProp,  } from '@react-navigation/native';
const background = require("../../assets/images/dark_background_sea.png");
const boat = require("../../assets/images/boat.png");
const sinking_boat = require("../../assets/images/sinking_boat.png");

interface Props {
  navigation: NavigationProp<any>;
}

const GameOverPage: React.FC<Props> = ({ navigation }) => {
  const handleRestart = () => {
    // Handle game restart logic (e.g., navigate to the game page)
    navigation.navigate("GameStartPage");
  };

  const handleHome = () => {
    // Navigate to the home screen
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
       <Image source={background} style={styles.seaBackground} />
      <Text style={styles.title}>GAME OVER!</Text>
      <Text style={styles.subtitle}>
        Your life will end up this way, if you illegally journey by boat to
        Australia!
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>RESTART</Text>
        </TouchableOpacity>
        <Animated.View
        style={styles.boatContainer}>
        <Image source={boat} style={styles.boatImage} />
      </Animated.View>

      <Animated.View
        style={styles.boatContainer1}>
        <Image source={sinking_boat} style={styles.boatImage1} />
      </Animated.View>
        
        <TouchableOpacity style={styles.button} onPress={handleHome}>
          <Text style={styles.buttonText}>HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameOverPage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  seaBackground: {
    position: "absolute",
    width: "130%",
    height: "130%",
    zIndex: -1,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    backgroundColor: "#FF5722", // Orange button color
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  boatContainer: {
    width: "200%",
    height: "550%",
    left:'25%',
    position: "absolute",
  },
  boatImage: {
    width: "30%",
    height: "30%",
  },
  boatContainer1: {
    width: "200%",
    height: "550%",
    left:'25%',
    position: "absolute",
  },
  boatImage1: {
    width: "40%",
    height: "40%",
    zIndex: 1,
  },
});
