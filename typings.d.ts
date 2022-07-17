// this is a definition typescript file that store type definitions

export interface Post{
    _id: string;
    _createdAt: string;
    title: string;
    author: {
        name: string;

    };
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
        body: [object];
    }
}