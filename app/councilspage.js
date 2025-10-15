import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const CouncilsPage = () => {
  const navigation = useNavigation();
  const router = useRouter();

 
  const [councils, setCouncils] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCouncilsFromDatabase = async () => {
    try {
      setLoading(true);
      setError('');
      
      const clubsRes = await axios.get(`${process.env.EXPO_PUBLIC_IP}/clubs`);
      const allClubs = clubsRes.data || [];

     
      const councilClubNames = [];
      for (const club of allClubs) {
        const clubId = club.Club_id ?? club.club_id;
        const clubName = club.Club_name ?? club.club_name;
        if (!clubId || !clubName) continue;
        try {
       
          const { data: boardIds } = await axios.get(
            `${process.env.EXPO_PUBLIC_IP}/clubBoard/${clubId}`
          );
          let hasCouncil = false;
          for (const item of boardIds || []) {
            const uid = item.User_id ?? item.user_id ?? item.member_id ?? item.UserId ?? item.id;
            if (uid == null) continue;
            try {
            
              const accessRes = await axios.get(
                `${process.env.EXPO_PUBLIC_IP}/clubAccess/${uid}`
              );
              const accessLevel = accessRes.data?.level_of_access || accessRes.data?.access;
              if (accessLevel === 'council') {
                hasCouncil = true;
                break;
              }
            } catch (inner) {
              
              console.log('Fetch access failed:', inner);
            }
          }
          if (hasCouncil) {
            councilClubNames.push(clubName);
          }
        } catch (e) {
          console.log('Fetch board ids failed:', e);
        }
      }

   
      const uniqueNames = Array.from(new Set(councilClubNames));
      setCouncils(uniqueNames.length > 0 ? uniqueNames : (allClubs.map(c => c.Club_name).filter(Boolean)));
    } catch (err) {
      console.error('Error fetching councils:', err);
      setError('Failed to load councils');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCouncilsFromDatabase();
  }, []);

  const handleClubPress = (clubName) => {
    // 处理俱乐部按钮点击事件，跳转到对应的 Councils Clubs 页面
    console.log(`${clubName} pressed`);
    router.push({
      pathname: '/councilsclubspage',
      params: { councilName: clubName }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Councils 标题块 */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerText}>Councils</Text>
        </View>
        {loading && (
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ textAlign: 'center' }}>Loading councils...</Text>
          </View>
        )}
        {!loading && error ? (
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
          </View>
        ) : null}
        {!loading && !error && councils.length === 0 ? (
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ textAlign: 'center' }}>No councils found</Text>
          </View>
        ) : null}
        {!loading && !error && councils.map((name) => (
          <TouchableOpacity 
            key={name}
            style={[styles.clubButton, styles.clubConnectButton]}
            onPress={() => handleClubPress(name)}
          >
            <Text style={styles.clubButtonText}>{name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingHorizontal: 20,
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
  clubButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  clubConnectButton: {
    backgroundColor: '#8A7D6A', // 棕色，与其他页面按钮颜色一致
  },
  clubBButton: {
    backgroundColor: '#8A7D6A', // 棕色，与其他页面按钮颜色一致
  },
  clubCButton: {
    backgroundColor: '#8A7D6A', // 棕色，与其他页面按钮颜色一致
  },
  clubButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default CouncilsPage;
