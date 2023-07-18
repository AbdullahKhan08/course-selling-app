import React from 'react'
import '../Styles/EditCourse.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import ErrorComponent from './ErrorComponent'
import { InputAdornment } from '@mui/material'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import {
  TextField,
  Button,
  Typography,
  Card,
  Checkbox,
  FormControlLabel,
} from '@mui/material'

function EditModal() {
  const [userEmail, setUserEmail] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const previousPathRef = useRef(null)

  useEffect(() => {
    previousPathRef.current = location.pathname
  }, [location.pathname])

  console.log(previousPathRef.current)

  const id = location.state?.id

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [published, setPublished] = useState(false)

  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedDescription, setUpdatedDescription] = useState('')
  const [updatedImage, setUpdatedImage] = useState('')
  const [updatedPrice, setUpdatedPrice] = useState('')
  const [updatedPublished, setUpdatedPublished] = useState(false)

  // authentication
  useEffect(() => {
    fetch('http://localhost:3000/admin/me', {
      method: 'GET',
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data)
        setUserEmail(data.username)
      })
    })
  }, [])

  // fetching single course here in

  useEffect(() => {
    function fetchCourse() {
      const response = fetch('http://localhost:3000/admin/courses/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }).then((response) => {
        // console.log(response.json())
        response.json().then((data) => {
          console.log(data.course)
          if (response.status === 200) {
            let currentCourse = data.course
            setTitle(currentCourse.title)
            setDescription(currentCourse.description)
            setImage(currentCourse.image)
            setPrice(currentCourse.price)
            setPublished(currentCourse.published)
          }
        })
      })
    }

    fetchCourse()
  }, [])

  // edit request here
  // put request fetch

  function handleUpdate(id) {
    const updateData = {}

    if (updatedTitle) {
      updateData.title = updatedTitle
    }
    if (updatedDescription) {
      updateData.description = updatedDescription
    }
    if (updatedImage) {
      updateData.image = updatedImage
    }
    if (updatedPrice) {
      updateData.price = updatedPrice
    }
    if (updatedPublished === true || updatedPublished === false) {
      console.log(updatedPublished)
      updateData.published = updatedPublished
    }

    const response = fetch('http://localhost:3000/admin/courses/' + id, {
      method: 'PUT',
      body: JSON.stringify(updateData),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((response) => {
      response.json().then((data) => {
        // console.log(data)
        // console.log(data.title)
        if (response.status === 200) {
          // navigate('/dashboard')
          if (updatedTitle) {
            setTitle(updatedTitle)
          }
          if (updatedDescription) {
            setDescription(updatedDescription)
          }
          if (updatedImage) {
            setImage(updatedImage)
          }
          if (updatedPrice) {
            setPrice(updatedPrice)
          }
          if (updatedPublished === true || updatedPublished === false) {
            setPublished(updatedPublished)
          }
          // alert(data.msg)
        }
      })
    })

    // fetchCourse()
    setUpdatedTitle('')
    setUpdatedDescription('')
    setUpdatedImage('')
    setUpdatedPrice('')
    setUpdatedPublished(false)
  }

  if (userEmail) {
    return (
      <>
        <Typography className="heading text-center" variant="h3">
          Edit course
        </Typography>
        <div className="main-container">
          <div className="cardDiv">
            <Card className="editCardDesign">
              <div className="edit-image">
                <img className="edit-image-design" src={image}></img>
              </div>
              <div className="info-text-div">
                <div className="edit-title pt">
                  <Typography className="text-margin bold" variant="h5">
                    {title}
                  </Typography>
                </div>
                <div className="edit-description pt">
                  <Typography className="text-margin" variant="h6">
                    {description}
                  </Typography>
                </div>

                <div className="edit-price" pt>
                  <Typography className="text-margin" variant="h6">
                    {price}
                  </Typography>
                </div>

                <div className="edit-published pt">
                  {!published ? (
                    <Typography
                      variant="h6"
                      className="courseNotLaunched-edit edit-status"
                    >
                      Not Launched
                    </Typography>
                  ) : (
                    <Typography
                      variant="h6"
                      className="courseLaunched-edit edit-status"
                    >
                      Launched
                    </Typography>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <div className="edit-text-container">
            <div className="flex">
              <Card className="parentDivAddCourse mr">
                <div className="textInput">
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BorderColorOutlinedIcon className="icons" />
                        </InputAdornment>
                      ),
                    }}
                    color="success"
                    required
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    value={updatedTitle}
                    className="mb"
                    fullWidth={true}
                    label="Title"
                    type="text"
                    variant="outlined"
                  />
                </div>
                <div className="textInput">
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionOutlinedIcon className="icons" />
                        </InputAdornment>
                      ),
                    }}
                    color="success"
                    required
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                    value={updatedDescription}
                    className="mb"
                    fullWidth={true}
                    label="Description"
                    type="text"
                    variant="outlined"
                  />
                </div>
                <div className="textInput">
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddPhotoAlternateOutlinedIcon className="icons" />
                        </InputAdornment>
                      ),
                    }}
                    color="success"
                    required
                    onChange={(e) => setUpdatedImage(e.target.value)}
                    value={updatedImage}
                    className="mb"
                    fullWidth={true}
                    label="Image URL"
                    type="text"
                    variant="outlined"
                  />
                </div>
                <div className="textInput">
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyOutlinedIcon className="icons" />
                        </InputAdornment>
                      ),
                    }}
                    color="success"
                    required
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                    value={updatedPrice}
                    className="mb"
                    fullWidth={true}
                    label="Price in $"
                    type="text"
                    variant="outlined"
                  />
                </div>

                <FormControlLabel
                  color="success"
                  required
                  control={
                    <Checkbox
                      re
                      color="success"
                      required
                      checked={updatedPublished}
                      onChange={(e) => {
                        setUpdatedPublished(e.target.checked)
                      }}
                      value={updatedPublished}
                    />
                  }
                  label="Published ?"
                />
                <div className="btn-group">
                  <div>
                    <Button
                      size={'large'}
                      variant="contained"
                      onClick={() => handleUpdate(id)}
                      color="success"
                    >
                      Edit Course
                      <BorderColorOutlinedIcon className="icons" />
                    </Button>
                  </div>
                  <div>
                    <Button
                      size={'large'}
                      color="primary"
                      variant="contained"
                      onClick={() => navigate('/dashboard')}
                    >
                      <ArrowBackOutlinedIcon className="icons" />
                      Go Back
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <ErrorComponent
      message={'Please sign in to update course'}
    ></ErrorComponent>
  )
}

export default EditModal
