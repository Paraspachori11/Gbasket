import {Image, View, Dimensions} from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../assets/Colors';
import {DrawerActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

export default function AppHeader({props}) {
  var navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#fff',
          display: 'flex',
          width: width,
          height: height * 0.06,
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 5,  
          elevation: 5,
          marginBottom: 5,
        }}>
        <MCI
          name="menu"
          size={24}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />

        <Image
          style={{resizeMode: 'contain', width: 50, height: 50}}
          source={require('../../assets/Images/logo.png')}
        />

        <MCI name="account" size={24} />
      </View>
    </View>
  );
}
