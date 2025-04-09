import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Challenge from './components/7dayChallenge/index';
import DefaultLayout from './Layout/Default';
import DoctorSignup from './Page/Auth/DoctorSignup/index';
import Login from './Page/Auth/Login/index';
import Signup from './Page/Auth/Signup/index';
import ContactUs from './Page/ContactUs/index';
import Home from './Page/Home/index';
import MoodTracking from './Page/Home/pages/MoodTracking/index';
import Articles from './Page/Home/pages/Resources/Articles/Articles';
import Initiatives from './Page/Home/pages/Resources/initiatives/Initiatives';
import VideoResources from './Page/Home/pages/Resources/VideoResources/index';
import AddBlog from './Page/Home/pages/Social/AddBlog/index';
import BlogDetail from './Page/Home/pages/Social/Blogs/BlogDetails';
import Blog from './Page/Home/pages/Social/Blogs/index';
import Group from './Page/Home/pages/Social/Groups/SupportGroupsMain';
import Quiz from './Page/Home/pages/Social/Quiz';
import QuizComponent from './Page/Home/pages/Social/Quiz/QuizComponent';
import Relax from './Page/Home/pages/Social/Relax/index';
import DefaultProfile from './Page/Profile/Default';
import Messages from './Page/Profile/Messages';
import Profile from './Page/Profile/profile';
import Setting from './Page/Profile/ProfileSetting';
import ProtectedWrapper from './routes/ProtectedWrapper/index';
import DoctorsList from "./Page/DoctorsList";


const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/doctor-signup", element: <DoctorSignup /> },
  {
    path: "/",
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    ),
  },
  {
    path: "/resources/articles",
    element: (
      <DefaultLayout>
        <Articles />
      </DefaultLayout>
    ),
  },
  {
    path: "/resources/initiatives",
    element: (
      <DefaultLayout>
        <Initiatives />
      </DefaultLayout>
    ),
  },
  {
    path: "/resources/video",
    element: (
      <DefaultLayout>
        <VideoResources />
      </DefaultLayout>
    ),
  },
  {
    path: "/page/contactUs",
    element: (
      <DefaultLayout>
        <ContactUs />
      </DefaultLayout>
    ),
  },
];

const protectedRoutes = [
  {
    path: "/mood-tracking",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <MoodTracking />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/social/AddBlog",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <AddBlog />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/social/group",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <Group />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/social/quiz",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <Quiz />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/resources/blog",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <Blog />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/quiz/:quizId",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <QuizComponent />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/social/relax",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <Relax />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/messages",
    element: (
      <ProtectedWrapper>
        <DefaultProfile>
          <Messages />
        </DefaultProfile>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/setting",
    element: (
      <ProtectedWrapper>
        <DefaultProfile>
          <Setting />
        </DefaultProfile>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/blog/:id",
    element: (
      <ProtectedWrapper>
        <BlogDetail />
      </ProtectedWrapper>
    ),
  },
  {
    path: "/challenge",
    element: (
      <ProtectedWrapper>
        <Challenge />
      </ProtectedWrapper>
    ),
  },
  {
    path: "/doctor/home",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedWrapper>
        <DefaultProfile>
          <Profile />
        </DefaultProfile>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/doctors",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <DoctorsList />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
 
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
