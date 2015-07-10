#Attention aucun commits directement dans le master
Créer une nouvelle branche. Développé votre fonctionnalité, une fois qu'elle est finie faite un pull request vers le master. Ça nous évitera des merges conflits.

S'il y a des conflits, faites un merge de master vers votre branche avec 'git merge master' régler les conflits dans votre branche.

# Installation du l'environement de dev

## Installer
* [Node.js](https://nodejs.org/)
* [MySQL](https://www.mysql.fr/)
* [Python Windows](https://www.python.org/downloads/windows/)
# Activer

## Executer les commandes

```sh
npm install -g nodemon browserify watchify reactify 
#windows/
nom install esprima-fb base62 source-map envify
npm install
```n

## Lancer le server

```sh
nodemon server.js
```

## Lancer browserify et le transpileur de JSX

```sh
npm run watch
```

## Builder l'application

```sh
npm run build
```

## Tester l'application
```sh
npm run test
```
