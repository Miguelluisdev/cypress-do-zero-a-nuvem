# 🔁 Retry-Ability no Cypress

## 🧠 O que é Retry-Ability?

**Retry-ability** é a **capacidade automática do Cypress de repetir comandos e asserções até que eles passem ou o tempo se esgote** (timeout).

Ou seja, **em vez de falhar imediatamente quando algo não está pronto**, o Cypress espera e **tenta novamente várias vezes** até que a condição esperada se torne verdadeira.

---

## 🎯 Por que isso é importante?

Em testes de interface, **elementos podem demorar para aparecer** ou mudar de estado (ex: carregamento, animações, API assíncrona). O Cypress entende isso e tenta:

* Encontrar o elemento até ele aparecer.
* Verificar se a asserção se torna verdadeira com o tempo.
* Evitar o uso de `wait()` fixo (como `cy.wait(5000)`), deixando o teste mais **inteligente e confiável**.

---

## 📌 Exemplo simples

### Código:

```js
cy.get('#mensagem-sucesso').should('be.visible');
```

### O que o Cypress faz:

* Vai tentar **repetidamente** encontrar o elemento `#mensagem-sucesso`.
* Quando encontrar, ele **espera** até que o elemento esteja visível.
* Se isso não acontecer dentro do tempo padrão (default: 4 segundos), ele falha.

---

## 🔧 Retry aplicado a comandos e asserções

### ✅ Cypress aplica retry automaticamente em:

* **Comandos que buscam elementos**: `cy.get()`, `cy.contains()`
* **Asserções**: `should()`, `expect()` dentro de `cy.then()`

### ❌ Cypress **não aplica retry em**:

* **Comandos que executam ações**: `cy.click()`, `cy.type()`, `cy.check()`
* **Funções customizadas que não usam comandos Cypress**

---

## 💡 Exemplo visual com retry

```js
cy.get('.loading').should('not.exist');
cy.get('.conteudo').should('be.visible');
```

> Nesse exemplo, o Cypress vai **ficar tentando** verificar se `.loading` sumiu, **antes de continuar** para o próximo passo. Isso evita testes quebrando por causa de um atraso natural.

---

## ⏱ Personalizando o timeout (tempo de retry)

Você pode aumentar o tempo que ele tenta com:

```js
cy.get('.botao-salvar', { timeout: 10000 }).should('be.visible');
```

> Isso diz ao Cypress: “tente por até 10 segundos”.

---

## ⚠️ Dica importante

**Evite `cy.wait()` fixo**, prefira comandos com retry:

❌ Ruim:

```js
cy.wait(3000);
cy.get('.mensagem').should('be.visible');
```

✅ Melhor:

```js
cy.get('.mensagem', { timeout: 5000 }).should('be.visible');
```

---

## 🧪 Conclusão

* Retry-ability **deixa os testes mais estáveis e menos frágeis**.
* Cypress tenta **automatizar a espera inteligente** por elementos e condições.
* Isso **remove a necessidade de timeouts manuais** e melhora a confiabilidade do teste.

# 🧱 Boas Práticas para Organização de Arquivos e Design Patterns (além de Page Object)

---

## 📁 1. Estrutura de Pastas Recomendada

```bash
cypress/
│
├── e2e/                # Arquivos de teste (specs)
│   ├── login.cy.js
│   └── produtos.cy.js
│
├── support/            # Reúne comandos personalizados e configurações globais
│   ├── commands.js     # Funções reutilizáveis com Cypress.Commands.add
│   └── e2e.js          # Carregado automaticamente antes dos testes
│
├── fixtures/           # Dados simulados (mocks JSON)
│   └── usuario.json
│
├── pages/              # Arquitetura POM (Page Object Model)
│   ├── LoginPage.js
│   └── ProdutoPage.js
│
└── utils/              # Funções auxiliares, helpers, geradores de dados etc.
    └── geradorCPF.js
```

---

## 🧠 2. Design Patterns mais comuns no Cypress

### ✅ **Page Object Model (POM)**

Separa os **seletores** e **ações** da página em uma classe ou módulo, evitando repetição de código.

```js
// pages/LoginPage.js
class LoginPage {
  acessar() {
    cy.visit('/login');
  }

  preencherEmail(email) {
    cy.get('#email').type(email);
  }

  preencherSenha(senha) {
    cy.get('#senha').type(senha);
  }

  enviar() {
    cy.get('button[type="submit"]').click();
  }
}

export default new LoginPage();
```

