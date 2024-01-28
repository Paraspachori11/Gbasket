import { Image, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function OpenPage()
{
    return(
        <View style={{width:'100%',height:'100%'}}>
        <LinearGradient
            colors={['rgba(161,11,224,1)','rgba(9,9,121,1)']}
            start={{ y:0, x: 0.5}}
            end={{y:1,x:0.5}}
            style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}
            >

            <View>

            <Text style={{fontSize:100,fontWeight:'bold',color:'#008080',height:110}}>Gwalior</Text>

            <View style={{flexDirection:'row',alignItems:"center"}}>
                <Image source={require('../../assets/Images/logo.png')} style={{width:100,height:100}} />
                <Text style={{fontSize:85,fontWeight:'bold',color:'#fdbb2d'}}>Basket</Text>
            </View>

            <View style={{alignItems:'center',height:80,justifyContent:'center'}}>
                <Text style={{color:'#fff',fontWeight:'bold'}}>Online Grocery Store</Text>
            </View>

            </View>

        </LinearGradient>
        </View>
    )
}