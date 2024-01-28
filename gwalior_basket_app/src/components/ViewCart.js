import { View,Dimensions, Text, TouchableOpacity } from "react-native";
import Colors from "../../assets/Colors";
const {width,height} = Dimensions.get("window")
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";


export default function ViewCart({adjust=false})
{
    var cartData = useSelector((state)=>state.cart)
    var cartKeys = Object.keys(cartData)
    var cartValues = Object.values(cartData)

    var payment = cartValues.reduce((p1,p2)=>{
        var amt = p2.offerprice>0 ? p2.offerprice : p2.price
        return p1 + (amt * p2.qty)
    },0)

    var navigater = useNavigation()
    const handleShowCart=()=>{
        navigater.navigate('ShowCart')
    }
    return(
        <View style={{position:'absolute',top: !adjust ? height*0.86 : height*0.85,width:width,alignItems:'center'}}>
            {cartKeys.length === 0 ?
            <></>
            :
            <View style={{width:width*0.96,height:height*0.07,borderRadius:10,backgroundColor:Colors.darkGreen,flexDirection:'row',justifyContent:'space-between',zIndex:1}}>

                <View style={{flexDirection:'row',alignItems:'center'}}>

                    <View style={{justifyContent:'center',margin:5}}>
                        <FontAwesome5Icon name="shopping-cart" size={25} color="white" />
                    </View>

                    <View style={{justifyContent:'space-evenly'}}>
                        <Text style={{color:Colors.White}}>{cartKeys.length} items</Text>
                        <Text style={{color:Colors.White,fontWeight:'bold'}}>₹ {payment}</Text>
                    </View>

                </View>

                <View style={{flexDirection:'row',alignItems:'center'}}>

                    <TouchableOpacity onPress={()=>{handleShowCart()}} style={{justifyContent:'center'}}>
                        <Text style={{color:Colors.White,fontWeight:'bold',fontSize:15}}>View Cart</Text>
                    </TouchableOpacity>

                    <View style={{justifyContent:'center',margin:5}}>
                        <AntDesignIcon name="caretright" size={15} color="white" />
                    </View>

                </View>
            </View>
            }
        </View>
    )
}

