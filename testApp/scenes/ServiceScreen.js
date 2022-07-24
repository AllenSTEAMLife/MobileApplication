import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import SegmentedControl from 'rn-segmented-control';
import ServiceItem from '../assets/models/serviceItem';
import ServiceListItem from '../assets/models/serviceListItem';
import Header from './headers/ServicePageHeader';

const ServiceScreen = () => {
    const [tabIndex, setTabIndex] = React.useState(2);
    const [data, setData] = React.useState([]);
    const [serviceItems, setServiceItems] = React.useState([]);

    var updateService = true;

    const handleTabChange = (index) => {
        setTabIndex(index);
    };

    const getServices = async () => {
        try {
            const response = await fetch('https://roboticsdev1584.github.io/RetroCycle/Assets/service.json');
            const json = await response.json();
            const serviceData = json["Items"];
            setData(serviceData);
        } catch (error) {
            console.error(error);
        }
        if (data.length > 0 && updateService) {
            updateServices(data);
            updateService = false;
        }
    }

    const steamType = (typeStr) => {
        if (typeStr == "s" || typeStr == "t" || typeStr == "e" || typeStr == "a" || typeStr == "m" || typeStr == "steam") {
            return true
        }
        return false;
    }

    const updateServices = (dataArr) => {
        var services = [];
        var today = new Date();
        var yesterday = new Date(today.setDate(today.getDate() - 1));
        today.setDate(today.getDate() + 1);
        try {
            if (dataArr.length > 0) {
                dataArr.forEach(service => {
                    let dayArr = service["Start-Date"].split("/");
                    let day = dayArr[1];
                    let month = dayArr[0];
                    let year = dayArr[2];
                    var startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0);
                    var endDateFound = false;
                    var endDate = new Date();
                    try {
                        let endDateArr = service["End-Date"].split("/");
                        endDate = new Date(parseInt(endDateArr[2]), parseInt(endDateArr[0]) - 1, parseInt(endDateArr[1], 23, 59, 59, 0));
                        endDateFound = true;
                    } catch (error) { console.log("had error: " + error); }
                    if (!endDateFound) {
                        if (startDate > yesterday) {
                            var thisType = service["Type"].toUpperCase();
                            if (thisType == "") {
                                thisType = "O";
                            }
                            var dateString = "";
                            try {
                                dateString += service["Start-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["Start-Time"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["End-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["End-Time"];
                            } catch (error) { dateString += " "; }
                            var newServiceItem = new ServiceItem(thisType, service["Service-Name"], service["Hours"], dateString, service["Description"]);
                            thisType = service["Type"].toLowerCase();
                            if (tabIndex == 0) {
                                if (steamType(thisType)) {
                                    services.push(newServiceItem)
                                }
                            } else if (tabIndex == 1) {
                                if (!steamType(thisType)) {
                                    services.push(newServiceItem)
                                }
                            } else if (tabIndex == 2) {
                                services.push(newServiceItem)
                            }
                        }
                    } else {
                        if (endDate > yesterday) {
                            var thisType = service["Type"].toUpperCase();
                            if (thisType == "") {
                                thisType = "O";
                            }
                            var dateString = "";
                            try {
                                dateString += service["Start-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["Start-Time"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["End-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["End-Time"];
                            } catch (error) { dateString += " "; }
                            var newServiceItem = new ServiceItem(thisType, service["Service-Name"], service["Hours"], dateString, service["Description"]);
                            thisType = service["Type"].toLowerCase();
                            if (tabIndex == 0) {
                                if (steamType(thisType)) {
                                    services.push(newServiceItem)
                                }
                            } else if (tabIndex == 1) {
                                if (!steamType(thisType)) {
                                    services.push(newServiceItem)
                                }
                            } else if (tabIndex == 2) {
                                services.push(newServiceItem)
                            }
                        }
                    }
                });
            }
        } catch (error) { console.log("new error: " + error); }
        setServiceItems(services);
    }

    React.useEffect(() => {
        getServices();
    }, [tabIndex]);

    return (
        <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff', '#a6c4ff', '#2585f6']} style={styles.gradientStyle}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Header />
                <SegmentedControl
                    tabs={["STEAM", "Other", "All"]}
                    textStyle={{ fontSize: 15 }}
                    //onChange={(index) => {handleTabChange(index)}}
                    paddingVertical={6}
                    containerStyle={{
                        marginVertical: 20,
                    }}
                    currentIndex={tabIndex}
                    onChange={handleTabChange}
                />
                <FlatList
                    style={{ flex: 5 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={serviceItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ServiceListItem title={item.title} date={item.date} hours={item.hours} message={item.message} type={item.type} />}
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
