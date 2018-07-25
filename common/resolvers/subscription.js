const MESSAGE_ADDED = 'MESSAGE_ADDED'

import { pubsub } from '../../server/subscription'

const MESSAGE = []

export default {
  Subscription: {
    messageAdded: {
      resolve: (payload, args, context, info) => {
        console.log('Subscription Message Added Fires ', payload, args)
        return payload
      },
      subscribe: () => pubsub.asyncIterator(MESSAGE_ADDED)
    }
  },
  Query: {
    messages: (root, args, context, info) => {
      return MESSAGE
    }
  },
  Mutation: {
    sendMessage: (root, args, context, info) => {
      MESSAGE.push(args)

      console.log('Mutation Fires' , MESSAGE)

      pubsub.publish(MESSAGE_ADDED, {messageAdded: args})
      
      console.log(MESSAGE)

      return args
    }
  }
}