<?php

if (!defined('ABSPATH')) {
  exit;
}

function nelios_register_item_post_type()
{
  register_post_type('nelios_item', [
    'labels' => [
      'name' => 'Items',
      'singular_name' => 'Item',
      'add_new_item' => 'Add New Item',
      'edit_item' => 'Edit Item',
    ],
    'public' => true,
    'show_in_rest' => true,
    'menu_icon' => 'dashicons-screenoptions',
    'supports' => ['title', 'custom-fields'],
  ]);
}
