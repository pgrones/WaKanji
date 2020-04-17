import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {setExpanded} from "../../redux/actions/Actions";
import {connect} from "react-redux";
import {useTheme} from "@react-navigation/native";

const Accordion = ({title, data, expanded, setExpanded}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const toggleExpand = () => {
        setExpanded(!expanded)
    };

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.item} activeOpacity={0.5} onPress={() => toggleExpand()}>
                <Text style={style.title}>{title}</Text>
                <Icon
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={font.large}
                    type='material-community'
                    color={colors.text}
                />
            </TouchableOpacity>
            {expanded &&
                <View style={style.child}>
                    {data}
                </View>
            }
        </View>
    )
};

const mapStateToProps = state => ({
    expanded: state.expanded
});

const mapDispatchToProps = (dispatch) => ({
    setExpanded: (expanded) => dispatch(setExpanded(expanded))
});

export default connect(mapStateToProps, mapDispatchToProps)(Accordion);

const getStyle = (colors, font) => {
    const item = {
        flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
            backgroundColor: colors.card,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.border
    };

    return StyleSheet.create({
        container:{
            margin: 10
        },
        title: {
            fontSize: font.regular,
            color: colors.text,
            fontWeight: 'bold'
        },
        item,
        child:{
            margin: 5,
            ...item
        }
    });
};
