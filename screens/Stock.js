
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import CheckboxFormX from 'react-native-checkbox-form';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, CheckBox } from 'react-native'
import { List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { Searchbar } from 'react-native-paper';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

var tempCheckValues = [];
const selectall = [
    {
        label: 'Select All',
        value: 'one'
    },
];
const selectone = [
    {
        label: '',
        value: 'one'
    },
];
export default class Stock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstQuery: '',
            checkBoxChecked: []
        };
    }
    _onSelect = (item) => {
        console.log(item);
    };
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

    goToStockAdd = () => this.props.navigation.navigate('StockAdd');
    goToStockEdit = () => this.props.navigation.navigate('StockAdd');
    goToHome = () => this.props.navigation.navigate('Home');
    goToEmployees = () => this.props.navigation.navigate('Employees');
    goToStock = () => this.props.navigation.navigate('Stock');
    goToReportTab = () => this.props.navigation.navigate('ReportTab');
    render() {
        const { firstQuery } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <TouchableOpacity
                        style={{ width: 0.15 * screenWidth }}
                        onPress={this.goToStockAdd}
                    >
                        <Ionicons name="md-add" size={screenHeight * 0.04} color="#2684ff" />
                    </TouchableOpacity>
                    <Text style={styles.font2}>Stocks</Text>
                    <TouchableOpacity
                        style={{ width: 0.15 * screenWidth }}
                        onPress={this.goToStockEdit}
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
                                <Ionicons name="ios-car" size={screenHeight * 0.05} color="black" />
                            </Left>
                            <Body>
                                <Text style={styles.font1}>Stock1</Text>
                            </Body>
                            <Right>
                                <CheckboxFormX
                                    style={{ width: 30 }}
                                    dataSource={selectone}
                                    itemShowKey="label"
                                    itemCheckedKey="RNchecked"
                                    iconSize={30}
                                    formHorizontal={true}
                                    // labelHorizontal={true}
                                    onChecked={(item) => this._onSelect(item)}
                                />
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                                <Ionicons name="ios-car" size={screenHeight * 0.05} color="black" />
                            </Left>
                            <Body>
                                <Text style={styles.font1}>Stock2</Text>
                            </Body>
                            <Right>
                                <CheckboxFormX
                                    style={{ width: 30 }}
                                    dataSource={selectone}
                                    itemShowKey="label"
                                    itemCheckedKey="RNchecked"
                                    iconSize={30}
                                    formHorizontal={true}
                                    // labelHorizontal={true}
                                    onChecked={(item) => this._onSelect(item)}
                                />
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                                <Ionicons name="ios-car" size={screenHeight * 0.05} color="black" />
                            </Left>
                            <Body>
                                <Text style={styles.font1}>Stock3</Text>
                            </Body>
                            <Right>
                                <CheckboxFormX
                                    style={{ width: 30 }}
                                    dataSource={selectone}
                                    itemShowKey="label"
                                    itemCheckedKey="RNchecked"
                                    iconSize={30}
                                    formHorizontal={true}
                                    // labelHorizontal={true}
                                    onChecked={(item) => this._onSelect(item)}
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


