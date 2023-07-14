import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { Chart, PieSeries, Title } from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
import { Typography } from '@mui/material'
import './ProgressBar.css'

function ProgressBar() {
  const [published, setPublished] = useState(0)
  const [notpublished, setNotPublished] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/admin/courses/insights', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((response) => {
      response.json().then((d) => {
        console.log(d)
        setPublished(d.published)
        setNotPublished(d.notPublished)
        setData([
          { argument: 'published', value: published },
          { argument: 'Not published', value: notpublished },
        ])
      })
    })
  }, [data])

  if (published === 0 && notpublished === 0) {
    return (
      <div>
        <Paper
          style={{
            backgroundColor: 'var(--main-background)',
            height: '80vh',
            padding: '20px 10px',
            margin: '20px 10px',
            width: '20vw',
          }}
        >
          <Typography style={{ textAlign: 'center' }} variant="h5">
            {' '}
            You have no courses yet
          </Typography>

          <Chart
            style={{ visibility: 'visible' }}
            width={300}
            height={300}
            data={[]}
          >
            <PieSeries
              emptyIndicator={true}
              valueField="value"
              argumentField="argument"
              innerRadius={0.6}
            />
            <Animation />
          </Chart>
        </Paper>
      </div>
    )
  }

  return (
    <div>
      <div className="pieParent">
        <Paper
          style={{
            backgroundColor: 'var(--main-background)',
            height: '80vh',
            padding: '20px 10px',
            margin: '20px 10px',
          }}
          //   className="pieBackground"
        >
          <Chart data={data}>
            <PieSeries valueField="value" argumentField="argument" />
            <Title text="Courses Launched insights" />
          </Chart>
          <div className="insights">
            <Typography variant="h5" className="typo">
              Total Courses: {published + notpublished}
            </Typography>
            <Typography className="typo" variant="h6">
              Published: {published}
            </Typography>
            <Typography className="typo" variant="h6">
              Not Published: {notpublished}
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default ProgressBar
