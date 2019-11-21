

import React from 'react'
import { Select, Option } from "react-native-chooser";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, TextInput, Image, CheckBox, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxChecked: [],
            date: "2016-05-15",
            image: null,
            value: "Driver"
        };
    }
    onSelect(value, label) {
        this.setState({ value: value });
    }

    goToStockAdded = () => this.props.navigation.navigate('Employees');
    goToStockCancel = () => this.props.navigation.navigate('Employees');
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
        this.setState({
            buttonVisable: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
    goToEmployeesAdded = () => this.props.navigation.navigate('Employees');
    goToEmployeesCancel = () => this.props.navigation.navigate('Employees');
    render() {
        let { image } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.card1}>
                        <Text style={styles.font2}>Item details</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisable &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImage}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> Pic </Text>
                                </TouchableOpacity>
                            }
                            {image &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImage}
                                >
                                    <Image source={{ uri: image }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='name'
                                // value={password}
                                placeholder='Name'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenHeight / 80, marginBottom: screenHeight / 80, }}>
                            <Select
                                onSelect={this.onSelect.bind(this)}
                                defaultText={this.state.value}
                                style={{ borderWidth: 1, borderColor: "#293137", height: screenHeight / 20, paddingTop: 6, width: screenWidth * 0.6, }}
                                textStyle={{}}
                                backdropStyle={{ backgroundColor: "white" }}
                                optionListStyle={{ backgroundColor: "#f6f6f6", height: screenHeight * 0.5 }}
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
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='currentLocation'
                                // value={password}
                                placeholder='Current Location'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='serialNumber'
                                // value={password}
                                placeholder='Serial Number'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='licenseNumber'
                                // value={password}
                                placeholder='License Number'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <DatePicker
                            style={{
                                // height: screenHeight / 20,
                                // width: screenWidth * 0.6,
                                // borderColor: '#cfcfcf',
                                // borderWidth: 2,
                                // paddingLeft: 10,
                                // backgroundColor: 'white'
                                marginBottom: screenHeight / 80
                            }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: screenWidth * 0.4,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    height: screenHeight / 20,
                                    width: screenWidth * 0.6,
                                    borderColor: '#cfcfcf',
                                    borderWidth: 2,
                                    paddingLeft: 10,
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: 5,
                                    left: -screenWidth / 8,
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisable &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImage}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> License Pic </Text>
                                </TouchableOpacity>
                            }
                            {image &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImage}
                                >
                                    <Image source={{ uri: image }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='insuranceNumber'
                                // value={password}
                                placeholder='Insurance Number'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisable &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImage}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> License Pic </Text>
                                </TouchableOpacity>
                            }
                            {image &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImage}
                                >
                                    <Image source={{ uri: image }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <DatePicker
                            style={{
                                // height: screenHeight / 20,
                                // width: screenWidth * 0.6,
                                // borderColor: '#cfcfcf',
                                // borderWidth: 2,
                                // paddingLeft: 10,
                                // backgroundColor: 'white'
                                marginBottom: screenHeight / 80
                            }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: screenWidth * 0.4,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    height: screenHeight / 20,
                                    width: screenWidth * 0.6,
                                    borderColor: '#cfcfcf',
                                    borderWidth: 2,
                                    paddingLeft: 10,
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: 5,
                                    left: -screenWidth / 8,

                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />


                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginRight: 0.3 * screenWidth }}>
                            <CheckBox
                                value={this.state.checked1}
                                styles={{ size: 10 }}
                                onValueChange={() => this.setState({ checked1: !this.state.checked1 })}
                            />
                            <Text style={{ fontSize: 14, color: '#3c3c3c', marginTop: screenHeight / 100 }}> Has Port Access </Text>
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='portAccessNumber'
                                // value={password}
                                placeholder='Port Access Number'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <DatePicker
                            style={{
                                // height: screenHeight / 20,
                                // width: screenWidth * 0.6,
                                // borderColor: '#cfcfcf',
                                // borderWidth: 2,
                                // paddingLeft: 10,
                                // backgroundColor: 'white'
                                marginBottom: screenHeight / 80
                            }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: screenWidth * 0.4,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    height: screenHeight / 20,
                                    width: screenWidth * 0.6,
                                    borderColor: '#cfcfcf',
                                    borderWidth: 2,
                                    paddingLeft: 10,
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: 5,
                                    left: -screenWidth / 8,
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisable &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImage}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> Access Pic </Text>
                                </TouchableOpacity>
                            }
                            {image &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImage}
                                >
                                    <Image source={{ uri: image }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenHeight / 80, marginRight: screenHeight / 80, }}>
                            <Select
                                onSelect={this.onSelect.bind(this)}
                                defaultText={this.state.value}
                                style={{ borderWidth: 1, borderColor: "#293137", height: screenHeight / 20, paddingTop: 6, width: screenWidth * 0.6 }}
                                textStyle={{}}
                                backdropStyle={{ backgroundColor: "white" }}
                                optionListStyle={{ backgroundColor: "#f6f6f6", height: screenHeight * 0.5 }}
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
                        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ width: 0.2 * screenWidth }}
                                onPress={this.goToStockCancel}
                            >
                                <Text style={{ fontSize: 18, color: '#2684ff', }}> Cancel </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ width: 0.35 * screenWidth }}
                                onPress={this.goToStockAdded}
                            >
                                <Text style={{ fontSize: 18, color: '#2684ff' }}> Add Employees </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.card2}>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToMachines}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Company Details </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToMachines}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Employees </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 6, borderRadius: 20, marginTop: 10, height: 32 }}
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
    card1: {
        marginTop: 20,
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 1.65,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card2: {
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 0.06,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
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
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    button2: {
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        padding: 7,
        borderRadius: 20,
        marginTop: 10,
        height: 32,
    },
    button3: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 5,
        margin: 10,
        borderRadius: 5,
        width: screenWidth * 0.4,
        height: screenHeight * 0.12,
        textAlign: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
    },
    input: {
        height: screenHeight / 20,
        width: screenWidth * 0.6,
        borderColor: '#cfcfcf',
        borderWidth: 2,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
})


