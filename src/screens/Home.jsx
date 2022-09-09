import React from 'react'
import {View,Text,Button} from 'react-native'

const Home = ({navigation}) => {
  return (
    <View>
        <Text>Home</Text>
        <Button onPress={()=>navigation.navigate('company-select')} title="Company-Select" />
    </View>
  )
}

export default Home