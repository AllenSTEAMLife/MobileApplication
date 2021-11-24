import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import SegmentedControl from 'rn-segmented-control';
import ServiceItem from '../assets/models/serviceItem';
import ServiceListItem from '../assets/models/serviceListItem';
import Header from './headers/ServicePageHeader';


const ServiceScreen = () => {
    const [tabIndex, setTabIndex] = React.useState(4);
    const handleTabChange = (index) => {
        setTabIndex(index);
    };
    
    test = new ServiceItem('Science', 'Homecoming Thursday!', 'Test event for the purposes of this page. Do not actually show up for a fake Homecoming this Thursday. -AISD staff/Aryan Bhuta');
    testTwo = new ServiceItem('Art', 'Signed up for Service Hours', 'Hey User! You’ve signed up for “Service Hour appointment” today! Don’t forget to show up and earn those hours!');
    testThree = new ServiceItem('Tech', 'Makerspace Requests', 'The makerspace needs students to watch the 3D printers for research purposes. Up to 3 hours. AISD Staff/Marketplace. Link:');
    s = [test, testTwo, testThree];
    services = [];
    for (let i = 0; i < s.length; i++) {
        if (tabIndex==4) {
            if (s[i].type == 'Other') {
                services.push(s[i])
            }
        } else if (tabIndex==3){
            if (s[i].type == 'Math') {
                services.push(s[i])
            }
        } else if (tabIndex==2){
            if (s[i].type == 'Art') {
                services.push(s[i])
            }
        } else if (tabIndex==1){
            if (s[i].type == 'Tech') {
                services.push(s[i])
            }
        } else if (tabIndex==0){
            if (s[i].type == 'Science') {
                services.push(s[i])
            }
        }

    }
    
    return(
        <LinearGradient colors={['#ffffff','#ffffff','#ffffff','#a6c4ff', '#2585f6']} style={styles.gradientStyle}>
            <View style={{ flex: 1, alignItems: 'center'}}>
                <Header />  
                <SegmentedControl
                    tabs={["Science", "Tech", "Art", "Math", "Other"]}
                    textStyle={{fontSize: 15}}
                    onChange={() => {}}
                    paddingVertical={6}
                    containerStyle={{
                        marginVertical: 20,
                        
                    }}
                    currentIndex={tabIndex}
                    onChange={handleTabChange}

                />
                <FlatList 
                    style = {{flex: 5}}
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator={false}
                    data = {services}
                    renderItem={({item}) => <ServiceListItem title={item.title} message={item.message} type={item.type}/>} 
                />
            </View>
        </LinearGradient>
    );
}

export default ServiceScreen

const styles = StyleSheet.create({
    gradientStyle: {
        flex: 1,
        zIndex: 0,
        paddingBottom: 50,
        
        width: '100%'
    }
})
