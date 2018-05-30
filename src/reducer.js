export default (state = {}, action) => {
  switch (action.type) {
    case "BEGIN_SEARCH":
      return {
        ...state,
        term: action.term,
        images: [],
        likesCount: 0,
        status: "searching"
      };
    case "DONE_SEARCH":
      return {
        ...state,
        images: action.images,
        likesCount: action.images.reduce( (acc,cur) => acc+cur.likes, 0),
        status: "done"
      };
    case "ERROR_SEARCH":
      return {
        ...state,
        status: "error"
      };
    case "like":
      let {images,likesCount} = state;
      images = state.images.map( (image) => {
          if(image.id == action.id)
              image.likes++;
          return image;
      });
      return {
        ...state,
        images: images,
        likesCount: likesCount+1
      };
    default:
      return state;
  }
};
