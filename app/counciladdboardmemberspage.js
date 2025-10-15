import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const CouncilAddBoardMembersPage = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  // 来自上一页的可选成员姓名
  const [availableNames, setAvailableNames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // 表单状态管理
  const [formData, setFormData] = useState({
    searchName: '',
    role: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const handleBackPress = () => {
    // 返回上一页
    console.log('Back button pressed');
    try {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        router.back();
      }
    } catch (error) {
      console.log('Navigation error:', error);
      router.navigate('/councilclubboardmemberpage');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSearchClick = () => {
    const text = formData.searchName.trim().toLowerCase();
    const filtered = text
      ? availableNames.filter(name => name.toLowerCase().includes(text))
      : availableNames;
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  // 解析上一页传入的成员列表，并从数据库加载可选成员姓名（移除本地存储）
  useEffect(() => {
    const loadNames = async () => {
      try {
        let namesFromParams = [];
        if (params.availableMembers) {
          try {
            const arr = JSON.parse(params.availableMembers);
            namesFromParams = arr.map(m => m.name).filter(Boolean);
          } catch (e) {
            console.log('Parse availableMembers failed:', e);
          }
        }

        // 连接数据库：读取所有成员姓名

        let namesFromDB = [];
        try {
          const res = await axios.get(`${process.env.EXPO_PUBLIC_IP}/members`);
          const members = res.data?.user ?? res.data ?? [];
          namesFromDB = members
            .map((m) => [m.first_name, m.last_name].filter(Boolean).join(' '))
            .filter(Boolean);
        } catch (dbErr) {
          console.log('Fetch names from DB failed:', dbErr);
        }

        const all = [...namesFromParams, ...namesFromDB];
        const uniq = Array.from(new Set(all));
        setAvailableNames(uniq);
      } catch (err) {
        console.log('loadNames error:', err);
      }
    };
    loadNames();
  }, [params.availableMembers, params.clubName]);

  const validateForm = () => {
    console.log('Validating form data:', formData);
    
    if (!formData.searchName.trim()) {
      console.log('Validation failed: searchName is empty');
      Alert.alert('Error', 'Please enter a name to search');
      return false;
    }
    if (!formData.role.trim()) {
      console.log('Validation failed: role is empty');
      Alert.alert('Error', 'Please enter a role');
      return false;
    }
    if (!formData.startDate.trim()) {
      console.log('Validation failed: startDate is empty');
      Alert.alert('Error', 'Please enter a start date');
      return false;
    }
    if (!formData.endDate.trim()) {
      console.log('Validation failed: endDate is empty');
      Alert.alert('Error', 'Please enter an end date');
      return false;
    }
    
    console.log('Form validation passed successfully');
    return true;
  };

  const handleFinish = async () => {
    console.log('Finish button pressed, starting validation...');
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, processing data...');
    
    try {
      // 连接数据库：解析俱乐部与成员ID
      const clubName = (params.clubName || 'Brisbane Central').toString();
      const fullName = formData.searchName.trim();

      // 获取 clubId
      const clubsRes = await axios.get(`${process.env.EXPO_PUBLIC_IP}/clubs`);
      const allClubs = clubsRes.data || [];
      const matchClub = allClubs.find((c) => c.Club_name === clubName);
      if (!matchClub) throw new Error('Club not found');
      const clubId = matchClub.Club_id;

      // 获取 userId
      const membersRes = await axios.get(`${process.env.EXPO_PUBLIC_IP}/members`);
      const list = membersRes.data?.user ?? membersRes.data ?? [];
      const foundMember = list.find((m) => {
        const name = [m.first_name, m.last_name].filter(Boolean).join(' ');
        return name === fullName;
      });
      if (!foundMember) throw new Error('Member not found');
      const userId = foundMember.user_id;

  
      // 使用后端已存在的接口将成员加入俱乐部
      try {
        await axios.post(`${process.env.EXPO_PUBLIC_IP}/BoardMember`, {
          User_id: userId,
          Club_id: clubId,
        });
      } catch (e1) {
        console.log('Add to club failed:', e1);
        throw e1;
      }

      Alert.alert('Success', 'Board member saved to database');

      // 返回董事会成员列表页，列表页将重新从数据库加载go back
      router.push({
        pathname: '/councilclubboardmemberpage',
        params: { clubName }
      });
    } catch (error) {
      console.error('Error adding board member:', error);
      Alert.alert('Error', 'Failed to add board member. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.content}>
          {/* 蓝色标题块 - 显示 Assign Board Member */}
          <View style={styles.headerBlock}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Assign Board Member</Text>
          </View>


        {/* 表单容器 */}
        <View style={styles.formContainer}>
            {/* Search Name */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Search Name:</Text>
              <View style={styles.searchRow}>
                <TextInput
                  style={[styles.formInput, { flex: 1, marginRight: 10 }]}
                  value={formData.searchName}
                  onChangeText={(text) => handleInputChange('searchName', text)}
                  placeholder="Enter member name"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearchClick}>
                  <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 姓名选择弹框 */}
            <Modal
              visible={showSuggestions}
              animationType="fade"
              transparent
              onRequestClose={() => setShowSuggestions(false)}
            >
              <View style={styles.modalBackdrop}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Select a Name</Text>
                    <TouchableOpacity onPress={() => setShowSuggestions(false)}>
                      <Text style={styles.modalClose}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView style={styles.modalList}>
                    {suggestions.map((name, idx) => (
                      <TouchableOpacity
                        key={`${name}-${idx}`}
                        style={styles.suggestionItem}
                        onPress={() => {
                          setFormData(prev => ({ ...prev, searchName: name }));
                          setShowSuggestions(false);
                        }}
                      >
                        <Text style={styles.suggestionText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                    {suggestions.length === 0 && (
                      <View style={styles.noSuggestion}>
                        <Text style={styles.noSuggestionText}>No matches</Text>
                      </View>
                    )}
                  </ScrollView>
                </View>
              </View>
            </Modal>

            {/* Role */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Role:</Text>
              <TextInput
                style={styles.formInput}
                value={formData.role}
                onChangeText={(text) => handleInputChange('role', text)}
                placeholder="Enter role (e.g., President, Secretary)"
                placeholderTextColor="#999"
              />
            </View>

            {/* Start Date */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Start Date:</Text>
              <TextInput
                style={styles.formInput}
                value={formData.startDate}
                onChangeText={(text) => handleInputChange('startDate', text)}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#999"
              />
            </View>

            {/* End Date */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>End Date:</Text>
              <TextInput
                style={styles.formInput}
                value={formData.endDate}
                onChangeText={(text) => handleInputChange('endDate', text)}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#999"
              />
            </View>

            {/* Notes */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Notes:</Text>
              <TextInput
                style={[styles.formInput, styles.notesInput]}
                value={formData.notes}
                onChangeText={(text) => handleInputChange('notes', text)}
                placeholder="Enter any additional notes"
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Finish Button */}
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinish}
            >
              <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerBlock: {
    marginTop: 30,
    backgroundColor: '#065395',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 10,
    zIndex: 10,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  formInput: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  notesInput: {
    height: 100,
    paddingTop: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#065395',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: '#8A7D6A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  finishButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modalClose: {
    fontSize: 18,
    color: '#666',
    paddingHorizontal: 8,
  },
  modalList: {
    maxHeight: 260,
  },
  suggestionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  noSuggestion: {
    padding: 16,
    alignItems: 'center',
  },
  noSuggestionText: {
    fontSize: 14,
    color: '#999',
  },
});

export default CouncilAddBoardMembersPage;
