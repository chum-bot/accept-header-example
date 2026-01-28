const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8')
   });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCats = (request, response) => {
  const cat = {
    name: "cat",
    age: 9,
  }

  if(request.acceptedTypes[0] === 'text/xml'){
    let catXML = `<response>`;
    catXML += `<name>${cat.name}</name>`;
    catXML += `<age>${cat.age}</age>`;
    catXML += `</response>`;

  return respond(request, response, catXML, 'text/xml')
  }

  const catString = JSON.stringify(cat);
  return respond(request, response, catString, 'application/json')
}

module.exports = {
  getCats,
  getIndex,
};
