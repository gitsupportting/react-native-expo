
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, CheckBox } from 'react-native'
import { List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { Searchbar } from 'react-native-paper';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

var tempCheckValues = [];
export default class Employees extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstQuery: '',
            checkBoxChecked: []
        };
    }
    checkBoxChanged(id, value) {

        this.setState({
            checkBoxChecked: tempCheckValues
        })

        var tempCheckBoxChecked = this.state.checkBoxChecked;
        tempCheckBoxChecked[id] = !value;

        this.setState({
            checkBoxChecked: tempCheckBoxChecked
        })

    }

    goToEmployeesAdd = () => this.props.navigation.navigate('EmployeesAdd');
    goToEmployeesEdit = () => this.props.navigation.navigate('EmployeesAdd');
    goToHome = () => this.props.navigation.navigate('Home');
    goToEmployees = () => this.props.navigation.navigate('Employees');
    goToStock = () => this.props.navigation.navigate('Stock');
    goToReportTab = () => this.props.navigation.navigate('ReportTab');
    render() {
        const { firstQuery } = this.state;
        const products = [{
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        }];
        return (            
        //     products.map((val) => {
        //         { tempCheckValues[val.id] = false }   
        //         return (        
        //           <View key={val.id} style={{ flexDirection: 'column' }}>        
        //             <CheckBox        
        //               value={this.state.checkBoxChecked[val.id]}        
        //               onValueChange={() => this.checkBoxChanged(val.id, this.state.checkBoxChecked[val.id])}        
        //             />        
        //           </View >        
        //         )        
        //       }
        //     )
            
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
                    <List>
                        <ListItem avatar>
                            <Left>
                                {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                                <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />
                            </Left>
                            <Body>
                                <Text style={styles.font1}>Kumar Pratik</Text>
                            </Body>
                            <Right>
                                <CheckBox
                                    value={this.state.checked1}
                                    onValueChange={() => this.setState({ checked1: !this.state.checked1 })}
                                />
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                                <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />
                            </Left>
                            <Body>
                                <Text style={styles.font1}>Kumar Pratik</Text>
                            </Body>
                            <Right>
                                <CheckBox
                                    value={this.state.checked2}
                                    onValueChange={() => this.setState({ checked2: !this.state.checked2 })}
                                />
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                                <Ionicons name="ios-contact" size={screenHeight * 0.05} color="black" />
                            </Left>
                            <Body>
                                <Text style={styles.font1}>Kumar Pratik</Text>
                            </Body>
                            <Right>
                                <CheckBox
                                    value={this.state.checked3}
                                    onValueChange={() => this.setState({ checked3: !this.state.checked3 })}
                                />
                            </Right>
                        </ListItem>
                    </List>
                </View>
                <View style={styles.card1}>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToHome}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Company Details </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 6, borderRadius: 20, marginTop: 10, height: 32 }}
                            onPress={this.goToEmployees}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Employees </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToStock}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Stock </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToReportTab}
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
        bottom: 10,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})


