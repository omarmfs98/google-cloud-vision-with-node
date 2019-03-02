var child_process = require('child_process');

function runCmd(cmd)
{
  var resp = child_process.execSync(cmd);
  var result = resp.toString('UTF8');
  return result;
}

var imagePayload = {
  payload: {
    image: {
      imageBytes: ''
    }
  }
}

const image2base64 = require('image-to-base64');

image2base64("./resources/image.jpg") // you can also to use url
  .then(
    (response) => {
      imagePayload.payload.image.imageBytes = response
      var fs = require('fs');
      fs.writeFile("./request.json", JSON.stringify(imagePayload, null, 2), function(err) {
        if(err) {
          return console.log(err);
        }
        var cmd = `curl --silent -X POST -H "Content-Type: application/json"   -H "Authorization: Bearer $(gcloud auth application-default print-access-token)"   https://automl.googleapis.com/v1beta1/projects/costosoft-unicor/locations/us-central1/models/ICN6572481867301320395:predict -d @request.json`;
        var result = JSON.parse(runCmd(cmd))
        console.log(result.payload)
      });
      //var json = JSON.stringify(imagePayload, null, 2)
      //console.log(response); //cGF0aC90by9maWxlLmpwZw==
    }
  )
  .catch(
    (error) => {
      console.log(error); //Exepection error....
    }
  )
