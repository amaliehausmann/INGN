import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import request from "graphql-request";
import { singleNews } from "../queries/singleNews";
import { updateNews } from "../queries/updateNews";
import { publishNews } from "../queries/publishNews";
import { UpdateForm } from "../components/updateForm/UpdateForm";

export function UpdateNews({ user }) {
  const { slug } = useParams();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["singleNews"],
    queryFn: async () =>
      request(import.meta.env.VITE_PUBLIC_ENDPOINT, singleNews, { newsslug: slug }),
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => request({
        url: import.meta.env.VITE_PUBLIC_ENDPOINT,
        document: updateNews,
        variables: {
            ...data,
            slug: slug,
        },

        requestHeaders: { Authorization: "Bearer " + user.token},
    }),
    onError:(err) => {
        console.error(err);
    },
    onSuccess: () => {
        console.log("mutation succcessful");
        queryClient.invalidateQueries();
    },
    onSettled: async () => {
        request({
            url: import.meta.env.VITE_PUBLIC_ENDPOINT,
            document: publishNews,
            variables: {
                slug: slug,
            },

            requestHeaders: { Authorization: "Bearer " + user.token},
        });
    },
  });

  if(error){
    return <p>Error in fetch: {error.message}</p>
  }

  if(isLoading){
    return <p>Loading content....</p>
  }

  function updateNewsonSubmit(event){
    event.preventDefault(event);
    const header = event.target.header.value;
    const content = event.target.content.value;

    if(header && content){
        const data = {header: header, content: content};
        updateMutation.mutate(data);
    }
  }

  return(
    <UpdateForm callback={updateNewsonSubmit} data={data?.newscard}></UpdateForm>
  );
}
