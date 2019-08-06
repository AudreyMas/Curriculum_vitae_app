import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import renderField from "../../container/simple_form/index";
//react-grid :
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import GridLayout from "react-grid-layout";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageData: [],
      skillData: []
    };
  }
  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push("/login");
    } else {
      fetch("/api/curriculum/language-level")
        .then(response => response.json())
        .then(data => this.setState({ languageData: data }));
      fetch("/api/curriculum/skill-level")
        .then(response => response.json())
        .then(data => this.setState({ skillData: data }));
    }
  }
  render() {
    return (
      <div>
        <h1>Skills</h1>
        <FieldArray
          name="skills"
          component={({ fields, meta: { error } }) => (
            <ul>
              <li>
                <button type="button" onClick={() => fields.push()}>
                  + compétence
                </button>
              </li>
              {fields.map((skill, index) => (
                <li key={index}>
                  <button
                    type="button"
                    title="Remove Skill"
                    onClick={() => fields.remove(index)}
                  />
                  <h4>Skill #{index + 1}</h4>
                  <Field
                    name={`${skill}.skill_name`}
                    type="text"
                    component={renderField}
                    label="prénom"
                  />
                  <Field
                    component="select"
                    name={`${skill}.skill_level_id`}
                    label="first_name"
                  >
                    {this.props.logged
                      ? this.state.skillData.map(elem => (
                          <option
                            key={elem.skill_level_id}
                            value={elem.skill_level_id}
                          >
                            {elem.skill_level_name}
                          </option>
                        ))
                      : this.props.history.push("/login")}
                  </Field>
                </li>
              ))}
            </ul>
          )}
        />
        <FieldArray
          name="languages"
          component={({ fields, meta: { error } }) => (
            <ul>
              <li>
                <button type="button" onClick={() => fields.push()}>
                  + language
                </button>
              </li>
              {fields.map((language, index) => (
                <li key={index}>
                  <button
                    type="button"
                    title="Remove language"
                    onClick={() => fields.remove(index)}
                  />
                  <h4>Language #{index + 1}</h4>
                  <Field
                    name={`${language}.language_name`}
                    type="text"
                    component={renderField}
                    label="prénom"
                  />
                  <Field
                    component="select"
                    name={`${language}.language_level_id`}
                    label="first_name"
                  >
                    {this.props.logged
                      ? this.state.languageData.map(elem => (
                          <option
                            key={elem.language_level_id}
                            value={elem.language_level_id}
                          >
                            {elem.language_level_name}
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
  form: "skills"
})(Skills);
