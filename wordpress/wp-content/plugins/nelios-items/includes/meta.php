<?php

if (!defined('ABSPATH')) {
  exit;
}

function nelios_register_item_meta()
{
  register_post_meta('nelios_item', 'price', [
    'type' => 'number',
    'single' => true,
    'show_in_rest' => true,
    'auth_callback' => '__return_true',
  ]);

  register_post_meta('nelios_item', 'duration_days', [
    'type' => 'integer',
    'single' => true,
    'show_in_rest' => true,
    'auth_callback' => '__return_true',
  ]);

  register_post_meta('nelios_item', 'duration_nights', [
    'type' => 'integer',
    'single' => true,
    'show_in_rest' => true,
    'auth_callback' => '__return_true',
  ]);

  register_post_meta('nelios_item', 'image_filename', [
    'type' => 'string',
    'single' => true,
    'show_in_rest' => true,
    'auth_callback' => '__return_true',
  ]);
}
