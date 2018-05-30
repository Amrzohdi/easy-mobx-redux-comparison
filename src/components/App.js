import React from "react";
import Form from "./Form";
import Image from "./Image";
import { connect } from "react-redux";
import { fetchImages,like } from "../actions";

class App extends React.Component {
  componentWillMount() {
    this.props.fetchImages("Mountains");
  }

  render() {
    const { term, status, images, likesCount } = this.props;


    return (
      <div className="App">
        <Form likes={likesCount}/>

        {status === "searching" && <h3>Searching for {term}</h3>}
        {status === "done" &&
          images.length === 0 && (
            <h3>
              Sorry sucker, no results{" "}
              <span role="img" aria-label="sad">
                😢
              </span>
            </h3>
          )}
        {status === "error" && <h3>Oops... error!</h3>}

        <div className="images-container">
          {images.map(image => <Image like={this.props.like} image={image} key={image.id} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    term: state.term,
    images: state.images,
    likesCount: state.likesCount,
    status: state.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchImages: term => {
      dispatch(fetchImages(term));
    },
    like: (id) => {
        dispatch(like(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
