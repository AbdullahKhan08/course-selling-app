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
      <div style={{ height: '100%' }}>
        <Paper
          style={{
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            backgroundColor: 'var(--main-background)',
            height: '80vh',
            padding: '20px 10px',
            margin: '20px 10px',
            width: '20vw',
          }}
        >
          <Typography style={{ textAlign: 'center' }} variant="h5">
            You have no courses yet
          </Typography>

          <Chart
            style={{ visibility: 'visible', width: '300px', height: '300px' }}
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
    <div style={{ height: '100vh' }}>
      <div className="pieParent">
        <Paper
          style={{
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            backgroundColor: 'var(--main-background)',
            height: '80vh',
            padding: '20px 10px',
            margin: '20px 10px',
          }}
        >
          <Chart data={data}>
            <PieSeries valueField="value" argumentField="argument" />
            <Typography variant="h5">Courses Launched insights</Typography>
          </Chart>
          <div className="insights">
            <div className="insight-item">
              <Typography variant="h5" className="typo">
                Total Courses:{' '}
                <span className="dynamic-element">
                  {published + notpublished}
                </span>
              </Typography>
            </div>

            <div className="insight-item">
              <Typography className="typo published" variant="h6">
                Launched: <span className="dynamic-element">{published}</span>
              </Typography>
            </div>

            <div className="insight-item">
              <Typography className="typo notPublished" variant="h6">
                Not Launched:{' '}
                <span className="dynamic-element">{notpublished}</span>
              </Typography>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default ProgressBar
