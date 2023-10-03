const { validationResult, cookie } = require("express-validator");
// const {
//   users,
//   CreateUsers,
//   UpdateUser,
//   DeleteUser,
// } = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../Midleware/jwt");
const { User } = require("../models");
const { Sequelize } = require("sequelize");
const logger = require("../../logger");

exports.Login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { username: username } });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (!err) {
          if (result) {
            // Password sesuai, lakukan tindakan selanjutnya
            logger.info("login success" + result);
            const accessToken = createToken(user);
            res.cookie("accessToken", accessToken, {
              maxAge: 60 * 60 * 30, // Maksimum usia cookie dalam detik
              httpOnly: true, // Cookie hanya dapat diakses melalui HTTP (tidak dapat diakses melalui JavaScript)
              signed: true, // Cookie ditandatangani untuk menghindari perubahan oleh pengguna
              sameSite: "strict", // Pengaturan SameSite untuk keamanan
              secure: true, // Aktifkan secure untuk penggunaan HTTPS
              expires: new Date(Date.now() + 30 * 60 * 1000), // Waktu kedaluwarsa cookie
            });

            res.status(200).json({
              message: "Login successful",
              status: 200,
            });
          } else {
            logger.warn("login error" + err);
            // Password tidak sesuai
            res.status(401).json({
              message: "Invalid password",
              status: 401,
            });
          }
        } else {
          console.log(err);
          logger.error(err); // Handle kesalahan yang mungkin terjadi saat membandingkan
          res.status(500).json({
            message: "Error comparing passwords",
            status: 500,
          });
        }
      });
    } else {
      res.status(500).json({
        message: "Invalid username",
        status: 500,
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

exports.Create = async (req, res, next) => {
  const body = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation errors",
        data: errors.array(),
        status: 400,
      });
    }

    const existingUser = await User.findOne({
      where: { username: body.username },
    });

    if (!existingUser) {
      // Jika akun tidak ada, hash password dan simpan ke database
      bcrypt.hash(body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "Hash error",
            data: body,
            status: 500,
          });
        }

        // Simpan akun baru ke database
        try {
          const newUser = await User.create({
            username: body.username,
            password: hash,
          });
          delete newUser.dataValues.password;
          res.status(201).json({
            message: "Create Users Success",
            data: newUser,
            status: 201,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            error: "Create Users failed",
            status: 500,
          });
        }
      });
    } else {
      res.status(401).json({
        message: "Username already exists",
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

exports.getAll = async (req, res, next) => {
  await User.findAll()
    .then((response) => {
      const data = response;
      const responseData = data.map((data) => {
        delete data.dataValues.password;
        return data;
      });

      res.status(200).json({
        data: responseData,
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
  const body = req.body;
  const queryUsername = req.query.username;
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      bcrypt.hash(body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "Hash error",
            data: body,
            status: 500,
          });
        } else {
          const [updatedRowsCount] = await User.update(
            {
              username: body.username,
              password: hash,
            },
            {
              where: {
                username: queryUsername,
              },
            }
          );

          if (updatedRowsCount > 0) {
            res.status(200).json({
              message: "Update User Success",
              data: body,
              status: 200,
            });
          } else {
            res.status(404).json({
              message: "User not found",
              status: 404,
            });
          }
        }
      });
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
  const query = req.query.username;
  console.log(query);
  try {
    const deletesUser = await User.destroy({
      where: {
        username: query,
      },
    });
    console.log(deletesUser);
    if (deletesUser >= 1) {
      res.status(200).json({
        message: "Delete User Success",
        status: 200,
      });
    } else {
      res.status(404).json({
        message: "User not found",
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

exports.search = async (req, res, next) => {
  const search = req.query.search;

  await User.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          username: {
            [Sequelize.Op.like]: `%${search}%`,
          },
        },
        {
          password: {
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
