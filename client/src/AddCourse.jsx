import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Card,
  Checkbox,
  FormControlLabel,
} from '@mui/material'

function AddCourse() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [published, setPublished] = useState(false)

  function handleSubmit() {
    const headers = {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('token'),
    }
    fetch('http://localhost:3000/admin/courses', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
        image: image,
        price: price,
        published: published,
      }),
      headers: headers,
    }).then((response) => {
      response.json().then((data) => {
        console.log(data)
      })
    })

    setTitle('')
    setDescription('')
    setImage('')
    setPrice('')
    setPublished(false)
  }

  return (
    <div>
      <div className=" flex mt">
        <Typography variant="h5">Create Course</Typography>
      </div>
      <div className="flex">
        <Card className="parentDiv mr">
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="mb"
            fullWidth={true}
            label="Title"
            type="text"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="mb"
            fullWidth={true}
            label="Description"
            type="text"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setImage(e.target.value)}
            value={image}
            className="mb"
            fullWidth={true}
            label="Image"
            type="text"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="mb"
            fullWidth={true}
            label="Price"
            type="text"
            variant="outlined"
          />

          <FormControlLabel
            required
            control={
              <Checkbox
                checked={published}
                onChange={(e) => {
                  setPublished(e.target.checked)
                }}
                value={published}
              />
            }
            label="Published"
          />
          <Button
            className="btnCenter"
            size={'large'}
            variant="contained"
            onClick={handleSubmit}
          >
            Add Course
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default AddCourse
