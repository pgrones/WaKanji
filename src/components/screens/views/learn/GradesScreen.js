import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {getGrades} from "../../../../persistence/DbConnection";
import {SuperScript} from "../../../helper/SuperScript";
import {connect} from "react-redux";
import {setGrades} from "../../../../redux/actions/Actions";
import {useTheme} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import {Button} from "../../../helper/Button";

const GradesScreen = ({navigation, grades, setGrades}) => {
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
                        fontSize={font.large}
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

const mapStateToProps = state => ({
    grades: state.grades
});

const mapDispatchToProps = (dispatch) => ({
    setGrades: (grades) => dispatch(setGrades(grades))
});

export default connect(mapStateToProps, mapDispatchToProps)(GradesScreen);

