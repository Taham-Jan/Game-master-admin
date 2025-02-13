import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/loader";
import TopLoader from "./components/Loader/TopLoader";
import Datahandle from "./utils/Datahandle";

const MainScreen = lazy(() => import("./pages/MainScreen"));
const Categories = lazy(() => import("./pages/Categories"));
const CategoryForm = lazy(() => import("./components/Categories/CategoryForm"));
const CategoryQuestionList = lazy(
  () => import("./components/Categories/Questions/CategoryQuestionList")
);
const CategoryQuestionForm = lazy(
  () => import("./components/Categories/Questions/CategoryQuestionForm")
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
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
