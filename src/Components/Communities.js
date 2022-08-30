import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Communities({communities, enterCommunity}) {


    
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