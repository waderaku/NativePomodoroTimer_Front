import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const LoggedOutScreen: FC = () => {
  return (
    <SafeAreaProvider>
      <Text style={styles.text}>You have to log in first!</Text>
    </SafeAreaProvider>
  );
};

export default LoggedOutScreen;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    padding: 5,
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});