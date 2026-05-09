import React from 'react';
import { useOfflineStatus } from '../hooks/useOfflineStatus';

export function OfflineIndicator() {
  const { isOnline, syncStatus, pendingCount } = useOfflineStatus();

  if (isOnline && syncStatus === 'idle') return null;

  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-xs font-semibold py-1.5 px-3 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-white flex-shrink-0" />
        Sem conexão
        {pendingCount > 0 && (
          <span>
            · {pendingCount} {pendingCount === 1 ? 'alteração pendente' : 'alterações pendentes'}
          </span>
        )}
      </div>
    );
  }

  if (syncStatus === 'syncing') {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-500 text-white text-xs font-semibold py-1.5 px-3 flex items-center justify-center gap-2">
        <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
        Sincronizando...
      </div>
    );
  }

  if (syncStatus === 'error') {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-orange-500 text-white text-xs font-semibold py-1.5 px-3 flex items-center justify-center gap-2">
        <span>⚠</span>
        Erro ao sincronizar. Tente novamente mais tarde.
      </div>
    );
  }

  return null;
}
