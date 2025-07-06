const sampleListings = [
    {
        title: "Seaside Paradise",
        description: "A beautiful beachside villa with stunning views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=3132&auto=format&fit=crop",
        },
        price: 12000,
        location: "Anjuna Beach, Goa",
        country: "India"
    },
    {
        title: "Mountain Retreat",
        description: "Experience tranquility in this cozy mountain cabin.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?q=80&w=3132&auto=format&fit=crop",
       },
        price: 8500,
        location: "Manali, Himachal Pradesh",
        country: "India"
    },
    {
        title: "Royal Heritage Palace",
        description: "Stay in a luxurious heritage palace with royal ambiance.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=3132&auto=format&fit=crop",
        },
        price: 15000,
        location: "Jaipur, Rajasthan",
        country: "India"
    },
    {
        title: "Forest Hideaway",
        description: "A peaceful wooden cabin surrounded by lush greenery.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=3132&auto=format&fit=crop",
       },
        price: 7000,
        location: "Coorg, Karnataka",
        country: "India"
    },
    {
        title: "Urban Luxury Apartment",
        description: "Modern apartment with top-class amenities in the city center.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        price: 11000,
        location: "Mumbai, Maharashtra",
        country: "India"
    },
    {
        title: "Parisian Loft",
        description: "A stylish loft with views of the Eiffel Tower.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        price: 20000,
        location: "Paris",
        country: "France"
    },
    {
        title: "Santorini Sunset Villa",
        description: "A stunning villa with breathtaking sunset views.",
        image: {
            filename: "listingimage",
            url: "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsfGVufDB8fDB8fHww",
        },
        price: 22000,
        location: "Santorini",
        country: "Greece"
    },
    {
        title: "New York Skyscraper Apartment",
        description: "A high-rise apartment in the heart of NYC.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhvdGVsfGVufDB8fDB8fHww",
        },
        price: 25000,
        location: "New York City",
        country: "USA"
    },
    {
        title: "Dubai Marina Penthouse",
        description: "Luxurious penthouse with a stunning marina view.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVsfGVufDB8fDB8fHww",
        },
        price: 27000,
        location: "Dubai",
        country: "UAE"
    },
    {
        title: "Swiss Alps Chalet",
        description: "Cozy wooden chalet with breathtaking mountain views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdGVsfGVufDB8fDB8fHww",
        },
        price: 18000,
        location: "Zermatt",
        country: "Switzerland"
    },
    {
        title: "Swiss Alps Chalet",
        description: "Cozy wooden chalet with breathtaking mountain views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        },
        price: 18000,
        location: "Zermatt",
        country: "Switzerland"
    },
    {
        title: "Swiss Alps Chalet",
        description: "Cozy wooden chalet with breathtaking mountain views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvdGVsfGVufDB8fDB8fHww",
        },
        price: 18000,
        location: "Zermatt",
        country: "Switzerland"
    },
    {
        title: "Swiss Alps Chalet",
        description: "Cozy wooden chalet with breathtaking mountain views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGhvdGVsfGVufDB8fDB8fHww",
        },
        price: 18000,
        location: "Zermatt",
        country: "Switzerland"
    },
    {
        title: "Swiss Alps Chalet",
        description: "Cozy wooden chalet with breathtaking mountain views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGhvdGVsfGVufDB8fDB8fHww",
        },
        price: 18000,
        location: "Zermatt",
        country: "Switzerland"
    }

];

module.exports = {data : sampleListings};
