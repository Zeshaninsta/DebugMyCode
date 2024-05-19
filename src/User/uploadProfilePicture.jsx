import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage-related functions from Firebase Storage
import { collection, doc, setDoc } from "firebase/firestore";
import { FiUser } from "react-icons/fi";

export const uploadProfilePicture = async (user, file) => {
  const storage = getStorage();
  try {
    // Check if a file is provided
    if (file) {
      // Create storage reference
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      // Upload file to storage
      await uploadBytes(storageRef, file);
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update Firestore document with profile picture URL
      await setDoc(
        doc(db, "userdb", user.uid),
        { profileImage: downloadURL },
        { merge: true }
      );

      // Update user profile with profile picture URL (optional)
      await updateProfile(user, { profileImage: downloadURL });
    } else {
      // If no file is provided, use the default user icon
      const downloadURL = <FiUser />;

      // Update Firestore document with default profile picture URL
      await setDoc(
        doc(db, "userdb", user.uid),
        { profileImage: downloadURL },
        { merge: true }
      );

      // Update user profile with default profile picture URL (optional)
      await updateProfile(user, { profileImage: downloadURL });
    }
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
