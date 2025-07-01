import express, {
  Request,
  Response,
  NextFunction,
} from "express";
import "dotenv/config";
import teachersRouter from "./api/teachers";
import classesRouter from "./api/classes";
import sequelize from './db';
import cors from "cors";

const app = express()
const port = process.env.PORT || 3000

// Testing route to check if the server is running
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Enable CORS for all routes
// If using production, it should be configured to allow only specific origins
app.use(cors({
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
}));

// Parent Router for API routes
const apiRouter = express.Router();
apiRouter.use(express.json()); // Middleware to parse JSON bodies
apiRouter.use((req: Request, res: Response, next: NextFunction) => {
  // Reject request that do not start with /api
  if(!req.originalUrl.startsWith("/api")) {
    console.error("Invalid API route:", req.path);
    res.status(404).json({ error: "Not Found" });
    return;
  }
  // Reject requests that do not have the correct Content-Type (only application/json)
  if(req.method == "POST" && !req.is("application/json")) {
    console.error("Invalid Content-Type:", req.headers["content-type"]);
    res.status(400).json({ error: "Bad Request" });
    return;
  }
  console.log(`[Backend] ${req.method} request to ${req.originalUrl}`);
  next();
});

// API Routes
apiRouter.use("/classes", classesRouter);
apiRouter.use("/teachers", teachersRouter);
app.use("/api", apiRouter);

(async () => {
  try {
    // Establish a connection to the database
    await sequelize.authenticate();
    console.log("[Backend] Connection to the database has been established successfully.");
    
    // Sync
    await sequelize.sync();
    console.log("[Backend] Database models synced successfully.");

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("[Backend] Error syncing the database:", error);
  }
})();

