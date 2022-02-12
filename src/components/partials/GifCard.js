import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { setFavoriteGiphys } from "../../store/reducers/appSettings";

const GifCard = (props) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const toggleToFavorites = (img) => {
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
    <div onClick={() => toggleToFavorites(props.currentImg)} className="relative">
      <img
        onLoad={() => setIsImgLoaded(true)}
        src={props.currentImg.images.fixed_width_downsampled.url}
        className={`image-card-size ${
          props.favoriteGiphys.some((x) => props.currentImg.id === x.id && !props.favorites) ? "box-shadow" : ""
        }`}
        alt="gif-card"
      />

      {!isImgLoaded && (
        <div className="center-to-image-absolute">
          <CircularProgress color="info" />
        </div>
      )}

      <div className="primary-color fs-12">{props.currentImg.title}</div>
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
