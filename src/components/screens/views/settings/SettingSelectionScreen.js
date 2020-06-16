import React from "react";
import ThemeSetting from "./ThemeSettings";
import {ScrollView} from "react-native";
import ReadingSetting from "./ReadingSettings";
import {Accordion} from "../../../helper/Accordion"
import {Button} from "../../../helper/Button";
import {useTheme} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import FuriganaSetting from "./FuriganaSettings";
import {ConnectedAnimationSpeedSetting, ConnectedSkipAnimationsSetting} from "./AnimationsSettings";

/**
 * Screen featuring all available settings and external links
 * @param navigation
 */
const SettingSelectionScreen = ({navigation}) => {
    const {colors, font} = useTheme();

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
            <ScrollView>
                <Accordion title='Readings'>
                    <ReadingSetting title='Kunyomi' type='kunReading'/>
                    <ReadingSetting title='Onyomi' type='onReading'/>
                </Accordion>
                <Accordion title='Animations'>
                    <ConnectedSkipAnimationsSetting/>
                    <ConnectedAnimationSpeedSetting/>
                </Accordion>
                <Accordion title='Theme'>
                    <ThemeSetting title='System-Standard' type='systemStandard'/>
                    <ThemeSetting title='Dark' type='dark'/>
                    <ThemeSetting title='Light' type='light'/>
                </Accordion>
                <FuriganaSetting/>
                <Button title='Attributions' onPress={() => navigation.push('Attributions')} icon='chevron-right'
                        type='material-community' iconSize={font.large}/>
            </ScrollView>
        </LinearGradient>
    );
};

export default SettingSelectionScreen;
