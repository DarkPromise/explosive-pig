
import { Router } from "express";
import Teacher from 'src/models/teacher';
import { TeacherSchema } from '~/shared/types/types';

const router = Router();

// GET /api/teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      attributes: [
        "id",
        "name",
        "subject",
        "email",
        "contactNumber"
      ],
    });
    res.status(200).json({ data: teachers});
  }
  catch(error) {
    console.error("[TeachersAPI] Error fetching teachers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

// POST /api/teachers
router.post("/", async (req, res) => {
  try {
    const { name, subject, email, contactNumber } = req.body;

    // Validate the request body against the TeacherSchema
    const validate = TeacherSchema.safeParse({
      name,
      subject,
      email,
      contactNumber
    });
    if(!validate.success) {
      //console.error("[TeachersAPI] Validation error:", validate.error);
      res.status(400).json("Bad Request");
      return;
    }

    // Check if a teacher with the same email already exists
    const existingTeacher = await Teacher.findOne({ where: { email } });
    if (existingTeacher) {
      res.status(409).json({ error: "Teacher with this email already exists." });
      return;
    }

    // Create a new teacher in the database
    await Teacher.create({
      name,
      subject,
      email,
      contactNumber
    })

    // Respond with a success message
    res.status(201).json({ message: "Teacher created successfully." });
  }
  catch(error) {
    console.error("[TeachersAPI] Error creating teacher:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

export default router;

/** The specs have some routes that not required (which is normally used for basic CRUD operations)
 *  1. PUT - Should be used to update a teacher
 *  2. DELETE - Should be used to delete a teacher
 * 
 *  This will be in the suggestions (README.md)
 */