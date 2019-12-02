
import React from 'react'
import CalendarPicker from 'react-native-calendar-picker';
import Modal, { ModalFooter, ModalContent } from 'react-native-modals';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { Searchbar } from 'react-native-paper';
import { Firebase, db } from '../Firebase';
import { concatStatic } from 'rxjs/operator/concat';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

let select_employees = [];
let select_equipments = [];
let select_vehicles = [];

export default class ReportTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstQuery: '',
            checkBoxChecked: [],
            selectedStartDate: null,
            employeesVisible: true,
            equipmentsVisible: false,
            vehiclesVisible: false,
            review: false,
            employees: [],
            vehicles: [],
            equipments: [],
            dataLoaded: false,
            // selectedData: [],

        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentDidMount() {
        // console.warn(screenHeight);
        // console.warn(screenWidth);375/812
        let workingHourId = new Date().getTime();
        const workingDate = this.timeconvertTodate(workingHourId);
        const workingMonth = this.timeconvertToMonth(workingHourId);
        this.setState({
            selectedStartDate: workingDate,
            workingMonth: workingMonth,
        }, () => {
            this.getEmployees();
            this.getEmployeesMonth();
            this.getVehicles();
            this.getEquipments();
        })
        if (screenWidth/screenHeight<0.5){
            this.setState({
              deviceType:true
            })
          } else {
            this.setState({
              deviceType:false
            })
          }
    }
    
    async getEmployees() {
        let employeesData = [];
        const employees = await db.collection('workingHours')
            .where('workingDate', '==', this.state.selectedStartDate)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {
                    employeesData.push(doc.data());
                });
                this.setState({ employees: employeesData });
                this.setState({ dataLoaded: true });
            });
    }
    async getEmployeesMonth() {
        let employeesData = [];
        const employees = await db.collection('workingHours')
            .where('workingMonth', '==', this.state.workingMonth)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {
                    employeesData.push(doc.data());
                });
                this.setState({ employeesMonth: employeesData });
                // this.setState({ dataLoaded: true });
            });
    }
    async getVehicles() {
        let vehiclesData = [];
        const vehicles = await db.collection('vehicleManage')
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {
                    if (Number((doc.data()).workingDate.replace(/-/g, '')) <= Number((this.state.selectedStartDate).replace(/-/g, ''))) {
                        if (vehiclesData.length == 0) {
                            vehiclesData.push(doc.data());
                        } else {
                            for (var i = 0; i < vehiclesData.length; i++) {
                                if ((vehiclesData[i].stockId == ((doc.data()).stockId))) {
                                    if (Number((doc.data()).workingDate.replace(/-/g, '')) >= Number((vehiclesData[i].workingDate).replace(/-/g, ''))) {
                                        vehiclesData.splice(i, 1);
                                        vehiclesData.push(doc.data());
                                    }
                                } else {
                                    vehiclesData.push(doc.data());
                                }
                            }
                        }
                    }
                });
                // this.setState({ equipments: stocksData });
                this.setState({ vehicles: vehiclesData });
                this.setState({ dataLoaded: true });
            });
    }
    async getEquipments() {
        let equipmentsData = [];
        const equipments = await db.collection('equipmentManage')
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {
                    if (Number((doc.data()).workingDate.replace(/-/g, '')) <= Number((this.state.selectedStartDate).replace(/-/g, ''))) {
                        if (equipmentsData.length == 0) {
                            equipmentsData.push(doc.data());
                        } else {
                            for (var i = 0; i < equipmentsData.length; i++) {
                                if ((equipmentsData[i].stockId == ((doc.data()).stockId))) {
                                    if (Number((doc.data()).workingDate.replace(/-/g, '')) >= Number((equipmentsData[i].workingDate).replace(/-/g, ''))) {
                                        equipmentsData.splice(i, 1);
                                        equipmentsData.push(doc.data());
                                    }
                                } else {
                                    equipmentsData.push(doc.data());
                                }
                            }
                        }
                    }
                });
                // this.setState({ equipments: stocksData });
                this.setState({ equipments: equipmentsData });
                this.setState({ dataLoaded: true });
            });
    }
    onDateChange(date) {
        let dateMonth;
        if (String(date).slice(4, 7) == 'Jan') {
            dateMonth = '1';
        }
        if (String(date).slice(4, 7) == 'Feb') {
            dateMonth = '2';
        }
        if (String(date).slice(4, 7) == 'Mar') {
            dateMonth = '3';
        }
        if (String(date).slice(4, 7) == 'Apr') {
            dateMonth = '4';
        }
        if (String(date).slice(4, 7) == 'May') {
            dateMonth = '5';
        }
        if (String(date).slice(4, 7) == 'Jun') {
            dateMonth = '6';
        }
        if (String(date).slice(4, 7) == 'Jul') {
            dateMonth = '7';
        }
        if (String(date).slice(4, 7) == 'Aug') {
            dateMonth = '8';
        }
        if (String(date).slice(4, 7) == 'Sep') {
            dateMonth = '9';
        }
        if (String(date).slice(4, 7) == 'Oct') {
            dateMonth = '10';
        }
        if (String(date).slice(4, 7) == 'Nov') {
            dateMonth = '11';
        }
        if (String(date).slice(4, 7) == 'Dec') {
            dateMonth = '12';
        }

        var dateToDate = String(date).slice(11, 15) + '-' + dateMonth + '-' + String(date).slice(8, 10);
        this.setState({
            dataLoaded: false,
            selectedStartDate: dateToDate,
        }, () => {
            this.getEmployees();
            this.getVehicles();
            this.getEquipments();
        });
    }

    goToHome = () => this.props.navigation.navigate('Home');
    goToEmployees = () => this.props.navigation.navigate('Employees');
    goToStock = () => this.props.navigation.navigate('Stock');
    goToReportTab = () => this.props.navigation.navigate('ReportTab');

    timeconvertTodate = (unixtimestamp) => {


        // Convert timestamp to milliseconds
        var date = new Date(unixtimestamp);

        // Year
        var year = date.getFullYear();

        // Month
        var month = date.getMonth() + 1;

        var day = date.getDate();
        // Display date time in MM-dd-yyyy h:m:s format
        var convdataTime = year + '-' + month + '-' + day;

        return convdataTime;

    }

    timeconvertToMonth = (unixtimestamp) => {


        // Convert timestamp to milliseconds
        var date = new Date(unixtimestamp);

        // Year
        var year = date.getFullYear();

        // Month
        var month = date.getMonth() + 1;


        // Display date time in MM-dd-yyyy h:m:s format
        var convdataTime = year + '-' + month;

        return convdataTime;

    }

    render() {
        const { firstQuery, employees, vehicles, equipments, selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        select_employees = [];
        select_equipments = [];
        select_vehicles = [];
        const employeesList = employees.map((data) => {

            select_employees.push({
                label: '',
                value: data.workingHourId
            })
            if (firstQuery == '') {
                let selectone = [];
                selectone.push({
                    label: '',
                    value: data.workingHourId
                })
                return (
                    <ListItem avatar>
                        <Left>
                            {(data.profileImage != null) && <Image source={{ uri: data.profileImage }} style={{ width: screenHeight * 0.038, height: screenHeight * 0.038, borderRadius: screenHeight * 0.019 }} />}
                            {(data.profileImage == null) && <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />}
                        </Left>
                        <Body>
                            <Text style={styles.font1}>{data.name}</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity
                                style={styles.button1}
                                onPress={() => {
                                    var workingHoursMonth = 0;
                                    if (this.state.employeesVisible) {
                                        for (var i = 0; i < (this.state.employeesMonth).length; i++) {
                                            if ((this.state.employeesMonth)[i].employeeId == data.employeeId) {
                                                workingHoursMonth = workingHoursMonth + Number((this.state.employeesMonth)[i].defaultWorking) * Number((this.state.employeesMonth)[i].salaryPerHour)
                                            }
                                        }
                                        this.setState({
                                            employeeName: data.name,
                                            startTime: data.startTime,
                                            endTime: data.endTime,
                                            workingHoursMonth: workingHoursMonth,
                                        })
                                        this.setState({ review: true });
                                    }
                                }}
                            >
                                <Text style={{ fontSize: 14, color: 'white' }}> Review </Text>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                )
            } else {

                let str = data.name;
                var n = str.includes(firstQuery);
                if (n) {
                    let selecttwo = [];
                    selecttwo.push({
                        label: '',
                        value: data.workingHourId
                    })
                    return (
                        <ListItem avatar>
                            <Left>
                                {(data.profileImage != null) && <Image source={{ uri: data.profileImage }} style={{ width: screenHeight * 0.038, height: screenHeight * 0.038, borderRadius: screenHeight * 0.019 }} />}
                                {(data.profileImage == null) && <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />}
                            </Left>
                            <Body>
                                <Text style={styles.font1}>{str}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity
                                    style={styles.button1}
                                    onPress={() => {
                                        this.setState({ review: true })
                                        if (this.state.employeesVisible) {
                                            this.setState({
                                                employeeName: data.firstName + ' ' + data.lastName
                                            })
                                        }
                                    }}
                                >
                                    <Text style={{ fontSize: 14, color: 'white' }}> Review </Text>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    )
                }
            }
        })
        const vehiclesList = vehicles.map((data) => {

            select_vehicles.push({
                label: '',
                value: data.vehicleId
            })
            if (firstQuery == '') {
                let selectthree = [];
                selectthree.push({
                    label: '',
                    value: data.vehicleId
                })
                return (
                    <ListItem avatar>
                        <Left>
                            {(data.vehicleImage != null) && <Image source={{ uri: data.vehicleImage }} style={{ width: screenHeight * 0.038, height: screenHeight * 0.038, borderRadius: screenHeight * 0.019 }} />}
                            {(data.vehicleImage == null) && <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />}
                        </Left>
                        <Body>
                            <Text style={styles.font1}>{data.name}</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity
                                style={styles.button1}
                                onPress={() => {
                                    this.setState({ review: true })
                                    if (this.state.vehiclesVisible) {
                                        this.setState({
                                            vehicleName: data.name,
                                            licenseNumber: data.licenseNumber,
                                            driverValue: data.driverValue,
                                            newLocation: data.newLocation,
                                        })
                                    }
                                }}
                            >
                                <Text style={{ fontSize: 14, color: 'white' }}> Review </Text>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                )
            } else {

                let str = data.name;
                var n = str.includes(firstQuery);
                if (n) {
                    let selectfour = [];
                    selectfour.push({
                        label: '',
                        value: data.stockId
                    })
                    return (
                        <ListItem avatar>
                            <Left>
                                {(data.vehicleImage != null) && <Image source={{ uri: data.vehicleImage }} style={{ width: screenHeight * 0.038, height: screenHeight * 0.038, borderRadius: screenHeight * 0.019 }} />}
                                {(data.vehicleImage == null) && <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />}
                            </Left>
                            <Body>
                                <Text style={styles.font1}>{str}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity
                                    style={styles.button1}
                                    onPress={() => {
                                        this.setState({ review: true })
                                        if (this.state.vehiclesVisible) {
                                            this.setState({
                                                vehicleName: data.name,
                                                licenseNumber: data.licenseNumber,
                                                driverValue: data.driverValue,
                                                newLocation: data.newLocation,
                                            })
                                        }
                                    }}
                                >
                                    <Text style={{ fontSize: 14, color: 'white' }}> Review </Text>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    )
                }
            }
        })
        const equipmentsList = equipments.map((data) => {

            select_equipments.push({
                label: '',
                value: data.equipmentId
            })
            if (firstQuery == '') {
                let selectthree = [];
                selectthree.push({
                    label: '',
                    value: data.equipmentId
                })
                return (
                    <ListItem avatar>
                        <Left>
                            {(data.equipmentImage != null) && <Image source={{ uri: data.equipmentImage }} style={{ width: screenHeight * 0.038, height: screenHeight * 0.038, borderRadius: screenHeight * 0.019 }} />}
                            {(data.equipmentImage == null) && <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />}
                        </Left>
                        <Body>
                            <Text style={styles.font1}>{data.name}</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity
                                style={styles.button1}
                                onPress={() => {
                                    this.setState({ review: true })
                                    if (this.state.equipmentsVisible) {
                                        this.setState({
                                            equipmentName: data.name,
                                            newLocation: data.newLocation,
                                        })
                                    }
                                }}
                            >
                                <Text style={{ fontSize: 14, color: 'white' }}> Review </Text>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                )
            } else {

                let str = data.name;
                var n = str.includes(firstQuery);
                if (n) {
                    let selectfour = [];
                    selectfour.push({
                        label: '',
                        value: data.stockId
                    })
                    return (
                        <ListItem avatar>
                            <Left>
                                {(data.equipmentImage != null) && <Image source={{ uri: data.equipmentImage }} style={{ width: screenHeight * 0.038, height: screenHeight * 0.038, borderRadius: screenHeight * 0.019 }} />}
                                {(data.equipmentImage == null) && <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />}
                            </Left>
                            <Body>
                                <Text style={styles.font1}>{str}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity
                                    style={styles.button1}
                                    onPress={() => {
                                        this.setState({ review: true })
                                        if (this.state.equipmentsVisible) {
                                            this.setState({
                                                equipmentName: data.name
                                            })
                                        }
                                    }}
                                >
                                    <Text style={{ fontSize: 14, color: 'white' }}> Review </Text>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    )
                }
            }
        })
        return (
            <View style={styles.container}>
                <View style={{ marginLeft: -0.7 * screenWidth, }}>
                    <Text style={styles.font2}>Reports</Text>
                </View>
                <CalendarPicker
                    onDateChange={this.onDateChange}
                    scascaleFactor={screenHeight * 0.7}
                />
                {/* <View>
                        <Text>SELECTED DATE:{startDate}</Text>
                    </View> */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={this.state.employeesVisible ? {
                            alignItems: 'center',
                            backgroundColor: '#dbdbdb',
                            padding: 5,
                            borderWidth: 1,
                            borderColor: 'black',
                            height: 34,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            width: screenWidth * 0.25,
                            marginTop: -screenHeight / 20,
                        } :
                            {
                                alignItems: 'center',
                                backgroundColor: 'white',
                                padding: 5,
                                borderWidth: 1,
                                borderColor: 'black',
                                height: 34,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                width: screenWidth * 0.25,
                                marginTop: -screenHeight / 20,
                            }
                        }
                        onPress={() => {
                            this.setState({ employeesVisible: true, equipmentsVisible: false, vehiclesVisible: false });
                        }}
                    >
                        <Text style={{ fontSize: 16, color: 'black' }}> Employees </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.equipmentsVisible ? {
                            alignItems: 'center',
                            backgroundColor: '#dbdbdb',
                            padding: 5,
                            borderWidth: 1,
                            borderColor: 'black',
                            height: 34,
                            width: screenWidth * 0.25,
                            marginTop: -screenHeight / 20,
                        } :
                            {
                                alignItems: 'center',
                                backgroundColor: 'white',
                                padding: 5,
                                borderWidth: 1,
                                borderColor: 'black',
                                height: 34,
                                width: screenWidth * 0.25,
                                marginTop: -screenHeight / 20,
                            }
                        }
                        onPress={() => {
                            this.setState({ equipmentsVisible: true, employeesVisible: false, vehiclesVisible: false });
                        }}
                    >
                        <Text style={{ fontSize: 16, color: 'black' }}> Equipments </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.vehiclesVisible ? {
                            alignItems: 'center',
                            backgroundColor: '#dbdbdb',
                            padding: 5,
                            borderWidth: 1,
                            borderColor: 'black',
                            height: 34,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            width: screenWidth * 0.25,
                            marginTop: -screenHeight / 20,
                        } :
                            {
                                alignItems: 'center',
                                backgroundColor: 'white',
                                padding: 5,
                                borderWidth: 1,
                                borderColor: 'black',
                                height: 34,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                width: screenWidth * 0.25,
                                marginTop: -screenHeight / 20,
                            }
                        }
                        onPress={() => {
                            this.setState({ vehiclesVisible: true, employeesVisible: false, equipmentsVisible: false });
                        }}
                    >
                        <Text style={{ fontSize: 16, color: 'black' }}> Vehicles </Text>
                    </TouchableOpacity>
                </View>

                <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    value={firstQuery}
                    style={{ width: 0.9 * screenWidth, backgroundColor: '#f6f6f6', borderRadius: 8, marginTop: 20, height: screenHeight / 20 }}
                />
                <View style={[this.state.deviceType ? styles.card2 : styles.card]}>
                    <ScrollView>
                        {this.state.dataLoaded && this.state.employeesVisible && <List>
                            {employeesList}
                        </List>}
                        {this.state.dataLoaded && this.state.vehiclesVisible && <List>
                            {vehiclesList}
                        </List>}
                        {this.state.dataLoaded && this.state.equipmentsVisible && <List>
                            {equipmentsList}
                        </List>}
                        {!this.state.dataLoaded && <Text style={{ fontSize: 18, margin: 30 }}>
                            Loading...
                    </Text>}
                    </ScrollView>
                </View>
                <View style={styles.card1}>
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
                            style={styles.button2}
                            onPress={this.goToStock}
                        >
                            <Text style={{ fontSize: 13, color: '#3c3c3c' }}> Stock </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 6, borderRadius: 20, marginTop: 10, height: 32 }}
                            onPress={this.goToReportTab}
                        >
                            <Text style={{ fontSize: 13, color: '#3c3c3c' }}> Reports </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <Modal
                    style={{ width: screenWidth }}
                    visible={this.state.employeesVisible && this.state.review}
                    onTouchOutside={() => {
                        this.setState({ review: false });
                    }}
                    footer={
                        <ModalFooter style={{ backgroundColor: '#E7E7E7', height: screenHeight / 20, }}>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    left: screenWidth / 4,
                                    bottom: 15,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'black',
                                    padding: 5,
                                    borderRadius: 5,
                                    width: screenWidth * 0.25,
                                }}
                                onPress={() => { this.setState({ review: false }); }}
                            >
                                <Text style={{ fontSize: 14, color: 'white' }}> Close </Text>
                            </TouchableOpacity>
                        </ModalFooter>
                    }
                >
                    <ModalContent style={{ backgroundColor: '#E7E7E7', width: screenWidth * 0.7 }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, }}>Details</Text>
                        <Text style={{ lineHeight: 25, textAlign: 'center', }}>{this.state.employeeName}{"\n"}shift Start Time: {this.state.startTime}{"\n"}Shift End Time: {this.state.endTime}{"\n"}Salary on this month: ${this.state.workingHoursMonth}</Text>
                    </ModalContent>
                </Modal>
                <Modal
                    style={{ width: screenWidth }}
                    visible={this.state.vehiclesVisible && this.state.review}
                    onTouchOutside={() => {
                        this.setState({ review: false });
                    }}
                    footer={
                        <ModalFooter style={{ backgroundColor: '#E7E7E7', height: screenHeight / 20, }}>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    left: screenWidth / 4,
                                    bottom: 15,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'black',
                                    padding: 5,
                                    borderRadius: 5,
                                    width: screenWidth * 0.25,
                                }}
                                onPress={() => { this.setState({ review: false }); }}
                            >
                                <Text style={{ fontSize: 14, color: 'white' }}> Close </Text>
                            </TouchableOpacity>
                        </ModalFooter>
                    }
                >
                    <ModalContent style={{ backgroundColor: '#E7E7E7', width: screenWidth * 0.7, }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, }}>Details</Text>
                        <Text style={{ lineHeight: 25, textAlign: 'center', }}>{this.state.vehicleName}{"\n"}{this.state.licenseNumber}{"\n"}{this.state.driverValue}{"\n"}{this.state.newLocation}</Text>
                    </ModalContent>
                </Modal>
                <Modal
                    style={{ width: screenWidth }}
                    visible={this.state.equipmentsVisible && this.state.review}
                    onTouchOutside={() => {
                        this.setState({ review: false });
                    }}
                    footer={
                        <ModalFooter style={{ backgroundColor: '#E7E7E7', height: screenHeight / 20, }}>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    left: screenWidth / 4,
                                    bottom: 15,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'black',
                                    padding: 5,
                                    borderRadius: 5,
                                    width: screenWidth * 0.25,
                                }}
                                onPress={() => { this.setState({ review: false }); }}
                            >
                                <Text style={{ fontSize: 14, color: 'white' }}> Close </Text>
                            </TouchableOpacity>
                        </ModalFooter>
                    }
                >
                    <ModalContent style={{ backgroundColor: '#E7E7E7', width: screenWidth * 0.7, }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, }}>Details</Text>
                <Text style={{ lineHeight: 25, textAlign: 'center', }}>{this.state.equipmentName}{"\n"}{this.state.newLocation}</Text>
                    </ModalContent>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 15,
    },
    card: {
        marginTop: screenHeight/30,
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 0.2,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    card2: {
        marginTop: screenHeight/30,
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 0.22,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    card1: {
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 0.06,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    font1: {
        fontSize: 16,
        color: '#3c3c3c',
        marginTop: 7,
        marginBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    font2: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        width: screenWidth * 0.5,
        marginRight: screenWidth * 0.05,
        marginLeft: screenWidth * 0.05,
        marginTop: screenHeight/20,
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
    button1: {
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 5,
        width: screenWidth * 0.25,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
    }
})


