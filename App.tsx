import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface, Data } from "./components/surface/surface";
// import { data } from './data';

interface MyProps {}
interface MyState {
  data: Data[];
}

function fetchData(url: string): Promise<Data[]> {
  return new Promise(resolve => {
    fetch(url).then(e => {
      resolve(e.json());
    });
  });
}

export default class App extends React.Component<MyProps, MyState> {
  state = {
    data: []
  };
  componentDidMount(): void {
    fetchData(
      "https://raw.githubusercontent.com/goughjo02/ChartLibrary/master/data.json"
    ).then(e => {
      this.setState({ data: e });
    });
  }
  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <Surface height={500} width={500} data={data} />
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
