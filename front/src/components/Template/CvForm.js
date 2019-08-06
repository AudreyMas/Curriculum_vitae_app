// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { removeIdUser } from "../../actions/logout.actions";
// import { Field, reduxForm } from "redux-form";
// import renderField from "../../container/simple_form/index";
// import './index.css';

// class Template extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       languageData: [],
//       educationData: [],
//       skillData: [],
//       title: "",
//       number: "",
//       professional_network: "",
//       birthday_date: "",
//       direction: "",
//       area_code: "",
//       town: "",
//       burgh: "",
//       land: "",
//       introduction: "",
//       profile_picture: "",
//       experience: [],
//       cv_parts: [
//         { name: "Test", category: "right" },
//         { name: "React", category: "left" },
//         { name: "Vue", category: "right" }
//       ]

//     };
//   }
//   componentDidMount() {
//     if (!this.props.logged) {
//       this.props.history.push("/login");
//     } else {
//       this.handleUpdate();
//       fetch("/api/curriculum/language-level")
//         .then(response => response.json())
//         .then(data => this.setState({ languageData: data }));
//       fetch("/api/curriculum/education-level")
//         .then(response => response.json())
//         .then(data => this.setState({ educationData: data }));
//       fetch("/api/curriculum/skill-level")
//         .then(response => response.json())
//         .then(data => this.setState({ skillData: data }));
//     }
//   }
//   handleUpdate() {
//     const {
//       position_title,
//       phone,
//       linkedin,
//       birthdate,
//       address,
//       zip_code,
//       municipality,
//       city,
//       country,
//       profil,
//       pictures
//     } = this.props.usr;
//     if (
//       position_title === null &&
//       phone === null &&
//       linkedin === null &&
//       birthdate === null &&
//       address === null &&
//       zip_code === null &&
//       municipality === null &&
//       city === null &&
//       country === null &&
//       profil === null &&
//       pictures === null
//     ) {
//       this.setState(state => ({
//         title: "Titre du poste désiré",
//         number: "Téléphone",
//         professional_network: "URL Linkedin",
//         birthday_date: "Date de naissance",
//         direction: "Adresse",
//         area_code: "Code postale",
//         town: "Commune",
//         burgh: "Ville",
//         land: "Pays",
//         introduction: "Résumé de votre profil",
//         profile_picture: "Coller l'url de votre photo"
//       }));
//     } else {
//       this.setState(state => ({
//         title: state.position_title,
//         number: state.phone,
//         professional_network: state.linkedin,
//         birthday_date: state.birthdate,
//         direction: state.address,
//         area_code: state.zip_code,
//         town: state.municipality,
//         burgh: state.city,
//         land: state.country,
//         introduction: state.profil,
//         profile_picture: state.pictures
//       }));
//     }
//   }

//   addNewExperience() {
//     this.setState({ experience: [...this.state.experience, ""] });
//   }

//   deleteExperience(index) {
//     this.state.experience.splice(index, 1);
//     //udpate state
//     this.setState({ experience: this.state.experience });
//     console.log("delete", this.state.experience);
//   }

//   // DRAG AND DROP 
//   onDragStart = (ev, id) => {
//     console.log('dragstart:', id);
//     ev.dataTransfer.setData("id", id);
//   }

//   onDragOver = (ev) => {
//     ev.preventDefault();
//   }

//   onDrop = (ev, cat) => {
//     let id = ev.dataTransfer.getData("id");

//     let cv_parts = this.state.cv_parts.filter((task) => {
//       if (task.name == id) {
//         task.category = cat;
//       }
//       return task;
//     });

//     this.setState({
//       ...this.state,
//       cv_parts
//     });
//   }


//   render() {
//     var cv_parts = {
//       left: [],
//       right: []
//     }

//     this.state.cv_parts.forEach((t) => {
//       cv_parts[t.category].push(
//         <div key={t.name}
//           onDragStart={(e) => this.onDragStart(e, t.name)}
//           draggable
//           className="draggable"
//           style={{ backgroundColor: 'pink' }}
//         >
//           <div></div>{t.name}

//         </div>
//       );
//     });

//     return (
//       <div >
//         <form onSubmit={this.props.handleSubmit} >
//           <div className={'container cv'}>
//             <div className={'wip'}>
//               <div className={'cv-part'}>
//                 <ul>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="text"
//                       name="first_name"
//                       label="first_name"
//                       placeholder={
//                         this.props.logged
//                           ? this.props.usr.first_name
//                           : this.props.history.push("/login")
//                       }
//                       className="field1"
//                     />
//                   </li>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="text"
//                       name="last_name"
//                       label="last_name"
//                       placeholder={
//                         this.props.logged
//                           ? this.props.usr.last_name
//                           : this.props.history.push("/login")
//                       }
//                       className="field1"
//                     />
//                   </li>
//                 </ul>
//               </div>
//               <div className={'cv-part'}>
//                 <h1>Titre?</h1>
//                 <Field
//                   component={renderField}
//                   type="text"
//                   name="position_title"
//                   label="position_title"
//                   placeholder={this.state.title}
//                   className="field1"
//                 />
//               </div>

