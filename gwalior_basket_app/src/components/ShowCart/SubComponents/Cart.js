// 2

import { View,Image,Dimensions, Text } from "react-native";
const {width,height} = Dimensions.get('window')
import { ServerURL } from "../../../services/ServerServices";
import Colors from "../../../../assets/Colors";
import OutlinedButton from "../../OutlinedButton";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Cart({cartDataValues,refresh,setRefresh})
{
    var dispatch = useDispatch()
    const [image,setImage] = useState(false)

    useEffect(function(){
        if(cartDataValues.length == 0)
        {
            setImage(true)
        }
        else
        {
            setImage(false)
        }
    },[cartDataValues])

    function cartItems(){
        return(
            cartDataValues.map((item)=>{

                const handleSelectedQuantity=(value)=>{
                    if(value === 0)
                    {
                        dispatch({type:'DELETE_CART',payload:[item.productlistid]})
                    }
                    else
                    {
                        item['qty'] = value
                        dispatch({type:'ADD_CART',payload:[item.productlistid,item]})
                    }
                    setRefresh(!refresh)
                }

                return(
                    <View style={{flexDirection:'row',width:width*0.96,height:height*0.16,justifyContent:'space-evenly',alignItems:'center'}}>
            
                        <View style={{borderWidth:2,borderColor:Colors.Grey,width:width*0.23712,height:height*0.14,alignItems:'center',justifyContent:'center',borderRadius:10}}>
                            <Image source={{uri:`${ServerURL}/images/${item.productimage}`}} style={{width:90,height:90}}/>
                        </View>
            
                        <View style={{width:width*0.4104,height:height*0.14}}>
            
                            <View style={{height:height*0.065,justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold',color:Colors.Black}}>{item.productname}</Text>
                            </View>
            
                            <View style={{height:height*0.075,justifyContent:'space-between'}}>
                                <View>
                                    <Text style={{fontWeight:'bold',fontSize:12}}>{item.weight} {item.pricetype}</Text>
                                </View>
            
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{fontWeight:'bold',color:Colors.Black}}>₹{item.offerprice*item.qty}</Text>
                                    <Text>&nbsp;&nbsp;</Text>
                                    <Text style={{textDecorationLine:'line-through',fontSize:12}}>₹{item.price*item.qty}</Text>
                                </View>
                            </View>
                            
                        </View>
            
                        <View style={{width:width*0.26448,height:height*0.14,alignItems:'center'}}>
                            <OutlinedButton handleSelectedQuantity={(value)=>handleSelectedQuantity(value)} data={item} width={width*0.24448} bgColor={Colors.darkGreen} txtColor={Colors.White} title={item.qty} height={32}/>
                        </View>
            
                    </View>
                )
            })
        )
    }

    return(
        <View>
            {image ?
            <View style={{alignItems:'center'}}>
                <Image source={require('../../../../assets/Images/EmptyCart.png')} style={{width:width*0.75,height:height*0.18}}/>
            </View>
            :
            <></>
            }
            {cartItems()}
        </View>
    )
}