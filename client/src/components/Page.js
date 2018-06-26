import React from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

class Page extends React.Component {
    render(){
        return (
            <Query query={FIND_USER}>
                {({loading, error, data})=>{
                    if (error) return <div> Error: </div>
                    if (loading) return <div> Loading: </div>

                    return (
                        <div>
                            { console.log(data) }
                            <div> Name { data.findUser.first_name }</div>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

//export default Page

const FIND_USER = gql `
    query {
        findUser(id:"xxxx"){
            first_name
        }
    }
`

export default graphql(FIND_USER, {
    name: 'findUser',
    options: {
        errorPolicy: 'ignore'
    }
})(Page)



