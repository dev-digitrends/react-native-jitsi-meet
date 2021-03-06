import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import CommonStyles from '../../CommonStyles';
import {Item, Input, Container, Picker, Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Api from '../../Api';
import {ViewUtils} from '../../Utils';
import Loader from '../../components/Loader';

class Create extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            password: '',
            confirmPasword: '',
            drCode: '',
        };
    }

    _registerPatient = () => {

        /*  {
              "username": "superadmin@gmail.com",
              "doctorCode": 114986,
              "password": "abc123",
              "personalDetails": {
              "country": "Pakistan",
                  "postalCode": "",
                  "address2": "",
                  "address1": ""
          },
              "qualifications": [],
              "specialities": [],
              "expertise": [],
              "assistants": [
              ""
          ],
              "credit": 20,
              "previousEmployments": [],
              "presentEmployments": [],
              "role": "MEDICAL_SPECIALIST"
          }*/


        let data = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password,
            "confirmPasword": this.state.confirmPasword,
            "username": this.state.firstName + this.state.lastName,
            "personalDetails": {
                "gender": this.state.gender,
                "country": "Pakistan",
                "postalCode": "",
                "address2": "",
                "address1": ""
            },
            "qualifications": [],
            "specialities": [],
            "expertise": [],
            "assistants": [""],
            "credit": "",
            "previousEmployments": [],
            "presentEmployments": [],
            "role": "ROLE_PATIENT"
        }




        Api.instance()
            .patientRegister(data,this.state.drCode)
            .then(response => {
                // this.addToConsultation(data);
                // this.props.navigation.goBack()
                ViewUtils.showToast('Registeration Successfully!');
                console.warn(data)
                this.props.navigation.goBack();

            })
            .catch(err => {
                ViewUtils.showToast('Invalid Field');
            })
            .finally(() => {
                this.setState({isLoading: false});
            });
    };

    render() {
        return (
            <View style={[CommonStyles.container]}>
                <ImageBackground
                    style={[CommonStyles.container, CommonStyles.backgroundImage]}
                    source={require('../../assets/img/loginbg.png')}>
                    <KeyboardAwareScrollView style={CommonStyles.container}>
                        <View
                            style={[
                                CommonStyles.margin,
                                {paddingTop: 30, paddingHorizontal: 10},
                            ]}>
                            <Text
                                style={[
                                    CommonStyles.fontMedium,
                                    {
                                        fontSize: 32,
                                        color: '#FFF',
                                    },
                                ]}>
                                Registration
                            </Text>
                            <Text
                                style={[
                                    CommonStyles.textSizeNormal,
                                    CommonStyles.textColorWhite,
                                    {marginTop: 5},
                                ]}>
                                Enter your details to register for EvoTelemedicine
                            </Text>

                            {/* <Image
                style={[CommonStyles.mt30, { width: 96, height: 123 }]}
                source={require('../../assets/img/layer_2.png')}
              />
 */}


                            <View style={{marginTop: 60}}>

                                <View style={[CommonStyles.container, CommonStyles.horizontalContainer,]}>

                                    <Item regular
                                          style={[CommonStyles.container, CommonStyles.loginItemStyle, {marginRight: 5}]}>
                                        <Input
                                            value={this.state.firstName}
                                            onChangeText={val => this.setState({firstName: val})}
                                            name="username"
                                            placeholder={'First Name*'}
                                            placeholderTextColor="#FFF"
                                            returnKeyType="next"
                                            autoCapitalize="none"
                                            selectionColor="#fff"
                                            autoCompleteType="email"
                                            keyboardType="email-address"
                                            style={[
                                                CommonStyles.fontMedium,
                                                CommonStyles.textColorWhite,
                                                CommonStyles.textSizeNormal,
                                            ]}
                                        />
                                    </Item>

                                    <Item regular
                                          style={[CommonStyles.container, CommonStyles.loginItemStyle, {marginLeft: 5}]}>
                                        <Input
                                            value={this.state.lastName}
                                            onChangeText={val => this.setState({lastName: val})}
                                            name="username"
                                            placeholder={'Last Name*'}
                                            placeholderTextColor="#FFF"
                                            returnKeyType="next"
                                            autoCapitalize="none"
                                            selectionColor="#fff"
                                            autoCompleteType="email"
                                            keyboardType="email-address"
                                            style={[
                                                CommonStyles.fontMedium,
                                                CommonStyles.textColorWhite,
                                                CommonStyles.textSizeNormal,
                                            ]}
                                        />
                                    </Item>

                                </View>

                                <Item regular
                                      picker
                                      style={[
                                          CommonStyles.container,
                                          CommonStyles.loginItemStyle,
                                          CommonStyles.mt10,

                                      ]}>
                                    <Picker

                                        textStyle={{color: "#fff"}}
                                        itemTextStyle={{color: 'red'}}
                                        style={{color: '#fff',}}
                                        itemStyle={{backgroundColor: '#fff'}}
                                        placeholder="Gender*"
                                        placeholderStyle={{color: '#FFF'}}
                                        placeholderIconColor="#fff"
                                        selectedValue={this.state.gender}

                                        onValueChange={txt => this.setState({gender: txt})}>
                                        <Picker.Item
                                            color='grey'
                                            selected={false}
                                            label="Gender"
                                            value=""
                                        />

                                        <Picker.Item label="Male" value="Male"/>
                                        <Picker.Item label="Female" value="Female"/>

                                    </Picker>

                                    <Icon name="arrow-dropdown"
                                          style={{color: "#fff", position: 'absolute', right: 5,}}/>
                                </Item>


                                <Item regular style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                                    <Input
                                        value={this.state.email}
                                        onChangeText={val => this.setState({email: val})}
                                        placeholder={'Email Address*'}
                                        placeholderTextColor="#FFF"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        selectionColor="#fff"
                                        autoCompleteType="email"
                                        keyboardType="email-address"
                                        style={[
                                            CommonStyles.fontMedium,
                                            CommonStyles.textColorWhite,
                                            CommonStyles.textSizeNormal,
                                        ]}
                                    />
                                </Item>
                                <Item regular style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                                    <Input
                                        value={this.state.password}
                                        onChangeText={password => this.setState({password})}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        returnKeyType="done"
                                        selectionColor="#fff"
                                        autoCompleteType="password"
                                        textContentType="password"
                                        name="password"
                                        placeholder={'Password'}
                                        placeholderTextColor="#FFF"
                                        style={[
                                            CommonStyles.fontMedium,
                                            CommonStyles.textColorWhite,
                                            CommonStyles.textSizeNormal,
                                        ]}
                                    />
                                </Item>

                                <Item
                                    regular
                                    style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                                    <Input
                                        value={this.state.confirmPasword}
                                        onChangeText={val => this.setState({confirmPasword: val})}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        returnKeyType="done"
                                        selectionColor="#fff"
                                        autoCompleteType="password"
                                        textContentType="password"
                                        name="password"
                                        placeholder={'Confirm Password'}
                                        placeholderTextColor="#FFF"
                                        style={[
                                            CommonStyles.fontMedium,
                                            CommonStyles.textColorWhite,
                                            CommonStyles.textSizeNormal,
                                        ]}
                                    />
                                </Item>

                                <Item
                                    regular
                                    style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                                    <Input
                                        value={this.state.drCode}
                                        onChangeText={drCode => this.setState({drCode})}
                                        secureTextEntry={false}
                                        autoCapitalize="none"
                                        returnKeyType="done"
                                        selectionColor="#fff"
                                        autoCompleteType="password"
                                        textContentType="password"
                                        name="password"
                                        placeholder={'Enter Doctor Code'}
                                        placeholderTextColor="#FFF"
                                        passwordRules
                                        style={[
                                            CommonStyles.fontMedium,
                                            CommonStyles.textColorWhite,
                                            CommonStyles.textSizeNormal,
                                        ]}
                                    />
                                </Item>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ImageBackground>

                <View
                    style={[
                        CommonStyles.fitToBottom,
                        CommonStyles.horizontalContainer,
                        {
                            backgroundColor: '#eee',
                            borderTopRightRadius: 5,
                            borderTopStartRadius: 5,
                        },
                    ]}>
                    <TouchableOpacity
                        style={[CommonStyles.container, CommonStyles.centerText]}
                        onPress={() => {
                            this._registerPatient()
                        }}>
                        <Text
                            style={[
                                CommonStyles.fontRegular,
                                CommonStyles.textSizeNormal,
                                CommonStyles.centerText,
                                CommonStyles.margin,
                                CommonStyles.padding,
                                {opacity: 0.5},

                            ]}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default Create;


// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ImageBackground,
//   TextInput,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import CommonStyles from '../../CommonStyles';
// import { Item, Input, Container, Picker, Icon } from 'native-base';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
// import Api from '../../Api';
// import { ViewUtils } from '../../Utils';
// import Loader from '../../components/Loader';

// class Create extends Component {


//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: false,
//       firstName: '',
//       LastName: '',
//       gender: '',
//       email: '',
//       password: '',
//       confirmPasword: '',
//       drCode: '',
//     };
//   }

//   _registerPatient = () => {
//     let data = {
//        "doctorCode": this.state.drCode,
      
//       "password": this.state.password,
//       "confirmPassword": this.state.password,

//       "isActive": true,
//       "salutation": "",
//       "appointmentFees": 1000,
//       "fcmToken": "",
//       "mrNumber": "",
//       "TD4UNumber": "",
//       "firstName": this.state.firstName,
//       "cv": "",
//       "lastName": this.state.LastName,
//       "email": this.state.email,
//       "assistantId": "",
//       "bankAccount": "",
//       "bankTitle": "",
//       "bankName": "",
//       "secretaryEmail": "",
//       "speciality": "",
//       "timeZone": "",
//       "imageUrl": "",
//       "personalDetails": {
//         "gender": this.state.gender
//       },
//       "qualifications": [],
//       "specialities": [],
//       "expertise": {},
//       "presentEmployments": [],
//       "previousEmployments": [],
//       "username": this.state.firstName + this.state.LastName,
//       "role": "ROLE_PATIENT"

//     }


//     // Clients/upsertWithWhere?[where][email]=${data.email}
//     //this.setState({ isLoading: true })

//     Api.instance()
//       .patientRegister(data)
//       .then(response => {
//         // this.addToConsultation(data);
//         // this.props.navigation.goBack()
//         ViewUtils.showToast('Medication has been saved successfully!');
//         console.warn(data)
//       })
//       .catch(err => {
//         ViewUtils.showToast(err);
//       })
//       .finally(() => {
//         this.setState({ isLoading: false });
//       });
//   };

//   render() {
//     return (
//       <View style={[CommonStyles.container]}>
//         <ImageBackground
//           style={[CommonStyles.container, CommonStyles.backgroundImage]}
//           source={require('../../assets/img/loginbg.png')}>
//           <KeyboardAwareScrollView style={CommonStyles.container}>
//             <View
//               style={[
//                 CommonStyles.margin,
//                 { paddingTop: 30, paddingHorizontal: 10 },
//               ]}>
//               <Text
//                 style={[
//                   CommonStyles.fontMedium,
//                   {
//                     fontSize: 32,
//                     color: '#FFF',
//                   },
//                 ]}>
//                 Registration
//               </Text>
//               <Text
//                 style={[
//                   CommonStyles.textSizeNormal,
//                   CommonStyles.textColorWhite,
//                   { marginTop: 5 },
//                 ]}>
//                 Enter your  details to register for EvoTelemedicine
//               </Text>

//               {/* <Image
//                 style={[CommonStyles.mt30, { width: 96, height: 123 }]}
//                 source={require('../../assets/img/layer_2.png')}
//               />
//  */}


//               <View style={{ marginTop: 60 }}>

//                 <View style={[CommonStyles.container, CommonStyles.horizontalContainer,]}>

//                   <Item regular style={[CommonStyles.container, CommonStyles.loginItemStyle, { marginRight: 5 }]}>
//                     <Input
//                       value={this.state.firstName}
//                       onChangeText={val => this.setState({ firstName: val })}
//                       name="username"
//                       placeholder={'First Name*'}
//                       placeholderTextColor="#FFF"
//                       returnKeyType="next"
//                       autoCapitalize="none"
//                       selectionColor="#fff"
//                       autoCompleteType="email"
//                       keyboardType="email-address"
//                       style={[
//                         CommonStyles.fontMedium,
//                         CommonStyles.textColorWhite,
//                         CommonStyles.textSizeNormal,
//                       ]}
//                     />
//                   </Item>

//                   <Item regular style={[CommonStyles.container, CommonStyles.loginItemStyle, { marginLeft: 5 }]}>
//                     <Input
//                       value={this.state.LastName}
//                       onChangeText={val => this.setState({ LastName: val })}
//                       name="username"
//                       placeholder={'Last Name*'}
//                       placeholderTextColor="#FFF"
//                       returnKeyType="next"
//                       autoCapitalize="none"
//                       selectionColor="#fff"
//                       autoCompleteType="email"
//                       keyboardType="email-address"
//                       style={[
//                         CommonStyles.fontMedium,
//                         CommonStyles.textColorWhite,
//                         CommonStyles.textSizeNormal,
//                       ]}
//                     />
//                   </Item>

//                 </View>

//                 <Item regular
//                   picker
//                   style={[
//                     CommonStyles.container,
//                     CommonStyles.loginItemStyle,
//                     CommonStyles.mt10,

//                   ]}>
//                   <Picker

//                     textStyle={{ color: "#fff" }}
//                     itemTextStyle={{ color: 'red' }}
//                     style={{ color: '#fff', }}
//                     itemStyle={{ backgroundColor: '#fff' }}
//                     placeholder="Gender*"
//                     placeholderStyle={{ color: '#FFF' }}
//                     placeholderIconColor="#fff"
//                     selectedValue={this.state.gender}

//                     onValueChange={txt => this.setState({ gender: txt })}>
//                     <Picker.Item
//                       color='grey'
//                       selected={false}
//                       label="Gender"
//                       value=""
//                     />

//                     <Picker.Item label="Male" value="Male" />
//                     <Picker.Item label="Female" value="Female" />

//                   </Picker>

//                   <Icon name="arrow-dropdown" style={{ color: "#fff", position: 'absolute', right: 5, }} />
//                 </Item>



//                 <Item regular style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
//                   <Input
//                     value={this.state.email}
//                     onChangeText={val => this.setState({ email: val })}
//                     placeholder={'Email Address*'}
//                     placeholderTextColor="#FFF"
//                     returnKeyType="next"
//                     autoCapitalize="none"
//                     selectionColor="#fff"
//                     autoCompleteType="email"
//                     keyboardType="email-address"
//                     style={[
//                       CommonStyles.fontMedium,
//                       CommonStyles.textColorWhite,
//                       CommonStyles.textSizeNormal,
//                     ]}
//                   />
//                 </Item>
//                 <Item regular style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
//                   <Input
//                     value={this.state.password}
//                     onChangeText={password => this.setState({ password })}
//                     secureTextEntry
//                     autoCapitalize="none"
//                     returnKeyType="done"
//                     selectionColor="#fff"
//                     autoCompleteType="password"
//                     textContentType="password"
//                     name="password"
//                     placeholder={'Password'}
//                     placeholderTextColor="#FFF"
//                     passwordRules
//                     style={[
//                       CommonStyles.fontMedium,
//                       CommonStyles.textColorWhite,
//                       CommonStyles.textSizeNormal,
//                     ]}
//                   />
//                 </Item>

//                 <Item
//                   regular
//                   style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
//                   <Input
//                     value={this.state.confirmPasword}
//                     onChangeText={val => this.setState({ confirmPasword: val })}
//                     secureTextEntry
//                     autoCapitalize="none"
//                     returnKeyType="done"
//                     selectionColor="#fff"
//                     autoCompleteType="password"
//                     textContentType="password"
//                     name="password"
//                     placeholder={'Confirm Password'}
//                     placeholderTextColor="#FFF"
//                     passwordRules
//                     style={[
//                       CommonStyles.fontMedium,
//                       CommonStyles.textColorWhite,
//                       CommonStyles.textSizeNormal,
//                     ]}
//                   />
//                 </Item>

//                 <Item
//                   regular
//                   style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
//                   <Input
//                     value={this.state.drCode}
//                     onChangeText={drCode => this.setState({ drCode })}
//                     secureTextEntry
//                     autoCapitalize="none"
//                     returnKeyType="done"
//                     selectionColor="#fff"
//                     autoCompleteType="password"
//                     textContentType="password"
//                     name="password"
//                     placeholder={'Enter Doctor Code'}
//                     placeholderTextColor="#FFF"
//                     passwordRules
//                     style={[
//                       CommonStyles.fontMedium,
//                       CommonStyles.textColorWhite,
//                       CommonStyles.textSizeNormal,
//                     ]}
//                   />
//                 </Item>
//               </View>
//             </View>
//           </KeyboardAwareScrollView>
//         </ImageBackground>

//         <View
//           style={[
//             CommonStyles.fitToBottom,
//             CommonStyles.horizontalContainer,
//             {
//               backgroundColor: '#eee',
//               borderTopRightRadius: 5,
//               borderTopStartRadius: 5,
//             },
//           ]}>
//           <TouchableOpacity
//             style={[CommonStyles.container, CommonStyles.centerText]}
//             onPress={() => {
//               this._registerPatient();
//             }}>
//             <Text
//               style={[
//                 CommonStyles.fontRegular,
//                 CommonStyles.textSizeNormal,
//                 CommonStyles.centerText,
//                 CommonStyles.margin,
//                 CommonStyles.padding,
//                 { opacity: 0.5 },

//               ]}>
//               Submit
//             </Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     );
//   }
// }

// export default Create;
