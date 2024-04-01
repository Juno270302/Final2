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
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ChooseCategory from "./pages/ChooseCategory";

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
            <Route
              path="add"
              element={
                <RoleAdmin>
                  <AddProduct />
                </RoleAdmin>
              }
            />
            <Route
              path="dashboard"
              element={
                <RoleAdmin>
                  <Dashboard />
                </RoleAdmin>
              }
            />
            <Route
              path="authorshow"
              element={
                <RoleAdmin>
                  <AuthorShow />
                </RoleAdmin>
              }
            />
            <Route
              path="usershow"
              element={
                <RoleAdmin>
                  <UserShow />
                </RoleAdmin>
              }
            />
            <Route
              path="genreshow"
              element={
                <RoleAdmin>
                  <GenreShow />
                </RoleAdmin>
              }
            />
            <Route
              path="addauthor"
              element={
                <RoleAdmin>
                  <AddAuthor />
                </RoleAdmin>
              }
            />
            <Route
              path="addgenre"
              element={
                <RoleAdmin>
                  <AddGenre />
                </RoleAdmin>
              }
            />
            <Route
              path="update/product/:id"
              element={
                <RoleAdmin>
                  <UpdateProduct />
                </RoleAdmin>
              }
            />
            <Route
              path="update/author/:id"
              element={
                <RoleAdmin>
                  <UpdateAuthor />
                </RoleAdmin>
              }
            />
            <Route
              path="add/author/:id"
              element={
                <RoleAdmin>
                  <AddAuthorToProduct />
                </RoleAdmin>
              }
            />
            <Route
              path="add/genre/:id"
              element={
                <RoleAdmin>
                  <AddGenreToProduct />
                </RoleAdmin>
              }
            />
          </Route>
          <Route
            path="movies"
            element={
              <RoleUser>
                <MoviesSeries />
              </RoleUser>
            }
          />
          <Route
            path="chooseCategory"
            element={
              <RoleUser>
                <ChooseCategory />
              </RoleUser>
            }
          />
          <Route path="authors">
            <Route
              index
              element={
                <RoleUser>
                  <Authors />
                </RoleUser>
              }
            />
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
          <Route
            path="checkout/:id"
            element={
              <RoleUser>
                <CheckOut />
              </RoleUser>
            }
          />
          <Route
            path="crmovie"
            element={
              <RoleUser>
                <CRMovie />
              </RoleUser>
            }
          />
          <Route
            path="Viewmoreauthor/:id"
            element={
              <RoleUser>
                <ViewMoreAuthor />
              </RoleUser>
            }
          />
          <Route
            path="category/:id"
            element={
              <RoleUser>
                <Category />
              </RoleUser>
            }
          />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
