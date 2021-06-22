import { Link } from 'react-router-dom';
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

export function NewRoom() {
  const { user, signInWithGoogle } = useAuth();

  function welcomeMessage() {
    if (!user) {
      return;
    }
    else {
      return `Olá, ${user.name}!`;
    }
  }

  return (
    <div id="page-auth">
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
          <h1>{welcomeMessage()}</h1>
          <h2>Crie uma sala</h2>
          <form>
            <input
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Para entrar em uma sala existente clique <Link to="/">aqui</Link>.
          </p>
        </div>
      </main>
    </div>
  )
}