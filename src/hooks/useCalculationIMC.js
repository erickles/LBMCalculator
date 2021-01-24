// The parameters came as strings!

export default (weight, height) => {
  let w = 0,
    h = 0;

  if (weight && weight !== 0) {
    w = parseFloat(weight);
  }

  if (height && height !== 0) {
    h = parseFloat(height);
  }

  if (w === 0 || h === 0)
    return "0";
  else
    return (w / ((h / 100) * (h / 100))).toFixed(2);
};
