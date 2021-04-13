import React, {useState, useEffect} from 'react';
import { getArtistEvents } from '../../actions/artists';
import {Col, Row , Card, Container, Button, ListGroup} from "react-bootstrap";
import styles from '../../styles/single-page-search.module.scss'
import $ from 'jquery';
import moment from 'moment-timezone';

export default function ArtistEventsGrid({artist, cookies, setCookie}) {
  const [state, setState] = useState({
    events: cookies['events'] ? cookies['events'] : null
  });

  useEffect(() => {
    let state_to_update = $.extend(true, {}, state);
    getArtistEvents(artist, 'test').then(response => {
      const events = response
      state_to_update['events'] = events;
      setCookie('events', events, { path: '/' });
      setState(state_to_update);
    }).catch(error => {
      console.log(error)
    });
  },[artist])

  return (
    <Container>
      {state.events && state.events.length > 0 &&
      <p>{state.events.length} Upcoming Events</p>}
      <Row>
        {state.events && state.events.length > 0 && state.events.map( event => {
          return (
            <div>
              <Col md={4}>
                <Card className={styles.eventCard}>
                  <Card.Header>{event.title === '' ? event.venue.name && event.venue.name : event.title}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Time: {moment.utc(event.datetime).tz(moment.tz.guess()).format('hh:mm A')}</ListGroup.Item>
                    <ListGroup.Item>Date: {moment.utc(event.datetime).tz(moment.tz.guess()).format('YYYY-MM-DD')}</ListGroup.Item>
                    <ListGroup.Item>Venue: {event.venue && event.venue.location}</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </div>
          )
        })}
      </Row>
    </Container>
  );
};