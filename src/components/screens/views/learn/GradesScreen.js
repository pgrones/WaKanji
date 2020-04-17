import React, {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {getGrades} from "../../../../persistence/DbConnection";
import {SuperScript} from "../../../helper/SuperScript";
import {connect} from "react-redux";
import {setGrades} from "../../../../redux/actions/Actions";
import {useTheme} from "@react-navigation/native";

const GradesScreen = ({navigation, grades, setGrades}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    useEffect(() =>{
        getGrades(setGrades);
    },[]);

    const onGradePress = (item) => {
        navigation.push('KanjiGrid', {header: item.grade, gradeId: item.id})
    };

    return (
        <FlatList
            data={grades}
            renderItem={({item}) =>
                <View style={style.wrapper}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => onGradePress(item)}>
                        <View style={style.container}>
                            <SuperScript start={1} end={3} text={item.grade}/>
                            <Text style={style.arrow}>ᐳ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
            keyExtractor={item => item.id.toString()}
            style={{marginTop: 5}}
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

const getStyle = (colors, font) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            paddingRight: 20,
        },
        wrapper: {
            marginLeft: 20,
            marginTop: 5,
            borderWidth: 2,
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderRadius: 10
        },
        arrow: {
            color: colors.text,
            fontSize: font.regular
        }
    })
};

