import React, { Component } from 'react';
import './Articles.css';
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import {Panel, PanelHeading, PanelBody } from "../../components/Panel";
import { FormBtn, Form, FormGroup, Label, Input } from "../../components/SearchForm";


export default class Articles extends Component {
    state = {
        topic: '',
        startYear: '',
        endYear: '',
        articles:[],
        results: '',
        noResults: false
    };

    saveArticle = (article) => {
        let newArticle = {
            date:article.pub_date,
            title: article.headline.main,
            url: article.web.url,
            summary:article.snippet
        }

        API.saveArticle(newArticle)
        .then(results => {
            let unsavedArticles = this.state.results.filter(
                article => article.headline.main !== newArticle.title);
            this.setState({results: unsavedArticles});
        })
        .catch(err => console.log(err));
    };

    handleInputChange = event => {
        let { name, value } = event.target;
        this.setState({[name] : value })
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let { topic, startYear, endYear } = this.state;
        let query = { topic, startYear, endYear }
        this.getArticles(query)
    };

    getArticles = query => {
        if (query.topic !== this.state.previousSearch.topic ||
            query.startYear !== this.state.previousSearch.startYear ||
            query.endYear !== this.state.previousSearch.endYear) {
                this.setState({results:[]})
            }

        let { topic, startYear, endYear } = query

        let queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=${
            this.state.page
        }`;
        let key =  `&api-key=34ea3afd6cdb4ba0886c7977c3cd0a86`

        if(topic.indexOf(' ')>=0){
            topic = topic.replace(/\s/g, '+');
        } 

        if(topic){
            queryUrl += `&fq=${topic}`
        }

        if(startYear){
            queryUrl += `&begin_date=${startYear}`
        }

        if(endYear){
            queryUrl += `&end_date=${endYear}`
        }

        queryUrl += key;

    API.queryNYT(queryUrl)
        .then(results => {
            this.setState({
                results:[...this.state.results, ...results.data.response.docs],
                previousSearch: query,
                topic: '',
                startYear: '',
                endYear: ''
            }, function(){
                this.state.results.length === 0 
                ? this.setState({noResults:true}) 
                : this.setState({noResults:false})
            }
        );
    })
        .catch(err => console.log(err))
};

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res => this.setState({ articles: res.data}))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size='md-8'offset='sm-1'>
                        <Jumbotron>
                            <h1 className='page-header text-center'>New York Times Helper</h1>
                            <h3 className='text-center'>Search for and save articles of interest</h3>
                        </Jumbotron>
                    <Panel>
                        <PanelHeading>
                            <h3>Search</h3>
                        </PanelHeading>
                        <PanelBody>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor='topic'>Topic:</Label>
                                        <Input
                                        value={this.props.search}
                                        onChange={this.props.handleInputChange}
                                        name='topic'
                                        list='topics'
                                        type='text'
                                        className='form-control'
                                        placeholder='What would you like to find articles on?'
                                        id='topic'
                                        />
                                    <Label htmlFor='startYear'>Start Year:</Label>
                                        <Input
                                        value={this.props.search}
                                        onChange={this.props.handleInputChange}
                                        name='startYear'
                                        list='startYear'
                                        type='text'
                                        className='form-control'
                                        placeholder='starting year?'
                                        id='topic'
                                        />
                                    <Label htmlFor='endYear'>End Year:</Label>
                                        <Input
                                        value={this.props.search}
                                        onChange={this.props.handleInputChange}
                                        name='endYear'
                                        list='endYear'
                                        type='text'
                                        className='form-control'
                                        placeholder='ending year?'
                                        id='topic'
                                        />
                                </FormGroup>                                                                                      
                                    <FormBtn 
                                        type='submit'
                                        onClick={this.props.handleFormSubmit}
                                        className='btn btn-success'
                                    >Search
                                    </FormBtn>
                            </Form>
                        </PanelBody>
                    </Panel>
                        {this.state.noResults ?
                        (<h1>No results found, please try again</h1>) : 
                        this.state.results.length>0 ? (
                            <Panel>
                                <PanelHeading>
                                    <h3>Results</h3>
                                </PanelHeading>
                                <PanelBody>
                                {
                                    this.state.results.map((article, i) => (
                                        <this.Articles
                                        key={i}
                                        title={article.headline.main}
                                        url={article.web_url}
                                        summary={article.pub_date}
                                        type='Save'
                                        onClick{...() => this.saveArticle(article)}
                                        />
                                    ))
                                }
                                </PanelBody>
                            </Panel>
                        ) : ''
                    }
                
   
                    </Col>    
                </Row>
            </Container>
        );
    }
}
