import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../assets/colors/Colors';

const HomePageHeader = () => {
    return (
        <View style={{flex: 1, alignItems: 'center' }}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                
                <Text style={styles.titleText}>
                    <Text style={{color: Colors.GREEN}}>
                    S
                    </Text>
                    <Text style={{color: Colors.BLUE}}>
                    T
                    </Text><Text style={{color: Colors.PURPLE}}>
                    E
                    </Text><Text style={{color: Colors.YELLOW}}>
                    A
                    </Text><Text style={{color: Colors.RED}}>
                    M 
                    </Text>
                    <Text style={{color: Colors.BLACK, fontFamily: 'Montserrat-Medium'}}>
                    {' LIFE'}
                    </Text>
                </Text>
                
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 2, backgroundColor: Colors.GRAY, marginTop: 10, marginLeft: 10, marginRight: 10}} />
            </View>
        </View>
    )
}

export default HomePageHeader

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin"
      },
      titleText: {
          marginTop: 50,
          fontSize: 40,
          fontFamily: "Montserrat-ExtraBold"
          
      }
})
