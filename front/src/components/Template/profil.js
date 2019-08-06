import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "../../container/simple_form/index";
//react-grid :
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import GridLayout from "react-grid-layout";

class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      number: "",
      professional_network: "",
      birthday_date: "",
      direction: "",
      area_code: "",
      town: "",
      burgh: "",
      land: "",
      introduction: ""
    };
  }
  handleUpdate() {
    const {
      position_title,
      phone,
      linkedin,
      birthdate,
      address,
      zip_code,
      municipality,
      city,
      country,
      profil,
      pictures
    } = this.props.usr;
    if (
      position_title === null &&
      phone === null &&
      linkedin === null &&
      birthdate === null &&
      address === null &&
      zip_code === null &&
      municipality === null &&
      city === null &&
      country === null &&
      profil === null &&
      pictures === null
    ) {
      this.setState(state => ({
        title: "Titre du poste désiré",
        number: "Téléphone",
        professional_network: "URL Linkedin",
        birthday_date: "Date de naissance",
        direction: "Adresse",
        area_code: "Code postale",
        town: "Commune",
        burgh: "Ville",
        land: "Pays",
        introduction: "Résumé de votre profil",
        profile_picture: "Coller l'url de votre photo"
      }));
    } else {
      this.setState(state => ({
        title: state.position_title,
        number: state.phone,
        professional_network: state.linkedin,
        birthday_date: state.birthdate,
        direction: state.address,
        area_code: state.zip_code,
        town: state.municipality,
        burgh: state.city,
        land: state.country,
        introduction: state.profil,
        profile_picture: state.pictures
      }));
    }
  }
  render() {
    return (
        <div>
          <nav>
            <ul>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="first_name"
                  label="first_name"
                  placeholder={
                    this.props.logged
                      ? this.props.usr.first_name
                      : this.props.history.push("/login")
                  }
                  className="field1"
                />
              </li>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="last_name"
                  label="last_name"
                  placeholder={
                    this.props.logged
                      ? this.props.usr.last_name
                      : this.props.history.push("/login")
                  }
                  className="field1"
                />
              </li>
            </ul>
          </nav>
          <div className={"cv-part"} key="titre">
            <Field
              component={renderField}
              type="text"
              name="position_title"
              label="position_title"
              placeholder={this.state.title}
              className="field1"
            />
          </div>

          <div className={"cv-part"} key="contact">
            <h1>Contact</h1>
            <ol>
              <li>
                <Field
                  component={renderField}
                  type="number"
                  name="phone"
                  label="phone"
                  placeholder={this.state.number}
                  className="field1"
                />
              </li>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="email"
                  label="email"
                  placeholder={
                    this.props.logged
                      ? this.props.usr.email
                      : this.props.history.push("/login")
                  }
                  className="field1"
                />
              </li>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="linkedin"
                  label="linkedin"
                  placeholder={this.state.professional_network}
                  className="field1"
                />
              </li>
              <li>
                <Field
                  component={renderField}
                  type="date"
                  name="birthdate"
                  label="birthdate"
                  placeholder={this.state.birthday_date}
                  className="field1"
                />
              </li>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="address"
                  label="address"
                  placeholder={this.state.direction}
                  className="field1"
                />
              </li>
              <li>
                <Field
                  component={renderField}
                  type="number"
                  name="zip_code"
                  label="zip_code"
                  placeholder={this.state.area_code}
                  className="field1"
                />
              </li>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="municipality"
                  label="municipality"
                  placeholder={this.state.town}
                  className="field1"
                />
              </li>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="city"
                  label="city"
                  placeholder={this.state.burgh}
                  className="field1"
                />
              </li>
              <li>
                <Field
                  component={renderField}
                  type="text"
                  name="country"
                  label="country"
                  placeholder={this.state.land}
                  className="field1"
                />
              </li>
            </ol>
          </div>
          {/*<div className={"cv-part"} key="profil">
            <h1>Profil</h1>
            <Field
              component="textarea"
              name="profil"
              label="profil"
              placeholder={this.state.introduction}
              className="field1"
              style={{ width: "250px", height: "150px" }}
            />
                </div>*/}
        </div>
    );
  }
}

export default reduxForm({
  form: "profil"
})(Profil);
