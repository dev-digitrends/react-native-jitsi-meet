import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { Container, Header, Content,  Text, Item, Label, Input, ScrollableTab, Icon, Picker, Form } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles'
import Api from '../../Api';
import Loader from '../../components/Loader';
import { ViewUtils } from '../../Utils'

export default class InvestigationAdd extends Component {

    constructor(props) {
        super(props);
        if (this.props.route.params) {
            this.state = {
                isLoading: false,
                name: '',
                description: '',
                data: [],
                appointmentId: this.props.route.params.appointmentId,
                patientId: this.props.route.params.patientId,
            }
        } else {
            this.state = {
                isLoading: false,
                name: '',
                description: '',
                data: [],
              
            }
        }
    }

    _saveInvestigation = () => {
     
        if(this.state.appointmentId != null){
            
            let data = {
                // date: this.state.startDate,
                 // "setupId": "",
                 // "doctorId": "5f01d90dffd17912ce896c56",
                 // "assistantId": "",
                 patientId: this.state.patientId,
                 answer: this.state.name,
                 notes:this.state.description,
                // endDate: this.state.endDate,
                 'setup-type': 'requestMedication',
                 active: false,
               };

            if(this.state.name.trim() != ""){
                this.setState({ isLoading: true })
                Api.instance()
                .createPrescription(data)
                .then(response => {
                    this.addToConsultation(data);
                    this.props.route.params.onInvestigationAdd();
                    this.props.navigation.goBack();
                    ViewUtils.showToast('Investigation has been saved successfully!');
                })
                .catch(err => {
                    ViewUtils.showAlert(
                        'Unable to Perform this Action',       
                    );
                    //ViewUtils.showToast(err);
                })
                .finally(() => {
                    this.setState({ isLoading: false });
                });
            }else{
                ViewUtils.showToast(
                    'Please Provide Investigation Name',       
                );
            }

        }else{
               
            let data = {
                "setupType": "investigation",
                "name": this.state.name,
                "description": this.state.description,
            }

        if(this.state.name.trim() != ""){
            this.setState({ isLoading: true })
            Api.instance()
            .createMedication(data)
            .then(response => {
                this.props.route.params.onInvestigationAdd();
                this.props.navigation.goBack();
                //this.props.navigation.replace('InvestigationList');
                ViewUtils.showToast('Investigation has been saved successfully!');
            })
            .catch(err => {
                ViewUtils.showAlert(
                    'Unable to Perform this Action',       
                );
                //ViewUtils.showToast(err);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
        }else{
            ViewUtils.showToast(
                'Please Provide Investigation Name',       
            );
        }

        }
  
    };


    addToConsultation(item) {
        Api.instance()
          .addPrescribeMedication(
            item,
            this.state.appointmentId,
            this.state.patientId,
          )
    
          .then(response => {
            console.warn('response', response);
           
          })
          .catch(err => {})
          .finally(() => {});
      }

    render() {     
        if (this.state.appointmentId != null) {
            return (
                <View style={{ height: '75%' }}>
                <ImageBackground style={[
                    CommonStyles.container,
                    CommonStyles.backgroundImage
                ]}
                    source={require('../../assets/img/background.png')}>
                    <View style={
                        { flex: 3, backgroundColor: '#297dec' }
                    }>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Investigation Add\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>Add a new Investigation Record </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 20 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Investigation Name*</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ name: val })}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                                </Item>

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Description</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ description: val })}
                                        multiline={true}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                                </Item>
                            </KeyboardAwareScrollView>

                        </View>

                        <View
                            style={[
                                CommonStyles.fitToBottom,
                                CommonStyles.horizontalContainer,
                                {
                                    backgroundColor: '#F7FAFE',
                                    borderTopRightRadius: 5,
                                    borderTopStartRadius: 5,
                                    borderTopWidth: 3,
                                    borderColor: '#FFF'
                                },
                            ]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._saveInvestigation();
                                }}
                                style={[
                                    CommonStyles.container,
                                    CommonStyles.centerText,
                                    { borderRightWidth: 0.5, borderColor: '#cfd2d6' },
                                ]}
                            >
                                <Text
                                    style={[
                                        CommonStyles.fontRegular,
                                        CommonStyles.textSizeNormal,
                                        CommonStyles.centerText,
                                        CommonStyles.margin,
                                        CommonStyles.padding,
                                        { opacity: 0.5 },
                                    ]}>
                                    SAVE
                                 </Text>
                            </TouchableOpacity>
                        </View>

                        <Loader loading={this.state.isLoading} />

                        {/* <View
                            style={[
                                CommonStyles.backButtonStyle
                            ]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}>
                                <Icon
                                    name="arrow-back"
                                    type="MaterialIcons"
                                    style={{ fontSize: 26, color: '#FFF' }}
                                />
                            </TouchableOpacity>
                        </View> */}
                    </ImageBackground>
                </View>
            );
        } else {
            return (

                <View style={[CommonStyles.container]}>

                    <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>
                        <View style={{ flex: 2.3 }}>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Investigation Add\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>Add a new Investigation Record </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 20 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Investigation Name*</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ name: val })}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                                </Item>

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Description</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ description: val })}
                                        multiline={true}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                                </Item>
                            </KeyboardAwareScrollView>

                        </View>

                        <View
                            style={[
                                CommonStyles.fitToBottom,
                                CommonStyles.horizontalContainer,
                                {
                                    backgroundColor: '#F7FAFE',
                                    borderTopRightRadius: 5,
                                    borderTopStartRadius: 5,
                                    borderTopWidth: 3,
                                    borderColor: '#FFF'
                                },
                            ]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._saveInvestigation();
                                }}
                                style={[
                                    CommonStyles.container,
                                    CommonStyles.centerText,
                                    { borderRightWidth: 0.5, borderColor: '#cfd2d6' },
                                ]}
                            >
                                <Text
                                    style={[
                                        CommonStyles.fontRegular,
                                        CommonStyles.textSizeNormal,
                                        CommonStyles.centerText,
                                        CommonStyles.margin,
                                        CommonStyles.padding,
                                        { opacity: 0.5 },
                                    ]}>
                                    SAVE
                             </Text>
                            </TouchableOpacity>
                        </View>

                        <Loader loading={this.state.isLoading} />

                        {/* <View
                            style={[
                                CommonStyles.backButtonStyle
                            ]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}>
                                <Icon
                                    name="arrow-back"
                                    type="MaterialIcons"
                                    style={{ fontSize: 26, color: '#FFF' }}
                                />
                            </TouchableOpacity>
                        </View> */}
                    </ImageBackground>
                </View>
            );
        }

    }
}