import { Text, View,Dimensions,ScrollView } from "react-native";
import TextBox from "../components/TextBox";
import CircularProduct from "../components/CircularProduct";
import ProductBoxesGroup from "../components/ProductBoxesGroup/ProductBoxesGroup";
import { getData, postData } from "../services/ServerServices";
import { useEffect, useState } from "react";
import ViewCart from "../components/ViewCart";
import Colors from "../../assets/Colors";
import BrandsInFocus from "../components/BrandsInFocus";
import BigSummerFest from "../components/BigSummerFest";
const {width,height} = Dimensions.get('window')

export default function Home()
{
    const [refresh,setRefresh] = useState(false)

    const [productList,setProductList] = useState([])

    const fetch_ProductList=async()=>{
        var result = await postData('userinterface/fetch_category_products_by_category',{categoryname:'Snack'})
        setProductList(result.data)
        // console.log(result.data)
    }

    useEffect(function(){
        fetch_ProductList()
    },[])

    return(
        <View>
            <ScrollView>
                <View style={{alignItems:'center',backgroundColor:Colors.White}}>
                    <TextBox placeHolder={"Search"} icon={"magnify"} width={width*0.96} borderRadius={15}/>
                    <CircularProduct heading={"Explore Categories"}/>
                    <ProductBoxesGroup title={'Snacks & Sensations'} ProductsData={productList} refresh={refresh} setRefresh={setRefresh}/>
                    <BrandsInFocus/>
                    <BigSummerFest/>
                </View>
            </ScrollView>
            <ViewCart/>
        </View>
    )
}