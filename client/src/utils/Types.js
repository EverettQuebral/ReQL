import React from 'react'
import Header from '../components/Header'
import Page from '../components/Page'


const Types = {
  Header: Header,
  Page: Page
}

function rehydrateJSON(obj, key) {
  var Type = Types.obj.type;
  var children = obj.children ? obj.children.map(rehydrateJSON) : obj.attributes.text
  return <Type key={key} {...obj.props}>{children}</Type>
}

export {
  Types,
  rehydrateJSON
}

