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

add_action('init', 'nelios_register_item_post_type');
add_action('init', 'nelios_register_item_meta');
add_action('rest_api_init', 'nelios_register_items_endpoint');

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

function nelios_register_items_endpoint()
{
  register_rest_route('nelios/v1', '/items', [
    'methods' => 'GET',
    'callback' => 'nelios_get_items',
    'permission_callback' => '__return_true',
  ]);
}

function nelios_get_items()
{
  $query = new WP_Query([
    'post_type' => 'nelios_item',
    'post_status' => 'publish',
    'posts_per_page' => -1,
  ]);

  $items = array_map('nelios_format_item', $query->posts);

  return rest_ensure_response([
    'items' => $items,
    'total' => count($items),
  ]);
}

function nelios_format_item(WP_Post $post)
{
  $days = (int) get_post_meta($post->ID, 'duration_days', true);
  $nights = (int) get_post_meta($post->ID, 'duration_nights', true);
  $image_filename = get_post_meta($post->ID, 'image_filename', true);

  return [
    'id' => $post->ID,
    'slug' => $post->post_name,
    'title' => get_the_title($post),
    'duration' => [
      'days' => $days,
      'nights' => $nights,
    ],
    'price' => [
      'amount' => (float) get_post_meta($post->ID, 'price', true),
      'currency' => 'EUR',
      'prefix' => 'ΑΠΟ',
    ],
    'image' => [
      'url' => '/images/packages/' . $image_filename,
      'alt' => get_the_title($post),
    ],
  ];
}

