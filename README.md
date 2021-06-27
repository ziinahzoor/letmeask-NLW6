# Letmeask
Projeto de salas Q&amp;A com React realizado na sexta edição da Next Level Week

[Acesse aqui](https://letmeask-8a7c0.firebaseapp.com)

# Índice

* [Funcionalidades](#funcionalidades)
  * [Perguntas](#perguntas)
  * [Gerenciamento de Perguntas](#gerenciar_perguntas)
  * [Toasts Informativos](#toasts)
  * [Código da Sala](#codigo)
* [Páginas](#paginas)
  * [Home Page](#home_page)
  * [Criar Sala](#criar_sala)
  * [Sala](#sala_usuario)
  * [Sala do Administrador](#sala_admin)
* [Versões](#versoes)
  * [1.0.1](#v1_0_1)
  * [1.0.0](#v1_0_0)
* [Próximas Atualizações](#atualizacoes)

## <a name="funcionalidades"></a>Funcionalidades

### <a name="perguntas"></a> Perguntas
> Faça uma pergunta, o streamer responde ao vivo.

![Campo de Perguntas](https://i.imgur.com/GYQV8Q3.png)

> Curta perguntas de outros usuários, ou a sua.

![Pergunta Curtida](https://i.imgur.com/hML29qg.png)

> Veja quantas perguntas existem na sala.

![Quantidade de Perguntas](https://i.imgur.com/3aZMi3X.png)

### <a name="gerenciar_perguntas"></a>Gerenciamento de Perguntas
> Como administrador, você pode excluir perguntas, dar destaque à elas ou marcá-las como respondidas.

![Gerenciamento de Perguntas](https://i.imgur.com/TB0uXIE.png)

> Marque uma pergunta como respondida para não se esquecer e acabar respondendo-a novamente.

![Pergunta Respondida](https://i.imgur.com/xlXSbI2.png)

> Dê destaque a uma pergunta para mostrar sua relevância.

![Pergunta Destacada](https://i.imgur.com/r71SKQO.png)

### <a name="toasts"></a>Toasts Informativos
> Seja informado sobre suas ações com mensagens de sucesso, erro e carregamento.

![Pergunta Carregando](https://i.imgur.com/80iZYaS.png) ![Usuário Autenticado](https://i.imgur.com/SZO0x2M.png)

### <a name="codigo"></a>Código da Sala
> Copie o código da sala diretamente pelo botão para enviar aos seus amigos, ou para guardar e não se esquecer.

![Código da Sala](https://i.imgur.com/3IF5dfD.png)

## <a name="paginas"></a>Páginas

### <a name="home_page"></a>Home Page
![Home Page Not Logged](https://i.imgur.com/OEWMPUu.png)
![Home Page](https://i.imgur.com/OrDNxiI.png)

### <a name="criar_sala"></a>Criar sala
![Criar Sala](https://i.imgur.com/46ZdNGQ.png)

### <a name="sala_usuario"></a>Sala
![Sala](https://i.imgur.com/IKzQ8F8.png)

### <a name="sala_admin"></a>Sala do Administrador 
![Administrador](https://i.imgur.com/H2sGnOI.png)

## <a name="versoes"></a>Versões

### <a name="v1_0_1"></a>1.0.1

* Informa ao administrador quando não existem perguntas na sala.
* Permite ao usuário mudar para o contexto de administrador da sala ou o contrário caso este seja o criador da sala.

### <a name="v1_0_0"></a>1.0.0

* Adiciona logout.
* Permite o gerenciamento de login na home page.
* Redireciona o usuário caso tente acessar a tela de criação de sala pela URL.

## <a name="atualizacoes"></a>Próximas Atualizações
* Impedir acesso à sala do administrador pela URL para outros usuários da sala e usuários não autenticados.
* Impedir acesso pela URL à salas não existentes
* Modo escuro
* Autenticação com Facebook.
* Salvar salas.
* Gerenciar salas criadas.
* Gerenciar perguntas feitas.
* Responsividade.
