import { useEffect,useState } from "react";
import { TouchableOpacity, View,Text } from "react-native";

const Button=({title,width,height,bgColor,txtColor,onPress=()=>{},borderRadius,disableButton=false})=>{
    return(<TouchableOpacity onPress={onPress} disabled={disableButton}>
        <View style={{backgroundColor:bgColor,width:width,height:height,justifyContent:'center',alignItems:'center',borderRadius: borderRadius ? borderRadius : 5}}>
            <Text style={{color:txtColor,fontWeight:'bold',fontSize:16,textAlign:'center'}}>{title}</Text>
        </View>
    </TouchableOpacity>)
}

export default Button