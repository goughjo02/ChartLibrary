import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface } from "./components/surface/surface";
interface MyProps {}
interface MyState {}

export default class App extends React.Component<MyProps, MyState> {
  render() {
    return (
      <View style={styles.container}>
        <Surface height={500} width={500} />
        <Text>test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
