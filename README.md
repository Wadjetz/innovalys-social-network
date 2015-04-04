#Attention aucun commits directement dans le master
Créer une nouvelle branche. Développé votre fonctionnalité, une fois qu'elle est finie faite un pull request vers le master. Ça nous évitera des merges conflits

# Installation du l'environement de dev

## Installer
* [node.js](https://nodejs.org/)
* [MySQL](https://www.mysql.fr/)

# Activer

## Executer les commandes

```sh
npm install -g nodemon
npm install
```

## Lancer le server

```sh
nodemon server.js
```

## Lancer le client

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

#PRESENTATION ENTREPRISE

INNOVALYS est une société de conseil dans les hautes technologies. Nous accompagnons les grands acteurs de l'économie dans leurs projets par notre expertise technique et des modes d'intervention adaptés aux besoins de nos clients.

Le développement d’INNOVALYS se base sur l’excellence, l’innovation et la mise en valeur du potentiel humain. Chaque collaborateur est un acteur majeur de notre développement par ses compétences et sa capacité à être force de proposition.

Créée en 2007 et maintenant forte de plus de 50 collaborateurs, notre entreprise vise de nouveaux secteurs dans l’ingénierie pour étendre son champ d’action. Nous avons donc besoin de trouver un moyen simple et productif de mettre en commun nos connaissances, sans passer par plusieurs logiciels externes exposant les données de l’entreprise.

#PRESENTATION DU PROJET

Dans ce document, le projet de réseau social d’entreprise sera fait référence en tant que « application »,
« logiciel », « RSE » ou encore « site » (de par sa nature web).

##OBJECTIF DU RESEAU SOCIAL D’ENTREPRISE

Le projet RSE a pour but d’améliorer notre communication interne au sein d’INNOVALYS. Nous n’avons actuellement aucun outil permettant de centraliser nos événements et actualités de l’entreprise, et nous souhaitons avec ce réseau social interne permettre un accès facilité à ces informations.

Notre souhait est également de pouvoir créer des groupes de projets permettant de mettre en commun les connaissances de manière plus simple et pratique que nos solutions actuelles qui sont propres à chaque projet.

Enfin, la communication à travers une messagerie instantanée permettra de ne plus utiliser les mails en communication interne, en plus de faciliter la mise en commun d’idée.

Les réseaux sociaux étant en plein essor dans les entreprises, nous voulons nous aligner sur cette stratégie afin de proposer à nos collaborateurs un outil de communication simple d’utilisation et répondant à nos besoins.

##PERSONNES CIBLEES PAR LE RSE

Ce réseau social d’entreprise s’adresse uniquement aux internes de l’entreprise. Pour des problématiques évidentes de sécurité, la plateforme ne devra être accessible qu’aux utilisateurs connectés.

##CONTENUS DU RSE

Le RSE doit se décomposer en plusieurs modules (fonctionnalités), qui permettront de pouvoir faire évoluer l’application en cas de nouveaux besoins.

Le RSE est un site d’information et support de communication pour les employés de notre entreprise.

* Partie Design:
    - Des codes couleurs pour la partie charte graphique, présentée ci-après, afin de rester dans le ton du logo de notre entreprise.
* Partie base de donnée:
    - Une base de 100 profils fictifs stockés sous un format JSON constituant notre précédente base de donnée des employés doit être soit importable depuis le site, soit lors du déploiement de la solution.


#FONCTIONNALITES ATTENDUES

##ACTUALITE ENTREPRISE ET GROUPE.

La partie actualités d’entreprise sera uniquement prise en charge par un responsable RH, qui pourra y ajouter des messages contenant des images, liens et vidéos. Il s’agit de la page par défaut lors de la connexion d’un utilisateur.

##MESSAGERIE INSTANTANEE

Cette messagerie devra permettre une communication plus instantanée que le mail (solution actuelle). Les messages devront être archivés et rester consultable par la personne. Cette messagerie devra également comporter un système de statuts indiquant la disponibilité de l’utilisateur :

- Absent (Jaune)
- En Ligne (Vert)
- Occupé (Rouge)
- Déconnecté (Gris)

##PROFIL

Cette page contiendra toutes les informations de la personne. Il devra être possible de modifier la photo de profil, mais pas des informations critiques (mail pro, nom, prénom, etc...). Cette page sera consultable par un autre utilisateur. Il doit également être possible d’y configurer son statut de messagerie instantané et ses notifications.

##MOTEUR DE RECHERCHE

Un moteur de recherche doit être présent sur l’ensemble du site, permettant de rechercher du contenu dans les documents, les messages ou les utilisateurs.

##SYSTEME DE COMMENTAIRES

Un commentaire est constitué de texte et liens uniquement. Une actualité d’entreprise, message ou groupe projet peuvent être commentés. Ils devront être limités en taille. Il devra également être possible « d’aimer » un message ou un contenu (Projet, actualité), à la manière des différents sites de réseau social existants.

##SYSTEME DE NOTIFICATION

Lorsqu’un évènement survient (nouveau message, invitation à un groupe projet, etc...) l’utilisateur doit recevoir une notification sur son bureau (Voir API notification de l’HTML 5). Ces notifications doivent être configurables dans la partie profil pour chaque utilisateur suivant leurs souhaits.


##GROUPE DE PROJET

Un groupe de projet est une mise en commun de contenus et de connaissances entre plusieurs utilisateurs. Il doit être possible d’y ajouter des messages, des fichiers (Prévoir une visualisation pour les types de fichier les plus communs), et d’ordonner le tout pour en faciliter la lecture et la navigation. Un groupe doit pouvoir être privé (accessible uniquement sur invitation et invisible aux autre utilisateurs), ou bien public (lisible par tous les utilisateurs, mais modifiable uniquement par les membres).

##ADMINISTRATION

L’administration du site et de ses utilisateurs devra pouvoir se faire directement sur la plateforme dans un module spécialement prévu à cet effet.

Celle-ci sera réservée à des comptes possédant un droit d’administration, et inaccessible aux autre utilisateurs.

L’administrateur devra pouvoir bloquer un compte, le supprimer, le modifier, modifier/supprimer des commentaires, modifier/supprimer des groupes, consulter les logs de connexion de chaque utilisateur et enfin pouvoir consulter l’historique de la messagerie instantanée.

##LANGUES

Toutes les documentations du projet doivent être réalisées en français.

L’application en elle-même devra être multilingue, et permettre de changer de langue depuis son interface. Un système de localisation est donc nécessaire. Il devra également être possible d’ajouter de nouvelles langues par la suite sans avoir besoin de redévelopper une partie de l’application ou de la redéployer. Les langues demandées à la livraison sont le français et l’anglais.


#PRESTATION ATTENDUE

##CHARTE GRAPHIQUE

###CODE COULEURS

- Principale #3e83c6
- Secondaire #D8D8D8
- Textes #696969

Ces couleurs doivent être facilement modifiables après le déploiement du logiciel, dans le cas où notre entreprise souhaiterait changer de couleurs.

###CONTRAINTES TECHNIQUES D’UTILISATION ET DE DEPLOIMENT

Les versions cibles sont Google Chrome 39.0 et Firefox 34.0.

La résolution minimale visée par le site est 1200 pixels (largeur) par 800 pixels (hauteur) ; mais celui-ci doit rester lisible et utilisable à des tailles inférieures.

Le réseau social d’entreprise doit pouvoir être déployé sur un serveur contenant Ubuntu server 14.04.1, et nous n’avons pas de contraintes particulières quant au choix des technologies à utiliser pour répondre à nos besoins.

###CONTRAINTES DE DEVELOPPEMENT (CODE)

Le développement de l’application sera entièrement réalisé en anglais pour la maintenabilité de l’application. Toute la documentation relative au code de l’application devra également être réalisée en anglais.

Il devra être possible de générer de la documentions à partir des sources via un logiciel tiers (Par exemple doxygene si le site est réalisé en PHP), afin de pouvoir conserver une documentation facilement maintenable. La marche à suivre pour générer cette documentation doit également être documentée.


###CONTRAINTES DE SECURITE

Cette plateforme hébergera à terme des données vitales pour notre entreprise, et il est donc primordial pour nous que celle-ci respecte les contraintes de sécurité minimum qu’on pourrait attendre d’un site professionnel :

- Hash en SHA-1 (ou mieux) des mots de passes et autre données critiques (Le MD5 est proscrit).
- Protection contre les injections SQL, que ce soit de l’extérieur ou depuis la partie utilisateur.
- Aucun contenu d’aucune sorte ne devra être accessible sans être connecté.

###DOCUMENTATION

Les éléments suivant doivent être livrés avec le produit lors de la livraison finale :

* Guide d’utilisation du logiciel, qui sera distribués à nos utilisateurs (en français)
* Documentation sur l’architecture et le fonctionnement de l’application (en français)
* Documentation sur les procédures à réaliser pour
    - Importer de nouveaux utilisateurs, en se basant sur le format donné en annexe
    - Modifier les couleurs utilisées par le logiciel
    - Modifier le logo de l’entreprise
        * Documentation sur comment générer la documentation des sources
