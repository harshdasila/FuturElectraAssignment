import React from 'react'

const Card = ({res}) => {
    
    const status_code = res.status_code;
    const status = res.status; // make sure this matches the actual value, "successssss" looks like a typo
    const data = res.data[0];
    console.log(res,"yee")
  return (
    <div>
      <div>
        status_code: {status_code}
      </div>
      <div>
        status: {status}
      </div>
      <ul>
        
        <li>name: {data.name}</li>
        <li>isbn: {data.isbn}</li>
        {/* <li>isbn: {data.authors[0]}</li> */}
        <li>authors: {data.authors.map((a)=>{
            return(
                <div>{a}</div>
            )
        })}</li>
        <li>number_of_pages: {data.number_of_pages}</li>
        <li>publisher: {data.publisher}</li>

        <li>country: {data.country}</li>
        <li>release_date: {data.release_date}</li>
      </ul>
    </div>
  )
}

export default Card
