import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#D0D2D8',
        paddingTop: 62,
    },
    logo: {
        height: 34,
        width: 134
    },
    form: {
        width: '100%',
        paddingHorizontal: 16,
        gap: 7,
        marginTop: 42
    },
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        padding: 24,
        marginTop: 24
    }
});