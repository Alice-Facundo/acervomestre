import { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import { ResourceModal } from './ResourceModal';
import { RemoveResourceModal } from './RemoveResourceModal';
import { AddToPlaylistModal } from './AddToPlaylistModal';
import type { Resource } from './types';

const categories = [
  'Matemática',
  'Português',
  'Física',
  'Química',
  'História',
  'Literatura',
  'PDF',
  'Vídeo'
];

const highlightedResources: Resource[] = [
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
    title: 'Video sobre industrialização',
    author: 'Maria Oliveira',
    subject: 'Matemática',
    year: '3º Ano',
    type: 'LINK',
    icon: 'link',
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-400',
    views: 245,
    downloads: 89,
    likes: 34
  },
  {
    id: '4',
    title: 'Matemática - 3º Ano',
    author: '',
    subject: '',
    year: '',
    type: 'folder',
    icon: 'folder',
    bgColor: 'bg-teal-100',
    iconColor: 'text-teal-700',
    resources: 5,
    visibility: 'Público',
    isPlaylist: true
  }
];

const mostSavedResources: Resource[] = [
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
    id: '7',
    title: 'Video sobre industrialização',
    author: 'Maria Oliveira',
    subject: 'Matemática',
    year: '3º Ano',
    type: 'LINK',
    icon: 'link',
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-400',
    views: 245,
    downloads: 89,
    likes: 34
  },
  {
    id: '8',
    title: 'Matemática - 3º Ano',
    author: '',
    subject: '',
    year: '',
    type: 'folder',
    icon: 'folder',
    bgColor: 'bg-teal-100',
    iconColor: 'text-teal-700',
    resources: 5,
    visibility: 'Público',
    isPlaylist: true
  }
];

export function Home() {
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
      {/* Search and Categories */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Procurar por conteúdo"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsResourceModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Adicionar Recurso
          </button>
        </div>
      </div>

      {/* Highlighted Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Destaque</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlightedResources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource}
              onRemoveClick={handleRemoveClick}
              onAddToPlaylistClick={handleAddToPlaylistClick}
            />
          ))}
        </div>
      </section>

      {/* Most Saved Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Mais Curtidos</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {mostSavedResources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource}
              onRemoveClick={handleRemoveClick}
              onAddToPlaylistClick={handleAddToPlaylistClick}
            />
          ))}
        </div>
      </section>

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