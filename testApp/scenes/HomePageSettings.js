import { AuthErrorCodes } from '@firebase/auth';
import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import SegmentedControl from 'rn-segmented-control'
import Colors from '../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePageSettings = ({navigation}) => {
    const [topSelection, setTopSelection] = React.useState(0);
    const [bottomSelection, setBottomSelection] = React.useState(0);
    const save = async () => {
        try {
            await AsyncStorage.setItem('HomePageTopOption', topSelection)
            await AsyncStorage.setItem('HomepageBottom', bottomSelection)
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <View style={styles.mainContainer}>
            <SegmentedControl
                tabs={['Events', 'Notif..', 'Service']}
                currentIndex = {topSelection}
                containerStyle={{
                    paddingVertical: 5
                }}
                textStyle={{fontSize: 16}}
                onChange={setTopSelection}
            />
            <SegmentedControl
                tabs={['Events', 'Notif..', 'Service']}
                currentIndex = {bottomSelection}
                containerStyle={{
                    paddingVertical: 5,
                    marginTop: 15,
                }}
                textStyle={{fontSize: 16}}
                onChange={setBottomSelection}
            />
            <Pressable style={styles.saveButton} onPress={() => save()}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable style={styles.exitButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Exit</Text>
            </Pressable>
        </View>
    )
}

export default HomePageSettings

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 50,
    },
    saveButton:{
        width: 100,
        height: 50,
        backgroundColor: Colors.BLUE,
        borderRadius: 5,
        borderColor: Colors.BLACK,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 7
    },
    exitButton:{
        width: 100,
        height: 50,
        backgroundColor: Colors.BLUE,
        borderRadius: 5,
        borderColor: Colors.BLACK,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 7
    },
    buttonText:{
        color: Colors.WHITE,

    },
})
