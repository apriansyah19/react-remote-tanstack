import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface Page {
  data: Post[];
  nextPage: number;
  isLast: boolean;
}
export const useInfinitePosts = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: ["postsInfiniteScroll"],
    queryFn: async ({ pageParam = 1 }) => {
      const LIMIT = 10;
      const response = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _limit: LIMIT,
            _page: pageParam,
          },
        }
      );

      return {
        data: response.data,
        nextPage: pageParam + 1,
        isLast: response.data.length < LIMIT,
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.nextPage;
    },
    initialPageParam: 1,
  });
};
