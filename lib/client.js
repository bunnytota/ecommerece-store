// for sanity client
import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: 'cyf2v7hm',   //dow10h3v  //8w0yo5ml  //cyf2v7hm
    dataset: 'production',
    apiVersion: '2022-12-26',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);