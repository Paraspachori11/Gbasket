import {View,Dimensions,Image,Text} from "react-native"
import { ServerURL } from "../services/ServerServices"
const {width,height} = Dimensions.get("window")
import Colors from "../../assets/Colors"
import LinearGradient from "react-native-linear-gradient"

export default function BigSummerFest()
{
    var data = [{name:'Grains',image:'Grains_pasta.png'},{name:'Catch',image:'catchturmeric500g'},{name:"Dahi",image:'creamy_yogurt.jpeg'},{name:'Crunchy Classics',image:'CrunchyClassics.jpeg'},{name:"Cleaner",image:'all_purpose_cleaner.jpeg'},{name:'artisanial',image:'artisanal_baguette.jpeg'},{name:'Grains',image:'Grains_pasta.png'},{name:'Catch',image:'catchturmeric500g'},{name:"Dahi",image:'creamy_yogurt.jpeg'},{name:'Crunchy Classics',image:'CrunchyClassics.jpeg'},{name:"Cleaner",image:'all_purpose_cleaner.jpeg'},{name:'artisanial',image:'artisanal_baguette.jpeg'},]
    function productItem()
    {
        return (data.map((item)=>{
        return(
            <View style={{height:height*0.25,width:width*0.3}}>

                <LinearGradient
                colors={['rgba(250,188,74,1)', 'rgba(255, 255, 255, 1)', 'rgba(64, 210, 233, 1)']}
                start={{ x: 0.5, y: 0.3 }}
                end={{ x: 0.5, y:1.1 }}
                style={{position:'absolute',height:height*0.13,width:width*0.295,borderTopLeftRadius:12,borderTopRightRadius:12,borderBottomLeftRadius:35,borderBottomRightRadius:35}}>

                </LinearGradient>

                <View style={{position:'relative',height:height*0.1875,borderColor:Colors.darkGreen,alignItems:'center',justifyContent:'flex-end'}}>
                    <Image source={{uri:`${ServerURL}/images/${item.image}`}} style={{width:110,height:110}}/>
                </View>

                <View style={{height:height*0.0625,borderColor:Colors.darkBlue,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold',fontSize:13,color:Colors.Black,width:width*0.28,textAlign:'center'}}>{item.name}</Text>
                </View>

            </View>
        )
    })
        )
    }
    return(
        <View style={{}}>

            <Text style={{fontWeight:'bold',fontSize:18,color:Colors.pureBlack,marginLeft:5}}>Big summer fest</Text>

            <View style={{flexDirection:'row',justifyContent:'space-evenly',flexWrap:"wrap"}}>
                {productItem()}
            </View>
        </View>
    )
}