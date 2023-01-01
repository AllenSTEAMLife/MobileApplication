import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../assets/colors/Colors';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

const HomePageHeader = () => {
    return (
        <View style={{flex: 1, alignItems: 'center' }}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text style={styles.titleText}>
                    <Text style={[styles.subTitleText,{color: Colors.GREEN}]}>
                    S
                    </Text>
                    <Text style={[styles.subTitleText,{color: Colors.BLUE}]}>
                    T
                    </Text><Text style={[styles.subTitleText,{color: Colors.PURPLE}]}>
                    E
                    </Text><Text style={[styles.subTitleText,{color: Colors.YELLOW}]}>
                    A
                    </Text><Text style={[styles.subTitleText,{color: Colors.RED}]}>
                    M 
                    </Text>
                    <Text style={{color: Colors.BLACK, fontFamily: 'Montserrat-Medium'}}>
                    {' LIFE'}
                    </Text>
                </Text>
            </View>
            
        </View>
    )
}

/*
<View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 2, backgroundColor: Colors.GRAY, marginTop: 6, marginLeft: 10, marginRight: 10}} />
            </View>
*/

export default HomePageHeader

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin"
      },
      titleText: {
          marginTop: 50,
          fontSize: 24,
          fontFamily: "Montserrat-ExtraBold"
      },
      subTitleText: {
        fontSize: 32,
      }
})
