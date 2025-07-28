import React from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from 'recharts';
const BarChartComponent = ({data}) => {
  return (
    <div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
        </BarChart>
      </ResponsiveContainer>    
    </div>
  )
}

export default BarChartComponent
