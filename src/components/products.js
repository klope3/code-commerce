const products = [
    {
        name: "Epic URL",
        description: "Library",
        price: 68.11,
        fileSize: 880,
        starRating: 4,
        imgUrl: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        name: "State Master",
        description: "Component",
        price: 15.25,
        fileSize: 60,
        starRating: 3,
        imgUrl: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        name: "EZ Vector",
        description: "Extension",
        price: 3.99,
        fileSize: 654,
        starRating: 4,
        imgUrl: "https://images.pexels.com/photos/5380618/pexels-photo-5380618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        name: "Ultimate CSS Cleaner",
        description: "Extension",
        price: 10.00,
        fileSize: 1345,
        starRating: 4,
        imgUrl: "https://images.pexels.com/photos/5380618/pexels-photo-5380618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        name: "101 UI Elements",
        description: "Graphics Pack",
        price: 25.99,
        fileSize: 14321,
        starRating: 5,
        imgUrl: "https://images.pexels.com/photos/5380618/pexels-photo-5380618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        name: "Brilliant Loading Bars",
        description: "Graphics Pack",
        price: 7.25,
        fileSize: 509,
        starRating: 3,
        imgUrl: "https://images.pexels.com/photos/5380618/pexels-photo-5380618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
];

export const getInitialCartItems = () => {
    return products.map((product, index) => ({
        product: product,
        quantity: 1,
        id: index,
    }));
}