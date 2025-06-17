import React, { useEffect, useRef } from "react";
import { useInfinitePosts } from "@/composable/useInfiniteQuertyPosts";

export default function InfinitePostsList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();

  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const el = loader.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.data.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "12px",
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </React.Fragment>
      ))}

      <div ref={loader} style={{ height: 50 }} />
      {isFetchingNextPage && (
        <p style={{ textAlign: "center" }}>Loading more...</p>
      )}
    </div>
  );
}
