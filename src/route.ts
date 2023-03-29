export const routes = function (app: any): void {
  app.use("/api/users", require("./api/users"));
  app.use("/api/workout", require("./api/workout"));
  app.use("/api/workout/redo", require("./api/redo-workouts"));
};
