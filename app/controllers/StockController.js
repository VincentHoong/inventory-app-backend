const Stock = require('../models/Stock');

exports.stocksCreate = (req, res, next) => {
    Stock.create(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
}

exports.stocksFind = (req, res, next) => {
    Stock.findOne({
        where: {
            ...req.params,
            ...req.query,
        }
    })
        .then((result) => {
            res.send(result || {});
        })
        .catch((error) => {
            res.send(error);
        });
};

exports.stocksFindAll = (req, res, next) => {
    const pageNumber = req.query?._pageNumber;
    const pageSize = req.query?._pageSize;
    let pagination = {};
    if (pageNumber && pageSize) {
        pagination = {
            offset: pageNumber * pageSize,
            limit: pageSize,
        };
    }

    Stock.findAll({
        ...pagination,
        where: req.query,
    })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        });
};

exports.stocksUpdate = (req, res, next) => {
    if (req.body.status === "SOLD") {
        req.body.soldAt = new Date();
    }
    Stock.update(req.body, {
        where: req.params
    })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
}

exports.stocksDelete = (req, res, next) => {
    Stock.destroy({
        where: req.params
    })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        })
}
