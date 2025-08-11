import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import Button from "./Button";

interface IProps {
    enabled: boolean,
}

const Header: React.FC<IProps> = (props: IProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity 
        onPress={() =>
              router.push({
                pathname: `/club_meeting`,
              })
            }>
        <Image
          source={{
            uri: "https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        {props.enabled && (
          <Button
            onPress={() =>
              router.push({
                pathname: `/profile`,
              })
            }
          >
            Profile
          </Button>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F6F5",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logoContainer: {
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 60,
    marginVertical: 10,
    marginLeft: 10,
  },
});
