import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';

const MemberClubPage = ({ navigation }) => {
  const [members, setMembers] = useState([
    { id: '1', name: 'Alice Johnson', isPaid: true },
    { id: '2', name: 'Bob Smith', isPaid: false },
    { id: '3', name: 'Carol Lee', isPaid: true },
  ]);

  const handleAddMember = () => {
    Alert.alert("Add New Member", "This would open a form or modal.");
  };

  const renderMember = ({ item }) => (
    <View style={styles.memberContainer}>
      <TouchableOpacity style={styles.memberButton}>
        <Text style={styles.memberText}>{item.name}</Text>
      </TouchableOpacity>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{item.isPaid ? 'Paid' : 'Not Paid'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Add New Member */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
          <Text style={styles.addButtonText}>Add New Member</Text>
        </TouchableOpacity>
      </View>

      {/* Member List */}
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={members}
        renderItem={renderMember}
        keyExtractor={(item) => item.id}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('MemberClub')}
        >
          <Text style={styles.navText}>Club Member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Meeting')}
        >
          <Text style={styles.navText}>Meeting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MemberClubPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'flex-end',
  },
  addButton: {
    backgroundColor: '#F5B461',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  memberContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    maxWidth: 360,
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberButton: {
    backgroundColor: '#8A7A67',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
  },
  memberText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusBadge: {
    backgroundColor: '#E1D9B5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  statusText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  navButton: {
    backgroundColor: '#F5B461',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  navText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
