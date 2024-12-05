import { Image, StyleSheet, Platform } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <label className="text-2xl mb-4 font-bold text-center color">
        Start Your Journey
      </label>
      <button
                style={styles.button}
            >
                Tap me for an alert
            </button>
            <button
                style={styles.button}
            >
                Go to next screen
            </button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    fontSize: 24,
    color: "#2e6ddf",
  },
});
