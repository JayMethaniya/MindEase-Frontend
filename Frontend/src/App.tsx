import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MoodTracking from "./Page/MoodTracking/index";
import Journaling from "./Page/Social/Journaling/index";
import Home from "./Page/Home/index";
import Login from "./ui/Login/index";
import Signup from "./ui/Signup/index";
import DefaultLayout from "./Layout/Default";
import Articles from "./Page/Resources/Articles/Articles";
import Initiatives from "./Page/Resources/initiatives/Initiatives";
import Group from './Page/Social/Groups/SupportGroupsMain'
import Quiz from "./Page/Social/Quiz";
import AnxietyQuiz from "./Page/Social/Quiz/AnxietyQuiz";
import DepressionQuiz from "./Page/Social/Quiz/DepressionQuiz";
import OcdQuiz from "./Page/Social/Quiz/OcdQuiz";
import ADHDQuiz from "./Page/Social/Quiz/ADHDQuiz";
import Relax from "./Page/Social/Relax/index";

const router = createBrowserRouter([
  { path: "/home", element: <DefaultLayout><Home /></DefaultLayout> },
  { path: "/mood-tracking", element: <DefaultLayout><MoodTracking /></DefaultLayout> },
  { path: "/social/Journaling", element: <DefaultLayout><Journaling /></DefaultLayout> },
  { path: "/social/group", element: <DefaultLayout><Group /></DefaultLayout> },
  { path: "/social/quiz", element: <DefaultLayout><Quiz /></DefaultLayout> },
  { path: "/anxiety-quiz", element: <DefaultLayout><AnxietyQuiz /></DefaultLayout> },
  { path: "/depression-quiz", element: <DefaultLayout>< DepressionQuiz/></DefaultLayout> },
  { path: "/ocd-quiz", element: <DefaultLayout><OcdQuiz /></DefaultLayout> },
  { path: "/adhd-quiz", element: <DefaultLayout><ADHDQuiz /></DefaultLayout> },
  { path: "/social/relax", element: <DefaultLayout><Relax /></DefaultLayout> },
  { path: "/resources/articles", element: <DefaultLayout><Articles/></DefaultLayout> },
  { path: "/resources/initiatives", element: <DefaultLayout><Initiatives/> </DefaultLayout> },
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
