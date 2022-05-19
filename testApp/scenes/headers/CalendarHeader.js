
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    
} from 'react-native';


const CalendarHeader = () => {
    return(
        <View style={{alignItems: 'center'}}>
            <View style={{aligneItems: 'center', flexDirection: 'row'}}>
                
                <Text style={styles.titleText}>
                    <Text style={styles.titleText}>
                    {'CALENDAR'}
                    </Text>
                </Text>
                
            </View>
            
        </View>
    );
}
const styles = StyleSheet.create({
    titleText: {
        marginTop: 50,
        fontSize: 35,
        fontFamily: "Montserrat-SemiBold"
        
    }

    
  });
export default CalendarHeader;