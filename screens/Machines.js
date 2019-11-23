
import React from 'react'
import { Select, Option } from "react-native-chooser";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, TextInput } from 'react-native'
import { Searchbar } from 'react-native-paper';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class Machines extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstQuery: '',            
        };
    }
    onSelect(value, label) {
        this.setState({ value: value });
    }

    goToMachinesCancel = () => this.props.navigation.navigate('Home');
    goToMachinesDone = () => this.props.navigation.navigate('Home');
    goToHome = () => this.props.navigation.navigate('Home');
    goToEmployees = () => this.props.navigation.navigate('Employees');
    goToStock = () => this.props.navigation.navigate('Stock');
    goToReportTab = () => this.props.navigation.navigate('ReportTab');
    render() {
        const { firstQuery } = this.state;
        return (

            
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <TouchableOpacity
                        style={{ width: 0.2 * screenWidth, marginRight: 0.55 * screenWidth }}
                        onPress={this.goToMachinesCancel}
                    >
                        <Text style={{ fontSize: 18, color: '#2684ff' }}> Cancel </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 0.15 * screenWidth }}
                        onPress={this.goToMachinesDone}
                    >
                        <Text style={{ fontSize: 18, color: '#2684ff' }}> Done </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: -0.4 * screenWidth, }}>
                    <Text style={styles.font2}>Manage Machines</Text>
                </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    value={firstQuery}
                    style={{ width: 0.8 * screenWidth, backgroundColor: '#f6f6f6', borderRadius: 8, marginTop: 10 }}
                />
                <View style={styles.card}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:screenHeight/15, position:'absolute', bottom: screenHeight*0.52 }}>                    
                            <TextInput
                                style={styles.input}
                                name='location'
                                // value={password}
                                placeholder='Location'
                                autoCapitalize='none'                                
                            />                        
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            style={styles.button2}
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
                            style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 6, borderRadius: 20, marginTop: 10, height: 32 }}
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
        marginTop: 30,
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
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
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    font2: {
        fontSize: 26,
        color: 'black',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button2: {
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        padding: 6,
        borderRadius: 20,
        marginTop: 10,
        height: 32,
    },
    input: {
        height: screenHeight / 20,
        width: screenWidth * 0.6,
        borderColor: '#cfcfcf',
        borderWidth: 2,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
    }
})


