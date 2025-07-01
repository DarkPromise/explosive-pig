import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  // Home Page
  index("routes/home.tsx"),
  // Class Routes
  route("classes","routes/classes/classes.tsx"),
  route("classes/add","routes/classes/add.tsx"),
  // Teacher Route
  route("teachers","routes/teachers/teachers.tsx"),
  route("teachers/add","routes/teachers/add.tsx"),
] satisfies RouteConfig;