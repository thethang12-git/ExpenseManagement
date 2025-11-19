"use client"
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect } from 'react';

export default function HintList({ hintList, setHintList }: any) {
// useEffect(() => {
//   axios.get("http://localhost:3001/")
//     .then((res) => {
//       setHintList(Object.keys(res.data));
//     })
//     .catch((err) => {
//       console.error("Error fetching db keys:", err);
//     });
// }, []); 


  return (
    <Box
      sx={{
        maxWidth: 360,
        bgcolor: 'rgba(240, 240, 240, 0.9)',
        color: '#212121',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        border: '1px solid #E0E0E0',
        p: 1,
      }}
    >
      {hintList.map((hint: string) => (
        <div
          key={hint}
          style={{
            padding: '8px 12px',
            borderRadius: 4,
            cursor: 'pointer',
            marginBottom: 4,
            backgroundColor: 'white',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
        >
          {hint}
        </div>
      ))}
    </Box>
  );
}
