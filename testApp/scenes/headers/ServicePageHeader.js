import * as React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Colors from '../../assets/colors/Colors';



const Header = () => {
    return(
        <View style={{alignItems: 'center' }}>
            <Text style={styles.titleText}>
                <Text style={{color: Colors.PURPLE}}>
                    SERVICE
                </Text>
            </Text>
            
        </View>
    );
}
const styles = StyleSheet.create({
    baseText: {
      fontFamily: "Cochin"
    },
    titleText: {
        marginTop: 50,
        fontSize: 40,
        fontFamily: "Montserrat-SemiBold"
        
    }

    
  });
export default Header;