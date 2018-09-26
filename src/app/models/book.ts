export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        subtitle: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        averageRating: number;
        ratingsCount: number;
        imageLinks: {
            thumbnail: string;
            smallThumbnail: string;
        };
    };
}

export function generateMockBook(): Book {
    return {
        id: '1',
        volumeInfo: {
            title: 'title',
            subtitle: 'subtitle',
            authors: ['author'],
            publisher: 'publisher',
            publishedDate: '1970-01-01',
            description: 'description',
            averageRating: 3,
            ratingsCount: 5,
            imageLinks: {
                thumbnail: '',
                smallThumbnail: '',
            },
        },
    };
}
