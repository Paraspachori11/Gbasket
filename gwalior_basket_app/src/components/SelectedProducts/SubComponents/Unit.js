import { Text, View,Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../../../../assets/Colors";
const {width,height} = Dimensions.get('window')
import LinearGradient from "react-native-linear-gradient";
import Button from "../../Button";

export default function Unit({variants,currentProductListId,setData})
{
    var productVariants = variants
    var currentProductListId = currentProductListId

    const handleSelectedProduct=(item)=>{
        // console.log("xyz",item)
        setData(item)
    }

    function selectUnit()
    {
        return productVariants.map((item)=>
        {
            
        return(
            <TouchableOpacity onPress={()=>{handleSelectedProduct(item)}}>
            <View style={{position:'relative',width:width*0.3,alignItems:'center'}}>
                <View style={{borderRadius:10,backgroundColor: item.productlistid === currentProductListId ? Colors.lightGreen : Colors.White,width:width*0.3,height:height*0.125,alignItems:"center",justifyContent:'center'}}>
                    <View style={{width:width*0.28,height:height*0.1,borderRadius:10,backgroundColor:Colors.White,elevation:5,justifyContent:'center'}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',color:Colors.Black}}>
                                {item.weight} {item.pricetype}
                            </Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold',color:Colors.Black,fontSize:17}}>
                                ₹{item.offerprice}
                            </Text>
                            <Text>
                                &nbsp;&nbsp;
                            </Text>
                            <View style={{justifyContent:'center'}}>
                                <Text style={{textDecorationLine:'line-through',fontSize:14}}>
                                    ₹{item.price}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <LinearGradient
                colors={['rgba(255,255,255,1)','rgba(39,59,123,1)']}
                start={{ y:0, x: 0.9}}
                end={{y:1,x:0.5}} 
                style={{position:'absolute',width:width*0.2,height:20,zIndex:1,elevation:5,backgroundColor:Colors.blue,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <View>
                        <Text style={{color:Colors.White,fontWeight:'bold'}}>{parseInt((item.price-item.offerprice)*100/item.price)}% OFF</Text>
                    </View>
                </LinearGradient>
            </View>
            </TouchableOpacity>
        )
        })
    }

    return (
        <View>
            <Text style={{fontWeight:'bold',marginVertical:10}}>Select Unit</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection:'row'}}>
                {selectUnit()}
            </ScrollView>
        </View>
    )
}