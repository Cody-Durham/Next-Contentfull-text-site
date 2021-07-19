import { createClient } from 'contentful'
const contentful = require('contentful')



export async function getStaticProps() {
 
 
  const client = createClient ({
    space: process.env.CONTENTFUL_SPACE_ID, // contentful_space_id is in the .env file. 'Process' is a built in method for next.js
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // content delivery API - access token (settings -> api)
  })
  
  const res = await client.getEntries({ content_type: 'recipe'})
  
  return {
    props : {
      recipes: res.items // these are all the items we get back from the response from 'recipe'
    }
  }

}



export default function Recipes({ recipes }) {
  console.log('recipes from site', recipes);
  return (
    <div className="recipe-list">
      Recipe List
    </div>
  )
}