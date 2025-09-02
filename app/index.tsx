import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import PTHeader from './components/PTHeader';

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.containers}><View style={styles.logoContainer}>
        <TouchableOpacity 
        onPress={() =>
              router.push({
                pathname: `/`,
              })
            }>
        <Image
          source={{
            uri: "https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png",
          }}
          style={styles.logos}
          resizeMode="contain"
        />
        </TouchableOpacity>
      </View></View>
        
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.row}>
          
          <View style={styles.text}><Text style={styles.title}>Welcome to POWERtalk </Text>
          <View style={styles.line}></View>
          <Text style={styles.profit}> AN AUSTRALIAN NOT-FOR-PROFIT ASSOCIATION</Text>
          <View style={styles.lines}></View>
          <View style={styles.purposes}> <View style={styles.elements}><svg aria-hidden="true" style={styles.logo} className="e-font-icon-svg e-fas-hand-point-right" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 199.652c0 23.625-20.65 43.826-44.8 43.826h-99.851c16.34 17.048 18.346 49.766-6.299 70.944 14.288 22.829 2.147 53.017-16.45 62.315C353.574 425.878 322.654 448 272 448c-2.746 0-13.276-.203-16-.195-61.971.168-76.894-31.065-123.731-38.315C120.596 407.683 112 397.599 112 385.786V214.261l.002-.001c.011-18.366 10.607-35.889 28.464-43.845 28.886-12.994 95.413-49.038 107.534-77.323 7.797-18.194 21.384-29.084 40-29.092 34.222-.014 57.752 35.098 44.119 66.908-3.583 8.359-8.312 16.67-14.153 24.918H467.2c23.45 0 44.8 20.543 44.8 43.826zM96 200v192c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V200c0-13.255 10.745-24 24-24h48c13.255 0 24 10.745 24 24zM68 368c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"></path></svg> <Text style={styles.size}>Helping you to develop in leadership</Text></View>
                  
                  <View style={styles.elements}><svg aria-hidden="true" style={styles.logo} className="e-font-icon-svg e-fas-hand-point-right" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 199.652c0 23.625-20.65 43.826-44.8 43.826h-99.851c16.34 17.048 18.346 49.766-6.299 70.944 14.288 22.829 2.147 53.017-16.45 62.315C353.574 425.878 322.654 448 272 448c-2.746 0-13.276-.203-16-.195-61.971.168-76.894-31.065-123.731-38.315C120.596 407.683 112 397.599 112 385.786V214.261l.002-.001c.011-18.366 10.607-35.889 28.464-43.845 28.886-12.994 95.413-49.038 107.534-77.323 7.797-18.194 21.384-29.084 40-29.092 34.222-.014 57.752 35.098 44.119 66.908-3.583 8.359-8.312 16.67-14.153 24.918H467.2c23.45 0 44.8 20.543 44.8 43.826zM96 200v192c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V200c0-13.255 10.745-24 24-24h48c13.255 0 24 10.745 24 24zM68 368c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"></path></svg><Text style={styles.size}>Supporting you to be confident in communication</Text></View>

      <View style={styles.elements}><svg aria-hidden="true" style={styles.logo} className="e-font-icon-svg e-fas-hand-point-right" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 199.652c0 23.625-20.65 43.826-44.8 43.826h-99.851c16.34 17.048 18.346 49.766-6.299 70.944 14.288 22.829 2.147 53.017-16.45 62.315C353.574 425.878 322.654 448 272 448c-2.746 0-13.276-.203-16-.195-61.971.168-76.894-31.065-123.731-38.315C120.596 407.683 112 397.599 112 385.786V214.261l.002-.001c.011-18.366 10.607-35.889 28.464-43.845 28.886-12.994 95.413-49.038 107.534-77.323 7.797-18.194 21.384-29.084 40-29.092 34.222-.014 57.752 35.098 44.119 66.908-3.583 8.359-8.312 16.67-14.153 24.918H467.2c23.45 0 44.8 20.543 44.8 43.826zM96 200v192c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V200c0-13.255 10.745-24 24-24h48c13.255 0 24 10.745 24 24zM68 368c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"></path></svg> <Text style={styles.size}>Having more chances to create the relationships</Text></View>

      <View style={styles.elements}><svg aria-hidden="true" style={styles.logo} className="e-font-icon-svg e-fas-hand-point-right" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 199.652c0 23.625-20.65 43.826-44.8 43.826h-99.851c16.34 17.048 18.346 49.766-6.299 70.944 14.288 22.829 2.147 53.017-16.45 62.315C353.574 425.878 322.654 448 272 448c-2.746 0-13.276-.203-16-.195-61.971.168-76.894-31.065-123.731-38.315C120.596 407.683 112 397.599 112 385.786V214.261l.002-.001c.011-18.366 10.607-35.889 28.464-43.845 28.886-12.994 95.413-49.038 107.534-77.323 7.797-18.194 21.384-29.084 40-29.092 34.222-.014 57.752 35.098 44.119 66.908-3.583 8.359-8.312 16.67-14.153 24.918H467.2c23.45 0 44.8 20.543 44.8 43.826zM96 200v192c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V200c0-13.255 10.745-24 24-24h48c13.255 0 24 10.745 24 24zM68 368c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"></path></svg> <Text style={styles.size}>Providing training for you as a real professional workplace</Text></View></View>        
                                       <TouchableOpacity style={styles.button}  onPress={() =>
                                                     router.push('./login')
                                                   }> <Text></Text>LET'S GET STARTED </TouchableOpacity>

