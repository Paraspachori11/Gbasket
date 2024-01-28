import { ScrollView, Text, View } from "react-native";
import PrimaryImage from "../SubComponents/PrimaryImage";
import Colors from "../../../../assets/Colors";
import Unit from "../SubComponents/Unit";
import { useEffect, useState } from "react";
import { postData } from "../../../services/ServerServices";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import OutlinedButton from "../../OutlinedButton";
import Description from "../SubComponents/Description";


export default function SelectedProducts({productdata,refreshSP,setSPRefresh})
{
    // var productdata = {"categoryid": 7, "companyid": 1, "createdat": "2023/8/16 10:13:45", "createdby": "ADMIN", "description": "Variety pack of delicious snacks for all occasions", "descriptionfromproducttable": "Variety pack of delicious snacks for all occasions", "images": "kbc.webp,kbc2.webp,kbc3.webp,kbc4.webp,kbc5.jpeg", "offerprice": 435, "price": 450, "pricetype": "Kg", "productid": 7, "productimage": "assorted_snack_pack.jpeg", "productlistid": 15, "productname": "Assorted Snack Pack", "updateat": "2023/8/16 10:13:45", "weight": 1}

    // the above productdata will be loaded from the clicked container & then it's "productlistid" would be used to search for qty from redux to manipulate the button
    const [data,setData] = useState(productdata)
    // console.log(data.productlistid)

    // var productlistid = data.productlistid
    // (alter)
        const [productlistid,setProductListId] = useState(data.productlistid)

        useEffect(function(){
            console.log(data)
            //*********** */ M.M.Imp (without this OutlinedButton is not changing)************** 
            setQty(0)
            // *********************************************************************************
            setProductListId(data.productlistid)
        },[data])

    var cartData = useSelector((state)=>state.cart)
    // console.log(cartData)
    // console.log(cartData[productlistid])
    
    const [qty,setQty] = useState(0)
    // console.log(qty)

    useEffect(() => {
        // Use useEffect to update qty when cartData changes
        if(cartData[productlistid]){
          setQty(cartData[productlistid].qty);
        }
        else
        {
            setQty(0)
        }
      }, [cartData, productlistid]);


    const [variants,setVariants] = useState([])

    useEffect(function()
    {
        fetch_variants()
    },[])

    const fetch_variants=async()=>{
        var result = await postData('userinterface/fetch_productlist_variants',{'productId':data.productid})
        setVariants(result.data)
    }

    function spacer()
    {
        return(<View style={{marginHorizontal:10,marginVertical:5}}></View>)
    }

    const handleAdd=()=>{
        handleSelectedQuantity(1)
    }

    var dispatch = useDispatch()

    const handleSelectedQuantity=(value)=>{
        if(value === 0)
        {
            dispatch({type:'DELETE_CART',payload:[data.productlistid]})
            setQty(value)
        }
        else
        {
            data['qty'] = value
            dispatch({type:'ADD_CART',payload:[data.productlistid,data]})
            setQty(value)
        }
        setSPRefresh(!refreshSP)
    }

    return(
        <ScrollView>
            <View>
                <PrimaryImage img={data.images}/>
            </View>
            <View>
                <Text style={{color:Colors.Black,fontSize:25,fontWeight:'bold'}}>{data.productname}</Text>
            </View>
            {spacer()}
            <View>
                <Unit variants={variants} currentProductListId={data.productlistid} setData={setData}/>
            </View>
            <View style={{margin:5}}>
                {qty == 0 ?
                <Button title={"ADD"} width={110} height={38} bgColor={Colors.darkGreen} txtColor={Colors.White} onPress={handleAdd}/>
                :
                <OutlinedButton data={data} title={qty} handleSelectedQuantity={(value)=>handleSelectedQuantity(value)} width={110} height={38} bgColor={Colors.darkGreen} txtColor={Colors.White}/>
                }
            </View>
            <Description productlistid={productlistid}/>
        </ScrollView>
    )
}