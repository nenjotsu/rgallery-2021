import React from "react";

const imageName = image => {
  return {
    backgroundImage: `url(https://unsplash.it/200/300/?${image})`
  };
};

class ChangeImageButton extends React.Component {
  render() {
    return <button onClick={this.props.handleClick}>{this.props.text}</button>;
  }
}

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      imageNumber: "image=880"
    };
    this.changeImage = this.changeImage.bind(this);
    this.chooseRandom = this.chooseRandom.bind(this);
  }

  chooseRandom() {
    return Math.floor(Math.random() * 1000) + 300;
  }

  changeImage() {
    this.setState({
      imageNumber: `image=${this.chooseRandom()}`
    });
  }

  render() {
    console.log(this.state.imageNumber);
    return (
      <div>
        <div className="card">
          <div className="shadow">
            <div
              className="shadowImage"
              style={imageName(this.state.imageNumber)}
            />
          </div>
          <div className="image" style={imageName(this.state.imageNumber)} />
        </div>

        <ChangeImageButton
          handleClick={this.changeImage}
          text="Randomise image"
        />
      </div>
    );
  }
}

export default ChangeImageButton;
