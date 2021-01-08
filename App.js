
import { View, Text, Button, TouchableOpacity,StyleSheet, TextInput, SafeAreaView , TouchableHighlight, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Footer from './components/Footer';
import Chart from './components/Chart';
import Home from './components/Home'
import Icon from 'react-native-vector-icons/Ionicons';
import Markets from './components/markets/Markets'; 
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import React, { useState, useEffect } from 'react';
import generalStyles from './generalStyles';

import { Modal, Portal, Provider } from 'react-native-paper';



function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Footer></Footer>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     
      <Text>Feed Screen</Text>
     
    </View>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Footer></Footer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
        <Text>Notifications Screen</Text>
      </View>
    </View>
  );
}


// {},{ drawerPosition:'left', drawerBackgroundColor: '#0000FF'}
const Drawer = createDrawerNavigator();

function MyDrawer(props) {

  //console.log("Props: ", props);
  return (
    <Drawer.Navigator style = {{backgroundColor: generalStyles.background}}>
      <Drawer.Screen activeTintColor={generalStyles.mainColor} name="Home" component={Home} initialParams = {{user: props}}/>
      <Drawer.Screen name="Market" component={Markets}  options = {{user: props.user}}/>
      {/* <Drawer.Screen name="Portfolio" component={Notifications} /> */}
      <Drawer.Screen name="Chart" component={Chart}/>
    </Drawer.Navigator>
  );
}


anonymousAuth = () => {
  auth()
  .signInAnonymously()
  .then(() => {
    console.log('User signed in anonymously');
  })
  .catch(error => {
    if (error.code === 'auth/operation-not-allowed') {
      console.log('Enable anonymous in your firebase console.');
    }
    console.error(error);
  });
}

logout = () => {
  console.log("Vou dar logout");
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));

}





App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState("")
  const [isValid, setValid] = useState(true)
  const [signUpVisible, setSignupVisibility] = useState(false);
  




