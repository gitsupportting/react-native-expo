

import React from 'react'
import { Select, Option } from "react-native-chooser";
import CheckboxFormX from 'react-native-checkbox-form';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, TextInput, Image, CheckBox, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const selectall = [
    {
        label: 'Has Port Access',
        value: 'one'
    },
];

export default class StockAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxChecked: [],
            stockImage: null,
            sLicenseImage: null,
            sInsuranceImage: null,
            sAccessImage: null,
            typeValue: "Type",
            driverValue: "Driver",
        };
    }
    _onSelect = (item) => {
        console.log(item);
    };
    onTypeSelect(value, label) {
        this.setState({ typeValue: value });
    }

    onDriverSelect(value, label) {
        this.setState({ driverValue: value });
    }

    goToStockAdded = () => this.props.navigation.navigate('Stock');
    goToStockCancel = () => this.props.navigation.navigate('Stock');
    goToHome = () => this.props.navigation.navigate('Home');
    goToEmployees = () => this.props.navigation.navigate('Employees');
    goToStock = () => this.props.navigation.navigate('Stock');
    goToReportTab = () => this.props.navigation.navigate('ReportTab');
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

    _pickStockImage = async () => {
        this.setState({
            buttonVisableStock: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ stockImage: result.uri });
        }
    };
    _pickSLicenseImage = async () => {
        this.setState({
            buttonVisableSLicense: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ sLicenseImage: result.uri });
        }
    };
    _pickSInsuranceImage = async () => {
        this.setState({
            buttonVisableSInsurance: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ sInsuranceImage: result.uri });
        }
    };
    _pickSAccessImage = async () => {
        this.setState({
            buttonVisableSAccess: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ sAccessImage: result.uri });
        }
    };
    render() {
        let { stockImage } = this.state;
        let { sLicenseImage } = this.state;
        let { sInsuranceImage } = this.state;
        let { sAccessImage } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.card1}>
                        <Text style={styles.font2}>Stock details</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisableStock &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickStockImage}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> Stock Pic </Text>
                                </TouchableOpacity>
                            }
                            {stockImage &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickStockImage}
                                >
                                    <Image source={{ uri: stockImage }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='name'
                                // value={password}
                                placeholder='Name'
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenHeight / 80, marginBottom: screenHeight / 80, }}>
                            <Select
                                onTypeSelect={this.onTypeSelect.bind(this)}
                                defaultText={this.state.typeValue}
                                style={{ borderWidth: 1, borderColor: "#cfcfcf", backgroundColor: 'white', height: screenHeight / 20, paddingTop: 6, width: screenWidth * 0.6, }}
                                textStyle={{ color: '#cfcfcf' }}
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
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='serialNumber'
                                // value={password}
                                placeholder='Serial Number'
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='licenseNumber'
                                // value={password}
                                placeholder='License Number'
                                autoCapitalize='none'
                            />
                        </View>
                        <DatePicker
                            style={{
                                marginBottom: screenHeight / 80,
                            }}
                            date={this.state.licenseDate}
                            mode="date"
                            placeholder="License Expiration Date"
                            format="YYYY-MM-DD"
                            minDate="1950-05-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: screenWidth * 0.4,
                                    top: screenHeight/100,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    alignItems: 'flex-start',
                                    height: screenHeight / 20,
                                    width: screenWidth * 0.6,
                                    borderColor: '#cfcfcf',
                                    borderWidth: 2,
                                    paddingLeft: 10,
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: 5,
                                    // left: -screenWidth / 8,

                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ licenseDate: date }) }}
                        />
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisableSLicense &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickSLicenseImage}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> License Pic </Text>
                                </TouchableOpacity>
                            }
                            {sLicenseImage &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickSLicenseImage}
                                >
                                    <Image source={{ uri: sLicenseImage }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='insuranceNumber'
                                // value={password}
                                placeholder='Insurance Number'
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisableSInsurance &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickSInsuranceImage}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> License Pic </Text>
                                </TouchableOpacity>
                            }
                            {sInsuranceImage &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickSInsuranceImage}
                                >
                                    <Image source={{ uri: sInsuranceImage }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <DatePicker
                            style={{
                                marginBottom: screenHeight / 80
                            }}
                            date={this.state.insuranceDate}
                            mode="date"
                            placeholder="Expiration Date"
                            format="YYYY-MM-DD"
                            minDate="1950-05-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: screenWidth * 0.4,
                                    top: screenHeight/100,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    alignItems: 'flex-start',
                                    height: screenHeight / 20,
                                    width: screenWidth * 0.6,
                                    borderColor: '#cfcfcf',
                                    borderWidth: 2,
                                    paddingLeft: 10,
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: 5,
                                    // left: -screenWidth / 8,

                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ insuranceDate: date }) }}                       />


                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft:30 }}>
                            <CheckboxFormX
                                style={{ width: 30 }}
                                dataSource={selectall}
                                itemShowKey="label"
                                itemCheckedKey="RNchecked"
                                iconSize={30}
                                formHorizontal={true}
                                labelHorizontal={true}
                                onChecked={(item) => this._onSelect(item)}
                            />
                            {/* <Text style={{ fontSize: 14, color: '#3c3c3c', marginTop: screenHeight / 100 }}> Has Port Access </Text> */}
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='portAccessNumber'
                                // value={password}
                                placeholder='Port Access Number'
                                autoCapitalize='none'
                            />
                        </View>
                        <DatePicker
                            style={{
                                marginBottom: screenHeight / 80
                            }}
                            date={this.state.accessDate}
                            mode="date"
                            placeholder="Access Expiration Date"
                            format="YYYY-MM-DD"
                            minDate="1950-05-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: screenWidth * 0.4,
                                    top: screenHeight/100,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    alignItems: 'flex-start',
                                    height: screenHeight / 20,
                                    width: screenWidth * 0.6,
                                    borderColor: '#cfcfcf',
                                    borderWidth: 2,
                                    paddingLeft: 10,
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: 5,
                                    // left: -screenWidth / 8,

                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ accessDate: date }) }}
                        />

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisableSAccess &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickSAccessImage}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> Access Pic </Text>
                                </TouchableOpacity>
                            }
                            {sAccessImage &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickSAccessImage}
                                >
                                    <Image source={{ uri: sAccessImage }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenHeight / 80, marginRight: screenHeight / 80, }}>
                            <Select
                                onDriverSelect={this.onDriverSelect.bind(this)}
                                defaultText={this.state.driverValue}
                                style={{ borderWidth: 1, borderColor: "#cfcfcf", backgroundColor: 'white', height: screenHeight / 20, paddingTop: 6, width: screenWidth * 0.6 }}
                                textStyle={{ color: '#cfcfcf' }}
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
                                style={{ width: 0.2 * screenWidth, marginRight: screenWidth * 0.3 }}
                                onPress={this.goToStockCancel}
                            >
                                <Text style={{ fontSize: 18, color: '#2684ff', }}> Cancel </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ width: 0.25 * screenWidth }}
                                onPress={this.goToStockAdded}
                            >
                                <Text style={{ fontSize: 18, color: '#2684ff' }}> Add Stock </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.card2}>
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
        padding: 6,
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
        bottom: 20,
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


