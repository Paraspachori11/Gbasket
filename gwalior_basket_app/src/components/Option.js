import {View,Text, TouchableOpacity} from "react-native"
import CountryFlag from "react-native-country-flag"
import Colors from "../../assets/Colors"

const Option=({isocode,ctycode,name,onPress=()=>{}})=>{
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={{flexDirection:'row',width:225,height:40,alignItems:'center'}}>
                <CountryFlag isoCode={isocode} size={35} style={{borderRadius:4,flex:0.2,marginLeft:1}}/>
                <Text style={{flex:0.8,paddingLeft:5,fontWeight:'bold'}}>{name} ({isocode}) (+{ctycode})</Text>
            </View>
            <View style={{borderColor:Colors.darkGrey,borderWidth:0.2,marginLeft:10,marginRight:10}}/>
        </TouchableOpacity>
    )
}

export default Option