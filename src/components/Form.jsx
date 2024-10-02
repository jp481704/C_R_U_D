import React, { useEffect, useState } from "react";
import {  postDataApi, updateData } from "../api/PostApi";

export default function Form({ postData, setPostData,updateDataApi,setUpdateDataApi}) {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  let isEmpty = Object.keys(updateDataApi).length === 0
  
  useEffect(()=>{
    updateDataApi && setAddData({
      title:updateDataApi.title || "",
      body:updateDataApi.body || "",
    })
  },[updateDataApi])
  
  const handleInputChnage = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      // console.log(prev);
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const addPostData = async () => {
    const res = await postDataApi(addData);
    console.log("post res", res);
    if (res.status = 200) {
      setPostData([...postData, res.data]);
      setAddData({title:"",body:""})
    }
  };

  const updatePostData= async()=>{
    
    try {
      const res = await updateData(updateDataApi.id,addData);
  console.log(res);
  setPostData((prev)=>{
    // console.log(prev)
    return prev.map((val)=>{
      return val.id === res.data.id ? res.data : val;
    })
  })
  setUpdateDataApi({})

    } catch (error) {
      console.log(error)
    }
    
  
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    addPostData();
    if(action==="Add"){
      addPostData();
    }
    else if(action==="Edit"){
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChnage}
        />
      </div>

      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleInputChnage}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}> {isEmpty ? "Add" : "Edit"} </button>
    </form>
  );
}