//               <div className={'cv-part'}>
//                 <h1>Contact</h1>
//                 <ol>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="number"
//                       name="phone"
//                       label="phone"
//                       placeholder={this.state.number}
//                       className="field1"
//                     />
//                   </li>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="text"
//                       name="email"
//                       label="email"
//                       placeholder={
//                         this.props.logged
//                           ? this.props.usr.email
//                           : this.props.history.push("/login")
//                       }
//                       className="field1"
//                     />
//                   </li>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="text"
//                       name="linkedin"
//                       label="linkedin"
//                       placeholder={this.state.professional_network}
//                       className="field1"
//                     />
//                   </li>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="date"
//                       name="birthdate"
//                       label="birthdate"
//                       placeholder={this.state.birthday_date}
//                       className="field1"
//                     />
//                   </li>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="text"
//                       name="address"
//                       label="address"
//                       placeholder={this.state.direction}
//                       className="field1"
//                     />
//                   </li>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="number"
//                       name="zip_code"
//                       label="zip_code"
//                       placeholder={this.state.area_code}
//                       className="field1"
//                     />
//                   </li>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="text"
//                       name="municipality"
//                       label="municipality"
//                       placeholder={this.state.town}
//                       className="field1"
//                     />
//                   </li>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="text"
//                       name="city"
//                       label="city"
//                       placeholder={this.state.burgh}
//                       className="field1"
//                     />
//                   </li>
//                   <li>
//                     <Field
//                       component={renderField}
//                       type="text"
//                       name="country"
//                       label="country"
//                       placeholder={this.state.land}
//                       className="field1"
//                     />
//                   </li>
//                 </ol>
//               </div>
//               <div className={'cv-part'}>
//                 <h1>Profil</h1>
//                 <Field
//                   component="textarea"
//                   name="profil"
//                   label="profil"
//                   placeholder={this.state.introduction}
//                   className="field1"
//                   style={{ width: "130px", height: "70px" }}
//                 />
//               </div>
//             </div>



//             <div className={'droppable'}>
//               <div className={'cv-part'}>
//                 <h1>Skills</h1>
//                 <Field component="select" name="skill_level_id" label="first_name">
//                   {this.props.logged
//                     ? this.state.skillData.map(elem => (
//                       <option
//                         key={elem.skill_level_id}
//                         value={elem.skill_level_id}
//                       >
//                         {elem.skill_level_name}
//                       </option>
//                     ))
//                     : this.props.history.push("/login")}
//                 </Field>

