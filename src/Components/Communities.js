import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Communities({enterCommunity}) {

    const communities = [
        {
            code: 'aaa',
            title: "Illuminati",
            mambers: 5,
        },
        {
            code: 'bbb',
            title: "Secret Companies",
            mambers: 30,
        },
        {
            code: 'ccc',
            title: "Assossiation of secret hold of donkey covenants",
            mambers: 3,
        },
        {
            code: 'ddd',
            title: "The Avengers",
            mambers: 6,
        },
        {
            code: 'eee',
            title: "Monsters on the run",
            mambers: 300,
        },
        {
            code: 'fff',
            title: "Illuminati",
            mambers: 5,
        },
        {
            code: 'ggg',
            title: "Secret Companies",
            mambers: 30,
        },
        {
            code: 'hhh',
            title: "Assossiation of secret hold of donkey",
            mambers: 3,
        },
        {
            code: 'iii',
            title: "The Avengers",
            mambers: 6,
        },
        {
            code: 'jjj',
            title: "Monsters on the run",
            mambers: 300,
        },
    ]
    
    return (
        <View style={styles.parent}>
            <Text style={styles.title}>Your Communities</Text>
            <ScrollView style={styles.scrollView}>
                
                {communities.map(community => (
                    <TouchableOpacity onPress={() => enterCommunity(community.code, community.title)} key={community.code} style={styles.community_item}>
                        <Text style={styles.community_title}>{community.title} ({community.mambers})</Text>
                        <MaterialIcons style={styles.fowar_icon} name="arrow-forward-ios" size={20} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    parent: {
        flex: 1,
        width: '100%',
        // maxHeight: 300,
    },
    scrollView: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 15,
        fontWeight: "700"
    },
    community_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    community_title: {
        fontSize: 20,
        fontWeight: '700',
    },
    fowar_icon: {
        
    },
})