</View>
         <View style={styles.image}> <Image
        source={{
          uri: 'https://www.powertalkaustralia.org.au/wp-content/uploads/al_opt_content/IMAGE/www.powertalkaustralia.org.au/wp-content/uploads/2024/05/What-is-POWERtalk-Australia_final.webp.bv_resized_desktop.webp.bv.webp?bv_host=www.powertalkaustralia.org.au',
        }}
        style={styles.images}
        resizeMode="contain"
      /></View>
      
        </View>
        
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ makes the whole screen available
  }, 
  logos:{
    
    width: 150,
    height: 60,
    marginVertical: 10,
    marginLeft: 10,
  
  },
  profit:{
      left:87,
      fontSize:15,
  },
   containers: {
    backgroundColor: "#F1F6F5",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  line:{
       borderBottomColor: '#ccc', // line color
    borderBottomWidth: 1, // line thickness
    marginVertical: 10,
    left:10,   // space above and below the line
  },
  lines:{
     borderBottomColor: '#ccc', // line color
    borderBottomWidth: 1, // line thickness
    marginVertical: 10,   // space above and below the line
    width:'50%',
    left:130,
  },
  text:{
    width:500,
    height:500,
  },
  purposes:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    gap:20,
    top:20,
  },
  elements:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:10,
  },
  logo:{
    width:50,
    height:50,
  },
  logoContainer: {
    flex: 2,
  },
  image:{
  width: '100%',
  height: 600,

  },
  images:{
    width: '50%',
  height: 600,
  left:140,
  },
  row:{
    display:'flex',
  
  flexDirection:'row',
    width:'100%',
    height:600,
    marginLeft:300,
  },
  scrollContent: {
    flexGrow: 1, 
    borderRadius:10,
    borderColor:'grey',
    shadowColor:'grey',
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    fontFamily:'san-serif',
    left:25,
  },
  size:{
   fontSize:18,
       fontFamily:'san-serif',

  },
  button:{
    top:60,
    left:170,
    backgroundColor:'orange',
    width:150,
    padding:10,
    textAlign:'center',
   borderRadius:10,
   shadowOpacity:10,
   shadowColor:'orange',
   shadowRadius:10,
  }
});
