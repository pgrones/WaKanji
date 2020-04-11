import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const PracticeSelectionScreen = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.push('Details', {count: 1})}>
                <Text>Details</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PracticeSelectionScreen
