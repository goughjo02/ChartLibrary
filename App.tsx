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
        data: e
      }));
    });
  }
  render() {
    let { data, source } = this.state;
    data = data.filter(e => e.Source === source);
    return (
      <View style={styles.container}>
        {data[0] && (
          <Chart<Data>
            yKey={"Mean"}
            xKey={"Year"}
            surfaceColor={"#888"}
            color={"#00f"}
            height={400}
            width={600}
            data={data}
            strokeWidth={1}
            topPadding={10}
            bottomPadding={40}
            leftPadding={40}
            rightPadding={20}
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
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
