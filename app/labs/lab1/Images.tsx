/* eslint-disable @next/next/no-img-element -- Lab 1 explicitly teaches the HTML img tag. */
export default function Images() {
  return (
    <div id="wd-images">
      <h4>Image tag</h4>
      Loading an image from the internet:
      <br />
      <img
        id="wd-starship"
        width="400px"
        alt="Starship"
        src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
      />
      <br />
      Loading a local image:
      <br />
      <img
        id="wd-teslabot"
        src="/images/teslabot.jpg"
        height="200px"
        alt="Tesla Bot (Optimus) humanoid robot"
      />
      <br />
      <img
        id="wd-your-image"
        src="/images/mountains.jpg"
        alt="Mountain landscape reflecting my interest in hiking and outdoor travel"
        width="200"
      />
      <br />
      <img
        id="wd-ai-image"
        src="https://images-assets.nasa.gov/image/PIA18033/PIA18033~orig.jpg"
        alt="NASA space image"
        width="200"
      />
    </div>
  );
}
