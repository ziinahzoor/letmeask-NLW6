import { FormEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: string;
  isHighLighted: string;
}>

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: string;
  isHighLighted: string;
}

export function Room() {
  const { user, signOut } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions =
        Object.entries(firebaseQuestions).map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered
          }
        });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId]);

  async function handleSignOut() {
    if (user) {
      await signOut();
    }
    window.location.reload(); //melhorar
  }

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      toast('Nada foi digitado no campo de pesquisa', {
        icon: '⚠️',
      });
      return;
    }

    if (!user) {
      toast.error('Usuário não está logado');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighLighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
    toast.success('Pergunta enviada');
  }

  return (
    <div id="page-room">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="Faça uma pergunta"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} onClick={handleSignOut} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça login</button></span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        {/*JSON.stringify(questions)*/}
      </main>
    </div>
  );
}