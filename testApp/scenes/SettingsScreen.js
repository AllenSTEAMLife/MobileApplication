import * as React from 'react';
import react from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Pressable,
  FlatList,
  Switch,
  Linking,
  ImagePickerIOS,
  TouchableOpacity,
  Platform
} from 'react-native';
export const isAndroid = () => Platform.OS === 'android';

import Colors from '../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import SettingsHeader from './headers/SettingsHeader';

/*import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';*/
//import * as Google from "expo-google-app-auth";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { TokenTypeHint } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const SettingsScreen = ({ navigation }) => {
  //const [googleInit, setGoogleInit] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [signInTxt, setSignInTxt] = React.useState("Sign In");
  const [signInTimes, setSignInTimes] = React.useState(0);
  const [signOutTxt, setSignOutTxt] = React.useState("Sign Out");
  const [signOutTimes, setSignOutTimes] = React.useState(0);
  const [showSignOut, setShowSignOut] = React.useState(false);
  //state = { user: null };

  

  var firstTime = true;

  const getUserDetails = async () => {
    var userEmail = "";
    var userName = "";
    try {
      userEmail = await AsyncStorage.getItem('userEmail');
      userName = await AsyncStorage.getItem('userName');
    } catch (error) { console.log("error: "+error); }
    if (userEmail != undefined && userName != undefined) {
      setShowSignOut(true);
    }
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
      getUserData();
    }
    if (firstTime) {
      setShowSignOut(false);
      firstTime = false;
      getUserDetails();
    }
  }, [response]);

  const setUserDetails = async (userEmail, userName) => {
    try {
      await AsyncStorage.setItem('userEmail', `${userEmail}`);
      await AsyncStorage.setItem('userName', `${userName}`);
    } catch (error) { console.log("error: "+error); }
  }

  const getUserData = async () => {
    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    userInfoResponse.json().then(data => {
      setUserInfo(data);
      
      setUserDetails(data.email, data.name);
    });
    setSignInTimes(signInTimes+1);
    if (signInTimes == 1) {
      setSignInTxt("Sign In");
      setShowSignOut(true);
    }
  }

  const signOut = async () => {
    try {
      await AuthSession.revokeAsync({ token: accessToken }, { revocationEndpoint: 'https://oauth2.googleapis.com/revoke' });
      setUserDetails('', '');
      setAccessToken(null);
      setSignOutTxt("Sign Out");
    } catch (error) { console.log(error); }
  };

  const ShowViewLimited = (props) => {
    const { show, styling, children } = props;
    if (!show) {
        return (
            <View style={{ display:'none' }}></View>
        );
    }
    return (
        <View style={ styling }>
            { children }
        </View>
    );
  }

  return (
    <View>
      <View style={styles.spacing}>
      </View>
      <View style={styles.background}>
        <SettingsHeader />
        <View style={styles.user}>
          <Image style={styles.userIcon} source={require('../assets/images/steamLifeIcon.png')} />
          <Pressable style={styles.signinoutButton} onPress={accessToken ? getUserData : () => { setSignInTimes(0);promptAsync({showInRecents: true});setSignInTxt("Confirm Sign In"); }}>
            <Text style={styles.signText}>{ signInTxt }</Text>
          </Pressable>
        </View>
        <View style={styles.settingCategoryC}>
          <Text style={styles.settingCategory}>User Settings</Text>
        </View>
        <View style={styles.optionView}>
          <Pressable style={{ width: '100%' }} onPress={() => { Linking.openURL('https://life.allencs.org/login') }}>
            <View>
              <Text style={styles.optionText}>Web Dashboard</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.optionView}>
          <Pressable style={{ width: '100%' }} onPress={() => { Linking.openURL('https://life.allencs.org/privacy-policy') }}>
            <View>
              <Text style={styles.optionText}>Privacy Policy</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.optionView}>
          <Pressable style={{ width: '100%' }} onPress={() => { Linking.openURL('https://life.allencs.org/terms') }}>
            <View>
              <Text style={styles.optionText}>Terms of Service</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.optionView}>
          <Pressable style={{ width: '100%' }} onPress={() => { Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSfbNEmd550_KIxMN7WiWmv8QjlpEix9WSwne2OnYT3uhgvWSA/viewform') }}>
            <View>
              <Text style={styles.optionText}>Feedback</Text>
            </View>
          </Pressable>
        </View>
        <ShowViewLimited show={showSignOut} styling={styles.optionView}>
          <Pressable onPress={accessToken ? () => {signOut();} : () => {setShowSignOut(false);console.log("already signed out");} }>
            <Text style={styles.optionText}>{ signOutTxt }</Text>
          </Pressable>
        </ShowViewLimited>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  spacing: {
    width: '100%',
    height: 20,
    backgroundColor: '#d0e0ff',
  },
  background: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#d0e0ff',
  },
  user: {
    paddingTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },

  userIcon: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 20,
    backgroundColor: 'white'
  },
  signinoutButton: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BLACK,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 15,
    paddingHorizontal: 14,
    padding: 10,
    alignItems: 'center'
  },
  signText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  optionView: {
    width: '96%',
    height: 44,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 6,
    borderRadius: 10
  },
  optionText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  settingCategoryC: {
    width: '96%',
    marginTop: 10,
    padding: 6
  },
  settingCategory: {
    fontSize: 30,
    fontFamily: 'Montserrat-SemiBold',
  },
});
export default SettingsScreen;