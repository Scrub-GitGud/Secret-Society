import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChatInput({onClick}) {

    const [text, setText] = useState("");

    const clearText = () => {
        console.log("text Cleared");
        setText("")
    }
    
    return (
        <View style={styles.parent}>
            <TextInput
                value={text}
                placeholder="Enter your message.."
                onChangeText={setText}
                onSubmitEditing={() => onClick(text)}
                style={styles.input}
                returnKeyType="send"
                selectionColor="black"
                autoCapitalize='none'
            />
            <TouchableOpacity onPress={() => onClick(text, clearText)} style={styles.button}>
                <Icon name="send" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    parent: {
        zIndex: 5,
        elevation: 5,
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
    button: {
        backgroundColor: 'black',
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
        fontSize: 20,
        padding: 10,
        paddingVertical: 15,
        paddingRight: 65,
        
    },
})