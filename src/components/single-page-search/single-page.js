import React, {useState, useEffect} from 'react';
import {
  FormGroup,
  FormControl,
  Container,
  Row,
  Col,
  Card, ListGroup,  ListGroupItem} from "react-bootstrap";

export default function SingleSearchPage() {
  const [state, setState] = useState({
    show_loader: false,
    search_results: [
      {
      name: 'imran',
      image: null,
      link: 'www.imran.com'
      },
      {
      name: 'imran',
      image: null,
      link: 'www.imran.com'
      },
      {
      name: 'imran',
      image: null,
      link: 'www.imran.com'
      }
    ],
    search_query: '',
  });

  useEffect(() => {
  }, []);

  useEffect(() => {
  }, [state.search_query]);

  const changeSearchPageState = (name, value) => {
    if (name === 'search_query' && value.length > 3) {
      let state_to_update = Object.assign({}, state);
      state_to_update[name] = value;
      setState(prevState => ({...prevState, state: state_to_update}))
    }
  };

  const getArtistsSearchResult = () => {

  };

  return (
    <div>
      <div>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormControl
                name='search_query'
                type='text'
                placeholder="Enter artist name...."
                onChange={(e) => {
                  changeSearchPageState(e.target.name, e.target.value)
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <div>
          <Row>
          {!state.show_loader && state.search_results &&
          state.search_results.length > 0 && state.search_results.map( artist => {
            return (
              <Col md={4}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src='https://picsum.photos/200/300' />
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                  </Card.Body>
                  <Card.Body>
                    <Card.Link href={artist.link}>{artist.link}</Card.Link>
                  </Card.Body>
                </Card>
              </Col>)
          })}
          </Row>
        </div>
      </div>
    </div>
  );
};