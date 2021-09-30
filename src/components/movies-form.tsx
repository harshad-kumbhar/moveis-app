import { Component } from 'react';
import { getMovie } from '../services/moviesService';
import Input from '../common-components/input-fiels';
import Joi from 'joi-browser';

interface Props {
    match: any;
    history: any;
    onSumbit(movie: any, id: number): any
}
 
interface State {
    
}
 
class MovieForm extends Component<Props, State> {
    state = { 
        movie: {},
        errors: {}
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        let movie: any = {
            name: '',
            type: '',
            publishedDate: '',
            rating: 0
        }
        if (id) {
            movie = getMovie(Number(id));
        }
        if (!movie) { this.props.history.push('/not-found');}
        this.setState({movie});
    }


     schema = {
         name: Joi.string().required().label('Name'),
         type: Joi.string().required().label('Type'),
         rating: Joi.number().required().min(0).max(5).label('Rating'),
         publishedDate: Joi.string().required().label('Published Date'),
         id: Joi.number(),
         like: Joi.boolean()
     }

     validate = () => {
         const option = {abortEarly: false};
         const result = Joi.validate(this.state.movie, this.schema, option);
         if (!result.error) return null;

         const errors = {};
         result.error.details.forEach((item: any) => {
            errors[item.path[0]] = item.message;
         }) 
         this.setState({errors});
         return errors;   
     }

     validateProperty = ({name, value}) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
     }

     handleChange = ({currentTarget}) => {
        const movie = {...this.state.movie};
        const errors = {...this.state.errors};

        const errorMessage = this.validateProperty(currentTarget);
        if (errorMessage) errors[currentTarget.name] = errorMessage;
        else delete errors[currentTarget.name];

        movie[currentTarget.name] = currentTarget.value;

        this.setState({movie, errors});
     }

     onSave = (e: any) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors });
        if (errors) return null;
        // this.props.onSumbit(this.state.movie, this.props.match.params.id);
        this.props.history.push('/movies');
    }

    setType: any = (type: string) => {
        const movie = {...this.state.movie};
        movie['type'] = type;
        if (movie['type'] !== this.state.movie['type']) {
            this.setState({movie});
        }
    }

    render() { 
        const {name, rating, publishedDate, like, type}: any = this.state.movie;
        return ( 
            <form className="container custom-form" onSubmit={this.onSave}>
                <div className="mb-3">
                    <Input error={this.state.errors['name']} value={name} name='name'
                     label='Name' onChange={this.handleChange} type="text"></Input>
                </div>
                <div className="mb-3">
                    <Input error={this.state.errors['type']} value={type} name='type'
                     label='Type' onChange={this.handleChange} type="string"></Input>
                </div>
                <div className="mb-3">
                    <Input error={this.state.errors['publishedDate']} value={publishedDate} name='publishedDate'
                     label='Published Date' onChange={this.handleChange} type="string"></Input>
                </div>
                <div className="mb-3">
                    <Input error={this.state.errors['rating']} value={rating} name='rating'
                     label='Rating' onChange={this.handleChange} type="number"></Input>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
         );
    }
}
 
export  default MovieForm;