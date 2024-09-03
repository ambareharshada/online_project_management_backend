const ProjectModel = require("../models/projectModel");

const addProject = async (req, res) => {
  try {
    const details = req.body;
    // console.log(details);

    const projectDetails = {
      projectName: details.projectName,
      reason: details.reason,
      type: details.type,
      division: details.division,
      category: details.category,
      priority: details.priority,
      department: details.department,
      startDate: details.startDate,
      endDate: details.endDate,
      location: details.location,
      status: details.status,
    };

    const result = new ProjectModel(projectDetails);
    const finalData = await result.save();
    res.status(200).send({ Success: true, message: "Project Created Successfully", finalData: finalData });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find({}, { __v: 0 });
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const projectStatusChange = async (req, res) => {
  try {
    const { _id, status } = req.body;

    const changeStatus = await ProjectModel.updateOne(
      { _id: _id },
      { status: status }
    );

    res
      .status(200)
      .send({ Message: "Status Changed....", details: changeStatus });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error for Appointment Status Change" });
  }
};

const getCount = async(req,res) =>{
    try {
      const results = await ProjectModel.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            totalProjects: { $sum: "$count" },
            closedProjects: { $sum: { $cond: [{ $eq: ["$_id", "Close"] }, "$count", 0] } },
            runningProjects: { $sum: { $cond: [{ $eq: ["$_id", "Running"] }, "$count", 0] } },
            cancelledProjects: { $sum: { $cond: [{ $eq: ["$_id", "Cancel"] }, "$count", 0] } },
          },
        },
        {
          $project: {
            _id: 0,
            totalProjects: 1,
            closedProjects: 1,
            runningProjects: 1,
            cancelledProjects: 1,
          },
        },
      ]);
  
      const counters = results[0] || {
        totalProjects: 0,
        closedProjects: 0,
        runningProjects: 0,
        cancelledProjects: 0,
      };
  
      res.json(counters);
      } catch (error) {
        console.error('Error fetching project counters:', error);
        res.status(500).json({ error: 'An error occurred while fetching project counters' });
      }
}
module.exports = {
  addProject,
  getAllProjects,
  projectStatusChange,
  getCount
};
