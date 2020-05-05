import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import PracticeSelectionScreen from "../views/practice/PracticeSelectionScreen";
import TimeBasedGameWrapper from "../views/practice/TimeBasedGameWrapper";

const Stack = createStackNavigator();

export const PracticeScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Practice" options={{title: "Practice  練習"}} component={PracticeSelectionScreen}/>
            <Stack.Screen name="Game" options={{title: "Flash Cards", headerLeft: null}}
                          component={TimeBasedGameWrapper}/>
        </Stack.Navigator>
    );
};
