
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class Signup extends React.Component {
  goToReportWorking = () => this.props.navigation.navigate('ReportWorking');
  goToVehicles = () => this.props.navigation.navigate('Vehicles');
  goToMachines = () => this.props.navigation.navigate('Machines');
  goToHome = () => this.props.navigation.navigate('Home');
  goToEmployees = () => this.props.navigation.navigate('Employees');
  goToStock = () => this.props.navigation.navigate('Stock');
  goToReportTab = () => this.props.navigation.navigate('ReportTab');

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Ionicons name="ios-contact" size={screenHeight * 0.25} color="black" />
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <Text style={styles.font2}>Company Name</Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <Text style={styles.font2}>Company Admin: First Name Last</Text>
          </View>
          <View
            style={{
              borderBottomColor: '#E3E2E2',
              borderBottomWidth: 1,
              width: screenWidth * 0.8,
              marginBottom: 15,
              marginTop: 0,
            }}
          />
          <View>
            <Text style={styles.font1}>Company Employees: Number of Employees</Text>
          </View>
          <TouchableOpacity
            style={styles.button1}
            onPress={this.goToReportWorking}
          >
            <Text style={{ fontSize: 14, color: 'white' }}> Manage Employees </Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: '#E3E2E2',
              borderBottomWidth: 1,
              width: screenWidth * 0.8,
              marginBottom: 10,
              marginTop: 20,
            }}
          />
          <Text style={styles.font1}>Company Equipments: Number of Equipments</Text>
          <Text style={styles.font3}>{'\u25CF'} Vehicles: number of Vehicles</Text>
          <TouchableOpacity
            style={styles.button1}
            onPress={this.goToVehicles}
          >
            <Text style={{ fontSize: 14, color: 'white' }}> Manage Vehicles </Text>
          </TouchableOpacity>
          <Text style={styles.font3}>{'\u25CF'} Vehicles: number of Vehicles</Text>
          <TouchableOpacity
            style={styles.button1}
            onPress={this.goToMachines}
          >
            <Text style={{ fontSize: 14, color: 'white' }}> Manage Machines </Text>
          </TouchableOpacity>
        </View>


        <View style={styles.card1}>
          <View style={styles.bottom}>
            <TouchableOpacity
              style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 6, borderRadius: 20, marginTop: 10, height: 32 }}
              onPress={this.goToHome}
            >
              <Text style={{ fontSize: 13, color: '#3c3c3c' }}> Company Details </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={this.goToEmployees}
            >
              <Text style={{ fontSize: 13, color: '#3c3c3c' }}> Employees </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={this.goToStock}
            >
              <Text style={{ fontSize: 13, color: '#3c3c3c' }}> Stock </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={this.goToReportTab}
            >
              <Text style={{ fontSize: 13, color: '#3c3c3c' }}> Reports </Text>
            </TouchableOpacity>
          </View>

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
    marginTop: 25,
    backgroundColor: '#f6f6f6',
    width: screenWidth * 0.9,
    height: screenHeight * 0.85,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card1: {
    backgroundColor: '#f6f6f6',
    width: screenWidth * 0.9,
    height: screenHeight * 0.08,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  font1: {
    fontSize: 14,
    color: '#3c3c3c',
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  font2: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    width: screenWidth * 0.89,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold'

  },
  font3: {
    fontSize: 12,
    color: '#3c3c3c',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: -screenWidth * 0.3,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#413C3A',
    padding: 8,
    borderRadius: 3,
    width: screenWidth * 0.6,
    marginTop: 10,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
}
})


