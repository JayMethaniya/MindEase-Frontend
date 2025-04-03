import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MoodTracking from "./Page/Home/pages/MoodTracking/index";
import Journaling from "./Page/Home/pages/Social/Journaling/index";
import Home from "./Page/Home/index";
import Profile from './Page/Profile/profile'
import DefaultLayout from "./Layout/Default";
import DefaultProfile from './Page/Profile/Default'
import Articles from "./Page/Home/pages/Resources/Articles/Articles";
import Initiatives from "./Page/Home/pages/Resources/initiatives/Initiatives";
import Group from './Page/Home/pages/Social/Groups/SupportGroupsMain'
import Quiz from "./Page/Home/pages/Social/Quiz";
import Relax from "./Page/Home/pages/Social/Relax/index";
import Blog from './Page/Home/pages/Social/Blogs/index'
import QuizComponent from "./Page/Home/pages/Social/Quiz/QuizComponent";
import VideoResources from "./Page/Home/pages/Resources/VideoResources/index"
import Login from "./Page/Auth/Login/index";
import Signup from "./Page/Auth/Signup/index";
import DoctorSignup from "./Page/Auth/DoctorSignup/index"
import DoctorHome from './Page/Home/index'
import DoctorProtectedWrapper from './routes/ProtectedWrapper/index'
import Setting from './Page/Profile/ProfileSetting'


const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/doctor-signup", element: <DoctorSignup/> },
  { path: "/", element: <DefaultLayout><Home /></DefaultLayout> },
  { path: "/mood-tracking", element: <DefaultLayout><MoodTracking /></DefaultLayout> },
  { path: "/social/Journaling", element: <DefaultLayout><Journaling /></DefaultLayout> },
  { path: "/social/group", element: <DefaultLayout><Group /></DefaultLayout> },
  { path: "/social/quiz", element: <DefaultLayout><Quiz /></DefaultLayout> },
  { path: "/social/blog", element: <DefaultLayout><Blog /></DefaultLayout> },
   {path:"/quiz/:quizId", element:<DefaultLayout><QuizComponent /></DefaultLayout>},
  { path: "/social/relax", element: <DefaultLayout><Relax /></DefaultLayout> },
  { path: "/resources/articles", element: <DefaultLayout><Articles/></DefaultLayout> },
  { path: "/resources/initiatives", element: <DefaultLayout><Initiatives/> </DefaultLayout> },
  { path: "/resources/video", element: <DefaultLayout><VideoResources/> </DefaultLayout> },
  { path: "/profile", element: <DefaultProfile><Profile/></DefaultProfile>  },
  { path: "/setting", element: <DefaultProfile><Setting/></DefaultProfile>  },
 
]

const protectedRoutes = [
  { 
    path: "/doctor/home", 
    element: <DoctorProtectedWrapper><DefaultLayout><DoctorHome /></DefaultLayout></DoctorProtectedWrapper> 
  },
]

const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
]);


const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
