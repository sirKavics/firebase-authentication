import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init.js";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "./NavPractice/Nav.jsx";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  // FireStore

 async function updatePost() {
    const hardcodedId = "2x9TfE6nOcaa2gdhq0e4"
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    console.log(post)
    const newPost = {
      ...post,
      title: "Land a €400k job"
    };
    console.log(newPost);
    updateDoc(postRef, newPost)
  }

  function deletePost() {
    const hardcodedId = "2x9TfE6nOcaa2gdhq0e4"
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    }
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(element => ({...element.data(), id: element.id}));
    console.log(posts)
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostsByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    )
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()))
  }

  // FireBase

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      // console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      {/* Firebase */}
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'Loading...' : user.email}
      <Nav />
      {/* FireStore */}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostsByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
