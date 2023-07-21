import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";

let DeveloperList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [followuser, setFollowUser] = useState({});

  const fetchProfiles = async () => {
    const { data } = await axios.get("https://devroom.onrender.com/api/profiles/all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setProfiles(data.profiles);
    setLoading(false);
  };

  const getUser = async () => {
    let { data } = await axios.get("https://devroom.onrender.com/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    });
    setUser(data.user);
    console.log(data.user);
  };

  const clickFollowButton = async (profile) => {
    
    const followObj = {
      user: user._id,
      following: profile._id,
    };
    
    const { data } = await axios.post(
      "https://devroom.onrender.com/api/following/",
      followObj,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("devroom")}`,
        },
      }
    );
    
    window.location.reload();
  };

  useEffect(() => {
    if(localStorage.getItem("devroom")){
      getUser();
    }fetchProfiles();
  }, []);

  let afterLogin = (
    <React.Fragment>
      {profiles.length > 0 && Object.keys(user).length > 0 ? (
        <React.Fragment>
          { (
          <div className="container">
            <div className="row">
              <div className="col">
                {profiles.map((profile) => {
                  return (
                    <div
                      className="card my-2 animated zoomIn"
                      key={profile._id}
                    >
                      <div className="card-body bg-light-grey">
                        <div className="row">
                          <div className="col-md-2">
                            <img
                              src={profile.user.avatar}
                              className="img-fluid img-thumbnail"
                              alt=""
                            />
                          </div>
                          <div className="col-md-5">
                            <h2>{profile.user.name}</h2>
                            <small className="h6">
                              {profile.website}
                            </small>
                            <br />
                            <small className="h6">
                              {profile.designation}
                            </small>
                            <br />
                            <small className="h6">
                              {profile.company}
                            </small>
                            <br />
                            <small>{profile.location}</small>
                            <br />
                            <Link
                              to={`/developers/${profile._id}`}
                              className="btn btn-teal btn-sm"
                            >
                              {" "}
                              View Profile{" "}
                            </Link>
                            <br />
                            { user._id === profile.user._id && Object.keys(user).length > 0 ? (
                              <></>
                            ) : (
                              <div>
                                <br></br>
                                {
                                  user.following.includes(profile.user._id) 
                                ? (
                                  <button
                                    className="btn btn-like btn-sm me-2"
                                    onClick={clickFollowButton.bind(
                                      this,
                                      profile.user
                                    )}
                                    style={{ color: "white" }}
                                  >Following                                        
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={clickFollowButton.bind(
                                      this,
                                      profile.user
                                    )}
                                  >Follow
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="col-md-5 d-flex justify-content-center flex-wrap ">
                            {profile.skills.length > 0 &&
                              profile.skills.map((skill, index) => {
                                return (
                                  <div key={index}>
                                    <span className="badge badge-success p-2 m-1">
                                      <i className="fa fa-check-circle" />{" "}
                                      {skill}
                                    </span>
                                    <br />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          )}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );


  let beforeLogin = (
    <React.Fragment>
      {profiles.length > 0 ? (
        <React.Fragment>
          { (
          <div className="container">
            <div className="row">
              <div className="col">
                {profiles.map((profile) => {
                  return (
                    <div
                      className="card my-2 animated zoomIn"
                      key={profile._id}
                    >
                      <div className="card-body bg-light-grey">
                        <div className="row">
                          <div className="col-md-2">
                            <img
                              src={profile.user.avatar}
                              className="img-fluid img-thumbnail"
                              alt=""
                            />
                          </div>
                          <div className="col-md-5">
                            <h2>{profile.user.name}</h2>
                            <small className="h6">
                              {profile.website}
                            </small>
                            <br />
                            <small className="h6">
                              {profile.designation}
                            </small>
                            <br />
                            <small className="h6">
                              {profile.company}
                            </small>
                            <br />
                            <small>{profile.location}</small>
                            <br />
                            <Link
                              to={`/developers/${profile._id}`}
                              className="btn btn-teal btn-sm"
                            >
                              {" "}
                              View Profile{" "}
                            </Link>
                            <br />
                          </div>
                          <div className="col-md-5 d-flex justify-content-center flex-wrap ">
                            {profile.skills.length > 0 &&
                              profile.skills.map((skill, index) => {
                                return (
                                  <div key={index}>
                                    <span className="badge badge-success p-2 m-1">
                                      <i className="fa fa-check-circle" />{" "}
                                      {skill}
                                    </span>
                                    <br />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          )}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col">
              <p className="h3 text-teal">
                <i className="fa fa-user-tie" /> Developers
              </p>
              <p>List of registered developers</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        {loading ? (
          <Spinner />
        ) : (
          localStorage.getItem ("devroom") ?
          afterLogin :
          beforeLogin
        )}
      </section>
    </React.Fragment>
  );
};
export default DeveloperList;
