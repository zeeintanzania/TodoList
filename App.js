import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Alert,
} from 'react-native';

export default function App() {
  const [textInput, setTextInput] = React.useState('');
  const [todos, setTodos] = React.useState([
    {id: 1, task: 'First todo', completed: true},
    {id: 2, task: 'Second todo', completed: false},
  ]);

  const ListItem = ({todo}) => {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.task}
          </Text>
        </View>
        {!todo?.completed && (
          <TouchableOpacity onPress={() => markTodoComplete(todo?.id)}>
            <Image
              style={{
                tintColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                width: 20,
                height: 20,
              }}
              source={require('./components/assets/tick-icon.png')}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => deleteTodo(todo?.id)}>
          <Image
            style={{
              tintColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              width: 20,
              height: 20,
              marginLeft: 10,
            }}
            source={require('./components/assets/delete-icon.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const addTodo = () => {
    Keyboard.dismiss();
    if (textInput == '') {
      Alert.alert('Error Message', 'Please Enter your Todo');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
  };

  const markTodoComplete = todoId => {
    const newTodos = todos.map(item => {
      if (item.id == todoId) {
        return {...item, completed: true};
      }
      return item;
    });
    setTodos(newTodos);
  };

  const deleteTodo = todoId => {
    const newTodos = todos.filter(item => item.id != todoId);
    setTodos(newTodos);
  };

  const clearTodo = () => {
    setTodos([]);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headContainer}>
        <Text style={styles.headText}>Todo List</Text>
        <TouchableOpacity onPress={clearTodo}>
          <Text style={styles.deleteAll}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tasksContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: 20, paddingBottom: 100}}
          data={todos}
          renderItem={({item}) => <ListItem todo={item} />}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add Todo"
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.addButton}>
            <Text style={styles.addIcon}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },
  headContainer: {
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headText: {
    fontSize: 25,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: '#000',
    padding: 20,
  },
  deleteAll: {
    fontWeight: 'bold',
    color: 'red',
    right: 20,
    fontSize: 15,
  },
  tasksContainer: {
    top: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    color: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  addIcon: {
    color: '#fff',
    fontSize: 35,
    left: 15,
  },
});
