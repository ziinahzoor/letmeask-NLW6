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

  async function handleLogin() {
    if (!user) {
      const loadingToast = toast.loading('Carregando usuário');
      await signInWithGoogle();
      toast.success('Usuário autenticado', { id: loadingToast });
    } else {
      history.push('/rooms/new');
    }
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      toast('Digite o nome da sala', { icon: '⚠️' });
      return;
    }

    const loadingToast = toast.loading('Procurando sala');
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists() || roomRef.val().endedAt) {
      toast.error('Sala não existe', { id: loadingToast });
      return;
    }

    toast.dismiss(loadingToast);
    history.push(`rooms/${roomCode}`);
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
          {user && (
            <>
              <img id="user-avatar" src={user.avatar} alt="Usuário" />
              <h1>Olá, {user.name.split(' ')[0]}</h1>
              <div className="user-logged">
                <Button onClick={handleLogin}>Criar uma sala</Button>
                <Button id="logout">Sair</Button>
              </div>
            </>
          )}
          {!user && (
            <button onClick={handleLogin} className="create-room">
              <img src={googleIconImg} alt="Logo Google" />
              Entre com sua conta Google
            </button>
          )}
          <div className="separator">
            {user ? 'Entre em uma sala' : 'Ou visite uma sala'}
          </div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
