import React, { Component } from 'react';
import AnimalManager from '../../modules/AnimalManager';
import './AnimalForm.css'

class AnimalForm extends Component {
  state = {
    animalName: "",
    breed: "",
    imageUrl: "",
    loadingStatus: false,
  };

  handleFieldChange = evt => {
    // console.log("Event target id", evt.target.id)
    // console.log("Event target value", evt.target.value)

    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    console.log("stateToChange", stateToChange)
    this.setState(stateToChange);
  };

  /*  Local method for validation, set loadingStatus, create animal      object, invoke the AnimalManager post method, and redirect to the full animal list
  */
  constructNewAnimal = evt => {
    evt.preventDefault();
    if (this.state.animalName === "" || this.state.breed === "") {
      window.alert("Please input an animal name and breed");
    } else {
      this.setState({ loadingStatus: true });
      const animal = {
        name: this.state.animalName,
        breed: this.state.breed,
        imageUrl: this.state.imageUrl
      };

      // Create the animal and redirect user to animal list
      AnimalManager.post(animal)
        .then(() => this.props.history.push("/animals"));
    }
  };

// Uploading images to Cloudinary: https://cloudinary.com/blog/how_to_build_an_image_library_with_react_cloudinary#uploading_images

//I wrote this as a fat arrow function because I wanted to use this.state()
uploadWidget = () => {
  window.cloudinary.openUploadWidget({ cloud_name: 'YOUR_CLOUD_NAME', upload_preset: 'YOUR_UPLOAD_PRESET_NAME', tags:['atag']},
      (error, result) => {
          // See what cloudinary returns
          console.log(result);

          // Building the entire URL for the uploaded image using the data cloudinary returns
          console.log("https://res.cloudinary.com/dveixyqzy/image/upload/v1576090193/" + result[0].public_id)

          // Just like other input forms, changing state so that the imageUrl property will contain the URL of the uploaded image
          this.setState({imageUrl: `https://res.cloudinary.com/dveixyqzy/image/upload/v1576090193/${result[0].public_id}`})
      });
}


  render() {

    return (
      <>
        <form>
          <fieldset>
            <div className="formgrid">
              <input
                type="text"
                required
                onChange={this.handleFieldChange}
                id="animalName"
                placeholder="Animal name"
              />
              <label htmlFor="animalName">Name</label>
              <input
                type="text"
                required
                onChange={this.handleFieldChange}
                id="breed"
                placeholder="Breed"
              />
              <label htmlFor="breed">Breed</label>
              <label htmlFor="image">Image</label>
              
              {/* This image tag will contain the uploaded image because we are using the imageUrl property in state which we change when the image is uploaded*/}
              <img className="uploadImage" src={this.state.imageUrl} alt=""/>
                <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                    Add Image
                </button>
            </div>
            <div className="alignRight">
              <button
                type="button"
                disabled={this.state.loadingStatus}
                onClick={this.constructNewAnimal}
              >Submit</button>
            </div>
          </fieldset>
        </form>
      </>
    )
  }
}

export default AnimalForm
