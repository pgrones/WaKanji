import React from "react";
import Accordion from "../../../helper/Accordion";
import ThemeSetting from "./ThemeSettings";
import {ScrollView} from "react-native";


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
                    <ThemeSetting title='System-Standard' type='systemStandard'/>,
                    <ThemeSetting title='Dark' type='dark'/>,
                    <ThemeSetting title='Light' type='light'/>
                ]}
            />
        </ScrollView>
    );
};

export default SettingSelectionScreen
