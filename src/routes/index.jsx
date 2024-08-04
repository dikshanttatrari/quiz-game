import { createHashRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import Questions from "../pages/Questions";
import Score from "../pages/Score";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "questions",
        element: <Questions />,
      },
      {
        path: "score",
        element: <Score />,
      },
    ],
  },
]);

export default router;
