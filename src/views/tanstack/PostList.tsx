import ErrorSelect from "@/components/select/ErrorSelect";
import { useState } from "react";
import { resetCallCount } from "@/api/posts";
import { usePostsQuery } from "@/composable/usePostQuery";
import DotSpinner from "@/components/loading/DotSpinner";

export default function PostList() {
  const [errCount, setErrCount] = useState<number | null>(null);

  const { data, isLoading, isError, isFetching, refetch, error } =
    usePostsQuery(errCount ?? 0);

  if (isLoading || isFetching)
    return (
      <div className="min-h-screen items-center justify-center flex">
        <DotSpinner></DotSpinner>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {!isLoading && !isFetching && (
        <>
          <ErrorSelect
            value={errCount}
            onChange={(resetCallCount(), setErrCount)}
          />
          <button
            className="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 my-4"
            onClick={() => {
              resetCallCount();
              refetch();
            }}
          >
            Reload
          </button>
        </>
      )}
      {isError && <div className="text-lg text-red-600">{error.message}</div>}
      <ul className=" text-left space-y-2 max-w-xl w-full">
        {data?.map((post: any) => (
          <li key={post.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
