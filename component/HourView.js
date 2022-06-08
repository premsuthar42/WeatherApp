import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import color from '../common/Colour'


const HourView = ({temp}) => {
  
  let hour = temp?.time?.substr(temp?.time?.length - 5);
  return (
    <View style={styles.screen}>
      <Text style={styles.marginVer}>{hour}</Text>
      <Image style={styles.imgStyle}
        source={{uri: `https:${temp?.condition?.icon}`}}/>
        <Text style={styles.topText}>{Math.round(temp?.temp_c)}°C</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        marginRight: 16,
        // paddingLeft: 7
    },
    topText: {
        marginTop: 4,
        fontSize: 14,
        color: color.primary
    },
    marginVer: {
        marginVertical: 3,
        color: color.primary
    },
    imgStyle: {
        width: 42,
        height: 42,
        marginVertical: 3
    }
})

export default HourView