import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import Form from "./Form";

export default function Post() {
  const [postData, setPostData] = useState([]);
const [updateDataApi,setUpdateDataApi] = useState({})
  const getPostData = async () => {
    try {
      const res = await getPost();
      console.log("res", res.data);
      setPostData(res.data ); 
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      alert("Failed to fetch posts.");
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      alert(res);
      if (res.status === 200) {
        const newUpdatedPost = postData.filter((val) => val.id !== id);
        setPostData(newUpdatedPost);
      }
    } catch (error) {
      alert(error);
    }
  };

  
  const handleUpdatePost =(val)=> setUpdateDataApi(val)
  return (
    <>
      <section className="section-form">
        <Form postData={postData} setPostData={setPostData} updateDataApi={updateDataApi}setUpdateDataApi={setUpdateDataApi} />
      </section>
      <section className="section-post">
        <ol>
          
           { postData.map((val) => {
              const { id, body, title } = val;
              return (
                <li key={id}>
                  <p>Title : {title}</p>
                  <p>Body : {body}</p>
                  <button onClick={() => handleUpdatePost(val)}>EDit</button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeletePost(id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
        
        </ol>
      </section>
    </>
  );
}
