const ImagesFromFlickr = [
{
    url: 'https://c2.staticflickr.com/2/1815/30209781128_0d887a7de5_n.jpg',
    original: 'https://c2.staticflickr.com/2/1815/30209781128_64a0b0be80_o.png',
    title: 'Western Veil Nebula',
    description: 'Can you see the witch? Also known as the witchbroom nebula or the western veil nebula, I prefer the later.It is a remnant of a supernova that exploded around 6,000 BC and the distance is about 1,470 light years.'
},
{
    url: 'https://c1.staticflickr.com/5/4522/37914735325_b1f4a4ddeb_n.jpg',
    original: 'https://c1.staticflickr.com/5/4522/37914735325_934b9551e8_o.png',
    title: 'The Heart Nebula',
    description: 'The Heart Nebula, IC 1805, Sharpless 2-190, lies some 7500 light years away from Earth and is located in the Perseus Arm of the Galaxy in the constellation Cassiopeia. It was discovered by William Herschel on 3 November 1787'
},
{
    url: 'https://c1.staticflickr.com/5/4450/37959490282_c1f5a93b85_n.jpg',
    original: 'https://c1.staticflickr.com/5/4450/37959490282_9522369451_o.png',
    title: 'The Rosette Nebula',
    description: 'The Rosette Nebula is a large spherical H II region located near one end of a giant molecular cloud in the Monoceros region of the Milky Way Galaxy.'
},
{
    url: 'https://c1.staticflickr.com/5/4524/27144549229_7d156dcc2c_n.jpg',
    original: 'https://c1.staticflickr.com/5/4524/27144549229_3fbc2b4c2d_o.png',
    title: 'The Cgynus Nebula',
    description: 'The North America Nebula is an emission nebula in the constellation Cygnus, close to Deneb. The remarkable shape of the nebula resembles that of the continent of North America, complete with a prominent Gulf of Mexico.'
},
{
    url: 'https://c1.staticflickr.com/5/4542/24000329607_fc31260a70_n.jpg',
    original: 'https://c1.staticflickr.com/5/4542/24000329607_e298752f0e_o.png',
    title: 'The Pelican Nebula',
    description: 'The Pelican Nebula is an H II region associated with the North America Nebula in the constellation Cygnus. The gaseous contortions of this emission nebula bear a resemblance to a pelican, giving rise to its name.'
},
{
    url: 'https://c1.staticflickr.com/5/4514/36869963113_8c0a1ebac5_n.jpg',
    original: 'https://c1.staticflickr.com/5/4514/36869963113_381362103f_o.png',
    title: 'The Elephant Trunk Nebula',
    description: 'The Elephant\'s Trunk nebula is a concentration of interstellar gas and dust within the much larger ionized gas region IC 1396 located in the constellation Cepheus about 2,400 light years away from Earth.'
},
{
    url: 'https://c1.staticflickr.com/5/4600/39162820891_99715ed921_n.jpg',
    original: 'https://c1.staticflickr.com/5/4600/39162820891_e10113f62d_o.png',
    title: 'The Horsehead Nebula',
    description: 'The Horsehead Nebula is a dark nebula in the constellation Orion. The nebula is located just to the south of the star Alnitak, which is farthest east on Orion\'s Belt, and is part of the much larger Orion Molecular Cloud Complex'
},
{
    url: 'https://c1.staticflickr.com/5/4303/35738375021_47f8de599f_n.jpg',
    original: 'https://c1.staticflickr.com/5/4303/35738375021_06f23879b0_o.png',
    title: 'The Andromeda Galaxy',
    description: 'The Andromeda Galaxy, also known as Messier 31, M31, or NGC 224, is a spiral galaxy approximately 780 kiloparsecs from Earth, and the nearest major galaxy to the Milky Way.'
},
{
    url: 'https://c1.staticflickr.com/5/4556/38308951604_56c33c4456_n.jpg',
    original: 'https://c1.staticflickr.com/5/4556/38308951604_529dfe5528_o.png',
    title: 'The Jellyfish Nebula',
    description: 'IC 443 is a Galactic supernova remnant in the constellation Gemini. On the plan of the sky, it is located near the star Eta Geminorum. Its distance is roughly 5,000 light years from Earth.'
}
]
export default {
  Query: {
      astroImages: (root, args, context) => {
      return ImagesFromFlickr
      }
  }
}