//                 <Field
//                   component="select"
//                   name="language_level_id"
//                   label="first_name"
//                 >
//                   {this.props.logged
//                     ? this.state.languageData.map(elem => (
//                       <option
//                         key={elem.language_level_id}
//                         value={elem.language_level_id}
//                       >
//                         {elem.language_level_name}
//                       </option>
//                     ))
//                     : this.props.history.push("/login")}
//                 </Field>
//               </div>
//               <div className={'cv-part'}
//                 onDragOver={(e) => this.onDragOver(e)}
//                 onDrop={(e) => this.onDrop(e, "right")}>
//                 >
//                 <h1>Expérience</h1>
//                 {this.props.logged
//                   ? this.props.cv
//                     ? this.props.cv.map((elem, index) => (
//                       <nav key={elem.work_experience_id}>
//                         <ul>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="text"
//                               name={`title_name_wke_${elem.work_experience_id}`}
//                               label="title_name_wke"
//                               placeholder={elem.title_name_wke}
//                               className="field1"
//                             />
//                           </li>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="text"
//                               name={`company_name_${elem.work_experience_id}`}
//                               label="company_name"
//                               placeholder={elem.company_name}
//                               className="field1"
//                             />
//                           </li>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="text"
//                               name={`city_wke_${elem.work_experience_id}`}
//                               label="city_wke"
//                               placeholder={elem.city_wke}
//                               className="field1"
//                             />
//                           </li>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="text"
//                               name={`country_wke_${elem.work_experience_id}`}
//                               label="country_wke"
//                               placeholder={elem.country_wke}
//                               className="field1"
//                             />
//                           </li>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="date"
//                               name={`year_start_wke_${elem.work_experience_id}`}
//                               label="year_start_wke"
//                               placeholder={elem.year_start_wke.substring(0, 10)}
//                               className="field1"
//                             />
//                           </li>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="date"
//                               name={`year_end_wke_${elem.work_experience_id}`}
//                               label="year_end_wke"
//                               initialValues={elem.year_end_wke.substring(0, 10)}
//                               className="field1"
//                             />
//                           </li>
//                         </ul>
//                         <p>
//                           <Field
//                             component="textarea"
//                             name={`description_wke_${elem.work_experience_id}`}
//                             label="description_wke"
//                             placeholder={elem.description_wke}
//                             className="field1"
//                             style={{ width: "250px", height: "150px" }}
//                           />
//                         </p>
//                       </nav>
//                     ))
//                     : this.state.experience.map((elem, index) => (
//                       <nav key={index}>
//                         <ul>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="text"
//                               name={`title_name_wke_${index}`}
//                               label="title_name_wke"
//                               // placeholder={elem.title_name_wke}
//                               className="field1"
//                             />
//                             <button onClick={e => this.deleteExperience(e)}>
//                               Delete
//                           </button>
//                           </li>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="text"
//                               name={`company_name_${index}`}
//                               label="company_name"
//                               placeholder={elem.company_name}
//                               className="field1"
//                             />
//                           </li>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="text"
//                               name={`city_wke_${index}`}
//                               label="city_wke"
//                               placeholder={elem.city_wke}
//                               className="field1"
//                             />
//                           </li>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="text"
//                               name={`country_wke_${index}`}
//                               label="country_wke"
//                               placeholder={elem.country_wke}
//                               className="field1"
//                             />
//                           </li>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="date"
//                               name={`year_start_wke_${index}`}
//                               label="year_start_wke"
//                               // placeholder={elem.year_start_wke.substring(0, 10)}
//                               className="field1"
//                             />
//                           </li>
//                           <li>
//                             <Field
//                               component={renderField}
//                               type="date"
//                               name={`year_end_wke_${index}`}
//                               label="year_end_wke"
//                               // initialValues={elem.year_end_wke.substring(0, 10)}
//                               className="field1"
//                             />
//                           </li>
//                         </ul>
//                         <p>
//                           <Field
//                             component="textarea"
//                             name={`description_wke_${index}`}
//                             label="description_wke"
//                             placeholder={elem.description_wke}
//                             className="field1"
//                             style={{ width: "250px", height: "150px" }}
//                           />
//                         </p>
//                       </nav>
//                     ))
//                   : this.props.history.push("/login")}
//                 <button
//                   type="button"
//                   className="add-new-experience"
//                   onClick={() => this.addNewExperience()}
//                 >
//                   ADD
//             </button>
//               </div>
//               <div className={'cv-part'}>
//                 <h1>Education</h1>
//                 <Field
//                   component="select"
//                   name="education_level_id"
//                   label="first_name"
//                 >
//                   {this.props.logged
//                     ? this.state.educationData.map(elem => (
//                       <option
//                         key={elem.education_level_id}
//                         value={elem.education_level_id}
//                       >
//                         {elem.education_level_name}
//                       </option>
//                     ))
//                     : this.props.history.push("/login")}
//                 </Field>
//               </div>

//             </div>
//           </div>

