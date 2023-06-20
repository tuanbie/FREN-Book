import config from "../config";
import HomePage from "../pages/book/bookPage";

const publicRoutes = [
  { path:config.routes.home, component: HomePage },
];

export { publicRoutes };
