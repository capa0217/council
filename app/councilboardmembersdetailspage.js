import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
 import axios from 'axios';

const CouncilBoardMembersDetailsPage = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // 状态管理
  const [memberData, setMemberData] = useState({
    name: '',
    memberId: '',
    role: '',
    email: '',
    phoneNumber: '',
    joinDate: '',
    startDate: '',
    endDate: ''
  });

  // 从数据库获取董事会成员详细信息的接口函数
  const fetchBoardMemberDetailsFromDatabase = async (memberId, memberName) => {
    try {
      // 连接数据库：优先通过 memberId 获取成员详情
      // get board member detail api
      let memberRow = null;
      if (memberId) {
        const res = await axios.get(
          `${process.env.EXPO_PUBLIC_IP}/clubBoardMembers/${memberId}`
        );
        const data = res?.data;
        memberRow = Array.isArray(data) ? data[0] : data;
      }

      // 如无 memberId，尝试从所有成员中按姓名匹配
      if (!memberRow && memberName) {
        const all = await axios.get(`${process.env.EXPO_PUBLIC_IP}/members`);
        const list = all.data?.user || all.data || [];
        const found = list.find((m) => {
          const fullName = [m.first_name, m.last_name].filter(Boolean).join(' ');
          return fullName === memberName;
        });
        memberRow = found || null;
        if (memberRow && !memberId) memberId = memberRow.user_id;
      }

      // 查询职位等访问信息check role
      let position = 'Member';
      let start = 'Not provided';
      let end = 'Not provided';
      if (memberId) {
        try {
          const accessRes = await axios.get(
            `${process.env.EXPO_PUBLIC_IP}/clubAccess/${memberId}`
          );
          position = accessRes.data?.position || accessRes.data?.access || position;
          if (accessRes?.data?.start_date) {
            start = new Date(accessRes.data.start_date).toLocaleDateString('en-GB');
          }
          if (accessRes?.data?.end_date) {
            end = new Date(accessRes.data.end_date).toLocaleDateString('en-GB');
          }
        } catch (e) {
          console.log('Fetch access failed:', e);
        }
      }

      const fullName = memberRow
        ? [memberRow.first_name, memberRow.last_name].filter(Boolean).join(' ')
        : memberName || 'Unknown Member';
      const phone = memberRow?.phone || memberRow?.phone_number || 'Not provided';
      const email = memberRow?.email || 'Not provided';
      const join = memberRow?.join_date
        ? new Date(memberRow.join_date).toLocaleDateString('en-GB')
        : 'Not provided';
      // 若成员表里存在 end_date，则作为结束日期兜底
      if (end === 'Not provided' && memberRow?.end_date) {
        end = new Date(memberRow.end_date).toLocaleDateString('en-GB');
      }

      return {
        name: fullName,
        memberId: memberId || memberRow?.user_id || '000000',
        role: position,
        email,
        phoneNumber: phone,
        joinDate: join,
        startDate: start,
        endDate: end,
      };
    } catch (error) {
      console.error('Error fetching board member details from database:', error);
      return {
        name: memberName || 'Unknown Member',
        memberId: memberId || '000000',
        role: 'Member',
        email: 'Not provided',
        phoneNumber: 'Not provided',
        joinDate: 'Not provided',
        startDate: 'Not provided',
        endDate: 'Not provided',
      };
    }
  };

  // 根据传入的参数设置成员数据（仅数据库数据，不使用本地参数）
  useEffect(() => {
    const loadMemberDetails = async () => {
      const memberId = params.memberId;
      const memberName = params.memberName;
      try {
        const memberDetails = await fetchBoardMemberDetailsFromDatabase(memberId, memberName);
        setMemberData(memberDetails);
      } catch (error) {
        console.error('Error loading board member details:', error);
        // 设置默认占位数据（仍为非本地硬编码字段）
        setMemberData({
          name: memberName || 'Unknown Member',
          memberId: memberId || '000000',
          role: 'Member',
          email: 'Not provided',
          phoneNumber: 'Not provided',
          joinDate: 'Not provided',
          startDate: 'Not provided',
          endDate: 'Not provided'
        });
      }
    };

    loadMemberDetails();
  }, [params.memberId, params.memberName]);

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* 蓝色标题块 - 显示成员姓名 */}
        <View style={styles.headerBlock}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>{memberData.name}</Text>
        </View>

        {/* 成员详细信息 */}
        <View style={styles.detailsContainer}>
          {/* Member ID */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Member id:</Text>
            <Text style={styles.valueText}>{memberData.memberId}</Text>
          </View>

          {/* Role */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Role:</Text>
            <Text style={styles.valueText}>{memberData.role}</Text>
          </View>

          {/* Email */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Email:</Text>
            <Text style={styles.valueText}>{memberData.email}</Text>
          </View>

          {/* Phone Number */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Phone number:</Text>
            <Text style={styles.valueText}>{memberData.phoneNumber}</Text>
          </View>

          {/* Join Date */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Join date:</Text>
            <Text style={styles.valueText}>{memberData.joinDate}</Text>
          </View>

          {/* Start Date */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Start date:</Text>
            <Text style={styles.valueText}>{memberData.startDate}</Text>
          </View>

          {/* End Date */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>End date:</Text>
            <Text style={styles.valueText}>{memberData.endDate}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  detailsContainer: {
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconText: {
    fontSize: 16,
    marginRight: 10,
    width: 20,
  },
  labelText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    width: 120,
  },
  valueText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default CouncilBoardMembersDetailsPage;
