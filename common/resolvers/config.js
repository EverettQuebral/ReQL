
const components = {
  "type": "Container",
  "children" : [
    {
      "type": "Jumbotron",
      "children": [
        {
          "type": "Primitive",
          "content": `<h1 className='display-3'>Reactive UI</h1>`
        },
        {
          "type": "Primitive",
          "content": `<hr />`
        },
        {
          "type": "Primitive",
          "content": `<p>An Example of Reactive UI where everything you see here are all part of a configuration that are dynamically created as React Components</p>`
        }]
    },
    {
      "type": "Container",
      "children":
      [{
          "type": "Alert",
          "props": {
            "color": "primary"
          },
          "content": "Text in Blue Here"
        },
        {
          "type": "Alert",
          "props": {
            "color": "secondary"
          },
          "content": "Text in Gray Here"
        },
        {
          "type": "Alert",
          "props": {
            "color": "success"
          },
          "content": "Text in Green Here"
        },
        {
          "type": "Button",
          "content": "All you are seeing here are dynamically generated from a JSON Config file"
        }]
    }
  ]
}
export default {
  Query: {
    getConfig: (root, args, context) => {
      return components
    }
  }
}