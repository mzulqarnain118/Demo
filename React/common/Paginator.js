import React from 'react';

const Paginator = ({ totalPage, PerPage, paginate }) => {
       
        const pageNumbers = [];
       
      for (let i = 1; i <= Math.ceil(totalPage); i++) {
        pageNumbers.push(i);
      }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                {
                    pageNumbers.map(number => ( 
                       
                        <li key={number} className='page-item'>
                            <a  onClick={() => paginate(number)} href='javascript:void(0)' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
               <li class="page-item"><a class="page-link" href="#">next</a></li>

            </ul>
        </nav>
    );
}

export default Paginator;
