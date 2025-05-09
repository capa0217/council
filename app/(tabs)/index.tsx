import React from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png',
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style= {styles.titleText}>Welcome to PowerTalk Australia </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('./login')}>
        <Text style={styles.buttonText}>Let's get started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
  },
  logo: {
    width: 150,
    height: 60,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'orange',
    width: 200,            // fixed width
    height: 50,            // fixed height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 20,
    marginLeft: 500,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleText:{
     fontSize:25,
     marginLeft: 425,
     fontWeight:'bold',
     marginBottom:10,
  }
});
