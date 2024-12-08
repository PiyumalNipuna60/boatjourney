import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";

const boat = require('../../assets/images/boat2.png'); 
const ship = require('../../assets/images/ship.png'); 
const seaImage = require('../../assets/images/sea.jpg');

export default function GameStartPage() {
  const [diesel, setDiesel] = useState(100);
  const [distance, setDistance] = useState(0);// Start at the top (0)
  const [shipScale] = useState(new Animated.Value(1)); // Start small (scale 0.5)

  // Animation for ship movement and scaling
  useEffect(() => {
    const moveShip = () => {
      Animated.loop(
        Animated.sequence([
          // Move down and scale up
         
          Animated.timing(shipScale, {
            toValue: 40, // Grow ship size as it moves
            duration: 3500, // Scale over the full duration of the movement
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    moveShip(); // Start the ship animation when the component mounts
  }, [ shipScale]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Diesel and distance logic can be added here
    }, 100);

    return () => clearInterval(interval);
  }, [diesel, distance]);

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
      <View style={[styles.boatContainer]}>
        <Image source={boat} style={styles.boatImage} />
      </View>

      {/* Moving Ship */}
      <Animated.View
        style={[
          styles.shipContainer,
          {
            transform: [ // Move down
              { scale: shipScale }, // Scale the ship
            ],
          },
        ]}
      >
        <Image source={ship} style={styles.ship} />
      </Animated.View>
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
    left: "40%",
    transform: [{ translateX: -50 }],
  },
  boatImage: {
    width: 300, // Adjust the size of the boat
    height: 300,
  },
  shipContainer: {
    position: "absolute",
    top:"40%", // Start at the top of the screen
    left: "40%", // Align to the center
  },
  ship: {
    width: 10, // Adjust the size of the ship
    height: 10,
  },
});
