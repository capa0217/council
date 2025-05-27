import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const ClubMembersPage = () => {
  const navigation = useNavigation();

  const [sortByName, setSortByName] = useState('A-Z');
  const [selectedClub, setSelectedClub] = useState('All Clubs');

  const members = [
    { name: 'Susan connor', club: 'Sunshine Club' },
    { name: 'Rick Novak', club: 'Riverside Club' },
    { name: 'Jeff Johnson', club: 'Brisbane Club' },
  ];

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image
          source={{
            uri: 'https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png',
          }}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Header Block */}
        <View style={styles.meetingHeaderBlock}>
          <Text style={styles.meetingHeaderText}>Club Members</Text>
        </View>

        {/* Sorting Dropdowns */}
        <View style={styles.sortingRow}>
          <Picker
            selectedValue={sortByName}
            style={styles.picker}
            onValueChange={(itemValue) => setSortByName(itemValue)}
          >
            <Picker.Item label="A-Z" value="A-Z" />
            <Picker.Item label="Z-A" value="Z-A" />
          </Picker>

          <Picker
            selectedValue={selectedClub}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedClub(itemValue)}
          >
            <Picker.Item label="All Clubs" value="All Clubs" />
            <Picker.Item label="Sunshine Club" value="Sunshine Club" />
            <Picker.Item label="Riverside Club" value="Riverside Club" />
            <Picker.Item label="Brisbane Club" value="Brisbane Club" />
          </Picker>
        </View>

        {/* Member List */}
        {members.map((member, index) => (
          <TouchableOpacity
            key={index}
            style={styles.meetingBlock}
            onPress={() => Alert.alert('Member Selected', member.name)}
          >
            <Text style={styles.meetingName}>{member.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text style={[styles.navButton, styles.activeButton]}>Club Members</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MembersMeetingPage')}>
          <Text style={styles.navButton}>Meeting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProjectLevelsPage')}>
          <Text style={styles.navButton}>Project</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClubMembersPage;

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
    marginBottom: 20,
  },
  meetingHeaderBlock: {
    marginTop: 20,
    backgroundColor: '#065395',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  meetingHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sortingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  meetingBlock: {
    marginTop: 15,
    backgroundColor: '#8A7D6A',
    padding: 15,
    borderRadius: 10,
  },
  meetingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
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
