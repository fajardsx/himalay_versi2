import React from "react";
import { Platform,ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";


//LOCAL
import Constant from '../../global/Constant';
import { convertHeight, convertWidth } from '../../global/Global';
import user from '../../global/user';
import { Styleapp } from '../../styleapp';
import { range } from 'lodash';
import dateFns from 'date-fns';
import Button from './component/Button';



export default class CalendarView extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            currentMonth:new Date(),
            currentDay:new Date(),
            selectDay:new Date(),
        }
    }
    renderHeaders(){
        const dateFormat = "MMMM YYYY";
        //console.log(dateFns.format(this.state.currentMonth,dateFormat));
        return <View style={stylecalendar.calendar_header}>
            <View style={stylecalendar.calendar_header_item}>
                <TouchableOpacity
                    //noDefaultStyles={true}
                    onPress={this.onPrevMonth.bind(this)}
                >
                    <Image
                        style={{
                            width: convertWidth('3%'),
                            height: convertHeight('3%'),
                            alignSelf: 'center'
                        }}
                        source={require("../../../assets/ASET/Antu_arrow-left.png")}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
                <Text style={stylecalendar.calendar_header_text}>{dateFns.format(this.state.currentMonth, dateFormat)}</Text>
                <TouchableOpacity
                   // noDefaultStyles={true}
                    onPress={this.onNextMonth.bind(this)}
                >
                    <Image
                        style={{
                            width: convertWidth('3%'),
                            height: convertHeight('3%'),
                            alignSelf: 'center'
                        }}
                        source={require("../../../assets/ASET/Antu_arrow-right.svg.png")}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    }
    renderWeekDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);
        //console.log(startDate);
        for(let i =0 ;i<7;i++){
            //console.log(dateFns.format(dateFns.addDays(startDate,i),dateFormat));
            days.push(dateFns.format(dateFns.addDays(startDate, i), dateFormat));
        }

        let weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        return weekdays.map((day) => {
            return (
                <Text key={day} style={stylecalendar.calendar_weekdays_text}>{day.toUpperCase()}</Text>
            );
        });
    }
    getColorCellCalendar(date,day,selectday){
        if (date.isSameDay(day, selectday)){
            return ConstantSourceNode.COLOR_WHITE1
        }else{
            return "#fff"
        }
    }
    renderWeeks() {
        const {currentDay,currentMonth,selectDay} = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd)

        const dateformat = 'D';
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while(day <= endDate){
            for(let i = 0;i<7;i++){
                formattedDate = dateFns.format(day,dateformat);
                const cloneDay = day;
               // console.log(dateFns.isSameMonth(day,monthStart))
               // console.log(dateFns.isSameDay(day, monthStart))

                days.push(
                    <TouchableOpacity 
                    key={day} 
                    style={[stylecalendar.day, 
                    { backgroundColor:!dateFns.isSameMonth(day, monthStart)?"#fafafa":dateFns.isSameDay(day,selectDay)?Constant.COLOR_WHITE1:"#fff"}]}
                    onPress={()=>this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <Text style={[
                            stylecalendar.day_text,
                            {
                                backgroundColor: dateFns.isSameDay(day, selectDay )?Constant.COLOR_RED1:"transparent",
                                color: dateFns.isSameDay(day, selectDay) ? Constant.COLOR_WHITE1: Constant.COLOR_BLACK}]}>
                                {formattedDate}
                        </Text>
                    </TouchableOpacity>
                )

                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <View key={day} style={[stylecalendar.week_days]}>
                    {days}
                </View>
            )
            days=[];
        }
        return rows;

        /*let past_month_days = range(27, 31);
        let this_month_days = range(1, 30);

        let daysold = past_month_days.concat(past_month_days, this_month_days);
        let grouped_days = this.getWeeksArray(daysold);

        return grouped_days.map((week_days, index) => {
            return (
                <View key={index} style={stylecalendar.week_days}>
                    {this.renderDays(week_days)}
                </View>
            );
        });*/
    }
    

    onDateClick = (day) =>{
        this.setState({
            selectDay:day
        });
        this.props.onSelect(day)
    }

    onNextMonth = () =>{
        this.setState({
            currentMonth:dateFns.addMonths(this.state.currentMonth,1)
        })
    }
    onPrevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        })
    }

    render(){
        return <View style={stylecalendar.container}>
            {this.renderHeaders()}
            
            <View style={[stylecalendar.calendar_weekdays, { flexDirection: 'row', paddingVertical: 10, borderWidth: 1, borderBottomWidth: 0, borderColor: "#f8f8f8"}]}>
                {this.renderWeekDays()}
            </View>
            <View style={stylecalendar.calendar_days}>
                {this.renderWeeks()}
            </View>
            
            </View>
       
    }
}

const stylecalendar= StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:convertHeight('5%')
    },
    header: {
        backgroundColor: '#329BCB',
        flexDirection: 'row',
        padding: 20
    },
    header_item: {
        flex: 1
    },
    header_button: {
        flexDirection: 'row'
    },
    text_center: {
        textAlign: 'center'
    },
    text_right: {
        textAlign: 'right'
    },
    header_text: {
        color: '#fff',
        fontSize: 20
    },
    bold_text: {
        fontWeight: 'bold'
    },
    calendar_header: {
        flexDirection: 'row',
        backgroundColor: '#FBFBFB',
        marginVertical: convertHeight('3%')
    },
    calendar_header_item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 40,
        paddingLeft: 40,
        paddingVertical: convertHeight('3%'),
       
    },
    calendar_header_text: {
        fontWeight: 'bold',
        fontSize: 20,
        width: convertWidth('20%'),
        textAlign: 'center'
    },
    calendar_weekdays_text: {
        flex: 1,
        color: '#C0C0C0',
        textAlign: 'center'
    },
    week_days: {
        flexDirection: 'row'
    },
    day: {
        height: convertHeight('12%'),
        width: convertWidth('13.4%'),
        backgroundColor: '#F5F5F5',
        padding: 17,
        borderWidth:1,
        borderColor: "#f8f8f8",
    },
    day_text: {
        height: convertWidth('3%'),
        width: convertWidth('3%'),
        alignItems: 'center',
        textAlign: 'center',
        color: '#A9A9A9',
        right:0,
        textAlignVertical:"center",
        borderRadius: convertWidth('1.5%'), 
        fontSize: convertWidth('1.5%'),
        position: 'absolute'
    },
})