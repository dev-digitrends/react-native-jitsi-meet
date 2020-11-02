import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Content,
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
import moment from 'moment';
import Loader from '../../components/Loader';
import {ViewUtils} from '../../Utils';
import ImagePicker from 'react-native-image-picker';
import {Configs} from '../../Configs';
import {DatePicker} from 'react-native-propel-kit';
import {Roles} from '../.././Configs';

export default class UploadIllustrations extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      image: null,
      imageUrl: '',
      salutation: '',
      firstName: '',
      lastName: '',
      speciality: '',
      address1: '',
      address2: '',
      doctorCode: '',
      city: '',
      country: '',
      mobile: '',
      dateOfBirth: '',
      data: [],
      role: '',
      user: {
        personalDetails: {},
      },
    };
  }

  handleChoosePhoto = () => {
    if (this.state.imageUrl != '') {
      var options = {
        title: '',
        customButtons: [{name: 'remove', title: 'Remove Profile Image'}],
        noData: true,
        storageOption: {
          skipBackup: true,
          path: 'images',
        },
      };
    } else {
      var options = {
        title: '',
        noData: true,
        storageOption: {
          skipBackup: true,
          path: 'images',
          waitUntilSaved: true,
          cameraRoll: true,
        },
      };
    }

    ImagePicker.showImagePicker(options, response => {

      
      console.warn('Response = ', response);

      if (response.didCancel) {
        console.warn('User Tapped cancel');
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        this.setState({imageUrl: ''});
      } else if (response.err) {
        console.warn('Image Picker Error ', err);
      } else {
        const fileData = new FormData();
        fileData.append('uploadFile', {
          name: response.fileName,
          type: response.type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', ''),
        }),
          Api.instance()
            .uploadImage(fileData)
            .then(response => {
              console.warn('reponse ==>', JSON.stringify(response));
              this.setState({
                imageUrl: Api.instance().getMediaUrl(
                  Configs.containers.images,
                  response.result.files.uploadFile[0].name,
                ),
              });
            })
            .catch(err => {
              console.warn('Error', err)
            }) 
            
      }
    });
  };

  saveImage = () => {
    let data = {
      salutation: this.state.salutation,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.user.email,
      speciality: this.state.speciality,
      imageUrl: this.state.imageUrl,
      personalDetails: {
        city: this.state.city,
        country: this.state.country,
        dateOfBirth: this.state.dateOfBirth,
        mobile: this.state.mobile,
      },
    };

    this.setState({
      isLoading: true,
    });
    Api.instance()
      .updateProfile(data)
      .then(response => {
        console.warn('data =====>', response);
        // this.props.navigation.navigate('PatientProfile')
        this.props.navigation.goBack();

        ViewUtils.showToast('Profile has been updated successfully!');
        console.warn('dataaaaaaaaaa ===>', data);
      })
      .catch(err => {
        //ViewUtils.showToast(err);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  componentDidMount() {
    Api.instance()
      ._user()
      .then(user => {
        if (user == null) return;
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName,
          salutation: user.salutation,
          speciality: user.speciality,
          doctorCode: user.doctorCode,
          city: user.personalDetails.city,
          country: user.personalDetails.country,
          mobile: user.personalDetails.mobile,
          dateOfBirth: user.personalDetails.dateOfBirth,
          imageUrl: user.imageUrl,
        });
      })
      .catch(err => {
        //ViewUtils.showToast(err)
      });
<<<<<<< HEAD
=======

    Api.instance()
      .getUserRole()
      .then(role => this.setState({role}));
>>>>>>> e1a7792eb4f9595aa522080dd2bbeda36707e3a3
  }

  render() {
    const speciality = [
      {value: 'General Practice', viewValue: 'General Practice'},
      {value: 'Allergy Medicine', viewValue: 'Allergy Medicine'},
      {
        value: 'Audiological Medicine',
        viewValue: 'Audiological Medicine',
      },
      {value: 'Acute Medicine', viewValue: 'Acute Medicine'},
      {value: '  Clinical Genetics', viewValue: '  Clinical Genetics'},
      {
        value: '  Clinical Neurophysiology',
        viewValue: ' Clinical Neurophysiology',
      },
      {value: ' Cardiology', viewValue: '  Cardiology'},
      {value: '  Clinical', viewValue: '  Clinical'},
      {value: '   Pharmacology', viewValue: '   Pharmacology'},
      {value: '  Dermatology', viewValue: '  Endocrinology and Diabetes'},
      {value: '    Gastroenterology', viewValue: '   Gastroenterology'},
      {value: '   General Internal', viewValue: '  General Internal'},
      {value: '  Medicine', viewValue: ' Medicine'},
      {
        value: '  Genito-Urinary Medicine',
        viewValue: '  Genito-Urinary Medicine',
      },
      {value: '  Geriatric', viewValue: '  Geriatric'},
      {value: '  Infectious Diseases', viewValue: '  Infectious Diseases'},
      {value: '  Intensive Care', viewValue: '  Intensive Care'},
      {value: '  Medical Oncology', viewValue: '  Medical Oncology'},
      {value: '  Medical Ophthalmology', viewValue: '  Medical Ophthalmology'},
      {value: '  Neurology', viewValue: '  Neurology'},
      {
        value: '   Occupational Medicine',
        viewValue: '   Occupational Medicine',
      },
      {value: '   Palliative Medicine', viewValue: '   Palliative Medicine'},
      {
        value: '   Pharmaceutical medicine',
        viewValue: '   Pharmaceutical medicine',
      },
      {
        value: '   Rehabilitation medicine',
        viewValue: '   Rehabilitation medicine',
      },
      {value: '  Renal', viewValue: '  Renal'},
      {value: '  medicine - Nephrology', viewValue: '  medicine - Nephrology'},
      {value: '   Respiratory medicine', viewValue: '   Respiratory medicine'},
      {value: '  Rheumatology', viewValue: '  Rheumatology'},
      {value: '  Sport and Exercise', viewValue: '  Sport and Exercise'},
      {
        value: '  Obstetrics and Gynaecology',
        viewValue: '  Obstetrics and Gynaecology',
      },
      {
        value: '  Ophthalmology - Eye surgery',
        viewValue: '  Ophthalmology - Eye surgery',
      },
      {value: '  Paediatrics', viewValue: '  Paediatrics'},
      {value: '   Child Health', viewValue: '   Child Health'},
      {value: '   Pathology', viewValue: '   Pathology'},
      {value: '   Chemical Pathology', viewValue: '   Chemical Pathology'},
      {value: '    Haematology', viewValue: '    Haematology'},
      {value: '   Histopathology', viewValue: '   Histopathology'},
      {
        value: '     Microbiology and Virology',
        viewValue: '     Microbiology and Virology',
      },
      {value: '     Psychiatry', viewValue: '     Psychiatry'},
      {value: '    Child Psychiatry', viewValue: '    Child Psychiatry'},
      {value: '   Pathology', viewValue: '   Pathology'},
      {value: '    Forensic Psychiatry', viewValue: '    Forensic Psychiatry'},
      {
        value: '   General Adult Psychiatry',
        viewValue: '   General Adult Psychiatry',
      },
      {
        value: '      Old Age Psychiatry',
        viewValue: '      Old Age Psychiatry',
      },
      {
        value: '   Psychiatry of Learning Disability',
        viewValue: '   Psychiatry of Learning Disability',
      },
      {value: '   Psychotherapy', viewValue: '   Psychotherapy'},
      {value: '    Public Health', viewValue: '    Public Health'},
      {value: '   Radiology', viewValue: '   Radiology'},
      {value: '    Clinical Radiology', viewValue: '    Clinical Radiology'},
      {
        value: '   Interventional Radiology',
        viewValue: '   Interventional Radiology',
      },
      {value: '     Nuclear Medicine', viewValue: '     Nuclear Medicine'},
      {
        value: '       Cardiothoracic Surgery',
        viewValue: '       Cardiothoracic Surgery',
      },
      {
        value: '     General Surgery Neurosurgery',
        viewValue: '     General Surgery Neurosurgery',
      },
      {
        value: '    Oral and Maxillofacial Surgery',
        viewValue: '    Oral and Maxillofacial Surgery',
      },
      {
        value: '    Otolaryngology - Ear Nose Throat',
        viewValue: '   Otolaryngology - Ear Nose Throat',
      },
      {value: '     Paediatric Surgery', viewValue: '      Paediatric Surgery'},
      {value: '     Plastic Surgery', viewValue: '   Plastic Surgery'},
      {
        value: '      Trauma and Orthopaedic Surgery',
        viewValue: '     Trauma and Orthopaedic Surgery',
      },
      {
        value: '    Urology - Renal or Kidney Surgery',
        viewValue: '   Urology - Renal or Kidney Surgery',
      },
      {value: '      Clinical Oncology', viewValue: '      Clinical Oncology'},
    ];

    const {image} = this.state;
    return (
      <View style={[CommonStyles.container]}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/bwback.png')}>
          <View style={{flex: 2.3}}>
            <Text
              style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
              <Text
                style={[
                  CommonStyles.textSizeLarge,
                  CommonStyles.textColorWhite,
                ]}>{`Edit Profile\n`}</Text>
              <Text
                style={[
                  CommonStyles.textSizeSmall,
                  CommonStyles.textColorWhite,
                ]}>
                Edit your Profile{' '}
              </Text>
            </Text>
          </View>

          <View style={{flex: 8, paddingHorizontal: 18, marginTop: 33}}>
            <KeyboardAwareScrollView
              style={[{backgroundColor: '#fff', borderRadius: 5}]}>
              <TouchableOpacity
                onPress={() => {
                  this.handleChoosePhoto();
                }}
                style={{marginVertical: 20, alignSelf: 'center'}}>
                {this.state.imageUrl == '' ? (
                  <Icon
                    name="user-edit"
                    type="FontAwesome5"
                    style={{fontSize: 70}}
                  />
                ) : (
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#E3E3E3',
                      borderRadius: 60,
                    }}>
                    <Image
                      source={{
                        uri: this.state.imageUrl,
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                )}
              </TouchableOpacity>

              <Item
                picker
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {marginTop: 30},
                ]}>
                <Picker
                  mode="dropdown"
                  textStyle={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                  iosIcon={<Icon name="arrow-down" />}
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.salutation}
                  onValueChange={txt => this.setState({salutation: txt})}>
                  <Picker.Item
                    color="gray"
                    selected={true}
                    label="Select Salutation"
                    value=""
                  />
                  <Picker.Item label="Mr" value="Mr" />
                  <Picker.Item label="Dr" value="Dr" />
                  <Picker.Item label="Mrs" value="Mrs" />
                  <Picker.Item label="Miss" value="Miss" />
                </Picker>
              </Item>

              <Item
                stackedLabel
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {marginTop: 20},
                ]}>
                <Label
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                  ]}>
                  {' '}
                  First Name*
                </Label>
                <Input
                  value={this.state.firstName}
                  onChangeText={val => this.setState({firstName: val})}
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                />
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
                  {' '}
                  Last Name*
                </Label>
                <Input
                  value={this.state.lastName}
                  onChangeText={val => this.setState({lastName: val})}
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                />
              </Item>
              {this.state.role == Roles.doctor && (
                <Item
                  picker
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {marginTop: 30},
                  ]}>
                  <Picker
                    mode="dropdown"
                    textStyle={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                    iosIcon={<Icon name="arrow-down" />}
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.speciality}
                    onValueChange={txt => this.setState({speciality: txt})}>
                    {speciality.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.value.trim()}
                          value={item.value.trim()}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </Item>
              )}

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
                  {' '}
                  City
                </Label>
                <Input
                  value={this.state.city}
                  onChangeText={val => this.setState({city: val})}
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                />
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
                  {' '}
                  Country
                </Label>
                <Input
                  value={this.state.country}
                  onChangeText={val => this.setState({country: val})}
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                />
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
                  {' '}
                  Mobile
                </Label>
                <Input
                  keyboardType={'number-pad'}
                  value={this.state.mobile}
                  onChangeText={val => this.setState({mobile: val})}
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                />
              </Item>

              <Item style={[CommonStyles.container, CommonStyles.itemStyle]}>
                <DatePicker
                  placeholder="Date of Birth"
                  placeholderTextColor="#000000"
                  intialValue={moment(this.state.dateOfBirth).format('L')}
                  onChange={val => this.setState({dateOfBirth: val})}
                />
                <Icon active name="calendar" style={{marginLeft: 20}} />
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
                this.saveImage();
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
                UPDATE
              </Text>
            </TouchableOpacity>
          </View>
          <Loader loading={this.state.isLoading} />
          <View style={[CommonStyles.backButtonStyle]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon
                name="arrow-back"
                type="MaterialIcons"
                style={{fontSize: 26, color: '#FFF'}}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
