import { ScrollView, StyleSheet, View } from 'react-native';
import { master, margin } from '../Utilities/Styles';
import ChatInput from '../Components/Input/ChatInput';
import ChatItem from '../Components/ChatItem';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen({route}) {

    const navigation = useNavigation();

    // ! Changing Screen Header title
    useEffect(() => {
      let title = route.params.code
      if(route.params.title) title = route.params.title
      navigation.setOptions({
        title: `Chat - ${title}`,
      })
    }, []);

    const scrollViewRef = useRef();

    const this_user = 'xxx' // TODO:
    
    const [messages, setMessages] = useState([
      {
        id: 1,
        user: "abc",
        msg: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        time: '30 seconds ago'
      },
      {
        id: 2,
        user: "qwe",
        msg: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through.',
        time: '30 seconds ago'
      },
      {
        id: 3,
        user: "xxx",
        msg: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,',
        time: '30 seconds ago'
      },
      {
        id: 4,
        user: "sad",
        msg: 'tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words,',
        time: '30 seconds ago'
      },
      {
        id: 5,
        user: "xxx",
        msg: 'over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        time: '30 seconds ago'
      },
      {
        id: 6,
        user: "fgy",
        msg: 'as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,',
        time: '30 seconds ago'
      },
      {
        id: 7,
        user: "asd",
        msg: 'Հայերեն Shqip ‫العربية Български Català 中文简体 Hrvatski Česky Dansk Nederlands English Eesti Filipino Suomi Français ქართული Deutsch Ελληνικά ‫עברית हिन्दी Magyar Indonesia Italiano Latviski Lietuviškai македонски Melayu Norsk Polski Português Româna Pyccкий Српски Slovenčina Slovenščina Español Svenska ไทย Türkçe Українська Tiếng Việt',
        time: '30 seconds ago'
      },
      {
        id: 8,
        user: "zxc",
        msg: 'What is Lorem Ipsum?',
        time: '30 seconds ago'
      },
      {
        id: 9,
        user: "xxx",
        msg: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        time: '30 seconds ago'
      },
    ])

    const send = (text, clearText) => {
        console.log(text);
        const new_msg = {
          id: messages[messages.length - 1].id + 1,
          user: "xxx",
          msg: text,
          time: '30 seconds ago'
        }
        setMessages([...messages, new_msg])
        scrollViewRef.current.scrollToEnd({ animated: true })
        clearText()
    }
    
    return (
      <View style={[master.relative, styles.parent]}>

          <ScrollView 
            ref={scrollViewRef} style={styles.scrollView}
            // ! Scrolls at the bottom
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {messages.map(message => (
              <ChatItem key={message.id} this_user={this_user} user={message.user} msg={message.msg} time={message.time}/>
            ))}
          </ScrollView>

          <ChatInput onClick={send}/>
          
      </View>
    );
}


const styles = StyleSheet.create({
    parent: {
      flex: 1
    },
    scrollView: {
      marginBottom: 60
    },
})