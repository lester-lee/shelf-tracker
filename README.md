# Shelf Tracker Server
This server is pretty barebones; it serves an API using `Express` and the routes can be found in `index.js`.

In the future it might be a good idea to move these routes into an external file but for now it's fine.

The API exposes endpoints to a `SQLite` database; the tables in the database match up with the components in the client. The logic for this is handled in `db.js`.

## Potential Features:
  - Edit an already-made shelving/shelf/item
  - Have multiple pages for different categories of shelving
  - Masonry-style layout for desktop devices