export const deleteNews = `mutation MyMutation ($deleteslug: String! ) {
  deleteNewscard(where: {slug: $deleteslug}) {
    slug
  }
}`