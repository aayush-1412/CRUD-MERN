 import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import FileBase from "react-file-base64"

function CreatePost() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  const [post, setPost] = useState({
    title: "",
    description: "",
    selectedFile:"",
  });

  const handleChange = (e) => {
 
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = (e) => {
    e.preventDefault();
    console.log(post)

    axios
      .post("/create", post)
      .then((res) => console.log("oh god"))
      .catch((err) => console.log(err));

    navigate("posts");
  };

  return (
    <div style={{ textAlign: "center", width: "90%", margin: "auto auto" }}>
      {
          isAuthenticated&&<>
         
           <h2 style={{color:"white"}}>
            Welcome {user.name}
           </h2>
          </>
      }
   
      <Form>
        <Form.Group>
          <Form.Control
            name="title"
            value={post.title}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
            placeholder="title"
          />
          <Form.Control
            onChange={handleChange}
            name="description"
            value={post.description}
            style={{ marginBottom: "1rem" }}
            placeholder="description"
           
          />
           <FileBase
            type="file"
            style={{backgroundColor:"pink"}}
            multiple={false}
            onDone={({base64})=>setPost({...post,selectedFile:base64})}
        />
           <Button
          onClick={createPost}
          
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          CREATE POST
        </Button>
        </Form.Group>
       
         
      </Form>
    
      <Button
        onClick={() => navigate("posts")}
       
        style={{ width: "100%",
     
         }}
      >
        MY POSTS
      </Button>
    
    </div>
  );
}

export default CreatePost;
