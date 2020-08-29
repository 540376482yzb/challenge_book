# quick start

## start local server

- `npm start`

## start json-server to serve fake db

- `npm install -g json-server`
- `json-server --watch ./db/db.json`

### Configuration request header

- In `Postman` insert `api_key` field into headers using token `secret_token`

## Server achitecture

```
    - db // database related dir
    - routes // routes related dir
    - services //where all the services stored
    - middlewares //middleware components such as authentication module
    - app.js entry point
```

## RESTFUL API

#### list books

```
    get
        - url http://localhost:8080/books/list
```

#### add book

```
    post
        - url http://localhost:8080/books/
        - body {
            title:'<example title>',
            author:'<example author>'
        }
```

#### delete book

```
    delete
        - url http://localhost:8080/books/:id
```

#### search book

```
    //basic search
    get
        - url http://localhost:8080/books/search?
        - query "<some query>"

    //example search link
    http://localhost:8080/books/search?_page=1&_limit=5&title_like=some&

    //search by title exact
    query = "title=some"
```

## Bonus

### ways to search books

```
    //search by title exact
    query = "title=some"

    //search by simiar title
    query = "title_like=some"

    //search by both title and author
    query = "title_like=some&author_like=zhou"

    //full text search allow search engine to look for matching q on both title | author field.
    query = "q=some"

    /*
        we can also optimize the search result by implementing pagination

        this will return search result plus pagination pointers for the previous/next page
    */
    query = "_page=1&limit=5&title_like=some"
```

### provide amazon buy option

- conclusion : I am not able to implement this feature as the only way for me to search book on amazon is throught `Amazon Product API` which required an `Associated Account`(Required manual approval from Amazon reps which is impossible to complete in 3-4 hours)
- Here is how I understand the problem and resource gathered to help me solve the problem
  1. resource: https://webservices.amazon.com/paapi5/documentation/quick-start/using-sdk.html
  2. install deps required on `Node.js` example project
  3. complete necessary configuration (`access_token`, `secret_key`, ...etc)
  4. set searchItemsRequest['Keywords'] = 'Harry Potter'(book title)
  5. searchItemsRequest['SearchIndex'] = 'Books';
  6. read data from Promise `api.searchItems(searchItemsRequest)`
  7. extract page link from the json
