import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import renderField from "../../container/simple_form/index";
//react-grid :
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import GridLayout from "react-grid-layout";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: []
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
    console.log("cv", this.props.cv);
    return (
        <div>
          <div>
            <h1>Expérience</h1>
            {this.props.logged ? (
              this.props.cv ? (
                this.state.experience.map((elem, index) => (
                  <nav key={index}>
                    <ul>
                      <li>
                        <Field
                          component={renderField}
                          type="text"
                          name={`title_name_wke_${index}`}
                          label="title_name_wke"
                          // placeholder={elem.title_name_wke}
                          className="field1"
                        />
                        <button onClick={e => this.deleteExperience(e)}>
                          Delete
                        </button>
                      </li>
                      <li>
                        <Field
                          component={renderField}
                          type="text"
                          name={`company_name_${index}`}
                          label="company_name"
                          placeholder={elem.company_name}
                          className="field1"
                        />
                      </li>
                      <li>
                        <Field
                          component={renderField}
                          type="text"
                          name={`city_wke_${index}`}
                          label="city_wke"
                          placeholder={elem.city_wke}
                          className="field1"
                        />
                      </li>
                      <li>
                        <Field
                          component={renderField}
                          type="text"
                          name={`country_wke_${index}`}
                          label="country_wke"
                          placeholder={elem.country_wke}
                          className="field1"
                        />
                      </li>
                      <li>
                        <Field
                          component={renderField}
                          type="date"
                          name={`year_start_wke_${index}`}
                          label="year_start_wke"
                          // placeholder={elem.year_start_wke.substring(0, 10)}
                          className="field1"
                        />
                      </li>
                      <li>
                        <Field
                          component={renderField}
                          type="date"
                          name={`year_end_wke_${index}`}
                          label="year_end_wke"
                          // initialValues={elem.year_end_wke.substring(0, 10)}
                          className="field1"
                        />
                      </li>
                    </ul>
                    <p>
                      <Field
                        component="textarea"
                        name={`description_wke_${index}`}
                        label="description_wke"
                        placeholder={elem.description_wke}
                        className="field1"
                        style={{ width: "250px", height: "150px" }}
                      />
                    </p>
                  </nav>
                ))
              ) : (
                <FieldArray
                  name="work_experience"
                  component={({ fields, meta: { error } }) => (
                    <ul>
                      <li>
                        <button type="button" onClick={() => fields.push()}>
                          + expérience
                        </button>
                      </li>
                      {fields.map((experience, index) => (
                        <li key={index}>
                          <button
                            type="button"
                            title="Remove Experience"
                            onClick={() => fields.remove(index)}
                          />
                          <h4>experience #{index + 1}</h4>
                          <Field
                            name={`${experience}.title_name_wke`}
                            type="text"
                            component={renderField}
                            label="nom du poste"
                          />
                          <Field
                            name={`${experience}.company_name`}
                            type="text"
                            component={renderField}
                            label="nom de la société"
                          />
                          <Field
                            name={`${experience}.city_wke`}
                            type="text"
                            component={renderField}
                            label="ville"
                          />
                          <Field
                            name={`${experience}.country_wke`}
                            type="text"
                            component={renderField}
                            label="pays"
                          />
                          <Field
                            name={`${experience}.year_start_wke`}
                            type="date"
                            component={renderField}
                            label="date de début"
                          />
                          <Field
                            name={`${experience}.year_end_wke`}
                            type="date"
                            component={renderField}
                            label="date de fin"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                />
              )
            ) : (
              this.props.history.push("/login")
            )}
            <button type="button" className="add-new-experience">
              ADD
            </button>
          </div>
        </div>
    );
  }
}

export default reduxForm({
  form: "work_experience"
})(Experience);
