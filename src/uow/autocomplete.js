function autocomplete(req, res, next) {
  function complete() {
    if (req.uow) {
      req.uow.release();
    }
  }
  res.on("finish", complete);
  res.on("close", complete);
  next();
}

export default autocomplete;
