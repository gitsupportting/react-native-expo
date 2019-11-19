
import React from 'react'
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
          <Image
            style={{ width: screenWidth * 0.9, height: screenHeight * 0.3 }}
            source={require('../assets/icon.png')}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <Text style={styles.font2}>Company Name</Text>
          </View>
          <Text style={styles.font2}>Company Admin: First Name Last</Text>
          <View>
            <Text style={styles.font1}>Company Details</Text>
          </View>
          <TouchableOpacity
            style={styles.button1}
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  font2: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    width: screenWidth * 0.89,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },

  button1: {
    alignItems: 'center',
    backgroundColor: '#dbdbdb',
    padding: 5,
    borderRadius: 5,
    width: screenWidth * 0.6,
    marginTop: 10,
  },
})


