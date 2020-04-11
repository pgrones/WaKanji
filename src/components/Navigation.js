import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {TabBarIcon} from "./helper/TabBarIcon";
import {SettingsScreen} from "./screens/navigationScreens/SettingsScreen";
import {connect} from "react-redux";
import {darkTheme, lightTheme} from "./helper/Theme";
import {getSetting} from "../persistence/DbConnection";
import {setTheme} from "./redux/actions/Actions";
import {LearnScreen} from "./screens/navigationScreens/LearnScreen";
import {PracticeScreen} from "./screens/navigationScreens/PracticeScreen";

const Tab = createBottomTabNavigator();

const Navigation = (props) => {
    const [themeLoaded, setThemeLoaded] = useState(false);
    if(!themeLoaded) {
        getSetting('theme', props.setTheme);
        setThemeLoaded(true);
    }
    return (
        <NavigationContainer theme={props.theme === 'dark' ? darkTheme : lightTheme}>
            <Tab.Navigator
                // tabBarOptions={{
                //     activeTintColor: Colors.tabIconSelected,
                //     inactiveTintColor: Colors.tabIconDefault,
                //     style: styles.container
                // }}
                initialRouteName={'Learn'}
            >
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
    theme: state.theme
});

const mapDispatchToProps = (dispatch) => ({
    setTheme: (theme) => dispatch(setTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
