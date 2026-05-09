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

function nelios_get_items(WP_REST_Request $request)
{
  $args = [
    'post_type' => 'nelios_item',
    'post_status' => 'publish',
    'posts_per_page' => -1,
  ];

  $tax_query = [];
  $hotel_stars = nelios_normalize_hotel_stars_filter((string) $request->get_param('hotel_stars'));
  $travel_style = sanitize_title((string) $request->get_param('travel_style'));

  if ($hotel_stars !== '') {
    $tax_query[] = [
      'taxonomy' => 'hotel_stars',
      'field' => 'slug',
      'terms' => $hotel_stars,
    ];
  }

  if ($travel_style !== '') {
    $tax_query[] = [
      'taxonomy' => 'travel_style',
      'field' => 'slug',
      'terms' => $travel_style,
    ];
  }

  if (!empty($tax_query)) {
    $args['tax_query'] = array_merge(['relation' => 'AND'], $tax_query);
  }

  $meta_query = [];

  if ($request->get_param('min_price') !== null) {
    $meta_query[] = [
      'key' => 'price',
      'value' => (float) $request->get_param('min_price'),
      'compare' => '>=',
      'type' => 'NUMERIC',
    ];
  }

  if ($request->get_param('max_price') !== null) {
    $meta_query[] = [
      'key' => 'price',
      'value' => (float) $request->get_param('max_price'),
      'compare' => '<=',
      'type' => 'NUMERIC',
    ];
  }

  if (!empty($meta_query)) {
    $args['meta_query'] = array_merge(['relation' => 'AND'], $meta_query);
  }

  $query = new WP_Query($args);

  $items = array_map('nelios_format_item', $query->posts);
  $price_bounds = nelios_get_price_bounds();
  $selected_min_price = $request->get_param('min_price') !== null
    ? (float) $request->get_param('min_price')
    : $price_bounds['min'];
  $selected_max_price = $request->get_param('max_price') !== null
    ? (float) $request->get_param('max_price')
    : $price_bounds['max'];

  return rest_ensure_response([
    'items' => $items,
    'total' => count($items),
    'availableFilters' => [
      'hotelStars' => nelios_format_terms('hotel_stars'),
      'travelStyles' => nelios_format_terms('travel_style'),
      'price' => [
        'min' => $price_bounds['min'],
        'max' => $price_bounds['max'],
        'selectedMin' => $selected_min_price,
        'selectedMax' => $selected_max_price,
        'currency' => 'EUR',
        'step' => 1,
        'ranges' => [
          ['slug' => 'up-to-50', 'label' => 'Έως 50 €', 'min' => 0, 'max' => 50],
          ['slug' => '50-150', 'label' => '50 - 150 €', 'min' => 50, 'max' => 150],
          ['slug' => '150-500', 'label' => '150 - 500 €', 'min' => 150, 'max' => 500],
        ],
      ],
    ],
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
    'filters' => [
      'hotelStars' => nelios_format_post_terms($post->ID, 'hotel_stars'),
      'travelStyle' => nelios_format_post_terms($post->ID, 'travel_style'),
    ],
  ];
}

function nelios_format_terms($taxonomy)
{
  $terms = get_terms([
    'taxonomy' => $taxonomy,
    'hide_empty' => false,
  ]);

  if (empty($terms) || is_wp_error($terms)) {
    return [];
  }

  return array_map(function ($term) {
    return [
      'id' => $term->term_id,
      'slug' => $term->slug,
      'name' => $term->name,
      'count' => $term->count,
    ];
  }, array_values($terms));
}

function nelios_get_price_bounds()
{
  $post_ids = get_posts([
    'post_type' => 'nelios_item',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'fields' => 'ids',
  ]);

  $prices = [];

  foreach ($post_ids as $post_id) {
    $price = get_post_meta($post_id, 'price', true);

    if ($price !== '' && is_numeric($price)) {
      $prices[] = (float) $price;
    }
  }

  if (empty($prices)) {
    return [
      'min' => 0,
      'max' => 0,
    ];
  }

  return [
    'min' => min($prices),
    'max' => max($prices),
  ];
}

function nelios_format_post_terms($post_id, $taxonomy)
{
  $terms = get_the_terms($post_id, $taxonomy);

  if (empty($terms) || is_wp_error($terms)) {
    return [];
  }

  return array_map(function ($term) {
    return [
      'id' => $term->term_id,
      'slug' => $term->slug,
      'name' => $term->name,
    ];
  }, array_values($terms));
}
