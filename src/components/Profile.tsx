import { useState } from 'react';
import { Edit, Plus } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import { PlaylistCard } from './PlaylistCard';
import { ResourceModal } from './ResourceModal';
import { RemoveResourceModal } from './RemoveResourceModal';
import { AddToPlaylistModal } from './AddToPlaylistModal';
import type { Resource, Playlist } from './types';

// REMOVIDO: import profileImage from 'figma:asset/...'

// ADICIONADO: URL válida para imagem
const profileImage = "https://ui-avatars.com/api/?name=Carlos+Santos&background=0f766e&color=fff";

const userResources: Resource[] = [
  {
    id: '1',
    title: 'Introdução ao Cálculo Diferencial',
    author: 'Maria Oliveira',
    subject: 'Matemática',
    year: '3º Ano',
    type: 'PDF',
    icon: 'download',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-400',
    views: 245,
    downloads: 89,
    likes: 34
  },
  {
    id: '2',
    title: 'Revolução industrial',
    author: 'Maria Oliveira',
    subject: 'Matemática',
    year: '3º Ano',
    type: 'NOTA',
    icon: 'document',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-400',
    views: 245,
    downloads: 89,
    likes: 34
  },
  {
    id: '3',
    title: 'Revolução industrial',
    author: 'Maria Oliveira',
    subject: 'Matemática',
    year: '3º Ano',
    type: 'NOTA',
    icon: 'document',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-400',
    views: 245,
    downloads: 89,
    likes: 34
  },
  {
    id: '4',
    title: 'Revolução industrial',
    author: 'Maria Oliveira',
    subject: 'Matemática',
    year: '3º Ano',
    type: 'NOTA',
    icon: 'document',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-400',
    views: 245,
    downloads: 89,
    likes: 34
  },
  {
    id: '5',
    title: 'Introdução ao Cálculo Diferencial',
    author: 'Maria Oliveira',
    subject: 'Matemática',
    year: '3º Ano',
    type: 'PDF',
    icon: 'download',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-400',
    views: 245,
    downloads: 89,
    likes: 34
  },
  {
    id: '6',
    title: 'Introdução ao Cálculo Diferencial',
    author: 'Maria Oliveira',
    subject: 'Matemática',
    year: '3º Ano',
    type: 'PDF',
    icon: 'download',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-400',
    views: 245,
    downloads: 89,
    likes: 34
  }
];

const userPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Matemática - 3º Ano',
    resources: 5,
    visibility: 'Público'
  },
  {
    id: '2',
    title: 'Matemática - 3º Ano',
    resources: 5,
    visibility: 'Público'
  },
  {
    id: '3',
    title: 'Matemática - 3º Ano',
    resources: 5,
    visibility: 'Público'
  },
  {
    id: '4',
    title: 'Matemática - 3º Ano',
    resources: 5,
    visibility: 'Público'
  },
  {
    id: '5',
    title: 'Matemática - 3º Ano',
    resources: 5,
    visibility: 'Público'
  },
  {
    id: '6',
    title: 'Matemática - 3º Ano',
    resources: 5,
    visibility: 'Público'
  }
];

export function Profile({ onPlaylistClick }: { onPlaylistClick: () => void }) {
  const [activeTab, setActiveTab] = useState<'resources' | 'playlists'>('resources');
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const handleRemoveClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsRemoveModalOpen(true);
  };

  const handleAddToPlaylistClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleConfirmRemove = () => {
    console.log('Removing resource:', selectedResource);
    // Add your remove logic here
  };

  const handleAddToPlaylist = (playlistId: string) => {
    console.log('Adding resource to playlist:', selectedResource, playlistId);
    // Add your add to playlist logic here
  };

  return (
    <div className="p-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profileImage}
              alt="Carlos Santos"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Carlos Santos</h1>
              <p className="text-gray-600 mb-1">coord@escola.edu</p>
              <p className="text-sm text-gray-500">Coordenador</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit className="w-4 h-4" />
            Editar Perfil
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-5 py-2.5 rounded-lg transition-colors font-medium ${
            activeTab === 'resources'
              ? 'bg-teal-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Meus Recursos
        </button>
        <button
          onClick={() => setActiveTab('playlists')}
          className={`px-5 py-2.5 rounded-lg transition-colors font-medium ${
            activeTab === 'playlists'
              ? 'bg-teal-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Minhas Playlists
        </button>
      </div>

      {/* Action Button */}
      <div className="flex justify-end mb-6">
        {activeTab === 'resources' ? (
          <button 
            onClick={() => setIsResourceModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Adicionar Recurso
          </button>
        ) : (
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors">
            <Plus className="w-5 h-5" />
            Criar Playlist
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === 'resources' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userResources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource}
              onRemoveClick={handleRemoveClick}
              onAddToPlaylistClick={handleAddToPlaylistClick}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} onClick={onPlaylistClick} />
          ))}
        </div>
      )}

      {/* Modals */}
      <ResourceModal 
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
      />
      
      <RemoveResourceModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        resourceTitle={selectedResource?.title || ''}
        resourceAuthor={selectedResource?.author || ''}
        onConfirmRemove={handleConfirmRemove}
      />
      
      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        resourceTitle={selectedResource?.title || ''}
        onAddToPlaylist={handleAddToPlaylist}
      />
    </div>
  );
}