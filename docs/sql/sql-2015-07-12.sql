-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: innavalys
-- ------------------------------------------------------
-- Server version	5.6.22-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (33,'A Q&A with Mike Tinskey, the man behind Ford\'s electric future','2015-04-25 15:41:53','2015-04-25 15:41:53',15,8),(34,'Cool ton article Q&A','2015-04-25 17:04:24','2015-04-25 17:04:24',15,8),(35,'Salut','2015-04-26 10:52:33','2015-04-26 10:52:33',15,8),(36,'Salut !!!','2015-04-26 10:59:58','2015-04-26 10:59:58',15,8),(37,'Salut rr','2015-04-26 11:00:58','2015-04-26 11:00:58',15,8),(38,'Salut bvbvb','2015-04-26 11:01:43','2015-04-26 11:01:43',15,8),(39,'Salut bnbnbn','2015-04-26 11:02:39','2015-04-26 11:02:39',15,8),(40,'Salut bvbvb','2015-04-26 11:03:05','2015-04-26 11:03:05',15,8),(44,'Salut','2015-04-26 11:17:36','2015-04-26 11:17:36',15,8),(45,'Salut','2015-04-26 11:21:43','2015-04-26 11:21:43',15,8),(46,'Salut','2015-04-26 11:30:00','2015-04-26 11:30:00',15,8),(48,'Salut','2015-04-26 12:18:20','2015-04-26 12:18:20',15,8),(49,'Salut','2015-04-26 12:19:46','2015-04-26 12:19:46',15,8),(50,'sdsdsd\n','2015-05-15 12:41:02','2015-05-15 12:41:02',15,8),(51,'ghjghj','2015-05-15 12:53:14','2015-05-15 12:53:14',15,8),(52,'Salut','2015-05-15 19:14:51','2015-05-15 19:14:51',15,8),(53,'Salut','2015-05-15 19:17:16','2015-05-15 19:17:16',15,10),(54,'T\'est null','2015-05-15 19:19:57','2015-05-15 19:19:57',15,10),(55,'dsds','2015-05-15 19:20:06','2015-05-15 19:20:06',15,10),(56,'ddd','2015-05-15 19:21:05','2015-05-15 19:21:05',15,10),(57,'dsd','2015-05-15 19:21:52','2015-05-15 19:21:52',15,10),(58,'rer','2015-05-15 19:24:30','2015-05-15 19:24:30',15,10),(59,'vc','2015-05-15 19:25:12','2015-05-15 19:25:12',15,10),(60,'cvcvcvcvcvcv','2015-05-15 19:25:40','2015-05-15 19:25:40',15,10),(61,'cvcvcvcvcvcv','2015-05-15 19:25:42','2015-05-15 19:25:42',15,10),(62,'vvvvvvvvv','2015-05-15 19:27:02','2015-05-15 19:27:02',15,10),(63,'vvvvvvvvv','2015-05-15 19:27:03','2015-05-15 19:27:03',15,10),(64,'cc','2015-05-15 19:29:29','2015-05-15 19:29:29',15,9),(65,'sqsqs','2015-05-15 19:29:35','2015-05-15 19:29:35',15,9),(66,'wxwx','2015-05-15 21:34:13','2015-05-15 21:34:13',15,10);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL DEFAULT 'open',
  `type` varchar(45) NOT NULL DEFAULT 'private',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations_messages`
--

DROP TABLE IF EXISTS `conversations_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversations_messages` (
  `messages_id` int(11) NOT NULL,
  `conversations_id` int(11) NOT NULL,
  PRIMARY KEY (`messages_id`,`conversations_id`),
  KEY `fk_messages_has_conversations_conversations1_idx` (`conversations_id`),
  KEY `fk_messages_has_conversations_messages1_idx` (`messages_id`),
  CONSTRAINT `fk_messages_has_conversations_conversations1` FOREIGN KEY (`conversations_id`) REFERENCES `conversations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_has_conversations_messages1` FOREIGN KEY (`messages_id`) REFERENCES `messages` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations_messages`
