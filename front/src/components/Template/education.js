import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import renderField from "../../container/simple_form/index";
//react-grid :
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import GridLayout from "react-grid-layout";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationData: []
    };
  }
  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push("/login");
    } else {
      fetch("/api/curriculum/education-level")
        .then(response => response.json())
        .then(data => this.setState({ educationData: data }));
    }
  }
  render() {
    return (
        <div>
          <h1>Education</h1>
          <FieldArray
            name="work_experience"
            component={({ fields, meta: { error } }) => (
              <ul>
                <li>
                  <button type="button" onClick={() => fields.push()}>
                    + education
                  </button>
                </li>
                {fields.map((education, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      title="Remove Education"
                      onClick={() => fields.remove(index)}
                    />
                    <h4>education #{index + 1}</h4>
                    <Field
                      name={`${education}.title_name`}
                      type="text"
                      component={renderField}
                      label="intitulé du titre"
                    />
                    <Field
                      name={`${education}.university`}
                      type="text"
                      component={renderField}
                      label="nom du lieu d'étude"
                    />
                    <Field
                      name={`${education}.city`}
                      type="text"
                      component={renderField}
                      label="ville"
                    />
                    <Field
                      name={`${education}.country`}
                      type="text"
                      component={renderField}
                      label="pays"
                    />
                    <Field
                      name={`${education}.year_start`}
                      type="date"
                      component={renderField}
                      label="date de début"
                    />
                    <Field
                      name={`${education}.year_end`}
                      type="date"
                      component={renderField}
                      label="date de fin"
                    />
                    <Field
                      style={{ width: "250px", height: "150px" }}
                      name={`${education}.description`}
                      component="textarea"
                      label="date de fin"
                    />
                    <Field
                      component="select"
                      name={`${education}.education_level_id`}
                      label="first_name"
                    >
                      {this.props.logged
                        ? this.state.educationData.map(elem => (
                            <option
                              key={elem.education_level_id}
                              value={elem.education_level_id}
                            >
                              {elem.education_level_name}
                            </option>
                          ))
                        : this.props.history.push("/login")}
                    </Field>
                  </li>
                ))}
              </ul>
            )}
          />
        </div>
    );
  }
}

export default reduxForm({
  form: "education"
})(Education);
