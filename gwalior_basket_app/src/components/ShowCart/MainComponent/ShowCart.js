import { View,Dimensions,ScrollView,Text } from "react-native";
import Delivery from "../SubComponents/Delivery";
import Cart from "../SubComponents/Cart";
import Colors from "../../../../assets/Colors";
import Billing from "../SubComponents/Billing";
import Donation from "../SubComponents/Donation";
import Instructions from "../SubComponents/Instructions";
import Tip from "../SubComponents/Tip";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MakePayment from "../SubComponents/MakePayment";
const {width,height} = Dimensions.get('window')

export default function ShowCart()
{
    const [refresh,setRefresh] = useState(false)
    const [donation,setDonation] = useState(0)
    const [tip,setTip] = useState(0)

    var dispatch = useDispatch()

    // useEffect(function(){
    // var data =  [{"categoryid": 22, "companyid": 37, "createdat": "2023/9/10 22:10:29", "createdby": "ADMIN", "description": "Indulge in timeless snacking perfection with a savory array of nachos, cheese puffs, and corn chips. Experience the comforting nostalgia of these all-time favorites, delivering the perfect crunch with every bite", "descriptionfromproducttable": " Explore a world of crispy satisfaction with our vast collection of potato chips, tortilla chips, and more. Indulge in a symphony of flavors and textures, from classic to exotic, as you dive into a chip lover's paradise", "images": "ChipsGalore.jpeg,CrunchyClassics.jpeg,MunchiesMix.jpeg,Snackiverse.png", "offerprice": 159, "price": 199, "pricetype": "Kg", "productid": 42, "productimage": "ChipsGalore.jpeg", "productlistid": 24, "productname": "Chips Galore", "qty": 1, "updateat": "2023/9/10 22:10:29", "weight": 0.4}, {"categoryid": 22, "companyid": 37, "createdat": "2023/9/10 22:15:6", "createdby": "ADMIN", "description": "A savory symphony of snacks combining crunchy pretzels, roasted nuts, and buttery popcorn, perfect for satisfying every snack craving", "descriptionfromproducttable": "Indulge in timeless snacking perfection with a savory array of nachos, cheese puffs, and corn chips. Experience the comforting nostalgia of these all-time favorites, delivering the perfect crunch with every bite", "images": "ChipsGalore.jpeg,CrunchyClassics.jpeg,MunchiesMix.jpeg,Snackiverse.png", "offerprice": 269, "price": 299, "pricetype": "Kg", "productid": 44, "productimage": "CrunchyClassics.jpeg", "productlistid": 25, "productname": "Crunchy Classics", "qty": 1, "updateat": "2023/9/10 22:15:6", "weight": 0.25}, {"categoryid": 22, "companyid": 37, "createdat": "2023/9/10 22:17:35", "createdby": "ADMIN", "description": "A savory symphony of snacks combining crunchy pretzels, roasted nuts, and buttery popcorn, perfect for satisfying every snack craving", "descriptionfromproducttable": "A savory symphony of snacks combining crunchy pretzels, roasted nuts, and buttery popcorn, perfect for satisfying every snack craving", "images": "ChipsGalore.jpeg,CrunchyClassics.jpeg,MunchiesMix.jpeg,Snackiverse.png", "offerprice": 449, "price": 499, "pricetype": "Kg", "productid": 43, "productimage": "MunchiesMix.jpeg", "productlistid": 26, "productname": "Munchies Mix", "qty": 1, "updateat": "2023/9/10 22:17:35", "weight": 0.35} ]

    // data.forEach((item)=>{
    //     dispatch({type:'ADD_CART',payload:[item.productlistid,item]})
    // })
    // setRefresh(!refresh)
    // },[])


    

    var cartData = useSelector((state)=>state.cart)
    var cartDataKeys = Object.keys(cartData)
    var cartDataValues = Object.values(cartData)


    function spacer()
    {
        return(
            <View style={{width:width,height:width*0.04}}>

            </View>
        )
    }
    return(
        <ScrollView>
            <View style={{alignItems:'center',height:'auto'}}>
                <View style={{elevation:1.5,backgroundColor:Colors.White}}>
                    <Delivery cartDataKeys={cartDataKeys.length}/>
                    <Cart cartDataValues={cartDataValues} refresh={refresh} setRefresh={setRefresh}/>
                </View>
                {spacer()}
                <Billing cartDataValues={cartDataValues} donation={donation} tip={tip}/>
                {spacer()}
                <Donation donation={donation} setDonation={setDonation}/>
                {spacer()}
                <Instructions/>
                {spacer()}
                <Tip setTip={setTip}/>
                {spacer()}
                <MakePayment cartDataKeys={cartDataKeys.length}/>
            </View>
        </ScrollView>
    )
}