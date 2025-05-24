import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard } from "react-native";
import { Alert, Button, Pressable, TextInput, TouchableOpacity } from "react-native";
import { View ,StyleSheet,Text} from "react-native"



export default function Loginscreen(){
    const [username,setusername]=useState('');
    const navigation=useNavigation();
    const handlesubmit=()=>{
        Keyboard.dismiss();
        if(username){
            Alert.alert(
                "Continue?",
                `Hello , ${username} do you want to Submit`,
                [
                    {text:'Ok',
                        onPress:()=>{
                            navigation.navigate('Home',{username})
                        }
                    },
                    {text:'cancel',
                        
                    }
                ]
             ) ;
            } else{
           Alert.alert("Error please Enter Your User Name")

            }
        }
    
    return(
        <View style={styles.container}>
            
          <View style={styles.containeruser}>
              <Text style={styles.txt}>User Name:</Text>
            <TextInput  style={styles.txtin}
            placeholder="Enter your User name"
            value={username}
            onChangeText={setusername}
            >
                
            </TextInput>
            
          </View>
        <TouchableOpacity style={styles.btn}
        onPress={handlesubmit}>
          <Text >Submit</Text>
        </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
 
  },
 btn:{
    borderColor:'black',
    borderWidth:3,
    borderColor:'steelblue',
    borderRadius:8,
    paddingVertical:6,
    paddingHorizontal:40,
    backgroundColor:'steelblue',
},
txtin:{
    margin:10,
    paddingBottom:10,
    paddingTop:10,
    borderRadius:10,
    borderWidth:4,
    paddingHorizontal:10,
    borderColor:'green',
    width:'50%',
    
},
txt:{
 

},
containeruser:{
 flexDirection:'row',
 justifyContent:'center',
 alignItems:'center',
}
});

