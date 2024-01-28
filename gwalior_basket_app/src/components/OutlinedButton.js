import { useEffect,useState } from "react";
import { TouchableOpacity, View,Text } from "react-native";
import Colors from "../../assets/Colors";
import { useSelector } from "react-redux";

const OutlinedButton=({data,title,handleSelectedQuantity,width,height,bgColor,txtColor,onPress=()=>{},
// changeButton,setChangeButton
})=>{
    var totalQuantity = 0
    var productlistid = data?.productlistid
    // console.log(data)
    var cartData = useSelector((state)=>state.cart)

    totalQuantity = cartData[productlistid]?.qty


    const [qty,setQty] = useState(totalQuantity)

    const handlePlus =()=>{
        if(qty === 5)
        {
            setQty(qty)
            handleSelectedQuantity(qty)
        }
        else
        {
            setQty(qty+1)
            handleSelectedQuantity(qty+1)
        }
    }

    const handleMinus =()=>{
        if(qty === 1)
        {
            // setChangeButton(!changeButton)
            setQty(0)
            handleSelectedQuantity(0)
        }
        else
        {
            setQty(qty-1)
            handleSelectedQuantity(qty-1)
        }
    }

    return(
        <View style={{width:width,height:height,borderRadius:5,flexDirection:'row'}}>

            <TouchableOpacity onPress={handlePlus}>
                <View style={{borderWidth:1,borderColor:Colors.darkGreen,width:width*0.27,backgroundColor:bgColor,flex:1,alignItems:'center',justifyContent:'center',borderTopLeftRadius:5,borderBottomLeftRadius:5}}>
                    <Text style={{color:txtColor,fontWeight:'bold',fontSize:16}}>+</Text>
                </View>
            </TouchableOpacity>
            
            <View style={{borderWidth:0.2,borderColor:Colors.darkGreen,width:width*0.46,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:Colors.Black,fontWeight:'bold',fontSize:16}}>{qty}</Text>
            </View>

            <TouchableOpacity onPress={handleMinus}>
                <View style={{borderWidth:1,borderColor:Colors.darkGreen,width:width*0.27,backgroundColor:bgColor,flex:1,alignItems:'center',justifyContent:'center',borderTopRightRadius:5,borderBottomRightRadius:5}}>
                    <Text style={{color:txtColor,fontWeight:'bold',fontSize:16}}>-</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default OutlinedButton