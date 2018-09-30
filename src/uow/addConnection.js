import UnitOfWorkFactory from "./UnitOfWorkFactory";

function addConnection(req, res, next) {
  UnitOfWorkFactory.create().then(uow => {
    req.uow = uow;
    next();
  });
}

export default addConnection;
