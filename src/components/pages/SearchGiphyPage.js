import { CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import giphyService from "../../services/giphyService";
import GifCard from "../partials/GifCard";
import Swal from "sweetalert2";

const SearchGiphyPage = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentGiphys, setCurrentGiphys] = useState([]);

  const debounceFunc = debounce(handle, 500);

  return (
    <>
      <div className="container center mb-50">
        <div className="auto0 large-label">
          <TextField
            fullWidth
            variant="standard"
            onChange={(e) => debounceFunc(e.target.value)}
            InputProps={{ disableUnderline: true }}
            placeholder="Search a giphy..."
          />
          {isLoading && (
            <div className="mt-10 mr-15">
              <CircularProgress size={30} />
            </div>
          )}
        </div>
        <div className="flex flex-wrap flex-center-x mt-50">
          {currentGiphys?.map((item, i) => {
            return (
              <div key={item.id} className="margin13">
                <GifCard currentImg={item} searchQuery={searchQuery} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  async function handle(searchQuery) {
    if (!searchQuery) return;
    setSearchQuery(searchQuery);
    setLoading(true);
    try {
      const giphys = await giphyService.getGiphysBySearchKey(searchQuery);
      setLoading(false);

      if (giphys.err) {
        Swal.fire("Whoops", giphys.err, "warning");
      } else if (giphys.data[0]) {
        setCurrentGiphys(giphys.data);
        debugger;
      } else {
        Swal.fire("Whoops", "No results found", "warning");
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const mapStateToProps = (state) => {
  return {
    locations: state.persistedReducer.locations
  };
};

export default connect(mapStateToProps)(SearchGiphyPage);
