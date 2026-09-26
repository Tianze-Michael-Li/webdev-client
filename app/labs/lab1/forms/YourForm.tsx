"use client";

export default function YourForm() {
  return (
    <form id="wd-your-form" onSubmit={(event) => event.preventDefault()}>
      <h4>Student Profile</h4>
      <p>MS in Computer Science — Northeastern University</p>
      <label htmlFor="wd-your-first-name">First name:</label>
      <input id="wd-your-first-name" defaultValue="Tianze" />
      <br />
      <label htmlFor="wd-your-last-name">Last name:</label>
      <input id="wd-your-last-name" defaultValue="Li" />
      <br />
      <label htmlFor="wd-your-password">Practice password:</label>
      <input
        id="wd-your-password"
        type="password"
        placeholder="Practice password only"
        autoComplete="off"
      />
      <br />
      <label htmlFor="wd-your-bio">Why I am taking this course:</label>
      <br />
      <textarea
        id="wd-your-bio"
        rows={4}
        cols={40}
        defaultValue="I have a Computer Science background and experience with Java, C++, and Python. I want to learn React and Next.js, understand frontend and backend development, and build complete full-stack applications."
      />
      <fieldset>
        <legend>Class standing</legend>
        <input type="radio" name="your-standing" id="wd-your-undergraduate" />
        <label htmlFor="wd-your-undergraduate">Undergraduate</label>
        <input
          type="radio"
          name="your-standing"
          id="wd-your-graduate"
          defaultChecked
        />
        <label htmlFor="wd-your-graduate">Graduate</label>
      </fieldset>
      <fieldset>
        <legend>Enrollment</legend>
        <input type="radio" name="your-enrollment" id="wd-your-full-time" />
        <label htmlFor="wd-your-full-time">Full-time</label>
        <input type="radio" name="your-enrollment" id="wd-your-part-time" />
        <label htmlFor="wd-your-part-time">Part-time</label>
      </fieldset>
      <fieldset>
        <legend>Interests</legend>
        <input type="checkbox" id="wd-your-software" defaultChecked />
        <label htmlFor="wd-your-software">Software engineering</label>
        <input type="checkbox" id="wd-your-quantitative" defaultChecked />
        <label htmlFor="wd-your-quantitative">Quantitative development</label>
        <input type="checkbox" id="wd-your-web" defaultChecked />
        <label htmlFor="wd-your-web">Web development</label>
      </fieldset>
      <label htmlFor="wd-your-major">Major:</label>
      <select id="wd-your-major" defaultValue="CS">
        <option value="">Choose your major</option>
        <option value="CS">Computer Science</option>
        <option value="IS">Information Systems</option>
        <option value="DS">Data Science</option>
      </select>
      <br />
      <label htmlFor="wd-your-topics">Topics to deepen:</label>
      <br />
      <select id="wd-your-topics" multiple defaultValue={["REACT", "BACKEND"]}>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="REACT">React</option>
        <option value="BACKEND">Backend development</option>
      </select>
      <br />
      <label htmlFor="wd-your-email">School email:</label>
      <input type="email" id="wd-your-email" placeholder="Your school email" />
      <br />
      <label htmlFor="wd-your-graduation">Expected graduation year:</label>
      <input
        type="number"
        id="wd-your-graduation"
        min={2026}
        max={2040}
        placeholder="Graduation year"
      />
      <br />
      <label htmlFor="wd-your-start-date">Program start date:</label>
      <input type="date" id="wd-your-start-date" />
      <br />
      <label htmlFor="wd-your-excitement">
        Course excitement (0–10; choose your rating):
      </label>
      <input
        type="range"
        id="wd-your-excitement"
        min={0}
        max={10}
        defaultValue={5}
      />
      <br />
      <button type="submit" id="wd-your-save">
        Save
      </button>{" "}
      <button type="button" id="wd-your-cancel">
        Cancel
      </button>
    </form>
  );
}
