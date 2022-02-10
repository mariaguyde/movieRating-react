import {Button, View, Text, TextInput, StatusBar} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {ScrollView} from 'react-native';


// CSS
const formPage = {
    margin : "20px"
}

const label = {
    fontSize: 20,
    fontFamily : "Lato",
}

const inputs = {
    marginTop: "20px",
    display : "flex",
    flexDirection : "column"
}

const input = {
    marginTop : "10px",
    marginBottom : "15px"
}

const buttonsArea = {
    display: "flex",
    flexDirection: "row",
}

const buttons = {
    width : "fit-content",
    marginRight:  "10px"
}

const listFilmAjoutes = {
    marginTop: "20px"
}

const listView = {
    margin : "20px"
}

const NameFilm = {
    fontSize: "30px",
    fontWeight: "bold"
}

let listTasks = [];
let task = {};

const Todo = ({ text, doneCallback, note, resume }) => {
  return (
      <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 30 }}>{text}</Text>
          <Text  style={{ fontSize: 20 }}>{note}</Text>
          <Text  style={{ fontSize: 20 }}>{resume}</Text>
          <Button style ={{width: "fit-content"}} title="done" onPress={doneCallback}></Button>
      </View>
  );
};

const Tabs = createBottomTabNavigator();

const SettingsScreen = ({ route, navigation }) => {
    console.log(listTasks);

    const [list, setList] = useState([{ id: 0, text: "coucou", note : 6, resume : "Un bon film" }]);

    const addElement = (txt) => {
        setList((current) => [...current, { id: current.length, text: txt }]);
    };


    return (
        <View>
            <div style={listView}>
                <div>
                    <Button style = {buttons}
                            title="Ajouter un film à la liste"
                            onPress={() => {
                                navigation.navigate("Ajouter un film à la liste");
                            }}
                    />
                </div>

                <div style={listFilmAjoutes}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {listTasks.map((elm) => (
                            <Text key={elm.id}>
                                <span style={NameFilm}>{elm.text} </span>
                                <span> Note: {elm.note} </span>
                                <span> Resume : {elm.resume} </span>
                            </Text>
                        ))}
                    </ScrollView>
                </div>
            </div>
        </View>
    );
};



const FormScreen = (navigation) => {
    const [value, setValue] = useState("");
    const [textValue, setTextValue] = useState("");
    const [gradeValue, setGradeValue] = useState("");
    const [resumeValue, setResumeValue] = useState("");
    const [todoList, setTodoList] = useState([]);
    const navigation2 = useNavigation();


    const addTodo = () => {
    let id = todoList.length;
    setTodoList([...todoList, { id: id, text: textValue, note :gradeValue, resume :resumeValue }]);
    task = {id: id, text: textValue, note :gradeValue, resume :resumeValue};
    console.log(task);
    listTasks.push(task);
    console.log(listTasks);
  };

  const removeTodo = (id) => {
    setTodoList(todoList.filter((elm) => elm.id != id));
  };

  return (
      <View>
          <div style={formPage}>

              <div style={inputs}>
                  <label style={label}>Nom du film</label>
                  <TextInput style={input} value={textValue} onChangeText={setTextValue}/>
                  <label style={label}>Note du film</label>
                  <TextInput style={input} keyboardType="numeric" value={gradeValue} onChangeText={setGradeValue}/>
                  <label style={label}>Résumé personnel</label>
                  <TextInput style={input} value={resumeValue} onChangeText={setResumeValue}/>
              </div>

              <div style={buttonsArea}>
                  <div style={buttons}>
                      <Button  title="Ajouter le film à ma liste" onPress={addTodo}></Button>
                  </div>
                  <div style={buttons}>
                      <Button
                              title="Retourner à la liste des films"
                              onPress={() => navigation2.navigate("Liste des films notés", { addElement: value })}
                      />
                  </div>
              </div>

              <div style={listFilmAjoutes}>
                  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                      {todoList.map((todo) => (
                          <Todo
                              text={todo.text}
                              note = {todo.note}
                              resume = {todo.resume}
                              key={todo.id}
                              doneCallback={() => removeTodo(todo.id)}
                          >
                          </Todo>
                      ))}
                  </ScrollView>
              </div>
              <StatusBar style="auto"></StatusBar>
          </div>
      </View>
  );
};

// const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tabs.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        let iconName;
                        if (route.name == "Home") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name == "Settings") {
                            iconName = focused ? "settings" : "settings-outline";
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#49e",
                    tabBarInactiveTintColor: "grey",
                })}
            >
                <Tabs.Screen
                    name="Liste des films notés"
                    component={SettingsScreen}
                />
                <Tabs.Screen
                    name="Ajouter un film à la liste"
                    initialParams={{ addElement: null }}
                    component={FormScreen}/>
            </Tabs.Navigator>
        </NavigationContainer>
    );
};

export default App;

