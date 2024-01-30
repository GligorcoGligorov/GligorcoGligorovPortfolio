import useFetch from "../hooks/useFetch";

const Skills = () => {
    const { data: skills, isPending, error } = useFetch("http://localhost:8000/skills");

    let firstColumnSkills = [];
    let secondColumnSkills = [];

    if (skills && skills.length !== 0) {
        // Divide skills into two arrays
        const halfLength = Math.ceil(skills.length / 2);
        firstColumnSkills = skills.slice(0, halfLength);
        secondColumnSkills = skills.slice(halfLength);
    }

    return ( 
        <div className="skills">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            <div className='experienceTitle'>Skills</div>

            <table className="tSkills">
                <thead>
                    <tr>
                        {/* <th colSpan="2">Skills</th> */}
                    </tr>
                </thead>
                <tbody>
                    {skills && skills.length > 0 && firstColumnSkills.map((skill, index) => (
                        <tr key={index}>
                            <td>{firstColumnSkills[index]}</td>
                            <td>{secondColumnSkills[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Skills;
