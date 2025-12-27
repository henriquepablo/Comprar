import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { styles } from './styles';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from '@/components/Item';
import { useState, useEffect } from 'react';
import { itemsStorage, ItemStorage } from '@/storage/itemStorage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];



export function Home() {

    const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
    const [description, setDescription] = useState<string>(''); 
    const [items, setItems] = useState<ItemStorage[]>([]);

    async function handleAdd() {

        if (!description.trim()) {
            return Alert.alert('Adicionar', 'Informe a descrição para adicionar.');
        }

        const newItem = {
            id: Math.random().toString(36).substring(2),
            description: description,
            status: FilterStatus.PENDING,
        }

        setItems((prevState) => [...prevState, newItem]);

        await itemsStorage.add(newItem);
        await itemsByStatus();

        Alert.alert("Adicionado", `Adicionado ${description}`);
        setDescription('');
        setFilter(FilterStatus.PENDING);
    }   

    async function itemsByStatus() {
        try {
            const response = await itemsStorage.getByStatus(filter);
            setItems(response);
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Não foi possível filtrar os itens.")
        }
    }

    async function handleRemove(id: string) {
        
        try {
            await itemsStorage.remove(id);

            await itemsByStatus();
        } catch (error) {
            console.log(error);
            Alert.alert('Remove', 'Não foi possível remover.')
        }
    }

    function handleClear() {
        Alert.alert('Limpar', 'Deseja remover todos os items?', [
            {
                text: "Não", style: "cancel"
            },
            {
                text: "Sim", onPress: () => onClear()
            }
        ]);
    }

    async function onClear() {
        try {
            await itemsStorage.clear();
            setItems([]);
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Não foi possível remover todos os items.');
        }
    }

    async function toggleItemStatus(id: string) {
        try {
            await itemsStorage.toggleStatus(id);
            await itemsByStatus();
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível atualizar o status')
        }
    }

    useEffect(() => {
        itemsByStatus();
    }, [filter]);

    return (
        <View style={styles.container}>
            <Image source={require('@/assets/logo.png')} style={styles.logo} />

            <View style={styles.form}>
                <Input 
                    placeholder='O que você precisa comprar'
                    onChangeText={setDescription}
                    value={description}
                />

                <Button title='Adicionar' onPress={handleAdd}/>
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

                    <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                        <Text style={styles.clearText}>
                            Limpar
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList 
                    data={items}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Item
                            data={item} 
                            onStatus={() => toggleItemStatus(item.id)}
                            onRemove={() => handleRemove(item.id)}
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