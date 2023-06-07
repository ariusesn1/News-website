/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdatePost = ({ isShow, handleClose, onReload }) => {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: id,
    name: '',
    picture: '',
    price: '',
    description: ''
  });
  useEffect(() => {
    axios.get('http://localhost:3000/posts/' + id)
      .then(res => setPost(res.data))
      .catch(err => console.log(err))
  }, [])

  const onHandelSubmit = async () => {
    const data = await axios.patch(process.env.REACT_APP_API + `/posts/${id}`, {
      ...post
    });
    console.log(data)
    if (data) {
      alert("Update product thành công!");
      onReload({ type: "update", item: data });
    }
  };




  return (
    <Modal show={isShow} onHide={handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control
              name="id"
              value={post.id}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name product</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter name"
              onChange={e => setPost({ ...post, name: e.target.value })}
              value={post.name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Picture</Form.Label>
            <Form.Control
              name="picture"
              type="text"
              placeholder="Url picture"
              onChange={e => setPost({ ...post, picture: e.target.value })}
              value={post.picture}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="text"
              placeholder="Price"
              onChange={e => setPost({ ...post, price: e.target.value })}
              value={post.price}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              placeholder="Description"
              rows={3}
              onChange={e => setPost({ ...post, description: e.target.value })}
              value={post.description}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" type="submit" onClick={onHandelSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default UpdatePost;