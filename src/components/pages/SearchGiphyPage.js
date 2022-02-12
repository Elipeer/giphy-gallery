import { useEffect, useState } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import giphyService from "../../services/giphyService";
import GifCard from "../partials/GifCard";
import Swal from "sweetalert2";
import debounce from "lodash.debounce";

const SearchGiphyPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("Just eat takeaway");
  const [currentGiphys, setCurrentGiphys] = useState([]);

  const debounceFunc = debounce(handle, 500);

  useEffect(() => {
    handle(searchQuery);
  }, []);

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
          <Search />
        </div>
        {currentGiphys[0] ? (
          <>
            <p className="white-color mt-50">Click on an image to add to favorites</p>
            <div className="flex flex-wrap flex-center-x">
              {currentGiphys?.map((item, i) => {
                return (
                  <div key={item.id} className="margin13">
                    <GifCard currentImg={item} searchQuery={searchQuery} />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="white-color">No results yet</div>
        )}
      </div>
    </>
  );

  async function handle(searchQuery) {
    if (!searchQuery) return;
    setLoading(true);
    setSearchQuery(searchQuery);

    try {
      const giphys = await giphyService.getGiphysBySearchKey(searchQuery);
      setLoading(false);

      if (giphys.err) {
        Swal.fire("Whoops", giphys.err, "warning");
      } else if (giphys.data[0]) {
        setCurrentGiphys(giphys.data);
      } else {
        Swal.fire("Whoops", "No results found", "warning");
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default SearchGiphyPage;
