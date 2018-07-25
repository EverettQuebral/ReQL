import { find } from 'lodash'
import { 
  User,
  UserInput,
  UserInputMessage,
  Address, 
  AddressInput,
  StatusMessage 
} from '../../common/index'

const addresses = [
  {
    id: '1',
    address1: '2211 S 2nd Street',
    address2: '',
    city: 'San Jose',
    state: 'CA',
    zip: '95148',
    country: 'USA'
  }
]

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
  },
  {
    id: "zzzz",
    first_name: "Adelle",
    last_name: "Adelle",
    address: {
      address1: "22nd Street",
      address2: "",
      city: "Chicago",
      state: "LA",
      zip: "64848",
      country: "USA",
    },
    email: "adelle@adelle.com",
    password: "secret secret"
  }
]

export default {
  Query: {
    /**
     * findUser(id: "uniqueId")
     */
    findUser: (root, args, context) => {
      const id = args.id
      const user = find(myFavoriteArtists, { 'id' : id })
      return user
    },
    /**
     * getUsers 
     */
    getUsers: (root, args, context) => {
      return myFavoriteArtists
    },

    getAddresses: (root, args, context) => {
      return addresses
    }
  },
  Mutation: {
    addChatter: (root, args, context) => {
      const firstName = args.first_name
      const lastName = args.last_name
      const user = {
        id: myFavoriteArtists.length + 1,
        first_name: firstName,
        last_name: lastName,
        address: {
          address1: "22nd Street",
          address2: "",
          city: "Chicago",
          state: "LA",
          zip: "64848",
          country: "USA",
        },
        email: "adelle@adelle.com",
        password: "secret secret"
      }
      myFavoriteArtists.push(user)
      console.log('Adding Chatter')
      const statusMessage = new StatusMessage(200, 'SUCCESS', 'Successfully added a chatter') 
      return statusMessage
    },
    starUser: (root, args, context) => {
      const userId = args.id
      const statusMessage = new StatusMessage(200, 'SUCCESS', 'Successfully starred a user')
      console.log("Mutation Star User")
      return statusMessage
    },
    /**
     * addUser(input: {
     *  first_name: String!
     *  last_name: String!
     *  ...
     *  address: {
     *    address1: String1
     *    address2: String1
     *    ...
     *  }
     * }) {
     *  message 
     * }
     */
    addUser: (root, args, context) => {
      const user = args.input
      user.id = Math.random().toString(36).substr(2, 9);
      myFavoriteArtists.push(user)
      const statusMessage = new StatusMessage(200, 'SUCCESS', 'Successfully entered the new User')
      return statusMessage
    },

    addAddress: (root, args, context) => {
      //const address = args.input
      console.log(args);
      const address1 = args.address1
      const address2 = args.address2
      const city = args.city
      const state = args.state
      const zip = args.zip
      const country = args.country
      const address = new AddressInput(address1, address2, city, state, zip, country)
      addresses.push(address)
      const statusMessage = new StatusMessage(200, 'SUCCESS', 'Successfully added an address')
      return statusMessage
    }
  }
}