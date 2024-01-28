import {View,Dimensions,Image,Text} from "react-native"
import { ServerURL } from "../services/ServerServices"
const {width,height} = Dimensions.get("window")
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import Colors from "../../assets/Colors"

export default function BrandsInFocus()
{
    var bannerArray = ['b1.jpg','b2.jpg','b3.jpg','b5.jpg','b6.jpg']
    function Banners()
    {
        return(
        bannerArray.map((item)=>{
            return(<View>
                <View style={{position:'relative',height:height*0.17,alignItems:'center',justifyContent:'center'}}>
                    <Image source={{uri : `${ServerURL}/images/${item}`}} style={{width:width*0.95,height:height*0.15,borderRadius:15}} />
                </View>
    
                <View style={{position:'absolute',right:width*0.065,top:height*0.06,height:height*0.06,width:width*0.11,borderRadius:width*0.055,backgroundColor:Colors.pureBlack,justifyContent:'center',alignItems:'center'}}>
                    <AntDesignIcon name="arrowright" size={width*0.055} color="white"/>
                </View>
            </View>
            )
        })
        )
    }
    return(
        <View style={{marginTop:10}}>

            <Text style={{fontWeight:'bold',fontSize:18,color:Colors.Black,marginLeft:5}}>Brands in focus</Text>

            {Banners()}
        </View>
    )
}