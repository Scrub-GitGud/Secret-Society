import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function InputWithButton({onClick, icon, loadingChat, setLoadingChat}) {

    const [text, setText] = useState("");

    const clearText = () => {
        setText("")
    }
    
    return (
    <View style={styles.parent}>
        <TextInput placeholder='Enter secret key' onChangeText={setText} value={text} style={styles.input} selectionColor="black" autoCapitalize='none'/>
        <TouchableOpacity onPress={() => onClick(text, clearText)} style={styles.button}>
            {!loadingChat ? (
                <Entypo name="arrow-bold-right" size={30} color="white" />
            ) : (
                <AntDesign name="loading1" size={30} color="white" />
            )}
        </TouchableOpacity>
      </View>
    );
}


const styles = StyleSheet.create({
    parent: {
        position: 'relative'
    },
    button: {
        backgroundColor: 'black',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: 60,

        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 25,
        padding: 10,
        paddingVertical: 15,
        paddingRight: 65
    },
})