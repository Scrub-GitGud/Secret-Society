import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ChatItem({onClick, this_user, user, msg, time}) {

    const my_msg = this_user === user
    
    return (
        <View style={styles.parent}>
            <View style={[styles.item_container, my_msg ? styles.right_msg : styles.left_msg]}>
                <TouchableOpacity onPress={onClick} style={[styles.item, my_msg ? [styles.right_msg, styles.right_msg_color] : styles.left_msg]}>
                    <Text style={[styles.item_text, my_msg ? styles.right_msg_color : null]}>{msg}</Text>
                </TouchableOpacity>
                <Text style={[styles.time_text, my_msg ? styles.right_msg : styles.left_msg]}>{time}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    parent: {
        zIndex: 1,
        elevation: 1,
        marginHorizontal: 10,
        marginVertical: 20,
    },
    item_container: {
        maxWidth: '70%',
        alignSelf: 'flex-start',
    },
    item: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 20,
    },
    item_text: {
        color: 'white'
    },
    left_msg: {
        borderTopLeftRadius: 0,
        alignSelf: 'flex-start',
    },
    right_msg: {
        borderTopRightRadius: 0,
        alignSelf: 'flex-end',
    },
    right_msg_color: {
        backgroundColor: 'white',
        color: 'black'
    },
    time_text: {
        marginTop: 5,
        marginHorizontal: 5,
        color: 'gray',
        maxWidth: '70%',
        alignSelf: 'flex-end',
    }
})