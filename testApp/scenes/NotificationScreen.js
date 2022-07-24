import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NotificationHeader from './headers/NotificationHeader';
import SegmentedControl from 'rn-segmented-control';
import notification from '../assets/models/notification';
import NotifcationItem from '../assets/models/notificationItem';
import Colors from '../assets/colors/Colors';

const NotificationScreen = () => {
    const [tabIndex, setTabIndex] = React.useState(3);
    const [addEventsFirst, setAddEventsFirst] = React.useState(1);
    const [updateEvent, setUpdateEvent] = React.useState(true);
    const [updateService, setUpdateService] = React.useState(true);
    const [eventData, setEventData] = React.useState([]);
    const [serviceData, setServiceData] = React.useState([]);
    const [notificationItems, setNotificationItems] = React.useState([]);
    const handleTabChange = (index) => {
        setTabIndex(index);
        setUpdateEvent(true);
        setUpdateService(true);
    };

    const updateEvents = (dataArr) => {
        var events = [];
        var today = new Date();
        var yesterday = new Date(today.setDate(today.getDate() - 1));
        today.setDate(today.getDate() + 1);
        try {
            if (dataArr.length > 0) {
                dataArr.forEach(event => {
                    let dayArr = event["Start-Date"].split("/");
                    let day = dayArr[1];
                    let month = dayArr[0];
                    let year = dayArr[2];
                    var startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0);
                    var endDateFound = false;
                    var endDate = new Date();
                    try {
                        let endDateArr = event["End-Date"].split("/");
                        endDate = new Date(parseInt(endDateArr[2]), parseInt(endDateArr[0])-1, parseInt(endDateArr[1], 23, 59, 59, 0));
                        endDateFound = true;
                    } catch (error) { console.log("had error: " + error); }
                    if (!endDateFound) {
                        if (startDate <= today && startDate > yesterday) {
                            var dateString = "";
                            try {
                                dateString += event["Start-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += event["Start-Time"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += event["End-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += event["End-Time"];
                            } catch (error) { dateString += " "; }
                            var newEventItem = new notification(event["Event-Name"], "O", dateString, event["Description"]);
                            if (tabIndex == 1 || tabIndex == 3) {
                                events.push(newEventItem);
                            }
                        }
                    }
                    else {
                        if ((startDate <= today && startDate > yesterday) && (endDate >= today)) {
                            var dateString = "";
                            try {
                                dateString += event["Start-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += event["Start-Time"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += event["End-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += event["End-Time"];
                            } catch (error) { dateString += " "; }
                            var newEventItem = new notification(event["Event-Name"], "O", dateString, event["Description"]);
                            if (tabIndex == 1 || tabIndex == 3) {
                                events.push(newEventItem);
                            }
                        }
                    }
                });
                setNotificationItems(prevNotifs => ([...prevNotifs, ...events]));
            }
        } catch (error) { console.log("new error: " + error); }
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
                        endDate = new Date(parseInt(endDateArr[2]), parseInt(endDateArr[0])-1, parseInt(endDateArr[1], 23, 59, 59, 0));
                        endDateFound = true;
                    } catch (error) { console.log("had error: " + error); }
                    if (!endDateFound) {
                        if (startDate <= today && startDate > yesterday) {
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
                            var thisType = service["Type"].toUpperCase();
                            if (thisType == "") {
                                thisType = "O";
                            }
                            console.log("here: "+service);
                            var newServiceItem = new notification(service["Service-Name"], thisType, dateString, service["Description"]);
                            if (tabIndex == 0 || tabIndex == 3) {
                                services.push(newServiceItem);
                            }
                        }
                    }
                    else {
                        console.log("found end");
                        console.log("today: "+today);
                        console.log("startDate: "+startDate);
                        console.log("endDate: "+endDate);
                        if ((startDate <= today && startDate > yesterday) && (endDate >= today)) {
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
                            var thisType = service["Type"].toUpperCase();
                            if (thisType == "") {
                                thisType = "O";
                            }
                            console.log("here2: "+service);
                            var newServiceItem = new notification(service["Service-Name"], thisType, dateString, service["Description"]);
                            if (tabIndex == 0 || tabIndex == 3) {
                                services.push(newServiceItem)
                            }
                        }
                    }
                });
                setNotificationItems(prevNotifs => ([...prevNotifs, ...services]));
            }
        } catch (error) { console.log("new error: " + error); }
    }

    const getEvents = async () => {
        try {
            const response = await fetch('https://roboticsdev1584.github.io/RetroCycle/Assets/events.json');
            const json = await response.json();
            const eventDatas = json["Items"];
            setEventData(eventDatas);
        } catch (error) {
            console.error(error);
        }
        if (eventData.length > 0 && updateEvent) {
            updateEvents(eventData);
            setUpdateEvent(false);
        }
    }
    const getServices = async () => {
        try {
            const response = await fetch('https://roboticsdev1584.github.io/RetroCycle/Assets/service.json');
            const json = await response.json();
            const serviceDatas = json["Items"];
            setServiceData(serviceDatas);
        } catch (error) {
            console.error(error);
        }
        if (serviceData.length > 0 && updateService) {
            updateServices(serviceData);
            setUpdateService(false);
        }
    }

    React.useEffect(() => {
        setNotificationItems([]);
        getEvents();
        getServices();
    }, [tabIndex]);

    return (
        <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff', '#a6c4ff', '#2585f6']} style={styles.gradientStyle}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <NotificationHeader />
                <SegmentedControl
                    tabs={["Service", "Events", "Campus", "All"]}
                    //onChange={() => {}}
                    paddingVertical={6}
                    containerStyle={{
                        marginVertical: 20,
                    }}
                    currentIndex={tabIndex}
                    onChange={handleTabChange}
                    textStyle={{ fontSize: 15 }}
                />
                <FlatList
                    style={{ flex: 5 }}
                    data={notificationItems}
                    renderItem={({ item }) => <NotifcationItem title={item.title} date={item.date} message={item.message} type={item.type} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </LinearGradient>
    );
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
