<?php

if (!defined('ABSPATH')) {
  exit;
}

function nelios_register_item_taxonomies()
{
  register_taxonomy('hotel_stars', ['nelios_item'], [
    'labels' => [
      'name' => 'Hotel Stars',
      'singular_name' => 'Hotel Stars',
    ],
    'public' => true,
    'show_in_rest' => true,
    'hierarchical' => false,
  ]);

  register_taxonomy('travel_style', ['nelios_item'], [
    'labels' => [
      'name' => 'Travel Styles',
      'singular_name' => 'Travel Style',
    ],
    'public' => true,
    'show_in_rest' => true,
    'hierarchical' => false,
  ]);
}

function nelios_seed_taxonomy_terms()
{
  foreach (nelios_taxonomy_terms() as $taxonomy => $terms) {
    foreach ($terms as $term) {
      if (!term_exists($term['slug'], $taxonomy)) {
        wp_insert_term($term['name'], $taxonomy, ['slug' => $term['slug']]);
      }
    }
  }
}

function nelios_taxonomy_terms()
{
  return [
    'hotel_stars' => [
      ['slug' => '3-stars', 'name' => '3 αστέρων'],
      ['slug' => '4-stars', 'name' => '4 αστέρων'],
      ['slug' => '5-stars', 'name' => '5 αστέρων'],
    ],
    'travel_style' => [
      ['slug' => 'by-car', 'name' => 'Με το Ι.Χ. σας'],
      ['slug' => 'other', 'name' => 'Άλλο μέσο'],
    ],
  ];
}

function nelios_detect_hotel_stars($title)
{
  if (preg_match('/5\s*\*/u', $title)) {
    return '5-stars';
  }

  if (preg_match('/4\s*\*/u', $title)) {
    return '4-stars';
  }

  return '3-stars';
}

function nelios_detect_travel_style($title)
{
  if (preg_match('/Ι\s*\.\s*Χ\s*\.?\s*σας/iu', $title)) {
    return 'by-car';
  }

  return 'other';
}

function nelios_set_item_term_by_slug($post_id, $taxonomy, $slug)
{
  $term = get_term_by('slug', $slug, $taxonomy);

  if (!$term || is_wp_error($term)) {
    return;
  }

  wp_set_object_terms($post_id, [(int) $term->term_id], $taxonomy);
}

function nelios_normalize_hotel_stars_filter($value)
{
  if (in_array($value, ['3', '4', '5'], true)) {
    return $value . '-stars';
  }

  if (in_array($value, ['3-stars', '4-stars', '5-stars'], true)) {
    return $value;
  }

  return '';
}
