import React from 'react'
import { StyleSheet, View, Button, TextInput, Image, Dimensions, Text } from 'react-native'
import { gray } from 'ansi-colors'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function Separator() {
  return <View style={styles.separator} />;
}
export default class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleusernameChange = username => {
    this.setState({ username })
  }

  handlePasswordChange = password => {
    this.setState({ password })
  }

  onLogin = async () => {
    const { username, password } = this.state
    try {
      if (username.length > 0 && password.length > 0) {
        this.props.navigation.navigate('App')
      }
    } catch (error) {
      alert(error)
    }
  }

  goToSignup = () => this.props.navigation.navigate('Signup')
  render() {
    const { username, password } = this.state

    return (
      <View style={styles.container}>
        <Image
          style={{ width: screenWidth * 0.8, height: 100 }}
          source={require('../assets/icon.png')}
        />
        <View style={styles.card}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom:20 }}>
            <Text style={styles.font1}>Welcome To Kablanit</Text>
            <Text style={styles.font1}>Sign in with your Company Admin</Text>
            <Text style={styles.font1}>User Name</Text>
            <Text style={styles.font2}>New Company?</Text>
            <Text style={styles.font2}>Sign Up Below</Text>
          </View>
          <View style={{ margin: 10 }}>
            <TextInput
              style={styles.input}
              name='username'
              value={username}
              placeholder='UserName'
              autoCapitalize='none'
              onChangeText={this.handleusernameChange}
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
          <Separator />
          <Button title='Login' onPress={this.onLogin} />
          <Button title='Go to Signup' onPress={this.goToSignup} />
        </View>
      </View>
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
    height: screenHeight * 0.65,
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
    width:screenWidth*0.6,
    borderColor: '#cfcfcf',
    borderWidth: 2,
    paddingLeft:15,
    backgroundColor: 'white'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})