const __isValidEmail = (email) => {
  return true;
}


  const showSignup = () => {
    setSignupVisibility(true);
  }

  const hideSignup = () => {
    setSignupVisibility(false);
  }



  const __doSignUp = () => {
   
    if (!email) {
      setError("Email required *")
      setValid(false)
      return
    } else if (!password && password.trim() && password.length > 6) {
      setError("Weak password, minimum 5 chars")
      setValid(false)
      return
    } else if (!__isValidEmail(email)) {
      setError("Invalid Email")
      setValid(false)
      return
    }
    
    __doCreateUser(email, password)
  }

  const __doCreateUser = () => {
    try {
      auth().createUserWithEmailAndPassword(
        email,
        password,
        
      ).then(response=>{
        if (response && response.user) {
          firestore()
          .collection('users')
          .add({
            uid: response.user.uid,
            username: username,
            email: response.user.email
          })
          .then(() => {
          Alert.alert("Success ✅", "User successfuly created");
        })
        }
      })
     
    } catch (e) {
      console.error(e.message)
    }
  }

  const __doSingIn = async () => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password)
      if (response && response.user) {
        Alert.alert("Success ✅", "Authenticated successfully")
      }
    } catch (e) {
      Alert.alert("Unable to authenticate:\n" + e.message);
      console.error(e.message)
    }
  }
  

  const onAuthStateChanged = (user) => {
    if(user) {
      firestore().collection('users').where('uid', '==', user.uid)
      .get()
      .then(querySnapshot =>{
        setUser(querySnapshot);
        if (initializing) setInitializing(false);
      })
    } else {

      setUser(user);
      if (initializing) setInitializing(false);

    }
      
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
  
    return (
       <Provider>
      <View style={{backgroundColor: generalStyles.background, height:"100%"}}>
      <Footer></Footer>
      <SafeAreaView style={styles.containerStyle}>
      <View style={{ flex: 0.2 }}>
        {!!fetching && <ActivityIndicator  />}
      </View>
      <View style={styles.headerContainerStyle}>
        <Text style={{alignSelf:'flex-start', marginLeft:10,padding: 10, fontSize:20, fontWeight:'bold', color: 'white'}}> Welcome to Magnify </Text>
      </View>
      <View style={styles.formContainerStyle}>
      <View style = {{padding:10}}>
        <TextInput
          label={"Email"}
          keyboardType="email-address"
          style={styles.textInputStyle}
          placeholder="Mail address"
          onChangeText={text => {
            setError
            setEmail(text)
          }}
          error={isValid}
        />
      </View>
      <View style = {{padding:10}}>
        <TextInput
          label={"Password"}
          secureTextEntry
          style={styles.textInputStyle}
          placeholder="Password"
          error={isValid}
          onChangeText={text => setPassword(text)}
        />
      </View>
      </View>
      {error ? (
        <View style={styles.errorLabelContainerStyle}>
          <Text style={styles.errorTextStyle}>{error}</Text>
        </View>
      ) : null}

              <Portal>
                <Modal visible={signUpVisible} onDismiss={hideSignup} contentContainerStyle={ {backgroundColor: generalStyles.background ,padding: 20, height:'50%'}}>
                  <View style = {{alignSelf: 'center'}}>
                <Text style={{alignSelf:'flex-start', marginLeft:10,padding: 10, fontSize:20, fontWeight:'bold', color: 'white'}}>Sign Up to Magnify</Text>
                </View>
                <View style={{alignContent: 'center', justifyContent:'center'}}>

                <View style = {{padding:10}}>
                      <TextInput
                        label={"Username"}
                        color='white'
                        style={styles.textInputStyle}
                        placeholder="Username"
                        alignSelf= 'center'
                        onChangeText={text => {
                          setError
                          setUsername(text)
                        }}
                        error={isValid}
                      />
                  </View>

                 
                 
                  <View style = {{padding:10}}>
                      <TextInput
                        label={"Email"}
                        color='white'
                        keyboardType="email-address"
                        style={styles.textInputStyle}
                        placeholder="Mail address"
                        alignSelf= 'center'
                        onChangeText={text => {
                          setError
                          setEmail(text)
                        }}
                        error={isValid}
                      />
                  </View>

                  <View style = {{padding:10}}>
                      <TextInput
                        label={"Password"}
                        secureTextEntry
                        
                  
                        style={styles.textInputStyle}
                        placeholder="Password"
                        alignSelf= 'center'
                        error={isValid}
                        onChangeText={text => setPassword(text)}
                    />
                  </View>
                  <TouchableOpacity onPress={__doSignUp} style={styles.buttonContainer}>
                    <Text style = {{color:'white'}}>Confirm</Text>  
                  </TouchableOpacity> 
          </View>
                </Modal>
              </Portal>

    </SafeAreaView>
 

      <View style={{alignSelf:'center', paddingTop: 20}}>
              <TouchableOpacity onPress={__doSingIn} style={styles.buttonContainer}>
                <Text style = {{color: 'white'}}>Log in</Text>  
              </TouchableOpacity>              
            
              <TouchableOpacity onPress={showSignup} style={styles.buttonContainer}>
                <Text style = {{color: 'white'}}>Sign Up</Text>  
              </TouchableOpacity> 

              <TouchableHighlight onPress={anonymousAuth} style = {{alignSelf:'center'}}>
                <Text style = {{color: 'white', textDecorationLine:'underline'}}>Try the App in anonymous mode</Text>
              </TouchableHighlight>

              </View>

      </View>
      </Provider>);
     
    
  }

  if (user) {
    return (
      <NavigationContainer style={{backgroundColor:generalStyles.background}}>
      {user && <MyDrawer user = {user}/>}
    </NavigationContainer>
    );
  }

  // render(){
  //   return (
  //     <NavigationContainer>
  //       <MyDrawer />
  //     </NavigationContainer>
  //   );
  // }

}


const styles = StyleSheet.create({
  header:{
    backgroundColor: generalStyles.mainColor,
    height:100,
    flexDirection: 'row',
    justifyContent: 'flex-end'
    
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    marginLeft:50,
    alignSelf:'flex-start',
    position: 'absolute',
    marginTop:50
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingLeft:30,
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: generalStyles.mainColor,
  },

  containerStyle: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle:
  {
    color: "black",
    backgroundColor:"white",
    width: 200,
    height: 40,
    borderRadius: 40,

    alignContent:'center',
    justifyContent:'center'
  }
});




export default App;