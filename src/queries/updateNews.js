export const updateNews = `mutation updateNews ($slug: String!, $content: String!, $header: String!) {
  updateNewscard(
    data: {content: $content, header: $header}
    where: {slug: $slug}
  ) {
    id
  }
}`