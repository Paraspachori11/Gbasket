// 3
import { View,Dimensions,Text} from "react-native";
import Colors from "../../../../assets/Colors";
const {width,height} = Dimensions.get('window')
import EntypoIcon from "react-native-vector-icons/Entypo"
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

export default function Billing({cartDataValues,donation,tip})
{
    var totalPrice = cartDataValues.reduce((p1,p2)=>{
        return p1+(p2.price * p2.qty)
    },0)

    var totalOfferPrice = cartDataValues.reduce((p1,p2)=>{
        return p1 + (p2.offerprice>0 ? p2.offerprice : p2.price)* p2.qty
    },0)

    return(
        <View style={{width:width*0.96,alignItems:'center',justifyContent:'center',elevation:1.5,backgroundColor:Colors.White}}>
        <View style={{width:width*0.93,height:height*0.2,justifyContent:'space-evenly'}}>

{/* Strip1 */}
            <View>
                <Text style={{fontWeight:'bold',fontSize:18,color:Colors.Black}}>Bill details</Text>
            </View>

{/* Strip2 */}
            <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <EntypoIcon name="text-document" size={20} color="black"/>
                    <Text>&nbsp;</Text>
                    <Text>Sub total</Text>
                    <Text>&nbsp;&nbsp;</Text>
                    <View style={{backgroundColor:Colors.lightGrey,justifyContent:'center',alignItems:'center',borderRadius:3,height:height*0.025,width:width*0.05,borderRadius:3}}>
                        <AntDesignIcon name="down" size={13} color="black"/>
                    </View>
                    <Text>&nbsp;&nbsp;</Text>
                    <View style={{justifyContent:'center',alignItems:'center',borderRadius:3.5,backgroundColor:Colors.lightBlue,width:width*0.17,height:height*0.025}}>
                        <Text style={{color:Colors.darkBlue,fontWeight:'bold',fontSize:11}}>Saved ₹{totalPrice - totalOfferPrice}</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',flex:1}}>
                        <Text style={{textDecorationLine:'line-through',fontSize:12}}>₹{totalPrice}</Text>
                        <Text>&nbsp;&nbsp;</Text>
                        <Text style={{fontWeight:'bold',color:Colors.Black}}>₹{totalOfferPrice}</Text>
                    </View>
            </View>

{/* Strip3 */}
            <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <MaterialIcon name="delivery-dining" size={20} color="black"/>
                    <Text>&nbsp;</Text>
                    <Text>Delivery charge</Text>
                    <Text>&nbsp;</Text>
                    <AntDesignIcon name="infocirlceo" size={14}/>
                </View>

                <View style={{flex:1,alignItems:'flex-end'}}>
                    <Text style={{fontWeight:'bold',color:Colors.darkBlue}}>FREE</Text>
                </View>
            </View>

{/* Strip5 */}
{donation === 1 ?
<View style={{flexDirection:'row'}}>
                <View>
                    <Text>Donation</Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <Text style={{fontSize:12}}>+₹{donation}</Text>
                </View>
            </View>
:
<></>
}

{/* Strip6 */}
{tip > 0 ?
<View style={{flexDirection:'row'}}>
                <View>
                    <Text>Tip</Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <Text style={{fontSize:12}}>+₹{tip}</Text>
                </View>
            </View>
:
<></>
}

{/* Strip4 */}
            <View style={{flexDirection:'row'}}>
                <View>
                    <Text style={{fontWeight:'bold',fontSize:15,color:Colors.Black}}>Grand total</Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <Text style={{fontWeight:'bold',color:Colors.Black}}>₹{totalOfferPrice + donation + tip}</Text>
                </View>
            </View>
        </View>
        </View>
    )
}