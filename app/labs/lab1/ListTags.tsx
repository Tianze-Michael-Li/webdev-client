export default function ListTags() {
  return (
    <div id="wd-lists">
      <h4>List Tags</h4>
      <h5>Ordered List Tag</h5>
      How to make pancakes:
      <ol id="wd-pancakes">
        <li>Mix dry ingredients.</li>
        <li>Add wet ingredients.</li>
        <li>Stir to combine.</li>
        <li>Heat a skillet or griddle.</li>
        <li>Pour batter onto the skillet.</li>
        <li>Cook until bubbly on top.</li>
        <li>Flip and cook the other side.</li>
        <li>Serve and enjoy!</li>
      </ol>
      <h5>Unordered List Tag</h5>
      My favorite books (in no particular order)
      <ul id="wd-my-books">
        <li>Dune</li>
        <li>Lord of the Rings</li>
        <li>Ender&apos;s Game</li>
        <li>Red Mars</li>
        <li>The Forever War</li>
      </ul>
      {/* A favorite recipe was not supplied; these neutral steps are for the recipe exercise. */}
      <h5>
        Favorite recipe: to be added (practice recipe: vegetable fried rice)
      </h5>
      <ol id="wd-your-favorite-recipe">
        <li>Cook rice and let it cool.</li>
        <li>Stir-fry chopped vegetables.</li>
        <li>Add rice and soy sauce, then stir until hot.</li>
      </ol>
      <h5>My favorite artists</h5>
      <ul id="wd-your-books">
        <li>Oasis</li>
        <li>Coldplay</li>
        <li>Supercar</li>
      </ul>
      <ul id="wd-ai-html-tags">
        <li>h1: a main heading</li>
        <li>p: a paragraph</li>
        <li>ol: ordered steps</li>
        <li>ul: an unordered collection</li>
        <li>table: rows and columns</li>
      </ul>
    </div>
  );
}
