import ajaxPromise from './ajax-promise'

export const searchArtists = (artist_name, app_id) =>
  ajaxPromise({
    url: `artists/${artist_name}?app_id=${app_id}`,
    type: 'GET'
  }).catch((error) =>{
    console.log(error)
  });

export const getArtistEvents = (artist_name, app_id) =>
  ajaxPromise({
    url: `artists/${artist_name}/events?app_id=${app_id}`,
    type: 'GET'
  }).catch((error) =>{
    console.log(error)
  });
