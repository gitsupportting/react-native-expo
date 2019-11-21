
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, CheckBox, ScrollView } from 'react-native'
import { List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { Searchbar } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

var tempCheckValues = [];
export default class ReportWorking extends React.Component {
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

    goToReportCancel = () => this.props.navigation.navigate('Employees');
    goToReportDone = () => this.props.navigation.navigate('Employees');

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
                        style={{ width: 0.15 * screenWidth, marginRight: 0.6 * screenWidth }}
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
                    <Text style={styles.font2}>Report Working Hours</Text>
                </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    value={firstQuery}
                    style={{ width: 0.9 * screenWidth, backgroundColor: '#f6f6f6', borderRadius: 8, marginTop: 20, marginBottom: 10 }}
                />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: screenWidth * 0.6 }}>
                    <CheckBox
                        value={this.state.checked}
                        styles={{ size: 10 }}
                        onValueChange={() => this.setState({ checked1: !this.state.checked1, checked2: !this.state.checked2, checked3: !this.state.checked3, checked: !this.state.checked })}
                    />
                    <Text style={{ fontSize: 14, color: '#3c3c3c', marginTop: screenHeight / 100 }}> Select All </Text>
                </View>
                <ScrollView style={styles.card}>
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
                    <View style={{marginLeft:screenWidth*0.17}}>
                        <TouchableOpacity
                            style={styles.button1}
                        // onPress={this.goToLogin}
                        >
                            <Text style={{ fontSize: 16, color: 'white' }}> Auto Report Working Hours </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button3}
                        // onPress={this.goToLogin}
                        >
                            <Text style={{ fontSize: 16, color: 'white' }}> Custom </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.card1}>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToMachines}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Company Details </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToMachines}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Employees </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.goToMachines}
                        >
                            <Text style={{ fontSize: 14, color: '#3c3c3c' }}> Stock </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 6, borderRadius: 20, marginTop: 10, height: 32 }}
                            onPress={this.goToMachines}
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
        marginTop: 10,
        backgroundColor: '#f6f6f6',
        width: screenWidth * 0.9,
        height: screenHeight * 0.56,
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
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})


