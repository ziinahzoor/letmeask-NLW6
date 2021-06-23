import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    toast.success('Usuário autenticado com sucesso');
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Sala não existe');
      return;
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <Toaster />
      <aside>
        <img src={illustrationImg} alt="A imagem mostra o conceito de perguntas 
        e respostas do app" />
        <strong>Se você não sabe a resposta, alguém te conta</strong>
        <p>
          Descubra coisas novas, passe adiante o que já sabe. Venha
          compartilhar seu conhecimento com a gente.
        </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala existente</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}