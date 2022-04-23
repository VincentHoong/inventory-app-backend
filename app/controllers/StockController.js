const Stock = require('../models/Stock');
const sequelize = require('../../config/database');
const { Op } = require('sequelize');

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
    let totalPages = 0;
    let pagination = {};
    if (pageNumber && pageSize) {
        pagination = {
            offset: (pageNumber - 1) * pageSize,
            limit: parseInt(pageSize),
        };
        delete req.query._pageNumber;
        delete req.query._pageSize;
    }

    Stock.findOne({
        where: req.query,
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("status")), "totalCount"],
        ],
    })
        .then((result) => {
            totalPages = result.dataValues.totalCount;

            return Stock.findAll({
                ...pagination,
                where: req.query,
            })
        })
        .then((result) => {
            res.send({
                data: result,
                pageInfo: {
                    pageNumber: parseInt(pageNumber),
                    pageSize: parseInt(pageSize),
                    totalPages: Math.ceil(totalPages / pageSize)
                },
            });
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

exports.stocksSummary = (req, res, next) => {
    Stock.findAll({
        where: req.query,
        attributes: [
            "status",
            [sequelize.fn("SUM", sequelize.col("price")), "totalPrice"],
            [sequelize.fn("COUNT", sequelize.col("status")), "totalCount"],
        ],
        group: "status",
    })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        });
};

exports.stocksChart = (req, res, next) => {
    Stock.findAll({
        where: {
            ...req.query,
            soldAt: {
                [Op.not]: null,
            },
        },
        attributes: [
            [sequelize.fn("DATE", sequelize.col("soldAt")), "date"],
            [sequelize.fn("SUM", sequelize.col("price")), "totalPrice"],
            [sequelize.fn("COUNT", sequelize.col("status")), "totalCount"],
        ],
        group: sequelize.fn("DATE", sequelize.col("soldAt")),
    })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        });
};
