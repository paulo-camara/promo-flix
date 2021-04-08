# PromoFlix

## Rodar aplicação localmente

Para rodar a aplicação localmente você deve executar os seguintes passos:

```
$ git clone https://github.com/paulo-camara/promo-flix.git
$ cd promo-flix
$ npm install
```

Dentro da pasta `./src` deve ser criado o arquivo com nome ```API_KEY.js``` onde vai ser armazenado a sua API key. Por segurança o repositório não inclui esse arquivo. Caso ainda não possua você pode criar uma conta para [gerar sua API key aqui](https://www.themoviedb.org/)

Seu arquivo deve conter a seguinte variavel:

```
export const API_KEY = <API KEY>;
```

Feito isso o projeto está pronto para ser rodado localmente com o seguinte comando:

```
$ npm start
```

## Para acessar o site utilize o link: http://promo-flix.s3-website-us-east-1.amazonaws.com/list

## Construido com:

* [react](https://github.com/facebook/react)
* [react-router](https://github.com/ReactTraining/react-router)
* [reflux](https://github.com/reflux/refluxjs)
* [immutability-helper](https://github.com/kolodny/immutability-helper)
* [axios](https://github.com/axios/axios)
* [themoviedb API](https://developers.themoviedb.org/3/getting-started/introduction)
