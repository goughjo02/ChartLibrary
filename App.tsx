import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Chart } from "./components/line-chart/chart/chart";

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
      this.setState(prevState => ({
        data: e.filter(e => e.Source === prevState.source)
      }));
    });
  }
  render() {
    let { data } = this.state;
    return (
      <View style={styles.container}>
        {data[0] && (
          <Chart<Data>
            yKey={"Mean"}
            xKey={"Year"}
            color={"#00f"}
            height={400}
            width={800}
            data={data}
            strokeWidth={1}
            topPadding={0}
            bottomPadding={0}
            leftPadding={0}
            rightPadding={0}
            xInner={10}
            xOuter={10}
            yInner={10}
            yOuter={10}
          />
        )}
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
