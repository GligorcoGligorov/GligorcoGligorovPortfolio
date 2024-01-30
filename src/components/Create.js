import { useState } from "react";
import {useHistory} from "react-router-dom"

const Create = () => {

    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [ProgramingLanguage,setProgramingLanguage] = useState("Java")
    const [link,setLink] = useState("")
    const [isPending,setIsPending] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const project = {title,body,ProgramingLanguage,link}
        // console.log(project)
        fetch(`http://localhost:8000/projects`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(project)
        }).then(() =>{
            console.log("new project added")
            setIsPending(false)
            // history.go(-1)
            history.push("/")

        })

    }


    return ( 
        <div className="create">
            <h2>Add a New Project</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Project Title:</label>
                <input type="text"
                 required value={title} 
                 onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="">Project Body:</label>
                <textarea required
                value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <label htmlFor="">Programing Language:</label>
                <select value={ProgramingLanguage}
                onChange={(e) => setProgramingLanguage(e.target.value)}>
                    <option value="Java">Java</option>
                    <option value=".Net">.Net</option>
                </select>
                <label htmlFor="">Project Link:</label>
                <input type="url"
                 required value={link} 
                 onChange={(e) => setLink(e.target.value)}/>
                {!isPending && <button>Add Project</button>}
                {isPending && <button disabled>Adding Project...</button>}

                {/* <p>{title}</p>
                <p>{body}</p>
                <p>{programingLanguage}</p> */}


            </form>
        </div>
     );
}
 
export default Create;