import { useEffect, useState } from "react";
import { Image, Text, View,Dimensions } from "react-native";
import { postData } from "../../../services/ServerServices";
import { useSelector } from "react-redux";
const {width,height} = Dimensions.get('window')

export default function Description({productlistid})
{
    const [descList,setDescList] = useState([])
    useEffect(function(){
        fetch_Description()
    },[productlistid])

    const fetch_Description=async()=>{
        var result = await postData('userinterface/fetch_description_by_productlistid',{productLId:productlistid})
        console.log(result)
        var fullDescription = result.data[0].description
        // console.log(fullDescription.split(/\n+/).map((line) => line.trim()).filter((line) => line !== ''))
        setDescList(fullDescription.split(/\n+/).map((line) => line.trim()).filter((line) => line !== ''))
    }

    function descriptionLines()
    {
        return descList.map((item)=>{
            return (
            <View style={{flexDirection:'row'}}>
                <View style={{paddingTop:5}}>
                    <Image source={require('../../../../assets/Images/dot.png')} style={{width:8,height:8}}/>
                </View>
                <View>
                    <Text>{item}</Text>
                </View>
            </View>
            )
        })
    }

    var cartData = useSelector((state)=>state.cart)
    var cartDatakeys = Object.keys(cartData).length
    
    return(
        <View>
            <Text style={{fontWeight:'bold',marginVertical:10}}>Description</Text>
            <View>
                {descriptionLines()}
            </View>
            <View style={{marginVertical:5}}></View>
            {/* extra (for ViewCart space Management) */}
            {cartDatakeys !== 0 ? <View style={{height:height*0.08}}></View> : <></>}
        </View>
    )
}