// this is a definition typescript file that store type definitions

export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: image;
  };
    comments:[Comment]
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
    body: [object];
  };
  body: [];
}

export interface Comment {
  _createdAt: string;
  _id: string;
  comment: string;
  approved: boolean;
  name: string;
  email: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  post: {
    _ref: string;
    _type: string;
  };
}
