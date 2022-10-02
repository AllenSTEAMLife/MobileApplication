import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getUserData() {
    var userEmail = await AsyncStorage.getItem('userEmail');
    var userName = await AsyncStorage.getItem('userName');
    if (userEmail == null) {
        userEmail = "";
        await AsyncStorage.setItem('userEmail', '');
    }
    if (userName == null) {
        userName = "";
        await AsyncStorage.setItem('userName', '');
    }
    console.log("this email: "+userEmail);
    return [userEmail, userName];
};