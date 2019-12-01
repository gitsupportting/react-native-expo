
import React from 'react'
import CheckboxFormX from 'react-native-checkbox-form';
import Modal, { ModalFooter, ModalContent } from 'react-native-modals';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import { List, ListItem, Left, Body, Right } from 'native-base';
import { Searchbar } from 'react-native-paper';
import { db } from '../Firebase';
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
export default class Machines extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstQuery: '',
            employees: [],
            dataLoaded: false,
            licenseNumber: 0,
        };
    }
    componentDidMount() {
        selectedData = [];
        this.getEmployees();
    }
    async getEmployees() {
        let employeesData = [];
        const employees = await db.collection('stock')
            .where('typeValue', '==', 'equipment')
            .get()
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
                        profileImage: select_all[i].profileImage,
                        currentLocation: select_all[i].currentLocation,
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
                    profileImage: item[0].profileImage,
                    currentLocation: item[0].currentLocation,
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
    
    handleLocationChange = newLocation => {
        this.setState({ newLocation })
    }
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
                value: data.stockId,
                name: data.name,
                profileImage: data.stockImage,
                currentLocation: data.currentLocation,
            })
            if (firstQuery == '') {
                let selectone = [];
                selectone.push({
                    label: '',
                    value: data.stockId,
                    name: data.name,
                    profileImage: data.stockImage,
                    currentLocation: data.currentLocation,
                })
                return (
                    <ListItem avatar>
                        <Left>
                            {(data.profileImage != null) && <Image source={{ uri: data.profileImage }} style={{ width: screenHeight * 0.038, height: screenHeight * 0.038, borderRadius: screenHeight * 0.038 }} />}
                            {(data.profileImage == null) && <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />}
                        </Left>
                        <Body>
                            <Text style={styles.font1}>{data.name}</Text>
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

                let str = data.name;
                var n = str.includes(firstQuery);
                if (n) {
                    let selecttwo = [];
                    selecttwo.push({
                        label: '',
                        value: data.stockId,
                        name: data.name,
                        profileImage: data.stockImage,
                        currentLocation: data.currentLocation,
                    })
                    return (
                        <ListItem avatar>
                            <Left>
                                {(data.profileImage != null) && <Image source={{ uri: data.profileImage }} style={{ width: screenHeight * 0.038, height: screenHeight * 0.038, borderRadius: screenHeight * 0.038 }} />}
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
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
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
                    <Text style={styles.font2}>Manage Machines</Text>
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
                <View style={styles.card}>
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
                                        <Text style={{ fontSize: 16, color: 'white' }}> Manage Selected </Text>
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
                                            db.collection("equipmentManage").add({
                                                equipmentId: workingHourId,
                                                stockId: selectedData[i].id,
                                                name: selectedData[i].name,
                                                workingDate: workingDate,
                                                workingMonth: workingMonth,
                                                equipmentImage: selectedData[i].profileImage,
                                                newLocation: this.state.newLocation,
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
                                <Text style={{ fontSize: 14, color: '#2684ff' }}> Update </Text>
                            </TouchableOpacity>
                        </ModalFooter>
                    }
                >
                    <ModalContent style={{ backgroundColor: '#E7E7E7' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', marginBottom: 10, }}>Update Location for{"\n"}the Selected Machines</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenHeight / 80, marginRight: screenHeight / 80, }}>
                            <View style={{ margin: screenHeight / 80 }}>
                                <TextInput
                                    style={styles.input}
                                    name='newLocation'
                                    value={this.state.newLocation}
                                    placeholder='New location'
                                    autoCapitalize='none'
                                    onChangeText={this.handleLocationChange}
                                />
                            </View>
                        </View>
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
        height: screenHeight * 0.53,
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


