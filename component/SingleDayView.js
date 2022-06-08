import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import color from '../common/Colour'
import moment  from 'moment'

const SingleDayView = ({data = {}}) => {
  const check = moment(data.date);
  return (
    <View style={styles.screen}>
      <Text style={styles.dayStyle}>{check.format('dddd')}</Text>
      <Image style={styles.imgStyle}
        source={{uri: (`https:${data?.day?.condition?.icon}`)}}/>
        <Text style={styles.topText}>{Math.round(data?.day?.maxtemp_c)}°C</Text>
        <Text style={styles.topText}>{Math.round(data?.day?.mintemp_c)}°C</Text>  
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 2,
        paddingVertical: 4
    },
    dayStyle: {
        fontSize: 17,
        color: color.primary,
        flex: 1,
        padding: 4
    },  
    imgStyle: {
        width: 26,
        height: 26,
        marginVertical: 3,
    },
    topText: {
        fontSize: 16,
        color: color.primary,
        flex: 0.5,
        textAlign: 'right',
        paddingRight: 2
    },
})

export default SingleDayView