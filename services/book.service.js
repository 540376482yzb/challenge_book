const axios = require("axios");
const apiSever = "http://localhost:8080";
const dbApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});
const Book = {
  list: async (req, res, next) => {
    try {
      const books = await dbApi.get("/books").then(({ data }) => data);
      console.log("list of books", books);
      res.status(200).json({ books });
    } catch (error) {
      next(error);
    }
  },
  search: async (req, res, next) => {
    try {
      const searchTerm = Object.keys(req.query).reduce(
        (acc, curr) => (acc += `${curr}=${req.query[curr]}&`),
        ""
      );
      console.log("search term", searchTerm);
      const out = await dbApi.get("/books?" + searchTerm).then((result) => {
        const links = result.headers.link.split(",").map((data) => {
          const [link, ref] = data.split(";");
          const regexLink = /[<|>]/gi;
          const regexRef = /"/gi;
          return {
            link:
              apiSever +
              "/books/search?" +
              link.split("?")[1].replace(regexLink, ""),
            ref: ref.split("=")[1].replace(regexRef, ""),
          };
        });
        return {
          books: result.data,
          links,
        };
      });
      console.log("search result:", out);
      res.status(200).json(out);
    } catch (error) {
      console.error("error on search", error);
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const { title, author } = req.body;
      if (!title) throw new Error("Missing title");
      if (!author) throw new Error("Missing author");
      const book = await dbApi
        .post("/books", { title, author })
        .then(({ data }) => data);
      console.log("add book success: ", book);
      res.status(200).json({ book });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) throw new Error("missing id");
      await dbApi
        .delete("/books/" + id)
        .then(({ data }) => data)
        .catch((error) => {
          if (error.response.statusText === "Not Found") {
            //Not handle - already delete
            console.log("do not find book, no action taken");
          }
        });
      console.log("delete book success");
      res.status(200).json({ deleted: true });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = Book;