Uso no teste:

```js
import LoginPage from '../pages/LoginPage';

describe('Login', () => {
  it('login com sucesso', () => {
    LoginPage.acessar();
    LoginPage.preencherEmail('teste@email.com');
    LoginPage.preencherSenha('123456');
    LoginPage.enviar();
    cy.contains('Bem-vindo').should('be.visible');
  });
});
```

---

### ✅ **Commands Customizados (Command Pattern)**

Para ações frequentes como login, criar usuário, resetar estado da aplicação, etc.

```js
// support/commands.js
Cypress.Commands.add('login', (email, senha) => {
  cy.visit('/login');
  cy.get('#email').type(email);
  cy.get('#senha').type(senha);
  cy.get('button[type="submit"]').click();
});
```

Uso no teste:

```js
cy.login('teste@email.com', '123456');
```

---

### ✅ **Factory Pattern (geração de dados dinâmicos)**

Útil para criar dados únicos (ex: CPF, email, nomes aleatórios):

```js
// utils/geradorEmail.js
export function gerarEmail() {
  const random = Math.floor(Math.random() * 100000);
  return `usuario${random}@teste.com`;
}
```

---

### ✅ **Fixtures + Alias (Mock Pattern)**

Dados externos em arquivos `.json`, para manter os testes limpos.

```js
// fixtures/usuario.json
{
  "email": "teste@teste.com",
  "senha": "123456"
}
```

No teste:

```js
cy.fixture('usuario').then((usuario) => {
  cy.get('#email').type(usuario.email);
  cy.get('#senha').type(usuario.senha);
});
```

---

### ✅ **Service Layer (API Pattern)**

Criar uma camada para testes de integração com a API, fora do contexto da UI.

```js
// support/commands.js
Cypress.Commands.add('criarUsuarioAPI', (dados) => {
  cy.request('POST', '/api/usuarios', dados);
});
```

---

## 📌 Boas Práticas Gerais

