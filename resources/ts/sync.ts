import axios from 'axios';
import { db, PendingMutation } from './db';
import { PurchaseList } from './pages/Market/types/purchase_list';

export type SyncStatus = 'idle' | 'syncing' | 'error';

type StatusListener = (status: SyncStatus, pendingCount: number) => void;

const listeners: StatusListener[] = [];
let isSyncing = false;

export function onSyncStatusChange(fn: StatusListener): () => void {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i >= 0) listeners.splice(i, 1);
  };
}

function notify(status: SyncStatus, pending: number): void {
  listeners.forEach((fn) => fn(status, pending));
}

export async function getPendingMutationsCount(): Promise<number> {
  return db.pendingMutations.count();
}

export async function syncPendingMutations(): Promise<void> {
  if (isSyncing) return;
  const count = await getPendingMutationsCount();
  if (count === 0) return;

  isSyncing = true;
  notify('syncing', count);

  try {
    const mutations = await db.pendingMutations.orderBy('timestamp').toArray();
    for (const mutation of mutations) {
      await processMutation(mutation);
    }
    notify('idle', 0);
  } catch {
    const remaining = await getPendingMutationsCount();
    notify('error', remaining);
  } finally {
    isSyncing = false;
  }
}

async function processMutation(mutation: PendingMutation): Promise<void> {
  if (mutation.type === 'save' && mutation.payload) {
    const isNew = !mutation.payload.id || mutation.payload.id === '';
    const resp = await axios.post<{ list: PurchaseList }>('/api/purchase-lists', mutation.payload);
    const serverList = resp.data.list;

    if (isNew && String(mutation.listLocalId).startsWith('offline_')) {
      await db.purchaseLists.delete(mutation.listLocalId);
      await db.tempIdMap.put({ tempId: String(mutation.listLocalId), realId: serverList.id as number });
    }
    await db.purchaseLists.put(serverList);
  } else if (mutation.type === 'delete') {
    if (!String(mutation.listLocalId).startsWith('offline_')) {
      await axios.delete(`/api/purchase-lists/${mutation.listLocalId}`);
    }
    await db.purchaseLists.delete(mutation.listLocalId);
  }
  await db.pendingMutations.delete(mutation.id!);
}

export async function saveListLocally(list: PurchaseList): Promise<string | number> {
  const isNew = !list.id || list.id === '' || list.id === 0;
  const localId: string | number = isNew ? `offline_${Date.now()}` : list.id;

  await db.purchaseLists.put({ ...list, id: localId } as PurchaseList);
  await db.pendingMutations.add({
    type: 'save',
    listLocalId: localId,
    payload: { ...list, id: isNew ? ('' as any) : list.id },
    timestamp: Date.now(),
  });

  return localId;
}

export async function deleteListLocally(id: string | number): Promise<void> {
  await db.purchaseLists.delete(id);
  if (!String(id).startsWith('offline_')) {
    await db.pendingMutations.add({
      type: 'delete',
      listLocalId: id,
      timestamp: Date.now(),
    });
  } else {
    await db.pendingMutations.where('listLocalId').equals(id).delete();
  }
}
