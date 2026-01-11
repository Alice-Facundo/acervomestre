const API_BASE_URL = 'https://acervomestrebackend.onrender.com';

// Helper to get auth token (adjust based on your auth implementation)
const getAuthToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Helper to create headers with authentication
const getHeaders = (contentType: string = 'application/json'): HeadersInit => {
  const headers: HeadersInit = {};
  
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export interface CreateRecursoData {
  titulo: string;
  descricao: string;
  estrutura: 'UPLOAD' | 'URL' | 'NOTA';
  visibilidade?: 'PUBLICO' | 'PRIVADO';
  is_destaque?: boolean;
  tag_ids?: string[];
  file?: File;
  url_externa?: string;
  conteudo_markdown?: string;
}

export interface DeleteRecursoResponse {
  success: boolean;
}

export interface AddToPlaylistData {
  recurso_id: number;
}

export interface RemoveFromPlaylistResponse {
  success: boolean;
}

// Create a new recurso
export const createRecurso = async (data: CreateRecursoData) => {
  const formData = new FormData();
  
  formData.append('titulo', data.titulo);
  formData.append('descricao', data.descricao);
  formData.append('estrutura', data.estrutura);
  
  if (data.visibilidade) {
    formData.append('visibilidade', data.visibilidade);
  }
  
  if (data.is_destaque !== undefined) {
    formData.append('is_destaque', String(data.is_destaque));
  }
  
  if (data.tag_ids && data.tag_ids.length > 0) {
    data.tag_ids.forEach(tagId => {
      formData.append('tag_ids', tagId);
    });
  }
  
  // Add specific fields based on estrutura type
  if (data.estrutura === 'UPLOAD' && data.file) {
    formData.append('file', data.file);
  } else if (data.estrutura === 'URL' && data.url_externa) {
    formData.append('url_externa', data.url_externa);
  } else if (data.estrutura === 'NOTA' && data.conteudo_markdown) {
    formData.append('conteudo_markdown', data.conteudo_markdown);
  }
  
  const response = await fetch(`${API_BASE_URL}/recursos/create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      // Don't set Content-Type header - browser will set it with boundary for FormData
    },
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao criar recurso');
  }
  
  return response.json();
};

// Delete a recurso
export const deleteRecurso = async (recursoId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/recursos/delete/${recursoId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao remover recurso');
  }
};

// Add recurso to playlist
export const addRecursoToPlaylist = async (
  playlistId: string,
  recursoId: number
): Promise<any> => {
  const response = await fetch(
    `${API_BASE_URL}/playlists/add_recurso/${playlistId}`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ recurso_id: recursoId }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao adicionar recurso à playlist');
  }
  
  return response.json();
};

// Remove recurso from playlist
export const removeRecursoFromPlaylist = async (
  playlistId: string,
  recursoId: number
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/playlists/delete_recurso/${playlistId}/${recursoId}`,
    {
      method: 'DELETE',
      headers: getHeaders(),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao remover recurso da playlist');
  }
};

// Get all playlists (for dropdown in AddToPlaylistModal)
export const getAllPlaylists = async () => {
  const response = await fetch(
    `${API_BASE_URL}/playlists/get_all?page=1&per_page=100`,
    {
      method: 'GET',
      headers: getHeaders(),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao buscar playlists');
  }
  
  return response.json();
};

// Get all tags (for tag selection in resource modals)
export const getAllTags = async () => {
  const response = await fetch(`${API_BASE_URL}/tags/get_all`, {
    method: 'GET',
    headers: getHeaders(),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao buscar tags');
  }
  
  return response.json();
};
