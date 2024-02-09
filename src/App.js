import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import Account from "./pages/Account";
import ChangePassword from "./pages/ChangePassword";
import RoleAdmin from "./components/RoleAdmin";
import AdminPage from "./pages/Admin/Product/AdminPage";
import RoleUser from "./components/RoleUser";
import AddProduct from "./pages/Admin/Product/AddProduct";
import MoviesSeries from "./pages/MoviesSeries";
import Detail from "./pages/Detail";
import Video from "./pages/Video";
import SaveShow from "./pages/SaveShow";
import UpdateProduct from "./pages/Admin/Product/UpdateProduct";
import History from "./pages/History";
import AuthorShow from "./pages/Admin/Author/AuthorShow";
import AddAuthor from "./pages/Admin/Author/AddAuthor";
import UpdateAuthor from "./pages/Admin/Author/UpdateAuthor";
import AddAuthorToProduct from "./pages/Admin/Product/AddAuthorToProduct";
import UserShow from "./pages/Admin/User/UserShow";
import Authors from "./pages/Authors";
import AuthorDetail from "./pages/AuthorDetail";
import AddGenreToProduct from "./pages/Admin/Product/AddGenreToProduct";
import GenreShow from "./pages/Admin/Genre/GenreShow";
import AddGenre from "./pages/Admin/Genre/AddGenre";
import CheckOut from "./pages/CheckOut";
import ViewMoreAuthor from "./pages/ViewMoreAuthor";
import CRMovie from "./pages/CRMovie";
import Category from "./pages/Category";

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="account">
            <Route
              index
              element={
                <RoleUser>
                  <Account />
                </RoleUser>
              }
            />
            <Route
              path="changepassword"
              element={
                <RoleUser>
                  <ChangePassword />
                </RoleUser>
              }
            />
            <Route
              path="saveshow"
              element={
                <RoleUser>
                  <SaveShow />
                </RoleUser>
              }
            />
            <Route
              path="history"
              element={
                <RoleUser>
                  <History />
                </RoleUser>
              }
            />
          </Route>
          <Route path="admin">
            <Route
              index
              element={
                <RoleAdmin>
                  <AdminPage />
                </RoleAdmin>
              }
            />
            <Route path="add" element={<AddProduct />} />
            <Route path="authorshow" element={<AuthorShow />} />
            <Route path="usershow" element={<UserShow />} />
            <Route path="genreshow" element={<GenreShow />} />
            <Route path="addauthor" element={<AddAuthor />} />
            <Route path="addgenre" element={<AddGenre />} />
            <Route path="update/product/:id" element={<UpdateProduct />} />
            <Route path="update/author/:id" element={<UpdateAuthor />} />
            <Route path="add/author/:id" element={<AddAuthorToProduct />} />
            <Route path="add/genre/:id" element={<AddGenreToProduct />} />
          </Route>
          <Route
            path="movies"
            element={
              <RoleUser>
                <MoviesSeries />
              </RoleUser>
            }
          />
          <Route path="authors">
            <Route index element={<Authors />} />
            <Route path="detail/:id" element={<AuthorDetail />} />
          </Route>

          <Route
            path="detail/:id"
            element={
              <RoleUser>
                <Detail />
              </RoleUser>
            }
          />
          <Route
            path="video/:id"
            element={
              <RoleUser>
                <Video />
              </RoleUser>
            }
          />
          <Route path="checkout/:id" element={<CheckOut />} />
          <Route path="crmovie" element={<CRMovie />} />
          <Route path="Viewmoreauthor/:id" element={<ViewMoreAuthor />} />
          <Route path="category/:id" element={<Category />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
