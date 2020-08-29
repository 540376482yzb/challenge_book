var express = require("express");
var router = express.Router();
const Book = require("../services/book.service");

/* GET Book list. */
router.get("/list", Book.list);

/* Add Book */
router.post("/", Book.add);

/** Delete Book */
router.delete("/:id", Book.delete);

/** Search books */
router.get("/search", Book.search);

module.exports = router;
