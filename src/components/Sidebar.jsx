const Sidebar = ({ games }) => {
  const mostDownload = [...games].sort((a,b)=>b.downloads - a.downloads).slice(0,5);

  return (
    <div className="sidebar">
      <h3>🔥 Most Downloaded</h3>
      {mostDownload.map(item => (
        <div key={item.id} className="sidebar-item">
          <img src={item.image} alt={item.title} />
          <div className="sidebar-info">
            <p>{item.title}</p>
            <span>{item.downloads.toLocaleString()} Downloads</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;