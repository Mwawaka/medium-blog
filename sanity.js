// file will be use to connect the frontend to the sanity backend.

import {
    createImageUrlBuilder,
    createCurrentUserHook,
    createClient,

} from 'next-sanity'

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2022-03-25',
    useCdn: process.env.NODE_ENV === 'production',
};

// set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// set up a helper function for generating Image urls with only the asset reference data
export const urlFor = (source) => {
    createImageUrlBuilder(config).image(source);
}

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);