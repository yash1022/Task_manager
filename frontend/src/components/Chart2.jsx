import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Chart2({data}) {
    const generateColors = (num) => {
        return Array.from({ length: num }, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
      };
      const COLORS_CATEGORIES = generateColors(data.length);
     const renderLabel= (entry)=> {return entry.name}
  return (
    <div>

        <div style={{ textAlign: "center"}}>
                    {/* <h3 style={{fontFamily:"Montserrat,serif"}}>Task Completion Rate</h3> */}
                    <PieChart width={380} height={250}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                             // Makes it a donut chart
                             innerRadius={15}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={3}
                            cornerRadius={4}
                            dataKey="count"
                           
                          
                            isAnimationActive={true}
                            animationDuration={1000}
                        >
                            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS_CATEGORIES[index % COLORS_CATEGORIES.length]} />
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
                           <Legend
                           layout='vertical'
                           align='right'
                           verticalAlign='middle'
                           iconSize={10}
                           iconType='circle'
                           wrapperStyle={{
                           paddingLeft:'40px',
                           fontFamily: 'Montserrat, serif'
                        }}></Legend>
        
                         
                    </PieChart>
                    
                </div>
      
    </div>
  )
}
