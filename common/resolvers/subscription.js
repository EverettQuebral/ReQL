const FEED_ADDED = 'FEED_ADDED'
import { pubsub } from '../../server/subscription'

const FEED = [];

export default {
  Subscription: {
    feedAdded: {
      subscribe: () => pubsub.asyncIterator([FEED_ADDED])
    }
  },
  Query: {
    feeds: (root, args, context, info) => {
      return FEED
    }
  },
  Mutation: {
    addFeed: (root, args, context, info) => {
      pubsub.publish(FEED_ADDED, {feedAdded: args})
      FEED.push(args)
      console.log(FEED)
      return args
    }
  }
}