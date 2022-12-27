import sanityClient from "@sanity/client"
import ImageUrlBuilder from "@sanity/image-url"

export const client = sanityClient({
    projectId: "675cj5bp",
    dataset: "production",
    apiVersion: "2022-12-27",
    useCdn: true,
    token: process.env.SANITY_API_TOKEN
})

const builder = ImageUrlBuilder(client)

export const urlFor = source => builder.image(source)