import { X, Plus } from "lucide-react";
import { useState } from "react";

interface Playlist {
  id: string;
  name: string;
  resourceCount: number;
  isPublic: boolean;
}

interface AddToPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
  onAddToPlaylist?: (playlistId: string) => void;
  onCreateNewPlaylist?: () => void;
}

export function AddToPlaylistModal({ 
  isOpen, 
  onClose, 
  resourceTitle,
  onAddToPlaylist,
  onCreateNewPlaylist
}: AddToPlaylistModalProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  // Mock data - substitua com dados reais
  const playlists: Playlist[] = [
    {
      id: "1",
      name: "Matemática - 3º Ano",
      resourceCount: 5,
      isPublic: true
    },
    {
      id: "2",
      name: "Revisão para ENEM - Ciências Humanas",
      resourceCount: 8,
      isPublic: false
    },
    {
      id: "3",
      name: "Química Experimental",
      resourceCount: 3,
      isPublic: true
    }
  ];

  const handleAddToPlaylist = () => {
    if (selectedPlaylist && onAddToPlaylist) {
      onAddToPlaylist(selectedPlaylist);
    }
    onClose();
  };

  const handleCreateNew = () => {
    if (onCreateNewPlaylist) {
      onCreateNewPlaylist();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl">Adicionar à Playlist</h2>
            <p className="text-sm text-gray-600 mt-1">{resourceTitle}</p>
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
          <p className="text-sm mb-4">Selecione uma playlist</p>
          
          <div className="space-y-2 mb-4">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => setSelectedPlaylist(playlist.id)}
                className={`w-full text-left p-4 border rounded-lg transition-colors ${
                  selectedPlaylist === playlist.id
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium text-sm">{playlist.name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {playlist.resourceCount} recursos • {playlist.isPublic ? "Público" : "Privado"}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleAddToPlaylist}
            disabled={!selectedPlaylist}
            className={`w-full py-3 rounded-lg transition-colors mb-3 ${
              selectedPlaylist
                ? "bg-teal-600 hover:bg-teal-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Adicionar à Playlist Selecionada
          </button>

          <button
            onClick={handleCreateNew}
            className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Criar Nova Playlist
          </button>
        </div>
      </div>
    </div>
  );
}