import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const User = (props) => {
  return (
    <View>
      <Text style={styles.title}>Value:{props.value}</Text>
      <Text style={styles.title}>Age:{props.age}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    title:{
fontSize:30,
color:'white'
    }
})
export default User;