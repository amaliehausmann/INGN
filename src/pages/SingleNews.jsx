import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { useParams, useNavigate, Link } from "react-router-dom";
import { singleNews } from "../queries/singleNews";
import { NewsCard } from "../components/NewsCard/NewsCard";
import { deleteNews } from "../queries/deleteNews";
import { toast } from "react-toastify";

export const SingleNews = ({ user }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { newsslug } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["singleNews", newsslug],
    queryFn: async () =>
      request(import.meta.env.VITE_PUBLIC_ENDPOINT, singleNews, {
        newsslug: newsslug,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (slug) =>
      request(
        import.meta.env.VITE_PUBLIC_ENDPOINT,
        deleteNews,
        {
          deleteslug: slug,
        },
        {
          Authorization: "Bearer " + user.token,
        }
      ),
    onSuccess: () => {
      console.log("Mutation Delete Successful");
      toast("News Deleted successfully");
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: (error) => {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news");
    },
  });

  if (isLoading) {
    return <p>Content is loading...</p>;
  }

  if (error) {
    return <p>Error loading content: {error.message}</p>;
  }

  return (
    <div>
      {user && (
        <div>
          <button onClick={() => deleteMutation.mutate(data.newscard.slug)}>
            Delete me
          </button>
          <Link to={`/updatenews/${data.newscard.slug}`}>Update</Link>
        </div>
      )}
      <NewsCard
        title={data.newscard.header}
        content={data.newscard.content}
        date={data.newscard.date}
        writer={data.newscard.writer}
        imageSRC={data.newscard.image[0]?.url}
        imageStyling="topPicture"
      ></NewsCard>
    </div>
  );
};
