import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';
import {getGrades} from "../../../../persistence/DbConnection";
import {SuperScript} from "../../../helper/SuperScript";
import {connect} from "react-redux";
import {setGrades} from "../../../../redux/actions/Actions";
import {useTheme} from "@react-navigation/native";
import {Icon} from "react-native-elements";

const GradesScreen = ({navigation, grades, setGrades}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors);

    useEffect(() => {
        getGrades(setGrades);
    }, []);

    const onGradePress = (item) => {
        navigation.push('KanjiGrid', {header: item.grade, gradeId: item.id})
    };

    return (
        <FlatList
            data={grades}
            renderItem={({item}) =>
                    <TouchableOpacity style={style.wrapper} activeOpacity={0.5} onPress={() => onGradePress(item)}>
                        <View style={style.container}>
                            <SuperScript start={1} end={3} text={item.grade}/>
                            <Icon
                                name={'chevron-right'}
                                size={font.large}
                                type='material-community'
                                color={colors.text}
                            />
                        </View>
                    </TouchableOpacity>
            }
            keyExtractor={item => item.id.toString()}
            bounces={false}
        />
    );
};

const mapStateToProps = state => ({
    grades: state.grades
});

const mapDispatchToProps = (dispatch) => ({
    setGrades: (grades) => dispatch(setGrades(grades))
});

export default connect(mapStateToProps, mapDispatchToProps)(GradesScreen);

const getStyle = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10
        },
        wrapper: {
            margin: 10,
            marginBottom: 0,
            borderWidth: 2,
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderRadius: 10
        }
    })
};

