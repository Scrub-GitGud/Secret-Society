import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { master, margin } from '../Utilities/Styles';
import InputWithButton from '../Components/Input/InputWithButton';
import { useNavigation } from '@react-navigation/native';
import CustomFontText from '../Components/CustomFontText';
import SpaceX from '../Components/SpaceX';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import MyModal from '../Components/MyModal';
import Toast from 'react-native-toast-message';
import Communities from '../Components/Communities';

export default function HomeScreen() {
  
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [is_auth, setIsAuth] = useState(true);

    useEffect(() => {
      console.log(is_auth);
    }, [is_auth]);

    // ! ==================
    // ! Enter Chat
    // ! ==================
    const enterCode = (code, clearText) => {
        setLoadingChat(true)
        setTimeout(() => {
            setLoadingChat(false)
            clearText()
            if(code === 'aaa') {
                navigation.navigate('Chat', { code: code })
            } else {
                Toast.show({type: 'error', text1: "Chat group doesn't exist. Please check your code."});
            }
        }, 2000);
    }
    // ! ==================
    // ! Enter Community
    // ! ==================
    const enterCommunity = (code, title) => {
        setTimeout(() => {
            navigation.navigate('Chat', { code, title })
        }, 2000);
    }

    // ! ==================
    // ! Create Chat
    // ! ==================
    const createChat = (code, clearText) => {
        console.log(code);
        setTimeout(() => {
            setModalVisible(!modalVisible)
            clearText()
            if(code === 'aaa') {
                // ! If already exists, take to the chat group instead of creating.
                Toast.show({type: 'error', text1: "Chat group already exist."});
                setTimeout(() => navigation.navigate('Chat', { code: code }), 1000);
            } else {
                navigation.navigate('Chat', { code: code })
            }
        }, 2000);
    }

    // ! ==================
    // ! Logout
    // ! ==================
    const Logout = () => {
        setIsAuth(false)
        Toast.show({type: 'success', text1: "Logout Successful."});
    }
    
    return (
      <SafeAreaView style={[master.container, styles.parent]}>

        <View>
            <MyModal modalVisible={modalVisible} setModalVisible={setModalVisible} createChat={createChat}/>
            <Toast />
        </View>

        <Image source={require('../../assets/SS.png')} style={styles.logo}/>
        <CustomFontText text={"Secret Society"} style={styles.logo_text}/>
        <InputWithButton onClick={enterCode} loadingChat={loadingChat} setLoadingChat={setLoadingChat}/>

        <View style={styles.flex}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.action_btn, margin.r_5]}>
                <FontAwesome5 style={[margin.b_10, styles.action_icon]} name="plus" size={30} color="white" />
                <Text style={styles.action_btn_text}>Create Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.action_btn, margin.l_5, margin.r_5]}>
                <MaterialIcons style={[margin.b_10, styles.action_icon]} name="group" size={30} color="white" />
                <Text style={styles.action_btn_text}>Community</Text>
            </TouchableOpacity>
            {is_auth ? (
              <TouchableOpacity onPress={() => Logout()} style={[styles.action_btn, margin.l_5]}>
                  <Entypo style={[margin.b_10, styles.action_icon, styles.rotate180]} name="login" size={30} color="white" />
                  <Text style={styles.action_btn_text}>Logout</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Login', {setIsAuth: setIsAuth})} style={[styles.action_btn, margin.l_5]}>
                <Entypo style={[margin.b_10, styles.action_icon]} name="login" size={30} color="white" />
                <Text style={styles.action_btn_text}>Login</Text>
            </TouchableOpacity>
            )}
        </View>

        
        {is_auth && <Communities enterCommunity={enterCommunity}/>}

        
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    logo: {
        height: 70,
        width: 70,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 10,
    },
    logo_text: {
        alignSelf: 'center',
        fontSize: 40,
        marginBottom: 15,
        fontFamily: 'Stanley',
    },

    flex: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    action_btn: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        width: 100,
        height: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    action_icon: {
        color: 'black',
    },
    action_btn_text: {
        color: 'black',
        fontSize: 16,
    },
    rotate180: {
        transform: [
        { rotate: "180deg" }
        ]
    },
})