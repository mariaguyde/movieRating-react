import {Button, View, Text, TextInput, StatusBar, Image} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Rating, AirbnbRating } from 'react-native-ratings';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// CSS
const formPage = {
    margin : "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    //background: "#0853a2",
    color: "black",
    fontWeight: "bold",
    padding: "20px 30px",
    borderRadius: "20px",
    width: "300px",
}

const label = {
    fontSize: 20,
    fontFamily : "Lato",
}

const inputs = {
    marginTop: "20px",
    display : "flex",
    flexDirection : "column",
}

const input = {
    marginTop : "10px",
    marginBottom : "15px",
    backgroundColor: "white",
}
const NameFilm = {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "20px"
}

const popup = {
    padding : "15px"
}

const NameFilmPopUp = {
    fontSize: "30px",
    fontWeight: "bold",
    margin: "20px 0"
}

const movie = {
    backgroundColor: "white",
    display: "flex",
    padding : "20px",
    marginBottom: "40px",
    borderRadius: "20px",
}

const movie_infos = {
    display:"flex",
    flexDirection: "column",
    marginLeft: "30px",
}

const btn = {
    border : "none",
    backgroundColor: "#0853a2",
    borderRadius: "10px",
    color : "white",
    padding : "10px"
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20,
        marginTop: "30px"
    },
});


let listTasks = [];
let task = {};

const Tabs = createBottomTabNavigator();

// TAB LISTE DES FILMS NOTÉS
const SettingsScreen = ({ route, navigation }) => {
    const [list, setList] = useState([{ id: 0, text: "coucou", note : 6, resume : "Un bon film" }]);
    const addElement = (txt) => {
        setList((current) => [...current, { id: current.length, text: txt }]);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <div class={"movies"}>
                    {listTasks.map((elm) => (
                        <Text style={movie}  key={elm.id}>
                            <Image style={{ width: 267, height: 400}} source={{uri: elm.image,}}/>
                            <div className={"movie_unit"} style={movie_infos}>
                                <span style={NameFilm}>{elm.text} </span>
                                <span>
                                      <Popup trigger={<button style = {btn} className="button"> Voir les détails de ce film </button>} modal nested>
                                        {close => (
                                            <div style={popup} className="modal">
                                                <button  style = {btn} className="close" onClick={close}>
                                                    &times;
                                                </button>
                                                <div style={NameFilmPopUp} className="header"> {elm.text} </div>
                                                <div className="content">
                                                    <span> Note: {elm.note} </span>
                                                    <span> Resume : {elm.resume} </span>
                                                </div>
                                            </div>
                                        )}
                                      </Popup>
                                </span>
                            </div>
                        </Text>
                    ))}
                    </div>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};


// TAB AJOUTER UN FILM  LA LISTE
const FormScreen = (navigation) => {
    const [value, setValue] = useState("");
    const [textValue, setTextValue] = useState("");
    const [gradeValue, setGradeValue] = useState("");
    const [resumeValue, setResumeValue] = useState("");
    const [todoList, setTodoList] = useState([]);
    const navigation2 = useNavigation();


    const addTodo = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const request = "https://imdb-api.com/en/API/SearchMovie/k_dend212b/" + textValue;
        //console.log(request);
        const response = await fetch(request, requestOptions);
        const result = await response.json();
        let image = result.results[0]['image'];
        //console.log(result);
        let id = todoList.length;
        setTodoList([...todoList, { id: id, text: textValue, note :gradeValue, resume :resumeValue, image:image }]);
        task = {id: id, text: textValue, note :gradeValue, resume :resumeValue, image: image};
        listTasks.push(task);
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
                  <TextInput style={input} keyboardType={"numeric"} value={gradeValue} onChangeText={setGradeValue}/>
                  <label style={label}>Résumé personnel</label>
                  <TextInput style={input} value={resumeValue} onChangeText={setResumeValue}/>
                  <Button title="Ajouter le film à ma liste" onPress={addTodo}></Button>
              </div>
              <StatusBar style="auto"></StatusBar>
          </div>
      </View>
  );
};

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
                })}>

                <Tabs.Screen
                    name="Liste de vos films préférés"
                    initialParams={{ addElement: null }}
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: "Liste de vos films préférés",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="albums" size={25} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Ajouter un film à la liste"
                    initialParams={{ addElement: null }}
                    component={FormScreen}
                    options={{
                        tabBarLabel: "Ajouter",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="add-circle-outline" size={25} color={color} />
                        ),
                    }}/>
            </Tabs.Navigator>
        </NavigationContainer>
    );
};

export default App;

