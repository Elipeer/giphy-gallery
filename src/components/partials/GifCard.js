import { useEffect } from "react";
import { connect } from "react-redux";
import { setFavoriteGiphys } from "../../store/reducers/appSettings";

const GifCard = (props) => {
  useEffect(() => {
    console.log(props.currentImg);
  }, [props.currentImg]);
  const saveToFavorites = (img) => {
    const currentImg = { ...img };
    let favGiphys = [...props.favoriteGiphys];
    if (favGiphys.some((x) => x.id === currentImg.id)) {
      favGiphys = favGiphys.filter((x) => x.id !== currentImg.id);
    } else {
      currentImg.tag = props.searchQuery;
      favGiphys.push(currentImg);
    }
    props.setFavoriteGiphys(favGiphys);
  };

  return (
    <div onClick={() => saveToFavorites(props.currentImg)}>
      <img
        src={props.currentImg.images["480w_still"].url}
        className={`image-card-size ${
          props.favoriteGiphys.some((x) => props.currentImg.id === x.id && !props.favorites) ? "box-shadow" : ""
        }`}
        alt="gif-card"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    favoriteGiphys: state.persistedReducer.favoriteGiphys
  };
};

const mapDispatchToProps = { setFavoriteGiphys };

export default connect(mapStateToProps, mapDispatchToProps)(GifCard);
