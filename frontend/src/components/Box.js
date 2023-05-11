function Box(props){
    console.log(props.box)
    return (
        <div className="card bg-dark text-dark mb-2">
            <div className="card-img-overlay">
                <h5 className="card-title">{props.box}</h5>
            </div>
        </div>
    );
}

export default Box;