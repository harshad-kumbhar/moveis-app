import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Message from './message'
import Like from '../common-components/like';
import Pagination from '../common-components/pagination';
import TableHeader from '../table-head';
import TableBody from '../table-body';
import { Paginate } from '../common-components/paginate';
import _ from 'lodash';
import ListGroup from '../common-components/list-group';
import Search from '../common-components/search';
import http from "../services/httpService";
import  config  from '../common-components/config.json';
import { toast } from 'react-toastify';

interface IMoviesProps {
  history: any;
  user: any;
}

interface IMovie {
    id: number;
    name: string;
    type: string;
    publishedDate: string;
    isLike: boolean;
    rating: number;
}

interface IMoviesState {
    movies: IMovie[];
    currentPage: number;
    pageSize: number;
    activeType: string;
    sorting: any;
    total: number;
    query: string;
}

class Movies  extends Component<IMoviesProps, IMoviesState> {

    columns = [
        {
            name: 'name',
            label: 'Name',
        },
        {
            name: 'type',
            label: 'Type',
        },
        {
            name: 'publishedDate',
            label: 'Published Date'
        },
        {
            name: 'rating',
            label: 'Rating',
            content: (movie: any) => (
                <React.Fragment>
                    {movie.rating}*
                    <button className="btn btn-secondary btn-sm m-2" disabled={movie.rating === 5}
                        onClick={() => this.onRatingChangeHandle(movie.id, true)}>
                            +
                    </button>
                    <button className="btn btn-secondary btn-sm m-2" disabled={movie.rating === 0}
                        onClick={() => this.onRatingChangeHandle(movie.id, false)}>
                            -
                    </button> 
                </React.Fragment>
            )
        },
        {
            name: 'like',
            label: 'Like',
            content: (movie: any) => <Like isLike={movie.isLike} onLikeChange={() => this.onLikeHandle(!movie.isLike, movie.id)}/>
        },
        {
            name: 'delete',
            label: '',
            content: (movie: any) => (
                <React.Fragment>
                    {this.props.user && 
                    <><button onClick={() => this.onDeleteEvent(movie.id)} className='btn btn-danger'> Delete </button>
                    <button onClick={() => this.onEdit(movie.id)} className='btn btn-primary m-2'> Edit </button></>
                    } 
                    
                </React.Fragment>
            
            )
        }

    ]

  state: IMoviesState = {
    movies: [],
    currentPage: 1,
    pageSize: 2,
    activeType: 'All',
    sorting: {column: 'name', order: 'asc'},
    total: 0,
    query: ''
  }

  async componentDidMount() {
    try {
      const { data: movies } = await http.get('api/movies/GetAll');
      this.setState({movies});
              toast.success("ex");

    }
    catch(ex: any) {
        toast.success(ex);
    }
  }

  onEdit = (id: number) => {
      this.props.history.push(`/movies/${id}`);
  }

  onDeleteEvent = async (movieId: number) => {
    const { movies } = this.state; 
    const index = movies.findIndex((movie: { id: any; }) => movie.id === movieId);
    movies.splice(index, 1);
    try {
         await http.delete(config.api + 'Delete?id=' + movieId);
        this.setState({ movies: movies });
    }
    catch (ex: any) {
        toast.error(ex.response.data.message);
    }
  }

  onRatingChangeHandle = (id: number, isIncrement: boolean) => {
    const index = this.state.movies.findIndex((movie: { id: any; }) => movie.id === id);
    if (isIncrement) {
     this.state.movies[index].rating += 1; 
    } else {
     this.state.movies[index].rating -= 1; 
    }
    this.updateState();
  }

  updateState() {
    this.setState({ movies: this.state.movies })
  }

  onLikeHandle = async (islike: boolean, id: number) => {
    const { movies } = this.state;   
    const index = movies.findIndex((movie: { id: any; }) => movie.id === id);
    movies[index].isLike = islike;      
         try {   
                await http.put('api/movies/UpdateMovie', movies[index]);
                this.updateState();
            } catch (ex: any) {
                toast.error(ex.response.data.message);
            }
  }

  onPageChange = (pageNumber: number) => {
    this.setState({currentPage: pageNumber});
  }

  handleType = (type: string) => {
    this.setState({activeType: type, currentPage: 1});
  }

  applyFilter(items: any, activeType: string) {
    return activeType !== 'All' ? items.filter((item: any) => item.type === activeType) : items;
  }

  handleSort(sorting: any) {
    this.setState({sorting});
  }

  search = (query: string) => {
      this.setState({query, currentPage: 1});
  } 

  getSearchedMovies(movies: any) {
      const { query } = this.state;
      const searchedMovies = movies.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) 
      || m.type.includes(query.toLowerCase()));
      return searchedMovies;
  }

  addNew = () => {
      this.props.history.push('/movies/add');
  }

   renderMovies() {

        const {movies: allMovies, pageSize, currentPage, activeType, sorting} = this.state;
        const filteredMovies = this.applyFilter(allMovies, activeType);
        const sortedMovies = _.orderBy(filteredMovies, [sorting.column], [sorting.order === 'asc' ? 'asc' : 'desc']);
        const searchedMovies = this.getSearchedMovies(sortedMovies);
        const movies = Paginate(searchedMovies, pageSize, currentPage); 

        if (this.state.total !== searchedMovies.length)  {
            this.setState({total: searchedMovies.length});
        } 

        return <React.Fragment>
        <Search value={this.state.query} onChange={this.search}/>   
        {this.props.user && <button className="btn btn-primary" onClick={() => this.addNew()}>Add New Movie</button>}
         {searchedMovies.length === 0 && <p>There are no movies!</p>}
         {searchedMovies.length !== 0 && 
             <React.Fragment>
                <table className="table" >
                    <TableHeader columns={this.columns}
                         sorting={this.state.sorting}
                         onSorting={(sorting: any) => this.handleSort(sorting)}/>
                    <TableBody columns={this.columns}
                          movies={movies}/>             
                </table>
                <Pagination total={searchedMovies.length} size={this.state.pageSize} currentPage={this.state.currentPage} 
                        onPageChange={this.onPageChange}/> 
             </React.Fragment>}
        </React.Fragment>
    }

    render() { 
        const {movies: allMovies, activeType} = this.state;
        const types = allMovies.map(movie => movie.type);
        return (
            <div>
                <Message count={this.state.total}/>
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-2">
                            <ListGroup 
                            types={types} 
                            activeType={activeType} 
                            onTypeChange={this.handleType}/>
                        </div>
                        <div className="col">
                                {this.renderMovies()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Movies;