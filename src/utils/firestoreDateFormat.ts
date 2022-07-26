import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function formatFirestoreDate(timestamp: FirebaseFirestoreTypes.Timestamp) {
  if (timestamp) {
    const date = new Date(timestamp.toDate());

    const day = date.toLocaleDateString('pt-BR');
    const hour = date.toLocaleDateString('pt-BR', { hour: '2-digit' });

    return `${day} às ${hour}`;
  }
}
