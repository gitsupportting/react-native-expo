
import React from 'react'
import { Select, Option } from "react-native-chooser";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native'
import { Searchbar } from 'react-native-paper';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class Vehicles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstQuery: '',
            value: "Driver"
        };
    }
    onSelect(value, label) {
        this.setState({ value: value });
    }

    goToVehiclesCancel = () => this.props.navigation.navigate('Home');
    goToVehiclesDone = () => this.props.navigation.navigate('Home');
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
                        onPress={this.goToVehiclesCancel}
                    >
                        <Text style={{ fontSize: 18, color: '#2684ff' }}> Cancel </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 0.15 * screenWidth }}
                        onPress={this.goToVehiclesDone}
                    >
                        <Text style={{ fontSize: 18, color: '#2684ff' }}> Done </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: -0.4 * screenWidth, }}>
                    <Text style={styles.font2}>Manage Vehicles</Text>
                </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    value={firstQuery}
                    style={{ width: 0.8 * screenWidth, backgroundColor: '#f6f6f6', borderRadius: 8, marginTop: 10 }}
                />
                <View style={styles.card}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:screenHeight/15, position:'absolute', bottom: screenHeight*0.52 }}>
                        <Select
                            onSelect={this.onSelect.bind(this)}
                            defaultText={this.state.value}
                            style={{ borderWidth: 1, borderColor: "#cfcfcf",backgroundColor:'white',}}
                            textStyle={{color:'#cfcfcf'}}
                            backdropStyle={{ backgroundColor: "white" }}
                            optionListStyle={{ backgroundColor: "#f6f6f6", height:screenHeight*0.5 }}
                        >
                            <Option value={{ name: "azhar" }}>Azhar</Option>
                            <Option value="johnceena">Johnceena</Option>
                            <Option value="undertaker">Undertaker</Option>
                            <Option value="Daniel">Daniel</Option>
                            <Option value="Roman">Roman</Option>
                            <Option value="Stonecold">Stonecold</Option>
                            <Option value="Rock">Rock</Option>
                            <Option value="Sheild">Sheild</Option>
                            <Option value="Orton">Orton</Option>

                        </Select>
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
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
    }
})


