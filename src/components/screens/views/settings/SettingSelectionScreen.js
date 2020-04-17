import React from "react";
import Accordion from "../../../helper/Accordion";
import ThemeSetting from "./ThemeSettings";


const SettingSelectionScreen = () => {
    return (
        <Accordion
            title='Theme'
            data={[
                <ThemeSetting title='System-Standard' type='systemStandard'/>,
                <ThemeSetting title='Dark' type='dark'/>,
                <ThemeSetting title='Light' type='light'/>
            ]}
        />
    );
};

export default SettingSelectionScreen
