import React from "react";
import Accordion from "../../../helper/Accordion";
import ThemeSetting from "./ThemeSettings";
import {Linking, ScrollView} from "react-native";
import ReadingSetting from "./ReadingSettings";
import {SettingButton} from "./SettingButton";
import {useTheme} from "@react-navigation/native";
import {setFurigana} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {setSetting} from "../../../../persistence/DbConnection";


const SettingSelectionScreen = ({navigation, furigana, setFurigana}) => {
    const {colors} = useTheme();

    const toggleFurigana = () => {
        setSetting('furigana', furigana === 'true' ? 'false' : 'true', setFurigana)
    };

    return (
        <ScrollView>
            <Accordion
                title='Theme'
                data={[
                    <ThemeSetting title='System-Standard' type='systemStandard'/>,
                    <ThemeSetting title='Dark' type='dark'/>,
                    <ThemeSetting title='Light' type='light'/>
                ]}
            />
            <Accordion
                title='Readings'
                data={[
                    <ReadingSetting title='Kunyomi' type='kunReading'/>,
                    <ReadingSetting title='Onyomi' type='onReading'/>
                ]}
            />
            <SettingButton title='Furigana' onPress={() => toggleFurigana()}
                           icon={furigana === 'true' ? 'ios-checkmark-circle' : undefined} type='ionicon'
                           color={colors.primary}/>

            <SettingButton title='Patreon' onPress={() => Linking.openURL('https://www.patreon.com/home')}
                           icon='external-link' type='feather'/>
            <SettingButton title='Attributions' onPress={() => navigation.push('Attributions')} icon='chevron-right'
                           type='material-community'/>
        </ScrollView>
    );
};

const mapStateToProps = state => ({
    furigana: state.furigana
});

const mapDispatchToProps = (dispatch) => ({
    setFurigana: (furigana) => dispatch(setFurigana(furigana))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingSelectionScreen);
