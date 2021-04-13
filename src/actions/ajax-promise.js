import $ from 'jquery';

export default (params) => {
  return $.ajax({
    type: params.type,
    url: 'https://rest.bandsintown.com/' + params.url,
    crossDomain: true,
    responseType:'application/json',
  });
};