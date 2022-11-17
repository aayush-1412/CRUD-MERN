import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import { CardMedia, Card,Grid } from "@material-ui/core"
import "./index.css"


function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    id: "",
    title: "",
    description: "",
    selectedFile: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    console.log(id);

    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };
  const[like,setLike]=useState(true);
  const likeDislike=()=>{
    setLike(!like);
    console.log(4)
  }

  const updatePost = (id, title, description) => {
    setUpdatedPost((prev) => {
      return {
        ...prev,
        id: id,
        title: title,
        description: description,

      };
    });
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    console.log(updatedPost);

    axios
      .put(`/update/${updatedPost.id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <h2 style={{color:"whitesmoke", padding:"1.5rem"}} > Your Posts</h2>
      <Button
        variant="outline-light"
        style={{ width: "100%", marginBottom: "1rem" }}
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
      <Button
        variant="outline-light"
        style={{ width: "100%", marginBottom: "1rem" }}
        onClick={() => logout({ returnTo: window.location.origin })}

      >
        LOGOUT
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="title"
            name="title"
            value={updatedPost.title ? updatedPost.title : ""}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
          <Form.Control
            placeholder="description"
            name="description"
            onChange={handleChange}
            value={updatedPost.description ? updatedPost.description : ""}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {posts ? (
        <>
          {posts.map((post) => {
            return (
          
              
            
              
              <div
                style={{
                  marginBottom: "10rem",
                  border: "solid lightgray 1px",
                  borderRadius: "8px",
                  height:"700px"


                }}
                key={post._id}
              >
        
                
                <img src={post.selectedFile} height="90%" 
                style={{objectFit:"contain"}} alt=""></img>
                <h4 style={{color:"whitesmoke"}}>{post.title}</h4>
                <p style={{color:"whitesmoke"}} >{post.description}</p>
              


                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",

                    padding: "1rem",
                  }}
                >
                   
                  <Button
                    variant="outline-info"
                    onClick={() =>
                      updatePost(post._id, post.title, post.description)
                    }
                    style={{ width: "100%", marginRight: "1rem" }}
                  >
                    UPDATE
                  </Button>
                  <Button
                    onClick={() => deletePost(post._id)}
                    variant="outline-danger"
                    style={{ width: "100%" }}
                  >
                    DELETE
                  </Button>
                  <Button


                    style={{ width: "100%" }}
                    variant="outline-info"
                    onclick={()=>likeDislike(
                      setLike(!like)
                    )}
                  >
                    {like?"Like":"Dislike"}
                  </Button>
                </div>
              </div>
         
              
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Posts;
