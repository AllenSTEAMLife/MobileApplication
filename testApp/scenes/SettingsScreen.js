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

    const [isServiceEnabled, setIsServiceEnabled] = useState(false);
    const [isEventsEnabled, setIsEventsEnabled] = useState(false);
    const toggleServiceSwitch = () => setIsServiceEnabled(previousState => !previousState);
    const toggleEventsSwitch = () => setIsEventsEnabled(previousState => !previousState);


    const handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        const userRef = ref(storage, result);
        auth.user.userIcon = userRef;
    }
    return (
        <View>
            <View style={styles.spacing}>
            </View>
            <View style={styles.background}>
                <View style={styles.user}>
                    <Image style={styles.userIcon} source={require('../assets/images/steamlogoblackonwhite.png')} />
                    <Pressable style={styles.signinoutButton} onPress={() => { }}>
                        <Text>Sign In/Out</Text>
                    </Pressable>
                </View>
                <View style={styles.settingCategoryC}>
                    <Text style={styles.settingCategory}>Content</Text>
                </View>
                <View style={styles.optionView}>
                    <Text style={[styles.optionText, styles.serviceText]}>Show Assigned Service Hours</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isServiceEnabled ? "#2196f3" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleServiceSwitch}
                        value={isServiceEnabled}
                    />
                </View>
                <View style={styles.optionView}>
                    <Text style={styles.optionText}>Show All Events</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEventsEnabled ? "#2196f3" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleEventsSwitch}
                        value={isEventsEnabled}
                    />
                </View>
                <View style={styles.optionView}>
                    <Pressable onPress={() => { handlePickAvatar }}>
                        <Text style={styles.optionText}>Change Avatar</Text>
                    </Pressable>
                </View>
                <View style={styles.optionView}>
                    <TouchableOpacity onPress={() => { navigation.navigate("HomePageSettings") }}>
                        <Text style={styles.optionText}>Home Page Settings</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.optionView}>
                    <Pressable style={{ width: '100%' }} onPress={() => { Linking.openURL('https://forms.gle/JrvYqouQmeJisK916') }}>
                        <View >
                            <Text style={styles.optionText}>Feedback</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.optionView}>
                    <Pressable >
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
    },
    signinoutButton: {
        paddingHorizontal: 50,
        height: 25,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.BLACK,
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 10,
        paddingTop: 2,
        alignItems: 'center'
    },
    signText: {

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