// 5
import {View,Dimensions,Text,Image,ScrollView} from "react-native"
const {width,height} = Dimensions.get('window')
import Colors from "../../../../assets/Colors"
import FeatherIcon from "react-native-vector-icons/Feather"
import MCI from "react-native-vector-icons/MaterialCommunityIcons"
import CheckBox from "../../CheckBox"
import { useState } from "react"

export default function Instructions()
{

    const [avoidCall,setAvoidCall] = useState(false)
    const [ring,setRing] = useState(false)

    const handleAvoid =()=>{
        setAvoidCall(!avoidCall)
    }

    const handleRing =()=>{
        setRing(!ring)
    }

    return(
        <View style={{width:width*0.96,height:height*0.22,alignItems:'center',justifyContent:'center',elevation:1.5,backgroundColor:Colors.White}}>
            <View style={{width:width*0.92,height:height*0.2,flexDirection:'column',justifyContent:'space-between'}}>

                <Text style={{fontWeight:'bold',fontSize:18,color:Colors.Black,marginLeft:5}}>Delivery instructions</Text>

                <View style={{flexDirection:'row',justifyContent:'space-evenly',flex:1}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
{/* Record */}
                    <View style={{borderRadius:10,elevation:5,backgroundColor:Colors.White,width:width*0.276,height:height*0.15,justifyContent:'space-around',marginHorizontal:5}}>

                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <FeatherIcon name="mic" size={15} style={{color:Colors.darkGreen}}/>
                            <Text style={{fontWeight:'bold',color:Colors.darkGreen}}>Record</Text>
                        </View>

                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:500,fontSize:13,color:Colors.Black,width:width*0.17}}>Press here and hold</Text>
                        </View>
                    </View>

{/* Avoid Calling */}
                    <View style={{borderRadius:10,elevation:5,backgroundColor:Colors.White,width:width*0.276,height:height*0.15,justifyContent:'space-around',marginHorizontal:5}}>

                        <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                            <FeatherIcon name="phone-off" size={15} style={{color: !avoidCall ? Colors.darkGrey : Colors.darkGreen}}/>
                            <CheckBox onPress={handleAvoid}/>
                        </View>

                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:500,fontSize:13,color:Colors.Black}}>Avoid calling</Text>
                        </View>
                    </View>

{/* Don't Ring Bell */}
                    <View style={{borderRadius:10,elevation:5,backgroundColor:Colors.White,width:width*0.276,height:height*0.15,justifyContent:'space-around',marginHorizontal:5}}>

                        <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                            <FeatherIcon name="bell-off" size={15} style={{color: !ring ? Colors.darkGrey : Colors.darkGreen}}/>
                            <CheckBox onPress={handleRing}/>
                        </View>

                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:500,fontSize:13,color:Colors.Black,width:width*0.17}}>Don't ring the bell</Text>
                        </View>
                    </View>
{/* Don't Message */}
                    <View style={{borderRadius:10,elevation:5,backgroundColor:Colors.White,width:width*0.276,height:height*0.15,justifyContent:'space-around',marginHorizontal:5}}>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <MCI name="message-bulleted-off" size={15} style={{color:Colors.darkGrey}}/>
                    </View>

                    <View style={{alignItems:'center'}}>
                        <Text style={{fontWeight:500,fontSize:13,color:Colors.Black,width:width*0.17}}>Don't message</Text>
                    </View>
                    </View>
                </ScrollView>
                </View>
            </View>
        </View>
    )
}