import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { master, margin } from '../Utilities/Styles';
import InputWithButton from '../Components/Input/InputWithButton';
import { useNavigation } from '@react-navigation/native';
import CustomFontText from '../Components/CustomFontText';

export default function HomeScreen() {

    const navigation = useNavigation();

    const enterCode = (code) => {
      navigation.navigate('Chat', { code: code })
    }
    
    return (
      <SafeAreaView style={[master.container, margin.t_30]}>

        <Image source={require('../../assets/SS.png')} style={styles.logo}/>
        <CustomFontText text={"Secret Society"} style={styles.logo_text}/>
        <InputWithButton onClick={enterCode}/>

        
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({
  logo: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 10,
  },
  logo_text: {
    alignSelf: 'center',
    fontSize: 40,
    marginBottom: 15,
    fontFamily: 'Stanley',
  }
})