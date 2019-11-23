

import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import CheckboxFormX from 'react-native-checkbox-form';
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
const selectone = [
    {
        label: '',
        value: 'one'
    },
];
export default class EmployeesAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxChecked: [],
            profileImage: null,
            idImage: null,
            licenseImage: null,
            accessImage: null,
        };
    }
    _onSelect = (item) => {
        console.log(item);
    };
    goToEmployeesAdd = () => this.props.navigation.navigate('Employees');
    goToEmployeesEdit = () => this.props.navigation.navigate('Employees');
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

    _pickImageProfile = async () => {
        this.setState({
            buttonVisableProfile: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ profileImage: result.uri });
        }
    };
    _pickImageId = async () => {
        this.setState({
            buttonVisableId: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ idImage: result.uri });
        }
    };
    _pickImageLicense = async () => {
        this.setState({
            buttonVisableLicense: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ licenseImage: result.uri });
        }
    };
    _pickImageAccess = async () => {
        this.setState({
            buttonVisableAccess: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ accessImage: result.uri });
        }
    };
    goToEmployeesAdded = () => this.props.navigation.navigate('Employees');
    goToEmployeesCancel = () => this.props.navigation.navigate('Employees');
    render() {
        let { profileImage } = this.state;
        let { idImage } = this.state;
        let { licenseImage } = this.state;
        let { accessImage } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.card1}>
                        <Text style={styles.font2}>Employees details</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisableProfile &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImageProfile}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> Profile Pic </Text>
                                </TouchableOpacity>
                            }
                            {profileImage &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImageProfile}
                                >
                                    <Image source={{ uri: profileImage }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='firstName'
                                // value={password}
                                placeholder='First Name'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='lastName'
                                // value={password}
                                placeholder='Last Name'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='id'
                                // value={password}
                                placeholder='ID'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisableId &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImageId}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> ID Picture </Text>
                                </TouchableOpacity>
                            }
                            {idImage &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImageId}
                                >
                                    <Image source={{ uri: idImage }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='phone'
                                // value={password}
                                placeholder='Phone'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='email'
                                // value={password}
                                placeholder='Email'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <DatePicker
                            style={{
                                marginBottom: screenHeight / 80
                            }}
                            date={this.state.birthDate}
                            mode="date"
                            placeholder="Date of Birth"
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
                            onDateChange={(date) => { this.setState({ birthDate: date }) }}
                        />
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='driverLicenseNumber'
                                // value={password}
                                placeholder='Driver License Number'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {!this.state.buttonVisableLicense &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImageLicense}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> License Pic </Text>
                                </TouchableOpacity>
                            }
                            {licenseImage &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImageLicense}
                                >
                                    <Image source={{ uri: licenseImage }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap',marginLeft:30}}>
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
                            {/* <Text style={{ fontSize: 14, color: '#3c3c3c', marginTop: screenHeight/80 }}> Has Port Access </Text> */}
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
                            {!this.state.buttonVisableAccess &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImageAccess}
                                >
                                    <Ionicons name="ios-add-circle-outline" size={screenHeight * 0.04} color="#2684ff" />
                                    <Text style={{ fontSize: 18, color: '#2684ff', fontWeight: 'bold' }}> Access Pic </Text>
                                </TouchableOpacity>
                            }
                            {accessImage &&
                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this._pickImageAccess}
                                >
                                    <Image source={{ uri: accessImage }} style={{ width: screenWidth * 0.4, height: screenHeight * 0.12 }} />
                                </TouchableOpacity>}
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='salaryPerHour'
                                // value={password}
                                placeholder='Salary Per Hour'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='vacationsBalance'
                                // value={password}
                                placeholder='Vacations Balance'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='sicknessBalance'
                                // value={password}
                                placeholder='Sickness Balance'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='vacationseligibilty'
                                // value={password}
                                placeholder='Vacations eligibilty per month'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='sicknesseligibilty'
                                // value={password}
                                placeholder='Sickness eligibilty per month'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='defaultWorking'
                                // value={password}
                                placeholder='Default working hours per day'
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ width: 0.2 * screenWidth }}
                                onPress={this.goToEmployeesCancel}
                            >
                                <Text style={{ fontSize: 18, color: '#2684ff', }}> Cancel </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ width: 0.35 * screenWidth }}
                                onPress={this.goToEmployeesAdded}
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
                            onPress={this.goToHome}
                        >
                            <Text style={{ fontSize: 13, color: '#3c3c3c' }}> Company Details </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 6, borderRadius: 20, marginTop: 10, height: 32 }}
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
    card1: {
        marginTop: 20,
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 1.91,
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


