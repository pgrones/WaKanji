import {createStackNavigator} from "@react-navigation/stack";
import React, {useEffect} from "react";
import PracticeSelectionScreen from "../views/practice/PracticeSelectionScreen";
import TimeBasedGameWrapper from "../views/practice/TimeBasedGameWrapper";
import {getGotItAmount} from "../../../persistence/DbConnection";
import {setGotItAmount} from "../../../redux/actions/Actions";
import {connect} from "react-redux";

const Stack = createStackNavigator();

const PracticeScreen = ({navigation, setAmount}) => {
    useEffect(() => {
        getGotItAmount(setAmount);
        return navigation.addListener('tabPress', () => {
            getGotItAmount(setAmount)
        });
    }, [navigation]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Practice" options={{title: "Practice  練習"}} component={PracticeSelectionScreen}/>
            <Stack.Screen name="Game" options={{title: "Flash Cards", headerLeft: null}}
                          component={TimeBasedGameWrapper}/>
        </Stack.Navigator>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setAmount: (amount) => dispatch(setGotItAmount(amount))
});

export default connect(null, mapDispatchToProps)(PracticeScreen);
