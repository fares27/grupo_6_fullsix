USE fullsix;

CREATE TABLE IF NOT EXISTS `user_rol` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*CARGO DATOS TABLA ROLES DE USUARIOS */;
LOCK TABLES `user_rol` WRITE;
INSERT INTO `user_rol` VALUES (1,'Administrador','2023-04-11 00:00:00',NULL,NULL),(2,'Usuario','2023-04-11 00:00:00',NULL,NULL);
UNLOCK TABLES;


CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100)  NOT NULL,
  `password` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `id_rol` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rol_u_foreign` (`id_rol`),
  CONSTRAINT `id_rol_u_foreign` FOREIGN KEY (`id_rol`) REFERENCES `user_rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `product_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*CARGO DATOS TABLA CATEGORIA DE PRODUCTOS */;
LOCK TABLES `product_category` WRITE;
INSERT INTO `product_category` VALUES (1,'Deportistas','2023-04-11 00:00:00',NULL,NULL),(2,'Entrenadores','2023-04-11 00:00:00',NULL,NULL),(3,'Familiares de Deportistas','2023-04-11 00:00:00',NULL,NULL);
UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(256) NOT NULL,
  `duration` varchar(100)  NOT NULL,
  `image` varchar(256) NULL,
  `price` decimal(9,2) NOT NULL,
  `state` int(10) NOT NULL,
  `id_category` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_category_p_foreign` (`id_category`),
  CONSTRAINT `id_category_p_foreign` FOREIGN KEY (`id_category`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*CARGO DATOS TABLA PRODUCTOS*/;
LOCK TABLES `product` WRITE;
INSERT INTO `product` VALUES (1,'Plan Deportistas 1','Incluye una entrevista con un especialista y plan detallado para todo el mes.','60-90 minutos',NULL,100,1,1,'2023-04-11 00:00:00',NULL,NULL),(2,'Plan Entrenadores 1','Incluye una entrevista con un especialista y plan detallado para todo el mes.','1 mes',NULL,200,1,2,'2023-04-11 00:00:00',NULL,NULL),(3,'Plan Familia 1','Incluye una entrevista con un especialista y plan detallado para todo el mes.','6 meses',NULL,300,1,3,'2023-04-11 00:00:00',NULL,NULL);
UNLOCK TABLES;


CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `total` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user_c_foreign` (`id_user`),
  CONSTRAINT `id_user_c_foreign` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_product` int(10) unsigned NOT NULL,
  `id_cart` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product_pc_foreign` (`id_product`),
  KEY `id_cart_pc_foreign` (`id_cart`),
  CONSTRAINT `id_product_pc_foreign` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  CONSTRAINT `id_cart_pc_foreign` FOREIGN KEY (`id_cart`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `total` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user_t_foreign` (`id_user`),
  CONSTRAINT `id_user_t_foreign` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `ticket_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_product` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `price` decimal(9,2) NOT NULL,
  `id_ticket` int(10) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product_td_foreign` (`id_product`),
  KEY `id_ticket_td_foreign` (`id_ticket`),
  CONSTRAINT `id_product_td_foreign` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  CONSTRAINT `id_ticket_td_foreign` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
