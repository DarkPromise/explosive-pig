import { Router } from "express";
import sequelize from '../../db';
import Class from '../../models/class';
import Teacher from '../../models/teacher';
import { ClassSchema } from '../../../../shared/types/types';

const router = Router();

// GET /api/classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.findAll({
      attributes: [
        "id",
        "level",
        "name",
        [
          // Okay but seriously, why is this so complicated?
          sequelize.literal(`json_build_object('name', "formTeacher"->>'name')`),
          "formTeacher"
        ]
      ],
    });
    res.status(200).json({ data: classes });
  }
  catch(error) {
    console.error("[ClassesAPI] Error fetching classes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

// POST /api/classes
router.post("/", async (req, res) => {
  try {
    const { level, name, teacherEmail } = req.body;

    // Validate the request body against the ClassSchema
    const validate = ClassSchema.safeParse({
      level,
      name,
      teacherEmail
    });
    if(!validate.success) {
      //console.error("[ClassesAPI] Validation error:", validate.error);
      res.status(400).json({ error: "Bad Request" });
      return;
    }

    // Find the teacher by email
    const teacher = await Teacher.findOne({ where: { email: teacherEmail } });
    if (!teacher) {
      // 400 here, because the client should've already only listed teachers that exist
      res.status(400).json({ error: "Bad Request" });
      return;
    }

    // Check if a class already exists with the same formTeacher (teacherEmail)
    const existingClass = await Class.findOne({ where: { formTeacher: { email: teacherEmail } } });
    if (existingClass) {
      res.status(409).json({ error: "Class with this form teacher already exists." });
      return;
    }

    // Create a new class in the database
    await Class.create({
      level,
      name,
      formTeacher: teacher
    });

    // Respond with a success message
    res.status(201).json({ message: "Class created successfully." });
  }
  catch(error) {
    console.error("[ClassesAPI] Error creating class:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

export default router;

/** The specs have some routes that not required (which is normally used for basic CRUD operations)
 *  1. PUT - Should be used to update a class
 *  2. DELETE - Should be used to delete a class
 * 
 *  This will be in the suggestions (README.md)
 */