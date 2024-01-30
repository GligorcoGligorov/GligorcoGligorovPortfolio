import useFetch from '../hooks/useFetch'

const Experience = () => {
    const { data: experiences, isPending, error } = useFetch("http://localhost:8000/experiences");
    const { data: awards, isPending2, error2 } = useFetch("http://localhost:8000/awards");


    return (  
        <div className="ea">
            <div className="ex">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                <div className='experienceTitle'>Experiences</div>
                {experiences && 
                <table className="tSkills">
                
                <tbody>
                    {experiences.map((ex, index) => (
                        <tr key={index}>
                            <td>{ex.name}</td>
                            <td>{ex.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
                
            </div>
            <div className="aw">

                {error2 && <div>{error2}</div>}
                {isPending2 && <div>Loading...</div>}
                <div className='experienceTitle'>Awards</div>
                {awards && 
                    <table className="tSkills">
                    
                        <tbody>
                            <tr>
                                <th>Award</th>
                                <th>Date</th>
                                <th>Link</th>

                            </tr>
                            {awards.map((ex, index) => (
                                <tr key={index}>
                                    <td>{ex.name}</td>
                                    <td>{ex.date}</td>
                                    <td id='linkAward1'><a href={ex.link}>LINK</a></td>

                                </tr>
                            ))}
                        </tbody>
                </table>}

            </div>
        </div>
    );
}
 
export default Experience;