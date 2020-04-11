import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {Platform} from "react-native";

const font = {
    regular: 18,
    fontFamily: Platform.OS === 'ios' ? 'PingFangSC-Regular': ''
};

export const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors
    },
    font:{
        ...font
    }
};

export const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors
    },
    font:{
        ...font
    }
};
