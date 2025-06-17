import { useState, useEffect } from "react";
import ErrorSelect from "@/components/select/ErrorSelect";
import { fetchPosts, resetCallCount } from "@/api/posts";

export default function PostList() {
  const [errCount, setErrCount] = useState<number | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await fetchPosts(errCount ?? 0);
      setPosts(result);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to fetch posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [errCount]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <ErrorSelect
        value={errCount}
        onChange={(value: number | null) => {
          resetCallCount();
          setErrCount(value);
        }}
      />

      <button
        className="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 my-4"
        onClick={() => {
          resetCallCount();
          loadPosts();
        }}
      >
        Reload
      </button>

      {loading && <p className="text-lg text-blue-600">Loading...</p>}
      {errorMsg && <div className="text-lg text-red-600">{errorMsg}</div>}

      <ul className="text-left space-y-2 max-w-xl w-full">
        {posts.map((post: any) => (
          <li key={post.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
