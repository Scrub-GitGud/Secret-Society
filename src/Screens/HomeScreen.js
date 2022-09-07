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
import CreateChatModal from '../Components/CreateChatModal';
import Toast from 'react-native-toast-message';
import Communities from '../Components/Communities';
import CreateCommunityModal from '../Components/CreateCommunityModal';
import {ref as firebaseRef, set, push, onValue} from "firebase/database";
import { auth, database } from '../../firebase';
import { currentDate } from '../Utilities/Functions';
import { signOut} from "firebase/auth";

export default function HomeScreen() {
  
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [is_auth, setIsAuth] = useState(false);
    const [communities, setCommunities] = useState([])

    
    useEffect(() => {
        // console.log(auth.currentUser);
        console.log('is_auth', is_auth);

        setCommunities([])
        loadCommunities()
        
    }, [is_auth]);

    const loadCommunities = async () => {
        const username = auth.currentUser.email.replace('@g.com','')
        
        const communitiesRef = firebaseRef(database, `secret-society/user/${username}/communities`);
  
        await onValue(communitiesRef, async (snapshot) => {
            if (snapshot.exists()){
                data = snapshot.val();
                const communities = [];
                for (let key in data) {
                    communities.push({key, ...data[key]})
                }
                setCommunities(communities)
            } else {
                console.log("Not community found");
            }
        })
      }
    

    // ! ==================
    // ! Enter Chat
    // ! ==================
    const enterCode = (code, clearText) => {

        const chatGroupRef = firebaseRef(database, `secret-society/chat_group/${code}`);
        setLoadingChat(true)
        onValue(chatGroupRef, async (snapshot) => {
            setLoadingChat(false)
            if (snapshot.exists()){
                clearText()
                navigation.navigate('Chat', { code })
            } else {
                Toast.show({type: 'error', text1: "Chat group doesn't exist. Please check your code."});
            }
        })
    }
    // ! ==================
    // ! Enter Community
    // ! ==================
    const enterCommunity = (code, title) => {
        navigation.navigate('Chat', { code, title })
    }

    // ! ==================
    // ! Create Chat
    // ! ==================
    const createChat = (code, clearText) => {
        AddChatGroup('chat_group', code, null, () => {
            clearText()
            setModalVisible(!modalVisible)
        })
    }

    // ! ==================
    // ! Create Community
    // ! ==================
    const createCommunity = (code, title, clearText) => {

        AddChatGroup('community', code, title, () => {
            clearText()
            setModalVisible2(!modalVisible2)
        })
        
        // setTimeout(() => {
        //     setModalVisible2(!modalVisible2)
        //     clearText()
        //     // TODO: Generate Code
        //     if(title == 'illuminati') {
        //         Toast.show({type: 'error', text1: "Community already exist."});
        //     } else {
        //         // navigation.navigate('Chat', { code, title })
        //         const new_community = {
        //             code: 'lkaus',
        //             title: title,
        //             mambers: 1,
        //         }

        //         setCommunities([...communities, new_community])
        //     }
        // }, 2000);
    }


    // ! ==================
    // ! Firebase work (FUCK THIS CODE: NOT WORKING)
    // ! ==================
    let flag = true;
    const AddChatGroup = async (type = 'chat_group', code, title, callback) => {
        const chatGroupRef = firebaseRef(database, `secret-society/chat_group/${code}`);
        await onValue(chatGroupRef, async (snapshot) => {
            if (snapshot.exists() && flag){
                flag = false
                setTimeout(() => {flag = true}, 2000);

                console.info("Exist");
                
                if(type === 'community') Toast.show({type: 'success', text1: "Joining the community."});
                else if(type === 'chat_group') Toast.show({type: 'error', text1: "Chat group already exist."});

                if(type === 'community') AddingUserToCommunity(code, snapshot.val().title, false)
                
                if(type === 'chat_group') {
                    setTimeout(() => {
                        navigation.navigate('Chat', { code })
                    }, 1000);
                }
                callback()
            } else if(flag) {
                flag = false
                setTimeout(() => {flag = true}, 2000);
                
                console.info("Not Exist");
                set(firebaseRef(database, `secret-society/chat_group/${code}`), {
                    title: title,
                    online: 0,
                    created_at: currentDate(),
                    messages: null,
                }).then(() => {
                    callback()
    
                    if(type === 'community') AddingUserToCommunity(code, title, true)
                    if(type === 'chat_group') navigation.navigate('Chat', { code })
                }).catch((err) => {
                    console.error(err);
                })
            }
        })
    }

    // ! ====================
    // ! If type community, adding the user to community.
    // ! ====================
    const AddingUserToCommunity = (code,title, is_owner = false) => {
        const username = auth.currentUser.email.replace('@g.com','')

        // TODO Check if user already added to the community.
        
        push(firebaseRef(database, `secret-society/user/${username}/communities`), {
            code: code,
            title: title,
            is_owner: is_owner
        }).then((pushed_item) => {
            if(is_owner) Toast.show({type: 'success', text1: "Successfully joined the community"})
            else Toast.show({type: 'success', text1: "Succfully created the community"})
            console.log(pushed_item);
        }).catch((err) => {
            console.error(err);
        })
    }

    // ! ==================
    // ! Logout
    // ! ==================
    const Logout = () => {
        signOut(auth)
        setIsAuth(false)
        Toast.show({type: 'success', text1: "Logout Successful."});
    }
    
    return (
      <SafeAreaView style={[master.container, styles.parent]}>

        <View>
            <CreateChatModal modalVisible={modalVisible} setModalVisible={setModalVisible} createChat={createChat}/>
            <CreateCommunityModal modalVisible={modalVisible2} setModalVisible={setModalVisible2} createCommunity={createCommunity}/>
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
            <TouchableOpacity onPress={() => setModalVisible2(true)} style={[styles.action_btn, margin.l_5, margin.r_5]}>
                <MaterialIcons style={[margin.b_10, styles.action_icon]} name="group-add" size={30} color="white" />
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

        
        {is_auth && <Communities communities={communities} enterCommunity={enterCommunity}/>}

        
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