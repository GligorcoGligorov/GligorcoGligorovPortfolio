import {useParams, useHistory} from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom'

const ProjectDetails = () => {

    const { id } = useParams()
    const { data: project,error,isPending } = useFetch('http://localhost:8000/projects/' + id)
    const history = useHistory()

    const handleDeleteClick = () => {
        fetch(`http://localhost:8000/projects/` + project.id,{
            method: "DELETE"
        }).then(() => {
            history.push("/")
        })

    }
    

    return ( 
        <div className="project-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{error}</div>}
            {project && (
                <article>
                    <h2>{project.title}</h2>
                    <p><span className='colorBlack'>Programming Language:</span> {project.ProgramingLanguage}</p>
                    <div><span className='colorBlack'>Body:</span> {project.body}</div>
                    <button id='btn1'><a id='projectViewLink' href={project.link}>View Project</a></button>
                    <div><Link to="/">← Back</Link></div>
                    {/* <button onClick={handleDeleteClick}>Delete</button> */}

                </article>
            )}

        </div>
     );
}
 
export default ProjectDetails;