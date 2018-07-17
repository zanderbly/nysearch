import React, { Component } from 'react';
import API from '../../utils/API';
import { Article } from '../../components/Article';
import Jumbotron from '../../components/Jumbotron';
import { Container, Row, Col } from '../../components/Grid';
import { Panel, PanelHeading, PanelBody } from '../../components/Panel';
//import results from '../../components/Results';

export default class SavedArticles extends Component {
    state = {
        savedArticles:[]
    };

    componentDidMount() {
        this.loadArticles();
    };

    loadArticles = () => {
        API
        .getArticles()
        .then(results => {
            this.setState({savedArticles: results.data})
        })
    };

    deleteArticle = id => {
        API.deleteArticle(id)
        .then(results => {
            let savedArticles = this.state.savedArticles.filter(article => article._id !== id)
            this.setState({savedArticles: savedArticles})
            this.loadArticles();
        })
        
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
                            { this.state.savedArticles.length > 0 ?
                            (this.state.savedArticles.map((article, i) => (
                                <Article
                                key={i}
                                title={article.url}
                                summary={article.summary}
                                date={article.date}
                                type='Delete'
                                onClick={() => this.deleteArticle(article._id)}
                                />
                            )        
                            )) : <h1>You have zero saved articles.</h1>
                        }
                    </PanelBody>
                </Panel>
            </Col>
        </Row>
    </Container>
        );
    };
};

