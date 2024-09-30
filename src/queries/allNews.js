export const allNews = `query allNewsQuery {
  newscards (first: 100) {
    category
    content
    date
    header
    image {
      fileName
      url
    }
    writer
    slug
  }
}`;