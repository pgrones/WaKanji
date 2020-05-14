import React from "react";
import ThemeSetting from "./ThemeSettings";
import {Linking, ScrollView} from "react-native";
import ReadingSetting from "./ReadingSettings";
import {Accordion} from "../../../helper/Accordion"
import {Button} from "../../../helper/Button";
import {useTheme} from "@react-navigation/native";
import {setFurigana} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {setSetting} from "../../../../persistence/DbConnection";
import {LinearGradient} from "expo-linear-gradient";

/**
 * Screen featuring all available settings and external links
 * @param navigation
 * @param furigana Global state of the furigana display
 * @param setFurigana Setter for the global state
 */
const SettingSelectionScreen = ({navigation, furigana, setFurigana}) => {
    const {colors, font} = useTheme();

    const toggleFurigana = () => {
        setSetting('furigana', furigana === 'true' ? 'false' : 'true', setFurigana)
    };

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
            <ScrollView>
                <Accordion title='Theme'>
                    <ThemeSetting title='System-Standard' type='systemStandard'/>
                    <ThemeSetting title='Dark' type='dark'/>
                    <ThemeSetting title='Light' type='light'/>
                </Accordion>
                <Accordion title='Readings'>
                    <ReadingSetting title='Kunyomi' type='kunReading'/>
                    <ReadingSetting title='Onyomi' type='onReading'/>
                </Accordion>
                <Button title='Furigana' onPress={() => toggleFurigana()}
                        icon={furigana === 'true' ? 'ios-checkmark-circle' : undefined} type='ionicon'
                        iconColor={colors.primary} rightMargin={15}/>
                <Button title='Patreon' onPress={() => Linking.openURL('https://www.patreon.com/home')}
                        icon='external-link' type='feather'/>
                <Button title='Attributions' onPress={() => navigation.push('Attributions')} icon='chevron-right'
                        type='material-community' iconSize={font.large}/>
            </ScrollView>
        </LinearGradient>
    );
};

const mapStateToProps = state => ({
    furigana: state.furigana
});

const mapDispatchToProps = (dispatch) => ({
    setFurigana: (furigana) => dispatch(setFurigana(furigana))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingSelectionScreen);
