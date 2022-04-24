/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : nkm_admin

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 24/04/2022 12:15:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for nkm_dictionary
-- ----------------------------
DROP TABLE IF EXISTS `nkm_dictionary`;
CREATE TABLE `nkm_dictionary` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parent_id` bigint unsigned NOT NULL,
  `sort` int unsigned NOT NULL,
  `create_time` bigint unsigned NOT NULL,
  `is_deleted` int unsigned NOT NULL DEFAULT '0' COMMENT '0:未删除   1:已删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of nkm_dictionary
-- ----------------------------
BEGIN;
INSERT INTO `nkm_dictionary` (`id`, `name`, `code`, `value`, `parent_id`, `sort`, `create_time`, `is_deleted`) VALUES (1, '系统管理', 'system', '', 0, 0, 1591973806775, 0);
INSERT INTO `nkm_dictionary` (`id`, `name`, `code`, `value`, `parent_id`, `sort`, `create_time`, `is_deleted`) VALUES (2, '资源类型', 'system:resource:type', '', 1, 0, 1591973869522, 0);
INSERT INTO `nkm_dictionary` (`id`, `name`, `code`, `value`, `parent_id`, `sort`, `create_time`, `is_deleted`) VALUES (3, '菜单', 'system:resource:menu', '', 2, 0, 1591973899050, 0);
INSERT INTO `nkm_dictionary` (`id`, `name`, `code`, `value`, `parent_id`, `sort`, `create_time`, `is_deleted`) VALUES (4, '页面', 'system:resource:page', '', 2, 1, 1591973914964, 0);
INSERT INTO `nkm_dictionary` (`id`, `name`, `code`, `value`, `parent_id`, `sort`, `create_time`, `is_deleted`) VALUES (5, '按钮', 'system:resource:btn', '', 2, 2, 1591973929488, 0);
INSERT INTO `nkm_dictionary` (`id`, `name`, `code`, `value`, `parent_id`, `sort`, `create_time`, `is_deleted`) VALUES (6, '接口', 'system:resource:api', '', 2, 3, 1591973943052, 0);
COMMIT;

-- ----------------------------
-- Table structure for nkm_resource
-- ----------------------------
DROP TABLE IF EXISTS `nkm_resource`;
CREATE TABLE `nkm_resource` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `parent_id` bigint unsigned NOT NULL,
  `parent_code` varchar(200) NOT NULL,
  `icon` varchar(200) NOT NULL,
  `sort` int unsigned NOT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `enabled` int unsigned NOT NULL COMMENT '0：禁用  1：启用',
  `create_time` bigint unsigned NOT NULL,
  `is_deleted` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of nkm_resource
-- ----------------------------
BEGIN;
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (1, 'system', '系统管理', 'system:resource:menu', 0, '', 'el-icon-setting', 2, '/system', 1, 1566128640252, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (2, 'system:user', '用户管理', 'system:resource:menu', 1, '', 'x-icon-users', 1, '/system/user', 1, 1566128769341, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (3, 'system:resource', '资源管理', 'system:resource:menu', 1, '', 'el-icon-collection', 2, '/system/resource', 1, 1566128821691, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (4, 'system:role', '角色管理', 'system:resource:menu', 1, '', 'x-icon-roles', 3, '/system/role', 1, 1566128846696, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (5, 'dashboard', '仪表盘', 'system:resource:menu', 0, '', 'el-icon-odometer', 0, '/dashboard', 1, 1566136292367, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (6, 'personal:center', '个人中心', 'system:resource:menu', 0, '', 'el-icon-user', 1, '/personal-center', 1, 1566220196928, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (7, 'system:dictionary', '数据字典', 'system:resource:menu', 1, '', 'el-icon-notebook-1', 3, '/system/dictionary', 1, 1567432900204, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (8, 'system:user:api:list', '列表', 'system:resource:api', 2, '', '', 0, '/api/nkm-admin/system/user/list', 1, 1592301197531, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (9, 'system:user:api:registered', '用户注册', 'system:resource:api', 2, '', '', 0, '/api/nkm-admin/system/user/registered', 1, 1592301311815, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (10, 'system:user:api:del', '用户删除', 'system:resource:api', 2, '', '', 0, '/api/nkm-admin/system/user/del', 1, 1592301366303, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (11, 'system:user:api:modify-role', '修改角色', 'system:resource:api', 2, '', '', 0, '/api/nkm-admin/system/user/modify-role', 1, 1592313728482, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (12, 'system:user:api:reset-pwd', '重置密码', 'system:resource:api', 2, '', '', 0, '/api/nkm-admin/system/user/reset-password', 1, 1592313846476, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (13, 'system:resource:api:save', '资源保存', 'system:resource:api', 3, '', '', 0, '/api/nkm-admin/system/resource/save', 1, 1592314794775, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (14, 'system:resource:api:del', '资源删除', 'system:resource:api', 3, '', '', 0, '/api/nkm-admin/system/resource/del', 1, 1592314948240, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (15, 'system:role:api:save', '角色保存', 'system:resource:api', 4, '', '', 0, '/api/nkm-admin/system/role/save', 1, 1592315164331, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (16, 'system:role:api:del', '角色删除', 'system:resource:api', 4, '', '', 0, '/api/nkm-admin/system/role/del', 1, 1592315817575, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (17, 'system:dict:api:save', '字典保存', 'system:resource:api', 7, '', '', 0, '/api/nkm-admin/system/dictionary/save', 1, 1592315866661, 0);
INSERT INTO `nkm_resource` (`id`, `code`, `name`, `type`, `parent_id`, `parent_code`, `icon`, `sort`, `path`, `enabled`, `create_time`, `is_deleted`) VALUES (18, 'system:dict:api:del', '字典删除', 'system:resource:api', 7, '', '', 0, '/api/nkm-admin/system/dictionary/del', 1, 1592315899190, 0);
COMMIT;

-- ----------------------------
-- Table structure for nkm_role
-- ----------------------------
DROP TABLE IF EXISTS `nkm_role`;
CREATE TABLE `nkm_role` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `permission` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` bigint unsigned NOT NULL,
  `is_deleted` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of nkm_role
