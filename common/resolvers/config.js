
const components = {
  "type": "Container",
  "componentId": "container-1",
  "children" : [
    {
      "type": "Jumbotron",
      "componentId": "Jumbotron-1",
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
      "componentId": "container-2",
      "children":
      [{
          "type": "Alert",
          "componentId": "alert-1",
          "props": {
            "color": "primary"
          },
          "content": "Text in Blue Here"
        },
        {
          "type": "Alert",
          "componentId": "alert-2",
          "props": {
            "color": "secondary"
          },
          "content": "Text in Gray Here"
        },
        {
          "type": "Alert",
          "componentId": "alert-3",
          "props": {
            "color": "success"
          },
          "content": "Text in Green Here"
        },
        {
          "type": "Button",
          "componentId": "button-1",
          "content": "Button Here"
        }]
    },
    {
      "type": "Primitive",
      "content": `<p>An example of a form without any styling for now.  The form is highly configurable as the config are all coming from the server</p>`
    },
    {
      "type": "Form",
      "componentId": "form-1",
      "children": [
        {
          "type": "FormGroup",
          "componentId": "formgroup-1",
          "children":[{
            "type": "Primitive",
            "content": `<label for='exampleEmail'>Email</label>`
          },{
            "type": "Primitive",
            "content": `<input type='email' name='email' id='exampleEmail' placeholder='email here'/>`
          }]
        },
        {
          "type": "FormGroup",
          "componetId": "formgroup-2",
          "children":[{
            "type": "Primitive",
            "content": `<label for='examplePassword'>Password</label>`
          },{
            "type": "Primitive",
            "content": `<input type='password' name='password' id='examplePassword' placeholder='password here'/>`
          }]
        }
      ]
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