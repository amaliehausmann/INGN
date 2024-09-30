export const singleNews = `query singleNewsQuery ($newsslug: String!) {
  newscard(where: {slug: $newsslug}) {
    category
    content
    date
    header
    image {
      fileName
      url
    }
    slug
    writer
  }
}`;