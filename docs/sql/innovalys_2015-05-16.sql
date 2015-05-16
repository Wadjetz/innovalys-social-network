# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.23)
# Database: innovalys
# Generation Time: 2015-05-16 09:42:36 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`users_id`,`news_id`),
  KEY `fk_comments_users1_idx` (`users_id`),
  KEY `fk_comments_news1_idx` (`news_id`),
  CONSTRAINT `fk_comments_news1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;

INSERT INTO `comments` (`id`, `content`, `created`, `updated`, `users_id`, `news_id`)
VALUES
	(33,'A Q&A with Mike Tinskey, the man behind Ford\'s electric future','2015-04-25 17:41:53','2015-04-25 17:41:53',15,8),
	(34,'Cool ton article Q&A','2015-04-25 19:04:24','2015-04-25 19:04:24',15,8),
	(35,'Salut','2015-04-26 12:52:33','2015-04-26 12:52:33',15,8),
	(36,'Salut !!!','2015-04-26 12:59:58','2015-04-26 12:59:58',15,8),
	(37,'Salut rr','2015-04-26 13:00:58','2015-04-26 13:00:58',15,8),
	(38,'Salut bvbvb','2015-04-26 13:01:43','2015-04-26 13:01:43',15,8),
	(39,'Salut bnbnbn','2015-04-26 13:02:39','2015-04-26 13:02:39',15,8),
	(40,'Salut bvbvb','2015-04-26 13:03:05','2015-04-26 13:03:05',15,8),
	(44,'Salut','2015-04-26 13:17:36','2015-04-26 13:17:36',15,8),
	(45,'Salut','2015-04-26 13:21:43','2015-04-26 13:21:43',15,8),
	(46,'Salut','2015-04-26 13:30:00','2015-04-26 13:30:00',15,8),
	(48,'Salut','2015-04-26 14:18:20','2015-04-26 14:18:20',15,8),
	(49,'Salut','2015-04-26 14:19:46','2015-04-26 14:19:46',15,8),
	(50,'sdsdsd\n','2015-05-15 14:41:02','2015-05-15 14:41:02',15,8),
	(51,'ghjghj','2015-05-15 14:53:14','2015-05-15 14:53:14',15,8),
	(52,'Salut','2015-05-15 21:14:51','2015-05-15 21:14:51',15,8),
	(53,'Salut','2015-05-15 21:17:16','2015-05-15 21:17:16',15,10),
	(54,'T\'est null','2015-05-15 21:19:57','2015-05-15 21:19:57',15,10),
	(55,'dsds','2015-05-15 21:20:06','2015-05-15 21:20:06',15,10),
	(56,'ddd','2015-05-15 21:21:05','2015-05-15 21:21:05',15,10),
	(57,'dsd','2015-05-15 21:21:52','2015-05-15 21:21:52',15,10),
	(58,'rer','2015-05-15 21:24:30','2015-05-15 21:24:30',15,10),
	(59,'vc','2015-05-15 21:25:12','2015-05-15 21:25:12',15,10),
	(60,'cvcvcvcvcvcv','2015-05-15 21:25:40','2015-05-15 21:25:40',15,10),
	(61,'cvcvcvcvcvcv','2015-05-15 21:25:42','2015-05-15 21:25:42',15,10),
	(62,'vvvvvvvvv','2015-05-15 21:27:02','2015-05-15 21:27:02',15,10),
	(63,'vvvvvvvvv','2015-05-15 21:27:03','2015-05-15 21:27:03',15,10),
	(64,'cc','2015-05-15 21:29:29','2015-05-15 21:29:29',15,9),
	(65,'sqsqs','2015-05-15 21:29:35','2015-05-15 21:29:35',15,9),
	(66,'wxwx','2015-05-15 23:34:13','2015-05-15 23:34:13',15,10);

/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table conversations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `conversations`;

CREATE TABLE `conversations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL DEFAULT 'open',
  `type` varchar(45) NOT NULL DEFAULT 'private',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table conversations_messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `conversations_messages`;

