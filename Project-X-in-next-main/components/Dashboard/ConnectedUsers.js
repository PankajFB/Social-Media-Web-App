import React from "react";

function ConnectedUsers(props) {
console.log(props.connectedUsers)

  return (
    <div>
      <div className="card mb-4">
        <div className="card-header pb-0">
          <h6>Other Users</h6>
        </div>
        <div className="card-body px-0 pt-0 pb-2">
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Author
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Function
                  </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Status
                  </th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Employed
                  </th>
                  <th className="text-secondary opacity-7" />
                </tr>
              </thead>
              <tbody>
                {/* we will render the conneteduser list here */}
                {/* <h1>This is my name : {props.connectedUsers}</h1> */}

                {props.connectedUsers.map((user) => (
                    <tr key={user.socketId}>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img
                              src={user.user.photoURL}
                              alt="DP"
                              className="avatar avatar-sm me-3"
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{user.user.displayName}</h6>
                            <p className="text-xs text-secondary mb-0">
                              {user.user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-xs font-weight-bold mb-0">{user.socketId}</p>
                        <p className="text-xs text-secondary mb-0">
                          Organization
                        </p>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="badge badge-sm bg-gradient-success">
                          Online
                        </span>
                      </td>
                      <td className="align-middle text-center">
                        <span className="text-secondary text-xs font-weight-bold">
                          23/04/18
                        </span>
                      </td>
                      <td className="align-middle">
                        <a
                          href="/"
                          className="text-secondary font-weight-bold text-xs"
                          data-toggle="tooltip"
                          data-original-title="Edit user"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  
                ))}



              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectedUsers;
