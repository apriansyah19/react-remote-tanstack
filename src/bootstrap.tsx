// src/bootstrap.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Title from "@/components/Title";

// Import all pages
import PostList from "@/views/tanstack/PostList";
import PostListWithoutTanstack from "@/views/without-tanstack/PostsList";
import InfiniteScrollPost from "./views/tanstack/InfiniteScroll";

// Routing manual
const routes: Record<string, React.FC> = {
  post: PostList,
  "infinite-scroll-post": InfiniteScrollPost,
  "post-without-tanstack": PostListWithoutTanstack,
};

const queryClient = new QueryClient();

export default function mount(container: HTMLElement, route: string) {
  const Component = routes[route] || (() => <div>Page not found</div>);

  const root = ReactDOM.createRoot(container);
  root.render(
    <QueryClientProvider client={queryClient}>
      <Title></Title>
      <Component />
    </QueryClientProvider>
  );
}
