const MESSAGE_ADDED = 'MESSAGE_ADDED'

import { pubsub } from '../../server/subscription'

const MESSAGES = []

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
      return MESSAGES
    }
  },
  Mutation: {
    sendMessage: (root, args, context, info) => {
      const message = {
        author: args.author,
        message: args.message,
        id: MESSAGES.length + 1
      }
      MESSAGES.push(message)
      console.log('Mutation Fires' , message)
      pubsub.publish(MESSAGE_ADDED, message)

      return message
    }
  }
}