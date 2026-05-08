import { useNavigate } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, baseUrl }) => {
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    if(page < 1 || page > totalPages) return;
    navigate(`${baseUrl}?page=${page}`);
    // Scroll top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pagination" style={{
      display:'flex',
      gap:'10px',
      justifyContent:'center',
      marginTop:'40px'
    }}>
      <button 
        className="page-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
          onClick={() => handlePageChange(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}

      <button 
        className="page-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;