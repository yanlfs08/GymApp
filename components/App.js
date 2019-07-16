/* eslint-disable react/no-string-refs */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Button
} from "react-native";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: "",
      UserPassword: ""
    };
  }
  UserLoginFunction = () => {
    const { UserEmail, UserPassword } = this.state;
    if (UserEmail === "" || UserPassword === "") {
      Alert.alert("Informe o e-mail e senha");
    } else {
      fetch("https://projetopi2019.000webhostapp.com/User_Login.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: UserEmail,
          password: UserPassword
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // If server response message same as Data Matched
          if (responseJson === "Data Matched") {
            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.push("ProfileActivity", { Email: UserEmail });
          } else {
            Alert.alert(responseJson);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#00b5cc" />
        <KeyboardAvoidingView style={styles.container}>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Image
                  style={styles.logo}
                  source={require("../assets/icon.png")}
                />
              </View>
              <View style={styles.infoContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={UserEmail => this.setState({ UserEmail })}
                  placeholderTextColor="rgba(84,84,84,0.8)"
                  keyboardType="default"
                  returnKeyType="next"
                  autoCorrect={false}
                  onSubmitEditing={() => this.refs.txtPassword.focus()}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor="rgba(84,84,84,0.8)"
                  onChangeText={UserPassword => this.setState({ UserPassword })}
                  keyboardType="default"
                  secureTextEntry={true}
                  returnKeyType="go"
                  autoCorrect={false}
                  ref={"txtPassword"}
                />
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text
                    style={styles.buttonText}
                    title="Login"
                    onPress={this.UserLoginFunction}
                  >
                    {" "}
                    LOGIN{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

class ProfileActivity extends Component {
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.TextComponentStyle}>
          {" "}
          {this.props.navigation.state.params.Email}{" "}
        </Text>
        <Button title="Click here to Logout" onPress={() => goBack(null)} />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    ProfileActivity: {
      screen: ProfileActivity
    }
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00b5cc",
    flex: 1,
    flexDirection: "column"
  },
  //inputText vão aqui
  infoContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    padding: 20
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  logo: {
    width: 160,
    height: 160
  },
  tittle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.9
  },
  input: {
    height: 45,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 7,
    fontSize: 16
  },
  //Botão de login
  buttonContainer: {
    height: 45,
    backgroundColor: "#545454",
    borderRadius: 10,
    paddingVertical: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#00b5cc",
    fontWeight: "bold",
    fontSize: 18
  },
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10
  },

  TextInputStyleClass: {
    textAlign: "center",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 5
  },

  TextComponentStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginBottom: 15
  }
});
