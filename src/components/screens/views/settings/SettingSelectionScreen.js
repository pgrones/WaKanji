import React from "react";
import Accordion from "../../../helper/Accordion";
import ThemeSetting from "./ThemeSettings";
import {Linking, ScrollView} from "react-native";
import ReadingSetting from "./ReadingSettings";
import {SettingButton} from "./SettingButton";


const SettingSelectionScreen = ({navigation}) => {
    return (
        <ScrollView bounces={false}>
            <Accordion
                title='Readings'
                data={[
                    <ReadingSetting title='Kunyomi' type='kunReading'/>,
                    <ReadingSetting title='Onyomi' type='onReading'/>
                ]}
            />
            <Accordion
                title='Theme'
                data={[
                    <ThemeSetting title='System-Standard' type='systemStandard'/>,
                    <ThemeSetting title='Dark' type='dark'/>,
                    <ThemeSetting title='Light' type='light'/>
                ]}
            />
            <SettingButton title='Jisho Dictionary' onPress={() => Linking.openURL('https://jisho.org/')} icon='external-link' type='feather'/>
            <SettingButton title='Patreon' onPress={() => Linking.openURL('https://www.patreon.com/home')} icon='external-link' type='feather'/>
            <SettingButton title='Copyright' onPress={() => navigation.push('Copyright')} icon='chevron-right' type='material-community'/>
        </ScrollView>
    );
};

export default SettingSelectionScreen
