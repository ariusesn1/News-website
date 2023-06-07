import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import App from "./App.js";
import SignIn from "./components/SignIn";
import Layout from "./Layout";
import PostDetail from "./components/DetailPost";
import AdminApp from "./components/AdminApp";
import Signup from "./components/Signup.js";
import Cart from "./components/Cart.js";
import UserApp from "./components/UserApp";
import PostDetailAd from "./components/DetailPostAd.js";
import Checkout from "./components/CheckOut";
import PostDetailU from "./components/DetailPostUser.js";
import ResetPassword from "./components/ResetPassword.js";
import { Navigate } from "react-router-dom";
const RouteList = () => {
  const isAuth = localStorage.getItem("user");
  let routes = useRoutes([

    { path: "/", 
      element: isAuth ? <UserApp /> : <App/>, },
    { path: "/contact", element: <h1>Liên hệ</h1> },
    { path: "/signIn", element: <SignIn /> },
    { path: "/signUp", element: <Signup /> },
    { path: "/post/:id", element: isAuth ? <PostDetailU /> : <PostDetail/>},
    { path: "/resetPassword", element: <ResetPassword/>},
    {
      path: "/posts/:id",
      element: isAuth ? <PostDetailAd /> : <Navigate to="/signIn" />,
    },
    { path: "/adminApp", element: 
    isAuth ? <AdminApp /> : <Navigate to="/signIn" />,},
    {
      path: "/checkout",
      element: isAuth ? <Checkout /> : <Navigate to="/signIn" />,
    },
    { path: "/cart", element: isAuth ? <Cart /> : <Navigate to="/signIn" /> },
    {
      path: "/userApp",
      element: isAuth ? <UserApp /> : <Navigate to="/signIn" />,
    },
  ]);
  return routes;
};

const RouterView = () => {
  return (
    <Router>
      <Layout>
        <RouteList />
      </Layout>
    </Router>
  );
};
export default RouterView;
