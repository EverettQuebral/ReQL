import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, Subscription } from 'react-apollo';
import { gql } from 'apollo-boost'


class Stocks extends Component {
  render (){
    return (
      <Subscription subscription={STOCKS_SUBSCRIPTION}>
        {({ data, loading }) => (
          <div>Data</div>
        )}
      </Subscription>
    )
  }
}


const STOCKS_SUBSCRIPTION = gql `
subscription {
  feedSubscription
} 
`
const StocksWithSubscription = graphql(STOCKS_SUBSCRIPTION, {
  name: 'stocksWithSubscription',
  options: {
    errorPolicy: 'ignore'
  }
})(Stocks)

export default withRouter(StocksWithSubscription)


