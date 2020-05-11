import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import TabBarIcon from "./helper/TabBarIcon";
import {SettingsScreen} from "./screens/navigationScreens/SettingsScreen";
import {connect} from "react-redux";
import {darkTheme, lightTheme} from "./helper/Theme";
import {LearnScreen} from "./screens/navigationScreens/LearnScreen";
import PracticeScreen from "./screens/navigationScreens/PracticeScreen";
import {StatusBar, Text} from "react-native";
import {useColorScheme} from "react-native-appearance";

const Tab = createBottomTabNavigator();

const Navigation = ({theme, navigationVisible}) => {
    const scheme = useColorScheme();

    const getTheme = () => {
        switch (theme) {
            case 'systemStandard':
                return scheme === 'dark' ? darkTheme : lightTheme;
            case 'dark':
                return darkTheme;
            case 'light':
                return lightTheme;
        }
    };

    return (
        <NavigationContainer theme={getTheme()}>
            <StatusBar backgroundColor={getTheme().colors.card}
                       barStyle={getTheme() === darkTheme ? 'light-content' : 'dark-content'}
            />
            <Tab.Navigator initialRouteName={'Learn'}>
                <Tab.Screen
                    name="Learn"
                    component={LearnScreen}
                    options={{
                        tabBarIcon: ({focused}) =>
                            <TabBarIcon
                                focused={focused}
                                iconText="辞書"
                                color={focused ? getTheme().colors.primary : getTheme().colors.text}
                            />
                        ,
                        tabBarLabel: ({focused}) =>
                            <Text style={{
                                color: focused ? getTheme().colors.primary : getTheme().colors.text,
                                fontSize: 12
                            }}>
                                Dictionary
                            </Text>
                    }}
                />
                <Tab.Screen
                    name="Practice"
                    component={PracticeScreen}
                    options={{
                        tabBarIcon: ({focused}) =>
                            <TabBarIcon
                                focused={focused}
                                iconText="練習"
                                color={focused ? getTheme().colors.primary : getTheme().colors.text}
                            />
                        ,
                        tabBarVisible: navigationVisible,
                        tabBarLabel: ({focused}) =>
                            <Text style={{
                                color: focused ? getTheme().colors.primary : getTheme().colors.text,
                                fontSize: 12
                            }}>
                                Practice
                            </Text>
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({focused}) =>
                            <TabBarIcon
                                focused={focused}
                                iconText="設定"
                                color={focused ? getTheme().colors.primary : getTheme().colors.text}
                            />
                        ,
                        tabBarLabel: ({focused}) =>
                            <Text style={{
                                color: focused ? getTheme().colors.primary : getTheme().colors.text,
                                fontSize: 12
                            }}>
                                Settings
                            </Text>
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
};

const mapStateToProps = state => ({
    theme: state.theme,
    navigationVisible: state.navigationVisible
});

export default connect(mapStateToProps)(Navigation)
