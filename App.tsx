import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Surface } from "./components/line-chart/surface/surface";

interface Data {
  Mean: number;
  Source: string;
  Year: number;
}

interface MyProps {}
interface MyState {
  data: Data[];
  source: Source;
}
enum Source {
  GCAG = "GCAG",
  GISTEMP = "GISTEMP"
}

function fetchData(url: string): Promise<Data[]> {
  return new Promise(resolve => {
    fetch(url).then(e => {
      resolve(e.json());
    });
  });
}

export default class App extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      data: [],
      source: Source.GCAG
    };
  }
  switch = (source: Source) => {
    this.setState({ source: source });
  };
  componentDidMount(): void {
    fetchData(
      "https://raw.githubusercontent.com/goughjo02/ChartLibrary/master/data.json"
    ).then(e => {
      this.setState({ data: e });
    });
  }
  render() {
    let { data } = this.state;
    data = data.filter(e => e.Source === this.state.source);
    return (
      <View style={styles.container}>
        <View>
          <Button
            title={Source.GCAG}
            onPress={() => this.switch(Source.GCAG)}
          />
          <Button
            title={Source.GISTEMP}
            onPress={() => this.switch(Source.GISTEMP)}
          />
        </View>
        {data[0] && <Surface<Data> height={500} width={500} data={data} />}
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
