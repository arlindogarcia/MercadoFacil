import Dexie, { Table } from 'dexie';
import { PurchaseList } from './pages/Market/types/purchase_list';

export interface PendingMutation {
  id?: number;
  type: 'save' | 'delete';
  listLocalId: string | number;
  payload?: PurchaseList;
  timestamp: number;
}

export interface TempIdMapping {
  tempId: string;
  realId: number;
}

class MercadoFacilDB extends Dexie {
  purchaseLists!: Table<PurchaseList>;
  pendingMutations!: Table<PendingMutation>;
  tempIdMap!: Table<TempIdMapping>;

  constructor() {
    super('mercadofacil-db');
    this.version(1).stores({
      purchaseLists: 'id',
      pendingMutations: '++id, timestamp',
      tempIdMap: 'tempId',
    });
  }
}

export const db = new MercadoFacilDB();
