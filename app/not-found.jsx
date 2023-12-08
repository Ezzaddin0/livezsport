import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <main className=' h-full text-center'>
        <h2>There was a problem.</h2>
        <p>We could not find the page you were looking for.</p>
        <p>Go back to the <Link className=' underline' href={"/"}>Home</Link></p>
    </main>
  )
}

export default NotFound