import { Button, Card, Typography } from '@mui/material'
import '../Styles/courses.css'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

function Course({
  title,
  description,
  image,
  price,
  published,
  id,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="courses_container">
      <Card className="course">
        <img className="imgDisplay" src={image}></img>

        <div className="courseInfo">
          <div className="title-div">
            <Typography className="course-title text-center bold" variant="h5">
              {title}
            </Typography>
          </div>
          <div className="desc-div">
            <Typography className="course-description" variant="subtitle1">
              {description}
            </Typography>
          </div>
          <div className="price-div">
            <Typography variant="h6" className="course-price">
              price: {price} $
            </Typography>
          </div>
        </div>

        <div className="btn-group">
          <div className="status-text-item">
            {!published ? (
              <Typography variant="h6" className="courses-status notLaunched">
                Not Launched
              </Typography>
            ) : (
              <Typography variant="h6" className="courses-status launched">
                Launched
              </Typography>
            )}
          </div>

          <div className="button-group">
            <div className="course-btn-item">
              <Button
                size="small"
                className="button-icon"
                variant="contained"
                color="primary"
                onClick={() => handleEdit(id)}
              >
                <BorderColorOutlinedIcon className="btn-icons" />
              </Button>
            </div>

            <div className="course-btn-item">
              <Button
                size="small"
                onClick={() => handleDelete(id)}
                className="button-icon"
                variant="contained"
                color="error"
              >
                <DeleteOutlineOutlinedIcon className="btn-icons" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Course
