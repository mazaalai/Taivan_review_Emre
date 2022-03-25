import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {VictoryChart, VictoryTheme, VictoryAxis, VictoryCandlestick } from "victory-native";

const initialData = [
    {x: new Date(2016, 6, 1), open: 10, close: 14.45454648500, high: 15, low: 4},
    {x: new Date(2016, 6, 2), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 3), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 4), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 5), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 6), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 7), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 8), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 9), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 10), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 11), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 12), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 13), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 14), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 15), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 16), open: 10, close: 15, high: 16, low: 5},
    {x: new Date(2016, 6, 17), open: 10, close: 15, high: 16, low: 5}
];

export function DrawChart() {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        async function settingData() {
            setData(await fetchData())
        };
        settingData();
    }, [setData]);

    return(
        <View>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 25 }}
                scale={{ x: "time" }}
            >
                <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}/>
                <VictoryAxis dependentAxis
                             domain={[0.062, 0.075]}
                />
                <VictoryCandlestick
                    candleColors={{ positive: "#3dcc3d", negative: "#c43a31" }}
                    data={
                        data.slice(-30)
                    }
                />
            </VictoryChart>
        </View>
    )
}

async function fetchData() {
    // this function will be the one fetching the data via the REST api
    let apiData = [];
    let chartData = [];

    try {
        const url = `https://api.coincap.io/v2/candles?exchange=poloniex&interval=d1&baseId=ethereum&quoteId=bitcoin`
        const response = await fetch(
            url
        );
        const responseJson = await response.json();
        apiData.push(responseJson)
        apiData[0]["data"].map(o => {
            const timestamp = new Date(o["period"]); // timezone: GMT+0100
            chartData.push(
                {x: timestamp, open: o["open"], close: o["close"], high: o["high"], low: o["low"]}
            )
        });
        return chartData;
    } catch (error) {
        console.error(error);
        console.log("Error has occurred: API couldn't fetch prices data")
    }
}