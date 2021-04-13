import $ from 'jquery'
import { css } from "@emotion/core";
import styles from '../../styles/single-page-search.module.scss'
import React, {useState, useEffect} from 'react';
import {FormGroup, FormControl, Row, Col, Button, Container, Card} from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import { useCookies } from 'react-cookie';
import { searchArtists } from '../../actions/artists'
import ArtistsGrid from "./artist-grid";
import ArtistEventsGrid from "./artist-events-grid";

export default function SingleSearchPage() {
  const [cookies, setCookie] = useCookies(['name']);
  const [state, setState] = useState({
    show_loader: false,
    search_results: cookies.search_results ? cookies.search_results : [],
    search_query: '',
    selected_artist: cookies.selected_artist ? cookies.selected_artist : ''
  });
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: cornflowerblue;
`;

  const changeSearchPageState = (name, value) => {
    let state_to_update = $.extend(true, {}, state);
    if (name === 'search_query' && value.length > 0) {
      state_to_update['show_loader'] = true;
      setState(state_to_update)
      getArtistsSearchResult(value);
    } else {
      state_to_update[name] = value;
      setState(state_to_update)
    }
  };

  const getArtistsSearchResult = (search_query) => {
    let state_to_update = $.extend(true, {}, state);
    searchArtists(search_query, 'test').then(response => {
      const searched_data = []
      if (response !== '' && !response.error ) searched_data.push(response)
      state_to_update['show_loader'] = false;
      state_to_update['search_query'] = search_query;
      state_to_update['search_results'] = searched_data
      setCookie('search_results', searched_data, { path: '/' });
      setState(state_to_update)
    }).catch(error => {
      state_to_update['show_loader'] = false;
      state_to_update['search_query'] = search_query;
      setState(state_to_update)
      console.log(error)
    })
  };


  return (
    <Container>
      <Row>
        <div className={styles.searchBarWrapper}>
          {state.selected_artist === '' && <FormGroup>
            <FormControl
              className={styles.searchBar}
              name='search_query'
              type='text'
              placeholder="Search artist"
              onChange={(e) => {
                changeSearchPageState(e.target.name, e.target.value)
              }}
            />
          </FormGroup>}
          {state.selected_artist !== '' &&
          <Button
            variant="success"
            onClick={() => {setCookie('selected_artist', '', { path: '/' }); changeSearchPageState('selected_artist', '')}}
            >Go back to search</Button>}
        </div>
      </Row>
      <Row>
        {!state.show_loader && state.search_results &&
        <div>
          <ArtistsGrid
            searchedArtists={state.search_results}
            search_query={state.search_query}
            changeSearchPageState={changeSearchPageState}
            setCookie={setCookie}
          />
        </div>}
        {!state.show_loader && state.search_query !== '' && state.search_results && state.search_results.length === 0 &&
        <p> No Artists Found </p>
        }
      </Row>
      {state.show_loader === true && <ClipLoader
          color={"#ffffff"}
          css={override}
          loading={state.show_loader}
          size={30}
      />}
      {!state.show_loader && state.selected_artist !=='' &&
      <ArtistEventsGrid
        artist={state.selected_artist}
        cookies={cookies}
        setCookie={setCookie}
      />}
    </Container>
  );
};