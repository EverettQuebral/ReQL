import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, Subscription } from 'react-apollo';
import { gql } from 'apollo-boost'


class Stocks extends Component {
  render (){
    return (
      <Fragment>
        <Subscription subscription={STOCKS_SUBSCRIPTION}>
          {({ data, loading, error }) => {
            if (error) return <div>Error : {error} </div>
            if (data) return <div>Data {data.feedAdded.author} </div>
            if (loading) return <div>Loading</div>
          }}
        </Subscription>
      </Fragment>
    )
  }
}


const STOCKS_SUBSCRIPTION = gql `
subscription {
  feedAdded {
    comment
    author
  }
} 
`
const StocksWithSubscription = graphql(STOCKS_SUBSCRIPTION, {
  name: 'feedAdded',
  options: {
    errorPolicy: 'ignore'
  }
})(Stocks)

export default withRouter(StocksWithSubscription)


