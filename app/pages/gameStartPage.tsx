import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  Easing,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const boat = require("../../assets/images/boat.png");
const ship = require("../../assets/images/ship.png");
const lightning = require("../../assets/images/lightning.png");
const sadsad = require("../../assets/images/sadsad.png");
const shark = require("../../assets/images/shark.png");
const tonardo = require("../../assets/images/tonardo.png");
const seaImage = require("../../assets/images/sea.jpg");
const endIcon = require('../../assets/images/icon/australia.png');  
const startIcon = require('../../assets/images/icon/sri_lanka.png'); 

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function GameStartPage() {
  const [diesel, setDiesel] = useState(100); // Fuel state
  const [distance, setDistance] = useState(0); // Distance state
  const [shipPosition] = useState(new Animated.Value(100)); // Vertical position of the ship
  const [shipStartX] = useState(new Animated.Value(Math.random() * (screenWidth - 70))); // Random horizontal position of the ship
  const initialBoatPosition = (screenWidth - 350) / 2; // Center the boat horizontally
  const [boatPosition] = useState(new Animated.Value(initialBoatPosition)); // Horizontal position of the boat
  const [intervalId, setIntervalId] = useState(null);
  const navigation = useNavigation();

  const moveStep = 100;
  const maxLeft = 0;
  const maxRight = screenWidth - 300;

  // Function to move the boat left smoothly
  const moveBoatLeft = () => {
    boatPosition.stopAnimation((currentValue) => {
      const newPosition = Math.max(currentValue - moveStep, maxLeft);
      Animated.timing(boatPosition, {
        toValue: newPosition,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  };

  // Function to move the boat right smoothly
  const moveBoatRight = () => {
    boatPosition.stopAnimation((currentValue) => {
      const newPosition = Math.min(currentValue + moveStep, maxRight);
      Animated.timing(boatPosition, {
        toValue: newPosition,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  };

  // Continuous movement of boat left
  const moveBoatLeftLong = () => {
    if (intervalId) clearInterval(intervalId);

    const id = setInterval(() => {
      moveBoatLeft();
    }, 1);

    setIntervalId(id);
  };

  // Continuous movement of boat right
  const moveBoatRightLong = () => {
    if (intervalId) clearInterval(intervalId);

    const id = setInterval(() => {
      moveBoatRight();
    }, 1);

    setIntervalId(id);
  };

  // Stop continuous movement when user stops pressing
  const stopBoatMovement = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Handle fuel reduction and distance increase over time
  useEffect(() => {
    const updateProgress = () => {
      if (diesel > 0) {
        setDiesel((prevDiesel) => Math.max(prevDiesel - 2, 0)); // Decrease fuel
      }
      setDistance((prevDistance) => Math.min(prevDistance + 1, 100)); // Increase distance
    };

    const id = setInterval(updateProgress, 500);

    // Trigger alert when fuel reaches 0
    if (diesel === 0) {
      Alert.alert(
        "Fuel Exhausted",
        "You've run out of fuel! Game Over.",
        [{ text: "OK", onPress: () => navigation.navigate('GameEndPage') }]
      );
    }

    return () => clearInterval(id);
  }, [diesel]);

  // Animation for ship moving vertically
  useEffect(() => {
    const moveShip = () => {
      shipStartX.setValue(Math.random() * (screenWidth - 70)); // Reset to a new random horizontal position
      shipPosition.setValue(-100); // Start above the screen

      Animated.timing(shipPosition, {
        toValue: screenHeight, // Move to the bottom of the screen
        duration: 4000, // Duration of the animation
        useNativeDriver: true,
      }).start(() => moveShip()); // Loop the animation
    };

    moveShip();
  }, [shipPosition, shipStartX]);

  return (
    <View style={styles.container}>
      {/* Sea Background */}
      <Image source={seaImage} style={styles.seaBackground} />

      {/* Fuel and Distance Display */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Fuel</Text>
            <View style={styles.fuelBarContainer}>
              <View style={[styles.fuelBar, { width: `${diesel}%` }]} />
            </View>
            <Text style={styles.fuelPercentage}>{`${diesel}%`}</Text>
          </View>
          {/* Distance Progress Bar */}
          <View style={styles.column}>
            <Text style={styles.label}>Distance</Text>
            <View style={styles.distance}>
              <View style={styles.distanceBarContainer}>
                <View style={[styles.distanceBar, { width: `${distance}%` }]} />
              </View>
            </View>
            <Text style={styles.distanceText}>{`${distance} km`}</Text>
          </View>
        </View>
      </View>

      {/* Boat Image */}
      <Animated.View
        style={[
          styles.boatContainer,
          { transform: [{ translateX: boatPosition }] },
        ]}
      >
        <Image source={boat} style={styles.boatImage} />
      </Animated.View>

      {/* Moving Ship */}
      <Animated.View
        style={[
          styles.shipContainer,
          {
            transform: [
              { translateX: shipStartX },
              { translateY: shipPosition },
            ],
          },
        ]}
      >
        <Image source={ship} style={styles.ship} />
      </Animated.View>

      {/* Left and Right Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onLongPress={moveBoatLeftLong}
          onPressOut={stopBoatMovement}
          onPress={moveBoatLeft}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onLongPress={moveBoatRightLong}
          onPressOut={stopBoatMovement}
          onPress={moveBoatRight}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  seaBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  infoContainer: {
    position: "absolute",
    display: "flex",
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    marginHorizontal: 10,
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  fuelBarContainer: {
    width: 110,
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },
  fuelBar: {
    backgroundColor: "#ff4444",
    height: "100%",
  },
  fuelPercentage: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  distanceBarContainer: {
    width: 120,
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },
  distance: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  distanceBar: {
    backgroundColor: "#44ff44",
    height: "100%",
  },
  distanceText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  boatContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "85%",
  },
  boatImage: {
    width: "20%",
    height: "20%",
  },
  shipContainer: {
    position: "absolute",
    width: 70,
    height: 80,
  },
  ship: {
    width: 70,
    height: 80,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 30,
    right: "2%",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "25%",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
