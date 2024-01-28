import { useRoute } from "@react-navigation/native";
import { Text, View,Dimensions, Image, ScrollView } from "react-native";
import Colors from "../../assets/Colors";
import { useEffect, useState } from "react";
import { ServerURL, postData } from "../services/ServerServices";
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import ProductBox from "../components/ProductBox";
import ViewCart from "../components/ViewCart";
import { useSelector } from "react-redux";
const {width,height} = Dimensions.get('window')

export default function Category()
{
    const [refresh,setRefresh] = useState(false)
    
    const route = useRoute()
    const categoryDetail = route.params.data
    const status = route.params.status

    // const [textClrChng,setTextClrChng] = useState(false)
    // useEffect(function(){
    //     setTimeout(()=>{
    //         setTextClrChng(!textClrChng)
    //     },2500)
    // },[textClrChng])

    function categoryImage()
    {
        return(
            <View style={{alignItems:'center'}}>
                <View style={{width:width*0.95,height:height*0.25,elevation:5,borderRadius:10,backgroundColor:Colors.lightGreen}}>
                    <Text style={{fontWeight:'bold',fontSize:25,color:Colors.darkGreen}}>{categoryDetail.category}</Text>
                    <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                        <Image  source={{uri:`${ServerURL}/images/${categoryDetail.icon}`}} style={{width:width*0.35,height:height*0.24}}/>
                    </View>
                </View>
            </View>
        )
    }

    function exploreMore()
    {
        return(
            <View style={{alignItems:'center'}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',color:Colors.pureBlack}}>Explore more...</Text>
                    <AntDesignIcon name="down" size={13} color="black"/>
                </View>
            </View>
        )
    }

    const [categoryItems,setCategoryItems] = useState([])

    const fetch_Category_Products=async()=>{
        var result = await postData('userinterface/fetch_category_products',{ categoryid : categoryDetail.categoryid })
        setCategoryItems(result.data)
    }

    // useEffect(function(){
    //     fetch_Category_Products()
    // },[categoryDetail])

    useEffect(function(){
        setCategoryItems([])
        fetch_Category_Products()
        setRefresh(!refresh)
    },[status])

    function categoryProducts()
    {
        return categoryItems.map((item)=>{
            return (<ProductBox ProductDetail={item} refresh={refresh} setRefresh={setRefresh} />)
        })
    }

    var cartData = useSelector((state)=>state.cart)
    var cartDatakeys = Object.keys(cartData).length

    return(
        <View>
            <ScrollView style={{backgroundColor:Colors.White}}>
                {categoryImage()}
                {exploreMore()}
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    {categoryProducts()}
                </View>
                {/* extra (for ViewCart space Management) */}
                {cartDatakeys !== 0 ? <View style={{height:height*0.08}}></View> : <></>}
            </ScrollView>
            <ViewCart/>
        </View>
    )
}