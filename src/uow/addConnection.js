import UnitOfWork from "./UnitOfWorkFactory";

function addConnection(req, res, next) {
  UnitOfWork.create().then(uow => {
    res.locals.uow = uow;
    next();
  });
}

export default addConnection;
