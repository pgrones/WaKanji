import {Platform} from "react-native";

/** The standard theme and font of the application **/

export const font = {
    regular: 18,
    large: 30,
    medium: 24,
    fontFamily: Platform.OS === 'ios' ? 'PingFangSC-Regular' : 'sans-serif-light'
};

export const lightTheme = {
    colors: {
        primary: '#137EB0',
        backgroundDark: '#DAE4F6',
        backgroundLight: '#FAFAFA',
        card: '#181A1D',
        text: '#293337',
        border: '#708C98',
        buttonText: '#DEDFE0'
    },
    font:{
        ...font
    }
};

export const darkTheme = {
    colors: {
        primary: '#158BBE',
        backgroundDark: '#181A1D',
        backgroundLight: '#32373C',
        card: '#181A1D',
        text: '#DEDFE0',
        border: '#3D5A6C',
        buttonText: '#DEDFE0'
    },
    font:{
        ...font
    }
};
