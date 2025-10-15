import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const CouncilMemberDetails = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // 状态管理：去除本地默认数据，仅依赖数据库
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 根据传入的参数从数据库拉取成员数据（移除本地模拟数据）
  useEffect(() => {
    const memberId = params.memberId;
    const memberName = params.memberName;

    const loadMember = async () => {
      try {
        setLoading(true);
        setError(null);
        if (memberId) {
          // 连接数据库接口：优先通过 memberId 获取成员详情
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_IP}/clubBoardMembers/${memberId}`
          );
          const m = (Array.isArray(data) ? data[0] : data) || {};
          const fullName = [m.first_name, m.last_name].filter(Boolean).join(' ') || 'Unknown';
          setMemberData({
            name: fullName,
            memberId: m.user_id ?? memberId,
            gender: m.gender ?? 'Not provided',
            email: m.email ?? 'Not provided',
            phone: m.phone_number ?? m.phone ?? 'Not provided',
            address: m.address ?? 'Not provided',
            joinDate: m.join_date ? new Date(m.join_date).toLocaleDateString('en-GB') : 'Not provided',
            paidUntilDate: m.paid_until ? new Date(m.paid_until).toLocaleDateString('en-GB') : 'Not provided',
          });
          setLoading(false);
          return;
        }

        if (memberName) {
          // 连接数据库接口：从成员列表中按姓名匹配
          // 示例：GET ${process.env.EXPO_PUBLIC_IP}/members（返回 { user: [...] }）
          const { data: res } = await axios.get(`${process.env.EXPO_PUBLIC_IP}/members`);
          const list = res?.user || [];
          const found = list.find((m) => {
            const fullName = [m.first_name, m.last_name].filter(Boolean).join(' ');
            return fullName === memberName;
          });
          if (found) {
            setMemberData({
              name: [found.first_name, found.last_name].filter(Boolean).join(' ') || memberName,
              memberId: found.user_id ?? 'Unknown',
              gender: found.gender ?? 'Not provided',
              email: found.email ?? 'Not provided',
              phone: found.phone_number ?? found.phone ?? 'Not provided',
              address: found.address ?? 'Not provided',
              joinDate: found.join_date ? new Date(found.join_date).toLocaleDateString('en-GB') : 'Not provided',
              paidUntilDate: found.paid_until ? new Date(found.paid_until).toLocaleDateString('en-GB') : 'Not provided',
            });
            setLoading(false);
            return;
          }
        }
        // 若无参数或未匹配到，保持为空并提示错误
        setError('Missing member parameters or no match found');
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch member details from DB:', error);
        setError('Failed to fetch member details');
        setLoading(false);
      }
    };

    loadMember();
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
      router.navigate('/councilclubmemberpage');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#065395" />
          <Text style={{ marginTop: 10, color: '#333' }}>Loading member details...</Text>
        </View>
      ) : (
        <ScrollView style={styles.content}>
        {/* 蓝色标题块 - 显示成员姓名 */}
        <View style={styles.headerBlock}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>{memberData?.name ?? 'Member Details'}</Text>
        </View>

        {/* 成员详细信息 */}
        <View style={styles.detailsContainer}>
          {/* Member ID */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Member id:</Text>
            <Text style={styles.valueText}>{memberData?.memberId ?? 'Not provided'}</Text>
          </View>

          {/* Gender */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Gender:</Text>
            <Text style={styles.valueText}>{memberData?.gender ?? 'Not provided'}</Text>
          </View>

          {/* Email */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Email:</Text>
            <Text style={styles.valueText}>{memberData?.email ?? 'Not provided'}</Text>
          </View>

          {/* Phone */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Phone num:</Text>
            <Text style={styles.valueText}>{memberData?.phone ?? 'Not provided'}</Text>
          </View>

          {/* Address */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Address:</Text>
            <Text style={styles.valueText}>{memberData?.address ?? 'Not provided'}</Text>
          </View>

          {/* Join Date */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Join date:</Text>
            <Text style={styles.valueText}>{memberData?.joinDate ?? 'Not provided'}</Text>
          </View>

          {/* Paid Until Date */}
          <View style={styles.detailRow}>
            <Text style={styles.iconText}>👉</Text>
            <Text style={styles.labelText}>Paid until date:</Text>
            <Text style={styles.valueText}>{memberData?.paidUntilDate ?? 'Not provided'}</Text>
          </View>
        </View>
        {error && (
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        )}
        </ScrollView>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default CouncilMemberDetails;
