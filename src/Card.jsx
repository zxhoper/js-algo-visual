import catPic from './assets/react.svg';
function Card(){

    return (
        <div className="card">
            <img className="card-image" alt="profile picture" src={catPic}></img>
            {/*<h2 className="card-title">Tiger the cat</h2>*/}
            {/*<p className="card-text">This is Tiger. Nice Cat.</p>*/}
        </div>
    );
}

export default Card