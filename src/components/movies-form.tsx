import { Component } from 'react';
import Input from '../common-components/input-fiels';
import Joi from 'joi-browser';
import http from '../services/httpService';
import config from '../common-components/config.json';
import { toast } from 'react-toastify';

interface Props {
    match: any;
    history: any;
}
 
interface State {
    
}
 
class MovieForm extends Component<Props, State> {
    state = { 
        movie: {},
        errors: {}
    }

   async componentDidMount() {
        const id = this.props.match.params.id;
        let movie: any = {
            name: '',
            type: '',
            publishedDate: '',
            rating: 0,
            isLike: true
        }
        if (id) {
            try {
                movie = await (await http.get(config.api + 'Get?id=' + id)).data;
                this.setState({movie});
            }
            catch (ex: any) {
                toast.error(ex.response.data.message);
            }
        } else {
            this.setState({movie});
        }
        if (!movie) { this.props.history.push('/not-found');}
    }


     schema = {
         name: Joi.string().required().label('Name'),
         type: Joi.string().required().label('Type'),
         rating: Joi.number().required().min(0).max(5).label('Rating'),
         publishedDate: Joi.string().required().label('Published Date'),
         id: Joi.number(),
         isLike: Joi.boolean().required()
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
        if (currentTarget.name === 'rating') {
            movie[currentTarget.name] = Number(currentTarget.value);
        } else {
             movie[currentTarget.name] = currentTarget.value;   
        }
        this.setState({movie, errors});
     }

     onSave = async (e: any) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors });
        if (errors) return null;
        
         try {
                if (this.props.match.params.id) {
                    
                    await http.put('api/movies/UpdateMovie', this.state.movie);
                } else {
                    await http.post('api/movies/Add', this.state.movie);
                }
                this.props.history.push('/movies');
            } catch (ex: any) {
                toast.error(ex.response.data.message);
            }

    }

    setType: any = (type: string) => {
        const movie = {...this.state.movie};
        movie['type'] = type;
        if (movie['type'] !== this.state.movie['type']) {
            this.setState({movie});
        }
    }

    render() { 
        const {name, rating, publishedDate, type}: any = this.state.movie;
        return ( 
            <form className="container custom-form" onSubmit={this.onSave}>
                <div className="mb-3">
                    <Input error={this.state.errors ? this.state.errors['name'] : ''} value={name} name='name'
                     label='Name' onChange={this.handleChange} type="text"></Input>
                </div>
                <div className="mb-3">
                    <Input error={this.state.errors ? this.state.errors['type'] : ''} value={type} name='type'
                     label='Type' onChange={this.handleChange} type="string"></Input>
                </div>
                <div className="mb-3">
                    <Input error={this.state.errors ? this.state.errors['publishedDate'] : ''} value={publishedDate} name='publishedDate'
                     label='Published Date' onChange={this.handleChange} type="string"></Input>
                </div>
                <div className="mb-3">
                    <Input error={this.state.errors ? this.state.errors['rating'] :''} value={rating} name='rating'
                     label='Rating' onChange={this.handleChange} type="number"></Input>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
         );
    }
}
 
export  default MovieForm;