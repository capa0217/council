import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

function Nav (props) {
  const router = useRouter();
  if (props.active){
    return <TouchableOpacity
        style={styles.navButton}
        onPress={() =>
          router.replace({
            pathname: props.link,
          })
        }
      >
        <Text style={styles.navText}>{props.name}</Text>
      </TouchableOpacity>;
  }
  return <View style={[styles.navButton, styles.active]}><Text style={[styles.navText, styles.activeText]}>{props.name}</Text></View>
  
  ;
}

const BottomNav = (props) => {
  return (
    <View style={styles.bottomNav}>
      {props.number >= 1 && <Nav name={props.name[0]} link={props.link[0]} active={props.active!=1}/>}
      {props.number >= 2 && <Nav name={props.name[1]} link={props.link[1]} active={props.active!=2}/>}
      {props.number >= 3 && <Nav name={props.name[2]} link={props.link[2]} active={props.active!=3}/>}
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#F1F6F5",
  },
  navButton: {
    justifyContent: "center",
    alignItems: "center",
    height:70,
    borderTopEndRadius:5,
    borderTopStartRadius:5,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    backgroundColor: '#8A7D6A',
    flex: 1,
  },
  navText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  active: {
    backgroundColor: '#FFD347',
  },
  activeText: {
    color:"black",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
