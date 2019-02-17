import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface, Data } from "./components/surface/surface";
// import { data } from './data';

interface MyProps {}
interface MyState {}


function fetchData(url: string): Promise<Data> {
  return fetch(url).then(e => {
    console.log(e)
    return e.json();
  })
}

export default class App extends React.Component<MyProps, MyState> {
  componentDidMount(): void {
    fetchData('./data.json');
  }
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
