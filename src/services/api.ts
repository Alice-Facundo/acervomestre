const API_BASE_URL = 'https://acervomestrebackend.onrender.com';

// Busca o token usando a chave exata salva no localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// Helper para criar headers - o Content-Type agora é opcional para evitar erros com FormData ou DELETE
const getHeaders = (contentType?: string): HeadersInit => {
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

// Criar um novo recurso usando FormData para suportar arquivos
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
      // O navegador define o Content-Type automaticamente com o boundary correto para FormData
    },
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao criar recurso');
  }
  
  return response.json();
};

// Deletar um recurso
export const deleteRecurso = async (recursoId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/recursos/delete/${recursoId}`, {
    method: 'DELETE',
    headers: getHeaders(), // Apenas Authorization
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao remover recurso');
  }
};

// Adicionar recurso à playlist
export const addRecursoToPlaylist = async (
  playlistId: string,
  recursoId: number
): Promise<any> => {
  const response = await fetch(
    `${API_BASE_URL}/playlists/add_recurso/${playlistId}`,
    {
      method: 'POST',
      headers: getHeaders('application/json'), // Define explicitamente para JSON
      body: JSON.stringify({ recurso_id: recursoId }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao adicionar recurso à playlist');
  }
  
  return response.json();
};

// Remover recurso da playlist
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

// Buscar todas as playlists
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

// Buscar todas as tags
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