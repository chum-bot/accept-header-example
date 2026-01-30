const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8')
   });
  response.write(content);
  response.end();
};

  const cats = {
  "cat": {
    name: "cat",
    age: 9,
  },
  "inky": {
    name: "inky",
    age: '2'
  },
  "kit": {
    name: 'kit',
    age: '5'
  }
}
const getIndex = (request, response) => {
  respond(request, response, 200, index, 'text/html');
};

const getCats = (request, response) => {
  if(!request.query || !request.query.name) {
    const responseJSON = JSON.stringify({error: "Please enter a name"})
  return respond(request, response, 400, responseJSON, 'application/json')
  }

  const cat = cats[request.query.name]

  if(!cat) {
    const responseJSON = JSON.stringify({error: "Cat not found"})
  return respond(request, response, 404, responseJSON, 'application/json')
  }

  if(request.acceptedTypes[0] === 'text/xml'){
    let catXML = `<response>`;
    catXML += `<name>${cat.name}</name>`;
    catXML += `<age>${cat.age}</age>`;
    catXML += `</response>`;

  return respond(request, response, 200, catXML, 'text/xml')
  }

  const catString = JSON.stringify(cat);
  return respond(request, response, 200, catString, 'application/json')
}

module.exports = {
  getCats,
  getIndex,
};
