import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getKanjiByGradeId} from "../../../../persistence/DbConnection";
import {setKanji} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {useTheme} from "@react-navigation/native";
import {Icon} from "react-native-elements";
import {LoadingScreen} from "../../../helper/LoadingScreen";
import {LinearGradient} from "expo-linear-gradient";
import * as Device from "expo-device";
import {DeviceType} from "expo-device";

/**
 * Screen depicting each Kanji for a grade
 * Using a flatlist should make this screen more performant
 * @param route
 * @param navigation
 * @param kanji Global array for each Kanji of a grade
 * @param setKanji Setter for the array
 */
const KanjiGridScreen = ({route, navigation, kanji, setKanji}) => {
    const [deviceType, setDeviceType] = useState(DeviceType.PHONE);
    navigation.setOptions({title: route.params.header});
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    // Fill the array on initial render or when the gradeId changes
    // This improves performance, as the DB is only queried on actual changes
    useEffect(() => {
        Device.getDeviceTypeAsync().then((value) => setDeviceType(value))
        if (kanji.length === 0 || (kanji[0] && route.params.gradeId !== kanji[0].gradeId)) {
            getKanjiByGradeId(route.params.gradeId, setKanji);
        }
    }, []);

    const showInfo = (item, index) => {
        navigation.push('KanjiInfo', {header: item.kanji, index: index})
    };

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
            {kanji && kanji.length > 0 && route.params.gradeId === kanji[0].gradeId ?
                <ScrollView contentContainerStyle={style.container}>
                    {kanji.map((item, index) =>
                        <View style={{
                            ...style.kanjiButtonWrapper,
                            minWidth: deviceType === DeviceType.TABLET ? '10%' : '16%',
                        }} key={item.id}>
                            <TouchableOpacity activeOpacity={0.5} style={style.kanjiButton}
                                              onPress={() => showInfo(item, index)}>
                                <Text style={style.kanji}>
                                    {item.kanji}
                                </Text>
                            </TouchableOpacity>
                            {item.gotIt === 1 &&
                            <View style={style.gotItIcon}>
                                <Icon
                                    name={'ios-checkmark-circle'}
                                    size={font.regular}
                                    type='ionicon'
                                    color={colors.primary}
                                    containerStyle={{backgroundColor: 'transparent'}}
                                />
                            </View>
                            }
                        </View>
                    )}
                </ScrollView>
                :
                <LoadingScreen text={'Loading ' + route.params.header + ' Kanji'}/>
            }
        </LinearGradient>
    )
};

const mapStateToProps = state => ({
    kanji: state.kanji
});

const mapDispatchToProps = (dispatch) => ({
    setKanji: (kanji) => dispatch(setKanji(kanji))
});

export default connect(mapStateToProps, mapDispatchToProps)(KanjiGridScreen);

const getStyle = (colors, font) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 10,
            paddingBottom: 20
        },
        kanjiButtonWrapper: {
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'center',
            aspectRatio: 1,
            margin: 5
        },
        kanjiButton: {
            margin: 2,
            alignItems: 'center',
            justifyContent: 'center'
        },
        kanji: {
            marginTop: -5,
            fontSize: 50,
            color: colors.text,
            fontFamily: font.fontFamily
        },
        noKanjiAvailable: {
            fontSize: font.regular,
            fontFamily: font.fontFamily,
            color: colors.text
        },
        gotItIcon: {
            position: 'absolute',
            bottom: 0,
            right: 3
        }
    })
};
