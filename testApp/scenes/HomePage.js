import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import HomePageHeader from './headers/HomePageHeader'
const HomePage = () => {
    return (
        <View style={{flex: 1,alignItems: 'center'}}>
            <LinearGradient  colors={['#ffffff','#ffffff','#ffffff','#a6c4ff', '#2585f6']} style={styles.linearGradient}>
                <HomePageHeader />
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.homepageTopRectangle} />
                </View>
                <View style={{paddingVertical: 15}} />
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.homepageLeftSquare}></View>
                    <View style={{flex: 2}}/>
                    <View style={styles.homepageRightSquare}></View>
                </View>
                <View style={{paddingVertical: 15}} /> 
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.homepageBottomRectangle} >
                        <Text>Hello, World</Text>
                    </View>
                </View>
                <View style={{marginVertical: 15}} />            
            </LinearGradient>
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({
    homepageTopRectangle: {
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: "#80adf9",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
    },
    homepageLeftSquare: {
        marginLeft: 30,
        height: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: "#bfd6fb",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
    },
    homepageRightSquare: {
        marginRight: 30,
        height: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: "#bfd6fb",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
    },
    homepageBottomRectangle: {
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: "#d4e4fc",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
    },
    linearGradient: {
        flex: 1,
        zIndex: 0,
        paddingBottom: 50,
        
        width: '100%'
    }
})
