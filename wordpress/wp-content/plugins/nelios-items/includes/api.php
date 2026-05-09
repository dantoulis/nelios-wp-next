<?php

if (!defined('ABSPATH')) {
  exit;
}

function nelios_register_items_endpoint()
{
  register_rest_route('nelios/v1', '/items', [
    'methods' => 'GET',
    'callback' => 'nelios_get_items',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('nelios/v1', '/items/(?P<id>\d+)', [
    'methods' => 'GET',
    'callback' => 'nelios_get_item',
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

function nelios_get_item(WP_REST_Request $request)
{
  $id = (int) $request['id'];
  $post = get_post($id);

  if (!$post || $post->post_type !== 'nelios_item' || $post->post_status !== 'publish') {
    return new WP_Error(
      'nelios_item_not_found',
      'Item not found.',
      ['status' => 404]
    );
  }

  return rest_ensure_response(nelios_format_item($post));
}

function nelios_format_item(WP_Post $post)
{
  $days = (int) get_post_meta($post->ID, 'duration_days', true);
  $nights = (int) get_post_meta($post->ID, 'duration_nights', true);
  $image_filename = get_post_meta($post->ID, 'image_filename', true);
  $title = html_entity_decode(get_the_title($post), ENT_QUOTES, 'UTF-8');

  return [
    'id' => $post->ID,
    'slug' => $post->post_name,
    'title' => $title,
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
      'alt' => $title,
    ],
  ];
}
