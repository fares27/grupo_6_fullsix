USE fullsix;

CREATE TABLE IF NOT EXISTS `user_rol` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100)  NOT NULL,
  `password` varchar(60) NOT NULL,
  `id_rol` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rol_u_foreign` (`id_rol`),
  CONSTRAINT `id_rol_u_foreign` FOREIGN KEY (`id_rol`) REFERENCES `user_rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `duration` varchar(100)  NOT NULL,
  `image` varchar(256) NOT NULL,
  `id_category` int(10) unsigned NOT NULL,
  `price` decimal(9,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_category_p_foreign` (`id_category`),
  CONSTRAINT `id_category_p_foreign` FOREIGN KEY (`id_category`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `total` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user_c_foreign` (`id_user`),
  CONSTRAINT `id_user_c_foreign` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned NOT NULL,
  `id_cart` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto_pc_foreign` (`id_producto`),
  KEY `id_cart_pc_foreign` (`id_cart`),
  CONSTRAINT `id_producto_pc_foreign` FOREIGN KEY (`id_producto`) REFERENCES `product` (`id`),
  CONSTRAINT `id_cart_pc_foreign` FOREIGN KEY (`id_cart`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `total` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user_t_foreign` (`id_user`),
  CONSTRAINT `id_user_t_foreign` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `ticket_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `price` decimal(9,2) NOT NULL,
  `id_ticket` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto_td_foreign` (`id_producto`),
  KEY `id_ticket_td_foreign` (`id_ticket`),
  CONSTRAINT `id_producto_td_foreign` FOREIGN KEY (`id_producto`) REFERENCES `product` (`id`),
  CONSTRAINT `id_ticket_td_foreign` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
