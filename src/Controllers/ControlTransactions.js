const { typesofwaste, User, transactions } = require("../models");
const { validationResult } = require("express-validator");
const { Sequelize } = require("sequelize");

exports.Created = async (req, res, next) => {
  const userId = req.query.userId;
  const wasteId = req.query.wasteId;
  const numberkilograms = req.query.number;
  const Datauser = await UserFind(userId);
  const Datawaste = await wasteFind(wasteId);

  console.log(Datauser);
  console.log(Datawaste);

  if (Datawaste && Datauser) {
    const user = Datauser?.username;
    const trashtypeid = Datawaste?.garbagetypename;
    const totalprice = Datawaste?.pricekilogramme * numberkilograms;
    const transactiondate = newDate();

    res.status(201).json({
      message: "Create Users Success",
      data: {
        user: user,
        trashtypeid,
        numberkilograms,
        totalprice,
        transactiondate,
      },
      status: 201,
    });
    await transactions.create({
      user: user,
      trashtypeid,
      numberkilograms,
      totalprice,
      transactiondate,
    });
  } else {
    res.status(500).json({
      error: "Server error",
      status: 500,
    });
  }
};

exports.GetAll = async (req, res, next) => {
  const search = req.query.search;

  await transactions
    .findAll({
      where: {
        [Sequelize.Op.or]: [
          {
            user: {
              [Sequelize.Op.like]: `%${search}%`,
            },
          },
          {
            trashtypeid: {
              [Sequelize.Op.like]: `%${search}%`,
            },
          },
          {
            numberkilograms: {
              [Sequelize.Op.like]: `%${search}%`,
            },
          },
          {
            totalprice: {
              [Sequelize.Op.like]: `%${search}%`,
            },
          },
          {
            transactiondate: {
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

exports.Chart = async (req, res, next) => {
  try {
    // Ambil data transaksi dari database
    const transactionData = await transactions.findAll();

    // Inisialisasi objek untuk menyimpan total kilograms setiap jenis sampah
    const totalKilogramsByType = {};

    // Loop melalui data transaksi
    transactionData.forEach((transaction) => {
      const trashtypeid = transaction.dataValues.trashtypeid;
      const numberkilograms = transaction.dataValues.numberkilograms;

      // Jika jenis sampah belum ada dalam objek, tambahkan
      if (!totalKilogramsByType[trashtypeid]) {
        totalKilogramsByType[trashtypeid] = numberkilograms;
      } else {
        // Jika jenis sampah sudah ada, tambahkan jumlah kilograms
        totalKilogramsByType[trashtypeid] += numberkilograms;
      }
    });

    // Siapkan data untuk dikirim ke frontend dalam format yang sesuai
    const chartData = {
      labels: Object.keys(totalKilogramsByType), // Label adalah jenis sampah
      datasets: [
        {
          data: Object.values(totalKilogramsByType), // Data adalah jumlah kilograms
        },
      ],
    };

    // Kirim data ke frontend
    res.json(chartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", status: 500 });
  }
};

const newDate = () => {
  const now = new Date(); // Mendapatkan tanggal dan waktu saat ini
  const year = now.getFullYear(); // Mendapatkan tahun
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Mendapatkan bulan (dalam format 01-12)
  const day = String(now.getDate()).padStart(2, "0"); // Mendapatkan tanggal (dalam format 01-31)
  const hours = String(now.getHours()).padStart(2, "0"); // Mendapatkan jam (dalam format 00-23)
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Mendapatkan menit (dalam format 00-59)
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Mendapatkan detik (dalam format 00-59)

  // Format tanggal dan waktu menjadi format MySQL datetime
  const mysqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return mysqlDatetime;
};

const wasteFind = async (wasteId) => {
  const dataWaste = await typesofwaste.findAll();
  const data = dataWaste.find(
    (data) => data.dataValues.garbagetypename === wasteId
  );

  return data ? data.dataValues : null;
};

const UserFind = async (userId) => {
  const dataUser = await User.findAll();
  const user = dataUser.find((data) => data.dataValues.username === userId);

  return user ? user.dataValues : null;
};
