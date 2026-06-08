import { computeHeadingLevel } from "@testing-library/dom";
import { getAuth, sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";

const Dashboard = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false)


  const handleClose = () => {
    setShow(false)
  }

  const updateUser = () => {
    updateProfile(auth.currentUser, {
      displayName: userName, photoURL: photoURL
    }).then(() => {
      handleClose();
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // let userObj = {

  // }

  // userObj?.details?.address

  const sendVerificationEmail = () => {
    // console.log("sendVerificationEmail")
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    });
  }

  return (
    <div>
      <h1>Dashboard</h1>

      {currentUser.emailVerified == false ?
        <Alert key={'warning'} variant={'warning'}>
          Your Email Is Not Verified, <span style={{cursor: "pointer", textDecoration: "underline"}} onClick={sendVerificationEmail}>Click Here</span> To Verify
        </Alert>
        :
        null
      }

      {(currentUser?.photoURL || currentUser.displayName) ?
        <div className="d-flex align-items-center gap-2">
          <div className="" style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden" }}>
            {currentUser?.photoURL ?
              <img src={currentUser?.photoURL} style={{ width: "100%", height: "100%" }} alt="" />
              :
              <span>{currentUser.displayName}</span>
            }
          </div>
          <h4 className="m-0">{currentUser.displayName}</h4>
        </div>
        :
        null
      }
      {/* <h1>{currentUser.displayName}</h1> */}
      <p>{currentUser.email}</p>
      <br />
      <button onClick={() => { setShow(true) }}>Update Profile</button>
      <br />
      <button onClick={logout}>Logout</button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="">
            Name: <input type="text" value={userName} onChange={(e) => {
              setUserName(e.target.value)
            }} />
          </label>
          <br />
          <br />
          <label htmlFor="">
            Photo Url: <input type="text" value={photoURL} onChange={(e) => {
              setPhotoURL(e.target.value)
            }} />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {showAlert ?
        <div className="" style={{ position: "fixed", left: 0, bottom: 0 }}>
          <Alert key={'success'} variant={'success'}>
            Profile Updated!
          </Alert>
        </div>
        :
        null
      }
    </div>
  );
};

export default Dashboard;
