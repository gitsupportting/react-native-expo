
import React from 'react'
import CalendarPicker from 'react-native-calendar-picker';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import DatePicker from 'react-native-datepicker'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, CheckBox, ScrollView } from 'react-native'
import { List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { Searchbar } from 'react-native-paper';
import { Firebase, db } from '../Firebase';
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
            stocks: [],
            dataLoaded: false,
            // selectedData: [],

        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentDidMount() {
        this.getEmployees();
        this.getStocks();
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
    async getStocks() {
        let stocksData = [];
        const stocks = await db.collection('stock').get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {
                    stocksData.push(doc.data());
                });
                // this.setState({ equipments: stocksData });
                this.setState({ stocks: stocksData });
                this.setState({ dataLoaded: true });
            });
    }
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    goToHome = () => this.props.navigation.navigate('Home');
    goToEmployees = () => this.props.navigation.navigate('Employees');
    goToStock = () => this.props.navigation.navigate('Stock');
    goToReportTab = () => this.props.navigation.navigate('ReportTab');
    render() {
        const { firstQuery, employees, stocks, selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        select_employees = [];
        select_equipments = [];
        select_vehicles = [];
        const employeesList = employees.map((data) => {

            select_employees.push({
                label: '',
                value: data.employeeId
            })
            if (firstQuery == '') {
                let selectone = [];
                selectone.push({
                    label: '',
                    value: data.employeeId
                })
                return (
                    <ListItem avatar>
                        <Left>
                            {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                            <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />
                        </Left>
                        <Body>
                            <Text style={styles.font1}>{data.firstName} {data.lastName}</Text>
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
            } else {

                let str = data.firstName + ' ' + data.lastName;
                var n = str.includes(firstQuery);
                if (n) {
                    let selecttwo = [];
                    selecttwo.push({
                        label: '',
                        value: data.employeeId
                    })
                    return (
                        <ListItem avatar>
                            <Left>
                                {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                                <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />
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
        // const stocksList = stocks.map((data) => {
            const stocksList = stocks.map((data) => {

                select_equipments.push({
                    label: '',
                    value: data.stockId
                })
                if (firstQuery == '') {
                    let selectthree = [];
                    selectthree.push({
                        label: '',
                        value: data.stockId
                    })
                    return (
                        <ListItem avatar>
                            <Left>
                                {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                                <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />
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
                                    {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                                    <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />
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
                    <View style={styles.card}>
                        <ScrollView>
                            {this.state.dataLoaded && this.state.employeesVisible && <List>
                                {employeesList}
                            </List>}
                            {this.state.dataLoaded && this.state.equipmentsVisible && <List>
                                {stocksList}
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
                            <Text style={{ lineHeight: 25, textAlign: 'center', }}>{this.state.employeeName}{"\n"}shift Start Time: start time{"\n"}Shift End Time: end time{"\n"}Salary on this month: $100</Text>
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
                            <Text style={{ lineHeight: 25, textAlign: 'center', }}>Car name{"\n"}Car license number{"\n"}Driver firstname lastname{"\n"}location at that date</Text>
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
                            <Text style={{ lineHeight: 25, textAlign: 'center', }}>{this.state.equipmentName}{"\n"}Equipment location at that date</Text>
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
            position: 'absolute',
            bottom: 15,
        },
        card: {
            marginTop: 10,
            backgroundColor: '#f6f6f6',
            width: screenWidth * 0.9,
            height: screenHeight * 0.25,
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
            marginTop: 30,
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


