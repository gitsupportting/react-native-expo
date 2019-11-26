
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import 'firebase/firestore';
import { Firebase, db } from '../Firebase';

import { StyleSheet, View, TextInput, Image, Dimensions, Text, Button, TouchableOpacity } from 'react-native'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companyLogo: null,
      companyName: '',
      companyAddress: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPass: '',
    };
  }
  handlecompanyNameChange = companyName => {
    this.setState({ companyName })
  }
  handlecompanyAddressChange = companyAddress => {
    this.setState({ companyAddress })
  }
  handlefirstNameChange = firstName => {
    this.setState({ firstName })
  }
  handlelastNameChange = lastName => {
    this.setState({ lastName })
  }
  handleemailChange = email => {
    this.setState({ email })
  }
  handlephoneChange = phone => {
    this.setState({ phone })
  }
  handleusernameChange = username => {
    this.setState({ username })
  }
  handlepasswordChange = password => {
    this.setState({ password })
  }
  handleconfirmPassChange = confirmPass => {
    this.setState({ confirmPass })
  }
  goToLogin = async() => {
    this.setState({
      companyLogo: null,
      companyName: '',
      companyAddress: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPass: '',
      buttonVisable: false,
    })
    this.props.navigation.navigate('Login')
    // setTimeout(() => this.props.navigation.navigate('Login'),10);
  }

  goToLoginAfterSignup = async () => {
    const { companyName, companyAddress, firstName, lastName, email, phone, username, password, confirmPass, companyLogo } = this.state
    try {
      if ((password == confirmPass) && (companyLogo != null) && username.length > 0 && password.length > 0 && companyName.length > 0 && companyAddress.length > 0 && firstName.length > 0, lastName.length > 0 && email.length > 0 && phone.length) {
        Firebase.auth().createUserWithEmailAndPassword(email, password).then(({ user }) => {
          try {
            db.collection("users").add({
              email: user.email,
              uid: user.uid,
              companyName: companyName,
              companyAddress: companyAddress,
              firstName: firstName,
              lastName: lastName,
              username: username,
              password: password,
              companyLogo: companyLogo
            })
          } catch (errorr) {
            alert(errorr);
          }

          this.props.navigation.navigate('Login');
        }).catch(err => {
          alert(err.code + " " + err.message)
        })
      } else {
        alert("Please insert required data")
      }
    } catch (error) {
      alert(error);
    }
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    this.setState({
      buttonVisable: true
    })
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // console.log(result.base64);

    if (!result.cancelled) {
      this.setState({ companyLogo: 'data:image/gif;base64,'+result.base64 });
    }
    
  };
  
  render() {
    let { companyLogo } = this.state;
    const { companyName, companyAddress, firstName, lastName, email, phone, username, password, confirmPass } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 0, marginTop: 10 }}>
            <Text style={styles.font2}>Welcome To Kablanit</Text>
          </View>
          <View style={{ marginLeft: -screenWidth * 0.5 }}>
            <Text style={styles.font1}>Company Details</Text>
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='companyName'
              value={companyName}
              placeholder='Company Name'
              autoCapitalize='none'
              onChangeText={this.handlecompanyNameChange}
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='companyAddress'
              value={companyAddress}
              placeholder='Company Address'
              autoCapitalize='none'
              onChangeText={this.handlecompanyAddressChange}
            />
          </View>
          {/* <Ionicons name="ios-contact" size={screenHeight * 0.1} color="black" /> */}

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {!this.state.buttonVisable &&
              <TouchableOpacity
                style={styles.button3}
                onPress={this._pickImage}
              >
                <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.05} color="#2684ff" />
                <Text style={{ fontSize: 22, color: '#2684ff', fontWeight: 'bold' }}> Company Logo </Text>
              </TouchableOpacity>
            }
            {companyLogo &&
              <TouchableOpacity
                style={styles.button3}
                onPress={this._pickImage}
              >
                <Image source={{ uri:companyLogo }} style={{ width: screenWidth * 0.5, height: screenHeight * 0.12 }} />
              </TouchableOpacity>}
          </View>
          <View style={{ marginLeft: -screenWidth * 0.4 }}>
            <Text style={styles.font1}>Company Admin Details</Text>
          </View>
          <View style={{ margin: 5, flexDirection: 'row' }}>
            <TextInput
              style={styles.input1}
              name='firstName'
              value={firstName}
              placeholder='First Name'
              autoCapitalize='none'
              onChangeText={this.handlefirstNameChange}
            />
            <TextInput
              style={styles.input2}
              name='lastName'
              value={lastName}
              placeholder='Last Name'
              autoCapitalize='none'
              onChangeText={this.handlelastNameChange}
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='email'
              value={email}
              placeholder='Email'
              autoCapitalize='none'
              onChangeText={this.handleemailChange}
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='phone'
              value={phone}
              placeholder='Phone'
              autoCapitalize='none'
              onChangeText={this.handlephoneChange}
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='username'
              value={username}
              placeholder='UserName'
              autoCapitalize='none'
              onChangeText={this.handleusernameChange}
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='password'
              value={password}
              placeholder='Pass'
              autoCapitalize='none'
              secureTextEntry
              onChangeText={this.handlepasswordChange}
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='confirmPass'
              value={confirmPass}
              placeholder='Confirm Pass'
              autoCapitalize='none'
              secureTextEntry
              onChangeText={this.handleconfirmPassChange}
            />
          </View>
          <TouchableOpacity
            style={styles.button1}
            onPress={this.goToLoginAfterSignup}
          >
            <Text style={{ fontSize: 16, color: 'white' }}> Sign Up </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={this.goToLogin}
          >
            <Text style={{ fontSize: 16, color: 'white' }}> Cancel </Text>
          </TouchableOpacity>
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
    marginTop: 20,
    backgroundColor: '#f6f6f6',
    width: screenWidth * 0.9,
    height: screenHeight * 0.93,
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
    fontSize: 18,
    color: 'blue',
  },
  input: {
    height: screenHeight / 22,
    width: screenWidth * 0.6,
    borderColor: '#cfcfcf',
    borderWidth: 2,
    paddingLeft: 10,
    backgroundColor: 'white'
  },
  input1: {
    height: screenHeight / 22,
    width: screenWidth * 0.28,
    borderColor: '#cfcfcf',
    borderWidth: 2,
    paddingLeft: 10,
    backgroundColor: 'white'
  },
  input2: {
    height: screenHeight / 22,
    width: screenWidth * 0.28,
    borderColor: '#cfcfcf',
    borderWidth: 2,
    paddingLeft: 10,
    backgroundColor: 'white',
    marginLeft: screenWidth * 0.04,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#2684ff',
    padding: 5,
    borderRadius: 5,
    width: screenWidth * 0.6,
    marginTop: 5,
    marginBottom: 5,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#dbdbdb',
    padding: 5,
    borderRadius: 5,
    width: screenWidth * 0.6,
    marginTop: 5,
    marginBottom: 5,
  },
  button3: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    width: screenWidth * 0.5,
    height: screenHeight * 0.12,
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
})


