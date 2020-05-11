import React from "react";
import {Text} from "react-native";
import {connect} from "react-redux";
import {darkTheme} from "./Theme";

const TabBarIcon = ({iconText, color}) => {
    return (
        <Text style={{
            fontSize: 18,
            fontFamily: darkTheme.font.fontFamily,
            color: color
        }}>
            {iconText}
        </Text>
    )
};

const mapStateToProps = state => ({
    theme: state.theme
});

export default connect(mapStateToProps)(TabBarIcon)
