import PAGE_ID from "./pagemanager";

export default class TimerPageManager{
    static DurationTotalDummy = {
        name: "Total Duration", 
        duration: "16:00",
        data_page: [{
            'title': "TITLE E-DETAILING NAME 1",
            'duration': "06:00",
            "pages": [{
                name: 'Title Page 1',
                duration: "01:00"
            }, {
                name: 'Title Page 2',
                duration: "04:00"
            }, {
                name: 'Title Page 3',
                duration: "01:00"
            }]
        }, {
            'title': "TITLE E-DETAILING NAME 2",
            'duration': "08:00",
            "pages": [{
                name: 'Title Page 1',
                duration: "02:00"
            }, {
                name: 'Title Page 2',
                duration: "04:00"
            }, {
                name: 'Title Page 3',
                duration: "02:00"
            }]
        }
        ]
    }

    static TotalDuration = {
        name:"Total Duration",
        duration:0,
        data_page:null
    }
    static templateDataModule={
        title:"",
        duration:0,
        pages:null,
    }

    static UserTimerData = [];
};

export function getTimerPage(idmodul=0,idpage=0) {
    console.log("bab ",TimerPageManager.UserTimerData[idmodul]);
    if(TimerPageManager.UserTimerData[idmodul] == undefined){
        TimerPageManager.UserTimerData[idmodul] = [PAGE_ID.getBabData(idmodul)];
        console.log("create bab ", TimerPageManager.UserTimerData[idmodul]);
        //page
        console.log("page ", TimerPageManager.UserTimerData[idmodul][idpage]);
        if (TimerPageManager.UserTimerData[idmodul][idpage] == undefined){
            TimerPageManager.UserTimerData[idmodul][idpage] = [];
            console.log("create page ", TimerPageManager.UserTimerData[idmodul]);
        }   
    }
}
