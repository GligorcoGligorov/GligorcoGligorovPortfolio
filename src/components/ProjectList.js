import { Link } from 'react-router-dom'


const ProjectList = (props) => {

    const projects = props.projects
    const title = props.title

    return ( 
        
        <div className="project-list">
            <h2 id='projects_title'>{title}</h2>
            <div>
                {projects.map((project) => (
                    <div className="project-preview" key={project.id}>
                        <Link to={`/projects/${project.id}`}>
                            <h2>{project.title}</h2>
                            <h3>Programing Language: {project.ProgramingLanguage}</h3>
                        </Link>
                    </div>
                ))} 
            </div>
        </div>
     );
}
 
export default ProjectList;