// need to use getStaticPaths -> responsible for figuring out all routes that use this page
// then NEXT.js will build static pages a buildtime
import { createClient } from 'contentful'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


// create client is not inside a function because were going to be using it in multiple spots.. 
const client = createClient ({
  space: process.env.CONTENTFUL_SPACE_ID, // contentful_space_id is in the .env file. 'Process' is a built in method for next.js
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // content delivery API - access token (settings -> api)
})

export const getStaticPaths = async () => {
  const response = await client.getEntries({
    content_type: 'recipe' // this is getting the content type of recipe
  })

  const paths = response.items.map(item => {
    return {
      params: { slug: item.fields.slug } 
    }
  })

  // next.js knows to return a 'path' for each route here
  return {
    paths: paths, // could shorten it to just paths 
    fallback: false // if no path exist it will show a 404 page. 
  }
}

export async function getStaticProps({ params }) { // this is fetching a single item.. then will be used as a prop to inject below
  const { items } = await client.getEntries( {
    content_type: 'recipe', 
    'fields.slug': params.slug
  })
return {
  props: { recipe: items[0]} 
}
}


export default function RecipeDetails({ recipe }) {
  const { featuredImage, title, cookingTime, ingredients, method } = recipe.fields 
  console.log('ingredients', ingredients);

  return (
    <div>
      <div className="banner">
        <Image 
          src= {'https:' + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        /> 
        <h2>{ title }</h2>
      </div>
      <div className="info">
        <p>Takes about { cookingTime } to cook</p>
        <h3>Ingredients: </h3>

       {ingredients.map(product => (
         <span key={product}>{ product }</span>
       ))}
      </div>
      <div className="methods">
        <h3>Method:</h3>
        {/* we can use rich-text-react-renderer pacakage from contentful */}
        {/* npm install @contentful/righ-text-react-renderer at top of page*/}
        {/* below is using the documentToReactComponents and passing in the METHOD object that we extracted from recpie (line 44) 
            -that will install the Rich Text formatting we specified in the Contentful API (same formatting)
        */}
        <div>{documentToReactComponents(method)}</div>
      </div>
      <style jsx>{`
      h2,h3 {
        text-transform: uppercase;
      }
      .banner h2 {
        margin: 0;
        background: #fff;
        display: inline-block;
        padding: 20px;
        position: relative;
        top: -30px;
        left: -500px;
        transform: rotateZ(-1deg);
        box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
      }
      .info p {
        margin: 0;
      }
      .info span::after {
        content: ", ";
      }
      .info span:last-child::after {
        content: ".";
      }
      
      `}
      </style>
    </div>
  )
}




