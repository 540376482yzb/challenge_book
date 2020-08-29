const api_key = "secret_token"; // idealy we want to store secret_token in environment variables
/* API authentication */

const apiAuthentication = (req, res, next) => {
  console.log(req.headers.api_key, api_key);
  if (req.headers.api_key === api_key) {
    next();
  } else {
    next("No API token found");
  }
};

module.exports = apiAuthentication;
