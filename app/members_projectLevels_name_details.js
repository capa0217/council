import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomNav from './components/BottomNav';

const ProjectDetailPage = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { projectName } = route.params;

  const projectRows = [
    { number: 1, title: 'Thought of the day', date: '' },
    { number: 2, title: 'Closing Thought', date: '' },
    { number: 3, title: 'Issue of the day', date: '06-02-2025' },
    { number: 4, title: 'Self intro Speech', date: '' },
    { number: 5, title: 'Oral Reading', date: '' },
    { number: 6, title: 'Poetry Reading', date: '11-02-2025' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Project Title Block */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerText}>{projectName}</Text>
        </View>

        {/* Spacer */}
        <View style={{ height: 20 }} />

        {/* Table Header */}
        <View style={styles.tableRowHeader}>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Project</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Project Title</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Date Completed</Text>
        </View>

        {/* Table Rows */}
        {projectRows.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.number}</Text>
            <Text style={styles.tableCell}>{row.title}</Text>
            <Text style={styles.tableCell}>{row.date}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav active={3}/>
      </View>
  );
};

export default ProjectDetailPage;

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
    paddingBottom: 40,
  },
  headerBlock: {
    marginTop: 30,
    backgroundColor: '#065395',
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  tableRowHeader: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#8A7D6A',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
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
