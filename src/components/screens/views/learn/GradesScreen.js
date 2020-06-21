import React, {Component, useEffect, useState} from 'react';
import {getGrades} from "../../../../persistence/DbConnection";
import {useTheme} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import Grade from "./Grade";
import {LoadingScreen} from "../../../helper/LoadingScreen";

/**
 * Screen with buttons to each grade's Kanji
 * The first screen to render when opening the app
 */
export class GradesSwiperWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const scrollDown = () => {
            this.swiper.scrollBy(1);
        };

        const scrollUp = () => {
            this.swiper.scrollBy(-1);
        };

        const {colors, grades, onGradePress} = this.props;

        return (
            <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
                <Swiper
                    showsPagination={true}
                    horizontal={false}
                    loadMinimal={true}
                    loadMinimalSize={0}
                    loop={false}
                    activeDotColor={colors.primary}
                    ref={(swiper) => {
                        this.swiper = swiper;
                    }}
                >
                    {grades.map((item, index) =>
                        <Grade key={item.id.toString()} grade={item} onPress={onGradePress}
                               scrollUp={scrollUp} scrollDown={scrollDown}
                               prev={grades[index - 1] ? grades[index - 1].grade : false}
                               next={grades[index + 1] ? grades[index + 1].grade : false}/>
                    )}
                </Swiper>

            </LinearGradient>
        )
    }
}

export const GradesScreen = ({navigation}) => {
    const [grades, setGrades] = useState([]);
    const {colors} = useTheme();

    useEffect(() => {
        getGrades(setGrades);
    }, []);

    const onGradePress = (item) => {
        navigation.push('KanjiGrid', {header: item.grade.split(' ')[3], gradeId: item.id})
    };

    return (
        grades.length > 0 ?
            <GradesSwiperWrapper colors={colors} onGradePress={onGradePress} grades={grades}/>
            : <LoadingScreen/>
    )
}
