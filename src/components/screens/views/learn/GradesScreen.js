import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {getGrades} from "../../../../persistence/DbConnection";
import {SuperScript} from "../../../helper/SuperScript";
import {useTheme} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import {Button} from "../../../helper/Button";

/**
 * Screen with buttons to each grade's Kanji
 * The first screen to render when opening the app
 */
export const GradesScreen = ({navigation}) => {
    const [grades, setGrades] = useState([]);
    const {colors, font} = useTheme();

    useEffect(() => {
        getGrades(setGrades);
    }, []);

    const onGradePress = (item) => {
        navigation.push('KanjiGrid', {header: item.grade, gradeId: item.id})
    };

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
            <FlatList
                contentContainerStyle={{flexGrow: 1}}
                data={grades}
                renderItem={({item}) =>
                    <Button
                        title={<SuperScript start={1} end={3} text={item.grade}/>}
                        iconSize={font.large}
                        icon={'chevron-right'}
                        type={'material-community'}
                        onPress={() => onGradePress(item)}
                    />
                }
                keyExtractor={item => item.id.toString()}
            />
        </LinearGradient>
    );
};

