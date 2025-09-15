import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import PTButton from "@/PTComponents/Button";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

const ProjectDetailPage = () => {
  const nav = useNavigation();
  const local = useLocalSearchParams();
  const projectUserID = +local.projectUserID;
  const projectLevel = +local.projectLevel;
  const [projectRows, setProject] = useState([]);

  useEffect(() => {
    (async () => {
      try {
          const payload = {
            program_level: projectLevel,
            user_id: projectUserID
          }
          const { data } = await axios.post(
            `${process.env.EXPO_PUBLIC_IP}/projects/`,
            payload
          );
          console.log(data);
          setProject(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        Alert.alert("Error", "Failed to load projects");
      }
    })();
  }, [projectLevel, projectUserID]);

  useEffect(() => {
    nav.setOptions({ headerShown: true, title: `Project Level: ${projectLevel}` });
  }, []);

  const uniqueProjects = projectRows.filter(
    (p, index, self) =>
      index === self.findIndex((q) => q.project_title === p.project_title)
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Spacer */}
        <View style={{ height: 20 }} />

        {/* Table Header */}
        <View style={styles.tableRowHeader}>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>
            Project
          </Text>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>
            Project Title
          </Text>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>
            Date Completed
          </Text>
        </View> 
        {/* Table Rows */}
        {uniqueProjects.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={styles.tableCell}>{row.project_title}</Text>
            <Text style={styles.tableCell}>{row.date_achieved?new Date(row.date_achieved).toLocaleDateString():(<PTButton>Request</PTButton>)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProjectDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#AFABA3",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 50,
    resizeMode: "contain",
  },
  profileText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerBlock: {
    marginTop: 30,
    backgroundColor: "#065395",
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  tableRowHeader: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#8A7D6A",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    color: "#333",
    fontSize: 14,
  },
  tableHeaderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F1F6F5",
    paddingVertical: 15,
  },
  navButton: {
    fontSize: 16,
    color: "#333",
  },
  activeButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
