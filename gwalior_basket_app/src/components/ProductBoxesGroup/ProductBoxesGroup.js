import { View,Text,FlatList,Dimensions} from "react-native"
import Colors from "../../../assets/Colors"
import ProductBox from "../ProductBox"
const {height} = Dimensions.get('window')

export default function ProductBoxesGroup({title,ProductsData,refresh,setRefresh})
{

    const Item = ({productData})=>{
        return <ProductBox ProductDetail={productData} refresh={refresh} setRefresh={setRefresh}/>
    }

    return(
        <View style={{height:height*0.42}}>
            <Text style={{fontWeight:'bold',color:Colors.Black,margin:10}}>{title}</Text>
            <FlatList 
            data={ProductsData}
            renderItem={({item})=> <Item productData={item} />}
            // numColumns={2}
            // keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}