-- ----------------------------
BEGIN;
INSERT INTO `nkm_role` (`id`, `name`, `code`, `permission`, `create_time`, `is_deleted`) VALUES (1, '系统管理员', 'systemAdministrator', '5,6,1,2,8,9,10,11,12,3,13,14,4,15,16,7,17,18', 1565586505970, 0);
INSERT INTO `nkm_role` (`id`, `name`, `code`, `permission`, `create_time`, `is_deleted`) VALUES (2, '测试', 'test', '5,6,1,2,3,4,7', 1565586505970, 0);
INSERT INTO `nkm_role` (`id`, `name`, `code`, `permission`, `create_time`, `is_deleted`) VALUES (3, '测试管理员', 'testAdmin', '5,6,1,2,8,9,10,11,12,3,13,14,4,15,16,7,17,18', 1592377309989, 0);
COMMIT;

-- ----------------------------
-- Table structure for nkm_users
-- ----------------------------
DROP TABLE IF EXISTS `nkm_users`;
CREATE TABLE `nkm_users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `login_name` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `display_name` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `registered_time` bigint NOT NULL DEFAULT '1565257063368',
  `last_login_time` bigint NOT NULL DEFAULT '1565257063368',
  `status` int unsigned NOT NULL DEFAULT '1' COMMENT '0：禁用；1：启用',
  `is_system_admin` int unsigned NOT NULL DEFAULT '0',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `agent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_deleted` int unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of nkm_users
-- ----------------------------
BEGIN;
INSERT INTO `nkm_users` (`id`, `login_name`, `password`, `display_name`, `email`, `role`, `registered_time`, `last_login_time`, `status`, `is_system_admin`, `avatar`, `agent`, `is_deleted`) VALUES (1, 'admin', 'U2FsdGVkX1/nkZ53+gUWe+lG/z4SFcLr+d5Dik8W7hczuIDTb4tWJb6jaWDHYaBnwrsqCrS7YJ4ThNc89xI8Hg==', '系统管理员', 'me@example.com', 'systemAdministrator', 1565758490904, 1650718908886, 1, 1, '/api/nkm-admin/readfile?path=/upload/2020/06/account/20200628130018776265.png', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36', 0);
INSERT INTO `nkm_users` (`id`, `login_name`, `password`, `display_name`, `email`, `role`, `registered_time`, `last_login_time`, `status`, `is_system_admin`, `avatar`, `agent`, `is_deleted`) VALUES (2, 'test', 'U2FsdGVkX1+VqcaYKflrT2jtgkJ/XcHVsOVf3ynTSCkQKrmY6Ao/z3qQA8nInOR16mMa/i+8450XkqRp7x/iMw==', '测试人员1', 'm@example.com', 'test', 1592184900031, 1618410029571, 1, 0, '/api/nkm-admin/readfile?path=/upload/2020/06/account/20200616171102099796.png', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', 0);
INSERT INTO `nkm_users` (`id`, `login_name`, `password`, `display_name`, `email`, `role`, `registered_time`, `last_login_time`, `status`, `is_system_admin`, `avatar`, `agent`, `is_deleted`) VALUES (3, 'testAdmin', 'U2FsdGVkX1+slLT6JQ5iH5K2+5eia7BuYJaogrJ3CqVY2gmctVds0MJ4SWqfDvLKZSM/7WlS99pvgmHgTrEp1A==', '测试管理员', 'me@example.com', 'testAdmin', 1592378282544, 1650718890572, 1, 0, '/img/Fruit-1.ec29dc10.png', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36', 0);
INSERT INTO `nkm_users` (`id`, `login_name`, `password`, `display_name`, `email`, `role`, `registered_time`, `last_login_time`, `status`, `is_system_admin`, `avatar`, `agent`, `is_deleted`) VALUES (4, 'test1', 'U2FsdGVkX187NcE3grth8DROkMrajEkG1qSigjPQ/oOzxjL4Kh1MBMJM2zkDGuc3G4z0P3I40V1sdGV4MV2FxQ==', 'test1', 'me@example.com', 'test', 1618410117679, 1618410141367, 1, 0, '/img/Fruit-1.ec29dc10.png', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
