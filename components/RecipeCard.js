import Link from 'next/link'
import Image from 'next/image'

const RecipeCard = ({ recipe }) => {
    const { title, slug, cookingTime, thumb } = recipe.fields

    console.log(recipe);


    return (
        <div className="card">
            <div className="thumbnail">
                <Image 
                src={'http:' + thumb.fields.file.url}
                width={thumb.fields.file.details.image.width}
                height={thumb.fields.file.details.image.height}
                />

            </div>
            <div className="content">
                <div className="info">
                    <h4>{ title }</h4>
                    <p>Takes around { cookingTime } mins to make</p>
                </div>
                <div className="actions">
                    <Link href={'/recipes/' + slug}><a>Cook This!</a></Link>
                </div>
            </div>

        </div>
    )
}
export default RecipeCard