
import { useEffect } from "react";
import { Image, StyleSheet, View ,Text} from "react-native";

export default function splashscreen ({navigation}){
useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer); 
  }, [navigation]);




  return(
<View style={styles.container}>
    <Image style={styles.image}
    source={require('../assets/splashscreentodo2.jpg')}/>
   <Text style={styles.text}>TODO APP</Text>
   <Text style={styles.text}>LOADINGG....</Text>
 
</View>

  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  image: {
    width: '200',
    height: '150',
     marginBottom: 20,
    
    
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