CREATE TABLE `conversations_messages` (
  `messages_id` int(11) NOT NULL,
  `conversations_id` int(11) NOT NULL,
  PRIMARY KEY (`messages_id`,`conversations_id`),
  KEY `fk_messages_has_conversations_conversations1_idx` (`conversations_id`),
  KEY `fk_messages_has_conversations_messages1_idx` (`messages_id`),
  CONSTRAINT `fk_messages_has_conversations_conversations1` FOREIGN KEY (`conversations_id`) REFERENCES `conversations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_has_conversations_messages1` FOREIGN KEY (`messages_id`) REFERENCES `messages` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table conversations_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `conversations_users`;

CREATE TABLE `conversations_users` (
  `conversations_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`conversations_id`,`users_id`),
  KEY `fk_conversations_has_users_users1_idx` (`users_id`),
  KEY `fk_conversations_has_users_conversations1_idx` (`conversations_id`),
  CONSTRAINT `fk_conversations_has_users_conversations1` FOREIGN KEY (`conversations_id`) REFERENCES `conversations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_conversations_has_users_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table documents
# ------------------------------------------------------------

DROP TABLE IF EXISTS `documents`;

CREATE TABLE `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(45) NOT NULL,
  `path` varchar(555) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table documents_groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `documents_groups`;

CREATE TABLE `documents_groups` (
  `documents_id` int(11) NOT NULL,
  `groups_id` int(11) NOT NULL,
  PRIMARY KEY (`documents_id`,`groups_id`),
  KEY `fk_documents_has_groups_groups1_idx` (`groups_id`),
  KEY `fk_documents_has_groups_documents1_idx` (`documents_id`),
  CONSTRAINT `fk_documents_has_groups_documents1` FOREIGN KEY (`documents_id`) REFERENCES `documents` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_documents_has_groups_groups1` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) NOT NULL DEFAULT 'open',
  `access` varchar(255) NOT NULL DEFAULT 'private',
  `type` varchar(255) NOT NULL DEFAULT 'project',
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_groups_users1_idx` (`users_id`),
  CONSTRAINT `fk_groups_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;

INSERT INTO `groups` (`id`, `slug`, `name`, `description`, `created`, `updated`, `status`, `access`, `type`, `users_id`)
VALUES
	(1,'test-1','Test 1','Test','2015-04-12 20:10:24','2015-04-12 20:10:24','open','private','project',13),
	(2,'sdsd','sdsd','','2015-04-21 19:56:18','2015-04-21 19:56:18','open','private','project',15),
	(3,'projet-annuel','Projet Annuel','Projet Annuel','2015-04-24 14:20:28','2015-04-24 14:20:28','open','private','project',15),
	(6,'test-2','Test 2','Test 2','2015-04-25 11:29:24','2015-04-25 11:29:24','open','private','project',15),
	(7,'test-3','TEST 3','test 3','2015-04-25 11:31:54','2015-04-25 11:31:54','open','private','project',15),
	(8,'fdf','fdf','dfdf','2015-04-25 17:17:45','2015-04-25 17:17:45','open','private','project',15);

/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table members
# ------------------------------------------------------------

DROP TABLE IF EXISTS `members`;

CREATE TABLE `members` (
  `users_id` int(11) NOT NULL,
  `groups_id` int(11) NOT NULL,
  `status` varchar(45) DEFAULT 'pending',
  PRIMARY KEY (`users_id`,`groups_id`),
  KEY `fk_users_has_groups_groups1_idx` (`groups_id`),
  KEY `fk_users_has_groups_users1_idx` (`users_id`),
  CONSTRAINT `fk_users_has_groups_groups1` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_groups_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;

INSERT INTO `members` (`users_id`, `groups_id`, `status`)
VALUES
	(15,1,'pending');

/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table message_groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `message_groups`;

CREATE TABLE `message_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `groups_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`groups_id`,`users_id`),
  KEY `fk_message_groups_groups1_idx` (`groups_id`),
  KEY `fk_message_groups_users1_idx` (`users_id`),
  CONSTRAINT `fk_message_groups_groups1` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_groups_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `message_groups` WRITE;
/*!40000 ALTER TABLE `message_groups` DISABLE KEYS */;

INSERT INTO `message_groups` (`id`, `content`, `created`, `updated`, `groups_id`, `users_id`)
VALUES
	(1,'salut','2015-05-16 09:52:52','2015-05-16 09:52:52',8,15),
	(2,'salut 2','2015-05-16 09:53:14','2015-05-16 09:53:14',8,15),
	(3,'salut 2','2015-05-16 09:53:16','2015-05-16 09:53:16',8,15),
	(4,'salut 2','2015-05-16 10:21:53','2015-05-16 10:21:53',8,15),
	(5,'salut 2','2015-05-16 10:25:49','2015-05-16 10:25:49',8,15),
	(6,'salut 2','2015-05-16 10:26:57','2015-05-16 10:26:57',8,15),
	(7,'salut 2','2015-05-16 10:28:16','2015-05-16 10:28:16',8,15),
	(8,'lol','2015-05-16 10:28:50','2015-05-16 10:28:50',8,15),
	(9,'Bonjour','2015-05-16 10:29:54','2015-05-16 10:29:54',1,15),
	(10,'gfgfg','2015-05-16 10:50:36','2015-05-16 10:50:36',1,15),
	(11,'sdsd','2015-05-16 10:52:23','2015-05-16 10:52:23',1,15);

/*!40000 ALTER TABLE `message_groups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  KEY `fk_messages_users1_idx` (`users_id`),
  CONSTRAINT `fk_messages_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;

INSERT INTO `messages` (`id`, `content`, `created`, `updated`, `users_id`)
VALUES
	(14,'Salut','2015-04-25 12:01:48','2015-04-25 12:01:48',13),
	(15,'Bonjour','2015-04-25 12:45:58','2015-04-25 12:45:58',13),
	(16,'Aurevoir','2015-04-25 12:48:08','2015-04-25 12:48:08',13),
	(17,'dddsd','2015-05-15 14:41:42','2015-05-15 14:41:42',13),
	(18,'bb,nb','2015-05-15 14:52:51','2015-05-15 14:52:51',13);

/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table news
# ------------------------------------------------------------

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `publish` datetime NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_news_users1_idx` (`users_id`),
  CONSTRAINT `fk_news_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;

INSERT INTO `news` (`id`, `slug`, `title`, `body`, `created`, `updated`, `publish`, `users_id`)
VALUES
	(5,'a-comparison-of-open-source-tools-for-sentiment-analysis','A comparison of open source tools for sentiment analysis','##Goal\n\nThe objective of this project is to apply various NLP sentiment analysis techniques on reviews of the Yelp Dataset and assess their effectivenes on correctly identifiyng them as positive or negative.\n\n##Yelp Dataset Challenge\n\nYelp has released an anonymized part of their stored data to the public. This was accompanied by a challenge with various awards in order to incentivize research and generate insights for the use of the data.','2015-04-12 13:00:28','2015-04-12 13:00:28','2015-04-12 00:04:00',13),
	(6,'basscss-a-low-level-css-toolkit','Basscss – A Low Level CSS Toolkit','[Basscss](http://www.basscss.com/) is a lightweight collection of base element styles, immutable utilities, layout modules, and color styles designed for speed, clarity, performance, and scalability.\n\nUsing clear, humanized naming conventions, Basscss is quick to internalize and easy to reason about while speeding up development time with more scalable, more readable code. Basscss strikes a balance between consistency and flexibility to allow for rapid prototyping and quick iterative changes when designing in the browser.','2015-04-22 16:51:08','2015-04-22 16:51:08','2015-04-22 00:04:00',15),
	(7,'how-to-save-your-iphone-and-apple-watch-from-notification-hell','How to save your iPhone and Apple Watch from notification hell','Early on in any relationship, your app will make one simple request: “I would like to send you notifications.” Sure, it makes sense for a breaking news, banking, or even a weather app, but what does Temple Run really need to tell me when I’m not in the middle of a run? Or any number of other games and random apps for that matter.\n\nMaybe you’ve hit OK thinking, “Yeah, I’ll change that later,” or “I don’t know what it would actually send me, but I don’t want to feel left out.” Maybe it didn’t bother you as much when the phone was in your pocket or sitting on your desk / nightstand / couch — but what about when it’s on your wrist? When each notification is both unavoidable and potentially visible to the world around you?\n\nWith the Apple Watch now rolling out worldwide, let’s take a moment to really look back and evaluate just what we need our phones to actively tell us at all hours day and night. Seriously, you gain nothing by letting Temple Run ping you at any time.','2015-04-24 21:48:58','2015-04-24 21:48:58','2015-04-24 00:04:00',15),
	(8,'a-qa-with-mike-tinskey-the-man-behind-fords-electric-future','A Q&A with Mike Tinskey, the man behind Ford\'s electric future','Ford, like the entirety of the auto industry, is in a cycle of rapid change: The planet is getting hotter. Fossil fuel, regardless of price, is falling out of favor. Young people don\'t want to own cars as badly as they used to. Services like Uber and Lyft are upending the notion of personal transportation altogether.','2015-04-24 21:55:15','2015-04-24 21:55:15','2015-04-24 00:04:00',15),
	(9,'zazaz','zazaz','azazaza','2015-05-15 14:41:12','2015-05-15 14:41:12','2015-05-15 00:05:00',15),
	(10,'lol-ca-marche','Lol ca marche','Je sais pas comment','2015-05-15 21:03:06','2015-05-15 21:03:06','2015-05-15 00:05:00',15);

/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table parameters
# ------------------------------------------------------------

DROP TABLE IF EXISTS `parameters`;

CREATE TABLE `parameters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `photo_profile` varchar(555) NOT NULL DEFAULT 'default.png',
  `notification_message` tinyint(1) NOT NULL DEFAULT '1',
  `notification_news` tinyint(1) NOT NULL DEFAULT '1',
  `notification_groupe` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`users_id`),
  KEY `fk_parameters_users1_idx` (`users_id`),
  CONSTRAINT `fk_parameters_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(555) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birthday_date` date NOT NULL,
  `adress` varchar(555) DEFAULT NULL,
  `status_profile` varchar(255) DEFAULT 'active',
  `status_connection` varchar(255) NOT NULL DEFAULT 'offline',
  `function` varchar(255) DEFAULT NULL,
  `description` text,
  `arrival_date` date DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_connection` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `role`, `first_name`, `last_name`, `birthday_date`, `adress`, `status_profile`, `status_connection`, `function`, `description`, `arrival_date`, `created`, `modified`, `last_connection`)
VALUES
	(13,'egor@neon.fr','$2a$10$psTZIhhxN1exuiqOn/jio.O.4HDbR5gbXEHLw/FNNMOrTPpuf.u8G','admin','Egor','Berezovskiy','2014-08-23','17 rue bidon','active','offline','Tech lead','Developper','2014-08-23','2015-04-05 13:19:25','2015-04-05 13:19:25','2015-04-05 13:19:25'),
	(15,'egor2@neon.fr','sha1$3117a960$1$5ef79ab245c71cdc011d7ee2171e1661f494a1c8','admin','Egor2','Berezovskiy','2014-08-23','17 rue bidon','active','offline','Tech lead','Developper','2014-08-23','2015-04-12 20:25:26','2015-04-12 20:25:26','2015-04-12 20:25:26'),
	(16,'0.7468612159136683@domain.com','sha1$9cb1e17c$1$6fe944f27fa9345f88a255e5bf8e980ec6306ac0','admin','First Name','Last Name','2015-04-25','rue bidon','active','offline','peon','descr','2015-04-25','2015-04-25 16:21:40','2015-04-25 16:21:40','2015-04-25 16:21:40'),
	(17,'0.6074289588723332@domain.com','sha1$25e4e963$1$f4301f5d3974e660cbd7f1110ef35210776db381','user','First Name','Last Name','2015-04-25','rue bidon','active','offline','peon','descr','2015-04-25','2015-04-25 16:28:46','2015-04-25 16:28:46','2015-04-25 16:28:46'),
	(18,'782.6379996258765@domain.com','sha1$81d6b77c$1$16ded62fd8e362f9b65f014af846010e264e93da','user','First Name','Last Name','2015-04-25','rue bidon','active','offline','peon','descr','2015-04-25','2015-04-25 17:12:53','2015-04-25 17:12:53','2015-04-25 17:12:53'),
	(19,'588.4548709727824@domain.com','sha1$27bdf679$1$36650b676fa3c6d9bfa332ad89fd6bb5c68bfc77','user','First Name','Last Name','2015-04-25','rue bidon','active','offline','peon','descr','2015-04-25','2015-04-25 17:13:38','2015-04-25 17:13:38','2015-04-25 17:13:38'),
	(20,'463.9402844477445@domain.com','sha1$f307f7d5$1$531a9c99116b4097ad26c1629eb5ca7113a5e271','user','First Name','Last Name','2015-04-25','rue bidon','active','offline','peon','descr','2015-04-25','2015-04-25 17:15:42','2015-04-25 17:15:42','2015-04-25 17:15:42');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
