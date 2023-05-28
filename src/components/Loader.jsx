export const Loader = ()=>{
    return <div className="loader h-100 d-flex gap-2 justify-content-center align-items-center">
        <div className="spinner-grow text-success" role="status"></div>
        <div className="spinner-grow text-danger" role="status"></div>
        <div className="spinner-grow text-warning" role="status"></div>
        <div className="spinner-grow text-info" role="status"></div>
    </div>
}