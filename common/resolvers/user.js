import { find } from 'lodash'
import { 
  User,
  UserInput,
  UserInputMessage,
  Address, 
  AddressInput,
  StatusMessage 
} from '../../common/index'


const myFavoriteArtists = [
  {
    id: "xxxx",
    first_name: "Michael",
    last_name: "Jackson",
    address: {
      address1: "1st Street",
      address2: "",
      city: "Boston",
      state: "MA",
      zip: "64848",
      country: "USA",
    },
    email: "michael@jackson.com",
    password: "secret"
  },
  {
    id: "yyyy",
    first_name: "Bruno",
    last_name: "Mars",
    address: {
      address1: "1st Street",
      address2: "",
      city: "Boston",
      state: "MA",
      zip: "64848",
      country: "USA",
    },
    email: "bruno@mars.com",
    password: "secret secret"
  }
];

export default {
  Query: {
    findUser: (root, args, context) => {
      const id = args.id
      const user = find(myFavoriteArtists, { 'id' : id })
      return user
    },
    getUsers: (root, args, context) => {
      return myFavoriteArtists
    }
  },
  Mutation: {
    addUser: (root, args, context) => {
      const user = args.input
      user.id = Math.random().toString(36).substr(2, 9);
      myFavoriteArtists.push(user)
      const statusMessage = new StatusMessage(200, 'SUCCESS', 'Successfully entered the new User')
      return statusMessage
    }
  }
}