const handleError = (err, res) => {
  console.error(err);

  if (err.code === 11000 && err.keyValue) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return res
      .status(409)
      .json({ error: `${field} "${value}" is already taken!` });
  }

  if (err.name === "ValidationError") {
    // const path = Object.values(err.errors).map((p) => {

    // })
    return res.status(400).json({ errorMessage: err.message});
  }

  const status = err.statusCode || 500;
  const message = err.message || "Server error";
  return res.status(status).json({ error: message });
};

module.exports = handleError;
