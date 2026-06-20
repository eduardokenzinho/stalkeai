# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## Instagram scraper

O endpoint `/api/get-instagram-puppeteer` tenta buscar dados publicos do Instagram com Instaloader primeiro. Se o Instagram bloquear, exigir login ou o Python falhar, ele volta automaticamente para o scraper Puppeteer que ja existia.

Para preparar o motor Python:

```bash
pip install -r requirements.txt
```

Para buscar quem um perfil segue e 1 post de cada perfil seguido, use:

```http
POST /api/analisar
Content-Type: application/json

{
  "username": "usuario"
}
```

O endpoint tambem continua disponivel via `GET /api/followed-posts?username=usuario&limit=5`, que e a rota usada pelo Feed.

Fluxo executado:

1. Recebe o `username`.
2. Busca o perfil principal com Instaloader.
3. Retorna erro se o perfil for privado.
4. Pega exatamente os 5 primeiros perfis que o usuario segue.
5. Busca 1 post publico de cada um desses perfis.
6. Retorna `profile`, `following`, `seguindo` e `posts`.
7. Entrega imagens dos posts via `/api/proxy-image?raw=1&url=...`.

Observacao: listar quem um perfil segue geralmente exige sessao do Instagram. Gere uma sessao local com:

```bash
instaloader --login=seu_usuario
```

Variaveis opcionais:

```bash
PYTHON_BIN=python
INSTALOADER_NODE_TIMEOUT=25000
INSTALOADER_FOLLOWED_NODE_TIMEOUT=90000
INSTALOADER_TIMEOUT=18
INSTALOADER_SESSION_USERNAME=seu_usuario
INSTALOADER_SESSION_FILE=caminho/para/session-file
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
