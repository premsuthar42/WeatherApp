import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = (props) => {
  return (
    <TouchableOpacity disabled={props.disable} style={[styles.button,{opacity: props.disable == '' ? 1 : 0.5}]} onPress={props.onPress}>
        <Text style={styles.buttonText}>
            {props.text}
        </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        // backgroundColor: 'orange',
        padding: 11.9,
        borderRadius: 5,
        
        backgroundColor: 'rgba(200,200,200,0.4)'
    },
    buttonText: {
        fontSize: 18,
        color: '#fff'
    }
})

export default CustomButton