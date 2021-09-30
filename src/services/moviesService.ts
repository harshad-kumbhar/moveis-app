const movies = [
    {
        id: 1,
        name: 'Sultan',
        publishedDate: '23/09/2019',
        rating: 5,
        type: 'Action',
        like: true
    },
    {
        id: 2,
        name: 'Baghi 3',
        publishedDate: '18/03/2019',
        rating: 4,
        type: 'Action',
        like: false
    },
    {
        id: 3,
        name: 'Kabir Singh',
        publishedDate: '03/05/2020',
        rating: 3,
        type: 'Thriller',
        like: true
    },
    {
        id: 4,
        name: 'Sanju',
        publishedDate: '12/06/2020',
        rating: 5,
        type: 'Thriller',
        like: false
    },
    {
        id: 5,
        name: 'War',
        publishedDate: '12/06/2020',
        rating: 5,
        type: 'Thriller',
        like: false
    },
    {
        id: 6,
        name: 'Total Dhamal',
        publishedDate: '12/06/2020',
        rating: 5,
        type: 'Comedy',
        like: false
    },
    {
        id: 7,
        name: 'Andhadhun',
        publishedDate: '12/06/2020',
        rating: 4,
        type: 'Comedy',
        like: false
    },
    {
        id: 8,
        name: 'Tanhaji',
        publishedDate: '12/06/2020',
        rating: 5,
        type: 'Action',
        like: false
    }
    
]

export function getMovies() {
    return movies;
}

export function getMovie(id: number) {
    return movies.find(m => m.id === id);
}