--

LOCK TABLES `conversations_messages` WRITE;
/*!40000 ALTER TABLE `conversations_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations_users`
--

DROP TABLE IF EXISTS `conversations_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversations_users` (
  `conversations_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`conversations_id`,`users_id`),
  KEY `fk_conversations_has_users_users1_idx` (`users_id`),
  KEY `fk_conversations_has_users_conversations1_idx` (`conversations_id`),
  CONSTRAINT `fk_conversations_has_users_conversations1` FOREIGN KEY (`conversations_id`) REFERENCES `conversations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_conversations_has_users_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations_users`
--

LOCK TABLES `conversations_users` WRITE;
/*!40000 ALTER TABLE `conversations_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents_groups`
--

DROP TABLE IF EXISTS `documents_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents_groups` (
  `documents_id` int(11) NOT NULL,
  `groups_id` int(11) NOT NULL,
  PRIMARY KEY (`documents_id`,`groups_id`),
  KEY `fk_documents_has_groups_groups1_idx` (`groups_id`),
  KEY `fk_documents_has_groups_documents1_idx` (`documents_id`),
  CONSTRAINT `fk_documents_has_groups_documents1` FOREIGN KEY (`documents_id`) REFERENCES `documents` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_documents_has_groups_groups1` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents_groups`
--

LOCK TABLES `documents_groups` WRITE;
/*!40000 ALTER TABLE `documents_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'test-1','Test 1','Test','2015-04-12 18:10:24','2015-04-12 18:10:24','open','private','project',13),(2,'sdsd','sdsd','','2015-04-21 17:56:18','2015-04-21 17:56:18','open','private','project',15),(3,'projet-annuel','Projet Annuel','Projet Annuel','2015-04-24 12:20:28','2015-04-24 12:20:28','open','private','project',15),(6,'test-2','Test 2','Test 2','2015-04-25 09:29:24','2015-04-25 09:29:24','open','private','project',15),(7,'test-3','TEST 3','test 3','2015-04-25 09:31:54','2015-04-25 09:31:54','open','private','project',15),(8,'fdf','fdf','dfdf','2015-04-25 15:17:45','2015-04-25 15:17:45','open','private','project',15);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (15,1,'pending');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_groups`
--

DROP TABLE IF EXISTS `message_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_groups`
--

LOCK TABLES `message_groups` WRITE;
/*!40000 ALTER TABLE `message_groups` DISABLE KEYS */;
INSERT INTO `message_groups` VALUES (1,'salut','2015-05-16 07:52:52','2015-05-16 07:52:52',8,15),(2,'salut 2','2015-05-16 07:53:14','2015-05-16 07:53:14',8,15),(3,'salut 2','2015-05-16 07:53:16','2015-05-16 07:53:16',8,15),(4,'salut 2','2015-05-16 08:21:53','2015-05-16 08:21:53',8,15),(5,'salut 2','2015-05-16 08:25:49','2015-05-16 08:25:49',8,15),(6,'salut 2','2015-05-16 08:26:57','2015-05-16 08:26:57',8,15),(7,'salut 2','2015-05-16 08:28:16','2015-05-16 08:28:16',8,15),(8,'lol','2015-05-16 08:28:50','2015-05-16 08:28:50',8,15),(9,'Bonjour','2015-05-16 08:29:54','2015-05-16 08:29:54',1,15),(10,'gfgfg','2015-05-16 08:50:36','2015-05-16 08:50:36',1,15),(11,'sdsd','2015-05-16 08:52:23','2015-05-16 08:52:23',1,15);
/*!40000 ALTER TABLE `message_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  KEY `fk_messages_users1_idx` (`users_id`),
  CONSTRAINT `fk_messages_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (14,'Salut','2015-04-25 10:01:48','2015-04-25 10:01:48',13),(15,'Bonjour','2015-04-25 10:45:58','2015-04-25 10:45:58',13),(16,'Aurevoir','2015-04-25 10:48:08','2015-04-25 10:48:08',13),(17,'dddsd','2015-05-15 12:41:42','2015-05-15 12:41:42',13),(18,'bb,nb','2015-05-15 12:52:51','2015-05-15 12:52:51',13);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (5,'a-comparison-of-open-source-tools-for-sentiment-analysis','A comparison of open source tools for sentiment analysis','##Goal\n\nThe objective of this project is to apply various NLP sentiment analysis techniques on reviews of the Yelp Dataset and assess their effectivenes on correctly identifiyng them as positive or negative.\n\n##Yelp Dataset Challenge\n\nYelp has released an anonymized part of their stored data to the public. This was accompanied by a challenge with various awards in order to incentivize research and generate insights for the use of the data.','2015-04-12 11:00:28','2015-04-12 11:00:28','2015-04-12 00:04:00',13),(6,'basscss-a-low-level-css-toolkit','Basscss – A Low Level CSS Toolkit','[Basscss](http://www.basscss.com/) is a lightweight collection of base element styles, immutable utilities, layout modules, and color styles designed for speed, clarity, performance, and scalability.\n\nUsing clear, humanized naming conventions, Basscss is quick to internalize and easy to reason about while speeding up development time with more scalable, more readable code. Basscss strikes a balance between consistency and flexibility to allow for rapid prototyping and quick iterative changes when designing in the browser.','2015-04-22 14:51:08','2015-04-22 14:51:08','2015-04-22 00:04:00',15),(7,'how-to-save-your-iphone-and-apple-watch-from-notification-hell','How to save your iPhone and Apple Watch from notification hell','Early on in any relationship, your app will make one simple request: “I would like to send you notifications.” Sure, it makes sense for a breaking news, banking, or even a weather app, but what does Temple Run really need to tell me when I’m not in the middle of a run? Or any number of other games and random apps for that matter.\n\nMaybe you’ve hit OK thinking, “Yeah, I’ll change that later,” or “I don’t know what it would actually send me, but I don’t want to feel left out.” Maybe it didn’t bother you as much when the phone was in your pocket or sitting on your desk / nightstand / couch — but what about when it’s on your wrist? When each notification is both unavoidable and potentially visible to the world around you?\n\nWith the Apple Watch now rolling out worldwide, let’s take a moment to really look back and evaluate just what we need our phones to actively tell us at all hours day and night. Seriously, you gain nothing by letting Temple Run ping you at any time.','2015-04-24 19:48:58','2015-04-24 19:48:58','2015-04-24 00:04:00',15),(8,'a-qa-with-mike-tinskey-the-man-behind-fords-electric-future','A Q&A with Mike Tinskey, the man behind Ford\'s electric future','Ford, like the entirety of the auto industry, is in a cycle of rapid change: The planet is getting hotter. Fossil fuel, regardless of price, is falling out of favor. Young people don\'t want to own cars as badly as they used to. Services like Uber and Lyft are upending the notion of personal transportation altogether.','2015-04-24 19:55:15','2015-04-24 19:55:15','2015-04-24 00:04:00',15),(9,'zazaz','zazaz','azazaza','2015-05-15 12:41:12','2015-05-15 12:41:12','2015-05-15 00:05:00',15),(10,'lol-ca-marche','Lol ca marche','Je sais pas comment','2015-05-15 19:03:06','2015-05-15 19:03:06','2015-05-15 00:05:00',15),(23,'coucou','coucou','coucoucocuocuocu','2015-07-11 14:40:00','2015-07-11 14:40:00','2015-07-11 00:07:00',21),(24,'test-test-2','test test 2','kdlmfksmkfmskfsm','2015-07-11 14:43:15','2015-07-11 14:43:15','2015-07-11 00:07:00',21),(25,'title','title','fdlsfm','2015-07-11 14:47:04','2015-07-11 14:47:04','2015-07-11 00:07:00',21),(26,'fsmkfsmk','fsmkfsmk','fdmskfmsfkmsf','2015-07-11 14:58:34','2015-07-11 14:58:34','2015-07-11 00:07:00',21),(27,'dsqds','dsqds','dsqdq','2015-07-11 15:02:08','2015-07-11 15:02:08','2015-07-11 00:07:00',21),(28,'title2','title2','fksdlmfkdsmf','2015-07-11 15:22:17','2015-07-11 15:22:17','2015-07-11 00:07:00',21),(29,'dsfklksmk','dsfklksmk','sdkmdsfkkdf','2015-07-11 22:35:56','2015-07-11 22:35:56','2015-07-12 00:07:00',21);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameters`
--

DROP TABLE IF EXISTS `parameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameters`
--

LOCK TABLES `parameters` WRITE;
/*!40000 ALTER TABLE `parameters` DISABLE KEYS */;
/*!40000 ALTER TABLE `parameters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'global_chat',NULL,'public');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'egor@neon.fr','$2a$10$psTZIhhxN1exuiqOn/jio.O.4HDbR5gbXEHLw/FNNMOrTPpuf.u8G','admin','Egor','Berezovskiy','2014-08-23','17 rue bidon','active','offline','Tech lead','Developper','2014-08-23','2015-04-05 11:19:25','2015-04-05 11:19:25','2015-04-05 11:19:25'),(15,'egor2@neon.fr','sha1$3117a960$1$5ef79ab245c71cdc011d7ee2171e1661f494a1c8','rh','Egor2','Berezovskiy','2014-08-23','17 rue bidon','active','offline','Tech lead','Developper','2014-08-23','2015-04-12 18:25:26','2015-04-12 18:25:26','2015-04-12 18:25:26'),(16,'0.7468612159136683@domain.com','sha1$9cb1e17c$1$6fe944f27fa9345f88a255e5bf8e980ec6306ac0','admin','First Name','Last Name','2015-04-25','rue bidon','active','offline','peon','descr','2015-04-25','2015-04-25 14:21:40','2015-04-25 14:21:40','2015-04-25 14:21:40'),(17,'0.6074289588723332@domain.com','sha1$25e4e963$1$f4301f5d3974e660cbd7f1110ef35210776db381','user','First Name','Last Name','2015-04-25','rue bidon','active','offline','peon','descr','2015-04-25','2015-04-25 14:28:46','2015-04-25 14:28:46','2015-04-25 14:28:46'),(18,'782.6379996258765@domain.com','sha1$81d6b77c$1$16ded62fd8e362f9b65f014af846010e264e93da','user','First Name','Last Name','2015-04-25','rue bidon','active','offline','peon','descr','2015-04-25','2015-04-25 15:12:53','2015-04-25 15:12:53','2015-04-25 15:12:53'),(19,'588.4548709727824@domain.com','sha1$27bdf679$1$36650b676fa3c6d9bfa332ad89fd6bb5c68bfc77','user','First Name','Last Name','2015-04-25','rue bidon','active','offline','peon','descr','2015-04-25','2015-04-25 15:13:38','2015-04-25 15:13:38','2015-04-25 15:13:38'),(20,'463.9402844477445@domain.com','sha1$f307f7d5$1$531a9c99116b4097ad26c1629eb5ca7113a5e271','user','First Name','Last Name','2015-04-25','rue bidon','active','offline','peon','descr','2015-04-25','2015-04-25 15:15:42','2015-04-25 15:15:42','2015-04-25 15:15:42'),(21,'bidauddamien6@gmail.com','sha1$ac2dac1e$1$d3dce44a27c8d21a1dc7cb770b237c24028861be','admin','Damien','Bidaud','2015-07-11','5 avenue Léon de Bertalot 92400 Courbevoie','active','offline','admin','test compts','2015-07-11','2015-07-11 12:17:34','2015-07-11 12:17:34','2015-07-11 12:17:34');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-07-12 22:06:57
