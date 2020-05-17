import React, {useState} from 'react';
import {View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Button} from "./Button";

/**
 * Accordion component that can open and close, revealing/hiding its children
 * @param title Title displayed on the header button. Can either be a string or a component
 * @param children Children inside the Accordion
 */
export const Accordion = ({title, children}) => {
    const [expanded, setExpanded] = useState(false);
    const {font} = useTheme();

    return (
        <View>
            <Button
                title={title}
                onPress={() => setExpanded(!expanded)}
                icon={expanded ? 'chevron-up' : 'chevron-down'}
                type={'material-community'}
                iconSize={font.large}
            />
            {expanded && children}
        </View>
    )
};
