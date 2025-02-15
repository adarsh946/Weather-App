import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/Dashboard";
import CityPage from "./pages/CityPage";
import Layout from "./components/layout";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/city/:cityname" element={<CityPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
