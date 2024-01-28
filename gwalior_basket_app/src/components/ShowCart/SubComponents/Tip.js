// 6

import { View,Dimensions,Text,Image,TouchableOpacity } from "react-native";
const {width,height} = Dimensions.get('window')
import Colors from "../../../../assets/Colors"

export default function Tip({setTip})
{
    return(
        <View style={{width:width*0.96,height:height*0.165,alignItems:'center',justifyContent:'center',elevation:1.5,backgroundColor:Colors.White}}>
            <View style={{width:width*0.92,height:height*0.155}}>
                <Text style={{fontWeight:'bold',fontSize:18,color:Colors.Black}}>Tip your delivery partner</Text>
                <Text>Your kindness means a lot! 100% of your tip will go directly to your delivery partner</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                    <TouchableOpacity onPress={()=>setTip(10)} style={{width:width*0.22,height:height*0.06,alignItems:'center',justifyContent:'center',elevation:5,borderRadius:7,backgroundColor:Colors.White,flexDirection:'row'}}>
                        <Image source={require('../../../../assets/Images/ten.png')} style={{width:25,height:25}} />
                        <Text>&nbsp;</Text>
                        <Text style={{fontWeight:500,fontSize:14,color:Colors.Black}}>₹10</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setTip(25)} style={{width:width*0.22,height:height*0.06,alignItems:'center',justifyContent:'center',elevation:5,borderRadius:7,backgroundColor:Colors.White,flexDirection:'row'}}>
                        <Image source={require('../../../../assets/Images/twentyfive.png')} style={{width:25,height:25}} />
                        <Text>&nbsp;</Text>
                        <Text style={{fontWeight:500,fontSize:14,color:Colors.Black}}>₹25</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setTip(50)} style={{width:width*0.22,height:height*0.06,alignItems:'center',justifyContent:'center',elevation:5,borderRadius:7,backgroundColor:Colors.White,flexDirection:'row'}}>
                        <Image source={require('../../../../assets/Images/fifty.png')} style={{width:25,height:25}} />
                        <Text>&nbsp;</Text>
                        <Text style={{fontWeight:500,fontSize:14,color:Colors.Black}}>₹50</Text>
                    </TouchableOpacity>

                    <View style={{width:width*0.22,height:height*0.06,alignItems:'center',justifyContent:'center',elevation:5,borderRadius:7,backgroundColor:Colors.White,flexDirection:'row'}}>
                        <Image source={require('../../../../assets/Images/custom.png')} style={{width:25,height:25}} />
                        <Text>&nbsp;</Text>
                        <Text style={{fontWeight:500,fontSize:14,color:Colors.Black}}>Custom</Text>
                    </View>

                </View>
            </View>
        </View>
    )
}