// 1

import { View,Dimensions, Text } from "react-native";
const {width,height} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Octicons'
import Colors from "../../../../assets/Colors";


export default function Delivery({cartDataKeys})
{
    return(
        <View style={{width:width*0.96,height:height*0.1,borderTopLeftRadius:5,borderTopRightRadius:5,flexDirection:'row'}}>
            <View style={{width:width*0.192,flex:1,alignItems:'center',justifyContent:'space-evenly'}}>
                <Icon name="stopwatch" size={30} />
            </View>
            <View style={{width:width*0.768,justifyContent:'center'}}>
                <Text style={{color:Colors.Black,fontSize:18,fontWeight:'bold'}}>{cartDataKeys === 0 ? 'No Items to Deliver' :'Delivery in 11 minutes'}</Text>
                <Text style={{fontWeight:'bold'}}>{cartDataKeys} Items</Text>
            </View>
        </View>
    )
}