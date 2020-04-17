import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import KanjiGridScreen from "../views/learn/KanjiGridScreen";
import GradesScreen from "../views/learn/GradesScreen";
import KanjiInfoScreen from "../views/learn/KanjiInfoScreen";

const Stack = createStackNavigator();

export const LearnScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Learn" options={{title: 'Learn  学'}} component={GradesScreen}/>
            <Stack.Screen name="KanjiGrid" component={KanjiGridScreen}/>
            <Stack.Screen name={"KanjiInfo"} component={KanjiInfoScreen}/>
        </Stack.Navigator>
    );
};
