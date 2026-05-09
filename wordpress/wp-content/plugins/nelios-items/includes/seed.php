<?php

if (!defined('ABSPATH')) {
  exit;
}

function nelios_seed_items_on_activation()
{
  nelios_register_item_post_type();
  nelios_register_item_meta();
  nelios_register_item_taxonomies();
  nelios_seed_taxonomy_terms();

  foreach (nelios_seed_items() as $item) {
    $existing = get_posts([
      'post_type' => 'nelios_item',
      'post_status' => 'any',
      'posts_per_page' => 1,
      'fields' => 'ids',
      'meta_key' => '_nelios_seed_key',
      'meta_value' => $item['seed_key'],
    ]);

    if (!empty($existing)) {
      nelios_sync_seed_item((int) $existing[0], $item);
      continue;
    }

    $post_id = wp_insert_post([
      'post_type' => 'nelios_item',
      'post_status' => 'publish',
      'post_title' => $item['title'],
      'post_name' => $item['slug'],
    ]);

    if (is_wp_error($post_id)) {
      continue;
    }

    nelios_sync_seed_item($post_id, $item);
  }

  flush_rewrite_rules();
}

function nelios_sync_seed_item($post_id, $item)
{
  update_post_meta($post_id, '_nelios_seed_key', $item['seed_key']);
  update_post_meta($post_id, 'price', $item['price']);
  update_post_meta($post_id, 'duration_days', $item['duration_days']);
  update_post_meta($post_id, 'duration_nights', $item['duration_nights']);
  update_post_meta($post_id, 'image_filename', $item['image_filename']);

  nelios_set_item_term_by_slug($post_id, 'hotel_stars', nelios_detect_hotel_stars($item['title']));
  nelios_set_item_term_by_slug($post_id, 'travel_style', nelios_detect_travel_style($item['title']));
}
