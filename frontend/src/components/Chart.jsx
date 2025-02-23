import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Chart({compleated,pending}) {

    const COLORS = ["#24defb", "#1e1e1e"];

    const data = [
        { name: "Completed", value: compleated },
        { name: "Pending", value: pending }
    ];
  return (
    <div>

  <div style={{ textAlign: "center" }}>
            {/* <h3 style={{fontFamily:"Montserrat,serif"}}>Task Completion Rate</h3> */}
            <PieChart width={300} height={250}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}  // Makes it a donut chart
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={3}
                    cornerRadius={15}
                    dataKey="value"
                   
                    isAnimationActive={true}
                    animationDuration={1000}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                  <Tooltip
                      contentStyle={{

                          fontFamily:"Montserrat,serif",
                          fontSize: '14px',
                          backgroundColor: '#fff',
                        //   border: '1px solid #ddd',
                          borderRadius: '8px'
                      }}
                  />
                   <Legend></Legend>

                 
            </PieChart>
            
        </div>
      
    </div>
  )
}