//           <div className="button--inscription">
//             <button type="submit" value="soumettre" className="styleButton">
//               <span className="styleText">JE VALIDE</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   logged: state.idUser.loggedInUser,
//   usr: state.idUser.user,
//   cv: state.saveCV.curriculumVitae
// });

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ removeIdUser }, dispatch);
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(
//   reduxForm({
//     form: "template"
//   })(Template)
// );



////////////////////////////////////////////////////////////////////////////////////////
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeIdUser } from "../../actions/logout.actions";
import { Field, reduxForm } from "redux-form";
import renderField from "../../container/simple_form/index";
import './index.css';
//react-grid : 
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import GridLayout from 'react-grid-layout';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageData: [],
      educationData: [],
      skillData: [],
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
      profile_picture: "",
      experience: [],
      layout : [
        { i: 'name', x: 0, y: 2, w: 6, h: 2, static: false, maxW: 6, minW: 3 },
        { i: 'titre', x: 0, y: 1, w: 12, h: 4, minW: 6, maxW: 12},
        { i: 'contact', x: 0, y: 3, w: 6, h: 9 },
        { i: 'profil', x: 0, y: 4, w: 6, h: 5 },
        { i: 'skills', x: 6, y: 5, w: 6, h: 5 },
        { i: 'experience', x: 6, y: 6, w: 6, h: 4 },
        { i: 'education', x: 6, y: 7, w: 6, h: 4 },
      ]
    };
  }
  componentDidMount() {
    if (!this.props.logged) {
      this.props.history.push("/login");
    } else {
      this.handleUpdate();
      fetch("/api/curriculum/language-level")
        .then(response => response.json())
        .then(data => this.setState({ languageData: data }));
      fetch("/api/curriculum/education-level")
        .then(response => response.json())
        .then(data => this.setState({ educationData: data }));
      fetch("/api/curriculum/skill-level")
        .then(response => response.json())
        .then(data => this.setState({ skillData: data }));
    }
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

  addNewExperience() {
    this.setState({ experience: [...this.state.experience, ""] });
  }

  deleteExperience(index) {
    this.state.experience.splice(index, 1);
    this.setState({ experience: this.state.experience });
    console.log("delete", this.state.experience);
  }




  render() {
    var layout = [
      { i: 'name', x: 0, y: 2, w: 6, h: 2, static: false, maxW: 6, minW: 3 },
      { i: 'titre', x: 0, y: 1, w: 12, h: 4, minW: 6, maxW: 12},
      { i: 'contact', x: 0, y: 3, w: 6, h: 9 },
      { i: 'profil', x: 0, y: 4, w: 6, h: 5 },
      { i: 'skills', x: 6, y: 5, w: 6, h: 5 },
      { i: 'experience', x: 6, y: 6, w: 6, h: 4 },
      { i: 'education', x: 6, y: 7, w: 6, h: 4 },

    ];

    return (
      <div >
        <form onSubmit={this.props.handleSubmit} >
          <div className={'container cv'}>
            <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>

              <div className={'cv-part'} key="name">
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
              </div>

              <div className={'cv-part'} key="titre">
                <h1>Titre?</h1>
                <Field
                  component={renderField}
                  type="text"
                  name="position_title"
                  label="position_title"
                  placeholder={this.state.title}
                  className="field1"
                />
              </div>

              <div className={'cv-part'} key="contact">
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

              <div className={'cv-part'} key="profil">
                <h1>Profil</h1>
                <Field
                  component="textarea"
                  name="profil"
                  label="profil"
                  placeholder={this.state.introduction}
                  className="field1"
                  style={{ width: "130px", height: "70px" }}
                />
              </div>



              <div className={'cv-part'} key="skills">
                <h1>Skills</h1>
                <Field component="select" name="skill_level_id" label="first_name">
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

                <Field
                  component="select"
                  name="language_level_id"
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
              </div>

              <div className={'cv-part'} key="experience">
                <h1>Expérience</h1>
                {this.props.logged
                  ? this.props.cv
                    ? this.props.cv.map((elem, index) => (
                      <nav key={elem.work_experience_id}>
                        <ul>
                          <li>
                            <Field
                              component={renderField}
                              type="text"
                              name={`title_name_wke_${elem.work_experience_id}`}
                              label="title_name_wke"
                              placeholder={elem.title_name_wke}
                              className="field1"
                            />
                          </li>
                          <li>
                            <Field
                              component={renderField}
                              type="text"
                              name={`company_name_${elem.work_experience_id}`}
                              label="company_name"
                              placeholder={elem.company_name}
                              className="field1"
                            />
                          </li>
                          <li>
                            <Field
                              component={renderField}
                              type="text"
                              name={`city_wke_${elem.work_experience_id}`}
                              label="city_wke"
                              placeholder={elem.city_wke}
                              className="field1"
                            />
                          </li>
                          <li>
                            <Field
                              component={renderField}
                              type="text"
                              name={`country_wke_${elem.work_experience_id}`}
                              label="country_wke"
                              placeholder={elem.country_wke}
                              className="field1"
                            />
                          </li>
                          <li>
                            <Field
                              component={renderField}
                              type="date"
                              name={`year_start_wke_${elem.work_experience_id}`}
                              label="year_start_wke"
                              placeholder={elem.year_start_wke.substring(0, 10)}
                              className="field1"
                            />
                          </li>
                          <li>
                            <Field
                              component={renderField}
                              type="date"
                              name={`year_end_wke_${elem.work_experience_id}`}
                              label="year_end_wke"
                              initialValues={elem.year_end_wke.substring(0, 10)}
                              className="field1"
                            />
                          </li>
                        </ul>
                        <p>
                          <Field
                            component="textarea"
                            name={`description_wke_${elem.work_experience_id}`}
                            label="description_wke"
                            placeholder={elem.description_wke}
                            className="field1"
                            style={{ width: "250px", height: "150px" }}
                          />
                        </p>
                      </nav>
                    ))
                    : this.state.experience.map((elem, index) => (
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
                  : this.props.history.push("/login")}
                <button
                  type="button"
                  className="add-new-experience"
                  onClick={() => this.addNewExperience()}
                >
                  ADD
            </button>
              </div>
              <div className={'cv-part'} key="education">
                <h1>Education</h1>
                <Field
                  component="select"
                  name="education_level_id"
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
              </div>

            </GridLayout>
          </div>

          <div className="button--inscription">
            <button type="submit" value="soumettre" className="styleButton">
              <span className="styleText">JE VALIDE</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.idUser.loggedInUser,
  usr: state.idUser.user,
  cv: state.saveCV.curriculumVitae
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ removeIdUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "template"
  })(Template)
);
