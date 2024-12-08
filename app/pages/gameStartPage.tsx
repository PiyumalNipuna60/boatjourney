import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity, Dimensions} from "react-native";

const boat = require('../../assets/images/boat2.png');
const ship = require('../../assets/images/ship.png');
const seaImage = require('../../assets/images/sea.jpg');

const { width: screenWidth } = Dimensions.get("window");

export default function GameStartPage() {
  const [diesel] = useState(100);
  const [distance] = useState(0);
  const [shipScale] = useState(new Animated.Value(1));
  const [shipLeft] = useState(100); 
  const [boatPosition] = useState(new Animated.Value(0)); // Start from the center horizontally
  
  const moveStep = 100; // Move step in px
  const maxLeft = 0; // Start position (left boundary)
  const maxRight = screenWidth - 200; // Max right position (can be adjusted based on your screen width)

  // Function to move the boat left
  const moveBoatLeft = () => {
    boatPosition.stopAnimation((currentValue) => {
      const newPosition = Math.max(currentValue - moveStep, maxLeft); // Prevent going beyond left boundary
      Animated.timing(boatPosition, {
        toValue: newPosition,
        duration: 300, // Duration of the animation
        useNativeDriver: true,
      }).start();
    });
  };

  // Function to move the boat right
  const moveBoatRight = () => {
    boatPosition.stopAnimation((currentValue) => {
      const newPosition = Math.min(currentValue + moveStep, maxRight); // Prevent going beyond right boundary
      Animated.timing(boatPosition, {
        toValue: newPosition,
        duration: 300, // Duration of the animation
        useNativeDriver: true,
      }).start();
    });
  };

  // Animation for ship scaling
  useEffect(() => {
    const moveShip = () => {
      Animated.loop(
        Animated.sequence([  
          Animated.timing(shipScale, {
            toValue: 40, 
            duration: 3500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    moveShip();
  }, [shipScale]);

  return (
    <View style={styles.container}>
      {/* Sea Background */}
      <Image source={seaImage} style={styles.seaBackground} />

      {/* Fuel and Distance Display */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Fuel</Text>
            <View style={styles.fullPatent}>
              <View style={styles.fuelBarContainer}>
                <View style={[styles.fuelBar, { width: `${diesel}%` }]} />
              </View>
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
        style={[styles.boatContainer, { transform: [{ translateX: boatPosition }] }]}
      >
        <Image source={boat} style={styles.boatImage} />
      </Animated.View>

      {/* Moving Ship */}
      <Animated.View
        style={[styles.shipContainer, { transform: [{ scale: shipScale }] }]}>
        <Image source={ship} style={styles.ship} />
      </Animated.View>

      {/* Left and Right Buttons */}
      <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={moveBoatLeft} style={styles.button}>
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={moveBoatRight} style={styles.button}>
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
    top: 20,
    right: 20,
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
    width: 130,
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
    backgroundColor: "#44ff44", // Green color for distance
    height: "100%",
  },
  distanceText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  boatContainer: {
    position: "absolute",
    bottom: 5,
    transform: [{ translateX: -50 }],
  },
  boatImage: {
    width: 300, // Adjust the size of the boat
    height: 300,
  },
  shipContainer: {
    position: "absolute",
    top: "40%",
    left: "40%",
  },
  ship: {
    width: 10,
    height: 10,
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
