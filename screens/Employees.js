
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import CheckboxFormX from 'react-native-checkbox-form';
import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity } from 'react-native'
import { List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { Searchbar } from 'react-native-paper';
import { Firebase, db } from '../Firebase';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
let select_all = [];
let selected = 0;
export default class Employees extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstQuery: '',
            employees: [],
            dataLoaded: false,
            selectedData: [],
        };
    }
    componentDidMount() {
        this.getEmployees();
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
        selected = item[0].value;
    };


    goToEmployeesAdd = () => this.props.navigation.navigate('EmployeesAdd');
    goToEmployeesEdit = () => {
        employeesList = this.state.employees.map((data) => {
            if (data.employeeId == selected) {
                this.setState({
                    selectedData: data
                }, () => {
                    this.props.navigation.navigate('EmployeesEdit', { editData: this.state.selectedData });
                });
            }
        })
    }

    goToHome = () => this.props.navigation.navigate('Home');
    goToEmployees = () => this.props.navigation.navigate('Employees');
    goToStock = () => this.props.navigation.navigate('Stock');
    goToReportTab = () => this.props.navigation.navigate('ReportTab');
    render() {
        select_all = [];
        const { firstQuery, employees } = this.state;
        const employeesList = employees.map((data) => {

            select_all.push({
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
                        value: data.employeeId
                    })
                    return (
                        <ListItem avatar>
                            <Left>
                            { (data.profileImage!=null) && <Image source={{ uri:data.profileImage }} style={{ width: screenHeight * 0.038, height: screenHeight * 0.038, borderRadius: screenHeight * 0.019 }} />}
                            { (data.profileImage==null) && <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />}
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
                        style={{ width: 0.15 * screenWidth }}
                        onPress={this.goToEmployeesAdd}
                    >
                        <Ionicons name="md-add" size={screenHeight * 0.04} color="#2684ff" />
                    </TouchableOpacity>
                    <Text style={styles.font2}>Employees</Text>
                    <TouchableOpacity
                        style={{ width: 0.15 * screenWidth }}
                        onPress={this.goToEmployeesEdit}
                    >
                        <Text style={{ fontSize: 20, color: '#2684ff', }}> Edit </Text>
                    </TouchableOpacity>
                </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    value={firstQuery}
                    style={{ width: 0.9 * screenWidth, backgroundColor: '#f6f6f6', borderRadius: 8, marginTop: 20 }}
                />
                <View style={styles.card}>
                    {this.state.dataLoaded && <List>
                        {employeesList}
                    </List>}
                    {!this.state.dataLoaded && <Text style={{ fontSize: 18, margin: 30 }}>
                        Loading...
                    </Text>}
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
        height: screenHeight * 0.65,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    card1: {
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 0.08,
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
        marginTop: 0,
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
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})


