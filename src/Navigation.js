import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {LearnScreen} from "./screens/LearnScreen";
import {PracticeScreen} from "./screens/PracticeScreen";
import {SettingsScreen} from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  return(
      <NavigationContainer>
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
                      //tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="logout"/>,
                      headerTitle: 'Learn'
                  }}/>
              <Tab.Screen
                  name="Practice"
                  component={PracticeScreen}
                  options={{
                      //tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="wallet-outline"/>,
                      headerTitle: 'Practice'
                  }}/>
              <Tab.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                      //tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="login"/>,
                      headerTitle: 'Settings'
                  }}/>
          </Tab.Navigator>
      </NavigationContainer>
  )
};
