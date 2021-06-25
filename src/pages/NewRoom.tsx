import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      toast('Digite um nome para a sala', { icon: '⚠️' });
      return;
    }

    const roomRef = database.ref('rooms');

    const loadingToast = toast.loading('Criando sala');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    toast.success('Sala criada com sucesso', { id: loadingToast });
    history.push(`/admin/${roomRef.key}/${firebaseRoom.key}`);
  }

  function welcomeMessage() {
    return `Olá, ${user?.name}!`;
  }

  return (
    <div id="page-auth">
      <Toaster />
      <aside>
        <img
          src={illustrationImg}
          alt="A imagem mostra o conceito de perguntas 
        e respostas do app"
        />
        <strong>Se você não sabe a resposta, alguém te conta</strong>
        <p>
          Descubra coisas novas, passe adiante o que já sabe. Venha compartilhar
          seu conhecimento com a gente.
        </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h1>{welcomeMessage()}</h1>
          <h2>Crie uma sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Para entrar em uma sala existente clique <Link to="/">aqui</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
