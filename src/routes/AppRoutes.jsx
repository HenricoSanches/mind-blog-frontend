import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import ArticleDetail from "../pages/ArticleDetail";
import CreateArticle from "../pages/CreateArticle";
import EditArticle from "../pages/EditArticle";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/articles" element={<Articles />} />

      <Route
        path="/articles/new"
        element={
          <PrivateRoute>
            <CreateArticle />
          </PrivateRoute>
        }
      />

      <Route
        path="/articles/:id/edit"
        element={
          <PrivateRoute>
            <EditArticle />
          </PrivateRoute>
        }
      />

      <Route
        path="/articles/:id"
        element={<ArticleDetail key={window.location.pathname} />}
      />

      {/* 🔒 SETTINGS */}
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
