import { Text, View,ScrollView,Dimensions } from "react-native";
import { useState,useEffect } from "react";
import TextBox from "../components/TextBox";
import Colors from "../../assets/Colors";
import ProductBox from "../components/ProductBox";
import { getData } from "../services/ServerServices";
import ViewCart from "../components/ViewCart";
const {width,height} = Dimensions.get('window')

export default function Product()
{
    const [refresh,setRefresh] = useState(false)

    const [allItems,setAllItems] = useState([])

    const fetch_All_Products=async()=>{
        var result = await getData('userinterface/fetch_all_products')
        setAllItems(result.data)
    }

    useEffect(function(){
        setAllItems([])
        fetch_All_Products()
        setRefresh(!refresh)
    },[])
    
    function categoryProducts()
    {
        return allItems.map((item)=>{
            return (<ProductBox ProductDetail={item} refresh={refresh} setRefresh={setRefresh} />)
        })
    }

    return(
        <View>
            <ScrollView>
                <View style={{alignItems:'center',backgroundColor:Colors.White}}>
                    <TextBox placeHolder={"Explore All Products"} icon={"magnify"} width={width*0.96} borderRadius={15}/>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {categoryProducts()}
                    </View>
                </View>
            </ScrollView>
            <ViewCart/>
        </View>
    )
}