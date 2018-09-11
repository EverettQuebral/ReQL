import { StatusMessage } from "..";

const AstroImages = [
  {
    id: 'image1',
    imageUrl: 'https://c2.staticflickr.com/2/1875/30611527148_74cb6bf6ab_m.jpg',
    title: 'Sh1-102',
    subtitle: 'Tulip Nebula',
    description: 'harpless 101 is a H II region emission nebula located in the constellation Cygnus. It is sometimes also called the Tulip Nebula because it appears to resemble the outline of a tulip when imaged photographicall',
    fullsizeUrl: 'https://c2.staticflickr.com/2/1875/30611527148_74cb6bf6ab_b.jpg'
  },
  {
    id: 'image2',
    imageUrl: 'https://c2.staticflickr.com/2/1875/30611527148_74cb6bf6ab_m.jpg',
    title: 'Sh1-102',
    subtitle: 'Tulip Nebula',
    description: 'harpless 101 is a H II region emission nebula located in the constellation Cygnus. It is sometimes also called the Tulip Nebula because it appears to resemble the outline of a tulip when imaged photographicall',
    fullsizeUrl: 'https://c2.staticflickr.com/2/1875/30611527148_74cb6bf6ab_b.jpg'
  },
  {
    id: 'image3',
    imageUrl: 'https://c2.staticflickr.com/2/1875/30611527148_74cb6bf6ab_m.jpg',
    title: 'Sh1-102',
    subtitle: 'Tulip Nebula',
    description: 'harpless 101 is a H II region emission nebula located in the constellation Cygnus. It is sometimes also called the Tulip Nebula because it appears to resemble the outline of a tulip when imaged photographicall',
    fullsizeUrl: 'https://c2.staticflickr.com/2/1875/30611527148_74cb6bf6ab_b.jpg'
  }
]


export default {
  Query: {
    getAstroImages: (root, args, context) => {
      return AstroImages
    }
  },
  Mutation: {
    share: (root, args, context) => {
      const id = args.id
      const socialMedia = args.socialMedia

      console.log(id, socialMedia)
      return new StatusMessage(200, 'SUCCESS', 'Successfully shared ' + id + ' to ' + socialMedia)
    }
  }
}
