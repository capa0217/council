import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, BackHandler } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/PTComponents/Button";

const PTHeader = ({ button, text, link }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
            onPress={() =>
              router.back()
            }
            >Back</Button>
      </View>
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
        {button && (
          <Button
            onPress={() =>
              router.push({
                pathname: `/${link}`,
              })
            }
          >
            text
          </Button>
        )}
      </View>
    </View>
  );
};

export default PTHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F6F5",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logoContainer: {
    justifyContent: "center",
    alignContent: "center",
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
  },
  logo: {
    height: 60,
    marginVertical: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#FFD347",
    width: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 6,
    marginVertical: 10, // Adds top and bottom spacing
    marginHorizontal: 15,
  },
});
