import {Text, TouchableOpacity, View} from "react-native";
import {setTheme} from "../../../redux/actions/Actions";
import {connect} from "react-redux";
import React from "react";
import {setSetting} from "../../../persistence/DbConnection";
import {useTheme} from "@react-navigation/native";


const SettingSelectionScreen = ({theme, setTheme}) => {
    const {colors} = useTheme();

    const toggleTheme = () => {
        setSetting('theme', theme === 'systemStandard' ? 'dark' : theme === 'dark' ? 'light': 'systemStandard', setTheme)
    };

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/*<TouchableOpacity onPress={() => navigation.push('Details', {count: 1})}>*/}
            {/*    <Text>Details</Text>*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity
                onPress={() => toggleTheme()}>
                <Text style={{fontSize: 30, color: colors.text}}>{theme}</Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = state => ({
    theme: state.theme
});

const mapDispatchToProps = (dispatch) => ({
    setTheme: (theme) => dispatch(setTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingSelectionScreen);
