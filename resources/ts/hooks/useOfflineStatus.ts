import { useEffect, useState } from 'react';
import {
  SyncStatus,
  onSyncStatusChange,
  syncPendingMutations,
  getPendingMutationsCount,
} from '../sync';

export interface OfflineState {
  isOnline: boolean;
  syncStatus: SyncStatus;
  pendingCount: number;
}

export function useOfflineStatus(): OfflineState {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [pendingCount, setPendingCount] = useState<number>(0);

  useEffect(() => {
    getPendingMutationsCount().then(setPendingCount);

    const unsub = onSyncStatusChange((status, count) => {
      setSyncStatus(status);
      setPendingCount(count);
    });

    const handleOnline = () => {
      setIsOnline(true);
      syncPendingMutations();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      unsub();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, syncStatus, pendingCount };
}
