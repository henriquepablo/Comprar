import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { FilterStatus } from "@/types/FilterStatus";
import { styles } from './styles';


type Props = TouchableOpacityProps & {
    status: FilterStatus,
    isActive: boolean
}

export function Filter({status, isActive, ...rest} : Props) {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={[styles.title, {opacity: isActive ? 1 : 0.5}]}>
                { status === FilterStatus.DONE ? 'Comprados' : 'Pendente'}
            </Text>
        </TouchableOpacity>
    )
}