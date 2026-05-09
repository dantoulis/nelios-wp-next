# Nelios Web Developer Assessment

Headless WordPress + Next.js App Router implementation.

The project runs a WordPress backend with a custom plugin for post items, exposes those items through a custom REST API, and renders the listing/filter UI in a Next.js frontend.

## Start

```bash
docker compose up --build
```

Open:

- Frontend: http://localhost:3000
- WordPress: http://localhost:8080
- WordPress admin: http://localhost:8080/wp-admin
- phpMyAdmin: http://localhost:8081

WordPress admin credentials:

```txt
username: admin
password: admin
```

The `wp-init` container is a one-time setup container. It should exit with code `0` after WordPress is installed, the custom plugin is activated, and seed data is created.

## Stop

```bash
docker compose down
```

## Reset

This removes the WordPress and MySQL volumes, then rebuilds from scratch on the next start.

```bash
docker compose down -v --remove-orphans
docker compose up --build
```

## Environment

The frontend fetches package data from WordPress using `WORDPRESS_API_URL`.

In Docker Compose this is set automatically:

```txt
WORDPRESS_API_URL=http://wordpress/wp-json/nelios/v1
```

For local non-Docker frontend development, the app falls back to:

```txt
http://localhost:8080/wp-json/nelios/v1
```

Example env values are documented in `.env.example`.

You do not need to copy `.env.example` to `.env` for the default Docker setup.
Docker Compose already provides the correct internal WordPress URL. Create a
local `.env` file only if you want to override `WORDPRESS_API_URL`.

## REST API

Package listing endpoint:

```txt
GET http://localhost:8080/wp-json/nelios/v1/items
```

Single package endpoint:

```txt
GET http://localhost:8080/wp-json/nelios/v1/items/{id}
```

Supported filters:

```txt
hotel_stars=3-stars|4-stars|5-stars
travel_style=by-car|other
min_price=number
max_price=number
```

Example:

```txt
http://localhost:8080/wp-json/nelios/v1/items?hotel_stars=4-stars
```

## Project Structure

```txt
app/                         Next.js App Router files
components/packages/          Package listing UI components
hooks/                        Client-side filter URL state
lib/                          API, types, formatting, query parsing
public/images/packages/       Package images used by the frontend
wordpress/wp-content/plugins/
  nelios-items/               Custom WordPress plugin
```
