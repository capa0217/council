import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const Header = (props) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity
          onPress={() =>
            router.back()
          }
        >
          <Image
          style={styles.logo}
          source={{uri: "https://images.icon-icons.com/1993/PNG/512/arrow_back_chevron_direction_left_navigation_right_icon_123223.png"}}
          tintColor={"#F1F6F5"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
  },
  logoContainer: {
    alignContent: "center",
  },
  logo: {
    height: 40,
    width: 40,
    paddingRight: 50,
  },
});
