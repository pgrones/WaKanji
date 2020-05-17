import React, {Component} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {Appearance, AppearanceProvider} from "react-native-appearance";
import {darkTheme, lightTheme} from "./helper/Theme";
import {LinearGradient} from "expo-linear-gradient";

/**
 * ErrorBoundary that catches all errors and displays an error text
 * In the best case scenario this screen will never be seen
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false, error: '', errorInfo: ''};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error: error});
        this.setState({errorInfo: errorInfo.componentStack})
    }

    render() {
        return this.state.hasError ?
            <AppearanceProvider>
                <LinearGradient
                    colors={[
                        getTheme(this.props.theme).colors.backgroundLight,
                        getTheme(this.props.theme).colors.backgroundDark
                    ]}
                >
                    <FlatList data={[0]} keyExtractor={(item, index) => index.toString()} renderItem={() =>
                        <View style={getStyle(this.props.theme).container}>
                            <Text style={[getStyle(this.props.theme).text, {fontWeight: 'bold'}]}>
                                {
                                    "Something went wrong.\n Good thing this is just an alpha build~" +
                                    "\nPlease take a screenshot of the first few lines below, restart the app and send a bug report using the link in the settings tab." +
                                    "\nTry to include all steps to reproduce the issue.\n\n Thank's a bunch!\n\n"
                                }
                            </Text>
                            <Text style={getStyle(this.props.theme).text}>
                                {this.state.error + "\n" + this.state.errorInfo}
                            </Text>
                        </View>
                    }/>
                </LinearGradient>
            </AppearanceProvider>
            :
            this.props.children;
    }
}

const mapStateToProps = state => ({
    theme: state.theme
});

export default connect(mapStateToProps)(ErrorBoundary)

const getTheme = (theme) => {
    const scheme = Appearance.getColorScheme();

    switch (theme) {
        case 'systemStandard':
            return scheme === 'dark' ? darkTheme : lightTheme;
        case 'dark':
            return darkTheme;
        case 'light':
            return lightTheme;
    }
};


const getStyle = (theme) => {
    const actualTheme = getTheme(theme);

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            marginTop: 40,
            marginBottom: 30
        },
        text: {
            fontSize: actualTheme.font.regular,
            fontFamily: actualTheme.font.fontFamily,
            color: actualTheme.colors.text,
            textAlign: "center"
        },
    })
}
