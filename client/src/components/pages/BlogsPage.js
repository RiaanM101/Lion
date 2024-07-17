import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, updateBlog, deleteBlog, fetchBlogs } from '../redux/blogSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Spinner, Alert, Modal } from 'react-bootstrap';

const BlogsPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingBlog, setEditingBlog] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const dispatch = useDispatch();
  const { blogs, isLoading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBlog) {
      dispatch(updateBlog({ id: editingBlog._id, title, content }));
      setEditingBlog(null);
    } else {
      dispatch(addBlog({ title, content }));
    }
    setTitle('');
    setContent('');
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const handleDelete = () => {
    if (blogToDelete) {
      dispatch(deleteBlog(blogToDelete._id));
      setBlogToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  return (
    <div className="container">
      <h1>Blogs</h1>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formBlogTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Title" 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formBlogContent">
          <Form.Label>Content</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Content" 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {editingBlog ? 'Update' : 'Add'} Blog
        </Button>
      </Form>
      {isLoading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <ul className="list-group">
          {blogs.map(blog => (
            <li key={blog._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{blog.title}</h5>
                <p>{blog.content}</p>
              </div>
              <div>
                <Button variant="outline-secondary" className="me-2" onClick={() => handleEdit(blog)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="outline-danger" onClick={() => { setBlogToDelete(blog); setShowDeleteModal(true); }}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this blog?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogsPage;
