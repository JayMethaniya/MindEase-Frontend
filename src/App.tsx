import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Challenge from "./components/7dayChallenge/index";
import DefaultLayout from "./Layout/Default";
import DoctorSignup from "./Page/Auth/DoctorSignup/index";
import Login from "./Page/Auth/Login/index";
import Signup from "./Page/Auth/Signup/index";
import ContactUs from "./Page/ContactUs/index";
import Home from "./Page/Home/index";
import MoodTracking from "./Page/Home/pages/MoodTracking/index";
import Meditation from "./Page/Home/components/Meditation";
import Articles from "./Page/Home/pages/Resources/Articles/Articles";
import Initiatives from "./Page/Home/pages/Resources/initiatives/Initiatives";
import VideoResources from "./Page/Home/pages/Resources/VideoResources/index";
import AddBlog from "./Page/Home/pages/Social/AddBlog/index";
import BlogDetail from "./Page/Home/pages/Social/Blogs/BlogDetails";
import Blog from "./Page/Home/pages/Social/Blogs/index";
import Quiz from "./Page/Home/pages/Social/Quiz";
import QuizComponent from "./Page/Home/pages/Social/Quiz/QuizComponent";
import Relax from "./Page/Home/pages/Social/Relax/index";
import DefaultProfile from "./Page/Profile/Default";
import Messages from "./Page/Profile/Messages";
import Profile from "./Page/Profile/profile";
import Setting from "./Page/Profile/ProfileSetting";
import ProtectedWrapper from "./routes/ProtectedWrapper/index";
import DoctorsList from "./Page/Home/pages/DoctorsList";
import Resource from "./Page/Profile/Components/Resource";
import JournalPage from "./Page/Home/components/JournalPage";
import UserProfileModal from "./Page/Profile/Components/userprofile";

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
    path: "/meditation",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <Meditation />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/journal-entry",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <JournalPage />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },
  {
    path: "/page/AddBlog",
    element: (
      <ProtectedWrapper>
        <DefaultLayout>
          <AddBlog />
        </DefaultLayout>
      </ProtectedWrapper>
    ),
  },

  {
    path: "/page/quiz",
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
    path: "/page/relax",
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
        <Messages />
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
    path: "/resource",
    element: (
      <ProtectedWrapper>
        <DefaultProfile>
          <Resource />
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
    path: "/doctor/profile",
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
  return (
    <GoogleOAuthProvider
      clientId="
333693592575-dur4giru92e0i5n1afo93b1nra1hfnbk.apps.googleusercontent.com"
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
