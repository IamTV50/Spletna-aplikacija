function Box(props){
    return (
        <div className="card bg-dark text-dark mb-2">
            <div className="card-img-overlay">
                <h5 className="card-title">{props.box.name}</h5>
            </div>
        </div>
    );
}

export default Box;