import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import PracticeSelectionScreen from "../views/practice/PracticeSelectionScreen";
import TimeBasedGame from "../views/practice/TimeBasedGame";

const Stack = createStackNavigator();

export const PracticeScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Practice  練習" component={PracticeSelectionScreen}/>
            <Stack.Screen name="Game" component={TimeBasedGame}/>
        </Stack.Navigator>
    );
};
