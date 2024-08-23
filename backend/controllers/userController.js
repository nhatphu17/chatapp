const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const userController = {
  index: async (req, res) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page, 10) || 1;
    const keyword = req.query.keyword;
    const limit = 12;
    const offset = (page - 1) * limit;

    try {
      console.log("keyword",keyword);
      let query = `%${keyword}%`;

      const users = await prisma.$queryRaw(Prisma.sql`
        SELECT 
          id,
          username,
          profileImage,
          nickname
        FROM User
        WHERE username LIKE ${query}
        ORDER BY id ASC
        LIMIT ${limit}
        OFFSET ${offset}
      `);

      let totalUsers = await prisma.$queryRaw(Prisma.sql`
        SELECT COUNT(*) as total FROM User
      `);

      totalUsers = Number(totalUsers[0].total);

      const response = {
        data: users,
        page: page,
        total: totalUsers,
        last_page: Math.ceil(totalUsers / limit),
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Unable to fetch users" });
    }
  },

  update: async (req, res) => {
    const userId = req.user.id;
    const pictureImage = req.file ? req.file.path : null;
    const { username, nickname } = req.body;

    let updateData = {};
    if (pictureImage) updateData.profileImage = pictureImage;
    if (username) updateData.username = username;
    if (nickname) updateData.nickname = nickname;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });

      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: "Unable to update user" });
    }
  },
  getUserByName: async (req, res) => {
    let keyword = req.query.keyword;
    try {
      console.log("keyword1",keyword);
      //keyword = "nhatnhat";
      let query = `%${keyword}%`;

      const user = await prisma.$queryRaw(Prisma.sql`
        SELECT 
          id,
          username,
          profileImage,
          nickname
        FROM User
        WHERE username LIKE ${query}
      `);

      console.log("user",user);

      const response = {
        data: user,
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Unable to fetch users" });
    }
  },
};

module.exports = userController;
