import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  DatePicker,
  Text,
  Item,
  Label,
  Input,
  ScrollableTab,
  Icon,
  Picker,
  Form,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import Loader from '../../components/Loader';
import {ViewUtils} from '../../Utils';

export default class RefertoSpecialistAdd extends Component {
  constructor(props) {
    super(props);
    if (this.props.route.params) {
      this.state = {
        isLoading: false,
        name: '',
        description: '',
        specialists:[],
        doctorEmail:'',
        data: [],
        appointmentId: this.props.route.params.appointmentId,
        patientId: this.props.route.params.patientId,
      };
    } else {
      this.state = {
        isLoading: false,
        name: '',
        description: '',
        data: [],
      };
    }
  }

  _getSpecialists(){
    this.setState({ isLoading: true });
    Api.instance().getSpecialists()
    .then((data) => {          
        this.setState({ specialists: data, doctorEmail: data[0].email });
    }
    ).catch(err => console.log(err))
    .finally(() => {
        this.setState({ isLoading: false });
    })
  }


  componentDidMount(){
      this._getSpecialists();
  }


  _addReferredSpecialist = () => {
    let data = {
      setupType: 'referToSpecialist',
      name: this.state.doctorEmail,
      description: this.state.description,
    };

    if (this.state.doctorEmail != '') {
      this.setState({isLoading: true});
      Api.instance()
        .createMedication(data)
        .then(response => {
          this.props.route.params.onRefertoSpecialistAdd();
          this.props.navigation.goBack();
          ViewUtils.showToast('Referred successfully!');
        })
        .catch(err => {
          ViewUtils.showAlert('Unable to Perform this Action');
        })
        .finally(() => {
          this.setState({isLoading: false});
        });
    } else {
      ViewUtils.showAlert('Please Provide Specialist Email');
    }
  };

  _setSpecialists(){
      
    let doctorEmail = this.state.specialists.map((x) => x.email)
    
    return(
        doctorEmail.map((x) => {
            return(
                <Picker.Item label={x} value={x} />
            )
        })
    )
    
  }

  render() {
    if (this.state.appointmentId != null) {
      return (
        <View style={{height: '75%'}}>
          <ImageBackground
            style={[CommonStyles.container, CommonStyles.backgroundImage]}
            source={require('../../assets/img/background.png')}>
            <View style={{flex: 3, backgroundColor: '#297dec'}}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.headingTextStyle,
                ]}>
                <Text
                  style={[
                    CommonStyles.textSizeLarge,
                    CommonStyles.textColorWhite,
                  ]}>{`Add\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  It is a list of your all booking patients{' '}
                </Text>
              </Text>
            </View>

            <View style={{flex: 8, paddingHorizontal: 18, marginTop: 33}}>
              <KeyboardAwareScrollView
                style={[{backgroundColor: '#fff', borderRadius: 5}]}>
                <Item
                  picker
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {marginVertical: 10, paddingTop: 10},
                  ]}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Choose Frequency"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.doctorEmail}
                    onValueChange={val => { this.setState({ doctorEmail: val }) }}
                  >
                      {this._setSpecialists()}
                 
                  </Picker>
                </Item>

                <Item
                  stackedLabel
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {marginTop: 10},
                  ]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    More Details
                  </Label>
                  <Input
                    value={this.state.notes}
                    onChangeText={val => this.setState({description: val})}
                    multiline={true}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
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
                  borderColor: '#FFF',
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  this._addReferredSpecialist();
                }}
                style={[
                  CommonStyles.container,
                  CommonStyles.centerText,
                  {borderRightWidth: 0.5, borderColor: '#cfd2d6'},
                ]}>
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeNormal,
                    CommonStyles.centerText,
                    CommonStyles.margin,
                    CommonStyles.padding,
                    {opacity: 0.5},
                  ]}>
                  ADD
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
          <ImageBackground
            style={[CommonStyles.container, CommonStyles.backgroundImage]}
            source={require('../../assets/img/bwback.png')}>
            <View style={{flex: 2.3}}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.headingTextStyle,
                ]}>
                <Text
                  style={[
                    CommonStyles.textSizeLarge,
                    CommonStyles.textColorWhite,
                  ]}>{`Add\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  It is a list of your all booking patients{' '}
                </Text>
              </Text>
            </View>

           
            <View style={{flex: 8, paddingHorizontal: 18, marginTop: 33}}>
              <KeyboardAwareScrollView
                style={[{backgroundColor: '#fff', borderRadius: 5}]}>
                <Item
                  picker
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {marginVertical: 10, paddingTop: 10},
                  ]}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Choose Frequency"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.doctorEmail}
                    onValueChange={val => { this.setState({ doctorEmail: val }) }}
                  >
                      {this._setSpecialists()}
                  
                  </Picker>
                </Item>

                <Item
                  stackedLabel
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {marginTop: 10},
                  ]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    More Details
                  </Label>
                  <Input
                    value={this.state.notes}
                    onChangeText={val => this.setState({description: val})}
                    multiline={true}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
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
                  borderColor: '#FFF',
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  this._addReferredSpecialist();
                }}
                style={[
                  CommonStyles.container,
                  CommonStyles.centerText,
                  {borderRightWidth: 0.5, borderColor: '#cfd2d6'},
                ]}>
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeNormal,
                    CommonStyles.centerText,
                    CommonStyles.margin,
                    CommonStyles.padding,
                    {opacity: 0.5},
                  ]}>
                  ADD
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
