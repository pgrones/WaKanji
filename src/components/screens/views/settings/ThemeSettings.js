import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {setSetting} from "../../../../persistence/DbConnection";
import {setTheme} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {useTheme} from "@react-navigation/native";
import {Icon} from "react-native-elements";

const ThemeSetting = ({title, type, theme, setTheme}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const toggleTheme = () => {
        if(theme !== type) {
            setSetting('theme', type, setTheme)
        }
    };

    return (
        <TouchableOpacity style={style.button} activeOpacity={0.5} onPress={() => toggleTheme()}>
            <Text style={style.text}>{title}</Text>
            {theme === type && <Icon
                name={'ios-checkmark-circle'}
                size={24}
                type='ionicon'
                color={colors.primary}
            />}
        </TouchableOpacity>
    )
};

const mapStateToProps = state => ({
    theme: state.theme
});

const mapDispatchToProps = (dispatch) => ({
    setTheme: (theme) => dispatch(setTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSetting);

const getStyle = (colors, font) => {
    return StyleSheet.create({
        button: {
            margin: 5,
            marginBottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
            backgroundColor: colors.card,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.border
        },
        text:{
            fontSize: font.regular,
            color: colors.text
        }
    });
};
