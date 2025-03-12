import "./styles/MainScreen.css";
import "./styles/Categories.css";
import "./styles/CategoryQuestion.css";
import "./styles/ErrorList.css";
import "./styles/Header.css";
import "./styles/CategoryMeme.css";
import "./styles/RoundManager.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import TopLoader from "./components/Loader/TopLoader";
import Datahandle from "./utils/Datahandle";
import Loader from "./components/Loader/loader";

const MainScreen = lazy(() => import("./pages/MainScreen"));
const Categories = lazy(() => import("./pages/Categories"));
const RoundManager = lazy(() => import("./pages/RoundManager"));
const CategoryForm = lazy(() => import("./components/Categories/CategoryForm"));
const CategoryQuestionList = lazy(
  () => import("./components/Categories/Questions/CategoryQuestionList")
);
const CategoryQuestionForm = lazy(
  () => import("./components/Categories/Questions/CategoryQuestionForm")
);

const CategoryMemeList = lazy(
  () => import("./components/Categories/Meme/CategoryMemeList")
);
const CategoryMemeForm = lazy(
  () => import("./components/Categories/Meme/CategoryMemeForm")
);

function App() {
  return (
    <Router>
      <ToastContainer />
      <MainLayout>
        <TopLoader ref={(ref) => Datahandle.setTopLoaderRef(ref)} />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories-form" element={<CategoryForm />} />
            <Route
              path="/categories-form-edit/:categoryId"
              element={<CategoryForm />}
            />
            <Route path="/categories-questions">
              <Route index element={<CategoryQuestionList />} />
              <Route path=":id" element={<CategoryQuestionList />} />
              <Route
                path=":categoryId/form"
                element={<CategoryQuestionForm />}
              />
              <Route
                path=":categoryId/form/:id"
                element={<CategoryQuestionForm />}
              />
            </Route>

            <Route path="/categories-meme">
              <Route index element={<CategoryMemeList />} />
              <Route path=":id" element={<CategoryMemeList />} />
              <Route path="form" element={<CategoryMemeForm />} />
            </Route>

            <Route path="/round-manager" element={<RoundManager />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
