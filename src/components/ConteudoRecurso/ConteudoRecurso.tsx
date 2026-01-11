import React, { useState, useEffect } from 'react';
import { Plus, Download, FileText, Eye, Link as LinkIcon, StickyNote, Heart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './ConteudoRecurso.css';

interface Tag {
  id?: number | string;
  nome: string;
}

interface Recurso {
  id: number | string;
  titulo: string;
  autor_id: number | string;
  estrutura: 'UPLOAD' | 'URL' | 'NOTA';
  link_acesso?: string;
  mime_type?: string;
  tamanho_bytes?: number;
  conteudo_markdown?: string;
  visualizacoes: number;
  curtidas: number; 
  descricao: string;
  tags?: Tag[];
}

interface MainContentProps {
  conteudoId: string | number;
}

const MainContent: React.FC<MainContentProps> = ({ conteudoId }) => {
  const [recurso, setRecurso] = useState<Recurso | null>(null);
  const [autor, setAutor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false); 

  const formatarLinkExterno = (url: string): string => {
    if (!url) return "#";
    const hasProtocol = /^https?:\/\//i.test(url);
    return hasProtocol ? url : `https://${url}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token_acervo');
      try {
        const res = await fetch(`https://acervomestrebackend.onrender.com/recursos/get/${conteudoId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data: Recurso = await res.json();
          setRecurso(data);

          const resAutor = await fetch(`https://acervomestrebackend.onrender.com/users/get/${data.autor_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (resAutor.ok) {
            const user = await resAutor.json();
            setAutor(user.nome);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    if (conteudoId) fetchData();
  }, [conteudoId]);

  const handleLike = async () => {
    const token = localStorage.getItem('token_acervo');
    try {
      const res = await fetch(`https://acervomestrebackend.onrender.com/recursos/${conteudoId}/like`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok && recurso) {
        const novoStatusLike = !liked;
        setLiked(novoStatusLike);
        
        setRecurso({
          ...recurso,
          curtidas: novoStatusLike ? recurso.curtidas + 1 : recurso.curtidas - 1
        });
      }
    } catch (error) {
      console.error("Erro ao processar like:", error);
    }
  };

  const handleDownload = async () => {
    if (!recurso?.link_acesso) {
      alert("Link de acesso não encontrado.");
      return;
    }

    try {
      const response = await fetch(recurso.link_acesso);
      if (!response.ok) throw new Error('Erro ao buscar o arquivo no storage');

      const blob: Blob = await response.blob();
      const url: string = window.URL.createObjectURL(blob);
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = url;

      const extensao = recurso.mime_type?.split('/')[1] || recurso.link_acesso.split('.').pop() || 'file';
      link.setAttribute('download', `${recurso.titulo}.${extensao}`);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao processar download:", error);
      window.open(recurso.link_acesso, '_blank');
    }
  };

  if (loading) return <div className="main-content"><div className="spinner"></div></div>;
  if (!recurso) return <div className="main-content">Recurso não encontrado.</div>;

  return (
    <div className="main-content">
      <div className="header-section">
        <h1>{recurso.titulo}</h1>
        <div className="author">By <span>{autor || "Carregando..."}</span></div>
      </div>

      <div className="resource-card">
        {recurso.estrutura === "UPLOAD" && (
          <div className="download-box">
            <div className="file-main-info">
              <div className="file-icon-container">
                <FileText size={48} color="#0C5A6D" />
              </div>
              <div className="file-info">
                <span className="file-type">{recurso.mime_type || "Documento"}</span>
                <h3>{recurso.titulo}</h3>
                <p className="file-desc">
                  Tamanho: {recurso.tamanho_bytes ? (recurso.tamanho_bytes / 1024 / 1024).toFixed(2) : "0.00"} MB
                </p>
              </div>
            </div>
            <button className="btn-download" onClick={handleDownload}>
              <Download size={20} /> Download
            </button>
          </div>
        )}

        {recurso.estrutura === "URL" && recurso.link_acesso && (
          <div className="url-box">
            <div className="file-main-info">
              <div className="file-icon-container">
                <LinkIcon size={48} color="#0C5A6D" />
              </div>
              <div className="file-info">
                <span className="file-type">Link Externo</span>
                <h3>Acessar Recurso</h3>
                <a 
                  href={formatarLinkExterno(recurso.link_acesso)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="external-link"
                >
                  {recurso.link_acesso}
                </a>
              </div>
            </div>
          </div>
        )}

        {recurso.estrutura === "NOTA" && recurso.conteudo_markdown && (
          <div className="markdown-box">
            <div className="markdown-header">
              <StickyNote size={24} color="#0C5A6D" />
              <span className="file-type">Nota de Texto</span>
            </div>
            <div className="markdown-content">
              <ReactMarkdown>{recurso.conteudo_markdown}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <div className="resource-card">
        <div className="actions-row">
          <div className="action-btns">
            <button 
              className="btn-outline" 
              onClick={handleLike}
              style={{ 
                color: liked ? '#DC3545' : 'inherit', 
                borderColor: liked ? '#DC3545' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart 
                size={20} 
                fill={liked ? "#DC3545" : "none"} 
                color={liked ? "#DC3545" : "currentColor"}
              /> 
              {liked ? 'Curtido' : 'Like'}
            </button>
            <button className="btn-outline">
              <Plus size={20} /> Add to Playlist
            </button>
          </div>
          <div className="stats-info">
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Heart size={18} fill={recurso.curtidas > 0 ? "#DC3545" : "none"} color={recurso.curtidas > 0 ? "#DC3545" : "currentColor"} /> 
              {recurso.curtidas} curtidas
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Eye size={18} /> {recurso.visualizacoes} visualizações
            </span>
          </div>
        </div>
      </div>

      {recurso.tags && recurso.tags.length > 0 && (
        <div className="resource-card">
          <h3 className="card-title">Tags</h3>
          <div className="tags-container">
            {recurso.tags.map((tag, index) => (
              <span key={tag.id || index} className="badge">
                {tag.nome}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="resource-card">
        <h3 className="card-title">Descrição</h3>
        <p className="description-text">{recurso.descricao}</p>
      </div>
    </div>
  );
};

export default MainContent;
