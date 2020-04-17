import React from "react";
import Accordion from "../../../helper/Accordion";
import ThemeSetting from "./ThemeSettings";
import {ScrollView} from "react-native";
import ReadingSetting from "./ReadingSettings";


const SettingSelectionScreen = () => {
    return (
        <ScrollView bounces={false}>
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
        </ScrollView>
    );
};

export default SettingSelectionScreen
