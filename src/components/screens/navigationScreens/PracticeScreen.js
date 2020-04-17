import {createStackNavigator} from "@react-navigation/stack";
import {Text, View} from "react-native";
import React from "react";
import PracticeSelectionScreen from "../views/practice/PracticeSelectionScreen";

const Stack = createStackNavigator();

export const PracticeScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Practice" component={PracticeSelectionScreen}/>
            <Stack.Screen name="Details" component={Details}/>
        </Stack.Navigator>
    );
};

const Details = ({route}) => {
    return (
        <View><Text>Details {route.params.count}</Text></View>
    )
};
