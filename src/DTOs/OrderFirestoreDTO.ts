// Data transfer object

import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type OrderFirestoreDTO = {
  patrimony: string;
  description: string;
  status: 'open' | 'closed';
  createdAt: FirebaseFirestoreTypes.Timestamp;
  solution?: string;
  closedAt?: FirebaseFirestoreTypes.Timestamp;
}
