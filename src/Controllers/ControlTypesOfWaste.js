const { typesofwaste } = require("../models");
const { validationResult } = require("express-validator");
const { Sequelize } = require("sequelize");

exports.Create = async (req, res, next) => {
  const garbagetypename = req.body.garbagetypename;
  const description = req.body.description;
  const pricekilogramme = req.body.pricekilogramme;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation errors",
        data: errors.array(),
        status: 400,
      });
    }

    const existingWaste = await typesofwaste.findOne({
      where: { garbagetypename },
    });

    if (!existingWaste) {
      // Jika akun tidak ada, hash password dan simpan ke database
      const newWaste = await typesofwaste.create({
        garbagetypename,
        description,
        pricekilogramme,
      });
      res.status(201).json({
        message: "Create waste Success",
        data: newWaste,
        status: 201,
      });
    } else {
      res.status(401).json({
        message: "waste already exists",
        status: 401,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error",
      status: 500,
    });
  }
};

exports.GetAll = async (req, res, next) => {
  await typesofwaste
    .findAll()
    .then((response) => {
      const data = response;

      res.status(200).json({
        data: data,
        message: "get All",
        status: 200,
      });
    })
    .catch((err) => {
      res.status(400).status(500).json({
        error: "server error",
        status: 400,
      });
    });
};

exports.Update = async (req, res, next) => {
  const garbagetypename = req.body.garbagetypename;
  const description = req.body.description;
  const pricekilogramme = req.body.pricekilogramme;
  const queryWaste = req.query.waste;

  const errors = validationResult(req);

  try {
    if (errors.isEmpty()) {
      const existingWaste = await typesofwaste.findOne({
        where: { garbagetypename: queryWaste },
      });
      if (existingWaste) {
        const [updatedRowsCount] = await typesofwaste.update(
          {
            garbagetypename,
            description,
            pricekilogramme,
          },
          {
            where: {
              garbagetypename: queryWaste,
            },
          }
        );
        console.log(updatedRowsCount);
        if (updatedRowsCount > 0) {
          res.status(200).json({
            message: "Update Waste Success",
            data: req.body, // Menggunakan req.body untuk merespons data yang diperbarui
            status: 200,
          });
        } else {
          res.status(404).json({
            message: "Waste not found",
            status: 404,
          });
        }
      } else {
        res.status(401).json({
          message: "Waste not found",
          status: 401,
        });
      }
    } else {
      res.status(401).json({
        message: "Validation error",
        data: errors.array(),
        status: 401,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error",
      status: 500,
    });
  }
};

exports.Delete = async (req, res, next) => {
  const query = req.query.waste;
  try {
    const deletesWaste = await typesofwaste.destroy({
      where: {
        garbagetypename: query,
      },
    });
    console.log(deletesWaste);
    if (deletesWaste >= 1) {
      res.status(200).json({
        message: "Delete Waste Success",
        status: 200,
      });
    } else {
      res.status(404).json({
        message: "Waste not found",
        status: 404,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "server error",
      status: 400,
      message: err,
    });
  }
};

exports.Search = async (req, res, next) => {
  const search = req.query.search;

  await typesofwaste
    .findAll({
      where: {
        [Sequelize.Op.or]: [
          {
            garbagetypename: {
              [Sequelize.Op.like]: `%${search}%`,
            },
          },
          {
            pricekilogramme: {
              [Sequelize.Op.like]: `%${search}%`,
            },
          },
        ],
      },
    })
    .then((response) => {
      if (response.length > 0) {
        res.status(200).json({
          status: 200,
          message: "search",
          data: response,
        });
      } else {
        res.status(401).json({
          status: 200,
          message: "search not found",
          data: response,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "server error",
        status: 400,
        message: err,
      });
    });
};