| Boas Práticas                      | Explicação                                                         |
| ---------------------------------- | ------------------------------------------------------------------ |
| 🔄 Reutilize código                | Use Page Object, commands e utils para DRY (Don't Repeat Yourself) |
| 📦 Use `beforeEach` para setup     | Inicialize estado antes de cada teste                              |
| 🧪 Separe testes por fluxo         | Login, cadastro, produto, pagamento etc.                           |
| ⏱ Evite `cy.wait()` fixo           | Prefira comandos com retry + timeout                               |
| 🧹 Limpe o ambiente de teste       | Use API ou UI para deletar/limpar dados antes de rodar             |
| 📓 Nomeie testes com clareza       | "deve cadastrar usuário com sucesso" → fácil entender o que falhou |
| 📋 Teste feliz, alternativo e erro | Cubra os caminhos positivos e negativos                            |
| 🧩 Integre com CI/CD               | Configure para rodar testes no GitHub Actions, GitLab, etc.        |
| 🎥 Ative screenshots e vídeos      | Úteis para depuração de falhas                                     |
| 🚫 Evite dados hardcoded           | Use fixtures ou geração dinâmica para manter testes flexíveis      |

## ✅ **1. Ativar vídeos e screenshots no `cypress.config.js`**

Abra o arquivo `cypress.config.js` (ou `cypress.config.ts` se estiver usando TypeScript) e adicione/ajuste:

```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // ou sua URL
    setupNodeEvents(on, config) {
      // eventos aqui, se necessário
    },
  },
  video: true,              // Grava vídeos dos testes
  screenshotOnRunFailure: true, // Tira print automático em falha
});
```

---

## 🧪 2. Quando são capturados?

| Ação                                            | Resultado                                      |
| ----------------------------------------------- | ---------------------------------------------- |
| Teste **falha**                                 | Cypress tira screenshot automaticamente        |
| Teste **roda via terminal (`npx cypress run`)** | Grava vídeo da execução (um por `spec`)        |
| Teste passa com sucesso                         | Screenshot não é tirado, mas o vídeo é gravado |
| Você usa `cy.screenshot()` manual               | Tira print quando você quiser                  |

---

## 🎥 3. Exemplo para tirar **screenshot manual**

```js
it('valida algo e tira print', () => {
  cy.get('#form').should('be.visible');
  cy.screenshot('formulario_visivel'); // Nome personalizado
});
```

---

## 💻 4. Executando para gravar vídeos

Execute no terminal com:

```bash
npx cypress run
```

> Isso roda os testes em **modo headless**, sem abrir o navegador, e grava os vídeos na pasta `cypress/videos`.

---

## 📂 5. Onde ficam os arquivos?

| Tipo        | Local padrão           |
| ----------- | ---------------------- |
| Vídeos      | `cypress/videos/`      |
| Screenshots | `cypress/screenshots/` |

Você pode mudar os caminhos se quiser, no `cypress.config.js`.

---

## ⚙️ 6. Personalizando os diretórios

```js
module.exports = defineConfig({
  screenshotsFolder: 'meus_prints',
  videosFolder: 'meus_videos',
});
```

---

## 💡 Dica bônus: evitar vídeo quando o teste **passa**

Para gravar vídeo **somente em caso de falha**:

```js
module.exports = defineConfig({
  video: true,
  trashAssetsBeforeRuns: true,
  videoCompression: 32, // compressão para economizar espaço
  e2e: {
    setupNodeEvents(on, config) {
      on('after:spec', (spec, results) => {
        if (results && results.stats.failures === 0) {
          // Deleta o vídeo se o teste passou
          const fs = require('fs');
          fs.unlinkSync(results.video);
        }
      });
    },
  },
});
```

# 🧪 2. Fixtures e Mock de Dados no Cypress

---

## 🔠 O que significa “Mock”?

A palavra **"mock"** vem do inglês e significa **simulação** ou **imitação**.

> ✅ No contexto de testes, **mockar algo** significa **simular um dado, serviço ou comportamento**, sem depender do sistema real (como um banco de dados ou API de verdade).

---

## 📦 O que são Fixtures?

**Fixtures** no Cypress são **arquivos de dados simulados** (geralmente em formato `.json`) que contêm informações que você pode usar em seus testes — como se fossem exemplos prontos de usuários, produtos, respostas de API etc.

* Ficam na pasta: `cypress/fixtures/`
* São usados para **alimentar os testes com dados estáticos ou mockados**
* **Evita hardcoding** (dados fixos no meio do teste)

---

### 📁 Exemplo de um fixture:

**Arquivo:** `cypress/fixtures/usuario.json`

```json
{
  "email": "teste@exemplo.com",
  "senha": "123456",
  "nome": "João QA"
}
```

---

## 🧪 Como usar fixture no teste Cypress?

```js
describe('Login com Fixture', () => {
  it('deve logar com sucesso usando dados mockados', () => {
    cy.visit('/login');

    // Carrega os dados do arquivo JSON
    cy.fixture('usuario').then((usuario) => {
      cy.get('#email').type(usuario.email);
      cy.get('#senha').type(usuario.senha);
      cy.get('button[type="submit"]').click();
    });

    cy.contains('Bem-vindo, João QA').should('be.visible');
  });
});
```

---

## 📌 Para que serve o uso de mocks e fixtures?

| Objetivo                                | Explicação                                                         |
| --------------------------------------- | ------------------------------------------------------------------ |
| 🧪 Testar sem depender de back-end real | Você simula dados e respostas para manter o teste rápido e isolado |
| 🚀 Ganhar performance                   | Mock evita chamadas lentas ou instáveis à API                      |
| 📋 Garantir previsibilidade             | Os dados são controlados, não mudam entre execuções                |
| 🧹 Evitar poluir o banco real           | Você não precisa inserir ou excluir dados de verdade para testar   |
| 🔄 Reutilizar dados                     | Um mesmo arquivo JSON pode ser usado em vários testes              |

---

## 🔄 Diferença entre **Fixture** e **Intercept com Mock de API**

* **Fixture:** simula dados **internamente**, para preencher campos ou validar conteúdo.
* **Intercept (mock de API):** intercepta chamadas reais da aplicação e **simula a resposta da API** com fixture ou inline.

```js
// Intercepta a chamada GET e responde com um fixture
cy.intercept('GET', '/api/usuarios', { fixture: 'usuarios.json' }).as('getUsuarios');
cy.visit('/usuarios');
cy.wait('@getUsuarios');
```

---

## ✅ Conclusão

* **Mock** = simulação de comportamento ou dado real
* **Fixtures** = arquivos com dados prontos usados para testes
* Ajuda a tornar testes **rápidos, estáveis, reutilizáveis e previsíveis**
* Pode ser usado tanto para **preencher dados no teste** quanto para **mockar respostas de API**


