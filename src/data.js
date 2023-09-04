const exploreData = [
  {
    imageURL:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    subHeading: "Shaadi season incoming...",
    title: "Destination Wedding Aesthetics",
  },
  {
    imageURL:
      "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFwcHklMjBmcmllbmRzaGlwJTIwZGF5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    subHeading: "Yaari dosti",
    title: "Happy Friendship Day Quotes",
  },
  {
    imageURL:
      "https://plus.unsplash.com/premium_photo-1682965454828-ef9198aa5c72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fERyZXNzJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    subHeading: "Dress up to show up",
    title: "Outfit Ideas",
  },
  {
    imageURL:
      "https://images.unsplash.com/photo-1469533778471-92a68acc3633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhcnQlMjBjYWtlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    subHeading: "Table for two please",
    title: "Date night cooking recipes",
  },
  {
    imageURL:
      "https://images.unsplash.com/photo-1630748662359-40a2105640c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hhaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    subHeading: "Nothing beats Chai",
    title: "Chai Recipes: Monsoon edition",
  },
  {
    imageURL:
      "    https://images.unsplash.com/photo-1595341595379-cf1cb694ea1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JvY2hldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    subHeading: "What's Trending?",
    title: "Vision Board: Crochet",
  },
];

const pinData = [
  {
    title: "Desert Landscape",
    imageURL:
      "https://images.unsplash.com/photo-1683520596266-b7811d63e5af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    aspectRatio: "21:9",
  },
  {
    title: "Tropical Beach",
    imageURL:
      "https://images.unsplash.com/photo-1683576220021-66cc93f3307b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    aspectRatio: "3:4",
  },
  {
    title: "City Street",
    imageURL:
      "https://images.unsplash.com/photo-1683086430031-1087df2d4a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    aspectRatio: "2:3",
  },
  {
    title: "Mountain Lake",
    imageURL:
      "https://plus.unsplash.com/premium_photo-1681406994502-bb673c265877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    aspectRatio: "9:16",
  },
  {
    title: "Forest Waterfall",
    imageURL:
      "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    aspectRatio: "1:2",
  },
  {
    title: "Mountain Landscape",
    imageURL:
      "https://images.unsplash.com/photo-1683802175345-d58ea6c3709e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1003&q=80",
    aspectRatio: "3:2",
  },
  {
    title: "City Skyline",
    imageURL:
      "https://images.unsplash.com/photo-1683710921044-f8c4065a732f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    aspectRatio: "16:9",
  },
  {
    title: "Forest Trail",
    imageURL:
      "https://images.unsplash.com/photo-1683486433915-3f279aa39d82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    aspectRatio: "4:3",
  },
  {
    title: "Beach Sunset",
    imageURL:
      "https://plus.unsplash.com/premium_photo-1680127401733-1e24100f51f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    aspectRatio: "1:1",
  },
  {
    title: "Snowy Mountains",
    imageURL:
      "https://images.unsplash.com/photo-1683660107710-c8464f63d1b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    aspectRatio: "5:4",
  },
];

export { pinData, exploreData };
