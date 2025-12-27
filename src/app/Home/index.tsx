import { View, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import { Button } from '@/components/Button';
import { styles } from './styles';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from '@/components/Item';
import { useState } from 'react';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITEMS = [
    {
        id: "1",
        status: FilterStatus.DONE,
        description: "1 pacote de café"
    },
    {
        id: "2",
        status: FilterStatus.PENDING,
        description: "3 pacotes de macarrão"
    },
    {
        id: "3",
        status: FilterStatus.PENDING,
        description: "3 cebolas"
    },
]


export function Home() {

    const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
    const [description, setDescription] = useState<string>(''); 

    return (
        <View style={styles.container}>
            <Image source={require('@/assets/logo.png')} style={styles.logo} />

            <View style={styles.form}>
                <Input 
                    placeholder='O que você precisa comprar'
                    onChangeText={setDescription}
                />

                <Button title='Adicionar'/>
            </View>
         
            <View style={styles.content}>
                <View style={styles.header}>
                    {
                        FILTER_STATUS.map((status) => (
                            <Filter 
                                key={status}
                                status={status} 
                                isActive={filter === status}
                                onPress={() => setFilter(status)} 
                            />
                        ))
                    }

                    <TouchableOpacity style={styles.clearButton}>
                        <Text style={styles.clearText}>
                            Limpar
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList 
                    data={ITEMS}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Item
                            data={item} 
                            onStatus={() => console.log("mudar o status")}
                            onRemove={() => console.log("remover")}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
                />
            </View>
        </View>
    );
}