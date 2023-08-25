import * as PostApi from '../api/PostRequest.js'
export const getTimelinePosts = (id) => async (dispatch) => {
    dispatch({ type: "TIMELINEPOSTS_START" });
  
    try {
      const { data } = await PostApi.getTimelinePosts(id);
      dispatch({ type: "TIMELINEPOSTS_SUCCESS", data: data }); // Dispatch success action with fetched data
    } catch (error) {
      console.log(error);
      dispatch({ type: "TIMELINEPOSTS_FAIL" }); // Dispatch failure action
    }
  };
  