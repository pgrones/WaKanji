import React from "react";
import {Text} from "react-native";

export const TabBarIcon = (props) => {
    //TODO color on focused
  return(
      <Text style={{fontSize: 18}}>{props.iconText}</Text>
  )
};
