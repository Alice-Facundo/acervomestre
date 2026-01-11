import { X, AlertTriangle } from "lucide-react";

interface RemoveResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
  resourceAuthor: string;
  onConfirmRemove?: () => void;
}

export function RemoveResourceModal({ 
  isOpen, 
  onClose, 
  resourceTitle,
  resourceAuthor,
  onConfirmRemove
}: RemoveResourceModalProps) {
  const handleRemove = () => {
    if (onConfirmRemove) {
      onConfirmRemove();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl">Remover Recurso</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Tem certeza que deseja remover este recurso ?
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="font-medium text-sm mb-1">{resourceTitle}</div>
            <div className="text-sm text-gray-600">por {resourceAuthor}</div>
          </div>

          <p className="text-sm text-gray-600">
            Esta ação não excluirá o recurso permanentemente.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleRemove}
            className="px-6 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
