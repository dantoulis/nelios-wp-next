<?php
/**
 * Plugin Name: Nelios Items
 * Description: Custom items API for Nelios package cards.
 * Version: 1.0.0
 * Author: Konstantinos
 */

if (!defined('ABSPATH')) {
  exit;
}

define('NELIOS_ITEMS_PATH', plugin_dir_path(__FILE__));

require_once NELIOS_ITEMS_PATH . 'includes/post-type.php';
require_once NELIOS_ITEMS_PATH . 'includes/meta.php';
require_once NELIOS_ITEMS_PATH . 'includes/api.php';
require_once NELIOS_ITEMS_PATH . 'data/items.php';
require_once NELIOS_ITEMS_PATH . 'includes/seed.php';

add_action('init', 'nelios_register_item_post_type');
add_action('init', 'nelios_register_item_meta');
add_action('rest_api_init', 'nelios_register_items_endpoint');

register_activation_hook(__FILE__, 'nelios_seed_items_on_activation');
