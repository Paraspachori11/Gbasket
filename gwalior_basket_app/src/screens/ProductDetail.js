import { Text, View,Dimensions } from "react-native";
import SelectedProducts from "../components/SelectedProducts/MainComponent/SelectedProduct";
import ViewCart from "../components/ViewCart";
import { useState } from "react";
const {width,height} = Dimensions.get('window')
import Colors from "../../assets/Colors";
import { useRoute } from "@react-navigation/native";

export default function ProductDetail()
{
    const [refreshSP,setSPRefresh] = useState(false)
    const route = useRoute()
    const productInfo = route.params.data
    // console.log(productInfo)

    // {"categoryid": 22, "companyid": 37, "createdat": "2023/9/10 22:17:35", "createdby": "ADMIN", "description": "A savory symphony of snacks combining crunchy pretzels, roasted nuts, and buttery popcorn, perfect for satisfying every snack craving", "descriptionfromproducttable": "A savory symphony of snacks combining crunchy pretzels, roasted nuts, and buttery popcorn, perfect for satisfying every snack craving", "images": "ChipsGalore.jpeg,CrunchyClassics.jpeg,MunchiesMix.jpeg,Snackiverse.png", "offerprice": 449, "price": 499, "pricetype": "Kg", "productid": 43, "productimage": "MunchiesMix.jpeg", "productlistid": 26, "productname": "Munchies Mix", "updateat": "2023/9/10 22:17:35", "weight": 0.35}

    return(
        <View style={{backgroundColor:Colors.White}}>
            <SelectedProducts productdata={productInfo} refreshSP={refreshSP} setSPRefresh={setSPRefresh}/>
            <ViewCart adjust={true}/>
        </View>
    )
}