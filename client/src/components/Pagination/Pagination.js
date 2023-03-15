import React from 'react'
import "./Pagination.css"

export const Pagination = ({ dogsPerPage, totaldogs, setCurrentPage, currentPage }) => {

    const pageNumbers = [];
  
    const paginated = (e) => {
      setCurrentPage(Number(e.target.value));
    }
  
    for (let i = 1; i <= Math.ceil(totaldogs / dogsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="pagination">
        <ul>
          {
            pageNumbers.map(n => {
              return (
                <li key={n}>
                  <button className={`pagination-btn ${n === currentPage ? 'active' : ''}`} value={n} onClick={e => paginated(e)}>{n}</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }