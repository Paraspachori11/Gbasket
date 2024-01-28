// 4
import {View,Dimensions,Text,Image} from "react-native"
const {width,height} = Dimensions.get('window')
import Colors from "../../../../assets/Colors"
import CheckBox from "../../CheckBox"

export default function Donation({donation,setDonation})
{
    const AddDonation=()=>{
        if(donation === 0)
        {
            setDonation(1)
        }
        else
        {
            setDonation(0)
        }
    }

    return(
        <View style={{width:width*0.96,alignItems:'center',justifyContent:'center',elevation:1.5,backgroundColor:Colors.White}}>
            <View style={{width:width*0.92,height:height*0.125,flexDirection:'row',justifyContent:'space-between'}}>

                <View style={{width:width*0.18,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../../../../assets/Images/donation.png')} style={{width:55,height:55,backgroundColor:Colors.pink,borderRadius:5}}/>
                </View>

                <View style={{width:width*0.54,justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold',color:Colors.Black}}>Feeding India Donation</Text>
                    <Text>Working towards a malnutrition-free India. Feeding India...<Text style={{color:Colors.darkGreen}}>read more</Text></Text>
                    
                </View>

                <View style={{width:width*0.18,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold',color:Colors.Black}}>₹1</Text>
                    <Text>&nbsp;</Text>
                    <CheckBox onPress={()=>AddDonation()}/>
                </View>

            </View>
        </View>
    )
}