import {Dimensions, Platform} from "react-native";

/** The standard theme and font of the application **/

const {height} = Dimensions.get("window");

export const font = {
    regular: 18,
    large: 30,
    medium: 24,
    fontFamily: Platform.OS === 'ios' ? 'PingFangSC-Regular' : 'sans-serif-light'
};

export const lightTheme = {
    colors: {
        primary: '#137EB0',
        primaryRGBA: 'rgba(19, 126, 176, 0.5)',
        backgroundDark: '#C4CFD4',
        backgroundLight: '#FAFAFA',
        card: '#181A1D',
        text: '#293337',
        border: '#708C98',
        buttonText: '#DEDFE0'
    },
    font: {
        ...font
    },
    smallScreen: height <= 600
};

export const darkTheme = {
    colors: {
        primary: '#158BBE',
        primaryRGBA: 'rgba(21, 139, 190, 0.5)',
        backgroundDark: '#181A1D',
        backgroundLight: '#32373C',
        card: '#181A1D',
        text: '#DEDFE0',
        border: '#3D5A6C',
        buttonText: '#DEDFE0'
    },
    font: {
        ...font
    },
    smallScreen: height <= 600
};
