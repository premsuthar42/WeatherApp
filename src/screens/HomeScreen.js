import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HourView from '../../component/HourView'
import SingleDayView from '../../component/SingleDayView'
import color from '../../common/Colour'
import  axios  from 'axios'
import { Searchbar } from 'react-native-paper'
import CustomButton from '../../component/CustomButton'
import moment from 'moment'


const HomeScreen = () => {
    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [check, setCheck] = useState(true)
    const [text, setText] = useState()
    const [hideList, setHideList] = useState(false)
    const [arr, setArr] = useState([])

    const onChangeSearch = query => setSearchQuery(query);
    
    useEffect(() => {
        axios.get(`http://api.weatherapi.com/v1/search.json?key=6db1beadfe5c4df3b1861303220306&q=${!text ? searchQuery : text }`)
        .then(res => {
            setData(res.data);
            setCheck(true)
        }).catch(error =>{
            console.warn("error :", error)
        })
    }, [text])
    


    const buttonHandler = () => {
        setText(searchQuery)
        setHideList(!hideList)
    }


    const cityHandler = (item) => {   
        setHideList(!hideList)
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=6db1beadfe5c4df3b1861303220306&q=${item.name ? item.name : "jaipur"}&days=3&aqi=yes&alerts=yes
        `)
        .then(res => {
            setNewData(res.data);
            setCheck(true)
            const newArr = res?.data?.forecast?.forecastday[0]?.hour?.filter((item)=> moment(item.time).format() >= moment().format())
            setArr(newArr)
        }).catch(error =>{
            console.warn("error :", error)
        })
        setSearchQuery('')      
    }

  return (
    <View style={{flex: 1}}>
        {check ? <ImageBackground source={{uri: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}} resizeMode="cover" style={styles.image}>
        <View style={styles.screen}>
        <View style={styles.searchContainer}>
        <Searchbar
            color="white"
            style={{backgroundColor: 'rgba(200,200,200,0.4)',}}
            fontSize={17}
            clearIcon={()=> <TouchableOpacity disabled={!hideList} onPress={buttonHandler} style={{padding: 7}}><Image style={{width: 15, height: 15}}
            source={require('../../images/close.png')}/></TouchableOpacity>} 
            icon={()=> <Image style={{width: 17, height: 17}}
            source={require('../../images/search-interface-symbol.png')}/>}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
        <View style={{width: 12}}></View>
        <CustomButton disable={searchQuery.length <= 0} text="Search" onPress={buttonHandler}/>
        </View>
      <View style={styles.topContainer}>
          <View style={{flex: 1, padding: 10}}>
              {hideList ? data.map(item=> <TouchableOpacity style={styles.listStyle} onPress={()=>cityHandler(item)}><Text  style={styles.textList}>{item.name}</Text></TouchableOpacity>) : null}
           <Text style={styles.topText}>{newData?.location?.name}</Text>
            <View style={styles.textImageContainer}>
            <Text style={[styles.topText, {fontSize: 40}]}>{newData?.current?.feelslike_c}°</Text>
                </View> 
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.cloudyText}>{newData?.current?.condition?.text}</Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
          <Image
        style={{width: 140, height: 140}}
        source={{uri: `https:${newData?.current?.condition?.icon}`}}/>
          </View>
      </View>
      <View style={styles.secondView}>
      <View style={styles.textImageContainer}>
      <Image style={{width: 18, height: 18}}
        source={require('../../images/water.png')}/>
        <View style={{width: 7}}></View>
          <Text style={styles.secondViewText}>{newData?.current?.humidity}</Text>
      </View>
         <View style={styles.textImageContainer}>
         <Image style={{width: 18, height: 18}}
        source={require('../../images/timer.png')}/>
        <View style={{width: 7}}></View>
         <Text style={styles.secondViewText}>{newData?.current?.pressure_in} mBar</Text>
         </View>
         <View style={styles.textImageContainer}>
         <Image style={{width: 18, height: 18}}
        source={require('../../images/wind.png')}/>
        <View style={{width: 7}}></View>
         <Text style={styles.secondViewText}>{newData?.current?.wind_kph} km/h</Text>
         </View>
      </View>
       <View style={[styles.sunConatainer, {marginTop: 15, paddingHorizontal: 8, marginBottom: 25}]}>
        <View style={styles.sunConatainer}>
         <Image style={{width: 25, height: 25}}
        source={require('../../images/sun.png')}/>
        <View style={{width: 9}}></View>
         <Text style={styles.secondViewText}>{newData?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
         </View>
        <View style={styles.textImageContainer}>
            <Text style={styles.secondViewText}>{newData?.forecast?.forecastday[0]?.astro?.sunset}</Text>
            <View style={{width: 9}}></View>
         <Image style={{width: 25, height: 25}}
        source={require('../../images/suun.png')}/>
         </View>
        
       </View>
        <View style={styles.todayContainer}>
           <Text style={styles.dayText}>HOURLY FORECAST</Text>
        <ScrollView 
            horizontal={true} 
            style={styles.todayScroll}>
            {arr?.map((item)=> <HourView temp={item}/>)} 
        </ScrollView>
        </View>
        <View style={[styles.todayContainer, {flex: 1}]}>
           <Text style={styles.dayText}>DAILY FORECAST</Text>
        <ScrollView>
            {newData?.forecast?.forecastday?.map((item,index)=> (index > 0 && <SingleDayView data={item}/>))}
        </ScrollView>
        </View>
        </View>
        </ImageBackground> : null}
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    topContainer: {
        flexDirection: 'row',
         alignItems: 'center', 
         justifyContent: 'space-between',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 45
    },
    topText: {
        fontSize: 24,
        marginTop: 4,
        color: color.primary
    },
    listStyle: {
        borderWidth: 1,
        padding: 2,
        marginBottom: 3,
        borderColor: "rgba(20,20,20,0.4)"
    },
    textList: {
        fontSize: 16,
        color: color.primary
    },
    cloudyText: {
        fontSize: 16,
        backgroundColor: "rgba(20,20,20,0.06)",
        paddingVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 3,
        marginTop: 5,
        color: color.primary
    },
    secondView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        marginVertical: 20
    },
    secondViewText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.primary
    },
    textImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sunConatainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    todayContainer: {
        backgroundColor: "rgba(200,200,200,0.4)",
        paddingHorizontal: 8,
        marginHorizontal: 9,
        marginVertical: 15,
        paddingVertical: 8,
        borderRadius: 10 
    },
    dayText: {
        fontSize: 16,
        paddingLeft: 4,
        paddingVertical: 8,
        fontWeight: 'bold',
        color: color.accent,
    },
    todayScroll: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
})

export default HomeScreen