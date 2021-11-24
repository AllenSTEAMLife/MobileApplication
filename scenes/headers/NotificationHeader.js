import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NotificationHeader = () => {
    return (
        <View style={{alignItems: 'center' }}>
            <View style={{aligneItems: 'center', flexDirection: 'row'}}>
                
                <Text style={styles.titleText}>
                    <Text style={styles.titleText}>
                    {'NOTFICATIONS'}
                    </Text>
                </Text>
                
            </View>
            
        </View>
    )
}

export default NotificationHeader

const styles = StyleSheet.create({
    titleText: {
        marginTop: 50,
        fontSize: 30,
        fontFamily: "Montserrat-SemiBold"
        
    }
})
