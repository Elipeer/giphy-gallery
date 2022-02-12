import { CircularProgress, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import giphyService from "../../services/giphyService";
import GifCard from "../partials/GifCard";
import Swal from "sweetalert2";

const FavoriteGiphyPage = (props) => {
  const [currentGiphys, setCurrentGiphys] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  useEffect(() => {
    let tagsList = [...tags];
    if (selectedTag && selectedTag !== "all-gifs-saved") {
      const selectedGifs = props.favoriteGiphys.filter((x) => x.tag === selectedTag);
      setCurrentGiphys(selectedGifs);
    } else {
      //Fist render
      setCurrentGiphys(props.favoriteGiphys);
    }
    props.favoriteGiphys?.map((item, i) => {
      if (!tagsList.includes(item.tag)) {
        tagsList.push(item.tag);
      }
    });

    setTags(tagsList);
  }, [props.favoriteGiphys]);

  return (
    <>
      <div className="container center mb-50">
        <div className="auto0 large-label">
          <TextField
            select
            value={selectedTag || "all-gifs-saved"}
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
        <div className="flex flex-wrap flex-center-x mt-50">
          {currentGiphys?.map((item, i) => {
            return (
              <div key={item.id} className="margin13">
                <GifCard currentImg={item} searchQuery={item.tag} favorites />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  //   function getSavedImagesByTag(tag) {
  //     if (tag === "all-gifs-saved") {
  //       setCurrentGiphys(props.favoriteGiphys);
  //     } else {
  //       const selectedGifs = props.favoriteGiphys.filter((x) => x.tag === tag);
  //       setCurrentGiphys(selectedGifs);
  //     }
  //     setSelectedTag(tag);
  //   }
};

const mapStateToProps = (state) => {
  return {
    favoriteGiphys: state.persistedReducer.favoriteGiphys
  };
};

export default connect(mapStateToProps)(FavoriteGiphyPage);
