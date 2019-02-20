var path = require("svg-path-properties");
const util = require("util");

function getPath(pathString) {
  var properties = path.svgPathProperties(pathString);
  const totalLength = properties.getTotalLength();
  const pointAtLength = properties.getPointAtLength(10);
  const tangentAtLength = properties.getTangentAtLength(10);
  const getPropertiesAtLenght = properties.getPropertiesAtLength(10);
  const getParts = properties.getParts();
  console.log(properties);
  console.log(`totalLength: ${totalLength}`);
  console.log(`pointAtLength: ${pointAtLength}`);
  console.log(
    util.inspect(pointAtLength, false, null, true /* enable colors */)
  );
  console.log(`tangentAtLength: ${tangentAtLength}`);
  console.log(
    util.inspect(tangentAtLength, false, null, true /* enable colors */)
  );
  console.log(`getPropertiesAtLenght: ${getPropertiesAtLenght}`);
  console.log(
    util.inspect(getPropertiesAtLenght, false, null, true /* enable colors */)
  );
//   console.log(`getParts: ${getParts}`);
//   console.log(
//     util.inspect(getParts, false, null, true /* enable colors */)
//   );
  return;
}

const string =
  "M66.039,133.545c0,0-21-57,18-67s49-4,65,8s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41C46.039,146.545,53.039,128.545,66.039,133.545z";
getPath(string);
