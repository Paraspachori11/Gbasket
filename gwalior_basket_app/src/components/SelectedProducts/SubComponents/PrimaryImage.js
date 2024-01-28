import { View,Image,Dimensions, ScrollView, TouchableOpacity } from "react-native"
import { ServerURL } from "../../../services/ServerServices"
import Colors from "../../../../assets/Colors"
import { useState } from "react"
const {width,height} = Dimensions.get('window')

export default function PrimaryImage({img})
{
    var imageArray = img.split(',')

    const [imgNum,setImgNum] = useState(0)

    const handleImageSelection=(i)=>{
        setImgNum(i)
    }

    function secondryImage()
    {
        return imageArray.map((item,i)=>{
            return (
                <TouchableOpacity onPress={()=>handleImageSelection(i)}>
                <View style={{width:width*0.25,height:height*0.15,alignItems:'center',justifyContent:'center'}}>
                    {item == imageArray[imgNum] ?
                    <Image source={{uri:`${ServerURL}/images/${item}`}} style={{borderRadius:4,width:width*0.225,height:height*0.14}} />
                    :
                    <Image source={{uri:`${ServerURL}/images/${item}`}} style={{borderRadius:4,width:width*0.20,height:height*0.12}} />
                    }
                </View>
                </TouchableOpacity>
            )
        })
    }
    
    return(
        <View>
            <View style={{width:width,alignItems:'center'}}>
                <Image source={{uri:`${ServerURL}/images/${imageArray[imgNum]}`}} style={{width:width*0.55,height:height*0.30,borderRadius:4,marginVertical:3}} />
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{justifyContent:'center',alignItems:'center'}} style={{height:height*0.17}}>
                {secondryImage()}
            </ScrollView>
        </View>
    )
}