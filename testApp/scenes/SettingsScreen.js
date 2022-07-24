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
    TouchableOpacity
} from 'react-native';

import Colors from '../assets/colors/Colors';
import { auth, signInWithGoogle } from '../firebase';
import UserPermissions from '../assets/utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../firebase';
import { ref } from "firebase/storage";

const SettingsScreen = ({ navigation }) => {




    return (
        <View>
            <View style={styles.spacing}>
            </View>
            <View style={styles.background}>
                <View style={styles.user}>
                    <Image style={styles.userIcon} source={require('../assets/images/steamLifeIcon.png')} />
                    <Pressable style={styles.signinoutButton} onPress={() => { }}>
                        <Text style={styles.signText}>Sign In</Text>
                    </Pressable>
                </View>
                <View style={styles.settingCategoryC}>
                    <Text style={styles.settingCategory}>User Settings</Text>
                </View>
                <View style={styles.optionView}>
                    <Pressable style={{ width: '100%' }} onPress={() => { Linking.openURL('https://life.allencs.org/dashboard') }}>
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
                    <Pressable>
                        <Text style={styles.optionText}>Sign Out</Text>
                    </Pressable>
                </View>
                <View style={styles.optionView}>
                    <Pressable style={{ width: '100%' }} onPress={() => { Linking.openURL('https://forms.gle/JrvYqouQmeJisK916') }}>
                        <View>
                            <Text style={styles.optionText}>Feedback</Text>
                        </View>
                    </Pressable>
                </View>
                
                <View style={styles.optionView}>
                    <Pressable>
                        <Text style={styles.optionText}>Delete Account</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    spacing: {
        width: '100%',
        height: 50,
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
        backgroundColor:'white'
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
        fontSize:18,
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