import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../NavBars/side.navbar';
import TopNavbar from '../NavBars/top.navbar';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import ChangePasswordModal from '../TaskModels/changePassword.model';
import { changePassword, userDetails, uploadProfilePhoto } from '../../services/users.api';
import { API_URL } from '../../config/baseurl.config';

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState({
    email: 'example@email.com',
    firstName: "",
    lastName: "",
    userName: 'johndoe123',
    image: "", // Placeholder image URL
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userIdString = localStorage.getItem("user");
      if (userIdString !== null) {
        const userId = parseInt(userIdString);
        if (!isNaN(userId)) {
          const response = await userDetails({ userId });
          setProfileData(response.data.data);
        } else {
          console.error('User ID is not a valid number');
        }
      } else {
        console.error('User ID not found in localStorage');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleProfilePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const allowedFormats = ['.jpg', '.jpeg', '.png'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension && allowedFormats.includes('.' + fileExtension)) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (e.target) {
            setProfileData({
              ...profileData,
              image: e.target.result as string,
            });

            // Upload the file after a delay of 2 seconds
            setTimeout(uploadFile, 500, file);
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.error('Invalid file format. Please upload only .jpg, .jpeg, or .png files.');
      }
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const userIdString = localStorage.getItem("user");
      if (userIdString !== null) {
        const formData = new FormData();
        formData.append('userId', userIdString);
        formData.append('image', file);

        const response = await uploadProfilePhoto(formData);
        console.log('File uploaded:', response);

        // Fetch user data again to get updated profile information
        fetchUserData();
      }
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const onChangePassword = async (newPassword: string, currentPassword: string) => {
    try {
      const userIdString = localStorage.getItem("user");
      if (userIdString !== null) {
        const userId = parseInt(userIdString);
        if (!isNaN(userId)) {
          const response = await changePassword({ userId, currentPassword, newPassword })
          if (response.data.code === 200) {
            setTimeout(() => {
              setShowPasswordModal(false);
            }, 2000)
          }
        } else {
          console.error('User ID is not a valid number');
        }
      } else {
        console.error('User ID not found in localStorage');
      }
    } catch (error) {
      console.error('Failed to change the password:', error);
    }
  };

  return (
    <div className="container-fluid" style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <TopNavbar onSearch={() => { }} />
          <section style={{ backgroundColor: 'transparent' }}>
            <MDBContainer className="py-5">
              <MDBRow className="justify-content-center align-items-center">
                <MDBCol md="8" className="mb-4 " style={{ marginLeft: '0.1px' }}>
                  <MDBCard style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src={profileData.image ? `${API_URL}/profile-photo/${profileData.image}` : ''}
                        alt="avatar"
                        className="rounded-circle mx-auto mb-4"
                        style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                        onClick={handleProfilePhotoClick}
                      />
                      <input
                        id="profile-photo"
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleProfilePhotoChange}
                        accept=".jpg, .jpeg, .png" // Allow only specified formats
                      />
                      <MDBCardText className="mb-1"><strong>Name:</strong> {profileData.firstName + '\t' + profileData.lastName}</MDBCardText>
                      <MDBCardText className="mb-1"><strong>Username:</strong> {profileData.userName}</MDBCardText>
                      <MDBCardText className="mb-3"><strong>Email:</strong> {profileData.email}</MDBCardText>
                      <MDBBtn onClick={handleChangePassword} style={{ height: "50px", width: "250px" }}>Change Password</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="mb-4">
                  {/* Additional details can be added here */}
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </div>
      </div>
      <ChangePasswordModal showModal={showPasswordModal} onClose={handleClosePasswordModal} onChangePassword={onChangePassword} />
    </div>
  );
};

export default Profile;
