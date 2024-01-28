import { View,Text,ScrollView,Dimensions,TouchableOpacity } from "react-native"
import { ServerURL, getData } from "../services/ServerServices"
import { Image } from "react-native"
import Colors from "../../assets/Colors"
import TextBox from "./TextBox"
import LinearGradient from "react-native-linear-gradient"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
const {width,height} = Dimensions.get('window')

export default function CircularProduct(props)
{
    // var category = [{categoryId:1,image:'creamy_yogurt.jpeg',name:'Dairy'},{categoryId:2,image:'Beverages.png',name:'Beverages'},{categoryId:3,image:'Grains_pasta.png',name:'pasta'},{categoryId:4,image:'Health_wellness.png',name:'Vitamins'},{categoryId:5,image:'Pet_supplies.png',name:'Pet Food'},{categoryId:6,image:'Electronics.png',name:'Duo Podes'}]

    // colorShades = ['#C7EFCF','#AAF0D1','#90EE90','#76FF7A']
    
    // var colorLength = colorShades.length

    // function colorPicker(i)
    // {
    //     return colorShades[i%colorLength]
    // }

    //backend pe image request are not visible
    // function categoryProducts()
    // {
    //     return category.map((item,i)=>{
    //         return(
    //         <View style={{alignItems:'center',margin:4}}>
    //             <View style={{width:90,height:90,borderRadius:45,alignItems:'center',justifyContent:'center'}}>
    //                 <Image source={{uri:`${ServerURL}/images/${item.image}`}} style={{width:75,height:75}}/>
    //             </View>
    //             <Text>{item.name}</Text>
    //         </View>
    //         )
    //     })
    // }

    const [refresh,setRefresh] = useState(false)

    const [category,setCategory] = useState([])

    useEffect(function()
    {
        fetch_categories()
    },[])

    const fetch_categories =async()=>{
        var result = await getData('userinterface/fetch_all_categories')
        setCategory(result.data)
    }

    var navigater = useNavigation()

    const handleShowCategory=(item)=>{
        navigater.navigate('Category',{data : item, status : refresh})
        setRefresh(!refresh)
    }

    function categoryProducts()
    {
        return category.map((item)=>{
            return(
            <TouchableOpacity onPress={()=>handleShowCategory(item)} style={{alignItems:'center',margin:4}}>
                <LinearGradient
                    colors={['rgba(221,233,9,1)','rgba(25,153,44,1)']}
                    start={{ y:0, x: 0.5}}
                    end={{y:1,x:0.5}}
                    style={{width:90,height:90,borderRadius:45,alignItems:'center',justifyContent:'center'}}
                >
                <Image source={{uri:`${ServerURL}/images/${item.icon}`}} style={{width:75,height:75}}/>
                </LinearGradient>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{width:65}}>{item.category}</Text>
            </TouchableOpacity>
            )
        })
    }

    return(
        <View>
            <Text style={{fontWeight:'bold',color:Colors.Black,margin:10}}>{props.heading}</Text>
            <View style={{flexDirection:'row'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {categoryProducts()}
                </ScrollView>
            </View>
        </View>
    )
}