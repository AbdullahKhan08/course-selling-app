import React, { useState, useEffect } from 'react'
import '../Styles/AddCourse.css'
import { InputAdornment } from '@mui/material'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ErrorComponent from './ErrorComponent'
import {
  TextField,
  Button,
  Typography,
  Card,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function AddCourse() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [published, setPublished] = useState(false)

  const navigate = useNavigate()

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

  function handleSubmit() {
    const response = fetch('http://localhost:3000/admin/courses', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
        image: image,
        price: price,
        published: published,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data)
        try {
          if (response.status == 201) {
            alert('Course added succesfully !')
          }
        } catch (err) {
          console.log(err)
        }
      })
    })

    setTitle('')
    setDescription('')
    setImage('')
    setPrice('')
    setPublished(false)
  }

  if (userEmail) {
    return (
      <div>
        <div className=" flex mt">
          <Typography variant="h4">Create Course Page</Typography>
        </div>
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
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
                onChange={(e) => setDescription(e.target.value)}
                value={description}
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
                onChange={(e) => setImage(e.target.value)}
                value={image}
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
                onChange={(e) => setPrice(e.target.value)}
                value={price}
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
                  color="success"
                  required
                  checked={published}
                  onChange={(e) => {
                    setPublished(e.target.checked)
                  }}
                  value={published}
                />
              }
              label="Published ?"
            />
            <div className="btn-group">
              <div>
                <Button
                  size={'large'}
                  variant="contained"
                  onClick={handleSubmit}
                  color="success"
                >
                  Add Course
                  <AddOutlinedIcon className="icons" />
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
    )
  } else {
    return <ErrorComponent message={'Please sign in to create courses'} />
  }
}

export default AddCourse
