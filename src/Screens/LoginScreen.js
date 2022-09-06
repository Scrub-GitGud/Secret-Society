import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomFontText from '../Components/CustomFontText';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import { auth } from '../../firebase';

export default function LoginScreen({route}) {

    const navigation = useNavigation();

    const [is_registering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const Login = async () => {
        if(username == '' || password == '') Toast.show({type: 'error', text1: "Please enter codename & password"});

        try {
            const email = `${username}@g.com`
            const res = await signInWithEmailAndPassword(auth, email, password);
            const user = res.user;
            console.log(user);

            setUsername("")
            setPassword("")
            Toast.show({type: 'success', text1: "Login Successful"});
            route.params.setIsAuth(true)
            navigation.goBack()
        } catch (err) {
            console.error(err.code);
            switch (err.code) {
                case 'auth/user-not-found':
                    Toast.show({type: 'error', text1: "User not found. Please check your codename"});
                    break;
                case 'auth/wrong-password':
                    Toast.show({type: 'error', text1: "Wrong password. Please try again."});
                    break;
                default:
                    alert(err.message); 
                    break;
            }
        }
    }

    const Register = async () => {

        if(username == '' || password == '') Toast.show({type: 'error', text1: "Please enter codename & password"});
        
        
        try {
            const email = `${username}@g.com`
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;

            setUsername("")
            setPassword("")
            Toast.show({type: 'success', text1: "Registration Successful"});
            setIsRegistering(false)
            
          } catch (err) {
            console.error(err.code);
            switch (err.code) {
                case 'auth/email-already-in-use':
                    Toast.show({type: 'error', text1: "User already exist"});
                    break;
                case 'auth/weak-password':
                    Toast.show({type: 'error', text1: "Password must contain atleast 6 characters."});
                    break;
                default:
                    alert(err.message); 
                    break;
            }
        }
    }
    
    return (
        <View style={styles.parent}>
            <Image source={require('../../assets/SS.png')} style={styles.logo}/>
            <CustomFontText text={"Secret Society"} style={styles.logo_text}/>

            <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder='User Codename' autoCapitalize="none" autoCorrect={false}/>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder='Password' autoCapitalize="none" autoCorrect={false}/>

            {!is_registering ? (
                <Pressable onPress={() => Login()} style={[styles.button]}>
                    <Text style={[styles.textStyle]}>Login</Text>
                </Pressable>
            ) : (
                <Pressable onPress={() => Register()} style={[styles.button]}>
                    <Text style={[styles.textStyle]}>Register</Text>
                </Pressable>
            )}

            {!is_registering ? (
                <TouchableOpacity onPress={() => setIsRegistering(true)}>
                    <Text style={styles.sub_text}>Don't have an account? <Text style={styles.blue_text}>Join Now.</Text></Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => setIsRegistering(false)}>
                    <Text style={styles.sub_text}>Already have an account? <Text style={styles.blue_text}>Login.</Text></Text>
                </TouchableOpacity>
            )}

            <Toast />
        </View>
    );
}


const styles = StyleSheet.create({
    textCenter: {
        textAlign: 'center',
    },
    parent: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 5,
        paddingHorizontal: 20,
        paddingBottom: 70,
    },
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
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        marginTop: 15,
        elevation: 2,
        borderColor: 'black',
        backgroundColor: "black",
        borderWidth: 1,
        width: 150,
        alignSelf: 'center',
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    sub_text: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        fontWeight: '700',
    },
    blue_text: {
        color: '#1bb3f5'
    }
})