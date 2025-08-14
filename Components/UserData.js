import {View,Text,StyleSheet} from 'react-native'


const UserData = (props) => {
  const item = props.item;

return (
 <View style={styles.box}>
      <Text style={styles.item}>{item.name}</Text>
      <Text style={styles.item}>{item.email}</Text>
    </View>
    
);
 
};
const styles = StyleSheet.create({
   item:{
    flex:1,
    color:'#fff',
    margin:15,
    textAlign:'center'
   },
   box:{
    flex:1,
    flexDirection:'row',
    borderWidth:1,
    margin:10,
    color:'#fff',
    borderColor:'#fff',
    width:270,
    backgroundColor:'green',
    alignSelf:'center',
   }
})

export default UserData;