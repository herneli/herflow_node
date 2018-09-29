function autocomplete(req, res, next) {
  function complete() {
    if (res.locals.uow) {
      res.locals.uow.release();
    }
  }
  res.on("finish", complete);
  res.on("close", complete);
  next();
}

export default autocomplete;
