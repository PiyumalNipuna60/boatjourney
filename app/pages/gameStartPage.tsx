import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";

export default function GameStartPage() {
  const [diesel, setDiesel] = useState(100);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (diesel > 0) {
        setDiesel(diesel - 1);
        setDistance(distance + 1);
      } else {
        clearInterval(interval);
        Alert.alert("Out of fuel", "You have run out of fuel!", [
          { text: "OK" },
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [diesel, distance]);

  return (
    <View style={styles.container}>
      {/* Sea Background */}
      <Image
        source={require("../../assets/images/sea.jpg")}
        style={styles.seaBackground}
      />

      {/* Fuel and Distance Display */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Fuel</Text>
            <View style={styles.fullPatent}>
              <Image
                source={require("../../assets/images/end-icon.png")}
                style={styles.icon}
              />
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
              <Image
                source={require("../../assets/images/start-icon.png")}
                style={styles.icon}
              />
              <View style={styles.distanceBarContainer}>
                <View style={[styles.distanceBar, { width: `${distance}%` }]} />
              </View>
              <Image
                source={require("../../assets/images/end-icon.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.distanceText}>{`${distance} km`}</Text>
          </View>
        </View>
      </View>

      {/* Boat Image */}
      <View style={[styles.boatContainer]}>
        <Image
          source={require("../../assets/images/boat.png")}
          style={styles.boatImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
  value: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  fuelBarContainer: {
    width: 130,
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },
  fullPatent: {
    flexDirection: "row",
    marginLeft: -20,
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
    bottom: 50, // Adjust the position of the boat
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  boatImage: {
    width: 150, // Adjust the size of the boat
    height: 150,
  },
});
