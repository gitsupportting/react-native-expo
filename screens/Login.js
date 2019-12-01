import React from 'react'
import { StyleSheet, View, TextInput, Image, Dimensions, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { db, Firebase } from '../Firebase';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleemailChange = email => {
    this.setState({ email })
  }

  handlePasswordChange = password => {
    this.setState({ password })
  }

  onLogin = async () => {
    const { email, password } = this.state
    try {
      if (email.length > 0 && password.length > 0) {
        Firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
          this.props.navigation.navigate('App')
        }).catch(err => {
          alert(err)
        })
      } else {
        alert("Please insert required data")
      }
    }
    catch (error) {
      alert(error)
    }
  }

  goToSignup = () => this.props.navigation.navigate('Signup')
  render() {
    const { email, password } = this.state

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        {/* <View style={styles.container}> */}
        <Image
          style={{ width: screenWidth * 0.8, height: screenHeight / 6 }}
          source={require('../assets/icon.png')}
        />
        <View style={styles.card}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Text style={styles.font1}>Welcome To Kablanit</Text>
            <Text style={styles.font1}>Sign in with your Company Admin</Text>
            <Text style={styles.font1}>User Name</Text>
            <Text style={styles.font2}>New Company?</Text>
            <Text style={styles.font2}>Sign Up Below</Text>
          </View>

          <View style={{ margin: 10 }}>

            <TextInput
              style={styles.input}
              name='email'
              value={email}
              placeholder='Email'
              autoCapitalize='none'
              onChangeText={this.handleemailChange}
            />
          </View>
          <View style={{ margin: 10 }}>
            <TextInput
              style={styles.input}
              name='password'
              value={password}
              placeholder='Password'
              secureTextEntry
              onChangeText={this.handlePasswordChange}
            />
          </View>
          <TouchableOpacity
            style={styles.button1}
            onPress={this.onLogin}
          >
            <Text style={{ fontSize: 18, color: 'white' }}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={this.goToSignup}
          >
            <Text style={{ fontSize: 18, color: 'white' }}> Go to Signup </Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    marginTop: 30,
    backgroundColor: '#f6f6f6',
    width: screenWidth * 0.8,
    // height: screenHeight * 0.65,
    height: screenHeight * 0.7,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  font1: {
    fontSize: 14,
    color: '#3c3c3c',
    marginTop: 7,
    marginBottom: 7,
  },
  font2: {
    fontSize: 12,
    color: '#636363',
    marginTop: 2,
    marginBottom: 2,
  },
  input: {
    height: 40,
    width: screenWidth * 0.6,
    borderColor: '#cfcfcf',
    borderWidth: 2,
    paddingLeft: 15,
    backgroundColor: 'white'
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#2684ff',
    padding: 8,
    borderRadius: 5,
    width: screenWidth * 0.7,
    marginTop: 20,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#dbdbdb',
    padding: 8,
    borderRadius: 5,
    width: screenWidth * 0.7,
    marginTop: 20,
  },
})
