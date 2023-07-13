import { sequelize } from "../../../../src/database/database.config";
import { User } from "../../../../src/api/models/user";
import { UserFiles } from "../../../../src/api/models/user-file";

describe("UserFiles Model", () => {
  beforeAll(async () => {
    
    await sequelize.sync({ force: true }); // Sync the model with the database and create tables
    //Create user to add it a ile cause file without user cannot exists
    await User.create({
        id: "f8d2b728-c483-4868-aac1-6281f59b584b",
        authId: "auth123",
        email: "example@example.com",
        name: "John",
        lastName: "Doe",
        secondLastName: "Smith",
        age: 25,
        address: "123 Street",
      });
  });

  afterAll(async () => {
    await sequelize.close(); // Close the database connection after all tests are finished
  });

  it("should create a user file", async () => {
    const userFile = await UserFiles.create({
      userId: "f8d2b728-c483-4868-aac1-6281f59b584b",
      fileId: "f8d2b728-c483-4868-aac1-6281f59b583a",
      fileSize: 500,
      fileType: "pdf",
      dropDate: "2000-08-10",
      visible: true
    });

    expect(userFile.userId).toBe("f8d2b728-c483-4868-aac1-6281f59b584b");
    expect(userFile.fileId).toBe("f8d2b728-c483-4868-aac1-6281f59b583a");
    expect(userFile.fileSize).toBe(500);
    expect(userFile.fileType).toBe("pdf");
    expect(userFile.dropDate).toBe("2000-08-10");
    expect(userFile.visible).toBe(true);
  });

  it("should update a user file", async () => {
    const user = await UserFiles.findOne({
      where: {
        userId: "f8d2b728-c483-4868-aac1-6281f59b584b",
        fileId: "f8d2b728-c483-4868-aac1-6281f59b583a"
      }
    })

    if (user) {
      user.visible = false;
      await user.save();

      expect(user.visible).toBe(false);
    }
  });

  it("should delete a user file", async () => {
    const userFile = await UserFiles.findOne({
      where: {
        userId: "f8d2b728-c483-4868-aac1-6281f59b584b",
        fileId: "f8d2b728-c483-4868-aac1-6281f59b583a"
      }
    });

    if (userFile) {
      await userFile.destroy();
    }

    const deletedUser = await UserFiles.findOne({
      where: {
        userId: "f8d2b728-c483-4868-aac1-6281f59b584b",
        fileId: "f8d2b728-c483-4868-aac1-6281f59b583a"
      }
    });
    expect(deletedUser).toBeNull();
  });
});
