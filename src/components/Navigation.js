import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import TabBarIcon from "./helper/TabBarIcon";
import {SettingsScreen} from "./screens/navigationScreens/SettingsScreen";
import {connect} from "react-redux";
import {darkTheme, lightTheme} from "./helper/Theme";
import {getSetting} from "../persistence/DbConnection";
import {setTheme, setThemeLoaded} from "./redux/actions/Actions";
import {LearnScreen} from "./screens/navigationScreens/LearnScreen";
import {PracticeScreen} from "./screens/navigationScreens/PracticeScreen";

const Tab = createBottomTabNavigator();

const Navigation = ({theme, setTheme, themeLoaded, setThemeLoaded}) => {
    if (!themeLoaded.themeLoaded) {
        getSetting('theme', setTheme);
        setThemeLoaded(true);
    } else {
        console.log(themeLoaded)
    }
    return (
        <NavigationContainer theme={theme === 'dark' ? darkTheme : lightTheme}>
            <Tab.Navigator initialRouteName={'Learn'}>
                <Tab.Screen
                    name="Learn"
                    component={LearnScreen}
                    options={{
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} iconText="学"/>,
                        headerTitle: 'Learn'
                    }}/>
                <Tab.Screen
                    name="Practice"
                    component={PracticeScreen}
                    options={{
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} iconText="練習"/>,
                        headerTitle: 'Practice'
                    }}/>
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({focused}) => <TabBarIcon focused={focused} iconText="設定"/>,
                        headerTitle: 'Settings'
                    }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
};

const mapStateToProps = state => ({
    theme: state.theme,
    themeLoaded: state.themeLoaded
});

const mapDispatchToProps = (dispatch) => ({
    setTheme: (theme) => dispatch(setTheme(theme)),
    setThemeLoaded: (themeLoaded) => dispatch(setThemeLoaded(themeLoaded))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
