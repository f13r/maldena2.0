import React from 'react';
import Token from "../../helpers/token";
import { Header, Button, Icon } from 'semantic-ui-react';
import NewTeacherForm from "./NewTeacherForm";
import axios from "axios";
import { TeacherFormViewAdapter, AdjustToSelect, TeacherFormSubmitAdapter } from '../../helpers/Adapters/TeacherAdapter';

class TeacherHoc extends React.Component {

    state = {
      teacher: {},
      options: {},
      loaded: false
    };

    options = {};

    constructor() {
      super();
      this.onTeacherChange = this.onTeacherChange.bind(this);
      this.submitTeacher = this.submitTeacher.bind(this);

    }

    componentDidMount() {

        const teacherPromise = axios.get('/api/teacher');
        const optionsPromise = axios.get('/api/options');

        Promise.all([teacherPromise, optionsPromise]).then((res) => {

            const optionNames = Object.keys(res[1].data);

            optionNames.forEach(optionName => {
                this.options[optionName] = AdjustToSelect(res[1].data[optionName]);
            });

            const teacher = TeacherFormViewAdapter(res[0].data);

            this.setState({
                ...this.state,
                teacher,
                loaded: true
            });

        }).catch(rej => {
                Token.remove();
                this.props.history.push('/teacher');
            }
        );
  }

  submitTeacher(model) {
    axios.post('api/teacher', TeacherFormSubmitAdapter(model));
  }

  onTeacherChange(teacher) {
    this.setState({ teacher });
  }

	render() {
    // addValidationRule('ifCheckedRequired', function(values, value, otherField) {
    // console.log(values, value, otherField);

    // });
    
	    return (
        <React.Fragment>
        {
          !Token.get() ? (
            <div>
              <Header as = 'h2'> Login with Facebook and join Maldena English Society </Header>
                        <br/>
              <a href='//localhost:8000/api/login'>
                <Button size='huge' fluid color='facebook'>
                  <Icon name='facebook' /> Facebook
                </Button>
              </a>
            </div>) : 
               this.state.loaded && ( 
                <React.Fragment>
                 <Header as = 'h2'>Заполни форму чтобы cтать частью Maldena English Society</Header>
                  <br/> 
                  <NewTeacherForm teacher={this.state.teacher} submitTeacher={this.submitTeacher} options={this.options} onTeacherChange={this.onTeacherChange}/>
                </React.Fragment>
            )
        }
        </React.Fragment>
        );
	};
};

export default TeacherHoc;