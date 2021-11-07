# Shelf Tracker Client
The architecture of this client is as follows:

## Services
`ShelfService` is a global property of `Vue` and accessed via `this.$ShelfService` in a component. It handles API requests to the server and committing the results of those requests to the `Vuex` store.

## Views
`App` is currently mainly a wrapper for `Home`. Possible extensions include adding different views for different Shelving groups.

## Components
`Shelving` maintains a list of `Shelf`s, which in turn maintains a list of `Item`s.

Most logic within these components involve adding, updating, and removing from their respective lists.