import React from 'react'

const Summary = ({ projects }) => {
    return (
        <div className="card z-depth-0 project-summary">
            {projects.map(project =>
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title ">{project.title}</span>
                    <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
                    <p className="grey-text">{project.createdAt && project.createdAt.toDate().toString()}</p>
                </div>
            )}
        </div>
    )
}

export default Summary