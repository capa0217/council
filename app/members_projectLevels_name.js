import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import PTHeader from './components/PTHeader';
import BottomNav from './components/BottomNav';

const ProjectLevelDetailPage = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { level } = route.params;

  const projects = [
    'Speaking Intermediate',
    'Project B',
    'Project C',
  ];

  

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <PTHeader button={true} text={'Profile'} link={'profile'}/>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerText}>Level {level} Project</Text>
        </View>

        {/* Spacer */}
        <View style={{ height: 30 }} />

        {/* Project Buttons */}
        {projects.map((project, index) => (
          <TouchableOpacity 
          key={index} 
          style={styles.projectButton}
          onPress={() => navigation.navigate('members_projectLevels_name_details', { projectName: project })}
        >
          <Text style={styles.buttonText}>{project}</Text>
        </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav active={3}/>
    </View>
  );
};

export default ProjectLevelDetailPage;

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
    paddingVertical: 30,
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
  projectButton: {
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
