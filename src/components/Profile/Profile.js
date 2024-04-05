import React from 'react'
import './Profile.css'
const Profile = () => {
    return (
        <>
            <div className="huge-profile-container">
                <div className="profile-card">
                    <div className="profile-pic-container">
                        <div className="profile-inside">

                            <div className="image"></div>
                            <div>Aziz</div>
                            <div>Bir-El-Ater, Lots 150</div>
                        </div>
                    </div>
                </div>
                <div className="big-profile-container">
                    <div className="profile-info-container">
                        <form>
                            <label>Name</label>
                            <label>Email</label>
                            <label>Phone Number</label>
                            <label>Password</label>
                            <label>Shipping address</label>
                        </form>
                    </div>
                </div>                
            </div>
        </>
    )
}

export default Profile