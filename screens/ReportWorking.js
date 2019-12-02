
import React from 'react'
import moment from 'moment';
import CheckboxFormX from 'react-native-checkbox-form';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import DatePicker from 'react-native-datepicker'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { Searchbar } from 'react-native-paper';
import { Firebase, db } from '../Firebase';
// import { ScrollView } from 'react-native-gesture-handler';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

let select_all = [];
let selectall = [
    {
        value: 'all',
        label: 'Select All'
    }
]
let selectedData;
export default class ReportWorking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstQuery: '',
            employees: [],
            dataLoaded: false,
        };
    }
    componentDidMount() {
        selectedData = [];
        this.getEmployees();
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
        const employees = await db.collection('employees').get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {
                    employeesData.push(doc.data());
                });
                this.setState({ employees: employeesData });
                this.setState({ dataLoaded: true });
            });
    }

    _onSelect = (item) => {
        if (item[0].value === 'all') {
            if (item[0].RNchecked) {
                selectedData = [];
                for (var i = 0; i < select_all.length; i++) {
                    selectedData.push({
                        id: select_all[i].value,
                        name: select_all[i].name,
                        defaultWorking: select_all[i].defaultWorking,
                        profileImage: select_all[i].profileImage,
                        salaryPerHour: select_all[i].salaryPerHour,
                    })
                }
            } else {
                selectedData = [];
            }
        } else {
            if (item[0].RNchecked) {
                selectedData.push({
                    id: item[0].value,
                    name: item[0].name,
                    defaultWorking: item[0].defaultWorking,
                    profileImage: item[0].profileImage,
                    salaryPerHour: item[0].salaryPerHour,
                })
            } else {
                for (var i = 0; i < selectedData.length; i++) {
                    if (selectedData[i].id === item[0].value) {
                        selectedData.splice(i, 1);
                    }
                }
            }
        }
        // console.warn(selectedData);
    };

    goToReportCancel = () => this.props.navigation.navigate('Home');
    goToReportDone = () => this.props.navigation.navigate('Home');
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
        select_all = [];
        const { firstQuery, employees } = this.state;
        const employeesList = employees.map((data) => {

            select_all.push({
                label: '',
                value: data.employeeId,
                name: data.firstName + ' ' + data.lastName,
                defaultWorking: data.defaultWorking,
                profileImage: data.profileImage,
                salaryPerHour: data.salaryPerHour,
            })
            if (firstQuery == '') {
                let selectone = [];
                selectone.push({
                    label: '',
                    value: data.employeeId,
                    name: data.firstName + ' ' + data.lastName,
                    defaultWorking: data.defaultWorking,
                    profileImage: data.profileImage,
                    salaryPerHour: data.salaryPerHour,
                })
                return (
                    <ListItem avatar>
                        <Left>
                            {(data.profileImage != null) && <Image source={{ uri: data.profileImage }} style={{ width: screenHeight * 0.038, height: screenHeight * 0.038, borderRadius: screenHeight * 0.019 }} />}
                            {(data.profileImage == null) && <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />}
                        </Left>
                        <Body>
                            <Text style={styles.font1}>{data.firstName} {data.lastName}</Text>
                        </Body>
                        <Right>
                            <CheckboxFormX
                                style={{ width: 30 }}
                                dataSource={selectone}
                                itemShowKey="label"
                                itemCheckedKey="RNchecked"
                                iconSize={30}
                                formHorizontal={true}
                                onChecked={(item) => this._onSelect(item)}
                            />
                        </Right>
                    </ListItem>
                )
            } else {

                let str = data.firstName + ' ' + data.lastName;
                var n = str.includes(firstQuery);
                if (n) {
                    let selecttwo = [];
                    selecttwo.push({
                        label: '',
                        value: data.employeeId,
                        name: data.firstName + ' ' + data.lastName,
                        defaultWorking: data.defaultWorking,
                        profileImage: data.profileImage,
                        salaryPerHour: data.salaryPerHour,
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
                                <CheckboxFormX
                                    style={{ width: 30 }}
                                    dataSource={selecttwo}
                                    itemShowKey="label"
                                    itemCheckedKey="RNchecked"
                                    iconSize={30}
                                    formHorizontal={true}
                                    onChecked={(item) => this._onSelect(item)}
                                />
                            </Right>
                        </ListItem >
                    )
                }
            }
        })
        return (

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 0 }}>
                    <TouchableOpacity
                        style={{ width: 0.2 * screenWidth, marginRight: 0.55 * screenWidth }}
                        onPress={this.goToReportCancel}
                    >
                        <Text style={{ fontSize: 18, color: '#2684ff' }}> Cancel </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 0.15 * screenWidth }}
                        onPress={this.goToReportDone}
                    >
                        <Text style={{ fontSize: 18, color: '#2684ff' }}> Done </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: -0.4 * screenWidth, }}>
                    <Text style={styles.font2}>Manage Employees</Text>
                </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    value={firstQuery}
                    style={{ width: 0.9 * screenWidth, backgroundColor: '#f6f6f6', borderRadius: 8, marginTop: 20, marginBottom: 10 }}
                />
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
                <View style={[this.state.deviceType ? styles.card2 : styles.card]}>
                    <ScrollView>
                        {this.state.dataLoaded &&
                            <View>
                                <List>
                                    {employeesList}
                                </List>
                                <View style={{ marginLeft: screenWidth * 0.17 }}>
                                    <TouchableOpacity
                                        style={styles.button1}
                                        onPress={() => {
                                            this.setState({ autoVisible: true });
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, color: 'white' }}> Auto Report Working Hours </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button3}
                                        onPress={() => {
                                            this.setState({ customVisible: true });
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, color: 'white' }}> Custom </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
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
                <Modal
                    visible={this.state.autoVisible}
                    onTouchOutside={() => {
                        this.setState({ autoVisible: false });
                    }}
                    footer={
                        <ModalFooter style={{ backgroundColor: '#E7E7E7', height: screenHeight / 11, }}>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    left: screenWidth / 16,
                                    bottom: 15,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#E7E7E7',
                                    padding: 5,
                                    borderRadius: 5,
                                    width: screenWidth * 0.2,
                                }}
                                onPress={() => { this.setState({ autoVisible: false }); }}
                            >
                                <Text style={{ fontSize: 14, color: '#2684ff' }}> Cancel </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    left: screenWidth * 0.45,
                                    bottom: 15,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#E7E7E7',
                                    padding: 5,
                                    borderRadius: 5,
                                    width: screenWidth * 0.2,
                                }}
                                onPress={() => {
                                    for (var i = 0; i < selectedData.length; i++) {
                                        let workingHourId = new Date().getTime();
                                        const workingDate = this.timeconvertTodate(workingHourId);
                                        const workingMonth = this.timeconvertToMonth(workingHourId);
                                        try {
                                            db.collection("workingHours").add({
                                                workingHourId: workingHourId,
                                                employeeId: selectedData[i].id,
                                                name: selectedData[i].name,
                                                defaultWorking: Number(selectedData[i].defaultWorking),
                                                startTime: workingDate + ':07-00',
                                                endTime: workingDate + ':17-00',
                                                workingDate: workingDate,
                                                workingMonth: workingMonth,
                                                profileImage: selectedData[i].profileImage,
                                                salaryPerHour: selectedData[i].salaryPerHour
                                            })
                                        } catch (error) {
                                            alert(error);
                                        }
                                    }

                                    setTimeout(() => {
                                        this.setState({ autoVisible: false });
                                    }, 2000);
                                }}
                            >
                                <Text style={{ fontSize: 14, color: '#2684ff' }}> Submit </Text>
                            </TouchableOpacity>
                        </ModalFooter>
                    }
                >
                    <ModalContent style={{ backgroundColor: '#E7E7E7' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, }}>Confirm Auto Submit</Text>
                        <Text>Please note that will submit the default {"\n"} working hours of the employees per day.</Text>
                    </ModalContent>
                </Modal>

                <Modal
                    visible={this.state.customVisible}
                    onTouchOutside={() => {
                        this.setState({ customVisible: false });
                    }}
                    footer={
                        <ModalFooter style={{ backgroundColor: '#E7E7E7', marginTop: 0, height: screenHeight / 11, }}>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    left: screenWidth / 16,
                                    bottom: 15,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#E7E7E7',
                                    padding: 5,
                                    borderRadius: 5,
                                    width: screenWidth * 0.2,
                                }}
                                onPress={() => { this.setState({ customVisible: false }); }}
                            >
                                <Text style={{ fontSize: 14, color: '#2684ff' }}> Cancel </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    left: screenWidth * 0.5,
                                    bottom: 15,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#E7E7E7',
                                    padding: 5,
                                    borderRadius: 5,
                                    width: screenWidth * 0.2,
                                }}
                                onPress={() => {
                                    const workingHours_custom = Number((this.state.endTime).slice(11, 13)) - Number((this.state.startTime).slice(11, 13))
                                    const workingDate = (this.state.endTime).slice(0, 10);
                                    const workingMonth = (this.state.endTime).slice(0, 7);
                                    console.warn(this.state.startTime);
                                    for (var i = 0; i < selectedData.length; i++) {
                                        let workingHourId = new Date().getTime();
                                        try {
                                            db.collection("workingHours").add({
                                                workingHourId: workingHourId,
                                                employeeId: selectedData[i].id,
                                                name: selectedData[i].name,
                                                defaultWorking: workingHours_custom,
                                                startTime: this.state.startTime,
                                                endTime: this.state.endTime,
                                                workingDate: workingDate,
                                                workingMonth: workingMonth,
                                                profileImage: selectedData[i].profileImage,
                                                salaryPerHour: selectedData[i].salaryPerHour
                                            })
                                        } catch (error) {
                                            alert(error);
                                        }
                                    }

                                    setTimeout(() => {
                                        this.setState({ customVisible: false });
                                    }, 2000);
                                }}
                            >
                                <Text style={{ fontSize: 14, color: '#2684ff' }}> Submit </Text>
                            </TouchableOpacity>
                        </ModalFooter>
                    }
                >
                    <ModalContent style={{ backgroundColor: '#E7E7E7', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, }}>Confirm working hours</Text>
                        <Text style={{ marginBottom: 10 }}>please select below the start and end of shift</Text>
                        <DatePicker
                            style={{
                                marginBottom: screenHeight / 80
                            }}
                            date={this.state.startTime}
                            mode="datetime"
                            placeholder="Start Time"
                            format="YYYY-MM-DD:HH-MM"
                            minDate="2016-05-01"
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
                            onDateChange={(date) => { this.setState({ startTime: date }) }}
                        />
                        <DatePicker
                            style={{
                                // height: screenHeight / 20,
                                // width: screenWidth * 0.6,
                                // borderColor: '#cfcfcf',
                                // borderWidth: 2,
                                // paddingLeft: 10,
                                // backgroundColor: 'white'
                                marginBottom: 0
                            }}
                            date={this.state.endTime}
                            mode="datetime"
                            placeholder="End Time"
                            format="YYYY-MM-DD:HH-MM"
                            minDate="2016-05-01"
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
                            onDateChange={(date) => { this.setState({ endTime: date }) }}
                        />
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
        justifyContent: 'center'
    },
    card: {
        marginTop: 10,
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 0.57,
        // height: screenHeight * 0.58,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    card2: {
        marginTop: 10,
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 0.66,
        // height: screenHeight * 0.58,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    card1: {
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 0.06,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 15
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
        width: screenWidth * 0.7,
        marginRight: screenWidth * 0.05,
        marginLeft: screenWidth * 0.05,
        marginTop: 10,
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
        backgroundColor: '#2684ff',
        padding: 5,
        borderRadius: 5,
        width: screenWidth * 0.6,
        marginTop: 10,
    },
    button3: {
        alignItems: 'center',
        backgroundColor: '#dbdbdb',
        padding: 5,
        borderRadius: 5,
        width: screenWidth * 0.6,
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


