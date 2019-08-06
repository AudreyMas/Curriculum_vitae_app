import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeIdUser } from "../../actions/logout.actions";
import { cssPath, removeCssPath } from "../../actions/index";
import { Field, reduxForm } from "redux-form";
import Profil from "./profil";
import Skills from "./skills";
import Experience from "./work_experience";
import Education from "./education";
//react-grid :
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import GridLayout from "react-grid-layout";

class Template extends Component {
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
      introduction: "",
      languageData: [],
      skillData: [],
      experience: [],
      educationData: [],
      profile_picture: "",
      count_c: 0,
      count_m: 0,
      count_p: 0,
      template: [
        { id: 0, template_name: "./classic.css" },
        { id: 1, template_name: "./modern.css" },
        { id: 2, template_name: "./professional.css" }
      ],
      css: "./classic.css",
      layout: [
        { i: "name", x: 0, y: 2, w: 6, h: 2, static: false, maxW: 6, minW: 3 },
        { i: "titre", x: 0, y: 1, w: 12, h: 4, minW: 6, maxW: 12 },
        { i: "contact", x: 0, y: 3, w: 6, h: 9 },
        { i: "profil", x: 0, y: 4, w: 6, h: 5 },
        { i: "skills", x: 6, y: 5, w: 6, h: 5 },
        { i: "experience", x: 6, y: 6, w: 6, h: 4 },
        { i: "education", x: 6, y: 7, w: 6, h: 4 }
      ],
      
      next: 0
    };
    if(this.props.reload_path !== undefined) {
      require(`${this.props.reload_path}`);
    }
    
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
      fetch("/api/curriculum/education-level")
        .then(response => response.json())
        .then(data => this.setState({ educationData: data }));
      fetch("/api/curriculum/education-level")
        .then(response => response.json())
        .then(data => this.setState({ educationData: data }));
    }
    console.log("reload", this.props.reload_path);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.css !== this.state.css) {
      this.handleChangeRequire();
    }
    console.log(
      "prevProps",
      prevProps.reload_path,
      this.state.css,
      prevProps.reload_path === this.state.css ||
        prevProps.path_style === this.state.css
    );
  }
  componentWillUnmount() {
    this.handleChangeRequire();
  }
  handleChangeTemplate(e) {
    this.setState({ css: e.target.value });
  }
  handleChangeRequire() {
    this.props.cssPath(this.state.css);
    require(`${this.state.css}`);
    if (
      this.state.css === "./classic.css" ||
      this.props.reload_path === "./classic.css"
    ) {
      this.setState({ count_c: this.state.count_c + 1 });
      if (this.state.count_c === 1) {
        window.location.reload();
      }
    } if (
      this.state.css === "./modern.css" ||
      this.props.reload_path === "./modern.css"
    ) {
      this.setState({ count_m: this.state.count_m + 1 });
      if (this.state.count_m === 1) {
        window.location.reload();
      }
    } if (
      this.state.css === "./professional.css" ||
      this.props.reload_path === "./professional.css"
    ) {
      this.setState({ count_p: this.state.count_p + 1 });
      if (this.state.count_p === 1) {
        window.location.reload();
      }
    }
    console.log(
      this.state.count_c,
      this.state.count_m,
      this.state.count_p,
      this.props.reload_path
    );
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
    console.log("render", this.state.next, this.state.css);
    var layout = [
      { i: "name", x: 0, y: 2, w: 6, h: 2, static: false, maxW: 6, minW: 3 },
      { i: "titre", x: 0, y: 1, w: 12, h: 4, minW: 6, maxW: 12 },
      { i: "contact", x: 0, y: 3, w: 6, h: 9 },
      { i: "profil", x: 0, y: 4, w: 6, h: 5 },
      { i: "skills", x: 6, y: 5, w: 6, h: 5 },
      { i: "experience", x: 6, y: 6, w: 6, h: 4 },
      { i: "education", x: 6, y: 7, w: 6, h: 4 }
    ];
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div className={"container cv"}>
            <GridLayout
              className="layout"
              layout={layout}
              cols={12}
              rowHeight={30}
              width={1200}
            >
              <div className={"cv-part"} key="name">
                <Profil usr={this.props.usr} logged={this.props.logged} />
              </div>
              <div className={"cv-part"} key="skills">
                <Skills
                  className={"cv-part"}
                  key="skills"
                  logged={this.props.logged}
                />
              </div>
              <div className={"cv-part"} key="experience">
                <Experience cv={this.props.cv} logged={this.props.logged} />
              </div>
              <div className={"cv-part"} key="education">
                <Education logged={this.props.logged} />
              </div>
            </GridLayout>
            <div className="button--inscription">
              <button type="submit" value="soumettre" className="styleButton">
                <span className="styleText">JE VALIDE</span>
              </button>
            </div>
          </div>
        </form>
        <Field
          component="select"
          id="css_path"
          name="css_path"
          className="field-select"
          onChange={e => this.handleChangeTemplate(e)}
        >
          {this.state.template.map((elem, index) => (
            <option key={elem.id} value={elem.template_name}>
              {elem.template_name}
            </option>
          ))}
        </Field>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.idUser.loggedInUser,
  usr: state.idUser.user,
  cv: state.saveCV.curriculumVitae,
  path_style: state.saveCssPath.css_path,
  reload_path: state.saveCssPath.path_css
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ removeIdUser, cssPath, removeCssPath }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "template"
  })(Template)
);
