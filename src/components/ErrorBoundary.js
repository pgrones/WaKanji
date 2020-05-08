import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {Appearance, AppearanceProvider} from "react-native-appearance";
import {darkTheme, lightTheme} from "./helper/Theme";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        console.log('error')
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.log((error));
        console.log((errorInfo));
    }

    render() {
        return this.state.hasError ?
            <AppearanceProvider>
                <View style={getStyle(this.props.theme).container}>
                    <Text style={getStyle(this.props.theme).text}>
                        {"Something went wrong. Good thing this is just an alpha build~" +
                        "\nPlease restart the app and send a bug report using the link in the settings tab." +
                        "\nTry to include all steps to reproduce the issue.\n\n Thank's a bunch!"}
                    </Text>
                </View>
            </AppearanceProvider>
            :
            this.props.children;
    }
}

const mapStateToProps = state => ({
    theme: state.theme
});

export default connect(mapStateToProps)(ErrorBoundary)

const getStyle = (theme) => {
    const scheme = Appearance.getColorScheme();

    const getTheme = () => {
        switch (theme) {
            case 'systemStandard':
                return scheme === 'dark' ? darkTheme : lightTheme;
            case 'dark':
                return darkTheme;
            case 'light':
                return lightTheme;
        }
    };

    const actualTheme = getTheme(theme);

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: actualTheme.colors.card,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
        },
        text: {
            fontSize: actualTheme.font.regular,
            fontFamily: actualTheme.font.fontFamily,
            color: actualTheme.colors.text,
            textAlign: "center"
        },
    })
}
