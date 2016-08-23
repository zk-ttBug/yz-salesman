/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : shopadmin

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2016-08-17 14:31:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_operation`
-- ----------------------------
DROP TABLE IF EXISTS `t_operation`;
CREATE TABLE `t_operation` (
  `ID` bigint(32) NOT NULL AUTO_INCREMENT,
  `USER_ACCOUNT` varchar(255) DEFAULT NULL,
  `PRODUCT_CODE` varchar(255) DEFAULT NULL,
  `OPER_TIME` varchar(255) DEFAULT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `REMARK` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_operation
-- ----------------------------

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `ID` bigint(32) NOT NULL AUTO_INCREMENT,
  `USER_ACCOUNT` varchar(255) DEFAULT NULL,
  `USER_NAME` varchar(255) DEFAULT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `REMARK` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('79', '13535295786', '冯丽玲', 'Normal', null);
INSERT INTO `t_user` VALUES ('80', '13710937437', '暨少琼', 'Normal', null);
INSERT INTO `t_user` VALUES ('81', '13560509455', '陈小娟', 'Normal', null);
INSERT INTO `t_user` VALUES ('82', '13640721400', '高瑞珍', 'Normal', null);
INSERT INTO `t_user` VALUES ('83', '13676216283', '安富娥', 'Normal', null);
INSERT INTO `t_user` VALUES ('84', '13640762451', '李华础', 'Normal', null);
INSERT INTO `t_user` VALUES ('85', '15107676490', '赖燕梅', 'Normal', null);
INSERT INTO `t_user` VALUES ('86', '13539436362', '董丽萍', 'Normal', null);
INSERT INTO `t_user` VALUES ('87', '13435681590', '林美清', 'Normal', null);
INSERT INTO `t_user` VALUES ('88', '13422348825', '何正兰', 'Normal', null);
INSERT INTO `t_user` VALUES ('89', '15975568490', '蔡艳儿', 'Normal', null);
INSERT INTO `t_user` VALUES ('90', '18777975250', '米志英', 'Normal', null);
INSERT INTO `t_user` VALUES ('91', '13172946757', '陈慧娴', 'Normal', null);
INSERT INTO `t_user` VALUES ('92', '15800268796', '冯少娟', 'Normal', null);
INSERT INTO `t_user` VALUES ('93', '13422044413', '黄杏玲', 'Normal', null);
INSERT INTO `t_user` VALUES ('94', '13622885663', '欧剑兰', 'Normal', null);
INSERT INTO `t_user` VALUES ('95', '13226665592', '黄雪', 'Normal', null);
INSERT INTO `t_user` VALUES ('96', '13068808589', '何秀冰', 'Normal', null);
INSERT INTO `t_user` VALUES ('97', '15975455165', '谢嘉文', 'Normal', null);
INSERT INTO `t_user` VALUES ('98', '13570102816', '张晓娟', 'Normal', null);
INSERT INTO `t_user` VALUES ('99', '13268276817', '黄火群', 'Normal', null);
INSERT INTO `t_user` VALUES ('100', '13533906721', '黎爱莲', 'Normal', null);
INSERT INTO `t_user` VALUES ('101', '13710817884', '庞瑜', 'Normal', null);
INSERT INTO `t_user` VALUES ('102', '13416203353', '苏凤爱', 'Normal', null);
INSERT INTO `t_user` VALUES ('103', '13539840066', '曾毓', 'Normal', null);
INSERT INTO `t_user` VALUES ('104', '13437544016', '刘珠棉', 'Normal', null);
INSERT INTO `t_user` VALUES ('105', '13527656813', '李小霞', 'Normal', null);
INSERT INTO `t_user` VALUES ('106', '13642785724', '郑春丽', 'Normal', null);
INSERT INTO `t_user` VALUES ('107', '13427631469', '钟连娣', 'Normal', null);
INSERT INTO `t_user` VALUES ('108', '13729312508', '韦奕娜', 'Normal', null);
INSERT INTO `t_user` VALUES ('109', '13129305596', '赵冬梅', 'Normal', null);
INSERT INTO `t_user` VALUES ('110', '13719325635', '颜妙贤', 'Normal', null);
INSERT INTO `t_user` VALUES ('111', '13560281543', '潘惠琼', 'Normal', null);
INSERT INTO `t_user` VALUES ('112', '13725382695', '鲁秀全', 'Normal', null);
INSERT INTO `t_user` VALUES ('113', '18122721390', '邹惠英', 'Normal', null);
INSERT INTO `t_user` VALUES ('114', '13312800254', '余顺月', 'Normal', null);
INSERT INTO `t_user` VALUES ('115', '13710009803', '吴余', 'Normal', null);
INSERT INTO `t_user` VALUES ('116', '13660855443', '陈绮曼', 'Normal', null);
INSERT INTO `t_user` VALUES ('117', '13418088729', '陈伟娟', 'Normal', null);
INSERT INTO `t_user` VALUES ('118', '13076840317', '吴玉琼', 'Normal', null);
INSERT INTO `t_user` VALUES ('119', '13710590371', '张悦红', 'Normal', null);
INSERT INTO `t_user` VALUES ('120', '13824048616', '吕翠玲', 'Normal', null);
INSERT INTO `t_user` VALUES ('121', '13128680509', '李爱霞', 'Normal', null);
INSERT INTO `t_user` VALUES ('122', '13527897142', '郑彩婵', 'Normal', null);
INSERT INTO `t_user` VALUES ('123', '13711095572', '赵萍', 'Normal', null);
INSERT INTO `t_user` VALUES ('124', '13570182066', '潘兰平', 'Normal', null);
INSERT INTO `t_user` VALUES ('125', '13610337826', '陈全英', 'Normal', null);
INSERT INTO `t_user` VALUES ('126', '15113875513', '梁秋玲', 'Normal', null);
INSERT INTO `t_user` VALUES ('127', '15627118330', '谢洁红', 'Normal', null);
INSERT INTO `t_user` VALUES ('128', '18928211696', '江秀娟', 'Normal', null);
INSERT INTO `t_user` VALUES ('129', '13660038386', '李玉连', 'Normal', null);
INSERT INTO `t_user` VALUES ('130', '17006912783', '张利红', 'Normal', null);
INSERT INTO `t_user` VALUES ('131', '18122356601', '封翠琼', 'Normal', null);
INSERT INTO `t_user` VALUES ('132', '15814840984', '李燕君', 'Normal', null);
INSERT INTO `t_user` VALUES ('133', '13711634509', '罗利珍', 'Normal', null);
INSERT INTO `t_user` VALUES ('134', '15521070231', '陈晓婵', 'Normal', null);
INSERT INTO `t_user` VALUES ('135', '13430240715', '黎雪梅', 'Normal', null);
INSERT INTO `t_user` VALUES ('136', '15920807571', '李莉华', 'Normal', null);
INSERT INTO `t_user` VALUES ('137', '83397575', '马伟英', 'Normal', null);
INSERT INTO `t_user` VALUES ('138', '13143377067', '黄玉珍', 'Normal', null);
INSERT INTO `t_user` VALUES ('139', '13450215564', '张永芝', 'Normal', null);
INSERT INTO `t_user` VALUES ('140', '13652543693', '杨莹', 'Normal', null);
INSERT INTO `t_user` VALUES ('142', '15817161537', '黎素琼', 'Normal', null);
INSERT INTO `t_user` VALUES ('143', '18729536165', '张苗苗', 'Normal', null);
INSERT INTO `t_user` VALUES ('144', '13660096396', '周爱茹', 'Normal', null);
INSERT INTO `t_user` VALUES ('145', '13312821921', '吴巧云', 'Normal', null);
INSERT INTO `t_user` VALUES ('146', '15768987324', '陈秋', 'Normal', null);
INSERT INTO `t_user` VALUES ('147', '13434271031', '郑泽璇', 'Normal', null);
INSERT INTO `t_user` VALUES ('149', '13877430922', '李莉', 'Normal', null);
INSERT INTO `t_user` VALUES ('150', '13268353081', '卢瑞萍', 'Normal', null);
INSERT INTO `t_user` VALUES ('151', '15768982969', '李桂芬', 'Normal', null);
INSERT INTO `t_user` VALUES ('152', '13432052958', '万群', 'Normal', null);
INSERT INTO `t_user` VALUES ('153', '15812467210', '余长英', 'Normal', null);
