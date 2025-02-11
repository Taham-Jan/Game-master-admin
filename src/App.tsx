import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainScreen from "./pages/MainScreen";
import Categories from "./pages/Categories";
import CategoryForm from "./components/Categories/CategoryForm";
import CategoryQuestionList from "./components/Categories/Questions/CategoryQuestionList";
import CategoryQuestionForm from "./components/Categories/Questions/CategoryQuestionForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <MainLayout>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories-form" element={<CategoryForm />} />
          <Route
            path="/categories-questions/:id"
            element={<CategoryQuestionList />}
          />
          <Route
            path="/categories-questions-form"
            element={<CategoryQuestionForm />}
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
