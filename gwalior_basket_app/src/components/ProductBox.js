import { View,Dimensions,Image, Text, TouchableOpacity } from "react-native";
import Colors from "../../assets/Colors";
const {width,height} = Dimensions.get('window')
import { ServerURL } from "../services/ServerServices";
import Button from "./Button";
import OutlinedButton from "./OutlinedButton";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function ProductBox({ProductDetail,refresh,setRefresh})
{
    // console.log(ProductInfo)
    // console.log(ProductInfo.productname)

    const [ProductInfo,setProductInfo] = useState({})

    useEffect(function(){
        setProductInfo(ProductDetail)
    },[ProductDetail])

    // const [changeButton,setChangeButton] = useState(false)

    var pID = ProductDetail.productlistid
    var cartData =  useSelector((state)=>state.cart)
    // console.log('CDATA',cartData)

    const [quantity,setQuantity] = useState(cartData[pID] ? cartData[pID].qty : 0)

    const handleAdd=()=>{
        // setChangeButton(!changeButton)
        handleSelectedQuantity(1)
    }


    var dispatch = useDispatch()

    const handleSelectedQuantity=(value)=>{
        if(value === 0)
        {
            dispatch({type:'DELETE_CART',payload:[ProductInfo.productlistid]})
            setQuantity(value)
        }
        else
        {
            ProductInfo['qty'] = value
            dispatch({type:'ADD_CART',payload:[ProductInfo.productlistid,ProductInfo]})
            setQuantity(value)
        }
        setRefresh(!refresh)
    }

    // Alter (slow)
    
//     var cartData = useSelector((state)=>state.cart)

// useEffect(function()
// {
//     if(cartData[ProductInfo.productlistid])
//     {
//     setChangeButton(cartData[ProductInfo.productlistid]['btnStatus'])
//     setQuantity(cartData[ProductInfo.productlistid]['qty'])
// }
// },[cartData[ProductInfo.productlistid]])

    // const handleAdd=()=>{
    //     setChangeButton(!changeButton)
    //     ProductInfo['btnStatus'] = true
    //     dispatch({type:'EDIT_CART',payload:[ProductInfo.productlistid,ProductInfo]})
    //     handleSelectedQuantity(1)
    // }
    
    var navigater = useNavigation()

    const handleOpenDescription=(itemInfo)=>{
        navigater.navigate('ProductDetail',{data : itemInfo})
    }

    return(
        <View style={{width:width*0.5,height:height*0.34,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>handleOpenDescription(ProductInfo)} style={{height:height*0.335,width:width*0.47,elevation: 5,borderRadius:10,backgroundColor:Colors.White}}>
                <View style={{alignItems:'center'}}>
                    <Image source={{uri:`${ServerURL}/images/${!ProductDetail ? '' : ProductInfo.productimage}`}} style={{width:110,height:110}}/>
                </View>
                <View style={{marginBottom:2.5}}>
                    <View style={{backgroundColor:Colors.lightGreen,width:width*0.20,alignItems:'center',justifyContent:'center',borderRadius:3,marginLeft:3,elevation:1}}>
                        <Text style={{color:Colors.darkGreen,fontWeight:'bold',fontSize:11}}>
                            Save ₹{!ProductDetail ? '' : ProductInfo.price - ProductInfo.offerprice}
                        </Text>
                    </View>
                </View>
                <View style={{marginBottom:4}}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{fontWeight:'bold',fontSize:13,color:Colors.Black,marginLeft:3}}>{!ProductDetail ? '' : ProductInfo.productname}</Text>
                </View>
                <View>
                    <Text style={{fontWeight:'bold',fontSize:12,marginLeft:3}}>{!ProductDetail ? '' : ProductInfo.weight} {!ProductDetail ? '' : ProductInfo.pricetype}</Text>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{width:'25%',justifyContent:'center',marginLeft:3}}>
                        <Text style={{textDecorationLine:'line-through'}}>
                            ₹{!ProductDetail ? '' : ProductInfo.price}
                        </Text>
                        <Text style={{color:Colors.Black,fontWeight:'bold'}}>
                            ₹{!ProductDetail ? '' : ProductInfo.offerprice}
                        </Text>
                    </View>
                    <View style={{width:'75%',alignItems:'center',justifyContent:'center'}}>
                        {/* {!changeButton ?
                        <Button title={"ADD"} width={110} height={38} bgColor={Colors.darkGreen} txtColor={Colors.White} onPress={handleAdd}/>
                        :
                        <OutlinedButton changeButton={changeButton} setChangeButton={setChangeButton} title={quantity} handleSelectedQuantity={(value)=>handleSelectedQuantity(value)} width={110} height={38} bgColor={Colors.darkGreen} txtColor={Colors.White}/>
                        } */}
                        {quantity === 0 ?
                        <Button title={"ADD"} width={110} height={38} bgColor={Colors.darkGreen} txtColor={Colors.White} onPress={handleAdd}/>
                        :
                        <OutlinedButton data={ProductDetail} title={quantity} handleSelectedQuantity={(value)=>handleSelectedQuantity(value)} width={110} height={38} bgColor={Colors.darkGreen} txtColor={Colors.White} refresh={refresh} setRefresh={setRefresh}/>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
















// import { View,Dimensions,Image, Text } from "react-native";
// import Colors from "../../assets/Colors";
// const {width,height} = Dimensions.get('window')
// import { ServerURL } from "../services/ServerServices";
// import Button from "./Button";

// export default function ProductBox({ProductInfo})
// {
//     return(
//         <View style={{width:width*0.5,height:height*0.34,alignItems:'center',justifyContent:'center'}}>
//             <View style={{height:height*0.335,width:width*0.47,elevation: 5,borderRadius:10,backgroundColor:Colors.White}}>
//                 <View style={{alignItems:'center'}}>
//                     <Image source={{uri:`${ServerURL}/images/${'creamy_yogurt.jpeg'}`}} style={{width:75,height:110}}/>
//                 </View>
//                 <View style={{marginBottom:2.5}}>
//                     <View style={{backgroundColor:'#ebfaf0',width:width*0.20,alignItems:'center',justifyContent:'center',borderRadius:3,marginLeft:3,elevation:1}}>
//                         <Text style={{color:Colors.darkGreen,fontWeight:'bold',fontSize:11}}>
//                             Save ₹40
//                         </Text>
//                     </View>
//                 </View>
//                 <View style={{marginBottom:4}}>
//                     <Text style={{fontWeight:'bold',fontSize:13,color:Colors.Black,marginLeft:3}}>Creamy Yogurt</Text>
//                 </View>
//                 <View>
//                     <Text style={{fontWeight:'bold',fontSize:12,marginLeft:3}}>125 g</Text>
//                 </View>
//                 <View style={{flex:1,flexDirection:'row'}}>
//                     <View style={{width:'25%',justifyContent:'center',marginLeft:3}}>
//                         <Text style={{textDecorationLine:'line-through'}}>
//                             ₹220
//                         </Text>
//                         <Text style={{color:Colors.Black,fontWeight:'bold'}}>
//                             ₹180
//                         </Text>
//                     </View>
//                     <View style={{width:'75%',alignItems:'center',justifyContent:'center'}}>
//                         <Button title={"ADD"} width={100} height={38} bgColor={Colors.darkGreen} txtColor={Colors.White}/>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     )
// }