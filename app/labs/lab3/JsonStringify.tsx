export default function JsonStringify() {
  const squares = [1, 4, 16, 25, 36];
  const interests = { name: "Tianze Li", hobbies: ["Photography", "Guitar"] };
  return (
    <div id="wd-json-stringify">
      <h3>JSON Stringify</h3>
      squares = {JSON.stringify(squares)}
      <p>interests = {JSON.stringify(interests)}</p>
      <p>sampleCourse = {JSON.stringify({ course: "RS102", modules: 3 })}</p>
      <hr />
    </div>
  );
}
