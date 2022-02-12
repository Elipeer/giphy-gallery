import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GifCard from "../partials/GifCard";

const FavoriteGiphyPage = (props) => {
  const [currentGiphys, setCurrentGiphys] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let tagsList = [];
    let selectedGifs = props.favoriteGiphys.filter((x) => x.tag === selectedTag);

    //If tag doesn't match any saved content
    if (!selectedGifs[0]) selectedGifs = [...props.favoriteGiphys];
    //Adding tags to tagsList
    props.favoriteGiphys.forEach((item, i) => {
      if (!tagsList.includes(item.tag)) tagsList.push(item.tag);
    });

    setCurrentGiphys(selectedGifs);
    setTags(tagsList);
  }, [props.favoriteGiphys, selectedTag]);

  return (
    <>
      <div className="container center mb-50">
        <div className="auto0 large-label">
          <TextField
            select
            value={selectedTag && props.favoriteGiphys.some((x) => x.tag === selectedTag) ? selectedTag : "all-gifs-saved"}
            fullWidth
            variant="standard"
            onChange={(e) => setSelectedTag(e.target.value)}
            InputProps={{ disableUnderline: true }}
          >
            <MenuItem value="all-gifs-saved">All saved Gifs</MenuItem>
            {tags.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </TextField>
        </div>
        {props.favoriteGiphys[0] && currentGiphys[0] && (
          <>
            <p className="white-color mt-50">Click on image to remove from favorites</p>
            <div className="flex flex-wrap flex-center-x">
              {currentGiphys?.map((item, i) => {
                return (
                  <div key={item.id} className="margin13">
                    <GifCard currentImg={item} searchQuery={item.tag} favorites />
                  </div>
                );
              })}
            </div>
          </>
        )}
        {!props.favoriteGiphys[0] && <div className="white-color">Nothing saved yet</div>}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    favoriteGiphys: state.persistedReducer.favoriteGiphys
  };
};

export default connect(mapStateToProps)(FavoriteGiphyPage);
