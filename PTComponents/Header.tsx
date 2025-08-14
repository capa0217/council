import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";

import HeaderButton from "./HeaderButton";
import { canGoBack } from "expo-router/build/global-state/routing";
import { SafeAreaView } from "react-native-safe-area-context";

interface IProps {
  enabled: boolean;
}

const Header: React.FC<IProps> = (props: IProps) => {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            {canGoBack() && (
              <HeaderButton onPress={() => router.back()}>Back</HeaderButton>
            )}
          </View>
          <View style={styles.logoContainer}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/club_meeting`,
                })
              }
            >
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
              <HeaderButton
                onPress={() =>
                  router.push({
                    pathname: `/profile`,
                  })
                }
              >
                Profile
              </HeaderButton>
            )}
          </View>
        </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F6F5",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  logoContainer: {
    alignContent: "center",
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
  },
  logo: {
    height: 50,
    marginVertical: 20,
  },
});
