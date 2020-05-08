import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {Platform} from "react-native";

const font = {
    regular: 18,
    large: 30,
    medium: 24,
    fontFamily: Platform.OS === 'ios' ? 'PingFangSC-Regular' : ''
};

export const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        buttonText: '#e5e5e7'
    },
    font:{
        ...font
    }
};

export const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        buttonText: '#e5e5e7'
    },
    font:{
        ...font
    }
};
