import ViewMarkdown from './markdowns/viewMarkdown.js'
import { get_markdown_by_title } from './markdowns/fetchMarkdown.js'
import Navbar from './navbar.js'

import { Spinner } from 'evergreen-ui'
import { useState, useEffect } from 'react'


export default function Home()
{

  const [ data, setData ] = useState( '' )
  useEffect( async () => {
    get_markdown_by_title(
      { title : 'About The Portfolio' },
      data => setData( data )
    )
  }, [] )

  console.log( `data =`, data )

  return <>
    <Navbar withLogin = { false }/>
    {
      data
      ?  <ViewMarkdown
        collection = { 'main_articals' }
        _id = { data._id } 
      />
      : <Spinner/>
    }
  </>
}
