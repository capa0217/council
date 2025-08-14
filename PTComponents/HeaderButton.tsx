import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface IProps {
    onPress:()=>void,
    children:any,
}

const HeaderButton: React.FC<IProps> = (props: IProps) => {
  return (
    <TouchableOpacity style={styles.Button} {...props}>
      <Text>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "#FFD347",
    width: 80,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 6,
    marginVertical: 10,
  },
});
