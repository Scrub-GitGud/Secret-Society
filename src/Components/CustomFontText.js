import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function CustomFontText({text, style}) {

    let [fontsLoaded] = useFonts({
      'grypen': require('../../assets/fonts/QwitcherGrypen-Bold.ttf'),
      'Stanley': require('../../assets/fonts/StanleyPersonalUse-BWnRd.ttf'),
      'Comfortaa': require('../../assets/fonts/Comfortaa-VariableFont_wght.ttf'),
    })

    if(!fontsLoaded) return
    
    return (
        <Text style={[custom.text, style]}>{text}</Text>
    );
}


const custom = StyleSheet.create({
  text: {
    fontFamily: 'Comfortaa',
  }
})