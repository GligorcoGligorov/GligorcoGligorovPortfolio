import useFetch from "../hooks/useFetch";
import ProjectList from "./ProjectList";

const Home = () => {


   const { data: projects, isPending, error} = useFetch("http://localhost:8000/projects")

   

    return (
        <div className="home">
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            {projects && <ProjectList projects={projects} title="My Projects" />}
        </div>
    );
}
 
export default Home;