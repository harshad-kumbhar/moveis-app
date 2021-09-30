import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Message from './message'
import Like from '../like';
import Pagination from '../pagination';
import TableHeader from '../table-head';
import TableBody from '../table-body';
import  { getMovies }  from '../services/moviesService'
import { Paginate } from '../paginate';
import _ from 'lodash';
import ListGroup from '../list-group';
import Search from '../common-components/search';

interface IMoviesProps {
  movies: any[];
  currentPage: number;
  pageSize: number;
  total: number;
  sorting: any;
  onRatingChange(id: number, isIncrement: boolean): any;
  onLike(isLike: boolean, id: number): any;
  onDelete(id: number): any;
  handlePageChange(pageNumber: number): any;
  onSort(sorting: any): any;
  history: any;
}

interface IMoviesState {

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
            content: (movie: any) => <Like isLike={movie.like} onLikeChange={() => this.onLikeHandle(!movie.like, movie.id)}/>
        },
        {
            name: 'delete',
            label: '',
            content: (movie: any) => (
                <React.Fragment>
                    <button onClick={ () => this.onDeleteEvent(movie.id) } className='btn btn-danger'> Delete </button>
                    <button onClick={ () => this.onEdit(movie.id) } className='btn btn-primary m-2'> Edit </button>
                </React.Fragment>
            
            )
        }

    ]

  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 2,
    activeType: 'All',
    sorting: {column: 'name', order: 'asc'},
    total: 0,
    query: ''
  }

  onEdit = (id: number) => {
      this.props.history.push(`/movies/${id}`);
  }

  onDeleteEvent = (id: number) => {
    const index = this.state.movies.findIndex((movie: { id: any; }) => movie.id === id);
    this.state.movies.splice(index, 1)
    this.setState({ movies: this.state.movies })
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

  onLikeHandle = (islike: boolean, id: number) => {
    const index = this.state.movies.findIndex((movie: { id: any; }) => movie.id === id);
    this.state.movies[index].like = islike;
    this.updateState();
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
        <button className="btn btn-primary" onClick={() => this.addNew()}>Add New Movie</button>
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