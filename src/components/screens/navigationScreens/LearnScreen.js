import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import KanjiGridScreen from "../views/KanjiGridScreen";
import GradesScreen from "../views/GradesScreen";

const Stack = createStackNavigator();

export const LearnScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Learn" options={{title: 'Learn  学'}} component={GradesScreen}/>
            <Stack.Screen name="KanjiGrid" component={KanjiGridScreen}/>
        </Stack.Navigator>
    );
};
