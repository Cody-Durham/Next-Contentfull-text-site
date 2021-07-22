import { createClient } from 'contentful'
import RecipeCard from '../components/RecipeCard';



// getStatic props is reaching out to get info on 'recipe'
// then were returning the response as a prop
// then passing that prop to the Recipes function at the bottom



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
  // console.log('recipes from site', recipes);
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div>
          <RecipeCard key={recipe.sys.id} recipe={recipe}/>
        </div>
      ))}
      
      <style jsx>{`
        .recipe-list {
        //  border: 2px solid red;
         display: grid;
         grid-template-columns: 1fr 1fr;
         grid-gap: 20px 60px;
        }
      `}
      </style>
    </div>
  )
}