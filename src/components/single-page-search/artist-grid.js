import React, {useState, useEffect} from 'react';
import {Col, Row , Card, Container, Button} from "react-bootstrap";
import styles from '../../styles/single-page-search.module.scss'

export default function ArtistsGrid({searchedArtists, search_query, changeSearchPageState, setCookie}) {
  return (
    <Container className={styles.artistsGridWrapper}>
      {searchedArtists && searchedArtists.length > 0 &&
      <p>{searchedArtists.length} Result(s) found for {search_query}</p>}
      <Row>
        {searchedArtists && searchedArtists.length > 0 && searchedArtists.map( artist => {
          return (
            <div>
              <Col md={4}>
                <Card className={styles.card}>
                  {artist.thumb_url && <Card.Img
                    className={styles.img}
                    variant="top"
                    src={artist.thumb_url}/>}
                  <Card.Body>
                    <Card.Link href={artist.facebook_page_url ? artist.facebook_page_url : '#'} className={styles.link}>{artist.name}</Card.Link>
                    <Button
                      variant="info"
                      onClick={() => {setCookie('selected_artist', artist.name, { path: '/' });changeSearchPageState('selected_artist', artist.name)}}
                      disabled={artist.upcoming_event_count === 0}
                    >{artist.upcoming_event_count === 0 ? 'No Events' : 'View Events'}</Button>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          )
        })}
      </Row>
    </Container>
  )
};