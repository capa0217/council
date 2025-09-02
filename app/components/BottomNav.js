import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
function Nav({ name, link, active }) {
  const router = useRouter();
  
  if (active){
    return <TouchableOpacity
        style={styles.navButton}
        onPress={() =>
          router.push({
            pathname: `/${link}`,
          })
        }
      >
        <Text style={styles.navText}>{name}</Text>
      </TouchableOpacity>;
  }
  return <View style={styles.active}><Text style={styles.activeText}>{name}</Text></View>
  
  ;
}
const BottomNav = ({ active }) => {

  return (
    <View style={styles.bottomNav}>
      <Nav name={'Club Members'} link={'clubmember'} active={active!=1}/>
      <Nav name={'Meetings'} link={'club_meeting'} active={active!=2}/>
      <Nav name={'Projects'} link={'members_projectLevels'} active={active!=3}/>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#F1F6F5",
  },
  navButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: '#FFD347',
    flex: 1,
  },
  navText: {
    fontSize: 16,
    color: "#333",
  },
  active: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: '#ffc300',
    flex:1,
  },
  activeText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
