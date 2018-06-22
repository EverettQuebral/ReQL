
const config = {
  type: "Page",
  props: {
    className: "page",
    id: "page-1",
    src: ""
  },
  attributes: {
    text: "Welcome Page"
  }
}
export default {
  Query: {
    getConfig: (root, args, context) => {
      return config
    }
  }
}