import React, { useRef, useState } from 'react';

function Signup() {
    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNumberInputRef = useRef();
    let profilePicInputRef = useRef();

    let [profilePic, setProfilePic] = useState("./images/download.png");

    let onSignupJSON = async () => {

        let myHeader = new Headers();
        myHeader.append("content-type", "application/json");

        let dataToSend = {
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
            age: ageInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            // mobileNo: mobileNumberInputRef.current.value,
            mobileNumber: mobileNumberInputRef.current.value,
            profilePic: profilePicInputRef.current.value,
        };

        let reqOptions = {
            method: "POST",
            headers: myHeader,
            body: JSON.stringify(dataToSend),
        };

        let JSONData = await fetch("http://localhost:6789/signup", reqOptions);

        let JSOData = await JSONData.json();

        console.log(JSOData);
        alert(JSOData.msg);
    };

    let onSignupURLEncoded = async () => {

        let myHeader = new Headers();
        myHeader.append("content-type", "application/x-www-form-urlencoded");

        let dataToSend = new URLSearchParams();
        dataToSend.append("firstName", firstNameInputRef.current.value);
        dataToSend.append("lastName", lastNameInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        dataToSend.append("mobileNumber", mobileNumberInputRef.current.value);
        //dataToSend.append("profilePic", profilePicInputRef.current.value);

        let reqOptions = {
            method: "POST",
            headers: myHeader,
            body: dataToSend,
        };

        let JSONData = await fetch("http://localhost:6789/signup", reqOptions);

        let JSOData = await JSONData.json();

        console.log(JSOData);
        alert(JSOData.msg);
    };

    let onSignupFormData = async () => {

        let dataToSend = new FormData();
        dataToSend.append("firstName", firstNameInputRef.current.value);
        dataToSend.append("lastName", lastNameInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        dataToSend.append("mobileNumber", mobileNumberInputRef.current.value);


        for(let i=0;i <profilePicInputRef.current.files.length;i++){
            dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
        }

        let reqOptions = {
            method: "POST",
            body: dataToSend,
        };

        let JSONData = await fetch("http://localhost:6789/signup", reqOptions);

        let JSOData = await JSONData.json();

        console.log(JSOData);
        alert(JSOData.msg);
    };

    return (
        <div>
            <form>
                <div>
                    <label>First Name</label>
                    <input ref={firstNameInputRef}></input>
                </div>

                <div>;

                    <label>Last Name</label>
                    <input ref={lastNameInputRef}></input>
                </div>

                <div>
                    <label>Age</label>
                    <input ref={ageInputRef}></input>
                </div>

                <div>
                    <label>Email</label>
                    <input ref={emailInputRef}></input>
                </div>

                <div>
                    <label>Password</label>
                    <input ref={passwordInputRef}></input>
                </div>

                <div>
                    <label>Mobile number</label>
                    <input ref={mobileNumberInputRef}></input>
                </div>

                <div>
                    <label >Profile Pic</label>
                    <input type="file"
                        accept='image/*'
                       // multiple
                        onChange={(eventObj) => {
                            let selectedImagePath = URL.createObjectURL
                                (
                                    eventObj.target.files[0]
                                );
                                setProfilePic(selectedImagePath);
                        }}
                        ref={profilePicInputRef}></input>
                </div>
                <br></br>
                <img className="profilePicPreview" src={profilePic}></img>
                <div>
                    <button onClick={() => {
                        onSignupJSON();
                    }} type="button">Signup(JSON)</button>
                </div>

                <div>
                    <button onClick={() => {
                        onSignupURLEncoded();
                    }} type="button">
                        Signup(URLEncoded)
                    </button>
                </div>

                <div>
                    <button onClick={() => {
                        onSignupFormData();
                    }} type="button">
                        Signup(onFormData)
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup