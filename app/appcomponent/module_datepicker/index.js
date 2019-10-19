import React from 'react'
import { StyleSheet, Text ,View,Image} from 'react-native'

import ModalDatePicker from 'react-native-datepicker-modal'


import colors from './config/colors'
import spacing from './config/spacing'
import fontSize from './config/fontSize'
import Constant from '../../global/Constant';
import { convertHeight, formateDateNumber, convertWidth } from '../../global/Global';

const DatePicker = ({ style, ...props }) => (
    <ModalDatePicker
        style={[styles.container, style]}
        onDateChanged={({ year, month, day }) => props.onchange(`${year}-${month}-${day}`)}
        renderDate={({ year, month, day, date }) => {
            if (!date) {
                return <View style={[styles.placeholderText, { flexDirection: 'row' }]}>
                    <Text style={[styles.text, styles.placeholderText]}>13/2/2019</Text>
                    <Image
                        style={{
                            width: 15,
                            height: 15,
                            alignSelf: 'center'
                        }}
                        resizeMode={"contain"}
                        source={require("../../../assets/ASET/Antu_arrow-down.png")}
                    />
                </View>
            }

            const dateStr = `${year}-${month}-${day}`;
            return <View style={[styles.placeholderText, { flexDirection: 'row' }]}>
                <Text style={styles.text}>{formateDateNumber(dateStr)}</Text>

            </View>
        }}
        {...props}
    />
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constant.COLOR_GRAY1,
        borderColor: Constant.COLOR_WHITE3,
       // borderBottomColor: colors.gray.veryLight,
        borderWidth: 1,
        //marginVertical: spacing[0],
        //marginHorizontal: spacing[0],
        justifyContent: 'center',
        //borderRadius: convertHeight('1%') ,
       
        width: convertWidth('30%'),
        height: convertHeight('9%'),
       // borderRadius: 25,
        justifyContent: "space-around",
        alignItems: "center",
        
        paddingHorizontal: 7
    },
    placeholderText: {
        //color: "#000",
       
    },
    text: {
        width: '80%',
        
        fontFamily: Constant.POPPINS_MEDIUM,
        fontSize: convertWidth('1.5%'),
        color: Constant.COLOR_GRAY2
    }
})

export default DatePicker