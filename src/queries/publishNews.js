export const publishNews = `mutation publishNews ($slug: String!) {
  publishNewscard(where: {slug: $slug}) {
    id
  }
}`