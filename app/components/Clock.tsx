'use client'

import React, { useEffect, useRef, useState } from 'react'

const Clock = () => {
    const [currentDate, setCurrentDate] = useState(new Date);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        weekday: 'long'
      }).format(date)
    };

    useEffect(() => {
      const updatedTime = () => {
        setCurrentDate(new Date());
      };

      intervalRef.current = setInterval(updatedTime, 1000);

      return () => {
        if(intervalRef.current){
          clearInterval(intervalRef.current)
        }
      }
    }, [])

  return (
    <p className='text-white'>
      {formatDate(currentDate)}
    </p>
  )
}

export default Clock;