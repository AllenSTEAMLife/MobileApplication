import * as React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NotificationHeader from './headers/NotificationHeader';
import SegmentedControl from 'rn-segmented-control';
import notification from '../assets/models/notification';
import NotifcationItem from '../assets/models/notificationItem';
import Colors from '../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import { getUserData } from '../assets/models/userSignInfo';

const NotificationScreen = () => {
    const [tabIndex, setTabIndex] = React.useState(3);
    const [addEventsFirst, setAddEventsFirst] = React.useState(1);
    const [updateEvent, setUpdateEvent] = React.useState(true);
    const [updateService, setUpdateService] = React.useState(true);
    const [updateComm, setUpdateComm] = React.useState(true);
    const [commData, setCommData] = React.useState([]);
    const [clubOData, setClubOData] = React.useState([]);
    const [eventData, setEventData] = React.useState([]);
    const [serviceData, setServiceData] = React.useState([]);
    const [notificationItems, setNotificationItems] = React.useState([]);
    const [usersEmail, setUsersEmail] = React.useState("");
    const [usersName, setUsersName] = React.useState("");
    const [usersClubs, setUsersClubs] = React.useState([]);
    const [usersService, setUsersService] = React.useState([]);

    const handleTabChange = (index) => {
        setTabIndex(index);
        setUpdateEvent(true);
        setUpdateComm(true);
        setUpdateService(true);
    };

    function findClubName(clubArr, clubId) {
        for (var index = 0; index < clubArr.length; index++) {
            if (clubArr[index]["ID"] == clubId) {
                return clubArr[index]["Club-Name"];
            }
        }
        return "";
    }
    function clubInArray(clubArr, clubId) {
        for (var index = 0; index < clubArr.length; index++) {
            if ((clubArr[index] == clubId) || (clubArr[index] == "All")) {
                return true;
            }
        }
        if (clubId == 0) { return true; }
        return false;
    }
    function sortItems(thisDataArr) {
        var latestDate = new Date(0, 0, 0, 0, 0, 0, 0);
        for (var index = 0; index < thisDataArr.length; index++) {
            latestDate = new Date(0, 0, 0, 0, 0, 0, 0);
            for (var index2 = index; index2 < thisDataArr.length; index2++) {
                var thisStartDateArr = thisDataArr[index2].date.split(",")[0].split("/");
                var thisStartTimeArr = thisDataArr[index2].date.split(",")[1].split(":");
                var thisDate = new Date(thisStartDateArr[2], thisStartDateArr[0], thisStartDateArr[1], thisStartTimeArr[0], thisStartTimeArr[1], 0, 0);
                if (thisDate > latestDate) {
                    latestDate = thisDate;
                    var tempItem = thisDataArr[index];
                    thisDataArr[index] = thisDataArr[index2];
                    thisDataArr[index2] = tempItem;
                }
            }
        }
        return thisDataArr;
    }

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
                    let eventClubId = event["Club"];
                    var startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0);
                    var endDateFound = false;
                    var endDate = new Date();
                    try {
                        let endDateArr = event["End-Date"].split("/");
                        endDate = new Date(parseInt(endDateArr[2]), parseInt(endDateArr[0]) - 1, parseInt(endDateArr[1], 23, 59, 59, 0));
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
                                if (usersEmail != "" && usersEmail != null) {
                                    if (clubInArray(usersClubs, eventClubId)) {
                                        events.push(newEventItem);
                                    }
                                } else {
                                    events.push(newEventItem);
                                }
                            }
                        }
                    }
                    else {
                        if ((startDate <= today) && (endDate >= today)) {
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
                                if (usersEmail != "" && usersEmail != null) {
                                    if (clubInArray(usersClubs, eventClubId)) {
                                        events.push(newEventItem);
                                    }
                                } else {
                                    events.push(newEventItem);
                                }
                            }
                        }
                    }
                });
                setNotificationItems(prevNotifs => (sortItems([...prevNotifs, ...events])));
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
                    let serviceId = service["ID"];
                    var startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0);
                    var endDateFound = false;
                    var endDate = new Date();
                    try {
                        let endDateArr = service["End-Date"].split("/");
                        endDate = new Date(parseInt(endDateArr[2]), parseInt(endDateArr[0]) - 1, parseInt(endDateArr[1], 23, 59, 59, 0));
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
                            var newServiceItem = new notification(service["Service-Name"], thisType, dateString, service["Description"]);
                            if (tabIndex == 0 || tabIndex == 3) {
                                if (usersEmail != "" && usersEmail != null) {
                                    if (clubInArray(usersService, serviceId)) {
                                        services.push(newServiceItem);
                                    }
                                } else {
                                    services.push(newServiceItem);
                                }
                            }
                        }
                    }
                    else {
                        if ((startDate <= today) && (endDate >= today)) {
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
                            var newServiceItem = new notification(service["Service-Name"], thisType, dateString, service["Description"]);
                            if (tabIndex == 0 || tabIndex == 3) {
                                if (usersEmail != "" && usersEmail != null) {
                                    if (clubInArray(usersService, serviceId)) {
                                        services.push(newServiceItem);
                                    }
                                } else {
                                    services.push(newServiceItem);
                                }
                            }
                        }
                    }
                });
                setNotificationItems(prevNotifs => (sortItems([...prevNotifs, ...services])));
            }
        } catch (error) { console.log("new error: " + error); }
    }
    function checkInArr(arrayData, checkData) {
        for (var index = 0; index < arrayData.length; index++) {
          if (arrayData[index] == checkData) {
            return true;
          }
        }
        return false;
      }
    const updateComms = (dataArr, clubsOverallData) => {
        var comms = [];
        try {
            if (dataArr.length > 0) {
                dataArr.forEach(comm => {
                    let commId = comm["ID"];
                    let commClubId = comm["Club-ID"];
                    var thisType = "AN";
                    if (comm["Announcement"] != "True") {
                        thisType = "DM";
                    }
                    var thisClubName = findClubName(clubsOverallData, comm["Club-ID"]);
                    var completeMessage = comm["Creator"]+": "+comm["Message"];
                    var commTimingStr = comm["Created-At"]+",";
                    var newCommItem = new notification(thisClubName, thisType, commTimingStr, completeMessage, true);
                    if ((tabIndex == 2 || tabIndex == 3) && ((comm["Announcement"] == "True" || parseInt(comm["Announcement"]) == 1) || (checkInArr(comm["To-Members"], usersEmail)))) {
                        if (usersEmail != "" && usersEmail != null) {
                            if (clubInArray(usersClubs, commClubId)) {
                                comms.push(newCommItem);
                            }
                        }
                    }
                });
                setNotificationItems(prevNotifs => (sortItems([...prevNotifs, ...comms])));
            }
        } catch (error) { console.log("new error: " + error); }
    }

    const getEvents = async () => {
        try {
            const response = await fetch('https://life.allencs.org/events/json');
            const json = await response.json();
            const eventDatas = json["Items"];
            setEventData(eventDatas);
            var userEmail = "";
            var userName = "";
            getUserData().then((data) => {
                try {
                    setUsersEmail(data[0]);
                    userEmail = data[0];
                    setUsersName(data[1]);
                    userName = data[1];
                } catch (error) { console.log("error: "+error); }
            });
            const response2 = await fetch('https://life.allencs.org/user/json?userAuthorized=true');
            const clubJson = await response2.json();
            const usersArr = clubJson["Items"];
            var userClub = [];
            var userService = [];
            for (var index = 0; index < usersArr.length; index++) {
                if (usersArr[index]["User-Email"] == userEmail) {
                    userClub = usersArr[index]["Clubs-Joined"];
                    userService = usersArr[index]["Service"];
                }
            }
            setUsersClubs(userClub);
            setUsersService(userService);
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
            const response = await fetch('https://life.allencs.org/service/json');
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
    const getOverallClubs = async () => {
        try {
            const response = await fetch('https://life.allencs.org/clubs/json');
            const json = await response.json();
            const clubDatas = json["Items"];
            setClubOData(clubDatas);
        } catch (error) {
            console.error(error);
        }
    }
    const getMessages = async () => {
        try {
            const response = await fetch('https://life.allencs.org/comm/json');
            const json = await response.json();
            const commDatas = json["Items"];
            setCommData(commDatas);
        } catch (error) {
            console.error(error);
        }
        if (commData.length > 0 && updateComm) {
            updateComms(commData, clubOData);
            setUpdateComm(false);
        }
    }

    React.useEffect(() => {
        setNotificationItems([]);
        getEvents();
        getServices();
        getOverallClubs();
        getMessages();
    }, [tabIndex]);

    return (
        <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff', '#a6c4ff', '#2585f6']} style={styles.gradientStyle}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <NotificationHeader />
                <SegmentedControl
                    tabs={["Service", "Events", "Campus", "All"]}
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
                    renderItem={({ item }) => <NotifcationItem title={item.title} date={item.date} message={item.message} type={item.type} onlyNotif={item.onlyNotif} />}
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
