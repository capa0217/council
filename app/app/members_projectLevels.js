import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MembersProjectPage1 = () => {
  const navigation = useNavigation();

  const handleLevelPress = (level) => {
    console.log(`Level ${level} pressed`);

  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image
          source={{ uri: 'https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png' }}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerText}>Project Levels</Text>
        </View>

        {/* Space between header and buttons */}
        <View style={{ height: 30 }} />

        {/* Level Buttons */}
        {[1, 2, 3, 4].map((level) => (
          <TouchableOpacity
            key={level}
            style={styles.levelButton}
            onPress={() => navigation.navigate('members_projectLevels_name', { level })}
          >
            <Text style={styles.buttonText}>Level {level}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('members_clubmembers')}>
          <Text style={styles.navButton}>Club Members</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('members_meeting')}>
          <Text style={styles.navButton}>Meeting</Text>
        </TouchableOpacity>

        <Text style={[styles.navButton, styles.activeButton]}>Project</Text>
      </View>
    </View>
  );
};

export default MembersProjectPage1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#AFABA3',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 50,
    resizeMode: 'contain',
  },
  profileText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  headerBlock: {
    marginTop: 30,
    backgroundColor: '#065395',
    paddingVertical: 15, 
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  levelButton: {
    backgroundColor: '#8A7D6A',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F1F6F5',
    paddingVertical: 15,
  },
  navButton: {
    fontSize: 16,
    color: '#333',
  },
  activeButton: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
