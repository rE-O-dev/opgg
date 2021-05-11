const kdaColor = (kda: number) => {
  return kda >= 5 ? "yellow" : kda >= 4 ? "blue" : kda >= 3 ? "green" : "";
}

export default kdaColor;