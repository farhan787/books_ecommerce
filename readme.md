## $ Local Machine Prerequisites

- Node.js version 14+
- MySql version 8+ (if using local database)

## $ Database Setup

```sql
- Create Database
CREATE DATABASE books_ecommerce;

- Create `books` table
CREATE TABLE books (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `author` VARCHAR(50) DEFAULT NULL,
    `description` VARCHAR(512) DEFAULT NULL,
    `image_url` VARCHAR(256) DEFAULT NULL,

    PRIMARY KEY(`id`)
);

- Create `book_reviews` table
CREATE TABLE book_reviews (
    `id` INT NOT NULL AUTO_INCREMENT,
    `book_id` INT NOT NULL,
    `star_rating` TINYINT DEFAULT 0,
    `comment` VARCHAR(256),

    PRIMARY KEY(`id`),
    FOREIGN KEY (`book_id`)
        REFERENCES books(`id`)
        ON DELETE CASCADE
);

- Insert queries for books (seed data)
INSERT INTO books(title, author, description, image_url) VALUES ('Harry Potter', 'J.K Rowling', 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling.', 'https://img.freepik.com/premium-photo/opened-book-bible-background_112554-164.jpg?w=360');
INSERT INTO books(title, author, description, image_url) VALUES ('Mr. Bean', 'Paul Wilndle', 'The childish Mr Bean uses his unusual wit to fulfil everyday tasks. But more often than not, he ends up creating trouble for himself and those around him.', 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&w=1000&q=80');
```

## $ Setup

1. Clone this repository and change working directory

```bash
    $ git clone https://github.com/farhan787/books_ecommerce.git && cd books_ecommerce
```

2. Install dependencies

```bash
    $ npm install
```

2. Run development server

```bash
    $ npm run dev
```

### $ Environment Variables

Either you can use default values of database environment variables as defined in the [DB file here](https://github.com/farhan787/books_ecommerce/blob/master/startup/db.js). Or you can export below environment variables before running the dev server.

```bash
DB_HOST=''
DB_USER=''
DB_PASSWORD=''
DB_NAME=''
```

### $ API Curls (import these in Postman)

1. To get list of books with reviews sorted by average rating of each book among all books in database

```bash
$ curl --location --request GET 'localhost:8080/books?limit=1&offset=1'
```

2. Post a review for a book

```bash
$ curl --location --request POST 'localhost:8080/reviews/addReview' \
--header 'Content-Type: application/json' \
--data-raw '{
    "bookId": 1,
    "comment": "Really good book",
    "reviewStarsCount": 4
}'
```
