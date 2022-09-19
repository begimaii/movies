function Movies({ data, handlerFavorite, btnClass, btnText }) {
  const { Title, Poster, Year } = data;
  return (
    <div>
      <img src={Poster} alt={Title} className="Card-img-top" />
      <div className="card-body">
        <p>
          {Title} - {Year}
        </p>
        <button
          className={` btn btn-sm btn-${btnClass}`}
          onClick={() => handlerFavorite(data)}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
}
export default Movies;
