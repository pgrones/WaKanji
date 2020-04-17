import React from "react";
import {Text} from "react-native";
import {connect} from "react-redux";
import {darkTheme, lightTheme} from "./Theme";
import {useColorScheme} from "react-native-appearance";

const TabBarIcon = ({focused, iconText, theme}) => {
    const scheme = useColorScheme();
    const getIconColor = () => {
        if (theme === 'systemStandard') {
            if (focused) {
                const theme = scheme === 'dark' ? darkTheme : lightTheme;
                return theme.colors.primary
            } else {
                const theme = scheme === 'dark' ? darkTheme : lightTheme;
                return theme.colors.text
            }
        } else if (theme === 'dark') {
            if (focused) {
                return darkTheme.colors.primary
            } else {
                return darkTheme.colors.text
            }
        } else {
            if (focused) {
                return lightTheme.colors.primary
            } else {
                return lightTheme.colors.text
            }
        }
    };

    return (
        <Text style={{
            fontSize: 18,
            color: getIconColor()
        }}>
            {iconText}
        </Text>
    )
};

const mapStateToProps = state => ({
    theme: state.theme
});

export default connect(mapStateToProps)(TabBarIcon)
