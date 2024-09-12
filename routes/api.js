const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const userController = require("../controllers/userController");
const projectController = require("../controllers/projectController");

//user routes
router.post("/users/addUser/", userController.addUser);
// router.get(
//   "/users/getAllUsers/",
//   authenticateToken,
//   userController.getAllUsers
// );
router.post("/user/login/", userController.loginUser);

//project routes
router.post("/projects/addProject",authenticateToken, projectController.addProject);
router.get("/projects/getAllProjects",authenticateToken, projectController.getAllProjects);
router.put("/projectStatusChange/", projectController.projectStatusChange);
router.get("/projects/getCount",authenticateToken, projectController.getCount);
router.get("/projects/getChartData", projectController.getChartData);


module.exports = router;
