

import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native'
import { Searchbar } from 'react-native-paper';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class EmployeesAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstQuery: ''
        };
    }
    goToEmployeesAdd = () => this.props.navigation.navigate('EmployeesAdd');
    goToEmployeesEdit = () => this.props.navigation.navigate('EmployeesAdd');

    render() {
        const { firstQuery } = this.state;
        return (

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <TouchableOpacity
                        style={{ width: 0.15 * screenWidth }}
                        onPress={this.goToEmployeesAdd}
                    >
                    <Ionicons name="md-add" size={screenHeight * 0.04} color="#2684ff" />
                    </TouchableOpacity>
                    <Text style={styles.font2}>Employees</Text>
                    <TouchableOpacity
                        style={{ width: 0.15 * screenWidth }}
                        onPress={this.goToEmployeesEdit}
                    >
                        <Text style={{ fontSize: 20, color: '#2684ff', }}> Edit </Text>
                    </TouchableOpacity>
                </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    value={firstQuery}
                    style={{ width: 0.9 * screenWidth, backgroundColor: '#f6f6f6', borderRadius: 8, marginTop: 20 }}
                />
                <View style={styles.card}>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToMachines}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Company Details </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 8, borderRadius: 20, marginTop: 10, height: 36 }}
                            onPress={this.goToMachines}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Employees </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToMachines}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Stock </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToMachines}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Reports </Text>
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
        marginTop: 30,
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 0.73,
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
        alignItems: 'center',
        fontWeight: 'bold'
    },
    font2: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        width: screenWidth * 0.5,
        marginRight: screenWidth * 0.05,
        marginLeft: screenWidth * 0.05,
        marginTop: 0,
        fontWeight: 'bold'
    },
    button2: {
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        padding: 8,
        borderRadius: 20,
        marginTop: 10,
        height: 36,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: screenHeight / 30,
    }
})


