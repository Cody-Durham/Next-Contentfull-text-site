import { createClient } from 'contentful'

export async function getStaticProps() {
  const client = createClient( {
    // contentful_space_id is in the .env file. 'Process' is a built in method for next.js
    space: process.env.CONTENTFUL_SPACE_ID, 
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // content delivery API - access token (settings -> api)
  })

}



export default function Recipes() {
  return (
    <div className="recipe-list">
      Recipe List
    </div>
  )
}