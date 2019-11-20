
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { StyleSheet, View, TextInput, Image, Dimensions, Text, Button, TouchableOpacity } from 'react-native'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class Signup extends React.Component {
  goToLogin = () => this.props.navigation.navigate('Login');
  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  state = {
    image: null,
  };
  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
            <Text style={styles.font2}>Welcome To Kablanit</Text>
          </View>
          <View style={{ marginLeft: -screenWidth * 0.5 }}>
            <Text style={styles.font1}>Company Details</Text>
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='companyName'
              // value={username}
              placeholder='Company Name'
              autoCapitalize='none'
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='companyAddress'
              // value={password}
              placeholder='Company Address'
              autoCapitalize='none'
            />
          </View>
          <Ionicons name="ios-contact" size={screenHeight * 0.1} color="black" />
          <View style={{ marginLeft: -screenWidth * 0.4 }}>
            <Text style={styles.font1}>Company Admin Details</Text>
          </View>
          <View style={{ margin: 5, flexDirection:'row' }}>
            <TextInput
              style={styles.input1}
              name='firstName'
              // value={username}
              placeholder='First Name'
              autoCapitalize='none'
            />
            <TextInput
              style={styles.input2}
              name='lastName'
              // value={username}
              placeholder='Last Name'
              autoCapitalize='none'
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='email'
              // value={password}
              placeholder='Email'
              autoCapitalize='none'
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='phone'
              // value={username}
              placeholder='Phone'
              autoCapitalize='none'
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='userName'
              // value={password}
              placeholder='UserName'
              autoCapitalize='none'
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='Pass'
              // value={username}
              placeholder='Pass'
              autoCapitalize='none'
            />
          </View>
          <View style={{ margin: 5 }}>
            <TextInput
              style={styles.input}
              name='confirmPass'
              // value={password}
              placeholder='Confirm Pass'
              autoCapitalize='none'
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.button1}
            onPress={this.goToLogin}
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
    marginTop: 30,
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
    marginLeft: screenWidth*0.04,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#2684ff',
    padding: 5,
    borderRadius: 5,
    width: screenWidth * 0.6,
    marginTop: 10,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#dbdbdb',
    padding: 5,
    borderRadius: 5,
    width: screenWidth * 0.6,
    marginTop: 10,
  },
})


