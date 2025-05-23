import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View,StyleSheet,TextInput,TouchableOpacity,FlatList ,Alert} from "react-native";

export default function Homescreen({route}){
    const [tasks,settasks]=useState([]);
    const [newtask,setnewtask]=useState('');
    const {username}=route.params;

    useEffect(()=>{
        loadtasks();
    }
    ,[]);

     const loadtasks= async () => {
    try {
      const savedtasks = await AsyncStorage.getItem('@tasks');
      if (savedtasks) settasks(JSON.parse(savedtasks));
    } catch (e) {
      Alert.alert("Error", "Failed to load tasks");
    }
  };
    const savetasks = async (updatedtasks) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(updatedtasks));
    } catch (e) {
      Alert.alert("Error", "Failed to save tasks");
    }
  };

  const addtask = () => {
  if (newtask.trim().length < 4) { 
    Alert.alert("Task must be at least 4 characters");
    return; 
  }
  
  
  const updatedtasks = [
    ...tasks,
    { id: Date.now().toString(), text: newtask, completed: false }
  ];
  settasks(updatedtasks);
  savetasks(updatedtasks);
  setnewtask('');
};

  const togglecomplete = (id) => {
    const updatedtasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    settasks(updatedtasks);
    savetasks(updatedtasks);
  };

  const deletetask = (id) => {
    const updatedtasks = tasks.filter(task => task.id !== id);
    settasks(updatedtasks);
    savetasks(updatedtasks);
  };

  return (
  <View style={styles.container}>
    {/* Header */}
    <Text style={styles.welcome}>Welcome, {username}!</Text>
    
    {/* Task Counter */}
    <Text style={styles.counterText}>
      {`${tasks.filter(t => !t.completed).length} remaining / ${tasks.length} total`}
    </Text>

    {/* Add Task Input */}
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={newtask}
        onChangeText={setnewtask}
        onSubmitEditing={addtask}
      />
      <TouchableOpacity style={styles.addButton} onPress={addtask}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>

    {/* Task List */}
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.task}>
          
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => togglecomplete(item.id)}
          >
            <Text>{item.completed ? '✓' : ''}</Text>
          </TouchableOpacity>

        
          <Text style={[
            styles.taskText,
            item.completed && styles.completedTaskText
          ]}>
            {item.text}
          </Text>

       
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => deletetask(item.id)}
          >
            <Text style={styles.deleteText}>×</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  </View>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f5f5f5',
    paddingTop:100
  },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#86436b',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  completedTask: {
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    fontWeight:"bold",
    color:"green"
    
  },
  
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    color: '#d9534f',
    fontSize: 20,
    fontWeight: 'bold',
  },
  counterText: {
  fontSize: 16,
  color: '#666',
  marginBottom: 10,
  textAlign: 'center',
},
 completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888', 
    opacity: 0.7,  
  },
});