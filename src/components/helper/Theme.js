import {DarkTheme, DefaultTheme} from "@react-navigation/native";

export const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors
    }
};

export const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors
    }
};
