import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebase";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { currentUser, updatePassword, deleteUser } = useAuth();
  const Navigation = useNavigate();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    // Redirect to login page if no user is logged in
    if (!currentUser) {
      Navigation("/login");
    }
  }, [currentUser, Navigation]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, "userdb", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userDataFromFirestore = userSnap.data();
            setUserData(userDataFromFirestore);
          } else {
            setError("User document not found");
          }
        } catch (error) {
          setError("Error fetching user data: " + error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleSaveChanges = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const userRef = doc(db, "userdb", currentUser.uid);
      await updateDoc(userRef, {
        displayName: newName || userData.displayName,
        email: newEmail || userData.email,
      });
      if (newPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error("New password and confirm password don't match");
        }
        await updatePassword(oldPassword, newPassword);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
      setSuccessMessage("Changes saved successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    setError("");
    try {
      // Delete user document from Firestore
      const userRef = doc(db, "userdb", currentUser.uid);
      await deleteDoc(userRef);

      // Delete user account from Firebase Authentication
      await deleteUser(currentUser);

      Navigation("/login"); // Redirect to login page after successful account deletion
    } catch (error) {
      setError("Failed to delete account.");
    }
  };

  return (
    <div className="w-[90%] m-auto min-h-screen h-full p-2">
      <h1 className="text-white font-pro text-center font-2xl mb-5">
        Account Settings
      </h1>
      <div className="flex flex-col bg-transparent ">
        <div className="flex flex-col gap-5 h-full w-full">
          {userData && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-gray-700">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder={userData.firstName}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="rounded border p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder={userData.email}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="rounded border p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="oldPassword" className="text-gray-700">
                  Old Password:
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="rounded border p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="newPassword" className="text-gray-700">
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded border p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded border p-2"
                />
              </div>
              <button
                onClick={handleSaveChanges}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Save Changes
              </button>
            </>
          )}
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {successMessage && (
            <div className="text-green-500 mt-4">{successMessage}</div>
          )}
          <div>
            <h1 className="text-white font-semibold text-xl mt-8 mb-2 text-center">
              Delete Your Account
            </h1>
            <p className="text-gray-700 mb-4 text-center">
              Please note that deleting your account will permanently remove all
              your data. This action cannot be undone.
            </p>
            <div className="flex justify-center items-center">
              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 "
                >
                  Delete My Account
                </button>
              ) : (
                <div className="flex justify-around items-center gap-2 flex-col">
                  <p className="text-red-500 mb-4">
                    Are you sure you want to delete your account?
                  </p>
                  <div className="flex justify-around items-center gap-2">
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Yes, Delete My Account
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
