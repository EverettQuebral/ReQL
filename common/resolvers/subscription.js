const FEED_ADDED = 'FEED_ADDED'
const MESSAGE_ADDED = 'MESSAGE_ADDED'

import { pubsub } from '../../server/subscription'

const FEED = []
const MESSAGE = []

export default {
  Subscription: {
    feedAdded: {
      subscribe: () => pubsub.asyncIterator([FEED_ADDED])
    },
    messageAdded: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED])
    }
  },
  Query: {
    feeds: (root, args, context, info) => {
      return FEED
    },
    messages: (root, args, context, info) => {
      return MESSAGE
    }
  },
  Mutation: {
    addFeed: (root, args, context, info) => {
      pubsub.publish(FEED_ADDED, {feedAdded: args})
      FEED.push(args)
      console.log(FEED)
      return args
    },
    sendMessage: (root, args, context, info) => {
      pubsub.publish(MESSAGE_ADDED, {messageAdded: args})
      MESSAGE.push(args)
      console.log(MESSAGE)
      return args
    }
  }
}