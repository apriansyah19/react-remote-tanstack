import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/api/posts";
import { persister } from "@/composable/query/persister";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function usePostsQuery(failUntilCount: number) {
  return useQuery<Post[], Error>({
    queryKey: ["posts", failUntilCount],
    queryFn: () => fetchPosts(failUntilCount),
    retry: 5,
    retryDelay: 1000,
    persister: persister.persisterFn,
    staleTime: 1000 * 10, // 10 detik
    gcTime: 1000 * 10, // 10 detik,
    refetchInterval: 10000, // Uncomment jika ingin polling tiap 10 detik
    refetchIntervalInBackground: true,
  });
}
