import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import CommonStyles from '../../CommonStyles';
import { Configs } from '../../Configs';

export default class BookingList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            checked: true
        };
    }
    render() {
        const main = [
            { name: 'SHAZ QURESHI', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: 'Patients' },
            { name: 'SHAZ QURESHI', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
        ];

        return (
            <View style={[CommonStyles.container]}>

                <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>

                    <View style={[CommonStyles.container,
                    CommonStyles.padding,
                    { flex: 2, }
                    ]}>
                        <Text style={{ color: '#FFFFFF', paddingLeft: 12, marginTop: '15%' }}>
                            <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeLarge,]} >{`Available\n`}</Text>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>It is a list of your all booking patients </Text>u
                        </Text>
                    </View> 
                    <View style={{ flex: 8, paddingHorizontal: 2}} >
                        <FlatGrid
                            itemDimension={320}
                            items={main}
                            style={[CommonStyles.container,
    
                            ]}
                            renderItem={({ item }) => (

                                <TouchableOpacity style={[CommonStyles.container, CommonStyles.shadow]}
                                    onPress={() => { this.props.navigation.navigate(`${item.route}`) }}
                                >
                                    <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/drawable-mdpi/Fill-1.png')}>

                                        <View style={[CommonStyles.container, { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 5 }]}>

                                            <View style={[CommonStyles.container, { justifyContent: 'space-around' }]}>
                                                <Text>
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Patient Name\n`}</Text>
                                                    <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>{item.name}</Text>
                                                </Text>

                                                <Text style={[CommonStyles.textSizeAverage, { color: '#333333' }]}>
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{`Time: `}</Text>
                                                    <Text style={CommonStyles.fontMedium}>{item.time}</Text>
                                                </Text>
                                            </View>
                                            <View style={[CommonStyles.container, { justifyContent: 'space-around' }]}>
                                                <View style={[CommonStyles.container, { justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 10 }]}>
                                                    <CheckBox
                                                        containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0.0)', borderColor: 'rgba(52, 52, 52, 0.0)', marginRight: -12 }}
                                                        textStyle={[CommonStyles.textSizeSmall, { color: '#497C12', fontWeight: '600' }]}
                                                        iconRight
                                                        iconType='material'
                                                        checkedIcon='check-box'
                                                        uncheckedIcon='add'
                                                        checkedColor='#9CD85B'
                                                        uncheckedColor='#9CD85B'
                                                        title='Accepted'
                                                        checked={this.state.checked}
                                                    />
                                                    <Text style={{ marginBottom: 6 }}>
                                                        <Text style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular, { color: '#333333' }]}>{`Date: `}</Text>
                                                        <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333' }]}>{item.date}</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}