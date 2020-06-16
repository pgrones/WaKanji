import React from "react";
import {Button} from "../../../helper/Button";
import {setFurigana} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {setSetting} from "../../../../persistence/DbConnection";
import {useTheme} from "@react-navigation/native";

const FuriganaSetting = ({furigana, setFurigana}) => {
    const {colors} = useTheme();

    const toggleFurigana = () => {
        setSetting('furigana', furigana === 'true' ? 'false' : 'true', setFurigana)
    };

    return (
        <Button title='Display Furigana' onPress={() => toggleFurigana()}
                icon={furigana === 'true' ? 'ios-checkmark-circle' : 'ios-close-circle'} type='ionicon'
                iconColor={colors.primary} rightMargin={18}/>
    )
}

const mapStateToProps = state => ({
    furigana: state.furigana
});

const mapDispatchToProps = (dispatch) => ({
    setFurigana: (furigana) => dispatch(setFurigana(furigana))
});

export default connect(mapStateToProps, mapDispatchToProps)(FuriganaSetting);
