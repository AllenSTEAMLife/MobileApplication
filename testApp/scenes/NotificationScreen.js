import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import NotificationHeader from './headers/NotificationHeader'
import SegmentedControl from 'rn-segmented-control'
import notification from '../assets/models/notification'
import NotifcationItem from '../assets/models/notificationItem'
import Colors from '../assets/colors/Colors'

const NotificationScreen = () => {
    const [tabIndex, setTabIndex] = React.useState(3);
    const handleTabChange = (index) => {
        setTabIndex(index);
    };
    test = new notification('Event', 'Homecoming Thursday!', 'Test event for the purposes of this page. Do not actually show up for a fake Homecoming this Thursday. -AISD staff/Aryan Bhuta');
    testTwo = new notification('Service', 'Signed up for Service Hours', 'Hey User! You’ve signed up for “Service Hour appointment” today! Don’t forget to show up and earn those hours!');
    testThree = new notification('Campus', 'Applications for new stuff', 'The AISD office of                                          Secret Services is proud to present applications for clandestine oper- ahem, office workers. Bhuta, Aryan Bhuta, OSS director');
    s = [test, testTwo, testThree];
    notifications = [];
    for (let i = 0; i < s.length; i++) {
        if (tabIndex==3) {
            notifications = s }
            else if (tabIndex==2){ if (s[i].type == 'Campus') { notifications.push(s[i]) }
        } else if (tabIndex==1){
            if (s[i].type == 'Event') {
                notifications.push(s[i])
            }
        } else if (tabIndex==0){
            if (s[i].type == 'Service') {
                notifications.push(s[i])
            }
        }

    }
    
    return (
        <LinearGradient colors={['#ffffff','#ffffff','#ffffff','#a6c4ff', '#2585f6']} style={styles.gradientStyle}>
                <View style={{ flex: 1, alignItems: 'center'}}>
                    
                    <NotificationHeader/>
                    <SegmentedControl
                        tabs={["Service", "Events", "Campus", "All"]}
                        //onChange={() => {}}
                        paddingVertical={6}
                        containerStyle={{
                            marginVertical: 20,
                        }}
                        currentIndex={tabIndex}
                        onChange={handleTabChange}
                        textStyle={{fontSize: 15}}
                    />
                    
                    <FlatList 
                    style = {{flex: 5}}
                    data = {notifications}
                    renderItem={({item}) => <NotifcationItem title={item.title} message = {item.message} type={item.type}/>} 
                    keyExtractor = {(item, index) => index.toString()}
                    />
                </View>
        </LinearGradient>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    gradientStyle: {
        flex: 1,
        zIndex: 0,
        paddingBottom: 50,
        
        width: '100%'
    }
})
