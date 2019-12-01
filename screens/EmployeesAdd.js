

import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import CheckboxFormX from 'react-native-checkbox-form';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, TextInput, Image, CheckBox, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker'
import { Firebase, db } from '../Firebase';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const selectall = [
    {
        label: 'Has Port Access',
        value: 'one'
    },
];
export default class EmployeesAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonVisableAccess: false,
            buttonVisableId: false,
            buttonVisableLicense: false,
            buttonVisableProfile: false,
            profileImage: null,
            idImage: null,
            licenseImage: null,
            accessImage: null,
            hasPortAccess: 'false',
            firstName: '',
            lastName: '',
            id: '',
            phone: '',
            email: '',
            birthDate: '',
            driverLicenseNumber: '',
            portAccessNumber: '',
            accessDate: '',
            salaryPerHour: 0,
            vacationsBalance: '',
            sicknessBalance: '',
            vacationseligibilty: '',
            sicknesseligibilty: '',
            defaultWorking: 8
        };
    }
    
    _onSelect = (item, e) => {
        this.setState({
            hasPortAccess: item[0].RNchecked
        })
    };
    handlefirstNameChange = firstName => {
        this.setState({ firstName })
    }
    handlelastNameChange = lastName => {
        this.setState({ lastName })
    }
    handleidChange = id => {
        this.setState({ id })
    }
    handlephoneChange = phone => {
        this.setState({ phone })
    }
    handleemailChange = email => {
        this.setState({ email })
    }
    handledriverLicenseNumberChange = driverLicenseNumber => {
        this.setState({ driverLicenseNumber })
    }
    handleportAccessNumberChange = portAccessNumber => {
        this.setState({ portAccessNumber })
    }
    handlesalaryPerHourChange = salaryPerHour => {
        this.setState({ salaryPerHour })
    }
    handlevacationsBalanceChange = vacationsBalance => {
        this.setState({ vacationsBalance })
    }
    handlesicknessBalanceChange = sicknessBalance => {
        this.setState({ sicknessBalance })
    }
    handledriverLicenseNumberChange = driverLicenseNumber => {
        this.setState({ driverLicenseNumber })
    }
    handlevacationseligibiltyChange = vacationseligibilty => {
        this.setState({ vacationseligibilty })
    }
    handlesicknesseligibiltyChange = sicknesseligibilty => {
        this.setState({ sicknesseligibilty })
    }
    handledefaultWorkingChange = defaultWorking => {
        this.setState({ defaultWorking })
    }


    goToEmployeesAdded = async () => {
        const { profileImage, firstName, lastName, id, idImage, email, phone, birthDate, driverLicenseNumber, licenseImage, hasPortAccess, portAccessNumber, accessDate, accessImage, salaryPerHour, vacationsBalance, sicknessBalance, vacationseligibilty, sicknesseligibilty, defaultWorking } = this.state
        let employeeId = new Date().getTime();
        if ((profileImage != null) && (idImage != null) && (licenseImage != null) && (accessImage != null) && (hasPortAccess == true) && firstName.length > 0 && lastName.length > 0 && id, email.length > 0 && phone.length > 0 && birthDate.length > 0 && driverLicenseNumber.length > 0 && portAccessNumber.length > 0 && accessDate.length > 0 && salaryPerHour.length > 0 && vacationsBalance.length > 0 && sicknessBalance.length > 0 && vacationseligibilty.length > 0 && sicknesseligibilty.length > 0 && defaultWorking.length > 0) {
            try {
                db.collection("employees").add({
                    employeeId: employeeId,
                    profileImage: profileImage,
                    firstName: firstName,
                    lastName: lastName,
                    id: id,
                    idImage: idImage,
                    phone: phone,
                    birthDate: birthDate,
                    driverLicenseNumber: driverLicenseNumber,
                    licenseImage: licenseImage,
                    hasPortAccess: hasPortAccess,
                    portAccessNumber: portAccessNumber,
                    accessDate: accessDate,
                    accessImage: accessImage,
                    salaryPerHour: salaryPerHour,
                    vacationsBalance: vacationsBalance,
                    sicknessBalance: sicknessBalance,
                    vacationseligibilty: vacationseligibilty,
                    sicknesseligibilty: sicknesseligibilty,
                    defaultWorking: defaultWorking
                })
            } catch (error) {
                alert(error);
            }
            setTimeout(() => {
                this.props.navigation.navigate('Employees');    
            }, 2000);
            

        } else {
            alert("Please insert required data")
        }
    }
    goToEmployeesCancel = async () => {
        this.setState({
            buttonVisableAccess: false,
            buttonVisableId: false,
            buttonVisableLicense: false,
            buttonVisableProfile: false,
            profileImage: null,
            idImage: null,
            licenseImage: null,
            accessImage: null,
            hasPortAccess: 'false',
            firstName: '',
            lastName: '',
            id: '',
            phone: '',
            email: '',
            birthDate: '',
            driverLicenseNumber: '',
            portAccessNumber: '',
            accessDate: '',
            salaryPerHour: 0,
            vacationsBalance: '',
            sicknessBalance: '',
            vacationseligibilty: '',
            sicknesseligibilty: '',
            defaultWorking: 8
        })
        this.props.navigation.navigate('Employees')
    }

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
            base64: true,
        });
        
        setTimeout(() => {
            if (!result.cancelled) {
                this.setState({ profileImage: 'data:image/gif;base64,' + result.base64 });            
            } 
        }, 50);
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
            base64: true,

        });
        if (!result.cancelled) {
            this.setState({ idImage: 'data:image/gif;base64,' + result.base64 });
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
            base64: true,

        });
        if (!result.cancelled) {
            this.setState({ licenseImage: 'data:image/gif;base64,' + result.base64 });
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
            base64: true,

        });
        if (!result.cancelled) {
            this.setState({ accessImage: 'data:image/gif;base64,' + result.base64 });
        }
    };

    render() {
        const { profileImage, firstName, lastName, id, idImage, email, phone, birthDate, driverLicenseNumber, licenseImage, hasPortAccess, portAccessNumber, accessDate, accessImage, salaryPerHour, vacationsBalance, sicknessBalance, vacationseligibilty, sicknesseligibilty, defaultWorking } = this.state
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
                                value={firstName}
                                placeholder='First Name'
                                autoCapitalize='none'
                                onChangeText={this.handlefirstNameChange}
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='lastName'
                                value={lastName}
                                placeholder='Last Name'
                                autoCapitalize='none'
                                onChangeText={this.handlelastNameChange}
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='id'
                                value={id}
                                placeholder='ID'
                                autoCapitalize='none'
                                onChangeText={this.handleidChange}
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
                                value={phone}
                                placeholder='Phone'
                                autoCapitalize='none'
                                onChangeText={this.handlephoneChange}
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='email'
                                value={email}
                                placeholder='Email'
                                autoCapitalize='none'
                                onChangeText={this.handleemailChange}
                            />
                        </View>
                        <DatePicker
                            style={{
                                marginBottom: screenHeight / 80
                            }}
                            date={birthDate}
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
                                    top: screenHeight / 100,
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
                                value={driverLicenseNumber}
                                placeholder='Driver License Number'
                                autoCapitalize='none'
                                onChangeText={this.handledriverLicenseNumberChange}
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

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 30 }}>
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
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='portAccessNumber'
                                value={portAccessNumber}
                                placeholder='Port Access Number'
                                autoCapitalize='none'
                                onChangeText={this.handleportAccessNumberChange}
                            />
                        </View>
                        <DatePicker
                            style={{
                                marginBottom: screenHeight / 80
                            }}
                            date={accessDate}
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
                                    top: screenHeight / 100,
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
                                value={salaryPerHour}
                                placeholder='Salary Per Hour'
                                autoCapitalize='none'
                                onChangeText={this.handlesalaryPerHourChange}
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='vacationsBalance'
                                value={vacationsBalance}
                                placeholder='Vacations Balance'
                                autoCapitalize='none'
                                onChangeText={this.handlevacationsBalanceChange}
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='sicknessBalance'
                                value={sicknessBalance}
                                placeholder='Sickness Balance'
                                autoCapitalize='none'
                                onChangeText={this.handlesicknessBalanceChange}
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='vacationseligibilty'
                                value={vacationseligibilty}
                                placeholder='Vacations eligibilty per month'
                                autoCapitalize='none'
                                onChangeText={this.handlevacationseligibiltyChange}
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='sicknesseligibilty'
                                value={sicknesseligibilty}
                                placeholder='Sickness eligibilty per month'
                                autoCapitalize='none'
                                onChangeText={this.handlesicknesseligibiltyChange}
                            />
                        </View>
                        <View style={{ margin: screenHeight / 80 }}>
                            <TextInput
                                style={styles.input}
                                name='defaultWorking'
                                value={defaultWorking}
                                placeholder='Default working hours per day'
                                autoCapitalize='none'
                                onChangeText={this.handledefaultWorkingChange}
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


