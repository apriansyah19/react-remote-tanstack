import { Routes, Route, Navigate } from "react-router-dom";
import PostList from "./views/tanstack/PostList";
import Title from "@/components/Title";

export default function App() {
  return (
    <div className="p-6 space-y-4">
      <Title></Title>
      <Routes>
        <Route path="/" element={<Navigate to="/postsList" replace />} />
        <Route path="/postsList" element={<PostList />} />
      </Routes>
    </div>
  );
}
