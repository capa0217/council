import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const Finger = (props) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: "data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20class%3D%22e-font-icon-svg%20e-fas-hand-point-right%22%20viewBox%3D%220%200%20512%20512%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M512%20199.652c0%2023.625-20.65%2043.826-44.8%2043.826h-99.851c16.34%2017.048%2018.346%2049.766-6.299%2070.944%2014.288%2022.829%202.147%2053.017-16.45%2062.315C353.574%20425.878%20322.654%20448%20272%20448c-2.746%200-13.276-.203-16-.195-61.971.168-76.894-31.065-123.731-38.315C120.596%20407.683%20112%20397.599%20112%20385.786V214.261l.002-.001c.011-18.366%2010.607-35.889%2028.464-43.845%2028.886-12.994%2095.413-49.038%20107.534-77.323%207.797-18.194%2021.384-29.084%2040-29.092%2034.222-.014%2057.752%2035.098%2044.119%2066.908-3.583%208.359-8.312%2016.67-14.153%2024.918H467.2c23.45%200%2044.8%2020.543%2044.8%2043.826zM96%20200v192c0%2013.255-10.745%2024-24%2024H24c-13.255%200-24-10.745-24-24V200c0-13.255%2010.745-24%2024-24h48c13.255%200%2024%2010.745%2024%2024zM68%20368c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
          }}
          tintColor={"#8A7D6A"}
        />
      </View>
    </View>
  );
};

export default Finger;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
  },
  logoContainer: {
    alignContent: "center",
  },
  logo: {
    height: 20,
    width: 20,
  },
});
