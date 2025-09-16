import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

const BackButton = (props) => (
  <TouchableOpacity onPress={() => router.back()} style={props.style}>
    <Svg viewBox="0 0 100 100" height="40" width="40"style={{marginHorizontal:20}}>
      <Path
        fill="#F1F6F5"
        d="M 48.695312 90.082031 C 50.941406 92.703125 50.636719 96.648438 48.015625 98.894531 C 45.398438 101.140625 41.449219 100.839844 39.203125 98.21875 L 1.703125 54.46875 C -0.300781 52.125 -0.300781 48.671875 1.703125 46.332031 L 39.203125 2.582031 C 41.449219 -0.0390625 45.398438 -0.339844 48.015625 1.90625 C 50.636719 4.152344 50.941406 8.097656 48.695312 10.71875 L 14.683594 50.398438 Z M 48.695312 90.082031"
      />
    </Svg>
  </TouchableOpacity>
);

export default BackButton;
