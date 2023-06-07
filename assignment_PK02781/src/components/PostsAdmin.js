import { callAPI } from "../services/api";
import { Link } from "react-router-dom";
import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Posts = ({ posts, keyword, onReload }) => {
  return (
    <section style={{ backgroundColor: "#eee" ,marginBottom:30}} >
    <div className="container py-3">
      <div className="row ">
        {posts.map((post) => {
          return (
            <div key={post.id} className="post col col-md-12 col-lg-3 mb-4 mb-lg-0">
              <div className="p-3 mb-5 bg-white rounded">
                <div className="product product-body">
                  <div className="product-image mb-2">
                    <img style={{width:220}} src={post.picture || "https://via.placeholder.com/150"} alt="" />
                  </div>
                  <p className="product-name fw-bold">
                    <Link to={`/posts/${post.id}`} className="text-decoration-none text-secondary">{post.name}</Link>
                  </p>
                  <p className="text-dark fw-bold">{post.price}</p>
                  <p >{post.description}</p>
                  <Button variant="danger" onClick={async () => {
                      const response = await callAPI(
                        `/posts/${post.id}`,
                        "DELETE"
                      );
                      if (response) {
                        alert("delete successfully");
                        onReload(post.id);
                      }
              }}><FontAwesomeIcon icon={faTrash} /></Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>



  </section>


  );
};
export default Posts;
